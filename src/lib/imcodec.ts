const WASM_BASE_URL = process.env.NEXT_PUBLIC_WASM_URL;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Worker
type Pending = { resolve: (value: any) => void; reject: (error: Error) => void };

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, Pending>();

function buildWorkerSource(dotnetUrl: string): string {
  return `
    // Required for .NET 10 in a custom Web Worker when using dynamic import()
    self.dotnetSidecar = true;

    let interopPromise = null;
    function getWadInterop() {
      interopPromise ??= (async () => {
        const { dotnet } = await import("${dotnetUrl}");
        const { getAssemblyExports, getConfig } = await dotnet.create();
        const exports = await getAssemblyExports(getConfig().mainAssemblyName);
        exports.WadInterop.Warmup?.();
        return exports.WadInterop;
      })();
      return interopPromise;
    }

    // Start booting immediately so the first request doesn't pay for it
    getWadInterop().catch((err) => console.error("WASM boot error:", err));

    self.onmessage = async ({ data: { id, url } }) => {
      try {
        const [interop, response] = await Promise.all([getWadInterop(), fetch(url)]);
        if (!response.ok) {
          throw new Error(\`Failed to fetch \${url}: \${response.status}\`);
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const data = JSON.parse(interop.ExtractAndDeserialize(bytes));
        self.postMessage({ id, ok: true, data });
      } catch (err) {
        self.postMessage({ id, ok: false, error: err?.message ?? String(err) });
      }
    };
  `;
}

function rejectAllPending(error: Error) {
  pending.forEach(({ reject }) => reject(error));
  pending.clear();
}

function getWorker(): Worker {
  if (worker) return worker;

  if (!WASM_BASE_URL) {
    throw new Error("NEXT_PUBLIC_WASM_URL is not set");
  }

  const dotnetUrl = `${WASM_BASE_URL.replace(/\/$/, "")}/_framework/dotnet.js?v=2`;
  const blob = new Blob([buildWorkerSource(dotnetUrl)], { type: "application/javascript" });
  worker = new Worker(URL.createObjectURL(blob), { type: "module" });

  worker.onmessage = ({ data: { id, ok, data, error } }) => {
    const entry = pending.get(id);
    if (!entry) return;
    pending.delete(id);
    ok ? entry.resolve(data) : entry.reject(new Error(error));
  };

  worker.onerror = (event) => {
    // A fatal worker error would otherwise leave every caller hanging forever
    rejectAllPending(new Error(`Worker failed: ${event.message}`));
    worker = null; // allow a fresh worker on the next call
  };

  return worker;
}

function requestFromWorker<T>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    try {
      getWorker().postMessage({ id, url });
    } catch (err) {
      pending.delete(id);
      reject(err as Error);
    }
  });
}

// Persistent using IndexedDB
const DB_NAME = "wad-cache";
const STORE = "responses";

type Entry<T> = { data: T; expiresAt: number };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readPersisted<T>(key: string): Promise<T | undefined> {
  try {
    const db = await openDb();
    const entry = await new Promise<Entry<T> | undefined>((resolve, reject) => {
      const req = db.transaction(STORE).objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return entry && entry.expiresAt > Date.now() ? entry.data : undefined;
  } catch {
    return undefined;
  }
}

async function writePersisted<T>(key: string, data: T): Promise<void> {
  try {
    const db = await openDb();
    const entry: Entry<T> = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    db.transaction(STORE, "readwrite").objectStore(STORE).put(entry, key);
  } catch {
    /* caching is best-effort */
  }
}

// Public API
const memoryCache = new Map<string, { promise: Promise<any>; expiresAt: number }>();

export function deserializeFromCdn<T = any>(url: string): Promise<T> {
  const hit = memoryCache.get(url);
  if (hit && hit.expiresAt > Date.now()) return hit.promise;

  const promise = (async () => {
    const persisted = await readPersisted<T>(url);
    if (persisted !== undefined) return persisted;

    const data = await requestFromWorker<T>(url);
    void writePersisted(url, data);
    return data;
  })();

  memoryCache.set(url, { promise, expiresAt: Date.now() + CACHE_TTL_MS });

  // Don't cache failures
  promise.catch(() => memoryCache.delete(url));

  return promise;
}
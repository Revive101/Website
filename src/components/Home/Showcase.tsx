"use client";
import { useEffect, useRef } from "react";
import styles from "./Showcase.module.scss";
import Hls from "hls.js";

export default function Showcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = "https://cdn.revive101.de/hls/trailer-web/master.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true, // Offloads demuxing to a web worker for smooth UI
        lowLatencyMode: true,
        backBufferLength: 60, // Keeps memory usage low by discarding watched segments
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className={styles.showcaseContent} id="showcase">
      <h1>See Revive101 In Action!</h1>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} onContextMenu={(e) => e.preventDefault()} autoPlay muted loop playsInline preload="metadata" />
      </div>
    </div>
  );
}

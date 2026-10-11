"use client";

import styles from "./Download.module.scss";
import { Icon } from "@iconify/react";

export default function Download() {
  // TODO: fetch latest revision
  const _revision = "r806919.Wizard_1_610";
  const _windowsName = (rev: string) => `Revive101-Setup-${rev}.exe`;
  const _linuxName = (rev: string) => `Imlight-linux-${rev}.zip`;

  const clickDownloadWindows = async (e: React.MouseEvent<HTMLButtonElement>) => {
    window.open(
      `https://github.com/Revive101/Imlight/releases/download/${_revision}/${_windowsName(_revision)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const clickDownloadLinux = async (e: React.MouseEvent<HTMLButtonElement>) => {
    window.open(
      `https://github.com/Revive101/Imlight/releases/download/${_revision}/${_linuxName(_revision)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className={styles.downloadContent} id="download">
      <div className={styles.downloadContainer}>
        <h1>Download Revive101</h1>
        <p className={styles.downloadDescription}>
          Get started by downloading the latest pre-built binaries for Windows or Linux to host your own server instance.
        </p>
        <div className={styles.downloadActions}>
          <button className={styles.primaryButton} onClick={clickDownloadWindows}>
            <Icon width={20} icon="ant-design:windows-filled" /> Windows Installer
          </button>
          <button className={styles.secondaryButton} onClick={clickDownloadLinux}>
            <Icon width={20} icon="codicon:terminal-linux" /> Linux Binary
          </button>
        </div>
        <div className={styles.divider} />
        <div className={styles.systemRequirements}>
          <p>System Requirements:</p>
          <div className={styles.requirementList}>
            <p>
              <Icon icon="material-symbols:code-rounded" width={20} color="#8b5cf6" /> .NET 10 Runtime
            </p>
            <p className={styles.dot}>•</p>
            <p>
              <Icon icon="material-symbols:hard-drive" width={20} color="#8b5cf6" /> 5GB Space
            </p>
            <p className={styles.dot}>•</p>
            <p>
              <Icon icon="material-symbols:database" width={20} color="#8b5cf6" /> 2GB RAM
            </p>
            <p className={styles.dot}>•</p>
            <p>
              <Icon icon="material-symbols:memory-rounded" width={20} color="#8b5cf6" /> 1 CPU Core
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { CSSProperties, ReactNode } from "react";

import win98 from "./win98.module.css";
import styles from "./OsWindow.module.css";

type OsWindowProps = {
  title: string;
  iconSrc: string;
  active: boolean;
  zIndex: number;
  maximized: boolean;
  frameStyle: CSSProperties;
  onActivate: () => void;
  onTitlePointerDown: (event: React.PointerEvent) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  children: ReactNode;
};

export function OsWindow({
  title,
  iconSrc,
  active,
  zIndex,
  maximized,
  frameStyle,
  onActivate,
  onTitlePointerDown,
  onMinimize,
  onMaximize,
  onClose,
  children,
}: OsWindowProps) {
  return (
    <div
      className={styles.window}
      style={{ ...frameStyle, zIndex }}
      onPointerDown={onActivate}
    >
      <div className={styles.shell}>
        <div
          className={`${styles.titleBar} ${active ? styles.titleBarActive : styles.titleBarInactive}`}
          onPointerDown={(event) => {
            if (maximized) {
              onActivate();
              return;
            }
            event.stopPropagation();
            onActivate();
            onTitlePointerDown(event);
          }}
        >
          <img
            src={iconSrc}
            alt=""
            className={styles.titleIcon}
            width={16}
            height={16}
          />
          <span className={styles.titleText}>{title}</span>
          <div className={styles.controls}>
            <button
              type="button"
              aria-label="Minimize"
              className={win98.controlBtn}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onMinimize}
            >
              −
            </button>
            <button
              type="button"
              aria-label={maximized ? "Restore" : "Maximize"}
              className={win98.controlBtnMax}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onMaximize}
            >
              {maximized ? "⧉" : "□"}
            </button>
            <button
              type="button"
              aria-label="Close"
              className={win98.controlBtnClose}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>
        <div className={`${styles.content} win98Scrollbar`}>{children}</div>
      </div>
    </div>
  );
}

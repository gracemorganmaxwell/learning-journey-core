"use client";

import { useEffect, useState } from "react";

import { DESKTOP_SHORTCUTS, WINDOW_META } from "@/app/lib/icons";
import type { DesktopWindowId } from "@/app/lib/icons";

import { StartMenu } from "./StartMenu";
import styles from "./Taskbar.module.css";

export const TASKBAR_H = 28;

type TaskbarProps = {
  onOpenWindow: (id: DesktopWindowId) => void;
  onTaskClick: (id: DesktopWindowId) => void;
  onShutDown?: () => void;
  openStates: Record<DesktopWindowId, { open: boolean; minimized: boolean }>;
  activeId: DesktopWindowId | null;
};

export function Taskbar({
  onOpenWindow,
  onTaskClick,
  onShutDown,
  openStates,
  activeId,
}: TaskbarProps) {
  const [now, setNow] = useState<Date | null>(null);
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timeLabel =
    now === null
      ? "––:––"
      : now.toLocaleTimeString("en-NZ", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

  return (
    <div className={styles.taskbar} style={{ height: TASKBAR_H }}>
      <div className={styles.startWrap}>
        <button
          type="button"
          className={startOpen ? styles.startBtnPressed : styles.startBtn}
          onClick={() => setStartOpen((open) => !open)}
          aria-expanded={startOpen}
          aria-haspopup="menu"
        >
          <span className={styles.startIcon} aria-hidden>
            <img src="/logo.png" alt="" className={styles.startLogo} width={16} height={16} />
          </span>
          Start
        </button>
        {startOpen ? (
          <StartMenu
            onClose={() => setStartOpen(false)}
            onOpenWindow={onOpenWindow}
            onShutDown={onShutDown}
          />
        ) : null}
      </div>

      <div className={styles.divider} aria-hidden />

      <div className={styles.tasks}>
        {DESKTOP_SHORTCUTS.map((shortcut) => {
          const state = openStates[shortcut.opens];
          if (!state.open) return null;
          const isActive = activeId === shortcut.opens && !state.minimized;
          const meta = WINDOW_META[shortcut.opens];
          return (
            <button
              key={shortcut.id}
              type="button"
              title={meta.title}
              className={isActive ? styles.taskBtnActive : styles.taskBtn}
              onClick={() => onTaskClick(shortcut.opens)}
            >
              <img
                src={shortcut.iconSrc}
                alt=""
                className={styles.taskIcon}
                width={16}
                height={16}
              />
              <span className={styles.taskLabel}>{shortcut.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.tray}>
        <img src="/favicon.ico" alt="" className={styles.trayIcon} width={16} height={16} />
        {now === null ? (
          <span className={styles.clock}>{timeLabel}</span>
        ) : (
          <time className={styles.clock} dateTime={now.toISOString()}>
            {timeLabel}
          </time>
        )}
      </div>
    </div>
  );
}

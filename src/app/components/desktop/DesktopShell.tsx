"use client";

import { DESKTOP_SHORTCUTS } from "@/app/lib/icons";

import { DesktopIcon } from "./DesktopIcon";
import styles from "./DesktopExperience.module.css";
import { Taskbar, TASKBAR_H } from "./Taskbar";

const emptyOpenStates = {
  blog: { open: false, minimized: false },
  about: { open: false, minimized: false },
  credits: { open: false, minimized: false },
  weather: { open: false, minimized: false },
} as const;

/** C4a — Win98 desktop shell only (icons, taskbar, Start menu). No windows yet. */
export function DesktopShell() {
  return (
    <div className={styles.desktop}>
      <div className={styles.monitor}>
        <div className={styles.monitorInner}>
          <div className={styles.workspace}>
            <div className={styles.iconGrid}>
              {DESKTOP_SHORTCUTS.map((shortcut) => (
                <DesktopIcon
                  key={shortcut.id}
                  label={shortcut.label}
                  iconSrc={shortcut.iconSrc}
                  onOpen={() => {}}
                />
              ))}
            </div>
          </div>

          <Taskbar
            onOpenWindow={() => {}}
            onTaskClick={() => {}}
            openStates={emptyOpenStates}
            activeId={null}
          />
        </div>
      </div>
    </div>
  );
}

export { TASKBAR_H };

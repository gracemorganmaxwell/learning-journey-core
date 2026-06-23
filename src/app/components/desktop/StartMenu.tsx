"use client";

import { DESKTOP_SHORTCUTS, icon } from "@/app/lib/icons";
import type { DesktopWindowId } from "@/app/lib/icons";

import styles from "./StartMenu.module.css";

type StartMenuProps = {
  onClose: () => void;
  onOpenWindow: (id: DesktopWindowId) => void;
  onShutDown?: () => void;
};

export function StartMenu({ onClose, onOpenWindow, onShutDown }: StartMenuProps) {
  return (
    <>
      <div className={styles.menuOverlay} onClick={onClose} aria-hidden />
      <div className={styles.menu} role="menu">
        <div className={styles.sidebar}>
          <span className={styles.sidebarLabel}>Learning Journey OS</span>
        </div>
        <div className={styles.items}>
          {DESKTOP_SHORTCUTS.map((shortcut) => (
            <button
              key={shortcut.id}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={() => {
                onOpenWindow(shortcut.opens);
                onClose();
              }}
            >
              <img
                src={shortcut.iconSrc}
                alt=""
                className={styles.itemIcon}
                width={20}
                height={20}
              />
              {shortcut.label}
            </button>
          ))}
          {onShutDown ? (
            <>
              <div className={styles.divider} aria-hidden />
              <button
                type="button"
                role="menuitem"
                className={styles.item}
                onClick={() => {
                  onClose();
                  onShutDown();
                }}
              >
                <img
                  src={icon.shutdown}
                  alt=""
                  className={styles.itemIcon}
                  width={16}
                  height={16}
                />
                Shut Down…
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

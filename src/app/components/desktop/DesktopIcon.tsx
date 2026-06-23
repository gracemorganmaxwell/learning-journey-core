"use client";

import styles from "./DesktopIcon.module.css";

type DesktopIconProps = {
  label: string;
  iconSrc: string;
  onOpen: () => void;
};

export function DesktopIcon({ label, iconSrc, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      className={styles.icon}
      onClick={onOpen}
      onDoubleClick={onOpen}
      aria-label={label}
    >
      <img src={iconSrc} alt="" className={styles.iconImg} width={32} height={32} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

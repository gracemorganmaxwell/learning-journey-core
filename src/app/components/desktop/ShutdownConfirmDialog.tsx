"use client";

import { useEffect } from "react";

import styles from "./ShutdownConfirmDialog.module.css";

type ShutdownConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function ShutdownConfirmDialog({
  onConfirm,
  onCancel,
}: ShutdownConfirmDialogProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shutdown-title"
      onClick={onCancel}
    >
      <div className={styles.dialog} onClick={(event) => event.stopPropagation()}>
        <div className={styles.titleBar} id="shutdown-title">
          Shut Down Learning Journey
        </div>
        <p className={styles.body}>
          Are you sure you want to close the session?
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.yesBtn} onClick={onConfirm}>
            Yes
          </button>
          <button type="button" className={styles.noBtn} onClick={onCancel} autoFocus>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

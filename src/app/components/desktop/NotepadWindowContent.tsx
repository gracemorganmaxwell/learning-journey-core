"use client";

import { useEffect, useState } from "react";

import styles from "./NotepadWindowContent.module.css";

type NotepadWindowContentProps = {
  filePath: string;
};

export function NotepadWindowContent({ filePath }: NotepadWindowContentProps) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(filePath)
      .then((response) => {
        if (!response.ok) throw new Error("not found");
        return response.text();
      })
      .then((body) => {
        if (!cancelled) setText(body);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [filePath]);

  if (error) {
    return <p className={styles.error}>Could not load {filePath}</p>;
  }

  if (text === null) {
    return <p className={styles.loading}>Loading…</p>;
  }

  return <pre className={`${styles.notepad} win98Scrollbar`}>{text}</pre>;
}

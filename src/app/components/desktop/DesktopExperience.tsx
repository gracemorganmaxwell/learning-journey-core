"use client";

import { useState } from "react";

import type { DesktopPostView } from "@/app/lib/desktop-posts";
import type { DesktopWindowId } from "@/app/lib/icons";

import styles from "./DesktopExperience.module.css";
import { DesktopWindowLayer } from "./DesktopWindowLayer";
import { ShutdownConfirmDialog } from "./ShutdownConfirmDialog";

type DesktopExperienceProps = {
  posts: DesktopPostView[];
  initialWindow?: DesktopWindowId;
  initialBlogSlug?: string;
  enableShutdown?: boolean;
};

/** C4b+ — full desktop with draggable windows. */
export function DesktopExperience({
  posts,
  initialWindow,
  initialBlogSlug,
  enableShutdown = true,
}: DesktopExperienceProps) {
  const [shutdownOpen, setShutdownOpen] = useState(false);

  const confirmShutdown = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.desktop}>
      <div className={styles.monitor}>
        <div className={styles.monitorInner}>
          <DesktopWindowLayer
            posts={posts}
            initialWindow={initialWindow}
            initialBlogSlug={initialBlogSlug}
            onShutDown={
              enableShutdown ? () => setShutdownOpen(true) : undefined
            }
          />
        </div>
      </div>

      {enableShutdown && shutdownOpen ? (
        <ShutdownConfirmDialog
          onConfirm={confirmShutdown}
          onCancel={() => setShutdownOpen(false)}
        />
      ) : null}
    </div>
  );
}

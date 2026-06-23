"use client";

import { useState } from "react";

import type { DesktopPostView } from "@/app/lib/desktop-posts";
import type { DesktopWindowId } from "@/app/lib/icons";

import type { WeatherSnapshot } from "@/app/lib/weather";

import styles from "./DesktopExperience.module.css";
import { DesktopWindowLayer } from "./DesktopWindowLayer";
import { ShutdownConfirmDialog } from "./ShutdownConfirmDialog";

type DesktopExperienceProps = {
  posts: DesktopPostView[];
  weather: WeatherSnapshot | null;
  initialWindow?: DesktopWindowId;
  initialBlogSlug?: string;
  enableShutdown?: boolean;
};

/** C4b+ — full desktop with draggable windows. */
export function DesktopExperience({
  posts,
  weather,
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
            weather={weather}
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

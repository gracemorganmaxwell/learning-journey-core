"use client";

import { useCallback, useEffect, useRef } from "react";

import type { DesktopPostView } from "@/app/lib/desktop-posts";
import { DESKTOP_SHORTCUTS, WINDOW_META, type DesktopWindowId } from "@/app/lib/icons";
import { useWindowManager } from "@/app/hooks/useWindowManager";

import { BlogWindowContent } from "./BlogWindowContent";
import { DesktopIcon } from "./DesktopIcon";
import styles from "./DesktopExperience.module.css";
import { OsWindow } from "./OsWindow";
import { PlaceholderWindowContent } from "./PlaceholderWindowContent";
import { Taskbar, TASKBAR_H } from "./Taskbar";

type DesktopWindowLayerProps = {
  posts: DesktopPostView[];
  initialWindow?: DesktopWindowId;
  initialBlogSlug?: string;
  onShutDown?: () => void;
  children?: React.ReactNode;
};

function renderWindowContent(
  id: DesktopWindowId,
  posts: DesktopPostView[],
  initialBlogSlug?: string,
) {
  switch (id) {
    case "blog":
      return (
        <BlogWindowContent posts={posts} initialSlug={initialBlogSlug} />
      );
    case "about":
      return (
        <PlaceholderWindowContent
          title="About Me"
          body="Learning Journey — a reflection portfolio and blog on Cloudflare Workers."
        />
      );
    case "learning-log":
      return (
        <PlaceholderWindowContent
          title="Learning Log"
          body="Learning log entries will appear here in a future update."
        />
      );
  }
}

export function DesktopWindowLayer({
  posts,
  initialWindow,
  initialBlogSlug,
  onShutDown,
  children,
}: DesktopWindowLayerProps) {
  const wm = useWindowManager();
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialWindow) {
      wm.openWindow(initialWindow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  const frameStyleFor = useCallback(
    (id: DesktopWindowId, rect: DOMRect | null) => {
      const frame = wm.frames[id];
      if (frame.maximized && rect) {
        return {
          left: 0,
          top: 0,
          width: rect.width,
          height: rect.height - TASKBAR_H,
        };
      }
      return {
        left: frame.x,
        top: frame.y,
        width: frame.w,
        height: frame.h,
      };
    },
    [wm.frames],
  );

  return (
    <>
      <div
        ref={desktopRef}
        className={styles.workspace}
        onPointerMove={(event) => {
          const rect = desktopRef.current?.getBoundingClientRect();
          if (rect) wm.onPointerMove(event, rect, TASKBAR_H);
        }}
        onPointerUp={wm.onPointerUp}
        onPointerCancel={wm.onPointerUp}
      >
        {children}

        <div className={styles.iconGrid}>
          {DESKTOP_SHORTCUTS.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              label={shortcut.label}
              iconSrc={shortcut.iconSrc}
              onOpen={() => wm.openWindow(shortcut.opens)}
            />
          ))}
        </div>

        {(Object.keys(WINDOW_META) as DesktopWindowId[]).map((id) => {
          const frame = wm.frames[id];
          if (!frame.open || frame.minimized) return null;
          const rect = desktopRef.current?.getBoundingClientRect() ?? null;
          const meta = WINDOW_META[id];
          return (
            <OsWindow
              key={id}
              title={meta.title}
              iconSrc={meta.iconSrc}
              active={wm.activeId === id}
              zIndex={wm.zIndexFor(id)}
              maximized={frame.maximized}
              frameStyle={frameStyleFor(id, rect)}
              onActivate={() => wm.focus(id)}
              onTitlePointerDown={(event) => wm.onTitlePointerDown(id, event)}
              onMinimize={() => wm.minimizeWindow(id)}
              onMaximize={() => wm.toggleMaximize(id)}
              onClose={() => wm.closeWindow(id)}
            >
              {renderWindowContent(
                id,
                posts,
                id === "blog" ? initialBlogSlug : undefined,
              )}
            </OsWindow>
          );
        })}
      </div>

      <Taskbar
        onOpenWindow={wm.openWindow}
        onTaskClick={wm.taskClick}
        onShutDown={onShutDown}
        openStates={wm.openStates}
        activeId={wm.activeId}
      />
    </>
  );
}

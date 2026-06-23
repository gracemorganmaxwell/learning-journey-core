"use client";

import { useCallback, useRef, useState } from "react";

import {
  ALL_WINDOW_IDS,
  INITIAL_FRAMES,
  type WindowFrame,
} from "@/app/lib/desktop-types";
import type { DesktopWindowId } from "@/app/lib/icons";

type DragState = {
  id: DesktopWindowId;
  grabX: number;
  grabY: number;
};

export function useWindowManager() {
  const [frames, setFrames] =
    useState<Record<DesktopWindowId, WindowFrame>>(INITIAL_FRAMES);
  const [zStack, setZStack] = useState<DesktopWindowId[]>([]);
  const [activeId, setActiveId] = useState<DesktopWindowId | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const preMaxRef = useRef<
    Partial<
      Record<DesktopWindowId, { x: number; y: number; w: number; h: number }>
    >
  >({});

  const focus = useCallback((id: DesktopWindowId) => {
    setActiveId(id);
    setZStack((prev) => [...prev.filter((x) => x !== id), id]);
  }, []);

  const openWindow = useCallback(
    (id: DesktopWindowId) => {
      const narrow =
        typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
      setFrames((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          open: true,
          minimized: false,
          ...(narrow ? { maximized: true } : {}),
        },
      }));
      focus(id);
    },
    [focus],
  );

  const closeWindow = useCallback((id: DesktopWindowId) => {
    setFrames((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false, maximized: false },
    }));
    setZStack((prev) => prev.filter((x) => x !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeWindow = useCallback((id: DesktopWindowId) => {
    setFrames((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const toggleMaximize = useCallback((id: DesktopWindowId) => {
    setFrames((prev) => {
      const f = prev[id];
      if (f.maximized) {
        const restore = preMaxRef.current[id] ?? {
          x: f.x,
          y: f.y,
          w: f.w,
          h: f.h,
        };
        return {
          ...prev,
          [id]: {
            ...f,
            maximized: false,
            ...restore,
          },
        };
      }
      preMaxRef.current[id] = { x: f.x, y: f.y, w: f.w, h: f.h };
      return {
        ...prev,
        [id]: { ...f, maximized: true, x: 0, y: 0, w: 0, h: 0 },
      };
    });
  }, []);

  const taskClick = useCallback(
    (id: DesktopWindowId) => {
      const f = frames[id];
      if (!f.open) {
        openWindow(id);
        return;
      }
      if (f.minimized) {
        setFrames((prev) => ({
          ...prev,
          [id]: { ...prev[id], minimized: false },
        }));
        focus(id);
        return;
      }
      if (activeId === id) {
        minimizeWindow(id);
      } else {
        focus(id);
      }
    },
    [frames, activeId, openWindow, focus, minimizeWindow],
  );

  const onTitlePointerDown = useCallback(
    (id: DesktopWindowId, event: React.PointerEvent) => {
      const f = frames[id];
      if (f.maximized) return;
      setDrag({
        id,
        grabX: event.clientX - f.x,
        grabY: event.clientY - f.y,
      });
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    },
    [frames],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent, desktopRect: DOMRect, taskbarH: number) => {
      if (!drag) return;
      const maxX = Math.max(0, desktopRect.width - frames[drag.id].w);
      const maxY = Math.max(
        0,
        desktopRect.height - frames[drag.id].h - taskbarH,
      );
      const x = Math.min(
        maxX,
        Math.max(0, event.clientX - desktopRect.left - drag.grabX),
      );
      const y = Math.min(
        maxY,
        Math.max(0, event.clientY - desktopRect.top - drag.grabY),
      );
      setFrames((prev) => ({
        ...prev,
        [drag.id]: { ...prev[drag.id], x, y },
      }));
    },
    [drag, frames],
  );

  const onPointerUp = useCallback(() => setDrag(null), []);

  const zIndexFor = useCallback(
    (id: DesktopWindowId) => {
      const idx = zStack.indexOf(id);
      return idx === -1 ? 10 : 20 + idx;
    },
    [zStack],
  );

  const openStates = ALL_WINDOW_IDS.reduce(
    (acc, id) => {
      acc[id] = {
        open: frames[id].open,
        minimized: frames[id].minimized,
      };
      return acc;
    },
    {} as Record<DesktopWindowId, { open: boolean; minimized: boolean }>,
  );

  return {
    frames,
    activeId,
    openStates,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    taskClick,
    focus,
    onTitlePointerDown,
    onPointerMove,
    onPointerUp,
    zIndexFor,
  };
}

import type { DesktopWindowId } from "@/app/lib/icons";

export type WindowFrame = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const DEFAULT_FRAME: Omit<WindowFrame, "open"> = {
  minimized: false,
  maximized: false,
  x: 48,
  y: 36,
  w: 520,
  h: 380,
};

export const INITIAL_FRAMES: Record<DesktopWindowId, WindowFrame> = {
  blog: { ...DEFAULT_FRAME, open: false, x: 60, y: 40, w: 680, h: 460 },
  about: { ...DEFAULT_FRAME, open: false, x: 80, y: 48, w: 440, h: 360 },
  "learning-log": {
    ...DEFAULT_FRAME,
    open: false,
    x: 90,
    y: 44,
    w: 500,
    h: 440,
  },
};

export const ALL_WINDOW_IDS = Object.keys(
  INITIAL_FRAMES,
) as DesktopWindowId[];

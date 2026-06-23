export const icon = {
  blog: "/icons/chrome.png",
  notepad: "/icons/notepad.png",
  shutdown: "/icons/this_computer.png",
} as const;

export type DesktopWindowId = "blog" | "about";

export type DesktopShortcut = {
  id: string;
  label: string;
  iconSrc: string;
  opens: DesktopWindowId;
};

export const DESKTOP_SHORTCUTS: DesktopShortcut[] = [
  {
    id: "blog",
    label: "Blog",
    iconSrc: icon.blog,
    opens: "blog",
  },
  {
    id: "about",
    label: "About Me",
    iconSrc: icon.notepad,
    opens: "about",
  },
];

export const WINDOW_META: Record<
  DesktopWindowId,
  { title: string; iconSrc: string }
> = {
  blog: { title: "Blog — Browser", iconSrc: icon.blog },
  about: { title: "About Me — Notepad", iconSrc: icon.notepad },
};

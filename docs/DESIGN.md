# Design — Win98 desktop (Pencil)

Visual spec for the public `/desktop` experience. Source of truth: Pencil artboards generated from [`designs/generate-lj-core-pen.mjs`](generate-lj-core-pen.mjs) (ported from `learning-journey-os`).

Open [`designs/learning-journey-core.pen`](learning-journey-core.pen) in Pencil to inspect artboards.

## Artboards (public desktop)

| # | Artboard | Use |
|---|----------|-----|
| — | **Component Sheet** | Win95 buttons, Start (normal/pressed), taskbar buttons, OsWindow active/inactive, Start menu |
| 02 | **Desktop — Idle** | Wallpaper, 2-column shortcuts, empty taskbar |
| 03 | **Desktop — Busy** | Multiple OsWindows + taskbar task buttons |
| 04 | **Desktop — Start Menu Open** | Sidebar banner, menu items, Shut Down… |
| 05–11 | App windows | Blog browser, Notepad, etc. (reference for window content) |
| 16 | **Interaction Legend** | Double-click, taskbar toggle, Start menu behaviour |

Admin artboards (12–15) and Access gates (01) are **out of scope** for `learning-journey-core` (compose lives at `/composeblog`).

## Motif

**Win95/98 chrome** with a **vaporwave palette**: pink / purple / blue gradients on title bars and Start menu sidebar; lavender desktop wallpaper; gray-purple taskbar (`#d8cce8`).

Adapted from [FolderGameChallenge](https://github.com/gracemorganmaxwell/FolderGameChallenge) retro icons (see `learning-journey-os` README).

## Tokens

Implemented in [`src/app/styles/win98-tokens.css`](../src/app/styles/win98-tokens.css) — mirrors `C`, `F`, and bevel helpers in the generator:

- **Desktop:** gradient `#faf5ff` → `#fce7f3` → `#ede9fe` inside monitor bezel
- **Outer frame:** purple → pink → deep indigo (full viewport behind monitor)
- **Taskbar:** `#d8cce8`, top highlight bevel
- **Selection / hover:** `#a855f7`
- **Title bar (active):** gradient deep purple → purple → pink → blue
- **Fonts:** Playfair Display (headings), Lora (UI), Source Serif 4 (content)

## Layout

```
[ outer gradient viewport ]
  └─ Monitor bezel (#27272a, rounded)
       ├─ Desktop workspace (gradient + icons + windows + weather)
       └─ Taskbar (28px)
```

- Shortcuts: **2 columns**, top-left (80×80 cells, ~96px column pitch)
- Double-click shortcut → open window
- Taskbar: Start | running tasks (sunken = active) | tray (favicon + clock)

## Regenerate Pencil file

```bash
node designs/generate-lj-core-pen.mjs
```

Requires `../public/logo.png` and icons under `../public/icons/` (same layout as this repo).

## Implementation map

| Pencil | Code |
|--------|------|
| `monitorShell` | `DesktopExperience.module.css` — `.monitor`, `.monitorInner` |
| `desktopShortcuts` | `DesktopIcon` + `.iconGrid` |
| `taskbar` | `Taskbar.tsx` |
| `startMenu` | `StartMenu.tsx` |
| `osWindow` | `OsWindow.tsx` |
| Blog browser | `BlogWindowContent.tsx` |

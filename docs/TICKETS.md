# GitHub issues — Learning Journey Core

One ticket = one commit (you commit; the agent does not).

Create issues manually on GitHub (copy bodies below). No `scripts/create-github-issues.sh` in repo yet — run `gh issue create` after `gh auth login` if you prefer CLI.

---

## C1 — Verify Phase A locally

**Labels:** `docs`, `qa`

### Summary

Confirm `/blogcompose` → D1 → `/desktop` works on `pnpm dev` before deploying.

### Scope

- [/] `pnpm install && pnpm db:migrate:local && pnpm dev`
- [/] `/blogcompose` — create post with **Publish immediately** checked
- [/] `/desktop` — post appears in list
- [/] `/desktop/:slug` — markdown renders, HTML is sanitized
- [/] `pnpm build` passes

### Acceptance

All checkboxes above pass. No code changes required unless bugs found.

---

## C2 — Deploy live on workers.dev

**Labels:** `feature`, `infra`

### Summary

First production deploy: remote D1, migrations, `pnpm release`. App reachable on `https://learning-journey-core.<account>.workers.dev`.

### Scope

- [/] `pnpm wrangler login`
- [/] `pnpm wrangler d1 create learning-journey-db` (if not already created)
- [/] Paste real `database_id` into `wrangler.jsonc`
- [/] `pnpm db:migrate:remote`
- [/] `pnpm release`
- [/] README — add live URL

### Acceptance

- [ ] workers.dev loads `/`, `/blogcompose`, `/desktop`
- [ ] Compose on prod saves to remote D1
- [ ] Published post visible on prod `/desktop`

### Your commit

```
chore(deploy): configure remote D1 and workers.dev release

Closes #2
```

---

## C3 — Cloudflare Access auth on /composeblog

**Labels:** `feature`, `infra`, `docs`

### Summary

Protect `/composeblog` so only you can author posts. Public `/desktop` stays open.

### Scope

- [x] `docs/ADMIN.md` — Zero Trust Access app for `/composeblog` on workers.dev hostname
- [x] `.dev.vars.example` — `COMPOSE_DEV_BYPASS=true` for local only
- [x] `src/app/middleware/requireComposeAccess.ts` — prod: require `Cf-Access-Authenticated-User-Email`; local: bypass flag
- [x] Wire middleware in `src/worker.tsx` for `/composeblog` (and legacy `/blogcompose` redirect)
- [ ] **Manual:** Access policy — allow your email/GitHub identity

### Acceptance

- [x] Local with bypass → `/composeblog` loads
- [x] Local without bypass → 403
- [ ] Prod incognito `/composeblog` → Cloudflare login
- [x] Prod `/desktop` still public (no login)
- [x] `pnpm build` passes

### Your commit

```
feat(auth): protect composeblog with Cloudflare Access

Closes #3
```

---

## C4 — Win98 desktop (epic)

**Status:** C4a–C4c **implemented on disk**; commits pending per [docs/C4-COMMITS.md](C4-COMMITS.md). Git history previously stopped at C3.

Split into **C4a–C4d** — one issue = one commit. **Ship C4a → C4b → C4c only**; skip C4d (superseded by [C5d](#c5d--weather-window-pencil--openweather)).

**Commit guide:** [docs/C4-COMMITS.md](C4-COMMITS.md) — exact `git add` lists and per-stage `desktop.tsx` snippets.

**Reference:** Pencil artboards in [`designs/learning-journey-core.pen`](designs/learning-journey-core.pen) — see [docs/DESIGN.md](DESIGN.md); tokens in `designs/generate-lj-core-pen.mjs` → `src/app/styles/win98-tokens.css`

---

## C4a — Win98 desktop shell

**Labels:** `feature`, `design`

### Summary

Replace plain `/desktop` list with full-viewport Win98 desktop: wallpaper, desktop icons, taskbar, Start menu.

### Scope

- [x] Win98 CSS tokens — Pencil vaporwave palette, lavender desktop gradient, purple selection (`win98-tokens.css`)
- [x] `DesktopShell`, `DesktopIcon`, `Taskbar`, `StartMenu`
- [x] Desktop shortcuts: Blog, About Me, Learning Log (placeholders OK)
- [x] Refactor `desktop.tsx` to render shell

### Acceptance

- [x] `/desktop` = blue wallpaper, icons, taskbar, Start menu opens
- [x] No compose/admin links on desktop
- [x] `pnpm build` passes

### Your commit

```
feat(ui): add Win98 desktop shell with taskbar and start menu

Closes #4a
```

---

## C4b — Blog window

**Labels:** `feature`, `design`

### Summary

Published posts open in a browser-style Win98 window; deep links work.

### Scope

- [x] `useWindowManager`, `OsWindow`, `BlogWindowContent`
- [x] Double-click Blog icon / Start menu → open window
- [x] Taskbar task buttons (active/minimize toggle)
- [x] `/desktop/:slug` opens desktop with blog window + post selected

### Acceptance

- [x] Blog list + markdown reader inside window chrome
- [x] `/composeblog` unchanged (plain admin UI)
- [x] `pnpm build` passes

### Your commit

```
feat(ui): open published posts in Win98 blog window

Closes #4b
```

---

## C4c — Shut Down confirmation

**Labels:** `feature`, `design`

### Summary

Start menu **Shut Down…** shows a Win98 confirm dialog before leaving the session.

### Scope

- [x] `Shut Down…` item in Start menu (groove divider above)
- [x] `ShutdownConfirmDialog` — “Are you sure you want to close the session?”
- [x] Yes → navigate to `/`; No / Escape / overlay click → stay

### Acceptance

- [x] Shut Down only visible when Start menu is open
- [x] Confirm text matches spec; Yes returns to landing
- [x] `pnpm build` passes

### Your commit

```
feat(ui): add shutdown confirmation to start menu

Closes #4c
```

---

## C4d — Christchurch weather widget *(superseded)*

**Labels:** `feature`, `infra` · **Status:** Cancelled — floating sidebar widget removed; replaced by [C5d](#c5d--weather-window-pencil--openweather) (Pencil weather **window** + OpenWeather).

Do **not** commit C4d. Close GitHub issue #4d with note: *Superseded by C5d weather window.*

---

## C5 — Desktop polish (epic)

Next round after C4. One issue = one commit. Suggested order: **C5a → C5b/C5c/C5d/C5g** (parallel where noted) → **C5e → C5f**.

---

## C5a — Remove Learning Log

**Labels:** `feature`, `design`

### Summary

Remove the Learning Log shortcut, menu item, and placeholder window from the Win98 desktop.

### Scope

- [ ] Remove `"learning-log"` from `src/app/lib/icons.ts`, `src/app/lib/desktop-types.ts`
- [ ] Remove learning-log cases from `DesktopWindowLayer.tsx`, `DesktopShell.tsx`, `StartMenu.tsx`
- [ ] Update `designs/generate-lj-core-pen.mjs` shortcuts (drop Learning Log; keep slot for Credits.txt in C5c)
- [ ] Regenerate `designs/learning-journey-core.pen`; update `docs/DESIGN.md`

### Acceptance

- [ ] No Learning Log icon, Start menu entry, or window
- [ ] `pnpm build` passes

### Your commit

```
feat(ui): remove learning log from desktop

Closes #5a
```

---

## C5b — Responsive monitor shell (80% / mobile)

**Labels:** `feature`, `design`

### Summary

Scale the Win98 monitor bezel to **80vw × 80dvh** on tablet/desktop; full-bleed phone mode on narrow viewports.

### Scope

- [ ] `DesktopExperience.module.css` — `.monitor` breakpoints (≥768px: 80vw × 80dvh centered; <768px: 100dvw × 100dvh, minimal bezel)
- [ ] `.workspace` — tighter icon column on phone; taskbar pinned bottom
- [ ] Optional: `useWindowManager.ts` — default maximize windows on narrow screens

### Acceptance

- [ ] iPad/desktop: monitor ~80% of viewport, centered in outer gradient
- [ ] Phone width: edge-to-edge “phone app” feel
- [ ] `pnpm build` passes

### Your commit

```
feat(ui): responsive Win98 monitor shell for tablet and phone

Closes #5b
```

---

## C5c — Credits.txt Notepad window

**Labels:** `feature`, `design`

### Summary

Add **Credits.txt** desktop shortcut opening a Notepad-style window with attribution text.

### Scope

- [ ] Add `public/credits.txt` (aconfuseddragon icon attribution + Learning Journey credit — from Pencil/os)
- [ ] Copy `text_file.png` from `learning-journey-os/public/icons/` → `public/icons/`
- [ ] Add `credits` window id + desktop shortcut (Learning Log slot in 2-column grid)
- [ ] `NotepadWindowContent` or extend `PlaceholderWindowContent` — fetch `/credits.txt`, cream `#fffff0` background per Pencil artboard 11
- [ ] Update `designs/generate-lj-core-pen.mjs` shortcuts to match runtime icons

### Acceptance

- [ ] Double-click **Credits.txt** opens Notepad window with attribution text
- [ ] `pnpm build` passes

### Your commit

```
feat(ui): add Credits.txt Notepad window on desktop

Closes #5c
```

---

## C5d — Weather window (Pencil + OpenWeather)

**Labels:** `feature`, `design`, `infra`

### Summary

Replace the removed floating weather widget with a **Weather — Info** OsWindow; restore Christchurch OpenWeather fetch.

### Scope

- [ ] Pencil artboard **12 App — Weather (Info)** in `designs/generate-lj-core-pen.mjs` (standard osWindow chrome, city/temp/condition/icon)
- [ ] `WeatherWindowContent.tsx` inside `OsWindow` — delete or deprecate `WeatherWidget.tsx`
- [ ] Restore server fetch in `desktop.tsx` / `desktop-post.tsx` via existing `src/app/lib/weather.ts`
- [ ] Env: `OPENWEATHER_API_KEY` in wrangler secret + `.dev.vars.example`; document in `docs/WEATHER.md`
- [ ] Desktop shortcut or Start menu item opens weather window (not auto-open on load)

### Acceptance

- [ ] Open Weather window → Christchurch temp + condition when key active
- [ ] Graceful fallback inside window when API unavailable
- [ ] No floating sidebar widget on workspace
- [ ] `pnpm build` passes

### Your commit

```
feat(ui): add Christchurch weather window via OpenWeather

Closes #5d
```

---

## C5e — File manager — virtual filesystem shell

**Labels:** `feature`, `design`

### Summary

Win98 Explorer window with virtual tree (My Computer → Learning Journey → Blog, About, Credits); double-click opens existing windows.

### Scope

- [ ] New window id `files` — icon: `this_computer.png` or `folder_closed.png` from `-os`
- [ ] `FileManagerWindowContent.tsx` + CSS — left tree, right pane listing, toolbar strip, status bar (“3 object(s)”)
- [ ] Double-click items call `useWindowManager` to open blog/about/credits windows

### Acceptance

- [ ] File manager opens from desktop/Start menu
- [ ] Tree navigation + double-click opens correct window
- [ ] Win98 sunken panes and status bar styling
- [ ] `pnpm build` passes

### Depends on

C5c (Credits as tree node)

### Your commit

```
feat(ui): add virtual filesystem file manager window

Closes #5e
```

---

## C5f — File manager — project content pane

**Labels:** `feature`, `design`

### Summary

Populate file manager right pane with project folders/cards (port from `learning-journey-os` Projects window).

### Scope

- [ ] Port `ProjectsWindowContent` pattern + `PROJECT_FOLDERS` from `-os` into `-core`
- [ ] Vaporwave project cards with tags/links in explorer right pane
- [ ] Reference: retro-portfolio `ProjectsWindow.tsx` for static list in resizable window

### Acceptance

- [ ] Right pane shows project cards when a project folder is selected
- [ ] Links open in new tab where appropriate
- [ ] `pnpm build` passes

### Depends on

C5e

### Your commit

```
feat(ui): add project cards to file manager pane

Closes #5f
```

---

## C5g — Win98 authenticity backlog doc

**Labels:** `docs`

### Summary

Research classic Win98 UX + retro-portfolio patterns; write prioritized roadmap — **no implementation**.

### Scope

- [ ] Create `docs/WIN98-BACKLOG.md` — P0/P1/P2 table with ticket stubs
- [ ] Sources: classic Windows 95/98 UX, [retro-portfolio](https://github.com/gracemorganmaxwell/retro-portfolio), Pencil artboards in `docs/DESIGN.md`
- [ ] Include: inactive title bars, 8-direction resize, help tooltips, context menus, Recycle Bin icon, sounds/Easter eggs as P2

### Acceptance

- [ ] Doc exists with prioritized feature table
- [ ] No runtime code changes

### Your commit

```
docs: add Win98 authenticity backlog roadmap

Closes #5g
```

---

## Workflow

1. Assign yourself the issue
2. Implement scope only
3. `pnpm build` (+ local/prod checks in issue)
4. You commit with `Closes #N`
5. Push; close issue on GitHub if auto-close did not run

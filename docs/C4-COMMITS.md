# C4 — one commit per sub-issue

You commit each feature yourself. Stage **only** the files listed per step, then commit with the message shown. Unstaged files can stay on disk between steps; each step should leave `pnpm build` passing.

**Order:** C4a → C4b → C4c → C4d

---

## C4a — Win98 desktop shell

**Goal:** `/desktop` shows wallpaper, icons, taskbar, Start menu. No blog windows, shutdown dialog, or weather yet. `/desktop/:slug` stays the old plain reader until C4b.

### Stage

```bash
git add \
  public/icons/chrome.png \
  public/icons/notepad.png \
  public/icons/calendar.png \
  public/logo.png \
  public/favicon.ico \
  src/app/styles/win98-tokens.css \
  src/app/lib/icons.ts \
  src/app/components/desktop/DesktopIcon.module.css \
  src/app/components/desktop/DesktopIcon.tsx \
  src/app/components/desktop/StartMenu.module.css \
  src/app/components/desktop/StartMenu.tsx \
  src/app/components/desktop/Taskbar.module.css \
  src/app/components/desktop/Taskbar.tsx \
  src/app/components/desktop/DesktopShell.tsx \
  src/app/components/desktop/DesktopExperience.module.css \
  src/app/components/desktop/win98.module.css \
  src/app/pages/desktop.tsx
```

### `desktop.tsx` for this commit

Replace `src/app/pages/desktop.tsx` with:

```tsx
import { DesktopShell } from "@/app/components/desktop/DesktopShell";

import "@/app/styles/win98-tokens.css";

export async function DesktopPage() {
  return <DesktopShell />;
}
```

Do **not** stage `DesktopExperience.tsx`, `DesktopWindowLayer.tsx`, window/blog/shutdown/weather files, or `desktop-post.tsx` changes yet.

### Verify

```bash
pnpm build
```

Open `/desktop` — shell only. `/desktop/:slug` still uses the pre-C4 plain page from `HEAD`.

### Commit

```bash
git commit -m "$(cat <<'EOF'
feat(ui): add Win98 desktop shell with taskbar and start menu

Closes #4a
EOF
)"
```

---

## C4b — Blog window

**Goal:** Posts open in a Win98 browser window; `/desktop/:slug` deep-links into the blog window. Shutdown and weather code may exist on disk but stay **disabled**.

### Stage

```bash
git add \
  src/app/hooks/useWindowManager.ts \
  src/app/lib/desktop-types.ts \
  src/app/lib/desktop-posts.ts \
  src/app/components/desktop/DesktopExperience.tsx \
  src/app/components/desktop/DesktopWindowLayer.tsx \
  src/app/components/desktop/OsWindow.module.css \
  src/app/components/desktop/OsWindow.tsx \
  src/app/components/desktop/BlogWindowContent.module.css \
  src/app/components/desktop/BlogWindowContent.tsx \
  src/app/components/desktop/PlaceholderWindowContent.module.css \
  src/app/components/desktop/PlaceholderWindowContent.tsx \
  src/app/components/desktop/ShutdownConfirmDialog.module.css \
  src/app/components/desktop/ShutdownConfirmDialog.tsx \
  src/app/components/desktop/WeatherWidget.module.css \
  src/app/components/desktop/WeatherWidget.tsx \
  src/app/pages/desktop.tsx \
  src/app/pages/desktop-post.tsx
```

`ShutdownConfirmDialog` and `WeatherWidget` are included so `DesktopExperience` imports resolve; they stay off until C4c/C4d enable them via props.

### `desktop.tsx` for this commit

```tsx
import { listPublishedPosts } from "@/db";
import { DesktopExperience } from "@/app/components/desktop/DesktopExperience";
import { formatDate, renderMarkdownToHtml } from "@/app/lib/markdown";
import type { DesktopPostView } from "@/app/lib/desktop-posts";

import "@/app/styles/win98-tokens.css";

async function loadDesktopPosts(): Promise<DesktopPostView[]> {
  const rows = await listPublishedPosts();
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    dateLabel: formatDate(row.created_at),
    html: renderMarkdownToHtml(row.body_md),
  }));
}

export async function DesktopPage() {
  const posts = await loadDesktopPosts();

  return (
    <DesktopExperience
      posts={posts}
      enableShutdown={false}
      enableWeather={false}
    />
  );
}
```

### `desktop-post.tsx` for this commit

Use the same `DesktopExperience` props as above, plus `initialWindow="blog"` and `initialBlogSlug={params.slug}` (see current file in repo).

### Verify

```bash
pnpm build
```

Double-click **Blog** — window opens. No Shut Down item effect yet (menu item hidden when `onShutDown` unset). No weather widget.

### Commit

```bash
git commit -m "$(cat <<'EOF'
feat(ui): open published posts in Win98 blog window

Closes #4b
EOF
)"
```

---

## C4c — Shut Down confirmation

**Goal:** Start menu **Shut Down…** opens confirm dialog; Yes navigates to `/`.

### Stage

```bash
git add \
  public/icons/this_computer.png \
  src/app/pages/desktop.tsx \
  src/app/pages/desktop-post.tsx
```

### `desktop.tsx` / `desktop-post.tsx` change

Set `enableShutdown={true}` (or omit — default is `true`). Keep `enableWeather={false}` and **no** weather fetch:

```tsx
return (
  <DesktopExperience
    posts={posts}
    enableShutdown={true}
    enableWeather={false}
  />
);
```

### Verify

```bash
pnpm build
```

Start → Shut Down… → confirm → Yes returns to `/`.

### Commit

```bash
git commit -m "$(cat <<'EOF'
feat(ui): add shutdown confirmation to start menu

Closes #4c
EOF
)"
```

---

## C4d — Christchurch weather widget

**Goal:** Weather panel on desktop load via OpenWeather One Call API 4.0.

### Stage

```bash
git add \
  src/app/lib/weather.ts \
  .dev.vars.example \
  worker-configuration.d.ts \
  wrangler.jsonc \
  docs/WEATHER.md \
  src/app/pages/desktop.tsx \
  src/app/pages/desktop-post.tsx \
  README.md \
  docs/TICKETS.md \
  .github/ISSUES.md
```

### `desktop.tsx` / `desktop-post.tsx` change

Restore full version with weather fetch (see current repo files):

```tsx
import { fetchChristchurchCurrent } from "@/app/lib/weather";

const [posts, weather] = await Promise.all([
  loadDesktopPosts(),
  fetchChristchurchCurrent(),
]);

return <DesktopExperience posts={posts} weather={weather} />;
```

### Secrets (not committed)

```bash
# local .dev.vars
OPENWEATHER_API_KEY=your_key_here

# production
pnpm wrangler secret put OPENWEATHER_API_KEY
```

### Verify

```bash
pnpm build
```

`/desktop` shows Christchurch weather when the key and One Call subscription are active.

### Commit

```bash
git commit -m "$(cat <<'EOF'
feat(ui): add Christchurch weather widget via OpenWeather

Closes #4d
EOF
)"
```

---

## Quick reference

| Commit | New behaviour | Key files |
|--------|---------------|-----------|
| C4a | Shell only | `DesktopShell.tsx`, shell components |
| C4b | Blog windows | `DesktopWindowLayer.tsx`, `BlogWindowContent.tsx`, pages |
| C4c | Shut Down dialog | `this_computer.png`, `enableShutdown={true}` on pages |
| C4d | Weather widget | `weather.ts`, env docs, weather fetch on pages |

## Already implemented on disk?

If all C4 files are already present and you have not committed yet, start from **C4a** staging only (leave other files unstaged). After each commit, stage the next group. The final tree matches the current full implementation.

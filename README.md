# Learning Journey Core

 Blog CMS on **RedwoodSDK + Cloudflare Workers + D1**. Phase A ships two routes with no auth and styling yet.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with links to both apps |
| `/composeblog` | Author hub — list, create, edit, delete posts |
| `/composeblog/new` | Create a new post |
| `/composeblog/edit/:id` | Edit or delete a post |
| `/desktop` | **Read-only** — lists published posts |
| `/desktop/:slug` | **Read-only** — single post reader |

`/blogcompose` redirects to `/composeblog` (legacy URL).

## Local development

```bash
pnpm install
pnpm db:migrate:local   # required first time (creates BlogPost table locally)
pnpm dev
```

If you see `no such table: BlogPost`, run `pnpm db:migrate:local` again and restart `pnpm dev`.

Open [http://localhost:5173](http://localhost:5173).

## Live site

**Production:** https://learning-journey-core.gracemorganmaxwell.workers.dev

| Route | URL |
|-------|-----|
| Landing | https://learning-journey-core.gracemorganmaxwell.workers.dev/ |
| Compose | https://learning-journey-core.gracemorganmaxwell.workers.dev/composeblog |
| Desktop | https://learning-journey-core.gracemorganmaxwell.workers.dev/desktop |

### Useful commands

```bash
pnpm build          # production build (must pass before deploy)
pnpm types          # TypeScript check
pnpm db:migrate:local   # apply D1 migrations to local SQLite
pnpm db:migrate:remote  # apply D1 migrations to remote D1
pnpm release        # build + deploy to Cloudflare Workers
```

## Deploy to Cloudflare

1. Log in: `pnpm wrangler login`
2. Create the remote D1 database (first time only):

   ```bash
   pnpm wrangler d1 create learning-journey-db
   ```

   Copy the returned `database_id` into `wrangler.jsonc` under `d1_databases`.

3. Apply remote migrations:

   ```bash
   pnpm db:migrate:remote
   ```

4. Deploy:

   ```bash
   pnpm release
   ```

Your app will be available at `https://learning-journey-core.<account>.workers.dev` (exact subdomain depends on your Cloudflare account).

## Stack

- [RedwoodSDK](https://docs.rwsdk.com) 1.2 — React Server Components, `route()` routing, `serverAction`
- Cloudflare Workers + Vite (`@cloudflare/vite-plugin`)
- D1 — `BlogPost` table (`slug`, `title`, `excerpt`, `body_md`, `published`, timestamps)
- `marked` + `sanitize-html` — markdown rendering on the reader

## Project layout

```
src/
  worker.tsx              # defineApp + routes
  db/index.ts             # insertPost, listPublishedPosts, getPostBySlug
  app/
    actions/blog.ts       # submitPost server action
    components/           # BlogComposeForm (client)
    lib/markdown.ts       # render + sanitize
    pages/                # landing, blog-compose, desktop, desktop-post
migrations/
  0001_blog.sql           # BlogPost schema
```

## Roadmap

### Phase B — Confirm on workers.dev
- Smoke-test compose → publish → read flow on the deployed URL
- Verify D1 remote migrations and data persistence

### Phase C — Auth
- Protect `/composeblog` (Cloudflare Access or app-level auth)
- Optional author identity on posts

### Phase D — Styling + Win98 desktop
- Port reflection-portfolio / `learning-journey-os` desktop chrome
- `OsWindow`, taskbar, retro UI over the same D1-backed posts

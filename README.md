# Learning Journey Core

 Blog CMS on **RedwoodSDK + Cloudflare Workers + D1**. Phase A ships two routes with no auth and styling yet.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with links to both apps |
| `/blogcompose` | CMS form — title, slug, excerpt, markdown body, publish checkbox |
| `/desktop` | Lists published posts |
| `/desktop/:slug` | Reader view for a single published post |

## Local development

```bash
pnpm install
pnpm db:migrate:local
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

**Local `/composeblog`:** allowed automatically during `pnpm dev` (Cloudflare Access does not run on localhost). To test 403 locally, add `COMPOSE_DEV_BYPASS=false` to `.dev.vars` and restart dev.

## Live site

**Production:** https://learning-journey-core.gracemorganmaxwell.workers.dev

| Route | URL |
|-------|-----|
| Landing | https://learning-journey-core.gracemorganmaxwell.workers.dev/ |
| Compose | https://learning-journey-core.gracemorganmaxwell.workers.dev/blogcompose |
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
- `/composeblog` protected by Cloudflare Access + Worker middleware (see [docs/ADMIN.md](docs/ADMIN.md))
- Local dev: `/composeblog` open by default; optional `COMPOSE_DEV_BYPASS=false` in `.dev.vars` to test 403

### Phase D — Styling + Win98 desktop
- Port reflection-portfolio / `learning-journey-os` desktop chrome
- `OsWindow`, taskbar, retro UI over the same D1-backed posts

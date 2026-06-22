# GitHub issues — Learning Journey Core

One ticket = one commit (you commit; the agent does not).

Create issues:

```bash
chmod +x scripts/create-github-issues.sh
./scripts/create-github-issues.sh
```

Or copy bodies below into GitHub manually.

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

###  Commit (optional — only if you add docs from this ticket)

```
docs: add issue tracker and local QA checklist

Closes #1
```

---

## C2 — Deploy live on workers.dev

**Labels:** `feature`, `infra`

### Summary

First production deploy: remote D1, migrations, `pnpm release`. App reachable on `https://learning-journey-core.<account>.workers.dev`.

### Scope

- [ ] `pnpm wrangler login`
- [ ] `pnpm wrangler d1 create learning-journey-db` (if not already created)
- [ ] Paste real `database_id` into `wrangler.jsonc`
- [ ] `pnpm db:migrate:remote`
- [ ] `pnpm release`
- [ ] README — add live URL

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

Protect `/composeblog` (and `/composeblog/*`) so only you can author posts. Public `/desktop` stays open.

### Scope

- [ ] `docs/ADMIN.md` — Zero Trust Access app for `/composeblog` on workers.dev hostname
- [ ] `.dev.vars.example` — `COMPOSE_DEV_BYPASS=true` for local only
- [ ] `src/app/middleware/requireComposeAccess.ts` — prod: require `Cf-Access-Authenticated-User-Email`; local: bypass flag
- [ ] Wire middleware in `src/worker.tsx` for `/composeblog` and `/composeblog/*` only
- [ ] **Manual:** Access policy — allow your email/GitHub identity

### Acceptance

- [ ] Local with bypass → `/blogcompose` loads
- [ ] Local without bypass → 403
- [ ] Prod incognito `/blogcompose` → Cloudflare login
- [ ] Prod `/desktop` still public (no login)
- [ ] `pnpm build` passes

### Your commit

```
feat(auth): protect composeblog with Cloudflare Access

Closes #3
```

---

## C4 — Win98 desktop chrome

**Labels:** `feature`, `design`

### Summary

Replace plain `/desktop` list UI with reflection-portfolio Win98 desktop (Window, Taskbar, StartMenu). Same D1 posts; styling only.

### Scope

- [ ] Win98 tokens in Tailwind/CSS (MS Sans, `#2b89da` wallpaper, `#000080` title bars)
- [ ] Port or adapt `Window`, `Taskbar`, `StartMenu`, `DesktopIcon` from reflection-portfolio
- [ ] Blog opens in browser-style window; list + reader inside chrome
- [ ] Optional: `framer-motion` window open animation

### Reference

- `/Users/gracie/Dev/reflection-portfolio/src/components/ui/`
- `/Users/gracie/Dev/learning-journey-os/designs/learning-journey-os.pen`

### Acceptance

- [ ] `/desktop` is full Win98 desktop experience
- [ ] Published posts readable from Blog window
- [ ] `/blogcompose` unchanged (plain admin UI)
- [ ] `pnpm build` passes; prod smoke test after deploy

### Your commit

```
feat(ui): add Win98 desktop chrome to public frontend

Closes #4
```

---

## Workflow

1. Assign yourself the issue
2. Implement scope only
3. `pnpm build` (+ local/prod checks in issue)
4. You commit with `Closes #N`
5. Push; close issue on GitHub if auto-close did not run

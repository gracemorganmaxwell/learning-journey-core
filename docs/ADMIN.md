# Cloudflare Access — protect /composeblog

Solo author access for **Learning Journey Core**. Public readers use `/desktop` with no login.

**Production hostname:** `learning-journey-core.gracemorganmaxwell.workers.dev`

---

## 1. Create the Access application

1. [Cloudflare dashboard](https://dash.cloudflare.com) → **Zero Trust** → **Access** → **Applications**
2. **Add an application** → **Self-hosted**
3. Settings:
   - **Application name:** `Learning Journey — Compose`
   - **Session duration:** 24 hours (or your preference)
   - **Application domain:**
     - **Subdomain:** `learning-journey-core`
     - **Domain:** `gracemorganmaxwell.workers.dev` (your workers.dev subdomain)
     - **Path:** `/composeblog` (covers `/composeblog/*` when using path prefix matching — verify **Include** matches subpaths)

If path matching is separate, add paths:

- `/composeblog`
- `/composeblog/*`

4. **Identity providers:** GitHub and/or one-time PIN email (your choice)
5. **Policy:** **Allow** — Include rule: your email and/or GitHub identity only
6. Add a **Block** catch-all or rely on default deny for other users
7. Save

---

## 2. Worker defense-in-depth (already in repo)

Even with Access at the edge, the Worker checks `Cf-Access-Authenticated-User-Email` on:

- `/composeblog`, `/composeblog/new`, `/composeblog/edit/:id`
- `/blogcompose` (legacy redirect)
- Blog server actions (`submitPost`, `updatePostAction`, `deletePostAction`)

Without the header → **403** from the Worker.

Optional wrangler var (production secret or var):

```bash
pnpm wrangler secret put COMPOSE_ALLOWED_EMAIL
# enter your email — rejects Access headers that do not match
```

**Never** set `COMPOSE_DEV_BYPASS` in production.

---

## 3. Local development

Access does **not** run on `localhost`. During `pnpm dev`, `/composeblog` is **allowed by default** — no `.dev.vars` file needed.

To test the Worker 403 path locally:

```bash
echo "COMPOSE_DEV_BYPASS=false" >> .dev.vars
pnpm dev
```

Remove that line (or delete `.dev.vars`) to restore normal local access.

---

## 4. Verify production

| Test | Expected |
|------|----------|
| Incognito `https://learning-journey-core.gracemorganmaxwell.workers.dev/composeblog` | Cloudflare Access login (not the compose UI) |
| After login | Compose hub loads |
| Incognito `/desktop` | Public — no login |
| `curl -I https://…/composeblog` (no Access cookies) | 403 from Worker (after Access, or direct if Access misconfigured) |

---

## 5. Deploy after C3 code

```bash
pnpm build
pnpm release
```

Your commit: `feat(auth): protect composeblog with Cloudflare Access` — `Closes #3`

Configure Access in the dashboard **before** or **immediately after** deploy so you are not locked out of compose in prod.

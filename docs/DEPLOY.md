# C2 — Deploy live on workers.dev

Run these from the repo root. **You commit** when done (`Closes #2`).

## 1. Log in to Cloudflare

```bash
cd learning-journey-core
pnpm wrangler login
```

Browser opens — approve access. Verify:

```bash
pnpm wrangler whoami
```

## 2. Create remote D1 (first time only)

```bash
pnpm wrangler d1 create learning-journey-db
```

Copy the `database_id` from the output (UUID format).

## 3. Update `wrangler.jsonc`

Replace the placeholder:

```jsonc
"database_id": "00000000-0000-0000-0000-000000000001",
```

with your real ID from step 2.

## 4. Migrate remote D1

```bash
pnpm db:migrate:remote
```

You should see `0001_blog.sql` applied.

## 5. Build and deploy

```bash
pnpm build
pnpm release
```

Wrangler prints the workers.dev URL, e.g. `https://learning-journey-core.<subdomain>.workers.dev`.

## 6. Prod smoke test

Replace `BASE` with your URL:

| URL | Check |
|-----|--------|
| `BASE/` | Landing links work |
| `BASE/composeblog` | List posts; create, edit, delete |
| `BASE/desktop` | Post appears |
| `BASE/desktop/your-slug` | Reader works |

## 7. Update README

Add your live URL under **Live site** in `README.md`.

## 8. Your commit

```bash
git add wrangler.jsonc README.md
git commit -m "$(cat <<'EOF'
chore(deploy): configure remote D1 and workers.dev release

Closes #2
EOF
)"
git push
```

## Troubleshooting

**`database_id` invalid** — Re-run `wrangler d1 create` or list existing: `pnpm wrangler d1 list`

**Migration fails** — Ensure `database_name` in `wrangler.jsonc` matches: `learning-journey-db`

**Post not on desktop** — Confirm **Publish immediately** was checked; only `published = 1` rows show on `/desktop`

**502 / build error** — Run `pnpm build` locally first; fix TypeScript errors before `pnpm release`

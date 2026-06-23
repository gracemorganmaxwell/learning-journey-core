import { env } from "cloudflare:workers";

const ACCESS_EMAIL_HEADER = "Cf-Access-Authenticated-User-Email";

export type ComposeAccessResult =
  | { ok: true; email: string }
  | { ok: false; response: Response };

function forbidden(message: string): Response {
  return new Response(message, {
    status: 403,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function isViteDevServer(): boolean {
  return Boolean(import.meta.env.VITE_IS_DEV_SERVER);
}

/** Local dev: open by default (Access does not run on localhost). Set COMPOSE_DEV_BYPASS=false to test 403. */
export function isComposeDevBypassEnabled(): boolean {
  if (!isViteDevServer()) {
    return false;
  }
  return env.COMPOSE_DEV_BYPASS !== "false";
}

export function verifyComposeAccess(request: Request): ComposeAccessResult {
  if (isComposeDevBypassEnabled()) {
    return { ok: true, email: "local-dev" };
  }

  const email = request.headers.get(ACCESS_EMAIL_HEADER);
  if (!email) {
    return {
      ok: false,
      response: forbidden(
        "Forbidden — Cloudflare Access is required for /composeblog.",
      ),
    };
  }

  const allowedEmail = env.COMPOSE_ALLOWED_EMAIL?.trim();
  if (allowedEmail && email !== allowedEmail) {
    return {
      ok: false,
      response: forbidden("Forbidden — identity is not allowed."),
    };
  }

  return { ok: true, email };
}

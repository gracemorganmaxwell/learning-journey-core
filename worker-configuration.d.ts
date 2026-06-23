/* eslint-disable */
declare namespace Cloudflare {
  interface GlobalProps {
    mainModule: typeof import("./src/worker");
  }
  interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
    COMPOSE_DEV_BYPASS?: string;
    COMPOSE_ALLOWED_EMAIL?: string;
  }
}
interface Env extends Cloudflare.Env {}

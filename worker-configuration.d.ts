/* eslint-disable */
declare namespace Cloudflare {
  interface GlobalProps {
    mainModule: typeof import("./src/worker");
  }
  interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
  }
}
interface Env extends Cloudflare.Env {}

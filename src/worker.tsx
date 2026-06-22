import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { BlogComposePage } from "@/app/pages/blog-compose";
import { DesktopPage } from "@/app/pages/desktop";
import { DesktopPostPage } from "@/app/pages/desktop-post";
import { LandingPage } from "@/app/pages/landing";

export type AppContext = Record<string, never>;

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    route("/", LandingPage),
    route("/blogcompose", BlogComposePage),
    route("/desktop", DesktopPage),
    route("/desktop/:slug", DesktopPostPage),
  ]),
]);

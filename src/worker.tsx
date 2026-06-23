import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { requireComposeAccess } from "@/app/middleware/requireComposeAccess";
import { BlogComposeRedirectPage } from "@/app/pages/blog-compose-redirect";
import { ComposeBlogEditPage } from "@/app/pages/composeblog-edit";
import { ComposeBlogIndexPage } from "@/app/pages/composeblog-index";
import { ComposeBlogNewPage } from "@/app/pages/composeblog-new";
import { DesktopPage } from "@/app/pages/desktop";
import { DesktopPostPage } from "@/app/pages/desktop-post";
import { LandingPage } from "@/app/pages/landing";

export type AppContext = Record<string, never>;

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    route("/", LandingPage),
    route("/composeblog", [requireComposeAccess, ComposeBlogIndexPage]),
    route("/composeblog/new", [requireComposeAccess, ComposeBlogNewPage]),
    route("/composeblog/edit/:id", [requireComposeAccess, ComposeBlogEditPage]),
    route("/blogcompose", [requireComposeAccess, BlogComposeRedirectPage]),
    route("/desktop", DesktopPage),
    route("/desktop/:slug", DesktopPostPage),
  ]),
]);

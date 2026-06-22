import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
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
    route("/composeblog", ComposeBlogIndexPage),
    route("/composeblog/new", ComposeBlogNewPage),
    route("/composeblog/edit/:id", ComposeBlogEditPage),
    route("/blogcompose", BlogComposeRedirectPage),
    route("/desktop", DesktopPage),
    route("/desktop/:slug", DesktopPostPage),
  ]),
]);

import type { RouteMiddleware } from "rwsdk/router";

import { verifyComposeAccess } from "@/app/lib/compose-access";

export const requireComposeAccess: RouteMiddleware = ({ request }) => {
  const result = verifyComposeAccess(request);
  if (!result.ok) {
    return result.response;
  }
};

export async function requireComposeAccessAction({
  request,
}: {
  request: Request;
}): Promise<Response | void> {
  const result = verifyComposeAccess(request);
  if (!result.ok) {
    return result.response;
  }
}

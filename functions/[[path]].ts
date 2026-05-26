// Cloudflare Pages Function for TanStack Start SSR
import { createRequestHandler } from "@tanstack/start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";

export async function onRequest(context: EventContext) {
  const handler = await createRequestHandler({
    getRouterManifest,
  });
  
  return handler(context.request);
}

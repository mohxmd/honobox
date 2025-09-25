import { cache } from "hono/cache";
import { createMiddleware } from "hono/factory";

import { supportsCaching } from "@/lib/utils/runtime";

export const cacheMiddleware = () => {
  return createMiddleware(async (c, next) => {
    if (supportsCaching(c)) {
      const cacheHandler = cache({
        cacheName: "honobox",
        cacheControl: "max-age=3600",
      });
      return cacheHandler(c, next);
    }
    await next();
  });
};

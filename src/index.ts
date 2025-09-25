import { serve } from "@hono/node-server";
import { logger } from "@/lib/utils/logger";

import app from "./app";
import env from "./env";

const isBun = typeof Bun !== "undefined";

if (isBun) {
  logger.info(`Running in Bun on http://localhost:${env.PORT}`);
  Bun.serve({
    port: env.PORT,
    fetch: app.fetch,
  });
} else {
  logger.info(`Running in Node on http://localhost:${env.PORT}`);
  serve({
    port: env.PORT,
    fetch: app.fetch,
  });
}

import { type Context, type Env, Hono } from "hono";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";

import {
  cacheMiddleware,
  emojiFavicon,
  logger,
  notFound,
  onError,
  rateLimiter,
  tsx,
} from "@/middlewares";
import type { AppLogger } from "./utils/logger";

export type AppEnv = Env & {
  Bindings: {
    APP_NAME: "honobox";
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    GOOGLE_GENERATIVE_AI_API_KEY: string;
  };
  Variables: {
    logger: AppLogger;
  };
};

export type AppContext = Context<AppEnv>;

export function createRouter() {
  return new Hono<AppEnv>();
}

export default function createApp() {
  const app = createRouter();

  app
    .use(poweredBy())
    .use(prettyJSON())
    .use(emojiFavicon("🧰"))
    .use(logger())
    .use(cacheMiddleware())
    .use(
      rateLimiter({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: "draft-6",
        message: "Take a coffee break ☕ — you're clicking too fast!",
        keyGenerator: (c) => c.req.header("x-real-ip") || "anonymous",
      })
    )
    .use(
      "*",
      cors({
        origin: (origin, c) => {
          const url = new URL(c.req.url);
          const sameOrigin = `${url.protocol}//${url.host}`;
          if (origin === sameOrigin) return origin;
          c.var.logger.error("CORS blocked origin", { origin });
          return null;
        },
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
      })
    );

  app.use("*", tsx());
  app.notFound(notFound);
  app.onError(onError);

  return app;
}

/**
 * Creates a test app instance with the provided router mounted at root.
 * Used for testing individual routers in isolation.
 */
export function createTestApp(router: Hono<AppEnv>) {
  return createApp().route("/", router);
}

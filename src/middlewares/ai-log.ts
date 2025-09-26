import type { MiddlewareHandler } from "hono";
import type { AppContext } from "@/lib/init-app";

export const aiLog: MiddlewareHandler = async (c: AppContext, next) => {
  const { method, path } = c.req;
  await next();
  c.var.logger.info(`🤖 AI log summary: ${method} request to ${path}`);
};

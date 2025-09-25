import type { ExecutionContext } from "hono";

import { bindWorkerEnv } from "@/lib/utils/shim";

import app from "./app";

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    ctx: ExecutionContext
  ) {
    bindWorkerEnv(env);
    return app.fetch(request, env, ctx);
  },
};

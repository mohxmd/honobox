import type { Context } from "hono";

export type RuntimeInfo = {
  runtime: "cloudflare" | "deno" | "bun" | "node" | "unknown";
  supportsCache: boolean;
  platform: string;
};

export function getRuntimeInfo(c: Context): RuntimeInfo {
  if ("cf" in c.req) {
    return {
      runtime: "cloudflare",
      supportsCache: true,
      platform: "cfw",
    };
  }

  if (typeof globalThis !== "undefined" && "Deno" in globalThis) {
    return { runtime: "deno", supportsCache: true, platform: "deno" };
  }

  if (typeof globalThis !== "undefined" && "Bun" in globalThis) {
    return { runtime: "bun", supportsCache: false, platform: "bun" };
  }

  // biome-ignore lint/complexity/useOptionalChain: optional chaining not needed here
  if (typeof process !== "undefined" && process.versions?.node) {
    return { runtime: "node", supportsCache: false, platform: "node" };
  }

  return { runtime: "unknown", supportsCache: false, platform: "unknown" };
}

export function supportsCaching(c: Context): boolean {
  return getRuntimeInfo(c).supportsCache;
}

/**
 * Copy Cloudflare Worker `env` bindings into `process.env`.
 *
 * Lets Node/Bun-style code (that expects `process.env`) run in Workers
 * without changes. Skips keys that are already defined.
 */
export function bindWorkerEnv(env: Record<string, string>) {
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

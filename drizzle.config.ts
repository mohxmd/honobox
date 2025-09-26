import { defineConfig } from "drizzle-kit";
import env from "@/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/*",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
  strict: true,
  verbose: true,
});

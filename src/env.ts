import { z } from "zod";
import { logger } from "@/lib/utils/logger";

const EnvSchema = z.object({
  PORT: z.number().optional().default(8080),
  NODE_ENV: z.enum(["development", "production", "test"]),
  DB_FILE_NAME: z.string(),
  DEBUG: z.string().default("1"),
});

const processEnv = EnvSchema.safeParse(process.env);

if (!processEnv.success) {
  logger.error("❌ Invalid environment variables:");
  logger.error(
    JSON.stringify(z.flattenError(processEnv.error).fieldErrors, null, 2)
  );
  process.exit(1);
}

const env = processEnv.data;

export default env;
export type Env = z.infer<typeof EnvSchema>;

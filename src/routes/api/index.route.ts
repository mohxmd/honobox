import { createRouter } from "@/lib/init-app";

const router = createRouter().get("/", (c) => {
  c.var.logger.info("Hello");
  return c.json({ message: "Hello Hono!" }, 200);
});

export default router;

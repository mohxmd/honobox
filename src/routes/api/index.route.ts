import { createRouter } from "@/lib/init-app";

export default createRouter().get("/", (c) => {
  c.var.logger.info("Hello");
  return c.json({ message: "Hello Hono!" }, 200);
});

import createApp from "@/lib/init-app";

// routes
import aiGreeting from "@/routes/api/ai-greeting.route";
import index from "@/routes/api/index.route";
import task from "@/routes/pages/task/task.routes";

const app = createApp();

const routes = [index, aiGreeting, task] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;

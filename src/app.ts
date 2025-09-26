import createApp from "@/lib/init-app";

import aiGreeting from "@/routes/api/ai-greeting.routes";
import apiHello from "@/routes/api/hello.routes";
import home from "@/routes/pages/index.pages";
import task from "@/routes/pages/task.pages";

const app = createApp();

const routes = [home, task, apiHello, aiGreeting] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;

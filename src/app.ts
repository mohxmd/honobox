import createApp from "@/lib/init-app";
import index from "@/routes/api/index.route";
import geo from "@/routes/pages/geo/index.route";
import task from "@/routes/pages/task/task.routes";

const app = createApp();

const routes = [index, geo, task] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;

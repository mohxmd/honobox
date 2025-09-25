import { createRouter } from "@/lib/init-app";

export default createRouter().get("/app/geo", (c) =>
  c.render(<h1>Hello World</h1>)
);

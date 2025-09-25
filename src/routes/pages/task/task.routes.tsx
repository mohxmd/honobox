import { HTTPException } from "hono/http-exception";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import {
  createTask,
  deleteTask,
  toggleTaskDone,
  updateTaskName,
} from "@/db/mutations";
import { getTaskById, getTasks } from "@/db/queries/task.query";
import { createRouter } from "@/lib/init-app";
import { tryCatch } from "@/lib/utils/try-catch";

const router = createRouter()
  .get("/app/tasks", async (c) => {
    const { data, error } = await tryCatch(getTasks());

    if (error) {
      throw new HTTPException(500, {
        message: "Failed to fetch tasks",
        cause: error,
      });
    }

    return c.render(
      <>
        <TaskForm />
        <TaskList tasks={data ?? []} />
      </>
    );
  })
  .post("/app/tasks", async (c) => {
    const body = await c.req.parseBody<{ name?: string }>();
    const name = body.name?.toString();

    if (!name) {
      throw new HTTPException(400, { message: "Task name is required" });
    }

    const { data: _data, error } = await tryCatch(createTask(name));
    if (error)
      throw new HTTPException(500, { message: "Failed to create task" });

    return c.redirect("/app/tasks");
  })
  .post("/app/tasks/:id/edit", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.parseBody<{ name?: string }>();
    const name = body.name?.toString().trim();

    if (!name) {
      throw new HTTPException(400, { message: "Task name is required" });
    }

    const { error } = await tryCatch(updateTaskName(id, name));
    if (error) {
      throw new HTTPException(500, { message: "Failed to update task" });
    }

    return c.redirect("/app/tasks");
  })
  .post("/app/tasks/:id/toggle", async (c) => {
    const id = c.req.param("id");
    const task = await getTaskById(id);
    if (!task) return c.notFound();
    await toggleTaskDone(id, !task.done);
    return c.redirect("/app/tasks");
  })
  .post("/app/tasks/:id/delete", async (c) => {
    const id = c.req.param("id");
    await deleteTask(id);
    return c.redirect("/app/tasks");
  });

export default router;

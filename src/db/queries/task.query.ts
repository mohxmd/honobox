import { eq } from "drizzle-orm";
import { db } from "../index";
import { task } from "../schema";

export async function getTasks() {
  return await db.select().from(task);
}

export async function getTaskById(id: string) {
  return await db.select().from(task).where(eq(task.id, id)).get();
}

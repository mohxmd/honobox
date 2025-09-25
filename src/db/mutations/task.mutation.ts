import { eq } from "drizzle-orm";
import { db } from "../index";
import { task } from "../schema";

export async function createTask(name: string) {
  return await db.insert(task).values({ name }).returning();
}

export async function toggleTaskDone(id: string, done: boolean) {
  return await db.update(task).set({ done }).where(eq(task.id, id)).returning();
}

export async function deleteTask(id: string) {
  return await db.delete(task).where(eq(task.id, id)).returning();
}

export async function updateTaskName(id: string, name: string) {
  return await db.update(task).set({ name }).where(eq(task.id, id)).returning();
}

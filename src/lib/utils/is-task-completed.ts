import type { TaskWithTimeEntries } from "@/types";

export function isTaskCompleted(task: TaskWithTimeEntries): boolean {
  return task.completedAt !== null;
}

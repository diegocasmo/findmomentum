import type { TaskWithTimeEntries } from "@/types";

export function isTaskRunning(task: TaskWithTimeEntries): boolean {
  return (
    task.timeEntries.length > 0 &&
    task.timeEntries.some((timeEntry) => timeEntry.stoppedAt === null)
  );
}

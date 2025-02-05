import type { TaskWithTimeEntries } from "@/types";

export function computeTaskRemainingTime(task: TaskWithTimeEntries): number {
  const elapsedTime = task.timeEntries.reduce((total, entry) => {
    const start = new Date(entry.startedAt).getTime();
    const end = entry.stoppedAt
      ? new Date(entry.stoppedAt).getTime()
      : Date.now();
    return total + (end - start);
  }, 0);

  return Math.max(0, task.durationMs - elapsedTime);
}

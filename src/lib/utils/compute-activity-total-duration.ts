import type { ActivityWithTasksAndTimeEntries } from "@/types";

export function computeActivityTotalDuration(
  activity: ActivityWithTasksAndTimeEntries
): number {
  return activity.tasks.reduce((sum, task) => sum + task.durationMs, 0);
}

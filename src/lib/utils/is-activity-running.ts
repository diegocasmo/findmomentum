import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { isTaskRunning } from "@/lib/utils/is-task-running";

export function isActivityRunning(
  activity: ActivityWithTasksAndTimeEntries
): boolean {
  return activity.tasks.some(isTaskRunning);
}

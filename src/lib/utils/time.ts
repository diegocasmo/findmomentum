import { intervalToDuration, formatDistanceToNow } from "date-fns";
import type {
  ActivityWithTasksAndTimeEntries,
  TaskWithTimeEntries,
} from "@/types";
import {
  formatInTimeZone as tzFormatInTimeZone,
  toZonedTime as tzToZonedTime,
  fromZonedTime as tzFromZonedTime,
} from "date-fns-tz";

export const formatInTimeZone = tzFormatInTimeZone;
export const toZonedTime = tzToZonedTime;
export const fromZonedTime = tzFromZonedTime;

export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MIN = 60;
export const MS_PER_MIN = SECONDS_PER_MIN * MS_PER_SECOND;
export const MIN_PER_HOUR = 60;
export const MS_PER_HOUR = MIN_PER_HOUR * MS_PER_MIN;

export function formatTimeMMss(ms: number): string {
  const minutes = Math.floor(ms / MS_PER_MIN);
  const seconds = Math.floor((ms % MS_PER_MIN) / MS_PER_SECOND);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatTimeHHMMss(ms: number) {
  const hours = Math.floor(ms / MS_PER_HOUR);
  const minutes = Math.floor((ms % MS_PER_HOUR) / MS_PER_MIN);
  const seconds = Math.floor((ms % MS_PER_MIN) / MS_PER_SECOND);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function formatMsAsDuration(ms: number) {
  const duration = intervalToDuration({ start: 0, end: ms });
  const parts: string[] = [];

  if (duration.hours) parts.push(`${duration.hours}h`);
  if (duration.minutes) parts.push(`${duration.minutes}m`);
  if (duration.seconds && parts.length === 0)
    parts.push(`${duration.seconds}s`);

  return parts.join(" ") || "0s";
}

export function getActivityTotalDuration(
  activity: ActivityWithTasksAndTimeEntries
): number {
  return activity.tasks.reduce((sum, task) => sum + task.durationMs, 0);
}

export function getActivityRemainingTime(
  activity: ActivityWithTasksAndTimeEntries
): number {
  return activity.tasks.reduce(
    (sum, task) => sum + getTaskRemainingTime(task),
    0
  );
}

export function getTaskRemainingTime(task: TaskWithTimeEntries): number {
  const now = Date.now();
  const elpasedMs = task.timeEntries.reduce((total, entry) => {
    const start = new Date(entry.startedAt).getTime();
    const end = entry.stoppedAt ? new Date(entry.stoppedAt).getTime() : now;
    return total + (end - start);
  }, 0);

  return Math.max(0, task.durationMs - elpasedMs);
}

export function getTaskElapsedTime(task: TaskWithTimeEntries): number {
  return task.durationMs - getTaskRemainingTime(task);
}

export function formatDateAsTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

import type { Activity, Task, TimeEntry } from "@prisma/client";
import type { FieldErrors } from "react-hook-form";

export type ActivityWithTasksAndTimeEntries = Activity & {
  tasks: (Task & {
    timeEntries: TimeEntry[];
  })[];
};

export type TaskWithTimeEntries = Task & {
  timeEntries: TimeEntry[];
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: FieldErrors };

import type { Activity, Task, TimeEntry } from "@prisma/client";

export type ActivityWithTasksAndTimeEntries = Activity & {
  tasks: (Task & {
    timeEntries: TimeEntry[];
  })[];
};

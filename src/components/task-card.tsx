import { ClockIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskActions } from "@/components/task-actions";
import { PlayTaskForm } from "@/components/play-task-form";
import { PauseTaskForm } from "@/components/pause-task-form";
import type { TaskWithTimeEntries } from "@/types";
import { TaskElapsedTime } from "@/components/task-elapsed-time";

export function isTaskRunning(task: TaskWithTimeEntries): boolean {
  return (
    task.timeEntries.length > 0 &&
    task.timeEntries.some((timeEntry) => timeEntry.stoppedAt === null)
  );
}

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

type TaskCardProps = {
  task: TaskWithTimeEntries;
};

export function TaskCard({ task }: TaskCardProps) {
  const isRunning = isTaskRunning(task);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-md">{task.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-secondary px-2 py-1 rounded-md">
              <ClockIcon className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm text-secondary-foreground">
                <TaskElapsedTime task={task} />
              </span>
            </div>
            {isRunning ? (
              <PauseTaskForm taskId={task.id} />
            ) : (
              <PlayTaskForm taskId={task.id} />
            )}
            <TaskActions task={task} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

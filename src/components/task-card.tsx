import { ClockIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeMMss } from "@/lib/utils/time";
import { TaskActions } from "@/components/task-actions";
import { PlayTaskForm } from "@/components/play-task-form";
import { PauseTaskForm } from "@/components/pause-task-form";
import type { TaskWithTimeEntries } from "@/types";

type TaskCardProps = {
  task: TaskWithTimeEntries;
};

export function TaskCard({ task }: TaskCardProps) {
  const isRunning =
    task.timeEntries.length > 0 &&
    task.timeEntries.some((timeEntry) => timeEntry.stoppedAt === null);

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
                {formatTimeMMss(task.durationMs)}
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

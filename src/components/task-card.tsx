"use client";

import {
  ClockIcon,
  CheckCircle,
  PlayIcon,
  PauseIcon,
  Loader2Icon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskActions } from "@/components/task-actions";
import type { TaskWithTimeEntries } from "@/types";
import { TaskElapsedTime } from "@/components/task-elapsed-time";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { playTaskAction } from "@/app/actions/play-task-action";
import { pauseTaskAction } from "@/app/actions/pause-task-action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { isTaskRunning } from "@/lib/utils/is-task-running";
import { isTaskCompleted } from "@/lib/utils/is-task-completed";

type TaskCardProps = {
  task: TaskWithTimeEntries;
};

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isRunning = isTaskRunning(task);
  const isCompleted = isTaskCompleted(task);

  const handleToggleTask = () => {
    if (isCompleted) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("taskId", task.id);

        const action = isRunning ? pauseTaskAction : playTaskAction;
        const result = await action(formData);

        if (result.success) {
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: `Failed to ${
              isRunning ? "pause" : "start"
            } the task. Please try again.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Task toggle error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card
      className={cn(
        "transition-colors duration-200",
        !isCompleted && "hover:bg-secondary cursor-pointer",
        isRunning && "border-primary"
      )}
      onClick={handleToggleTask}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : isPending ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : isRunning ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <span
              className={cn(
                "text-md",
                isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center space-x-1 bg-secondary px-2 py-1 rounded-md w-[80px]">
              <ClockIcon className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
              <span className="text-sm text-secondary-foreground truncate">
                <TaskElapsedTime task={task} />
              </span>
            </div>
            <TaskActions task={task} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

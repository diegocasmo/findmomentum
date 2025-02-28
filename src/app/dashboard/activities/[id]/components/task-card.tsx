import {
  ClockIcon,
  CheckCircle,
  PlayIcon,
  PauseIcon,
  Loader2Icon,
  GripVerticalIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskActions } from "@/app/dashboard/activities/[id]/components/task-actions";
import type { TaskWithTimeEntries } from "@/types";
import { TaskRemainingTime } from "@/app/dashboard/activities/[id]/components/task-remaining-time";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { playTaskAction } from "@/app/actions/play-task-action";
import { pauseTaskAction } from "@/app/actions/pause-task-action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { isTaskRunning } from "@/lib/utils/is-task-running";
import { isTaskCompleted } from "@/lib/utils/is-task-completed";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatTimeMMss } from "@/lib/utils/time";

type TaskCardProps = {
  task: TaskWithTimeEntries;
};

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isRunning = isTaskRunning(task);
  const isCompleted = isTaskCompleted(task);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <li ref={setNodeRef} style={style} {...attributes}>
      <Card
        className={cn("transition-colors duration-200", {
          "hover:bg-secondary cursor-pointer": !isCompleted,
          "border-primary": isRunning,
          "border-green-500": isCompleted,
        })}
        onClick={handleToggleTask}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                {...listeners}
                className="touch-none p-2 -m-2 rounded-md hover:bg-secondary/50 transition-colors"
                aria-label="Drag to reorder task"
              >
                <GripVerticalIcon className="w-5 h-5 text-muted-foreground cursor-move" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
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
                {task.name}&nbsp;
                {task.completedAt
                  ? null
                  : `(${formatTimeMMss(task.durationMs)})`}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "flex items-center justify-center space-x-1 bg-secondary px-2 py-1 rounded-md",
                  {
                    "w-[80px]": !isCompleted,
                  }
                )}
              >
                <ClockIcon className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                <span className="text-sm text-secondary-foreground truncate">
                  <TaskRemainingTime task={task} />
                </span>
              </div>
              <TaskActions task={task} />
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

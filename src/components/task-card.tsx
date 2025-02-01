import { PlayIcon, PauseIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeMMss } from "@/lib/utils/time";
import type { Task } from "@prisma/client";

type TaskCardProps = {
  task: Task;
  isRunning: boolean;
  onTogglePlay: (taskId: string) => void;
};

export function TaskCard({ task, isRunning, onTogglePlay }: TaskCardProps) {
  return (
    <Card
      className="cursor-pointer hover:bg-accent transition-colors"
      onClick={() => onTogglePlay(task.id)}
    >
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
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay(task.id);
              }}
            >
              {isRunning ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

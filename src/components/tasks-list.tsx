"use client";

import { useState } from "react";
import { TaskCard } from "@/components/task-card";
import type { Task } from "@prisma/client";
import { NoTasks } from "@/components/no-tasks";

type TasksListProps = {
  tasks: Task[];
};

export function TasksList({ tasks }: TasksListProps) {
  const [runningTaskId, setRunningTaskId] = useState<string | null>(null);

  const handleTogglePlay = (taskId: string) => {
    if (runningTaskId === taskId) {
      console.log(`Pausing task: ${taskId}`);
      setRunningTaskId(null);
    } else {
      if (runningTaskId) {
        console.log(`Pausing task: ${runningTaskId}`);
      }
      console.log(`Starting task: ${taskId}`);
      setRunningTaskId(taskId);
    }
  };

  if (tasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            task={task}
            isRunning={runningTaskId === task.id}
            onTogglePlay={handleTogglePlay}
          />
        </li>
      ))}
    </ul>
  );
}

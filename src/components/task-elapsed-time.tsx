"use client";

import { useCallback, useEffect, useState } from "react";
import { formatTimeMMss } from "@/lib/utils/time";
import type { TaskWithTimeEntries } from "@/types";
import {
  isTaskRunning,
  computeTaskRemainingTime,
} from "@/components/task-card";
import { MS_PER_SECOND } from "@/lib/utils/time";

type TaskElapsedTimeProps = {
  task: TaskWithTimeEntries;
};

export function TaskElapsedTime({ task }: TaskElapsedTimeProps) {
  const [remainingTime, setRemainingTime] = useState(
    computeTaskRemainingTime(task)
  );

  const handleCompleteTask = useCallback(async () => {
    console.log("To-do: complete task");
  }, []);

  useEffect(() => {
    if (isTaskRunning(task)) {
      const timerId = setInterval(() => {
        const newRemainingTime = computeTaskRemainingTime(task);
        setRemainingTime(newRemainingTime);

        if (newRemainingTime <= 0) {
          clearInterval(timerId);
          handleCompleteTask();
        }
      }, MS_PER_SECOND);

      return () => clearInterval(timerId);
    }
  }, [task, handleCompleteTask]);

  return (
    <span className="flex items-center">
      {formatTimeMMss(Math.max(0, remainingTime))}
    </span>
  );
}

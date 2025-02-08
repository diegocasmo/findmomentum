"use client";

import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { MS_PER_SECOND, formatTimeHHMMss } from "@/lib/utils/time";
import { isTaskRunning } from "@/lib/utils/is-task-running";
import {
  getActivityTotalDuration,
  getActivityRemainingTime,
} from "@/lib/utils/time";

type ActivityTimerProps = {
  activity: ActivityWithTasksAndTimeEntries;
};

export function ActivityTimer({ activity }: ActivityTimerProps) {
  const totalDurationMs = getActivityTotalDuration(activity);
  const [remainingTime, setRemainingTime] = useState(() =>
    getActivityRemainingTime(activity)
  );
  const isAnyTaskRunning =
    activity.tasks.length > 0 && activity.tasks.some(isTaskRunning);

  useEffect(() => {
    if (isAnyTaskRunning) {
      const timerId = setInterval(() => {
        setRemainingTime(getActivityRemainingTime(activity));
      }, MS_PER_SECOND);

      return () => clearInterval(timerId);
    } else {
      setRemainingTime(getActivityRemainingTime(activity));
    }
  }, [isAnyTaskRunning, activity]);

  const progress = Math.max(
    0,
    Math.min(100, (remainingTime / totalDurationMs) * 100)
  );

  return (
    <div
      className="flex flex-col items-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative w-[180px] h-[180px]">
        <CircularProgressbar
          value={progress}
          strokeWidth={8}
          styles={buildStyles({
            strokeLinecap: "round",
            pathColor: "currentColor",
            trailColor: "rgba(255, 255, 255, 0.2)",
            rotation: 1,
          })}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className="text-3xl font-bold"
            aria-label={`${formatTimeHHMMss(remainingTime)} remaining`}
          >
            {formatTimeHHMMss(remainingTime)}
          </span>
        </div>
      </div>
    </div>
  );
}

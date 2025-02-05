"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { MS_PER_SECOND, formatTimeHHMMss } from "@/lib/utils/time";
import { isTaskRunning } from "@/lib/utils/is-task-running";
import { computeActivityRemainingTime } from "@/lib/utils/compute-activity-remaining-time";
import { computeActivityTotalDuration } from "@/lib/utils/compute-activity-total-duration";

const TIMER_SIZE = 180;
const STROKE_WIDTH = 8;
const CENTER = TIMER_SIZE / 2;
const RADIUS = CENTER - STROKE_WIDTH;
const FULL_CIRCLE = 2 * Math.PI;
const TRANSITION_DURATION = 1;
const DASH_ARRAY = RADIUS * FULL_CIRCLE;

type ActivityTimerProps = {
  activity: ActivityWithTasksAndTimeEntries;
};

export function ActivityTimer({ activity }: ActivityTimerProps) {
  const totalDurationMs = computeActivityTotalDuration(activity);
  const activityRemainingTime = computeActivityRemainingTime(activity);
  const [remainingTime, setRemainingTime] = useState(activityRemainingTime);
  const isAnyTaskRunning =
    activity.tasks.length > 0 && activity.tasks.some(isTaskRunning);

  useEffect(() => {
    const nextRemainingTime = computeActivityRemainingTime(activity);
    if (isAnyTaskRunning) {
      const timerId = setInterval(() => {
        setRemainingTime(nextRemainingTime);
      }, MS_PER_SECOND);

      return () => clearInterval(timerId);
    } else {
      setRemainingTime(nextRemainingTime);
    }
  }, [isAnyTaskRunning, activity, activityRemainingTime]);

  const progress = remainingTime / totalDurationMs;
  const dashOffset = DASH_ARRAY * (1 - progress);

  return (
    <div
      className="flex flex-col items-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative">
        <svg
          width={TIMER_SIZE}
          height={TIMER_SIZE}
          viewBox={`0 0 ${TIMER_SIZE} ${TIMER_SIZE}`}
          className="transform -rotate-90"
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeOpacity={0.2}
          />
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={DASH_ARRAY}
            strokeDashoffset={dashOffset}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: TRANSITION_DURATION, ease: "linear" }}
          />
        </svg>
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

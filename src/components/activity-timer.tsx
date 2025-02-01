"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Task } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
  MS_PER_SECOND,
  MS_PER_MIN,
  MS_PER_HOUR,
  formatTimeHHMMss,
} from "@/lib/utils/time";

const TIMER_SIZE = 180;
const STROKE_WIDTH = 8;
const CENTER = TIMER_SIZE / 2;
const RADIUS = CENTER - STROKE_WIDTH;
const FULL_CIRCLE = 2 * Math.PI;
const TRANSITION_DURATION = 1;
const UPDATE_INTERVAL = MS_PER_SECOND;

interface ActivityTimerProps {
  tasks: Task[];
  className?: string;
}

export function ActivityTimer({ tasks, className }: ActivityTimerProps) {
  const [remainingTime, setRemainingTime] = useState(0);
  const totalDurationMs = tasks.reduce((sum, task) => sum + task.durationMs, 0);

  useEffect(() => {
    setRemainingTime(totalDurationMs);
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - UPDATE_INTERVAL, 0));
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [totalDurationMs]);

  const progress = remainingTime / totalDurationMs;
  const DASH_ARRAY = RADIUS * FULL_CIRCLE;
  const dashOffset = DASH_ARRAY * (1 - progress);

  return (
    <div
      className={cn("flex flex-col items-center", className)}
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

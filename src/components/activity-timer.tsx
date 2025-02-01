"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Task } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ActivityTimerProps {
  tasks: Task[];
  className?: string;
}

export function ActivityTimer({ tasks, className }: ActivityTimerProps) {
  const [remainingTime, setRemainingTime] = useState(0);
  const totalDurationMs = tasks.reduce((sum, task) => sum + task.durationMs, 0);

  const timerSize = 180;
  const strokeWidth = 8;
  const center = timerSize / 2;
  const radius = center - strokeWidth;

  useEffect(() => {
    setRemainingTime(totalDurationMs);
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [totalDurationMs]);

  const progress = remainingTime / totalDurationMs;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray * (1 - progress);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn("flex flex-col items-center", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative">
        <svg
          width={timerSize}
          height={timerSize}
          viewBox={`0 0 ${timerSize} ${timerSize}`}
          className="transform -rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className="text-3xl font-bold"
            aria-label={`${formatTime(remainingTime)} remaining`}
          >
            {formatTime(remainingTime)}
          </span>
        </div>
      </div>
    </div>
  );
}

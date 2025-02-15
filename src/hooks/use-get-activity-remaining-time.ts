"use client";

import { useEffect, useState } from "react";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { MS_PER_SECOND } from "@/lib/utils/time";
import { getActivityRemainingTime } from "@/lib/utils/time";
import { isActivityRunning } from "@/lib/utils/is-activity-running";

type ActivityTimerProps = {
  activity: ActivityWithTasksAndTimeEntries;
};

export function useGetActivityRemainingTime({ activity }: ActivityTimerProps) {
  const [remainingTime, setRemainingTime] = useState(() =>
    getActivityRemainingTime(activity)
  );
  const isRunning = isActivityRunning(activity);

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setRemainingTime(getActivityRemainingTime(activity));
      }, MS_PER_SECOND);

      return () => clearInterval(timerId);
    } else {
      setRemainingTime(getActivityRemainingTime(activity));
    }
  }, [isRunning, activity]);

  return remainingTime;
}

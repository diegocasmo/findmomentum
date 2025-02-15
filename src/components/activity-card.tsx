"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Calendar } from "lucide-react";
import { ActivityActions } from "./activity-actions";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { formatTimeHHMMss } from "@/lib/utils/time";
import { isActivityRunning } from "@/lib/utils/is-activity-running";
import { useGetActivityRemainingTime } from "@/hooks/use-get-activity-remaining-time";

type ActivityCardProps = {
  activity: ActivityWithTasksAndTimeEntries;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const isRunning = isActivityRunning(activity);
  const remainingTime = useGetActivityRemainingTime({ activity });

  return (
    <Link href={`/dashboard/activities/${activity.id}`} passHref>
      <Card
        className={cn(
          "transition-all duration-300 group cursor-pointer overflow-hidden hover:bg-accent/50",
          {
            "border-primary": isRunning,
          }
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium text-foreground">
              {activity.name}&nbsp;
              {isRunning ? `(${formatTimeHHMMss(remainingTime)})` : null}
            </CardTitle>
            <ActivityActions activity={activity} />
          </div>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {activity.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-primary" />
              <span className="first-letter:uppercase">
                {formatDistanceToNow(activity.createdAt, {
                  addSuffix: true,
                })}
              </span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

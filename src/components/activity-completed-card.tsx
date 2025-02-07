import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  StarIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { formatTimeHHMMss } from "@/lib/utils/time";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { computeActivityTotalDuration } from "@/lib/utils/compute-activity-total-duration";

type ActivityCompletedCardProps = {
  activity: ActivityWithTasksAndTimeEntries;
};

export async function ActivityCompletedCard({
  activity,
}: ActivityCompletedCardProps) {
  const totalDuration = computeActivityTotalDuration(activity);

  return (
    <Card className="w-full max-w-3xl shadow-lg border-secondary">
      <CardHeader className="pb-6">
        <div className="flex justify-between items-center mb-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="transition-all duration-300 hover:scale-105"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="text-center">
          <CardTitle className="text-3xl font-bold text-primary mb-2 ">
            Activity Completed 🎉
          </CardTitle>
          <p className="text-xl font-semibold text-foreground/80">
            Fantastic job finishing:
          </p>
          <h2 className="text-2xl font-bold mt-2 text-foreground">
            {activity.name}
          </h2>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10">
            <span className="text-lg font-medium">Total Time:</span>
            <span className="text-2xl font-bold text-primary">
              {formatTimeHHMMss(totalDuration)}
            </span>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground/80 flex items-center">
              <StarIcon className="w-6 h-6 mr-2 text-yellow-500" />
              Completed Tasks:
            </h3>
            {activity.tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-secondary/50 p-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground/90">
                    {task.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground/70">
                    {formatTimeHHMMss(task.durationMs)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

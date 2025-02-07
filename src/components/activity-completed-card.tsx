import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon, ClockIcon, TrophyIcon } from "lucide-react";
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
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader className="text-center pb-10">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-12 h-12 text-primary" />
          </div>
        </div>
        <CardTitle className="text-4xl font-bold text-primary mb-2">
          Activity Completed 🎉!
        </CardTitle>
        <p className="text-2xl font-semibold text-foreground/80">
          Great job finishing:
        </p>
        <h2 className="text-3xl font-bold mt-2 text-foreground">
          {activity.name}
        </h2>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-lg">
            <span className="text-lg font-medium">Total Time:</span>
            <span className="text-2xl font-bold text-primary">
              {formatTimeHHMMss(totalDuration)}
            </span>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground/80">
              Completed Tasks:
            </h3>
            {activity.tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-secondary/50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                  </div>
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
        <div className="mt-10 text-center">
          <Link href="/dashboard">
            <Button size="lg" className="transition-transform hover:scale-105">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

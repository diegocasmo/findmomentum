"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { completeActivityAction } from "@/app/actions/complete-activity-action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon, CheckIcon } from "lucide-react";
import type { Activity, Task } from "@prisma/client";

type CompleteActivityProps = {
  activity: Activity & { tasks: Task[] };
};

export function CompleteActivity({ activity }: CompleteActivityProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const allTasksCompleted =
    activity.tasks.length > 0 &&
    activity.tasks.every((task) => task.completedAt !== null);

  const handleCompleteActivity = async () => {
    if (!allTasksCompleted) return;
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("activityId", activity.id);
        const result = await completeActivityAction(formData);

        if (result.success) {
          toast({
            title: "Activity completed",
            description: `"${activity.name}" has been marked as complete.`,
            variant: "default",
          });
          router.push(`?celebrate=true`);
        } else {
          toast({
            title: "Failed to complete activity",
            description:
              "An error occurred while completing the activity. Please try again.",
            variant: "destructive",
          });
          console.error("Failed to complete activity:", result.errors);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        console.error("Error completing activity:", error);
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              onClick={handleCompleteActivity}
              disabled={!allTasksCompleted || isPending}
            >
              {isPending ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <CheckIcon className="h-4 w-4" />
              )}
              Complete Activity
            </Button>
          </div>
        </TooltipTrigger>
        {allTasksCompleted ? null : (
          <TooltipContent>
            <p>Complete all tasks before completing the activity</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

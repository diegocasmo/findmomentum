import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateTaskForm } from "@/components/create-task-form";
import { PlusCircleIcon } from "lucide-react";
import type { ActivityWithTasksAndTimeEntries } from "@/types";

type CraeteTaskCardProps = {
  activity: ActivityWithTasksAndTimeEntries;
};

export function CreateTaskCard({ activity }: CraeteTaskCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center">
          <PlusCircleIcon className="w-6 h-6 mr-2 text-primary" />
          Add Task
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <CreateTaskForm
          activityId={activity.id}
          autoFocus={!Boolean(activity.tasks.length)}
        />
      </CardContent>
    </Card>
  );
}

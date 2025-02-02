import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { getTasks } from "@/lib/services/get-tasks";
import { CreateTaskForm } from "@/components/create-task-form";
import { TasksList } from "@/components/tasks-list";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  ListTodoIcon,
  PlusCircleIcon,
  ClockIcon,
} from "lucide-react";
import { ActivityTimer } from "@/components/activity-timer";
import { DeleteActivityDialog } from "@/components/delete-activity-dialog";
import { Button } from "@/components/ui/button";

type ActivityPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ActivityPage({ params }: ActivityPageProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const activityId = (await params).id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const activity = await getActivity({ id: activityId, userId });

  if (!activity) {
    notFound();
  }

  const tasks = await getTasks({ activityId, userId });

  return (
    <div className="container mx-auto px-4 space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold flex items-center">
            <ActivityIcon className="w-10 h-10 mr-4 text-primary" />
            {activity.name}
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            {activity.description}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <DeleteActivityDialog activity={activity} redirectUrl="/dashboard" />
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="space-y-4">
            <ActivityTimer tasks={tasks} />
            <CardTitle className="text-2xl font-semibold flex items-center">
              <ListTodoIcon className="w-6 h-6 mr-2 text-primary" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <Suspense
              fallback={
                <div className="text-center py-4">Loading tasks...</div>
              }
            >
              <TasksList tasks={tasks} />
            </Suspense>
          </CardContent>
        </Card>

        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <PlusCircleIcon className="w-6 h-6 mr-2 text-primary" />
                Add Task
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <CreateTaskForm activityId={activity.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

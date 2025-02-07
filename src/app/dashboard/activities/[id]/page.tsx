import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { TasksList } from "@/components/tasks-list";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, ListTodoIcon, CheckCircle } from "lucide-react";
import { ActivityTimer } from "@/components/activity-timer";
import { ActivityActions } from "@/components/activity-actions";
import { CompleteActivity } from "@/components/complete-activity";
import { CreateTaskCard } from "@/components/create-task-card";

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

  const isActivityCompleted = Boolean(activity.completedAt);

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

        <div className="mt-4">
          <div className="flex items-center space-x-4">
            {isActivityCompleted ? (
              <div className="flex items-center ">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Activity completed</span>
              </div>
            ) : (
              <CompleteActivity activity={activity} />
            )}
            <ActivityActions activity={activity} redirectUrl="/dashboard" />
          </div>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <Card
          className={`${
            isActivityCompleted ? "lg:col-span-3" : "lg:col-span-2"
          } flex flex-col`}
        >
          <CardHeader className="space-y-4">
            <ActivityTimer activity={activity} />
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
              <TasksList tasks={activity.tasks} />
            </Suspense>
          </CardContent>
        </Card>
        {!isActivityCompleted && (
          <div className="lg:col-span-1 flex flex-col gap-8">
            <CreateTaskCard activity={activity} />
          </div>
        )}
      </div>
    </div>
  );
}

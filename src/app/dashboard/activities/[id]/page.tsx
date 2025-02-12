import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { TasksList } from "@/components/tasks-list";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, ListTodoIcon } from "lucide-react";
import { ActivityTimer } from "@/components/activity-timer";
import { ActivityActions } from "@/components/activity-actions";
import { CompleteActivity } from "@/components/complete-activity";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { ActivityCompletedCard } from "@/components/activity-completed-card";

type ActivityPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ActivityPage({ params }: ActivityPageProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const activityId = (await params).id;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const activity = await getActivity({ id: activityId, userId });

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex items-center">
            <ActivityIcon className="w-10 h-10 mr-4 text-primary" />
            {activity.name}
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            {activity.description}
          </p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ActivityActions activity={activity} redirectUrl="/dashboard" />
        </div>
      </div>
      {activity.completedAt ? (
        <div className="flex justify-center">
          <ActivityCompletedCard activity={activity} />
        </div>
      ) : (
        <div className="flex-grow grid grid-cols-1 gap-8 h-full">
          <Card className="flex flex-col">
            <CardHeader className="space-y-4 p-4">
              <div className="flex items-center justify-between flex-col space-y-4">
                <ActivityTimer activity={activity} />
                <CompleteActivity activity={activity} />
              </div>
              <CardTitle className="text-2xl font-semibold flex justify-between items-center">
                <div className="flex items-center">
                  <ListTodoIcon className="w-6 h-6 mr-2 text-primary" />
                  Tasks
                </div>
                <div>
                  <CreateTaskDialog
                    activityId={activity.id}
                    aria-label="Create new task"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto p-4">
              <Suspense
                fallback={
                  <div className="text-center py-4">Loading tasks...</div>
                }
              >
                <TasksList tasks={activity.tasks} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { TasksList } from "@/components/tasks-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodoIcon } from "lucide-react";
import { ActivityTimer } from "@/components/activity-timer";
import { CompleteActivity } from "@/components/complete-activity";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { ActivityCompletedCard } from "@/components/activity-completed-card";
import { ActivityPageSkeleton } from "@/components/activity-page-skeleton";
import { ActivityHeader } from "@/app/dashboard/activities/[id]/components/activity-header";

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
    <Suspense fallback={<ActivityPageSkeleton />}>
      <div className="container mx-auto space-y-8 h-full flex flex-col">
        <ActivityHeader activity={activity} />
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
                <TasksList tasks={activity.tasks} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Suspense>
  );
}

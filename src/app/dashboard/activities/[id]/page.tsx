import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TasksList } from "@/components/tasks-list";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, ListTodoIcon, ArrowLeftIcon } from "lucide-react";
import { ActivityTimer } from "@/components/activity-timer";
import { ActivityActions } from "@/components/activity-actions";
import { CompleteActivity } from "@/components/complete-activity";
import { CreateTaskCard } from "@/components/create-task-card";
import { ActivityCompletedCard } from "@/components/activity-completed-card";

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

  return (
    <div className="container mx-auto px-4 space-y-8 h-full flex flex-col">
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
        <div className="flex items-center space-x-4">
          <ActivityActions activity={activity} redirectUrl="/dashboard" />
        </div>
      </div>
      <div>
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      {activity.completedAt ? (
        <div className="flex justify-center">
          <ActivityCompletedCard activity={activity} />
        </div>
      ) : (
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <Card className="flex flex-col lg:col-span-2">
            <CardHeader className="space-y-4">
              <ActivityTimer activity={activity} />
              <CardTitle className="text-2xl font-semibold flex justify-between items-center">
                <div className="flex items-center">
                  <ListTodoIcon className="w-6 h-6 mr-2 text-primary" />
                  Tasks
                </div>
                <div>
                  {!activity.completedAt && (
                    <CompleteActivity activity={activity} />
                  )}
                </div>
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
          <div className="lg:col-span-1 flex flex-col gap-8">
            <CreateTaskCard activity={activity} />
          </div>
        </div>
      )}
    </div>
  );
}

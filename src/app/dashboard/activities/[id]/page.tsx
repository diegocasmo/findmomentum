import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { getTasks } from "@/lib/services/get-tasks";
import { CreateTaskForm } from "@/components/create-task-form";
import { TasksList } from "@/components/tasks-list";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ActivityIcon, ListTodoIcon, PlusCircleIcon } from "lucide-react";
import { ActivityTimer } from "@/components/activity-timer";

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
    <div className="container mx-auto px-4 space-y-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-3xl font-bold flex items-center">
              <ActivityIcon className="w-8 h-8 mr-3 text-primary" />
              {activity.name}
            </CardTitle>
            <CardDescription className="mt-2 text-lg">
              {activity.description}
            </CardDescription>
          </div>
          <ActivityTimer tasks={tasks} className="mt-4 md:mt-0" />
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 flex flex-col h-[calc(100vh-24rem)]">
          <CardHeader>
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
        <Card className="lg:col-span-1 flex flex-col h-[calc(100vh-24rem)]">
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
  );
}

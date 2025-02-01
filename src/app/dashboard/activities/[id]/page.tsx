import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";
import { getTasks } from "@/lib/services/get-tasks";
import { CreateTaskForm } from "@/components/create-task-form";
import { TasksList } from "@/components/tasks-list";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, ListTodoIcon } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <ActivityIcon className="w-6 h-6 mr-2" />
            {activity.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{activity.description}</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 flex flex-col h-[calc(100vh-24rem)]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <ListTodoIcon className="w-5 h-5 mr-2" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <Suspense fallback={<div>Loading tasks...</div>}>
              <TasksList tasks={tasks} />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 flex flex-col h-[calc(100vh-24rem)]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <ListTodoIcon className="w-5 h-5 mr-2" />
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

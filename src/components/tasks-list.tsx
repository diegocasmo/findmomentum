import { getTasks } from "@/lib/services/get-tasks";
import { auth } from "@/lib/auth";
import { CheckCircle2Icon, CircleIcon } from "lucide-react";

type TasksListProps = {
  activityId: string;
};

export async function TasksList({ activityId }: TasksListProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const tasks = await getTasks({ activityId, userId });

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center space-x-2">
          {task.completedAt ? (
            <CheckCircle2Icon className="w-5 h-5 text-green-500" />
          ) : (
            <CircleIcon className="w-5 h-5 text-gray-300" />
          )}
          <span
            className={task.completedAt ? "line-through text-gray-500" : ""}
          >
            {task.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

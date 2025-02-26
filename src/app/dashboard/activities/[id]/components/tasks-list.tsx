import { TaskCard } from "@/app/dashboard/activities/[id]/components/task-card";
import { NoTasks } from "@/app/dashboard/activities/[id]/components/no-tasks";
import type { TaskWithTimeEntries } from "@/types";

type TasksListProps = {
  tasks: TaskWithTimeEntries[];
};

export function TasksList({ tasks }: TasksListProps) {
  if (tasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        );
      })}
    </ul>
  );
}

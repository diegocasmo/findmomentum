"use client";

import { useCallback, useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "@/app/dashboard/activities/[id]/components/task-card";
import { NoTasks } from "@/app/dashboard/activities/[id]/components/no-tasks";
import type { TaskWithTimeEntries } from "@/types";
import { updateTaskPositionAction } from "@/app/actions/update-task-position-action";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";

type TasksListProps = {
  tasks: TaskWithTimeEntries[];
};

export function TasksList({ tasks: initialTasks }: TasksListProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [localTasks, setLocalTasks] =
    useState<TaskWithTimeEntries[]>(initialTasks);

  useEffect(() => {
    setLocalTasks(initialTasks);
  }, [initialTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setLocalTasks((tasks) => {
          const oldIndex = tasks.findIndex((item) => item.id === active.id);
          const newIndex = tasks.findIndex((item) => item.id === over.id);

          return arrayMove(tasks, oldIndex, newIndex);
        });

        startTransition(async () => {
          const oldIndex = localTasks.findIndex(
            (item) => item.id === active.id
          );
          const newIndex = localTasks.findIndex((item) => item.id === over.id);
          const movedTask = localTasks[oldIndex];
          const formData = new FormData();
          formData.append("taskId", movedTask.id);

          let newPosition: string;
          if (newIndex === 0) {
            newPosition = "top";
          } else if (newIndex === localTasks.length - 1) {
            newPosition = "bottom";
          } else {
            newPosition =
              localTasks[newIndex > oldIndex ? newIndex : newIndex - 1].id;
          }

          formData.append("newPosition", newPosition);

          try {
            const result = await updateTaskPositionAction(formData);
            if (result.success) {
              router.refresh();
            } else {
              toast({
                title: "Error",
                description:
                  "Failed to update task position. Please try again.",
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error("Error updating task position:", error);
            setLocalTasks(initialTasks); // Revert to original order
            toast({
              title: "Error",
              description: "Failed to update task position. Please try again.",
              variant: "destructive",
            });
          }
        });
      }
    },
    [router, toast, initialTasks, localTasks]
  );

  if (localTasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localTasks}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-4 relative">
          {localTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {isPending && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

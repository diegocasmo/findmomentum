import { prisma } from "@/lib/prisma";
import { type Task, TeamMembershipRole } from "@prisma/client";
import { getTaskRemainingTime } from "@/lib/utils/time";

type UpdateTaskParams = {
  userId: string;
  taskId: string;
  name: string;
  durationMs: number;
};

export async function updateTask({
  userId,
  taskId,
  name,
  durationMs,
}: UpdateTaskParams): Promise<Task> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Find the task and ensure the user has permission to update it
      const task = await tx.task.findFirstOrThrow({
        where: {
          id: taskId,
          deletedAt: null,
          completedAt: null,
          activity: {
            userId,
            deletedAt: null,
            completedAt: null,
            team: {
              teamMemberships: {
                some: {
                  userId,
                  role: TeamMembershipRole.OWNER,
                },
              },
            },
          },
        },
        include: {
          timeEntries: true,
        },
      });

      // Validate durationMs only if the task has time entries
      if (task.timeEntries.length > 0) {
        const elapsedTime = task.durationMs - getTaskRemainingTime(task);

        if (durationMs < elapsedTime) {
          throw new Error(
            `Duration must be at least ${elapsedTime}ms (the current elapsed time)`
          );
        }
      }

      // Update the task
      const updatedTask = await tx.task.update({
        where: { id: taskId },
        data: { name, durationMs },
      });

      return updatedTask;
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

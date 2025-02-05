import { prisma } from "@/lib/prisma";
import type { Task } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";

type CompleteTaskParams = {
  taskId: string;
  userId: string;
};

export async function completeTask({
  taskId,
  userId,
}: CompleteTaskParams): Promise<Task> {
  try {
    return await prisma.$transaction(async (tx) => {
      const now = new Date();

      // Ensure user is the owner of the task's activity team
      await tx.task.findFirstOrThrow({
        where: {
          id: taskId,
          deletedAt: null,
          activity: {
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
      });

      // Update the task to mark it as completed
      const completedTask = await tx.task.update({
        where: { id: taskId },
        data: { completedAt: now },
      });

      // Find and stop the ongoing time entry for this task
      await tx.timeEntry.updateMany({
        where: {
          taskId,
          stoppedAt: null,
        },
        data: {
          stoppedAt: now,
        },
      });

      return completedTask;
    });
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
}

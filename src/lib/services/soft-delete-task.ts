import { prisma } from "@/lib/prisma";
import type { Task } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";

type SoftDeleteTaskParams = {
  userId: string;
  taskId: string;
};

export async function softDeleteTask({
  userId,
  taskId,
}: SoftDeleteTaskParams): Promise<Task> {
  try {
    return await prisma.task.update({
      where: {
        id: taskId,
        deletedAt: null,
        activity: {
          completedAt: null,
          team: {
            teamMemberships: {
              some: {
                userId: userId,
                role: TeamMembershipRole.OWNER,
              },
            },
          },
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error soft-deleting task:", error);
    throw error;
  }
}

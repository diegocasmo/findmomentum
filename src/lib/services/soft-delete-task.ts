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
  return prisma.task.update({
    where: {
      id: taskId,
      deletedAt: null,
      activity: {
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
}

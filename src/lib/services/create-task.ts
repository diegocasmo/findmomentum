import type { Task } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateTaskParams = {
  name: string;
  userId: string;
  activityId: string;
};

export async function createTask({
  name,
  userId,
  activityId,
}: CreateTaskParams): Promise<Task> {
  try {
    return await prisma.$transaction(async (tx) => {
      const activity = await tx.activity.findFirstOrThrow({
        where: {
          id: activityId,
          userId,
          team: {
            teamMemberships: {
              some: {
                userId,
                role: TeamMembershipRole.OWNER,
              },
            },
          },
        },
      });

      return await tx.task.create({
        data: {
          name,
          activityId: activity.id,
        },
      });
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

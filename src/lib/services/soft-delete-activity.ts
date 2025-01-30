import { prisma } from "@/lib/prisma";
import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";

type SoftDeleteActivityParams = {
  userId: string;
  activityId: string;
};

export async function softDeleteActivity({
  userId,
  activityId,
}: SoftDeleteActivityParams): Promise<Activity> {
  try {
    return await prisma.$transaction(async (tx) => {
      const activity = await tx.activity.findFirstOrThrow({
        where: {
          id: activityId,
          deletedAt: null,
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

      return await tx.activity.update({
        where: { id: activity.id },
        data: { deletedAt: new Date() },
      });
    });
  } catch (error) {
    console.error("Error soft deleting activity:", error);
    throw error;
  }
}

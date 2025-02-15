import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type UpdateActivityParams = {
  activityId: string;
  name?: string;
  description?: string;
  userId: string;
};

export async function updateActivity({
  activityId,
  name,
  description,
  userId,
}: UpdateActivityParams): Promise<Activity> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Find the activity and ensure the user is the owner
      // of the team
      await tx.activity.findFirstOrThrow({
        where: {
          id: activityId,
          userId,
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

      return tx.activity.update({
        where: { id: activityId },
        data: {
          ...(name && { name }),
          ...(description !== undefined && { description }),
        },
      });
    });
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
}

import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateActivityParams = {
  name: string;
  description: string;
  userId: string;
};

export async function createActivity({
  name,
  description,
  userId,
}: CreateActivityParams): Promise<Activity> {
  try {
    return await prisma.$transaction(async (tx) => {
      const teamMembership = await tx.teamMembership.findFirstOrThrow({
        where: { userId, role: TeamMembershipRole.OWNER },
        select: { teamId: true },
      });

      return tx.activity.create({
        data: {
          name,
          description,
          teamId: teamMembership.teamId,
          userId,
        },
      });
    });
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
}

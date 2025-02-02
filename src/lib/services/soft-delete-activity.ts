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
  return prisma.activity.update({
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
    data: { deletedAt: new Date() },
  });
}

import { prisma } from "@/lib/prisma";
import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";

type ToggleBookmarkActivityParams = {
  activityId: string;
  userId: string;
};

export async function toggleBookmarkActivity({
  activityId,
  userId,
}: ToggleBookmarkActivityParams): Promise<Activity> {
  return await prisma.$transaction(async (tx) => {
    const activity = await tx.activity.findFirstOrThrow({
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
        bookmarkedAt: activity.bookmarkedAt ? null : new Date(),
      },
    });
  });
}

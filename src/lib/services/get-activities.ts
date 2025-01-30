import { prisma } from "@/lib/prisma";
import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
};

export async function getActivities({
  userId,
}: GetActivitiesParams): Promise<Activity[]> {
  const activities = await prisma.activity.findMany({
    where: {
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
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tasks: {
        include: {
          timeEntries: true,
        },
      },
    },
  });

  return activities;
}

import { prisma } from "@/lib/prisma";
import { ActivityWithTasksAndTimeEntries } from "@/types";
import { TeamMembershipRole } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
};

export async function getActivities({
  userId,
}: GetActivitiesParams): Promise<ActivityWithTasksAndTimeEntries[]> {
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

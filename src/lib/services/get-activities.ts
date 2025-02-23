import { prisma } from "@/lib/prisma";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
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
        where: {
          deletedAt: null,
          activity: {
            tasks: {
              some: {
                timeEntries: {
                  some: {
                    stoppedAt: null,
                  },
                },
              },
            },
          },
        },
        include: {
          timeEntries: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return activities;
}

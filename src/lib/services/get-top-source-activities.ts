import { prisma } from "@/lib/prisma";
import { ActivityWithTasksAndTimeEntries } from "@/types";
import { TeamMembershipRole } from "@prisma/client";

export type GetTopSourceActivitiesParams = {
  userId: string;
  limit?: number;
};

export async function getTopSourceActivities({
  userId,
  limit = 3,
}: GetTopSourceActivitiesParams): Promise<ActivityWithTasksAndTimeEntries[]> {
  const topSourceActivities = await prisma.activity.findMany({
    where: {
      userId,
      // This ensures we only get activities that have been used as sources
      derivedActivities: { some: {} },
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
      derivedActivities: {
        _count: "desc",
      },
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
          position: "asc",
        },
      },
    },
    take: limit,
  });

  return topSourceActivities;
}

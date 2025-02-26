import { prisma } from "@/lib/prisma";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { TeamMembershipRole } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
  completed?: boolean;
};

export async function getActivities({
  userId,
  completed,
}: GetActivitiesParams): Promise<ActivityWithTasksAndTimeEntries[]> {
  const activities = await prisma.activity.findMany({
    where: {
      userId,
      deletedAt: null,
      completedAt: completed ? { not: null } : null,
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
          position: "asc",
        },
      },
    },
  });

  return activities;
}

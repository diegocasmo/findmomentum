import { prisma } from "@/lib/prisma";
import type { ActivityWithTasksAndTimeEntries } from "@/types";
import { TeamMembershipRole } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
  page?: number;
  limit?: number;
};

export type PaginatedActivities = {
  activities: ActivityWithTasksAndTimeEntries[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export async function getActivities({
  userId,
  page = 1,
  limit = 10,
}: GetActivitiesParams): Promise<PaginatedActivities> {
  // Calculate pagination values
  const skip = (page - 1) * limit;

  // Get total count for pagination
  const totalCount = await prisma.activity.count({
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
  });

  // Get paginated activities
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
          position: "asc",
        },
      },
    },
    skip,
    take: limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return {
    activities,
    totalCount,
    totalPages,
    currentPage: page,
  };
}

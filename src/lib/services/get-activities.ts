import { prisma } from "@/lib/prisma";
import type { CompletionStatus } from "@/types";
import { type Prisma, TeamMembershipRole } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
  page?: number;
  limit?: number;
  searchQuery?: string;
  completionStatus?: CompletionStatus;
};

type ActivityWithTasks = Prisma.ActivityGetPayload<{
  include: {
    tasks: {
      include: {
        timeEntries: true;
      };
    };
  };
}>;

export type PaginatedActivities = {
  activities: ActivityWithTasks[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export async function getActivities({
  userId,
  page = 1,
  limit = 10,
  searchQuery = "",
  completionStatus = "all",
}: GetActivitiesParams): Promise<PaginatedActivities> {
  const skip = (page - 1) * limit;

  console.log(`completionStatus: ${completionStatus}`);

  const whereClause: Prisma.ActivityWhereInput = {
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
    ...(searchQuery
      ? {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
        }
      : {}),
    ...(completionStatus === "completed"
      ? { completedAt: { not: null } }
      : completionStatus === "incomplete"
      ? { completedAt: null }
      : {}),
  };

  const [totalCount, activities] = await Promise.all([
    prisma.activity.count({ where: whereClause }),
    prisma.activity.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        tasks: {
          where: { deletedAt: null },
          orderBy: { position: "asc" },
          include: {
            timeEntries: {
              where: { stoppedAt: null },
            },
          },
        },
      },
      skip,
      take: limit,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    activities,
    totalCount,
    totalPages,
    currentPage: page,
  };
}

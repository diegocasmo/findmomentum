import { prisma } from "@/lib/prisma";
import { TeamMembershipRole } from "@prisma/client";

export type ActivityContribution = {
  date: string;
  count: number;
};

export type GetActivityContributionsParams = {
  userId: string;
  startDate?: Date;
  endDate?: Date;
};

export async function getActivityContributions({
  userId,
  startDate,
  endDate = new Date(),
}: GetActivityContributionsParams): Promise<ActivityContribution[]> {
  // Default to last 365 days if no start date provided
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 365);

  const actualStartDate = startDate || defaultStartDate;

  // Get all COMPLETED activities within the date range
  const activities = await prisma.activity.findMany({
    where: {
      userId,
      deletedAt: null,
      // Only include activities that have been completed
      completedAt: {
        not: null,
        gte: actualStartDate,
        lte: endDate,
      },
      team: {
        teamMemberships: {
          some: {
            userId,
            role: TeamMembershipRole.OWNER,
          },
        },
      },
    },
    select: {
      completedAt: true,
    },
    orderBy: {
      completedAt: "asc",
    },
  });

  // Group activities by completion date and count them
  const contributionMap = new Map<string, number>();

  // Initialize all dates in the range with zero counts
  const currentDate = new Date(actualStartDate);
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    contributionMap.set(dateString, 0);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Count activities for each date based on completion date
  activities.forEach((activity) => {
    if (activity.completedAt) {
      const dateString = activity.completedAt.toISOString().split("T")[0];
      const currentCount = contributionMap.get(dateString) || 0;
      contributionMap.set(dateString, currentCount + 1);
    }
  });

  // Convert map to array of objects
  return Array.from(contributionMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));
}

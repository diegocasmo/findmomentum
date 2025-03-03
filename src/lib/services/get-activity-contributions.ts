import { prisma } from "@/lib/prisma";
import { TeamMembershipRole } from "@prisma/client";
import { subYears, eachDayOfInterval, format } from "date-fns";

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
  // Default to last year if no start date provided, properly accounting for leap years
  const actualStartDate = startDate || subYears(endDate, 1);

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

  // Generate all dates in the range using date-fns
  const allDatesInRange = eachDayOfInterval({
    start: actualStartDate,
    end: endDate,
  });

  // Initialize contribution map with all dates set to zero count
  const contributionMap = new Map<string, number>();
  allDatesInRange.forEach((date) => {
    contributionMap.set(format(date, "yyyy-MM-dd"), 0);
  });

  // Count activities for each date based on completion date
  activities.forEach((activity) => {
    if (activity.completedAt) {
      const dateString = format(activity.completedAt, "yyyy-MM-dd");
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

import { prisma } from "@/lib/prisma";
import { TeamMembershipRole } from "@prisma/client";
import { subYears, eachDayOfInterval } from "date-fns";
import { formatYearMonthDate } from "@/lib/utils/time";

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
  let actualStartDate = startDate || subYears(endDate, 1);

  // Ensure the date range is no longer than one year
  const oneYearBeforeEndDate = subYears(endDate, 1);
  if (actualStartDate < oneYearBeforeEndDate) {
    actualStartDate = oneYearBeforeEndDate;
  }

  const activities = await prisma.activity.findMany({
    where: {
      userId,
      deletedAt: null,
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

  const allDatesInRange = eachDayOfInterval({
    start: actualStartDate,
    end: endDate,
  });

  const contributionMap = new Map<string, number>();
  allDatesInRange.forEach((date) => {
    contributionMap.set(formatYearMonthDate(date), 0);
  });

  activities.forEach((activity) => {
    if (activity.completedAt) {
      const dateString = formatYearMonthDate(activity.completedAt);
      const currentCount = contributionMap.get(dateString) || 0;
      contributionMap.set(dateString, currentCount + 1);
    }
  });

  return Array.from(contributionMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));
}

import { prisma } from "@/lib/prisma";
import { TeamMembershipRole } from "@prisma/client";
import type { ActivityWithTasksAndTimeEntries } from "@/types";

export type GetActivityParams = {
  id: string;
  userId: string;
};

export async function getActivity({
  id,
  userId,
}: GetActivityParams): Promise<ActivityWithTasksAndTimeEntries> {
  try {
    return await prisma.activity.findFirstOrThrow({
      where: {
        id,
        userId,
        team: {
          teamMemberships: {
            some: {
              userId,
              role: TeamMembershipRole.OWNER,
            },
          },
        },
        deletedAt: null,
      },
      include: {
        tasks: {
          where: {
            deletedAt: null,
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
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
}

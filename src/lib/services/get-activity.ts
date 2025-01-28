import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
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
    const activity = await prisma.$transaction(async (tx) => {
      const teamMembership = await tx.teamMembership.findFirstOrThrow({
        where: { userId, role: "OWNER" },
        select: { teamId: true },
      });

      return await tx.activity.findFirst({
        where: {
          id: id,
          userId: userId,
          teamId: teamMembership.teamId,
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
    });

    if (!activity) {
      notFound();
    }

    return activity;
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
}

import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { addMilliseconds } from "date-fns";

type CreateActivityFromTemplateParams = {
  activityId: string;
  userId: string;
};

export async function createActivityFromTemplate({
  activityId,
  userId,
}: CreateActivityFromTemplateParams): Promise<Activity> {
  try {
    return await prisma.$transaction(async (tx) => {
      const sourceActivity = await tx.activity.findFirstOrThrow({
        where: {
          id: activityId,
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
        include: {
          tasks: {
            where: { deletedAt: null },
            orderBy: { createdAt: "asc" },
          },
        },
      });

      return await tx.activity.create({
        data: {
          name: `Copy of ${sourceActivity.name}`,
          description: sourceActivity.description
            ? `Copy of ${sourceActivity.description}`
            : null,
          teamId: sourceActivity.teamId,
          userId: userId,
          tasks: {
            create: sourceActivity.tasks.map((task, index) => ({
              name: task.name,
              durationMs: task.durationMs,
              // Make sure each task has a distinct `createdAt` timestamp
              createdAt: addMilliseconds(new Date(), index),
            })),
          },
        },
      });
    });
  } catch (error) {
    console.error("Error creating activity from template:", error);
    throw error;
  }
}

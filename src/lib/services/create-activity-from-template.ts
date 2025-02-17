import type { Activity } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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
        include: { tasks: true },
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
            create: sourceActivity.tasks.map((task) => ({
              name: task.name,
              durationMs: task.durationMs,
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

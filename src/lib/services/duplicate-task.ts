import type { Task } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { w } from "node_modules/@faker-js/faker/dist/airline-BcEu2nRk";

type DuplicateTaskParams = {
  taskId: string;
  userId: string;
};

export async function duplicateTask({
  taskId,
  userId,
}: DuplicateTaskParams): Promise<Task> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Find the source task and ensure the user has permission to access it
      const sourceTask = await tx.task.findFirstOrThrow({
        where: {
          id: taskId,
          deletedAt: null,
          activity: {
            userId,
            deletedAt: null,
            completedAt: null,
            team: {
              teamMemberships: {
                some: {
                  userId,
                  role: TeamMembershipRole.OWNER,
                },
              },
            },
          },
        },
      });

      // Find the highest position in the activity to place the new task at the end
      const highestPositionTask = await tx.task.findFirst({
        where: {
          activityId: sourceTask.activityId,
        },
        orderBy: {
          position: "desc",
        },
      });

      const newPosition = highestPositionTask
        ? highestPositionTask.position + 1
        : sourceTask.position + 1;

      // Create the duplicated task
      return await tx.task.create({
        data: {
          name: sourceTask.name,
          position: newPosition,
          durationMs: sourceTask.durationMs,
          activityId: sourceTask.activityId,
        },
      });
    });
  } catch (error) {
    throw error;
  }
}

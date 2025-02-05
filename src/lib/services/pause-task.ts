import { prisma } from "@/lib/prisma";
import type { TimeEntry } from "@prisma/client";
import { TeamMembershipRole } from "@prisma/client";

type PauseTaskParams = {
  taskId: string;
  userId: string;
};

export async function pauseTask({
  taskId,
  userId,
}: PauseTaskParams): Promise<TimeEntry | null> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Ensure user is the owner of the task's activity team
      await tx.task.findFirstOrThrow({
        where: {
          id: taskId,
          deletedAt: null,
          completedAt: null,
          activity: {
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

      // Find the ongoing time entry for this task
      const timeEntry = await tx.timeEntry.findFirstOrThrow({
        where: {
          taskId,
          stoppedAt: null,
        },
      });

      // Pause the ongoing time entry
      return await tx.timeEntry.update({
        where: {
          id: timeEntry.id,
        },
        data: {
          stoppedAt: new Date(),
        },
      });
    });
  } catch (error) {
    console.error("Error pausing task:", error);
    throw error;
  }
}

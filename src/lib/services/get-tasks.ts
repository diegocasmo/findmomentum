import { prisma } from "@/lib/prisma";
import { TeamMembershipRole } from "@prisma/client";

type GetTasksParams = {
  activityId: string;
  userId: string;
};

export async function getTasks({ activityId, userId }: GetTasksParams) {
  return prisma.task.findMany({
    where: {
      activityId,
      activity: {
        userId,
        team: {
          teamMemberships: {
            some: {
              userId,
              role: TeamMembershipRole.OWNER,
            },
          },
        },
      },
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

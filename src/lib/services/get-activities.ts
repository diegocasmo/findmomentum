import { prisma } from "@/lib/prisma";
import type { Activity } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
};

// To-do: Include time entries so that it's possible to differentiate between
// activities that were executed and those that were planned
export async function getActivities({
  userId,
}: GetActivitiesParams): Promise<Activity[]> {
  const activities = await prisma.activity.findMany({
    where: {
      userId: userId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return activities;
}

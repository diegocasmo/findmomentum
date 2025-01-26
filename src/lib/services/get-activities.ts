import { prisma } from "@/lib/prisma";
import type { Activity } from "@prisma/client";

export type GetActivitiesParams = {
  userId: string;
};

export async function getActivities({
  userId,
}: GetActivitiesParams): Promise<Activity[]> {
  const activities = await prisma.activity.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return activities;
}

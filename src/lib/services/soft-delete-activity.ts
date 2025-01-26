import { prisma } from "@/lib/prisma";
import type { Activity } from "@prisma/client";

export async function softDeleteActivity(
  activityId: string
): Promise<Activity> {
  try {
    return await prisma.activity.update({
      where: { id: activityId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch (error) {
    console.error("Error soft deleting activity:", error);
    throw error;
  }
}

import { type Activity, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateActivityParams = {
  durationMs: number;
  name: string;
  userId: string;
};

export async function createActivity({
  durationMs,
  name,
  userId,
}: CreateActivityParams): Promise<Activity> {
  try {
    return await prisma.$transaction(async (tx) => {
      const teamMembership = await tx.teamMembership.findFirstOrThrow({
        where: { userId, role: "OWNER" },
        select: { teamId: true },
      });

      return tx.activity.create({
        data: {
          durationMs,
          name,
          teamId: teamMembership.teamId,
          userId,
        },
      });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      throw new Error(`Failed to create activity: ${error.message}`);
    }
    console.error("Error creating activity:", error);
    throw new Error("An unexpected error occurred while creating the activity");
  }
}

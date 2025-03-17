import { prisma } from "@/lib/prisma";
import { TeamMembershipRole } from "@prisma/client";
import type { Category } from "@prisma/client";

type CreateCategoryParams = {
  name: string;
  userId: string;
};

export async function createCategory({
  name,
  userId,
}: CreateCategoryParams): Promise<Category> {
  try {
    return await prisma.$transaction(async (tx) => {
      const teamMembership = await tx.teamMembership.findFirstOrThrow({
        where: { userId, role: TeamMembershipRole.OWNER },
        select: { teamId: true },
      });

      return tx.category.create({
        data: {
          name,
          teamId: teamMembership.teamId,
          userId,
        },
      });
    });
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

import { prisma } from "@/lib/prisma";
import { Organization, User } from "@prisma/client";

function getOrganizationName(email: string): string {
  const [name] = email.split("@");
  return name.charAt(0).toUpperCase() + name.slice(1) + "'s Organization";
}

export async function findOrCreateDefaultOrganization(
  userId: string
): Promise<Organization> {
  try {
    // Query for the user
    const user: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user not found, throw an error
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Check if the user already has an organization
    const existingUserOrg = await prisma.userOrganization.findFirst({
      where: { userId },
      include: { organization: true },
    });

    // If the user already has an organization, return it
    if (existingUserOrg) return existingUserOrg.organization;

    // Create the default organization
    return prisma.$transaction(async (tx) => {
      const newOrg = await tx.organization.create({
        data: {
          name: getOrganizationName(user.email),
          userOrganizations: {
            create: {
              userId,
              role: "OWNER",
            },
          },
        },
      });

      return newOrg;
    });
  } catch (error) {
    console.error("Error creating default organization:", error);
    throw error;
  }
}

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { findOrCreateDefaultTeam } from "@/lib/services/find-or-create-default-team";
import { createActivity } from "@/lib/services/create-activity";

const prisma = new PrismaClient();

async function main() {
  // Create a new user with verified email
  const user = await prisma.user.create({
    data: {
      email: "foo@bar.com",
      emailVerified: new Date(),
    },
  });

  // Create the default team for the user
  const team = await findOrCreateDefaultTeam(user.id);

  if (!team) {
    throw new Error("Failed to create default team");
  }

  // Create 10 activities for the user
  for (let i = 0; i < 10; i++) {
    await createActivity({
      name: faker.commerce.productName(),
      userId: user.id,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

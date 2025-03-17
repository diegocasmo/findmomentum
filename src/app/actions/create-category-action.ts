"use server";

import { createCategorySchema } from "@/app/schemas/create-category-schema";
import { createCategory } from "@/lib/services/create-category";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { auth } from "@/lib/auth";
import type { Category } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function createCategoryAction(
  formData: FormData
): Promise<ActionResult<Category>> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      errors: parseZodErrors(
        createZodError("User not authenticated", ["root"])
      ),
    };
  }

  const result = createCategorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const category = await createCategory({
      name: result.data.name,
      userId: session.user.id,
    });
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    const zodError =
      transformPrismaErrorToZodError(error) ||
      createZodError("An unexpected error occurred. Please try again.", [
        "root",
      ]);
    return {
      success: false,
      errors: parseZodErrors(zodError),
    };
  }
}

"use server";

import { softDeleteActivity } from "@/lib/services/soft-delete-activity";
import { auth } from "@/lib/auth";
import type { Activity } from "@prisma/client";
import { createZodError, parseZodErrors } from "@/lib/utils/form";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { FieldErrors } from "react-hook-form";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: FieldErrors };

export async function softDeleteActivityAction(
  activityId: string
): Promise<ActionResult<Activity>> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      errors: parseZodErrors(
        createZodError("User not authenticated", ["root"])
      ),
    };
  }

  try {
    const deletedActivity = await softDeleteActivity(activityId);
    return { success: true, data: deletedActivity };
  } catch (error) {
    console.error("Error soft deleting activity:", error);
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

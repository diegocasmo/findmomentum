"use server";

import { completeActivity } from "@/lib/services/complete-activity";
import { completeActivitySchema } from "@/app/dashboard/schemas/complete-activity-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import type { FieldErrors } from "react-hook-form";
import { auth } from "@/lib/auth";
import type { Activity } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: FieldErrors };

export async function completeActivityAction(
  formData: FormData
): Promise<ActionResult<Activity | null>> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      errors: parseZodErrors(
        createZodError("User not authenticated", ["root"])
      ),
    };
  }

  const result = completeActivitySchema.safeParse({
    activityId: formData.get("activityId"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const activity = await completeActivity({
      activityId: result.data.activityId,
      userId: session.user.id,
    });
    return { success: true, data: activity };
  } catch (error) {
    console.error("Error completing activity:", error);
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

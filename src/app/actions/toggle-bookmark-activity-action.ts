"use server";

import { toggleBookmarkActivity } from "@/lib/services/toggle-bookmark-activity";
import { toggleBookmarkActivitySchema } from "@/app/schemas/toggle-bookmark-activity-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { auth } from "@/lib/auth";
import type { Activity } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function toggleBookmarkActivityAction(
  formData: FormData
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

  const result = toggleBookmarkActivitySchema.safeParse({
    activityId: formData.get("activityId"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const activity = await toggleBookmarkActivity({
      activityId: result.data.activityId,
      userId: session.user.id,
    });
    return { success: true, data: activity };
  } catch (error) {
    console.error("Error toggling bookmark:", error);
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

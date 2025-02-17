"use server";

import { playTask } from "@/lib/services/play-task";
import { playTaskSchema } from "@/app/schemas/play-task-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { auth } from "@/lib/auth";
import type { TimeEntry } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function playTaskAction(
  formData: FormData
): Promise<ActionResult<TimeEntry>> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      errors: parseZodErrors(
        createZodError("User not authenticated", ["root"])
      ),
    };
  }

  const result = playTaskSchema.safeParse({
    taskId: formData.get("taskId"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const timeEntry = await playTask({
      taskId: result.data.taskId,
      userId: session.user.id,
    });
    return { success: true, data: timeEntry };
  } catch (error) {
    console.error("Error playing task:", error);
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

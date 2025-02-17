"use server";

import { completeTask } from "@/lib/services/complete-task";
import { completeTaskSchema } from "@/app/schemas/complete-task-schema";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { auth } from "@/lib/auth";
import type { Task } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function completeTaskAction(
  formData: FormData
): Promise<ActionResult<Task | null>> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      errors: parseZodErrors(
        createZodError("User not authenticated", ["root"])
      ),
    };
  }

  const result = completeTaskSchema.safeParse({
    taskId: formData.get("taskId"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const task = await completeTask({
      taskId: result.data.taskId,
      userId: session.user.id,
    });
    return { success: true, data: task };
  } catch (error) {
    console.error("Error pausing task:", error);
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

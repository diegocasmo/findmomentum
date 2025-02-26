"use server";

import { updateTaskPositionSchema } from "@/app/schemas/update-task-position-schema";
import { updateTaskPosition } from "@/lib/services/update-task-position";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { auth } from "@/lib/auth";
import type { Task } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function updateTaskPositionAction(
  formData: FormData
): Promise<ActionResult<Task>> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      errors: parseZodErrors(
        createZodError("User not authenticated", ["root"])
      ),
    };
  }

  const result = updateTaskPositionSchema.safeParse({
    taskId: formData.get("taskId"),
    newPosition: formData.get("newPosition"),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const task = await updateTaskPosition({
      taskId: result.data.taskId,
      userId: session.user.id,
      newPosition: result.data.newPosition,
    });
    return { success: true, data: task };
  } catch (error) {
    console.error("Error updating task position:", error);
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

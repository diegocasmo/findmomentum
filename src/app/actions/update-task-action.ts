"use server";

import { updateTaskSchema } from "@/app/schemas/update-task-schema";
import { updateTask } from "@/lib/services/update-task";
import { parseZodErrors, createZodError } from "@/lib/utils/form";
import { auth } from "@/lib/auth";
import type { Task } from "@prisma/client";
import { transformPrismaErrorToZodError } from "@/lib/utils/prisma-error-handler";
import type { ActionResult } from "@/types";

export async function updateTaskAction(
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

  const result = updateTaskSchema.safeParse({
    taskId: formData.get("taskId"),
    name: formData.get("name"),
    durationMs: Number(formData.get("durationMs")),
  });

  if (!result.success) {
    return { success: false, errors: parseZodErrors(result) };
  }

  try {
    const task = await updateTask({
      userId: session.user.id,
      taskId: result.data.taskId,
      name: result.data.name,
      durationMs: result.data.durationMs,
    });
    return { success: true, data: task };
  } catch (error) {
    console.error("Error updating task:", error);
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

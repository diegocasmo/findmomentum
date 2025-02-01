"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/dashboard/schemas/create-task-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useTransition } from "react";
import { createTaskAction } from "@/app/dashboard/actions/create-task-action";
import { setFormErrors } from "@/lib/utils/form";
import { useRouter } from "next/navigation";
import type { CreateTaskSchema } from "@/app/dashboard/schemas/create-task-schema";

type CreateTaskFormProps = {
  activityId: string;
};

export function CreateTaskForm({ activityId }: CreateTaskFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      activityId: activityId,
    },
  });

  async function onSubmit(data: CreateTaskSchema) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("activityId", data.activityId);

        const result = await createTaskAction(formData);

        if (result.success) {
          form.reset({ name: "", activityId });
          router.refresh();
        } else {
          setFormErrors(form.setError, result.errors);
        }
      } catch (error) {
        console.error("Task creation error:", error);
        form.setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    });
  }

  return (
    <div className="mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="task-name" className="sr-only">
                  Task Name
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="task-name"
                      placeholder="Enter a new task"
                      {...field}
                      autoComplete="off"
                      className="flex-grow"
                    />
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="whitespace-nowrap"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      {isPending ? "Adding..." : "Add Task"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

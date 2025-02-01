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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ListIcon, Loader2Icon, ClockIcon } from "lucide-react";
import { useTransition } from "react";
import { createTaskAction } from "@/app/actions/create-task-action";
import { setFormErrors } from "@/lib/utils/form";
import { useRouter } from "next/navigation";
import type { CreateTaskSchema } from "@/app/dashboard/schemas/create-task-schema";
import { DurationInput } from "@/components/duration-input";
import { RootFormError } from "@/components/root-form-error";

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
      durationMs: 0,
    },
  });

  async function onSubmit(data: CreateTaskSchema) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("durationMs", data.durationMs.toString());
        formData.append("activityId", activityId);

        const result = await createTaskAction(formData);

        if (result.success) {
          form.reset({ name: "", activityId, durationMs: 0 });
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
    <div className="bg-background rounded-lg shadow-sm p-4 mb-6 max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Add a new task"
                      {...field}
                      autoComplete="off"
                      className="text-sm pr-10"
                    />
                    <ListIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationMs"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <DurationInput {...field} />
                    <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RootFormError message={form.formState.errors.root?.message} />
          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? (
              <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ListIcon className="h-4 w-4 mr-2" />
            )}
            {isPending ? "Adding Task..." : "Add Task"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

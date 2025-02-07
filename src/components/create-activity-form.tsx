import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createActivitySchema } from "@/app/schemas/create-activity-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActivityIcon } from "lucide-react";
import { useTransition } from "react";
import { createActivityAction } from "@/app/actions/create-activity-action";
import { setFormErrors } from "@/lib/utils/form";
import { useRouter } from "next/navigation";
import type { Activity } from "@prisma/client";
import { RootFormError } from "@/components/root-form-error";

type FormData = {
  name: string;
  description: string;
};

type CreateActivityFormProps = {
  onSuccess: (activity: Activity) => void;
};

export function CreateActivityForm({ onSuccess }: CreateActivityFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);

        const result = await createActivityAction(formData);

        if (result.success) {
          router.push(`/dashboard/activities/${result.data.id}`);
          onSuccess(result.data);
        } else {
          setFormErrors(form.setError, result.errors);
        }
      } catch (error) {
        console.error("Activity creation error:", error);
        form.setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="activity-name"
                  className="text-lg font-semibold flex items-center"
                >
                  <ActivityIcon className="w-5 h-5 mr-2" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="activity-name"
                    placeholder="e.g., Morning Jog, Meditation"
                    {...field}
                    autoComplete="off"
                    className="text-base"
                  />
                </FormControl>
                <FormDescription>
                  Choose a clear and concise name for your activity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="activity-description"
                  className="text-lg font-semibold"
                >
                  Description (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="activity-description"
                    placeholder="Describe your activity..."
                    {...field}
                    className="text-base"
                    rows={4}
                  />
                </FormControl>
                <FormDescription>
                  Provide additional details about your activity (max 500
                  characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <RootFormError message={form.formState.errors.root?.message} />
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full text-base font-semibold"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

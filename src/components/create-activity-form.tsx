import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createActivitySchema } from "@/app/dashboard/schemas/create-activity-schema";
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
import { DurationInput } from "@/components/duration-input";
import { Clock, Activity as ActivityIcon } from "lucide-react";
import { useTransition } from "react";
import { createActivityAction } from "@/app/dashboard/actions/create-activity-action";
import { setFormErrors } from "@/lib/utils/form";
import { useRouter } from "next/navigation";
import type { Activity } from "@prisma/client";

type FormData = {
  name: string;
  durationMs: number;
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
      durationMs: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("durationMs", data.durationMs.toString());

        const result = await createActivityAction(formData);

        if (result.success) {
          router.refresh();
          onSuccess(result.data);
        } else {
          setFormErrors(form.setError, result.errors);
        }
      } catch (error) {
        console.error("Project creation error:", error);
        form.setError("name", {
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
            name="durationMs"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="activity-duration"
                  className="text-lg font-semibold flex items-center"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Duration
                </FormLabel>
                <FormControl>
                  <DurationInput
                    id="activity-duration"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormDescription>
                  Set the duration in minutes and seconds (max 59:59).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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

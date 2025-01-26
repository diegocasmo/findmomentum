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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DurationInput } from "@/components/duration-input";

type FormData = {
  name: string;
  durationMs: number;
};

export function CreateActivityForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      name: "",
      durationMs: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter activity name" {...field} />
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
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <DurationInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

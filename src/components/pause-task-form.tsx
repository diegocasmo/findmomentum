"use client";
import { Button } from "@/components/ui/button";
import { PauseIcon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { pauseTaskAction } from "@/app/actions/pause-task-action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type PauseTaskFormProps = {
  taskId: string;
};

export function PauseTaskForm({ taskId }: PauseTaskFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handlePause = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("taskId", taskId);

        const result = await pauseTaskAction(formData);

        if (result.success) {
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: "Failed to pause the task. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Task pause error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePause}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <PauseIcon className="w-4 h-4" />
      )}
    </Button>
  );
}

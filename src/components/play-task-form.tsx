"use client";
import { Button } from "@/components/ui/button";
import { PlayIcon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { playTaskAction } from "@/app/actions/play-task-action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type PlayTaskFormProps = {
  taskId: string;
};

export function PlayTaskForm({ taskId }: PlayTaskFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handlePlay = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("taskId", taskId);

        const result = await playTaskAction(formData);

        if (result.success) {
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: "Failed to start the task. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Task play error:", error);
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
      onClick={handlePlay}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <PlayIcon className="h-4 w-4" />
      )}
    </Button>
  );
}

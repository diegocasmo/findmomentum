"use client";

import { Star, Loader2 } from "lucide-react";
import { useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toggleBookmarkActivityAction } from "@/app/actions/toggle-bookmark-activity-action";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type BookmarkButtonProps = {
  activityId: string;
  isBookmarked: boolean;
  variant?: "icon" | "menu";
};

export function BookmarkButton({
  activityId,
  isBookmarked,
  variant = "icon",
}: BookmarkButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [optimisticBookmarked, setOptimisticBookmarked] =
    useOptimistic(isBookmarked);

  const handleToggleBookmark = () => {
    startTransition(async () => {
      setOptimisticBookmarked(!optimisticBookmarked);

      try {
        const formData = new FormData();
        formData.append("activityId", activityId);
        const result = await toggleBookmarkActivityAction(formData);

        if (result.success) {
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: "Failed to update bookmark. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Toggle bookmark error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (variant === "menu") {
    return (
      <Button
        variant="ghost"
        className="w-full cursor-pointer justify-start px-4 py-2"
        onClick={handleToggleBookmark}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Star
            className={cn("h-4 w-4 mr-2", {
              "fill-current": optimisticBookmarked,
            })}
          />
        )}
        {optimisticBookmarked ? "Remove bookmark" : "Add bookmark"}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleBookmark}
      disabled={isPending}
      aria-label={optimisticBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Star
          className={cn("h-4 w-4", {
            "fill-current text-yellow-500": optimisticBookmarked,
          })}
        />
      )}
    </Button>
  );
}

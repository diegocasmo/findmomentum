"use client";

import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleBookmarkActivityAction } from "@/app/actions/toggle-bookmark-activity-action";
import { useOptimisticAction } from "@/hooks/use-optimistic-action";
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
  const {
    value: optimisticBookmarked,
    isPending,
    execute,
  } = useOptimisticAction(isBookmarked);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const formData = new FormData();
    formData.append("activityId", activityId);

    execute(!optimisticBookmarked, () => toggleBookmarkActivityAction(formData), {
      errorMessage: "Failed to update bookmark. Please try again.",
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

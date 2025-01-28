"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { softDeleteActivityAction } from "@/app/dashboard/actions/soft-delete-activity-action";
import { toast } from "@/hooks/use-toast";
import type { Activity } from "@prisma/client";

type DeleteActivityDialogProps = {
  activity: Activity;
};

const ERROR_MESSAGE_CONFIG: Parameters<typeof toast>[0] = {
  title: "Error",
  description: "Failed to delete the activity. Please try again.",
  variant: "destructive" as const,
};

export function DeleteActivityDialog({ activity }: DeleteActivityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await softDeleteActivityAction(activity.id);
      if (result.success) {
        toast({
          title: "Activity deleted",
          description: `"${activity.name}" has been successfully deleted.`,
        });
        router.refresh();
      } else {
        toast(ERROR_MESSAGE_CONFIG);
      }
    } catch (error) {
      console.error("Activity deletion error:", error);
      toast(ERROR_MESSAGE_CONFIG);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div onClick={(e) => e.preventDefault()}>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${activity.name}`}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 -mt-2 -mr-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the activity &quot;{activity.name}&quot;.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

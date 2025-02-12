"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTaskForm } from "@/components/create-task-form";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

type CreateTaskDialogProps = {
  activityId: string;
};

export function CreateTaskDialog({ activityId }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] w-full">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your activity by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm
          activityId={activityId}
          autoFocus
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

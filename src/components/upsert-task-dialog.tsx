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
import { UpsertTaskForm } from "@/components/upsert-task-form";
import type { TaskWithTimeEntries } from "@/types";

type UpsertTaskDialogProps = {
  activityId?: string;
  children: React.ReactNode;
  task?: TaskWithTimeEntries;
};

export function UpsertTaskDialog({
  activityId,
  children,
  task,
}: UpsertTaskDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] w-full">
        <DialogHeader>
          <DialogTitle>{task ? "Update" : "Create New"} Task</DialogTitle>
          <DialogDescription>
            {task
              ? "Update the task by filling out the form below."
              : "Create a new task by filling out the form below."}
          </DialogDescription>
        </DialogHeader>
        <UpsertTaskForm
          activityId={activityId}
          autoFocus
          onSuccess={() => setOpen(false)}
          task={task}
        />
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateActivityForm } from "@/components/create-activity-form";

type CreateActivityDialogProps = {
  children: React.ReactNode;
};

export function CreateActivityDialog({ children }: CreateActivityDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] w-full px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
          <DialogDescription>
            Create a new activity by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <CreateActivityForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

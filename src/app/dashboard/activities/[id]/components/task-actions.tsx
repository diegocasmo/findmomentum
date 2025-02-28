"use client";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteTaskDialog } from "@/app/dashboard/activities/[id]/components/delete-task-dialog";
import type { Task } from "@prisma/client";
import { Pencil } from "lucide-react";
import { UpsertTaskDialog } from "@/components/upsert-task-dialog";

type TaskActionsProps = {
  task: Task;
  redirectUrl?: string;
};

export function TaskActions({ task }: TaskActionsProps) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open task menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {task.completedAt ? null : (
            <DropdownMenuItem asChild>
              <UpsertTaskDialog task={task} aria-label="Update task">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer justify-start"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </UpsertTaskDialog>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <DeleteTaskDialog task={task} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

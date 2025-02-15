"use client";

import { Settings, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpsertActivityDialog } from "@/components/upsert-activity-dialog";
import { DeleteActivityDialog } from "@/components/delete-activity-dialog";
import type { Activity } from "@prisma/client";

type ActivityActionsProps = {
  activity: Activity;
  redirectUrl?: string;
};

export function ActivityActions({
  activity,
  redirectUrl,
}: ActivityActionsProps) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Open activity menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem asChild>
            <UpsertActivityDialog activity={activity}>
              <Button
                variant="ghost"
                className="w-full cursor-pointer justify-start"
                aria-label={`Update ${activity.name}`}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Update
              </Button>
            </UpsertActivityDialog>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DeleteActivityDialog activity={activity} redirectUrl={redirectUrl}>
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:text-destructive focus:text-destructive justify-start"
                aria-label={`Delete ${activity.name}`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DeleteActivityDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

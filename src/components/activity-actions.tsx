"use client";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            <DeleteActivityDialog
              activity={activity}
              redirectUrl={redirectUrl}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

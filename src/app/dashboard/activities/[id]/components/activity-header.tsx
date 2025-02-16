import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActivityIcon, ChevronLeft } from "lucide-react";
import { ActivityActions } from "@/components/activity-actions";
import type { Activity } from "@prisma/client";

type ActivityHeaderProps = {
  activity: Activity;
};

export function ActivityHeader({ activity }: ActivityHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-start space-x-6">
        <Button variant="outline" size="icon" asChild className="mt-2">
          <Link href="/dashboard" aria-label="Back to dashboard">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="min-h-[88px]">
          <h1 className="text-4xl font-bold flex items-center">
            <ActivityIcon className="w-10 h-10 mr-4 text-primary" />
            {activity.name}
          </h1>
          <p className="mt-2 text-xl text-muted-foreground h-7 overflow-hidden">
            {activity.description}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <ActivityActions activity={activity} redirectUrl="/dashboard" />
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Activity } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Calendar } from "lucide-react";
import { ActivityActions } from "./activity-actions";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Link href={`/dashboard/activities/${activity.id}`} passHref>
      <Card className="transition-all duration-300 group cursor-pointer overflow-hidden hover:bg-accent/50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium text-foreground">
              {activity.name}
            </CardTitle>
            <ActivityActions activity={activity} />
          </div>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {activity.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-primary" />
              <span className="first-letter:uppercase">
                {formatDistanceToNow(activity.createdAt, {
                  addSuffix: true,
                })}
              </span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

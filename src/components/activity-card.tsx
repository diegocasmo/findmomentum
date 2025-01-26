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
import { DeleteActivityDialog } from "@/components/delete-activity-dialog";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="transition-all duration-300 group cursor-pointer overflow-hidden hover:bg-accent/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium text-foreground">
            {activity.name}
          </CardTitle>
          <DeleteActivityDialog activity={activity} />
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
  );
}

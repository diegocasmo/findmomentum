import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Activity } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Calendar } from "lucide-react";

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
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${activity.name}`}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 -mt-2 -mr-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

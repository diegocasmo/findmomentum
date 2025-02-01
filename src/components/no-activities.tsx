import { Card, CardContent } from "@/components/ui/card";
import { ActivityIcon } from "lucide-react";

export function NoActivities() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <ActivityIcon className="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No activities yet</h3>
        <p className="text-sm text-center max-w-sm text-muted-foreground">
          When you create activities, they&apos;ll appear here. Start by
          creating your first activity!
        </p>
      </CardContent>
    </Card>
  );
}

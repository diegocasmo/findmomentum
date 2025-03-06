import { ActivityIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function NoActivities() {
  return (
    <Card className="border-dashed bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center py-4 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <ActivityIcon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No activities found</h3>
        <p className="mb-4 max-w-md text-sm text-muted-foreground">
          No activities to display. Create a new activity or try different
          search terms.
        </p>
      </CardContent>
    </Card>
  );
}

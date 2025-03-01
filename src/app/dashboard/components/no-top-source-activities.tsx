import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function NoTopSourceActivities() {
  return (
    <Card className="border-dashed bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center py-4 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-medium">
          No activities used as templates yet
        </h3>
        <p className="mb-4 max-w-md text-sm text-muted-foreground">
          Activities you&apos;ve most frequently used as templates will appear
          here
        </p>
      </CardContent>
    </Card>
  );
}

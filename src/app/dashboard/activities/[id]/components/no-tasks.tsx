import { Card, CardContent } from "@/components/ui/card";
import { ListIcon } from "lucide-react";

export function NoTasks() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <ListIcon className="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
        <p className="text-sm text-center max-w-sm text-muted-foreground">
          When you add tasks to this activity, they&apos;ll appear here. Start
          by adding your first task!
        </p>
      </CardContent>
    </Card>
  );
}

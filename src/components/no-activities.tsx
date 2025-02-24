"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ActivityIcon, CheckCircleIcon } from "lucide-react";
import { useActivityTab } from "@/hooks/use-activity-tab";

const content = {
  active: {
    icon: <ActivityIcon className="w-12 h-12 mb-4 text-muted-foreground" />,
    title: "No active activities",
    description:
      "When you create activities, they'll appear here. Start by creating your first activity!",
  },
  completed: {
    icon: <CheckCircleIcon className="w-12 h-12 mb-4 text-muted-foreground" />,
    title: "No completed activities",
    description:
      "Your completed activities will show up here. Keep working on your tasks to see them here!",
  },
};

export function NoActivities() {
  const { currentTab } = useActivityTab();

  const { icon, title, description } = content[currentTab];

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center justify-center py-10">
        {icon}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-center max-w-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActivityTab } from "@/hooks/use-activity-tab";
import type { ActivityTab } from "@/hooks/use-activity-tab";

export function ActivityTabs() {
  const { currentTab, setActivityTab } = useActivityTab();

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => setActivityTab(value as ActivityTab)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

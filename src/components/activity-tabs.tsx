"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActivityTab } from "@/hooks/use-activity-tab";
import type { ActivityTab } from "@/hooks/use-activity-tab";
import { useTransition } from "react";

export function ActivityTabs() {
  const { currentTab, setActivityTab } = useActivityTab();
  const [isPending, startTransition] = useTransition();

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => {
        startTransition(() => {
          setActivityTab(value as ActivityTab);
        });
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active" disabled={isPending}>
          Active
        </TabsTrigger>
        <TabsTrigger value="completed" disabled={isPending}>
          Completed
        </TabsTrigger>
      </TabsList>
      {isPending && <div>Loading...</div>}
    </Tabs>
  );
}

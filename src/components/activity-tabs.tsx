"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
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
        <TabsTrigger value="active" disabled={isPending} className="relative">
          Active
          {isPending && currentTab === "completed" && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin inline-block" />
          )}
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          disabled={isPending}
          className="relative"
        >
          Completed
          {isPending && currentTab === "active" && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin inline-block" />
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

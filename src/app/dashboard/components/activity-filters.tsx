"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import type { CompletionStatus } from "@/types";

const SEARCH_DEBOUNCE_DELAY_MS = 300;

export function ActivityFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearchQuery = searchParams.get("search") ?? "";
  const initialCompletionStatus =
    (searchParams.get("status") as CompletionStatus) ?? "all";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>(
    initialCompletionStatus
  );

  const debouncedSearchQuery = useDebounce(
    searchQuery,
    SEARCH_DEBOUNCE_DELAY_MS
  );

  const updateFilters = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    updateFilters({ search: debouncedSearchQuery });
  }, [debouncedSearchQuery, updateFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (value: CompletionStatus) => {
    setCompletionStatus(value);
    updateFilters({ status: value });
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
    setCompletionStatus(
      (searchParams.get("status") as CompletionStatus) ?? "all"
    );
  }, [searchParams]);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
      <div className="relative flex-1 w-full">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none">
          <Search className="h-full w-full" />
        </div>
        <div className="w-full p-[3px]">
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <div className="w-full sm:w-[180px] p-[3px]">
          <Select value={completionStatus} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All activities</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

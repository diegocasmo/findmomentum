import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type ActivityTab = "active" | "completed";

export function useActivityTab() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const currentTab = (searchParams.get("tab") as ActivityTab) || "active";

  const setActivityTab = useCallback(
    (tab: ActivityTab) => {
      router.push(`/dashboard?${createQueryString("tab", tab)}`, {
        scroll: false,
      });
    },
    [router, createQueryString]
  );

  return {
    currentTab,
    setActivityTab,
  };
}

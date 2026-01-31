"use client";

import { useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { ActionResult } from "@/types";

type Options = {
  onSuccess?: () => void;
  errorMessage?: string;
  skipRefresh?: boolean;
};

export function useOptimisticAction<T>(initialValue: T) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useOptimistic(initialValue);

  const execute = (
    newValue: T,
    action: () => Promise<ActionResult<unknown>>,
    options?: Options
  ) => {
    startTransition(async () => {
      setOptimisticValue(newValue);
      try {
        const result = await action();
        if (result.success) {
          options?.onSuccess?.();
          if (!options?.skipRefresh) {
            router.refresh();
          }
        } else {
          toast({
            title: "Error",
            description:
              options?.errorMessage || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Error",
          description:
            options?.errorMessage || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    });
  };

  return { value: optimisticValue, isPending, execute };
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useReturnUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const returnUrl = useMemo(() => {
    const currentParams = new URLSearchParams(searchParams);
    const fullPath = `${pathname}${
      currentParams.toString() ? `?${currentParams.toString()}` : ""
    }`;
    return encodeURIComponent(fullPath);
  }, [pathname, searchParams]);

  return returnUrl;
}

import { usePathname, useSearchParams } from "next/navigation";

export function usePreviousUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createReturnUrl = () => {
    const currentParams = new URLSearchParams(searchParams);
    const fullPath = `${pathname}${
      currentParams.toString() ? `?${currentParams.toString()}` : ""
    }`;
    return encodeURIComponent(fullPath);
  };

  return { createReturnUrl };
}

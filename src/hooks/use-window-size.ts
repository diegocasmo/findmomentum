import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export function useWindowSize({
  initialWidth = Infinity,
  initialHeight = Infinity,
}: {
  initialWidth?: number;
  initialHeight?: number;
} = {}) {
  const [size, setSize] = useState({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (!isBrowser) return;

    let frameId: number;

    const handleResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setSize({ width, height });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return size;
}

"use client";

import { useState, useEffect, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckSquare,
  FileText,
  ActivityIcon,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the icons we'll support
const ICONS: Record<string, LucideIcon> = {
  "check-square": CheckSquare,
  "file-text": FileText,
  activity: ActivityIcon,
  star: Star,
};

interface CollapsibleSectionProps {
  id: string;
  title: string;
  description?: string;
  iconName?: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  titleClassName?: string;
}

export function CollapsibleSection({
  id,
  title,
  description,
  iconName,
  children,
  defaultExpanded = true,
  titleClassName,
}: CollapsibleSectionProps) {
  const storageKey = `section-collapsed-${id}`;

  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      return stored !== null ? stored === "true" : defaultExpanded;
    }
    return defaultExpanded;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, isExpanded.toString());
  }, [isExpanded, storageKey]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const IconComponent = iconName ? ICONS[iconName] : null;

  return (
    <div className="space-y-4">
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={toggleExpanded}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
      >
        <div className="flex items-center">
          {IconComponent && (
            <IconComponent className="w-5 h-5 mr-2 text-primary" />
          )}
          <h2 className={cn("text-xl font-semibold", titleClassName)}>
            {title}
          </h2>
          {description ? (
            <span className="ml-2 text-sm text-muted-foreground">
              {description}
            </span>
          ) : null}
        </div>
        <div className="text-muted-foreground transition-transform">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-200 overflow-hidden",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

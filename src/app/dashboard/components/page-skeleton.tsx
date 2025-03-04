import { Home, CheckSquare, FileText, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold flex items-center mb-2 sm:mb-0">
        <Home className="w-6 h-6 md:w-8 md:h-8 mr-2 text-primary" />
        Home
      </h1>

      {/* Year-to-date activity completion section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-medium">
              Year-to-date activity completion
            </h2>
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
        <div>
          <div className="space-y-2 w-full">
            <div className="flex justify-end mb-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-muted" />
                <div className="h-3 w-3 rounded-sm bg-muted/80" />
                <div className="h-3 w-3 rounded-sm bg-muted/60" />
                <div className="h-3 w-3 rounded-sm bg-muted/40" />
                <div className="h-3 w-3 rounded-sm bg-muted/20" />
              </div>
            </div>
            <div className="overflow-x-auto w-full">
              <div className="min-w-[750px] h-[120px]">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top templates section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-medium">Top templates</h2>
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Activities section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-medium">Activities</h2>
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
        <div>
          <ul className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <li key={index}>
                <ActivityCardSkeleton />
              </li>
            ))}
          </ul>

          {/* Pagination skeleton */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Skeleton className="h-9 w-9 rounded-md" /> {/* Previous button */}
            <div className="flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-md" />
              ))}
            </div>
            <Skeleton className="h-9 w-9 rounded-md" /> {/* Next button */}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        <div className="flex items-center">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-2 bg-muted/50 min-h-[2.5rem]">
        <div className="flex items-center">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardFooter>
    </Card>
  );
}

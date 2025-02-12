import { ActivityIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <ActivityIcon className="w-8 h-8 mr-2 text-primary" />
          Recent Activities
        </h1>
      </div>
      <ul className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <li key={index}>
            <ActivityCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-4 w-2/3 mt-2" />
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
}

import { CreateActivityModal } from "@/components/create-activity-modal";
import { ActivityIcon } from "lucide-react";

import { ActivitiesList } from "@/components/activities-list";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <ActivityIcon className="w-8 h-8 mr-2 text-primary" />
          Recent Activities
        </h1>
        <CreateActivityModal />
      </div>
      <ActivitiesList activities={[]} />
    </div>
  );
}

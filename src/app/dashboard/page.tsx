import { redirect } from "next/navigation";
import { getActivities } from "@/lib/services/get-activities";
import { auth } from "@/lib/auth";
import { ActivityIcon } from "lucide-react";
import { ActivitiesList } from "@/components/activities-list";

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const activities = await getActivities({ userId });

  return (
    <div className="space-y-8">
      <div className="flex justify-beeween items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <ActivityIcon className="w-8 h-8 mr-2 text-primary" />
          Recent Activities
        </h1>
      </div>
      <ActivitiesList activities={activities} />
    </div>
  );
}

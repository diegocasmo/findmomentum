import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getActivity } from "@/lib/services/get-activity";

export default async function ActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const activity = await getActivity({ id: params.id, userId });

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{activity.name}</h1>
      <p className="text-gray-600 mb-4">{activity.description}</p>
    </div>
  );
}

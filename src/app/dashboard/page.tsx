import { CreateActivityModal } from "@/components/create-activity-modal";

export default async function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <CreateActivityModal />
    </div>
  );
}

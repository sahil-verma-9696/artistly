import { ManagerDashboard } from "@/components/dashboard/manager-dashboard";

export const metadata = {
  title: "Manager Dashboard - Artistly",
  description: "Manage your artists and booking requests on Artistly platform.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerDashboard />
    </div>
  );
}

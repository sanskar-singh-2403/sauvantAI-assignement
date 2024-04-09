import { UserDashboard } from "@/components/user-dashboard";

const DashboardPage = () => {
  const user = {
    role: "user",
  };
  return (
    <div>
      {user.role === "user" ? <UserDashboard /> : <h1>Admin Dashboard</h1>}
    </div>
  );
};

export default DashboardPage;

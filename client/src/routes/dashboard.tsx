import { useAuth } from "@clerk/clerk-react";

const DashboardPage = () => {
    const {getToken}=useAuth();
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage
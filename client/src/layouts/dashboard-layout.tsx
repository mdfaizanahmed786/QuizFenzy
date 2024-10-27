import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <Outlet />;
};

export default DashboardLayout;

import { useState } from "react";
import { useUser } from "@/contexts/user-context";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

export default function Index() {
  const { userData } = useUser();
  const [showDashboard, setShowDashboard] = useState(false);

  // Check if user should go directly to dashboard
  const shouldShowDashboard = showDashboard || (userData.tier && userData.role && userData.objective);

  if (shouldShowDashboard) {
    return <Dashboard />;
  }

  return <Landing onGetStarted={() => setShowDashboard(true)} />;
}
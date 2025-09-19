import { useState } from "react";
import { useUser } from "@/contexts/user-context";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

export default function Index() {
  const { userData } = useUser();
  const [showDashboard, setShowDashboard] = useState(false);

  // Only show dashboard if explicitly requested by user clicking Get Started
  if (showDashboard) {
    return <Dashboard />;
  }

  return <Landing onGetStarted={() => setShowDashboard(true)} />;
}
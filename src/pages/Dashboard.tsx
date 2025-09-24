import { useUser } from "@/contexts/user-context";
import ExecutiveDashboard from "@/components/dashboard/executive-dashboard";
import AuthRouteGuard from "@/components/auth/auth-route-guard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { userData } = useUser();
  const navigate = useNavigate();

  const handleUpgrade = (tier: string) => {
    // Navigate to payment flow with selected tier
    navigate('/', { state: { selectedTier: tier } });
  };

  return (
    <AuthRouteGuard requireAuth={true} requireOnboarding={true}>
      <ExecutiveDashboard
        userRole={userData.role || 'executive'}
        userObjective={userData.objective || 'Improve leadership effectiveness'}
        tier={userData.tier || 'trial'}
        onUpgrade={handleUpgrade}
      />
    </AuthRouteGuard>
  );
}
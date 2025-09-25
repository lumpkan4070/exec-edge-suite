import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useUser } from "@/contexts/user-context";

export default function DemoBanner() {
  const { userData } = useUser();

  if (!userData.isDemoAccount) {
    return null;
  }

  return (
    <Alert className="mb-6 border-emerald-200 bg-emerald-50">
      <Info className="h-4 w-4 text-emerald-600" />
      <AlertDescription className="text-emerald-800">
        <strong>Demo Mode Active:</strong> You have full access to all features without payment.
        This account is for Apple App Store review purposes only.
      </AlertDescription>
    </Alert>
  );
}
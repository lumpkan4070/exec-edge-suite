import { useUser } from "@/contexts/user-context";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";

export default function TrialBanner() {
  const { userData, getTrialDaysRemaining, user } = useUser();
  
  // Don't show banner if user is authenticated or not in trial
  if (user || !userData.isGuest || !userData.trialStartDate) return null;

  const daysRemaining = getTrialDaysRemaining();
  
  if (daysRemaining === 0) return null; // Trial expired, handled elsewhere

  return (
    <Card className="mx-4 mb-4 p-4 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Free Trial Active
            </h3>
            <p className="text-sm text-muted-foreground">
              No sign-up required until day 3
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <Clock className="h-4 w-4 text-primary" />
          <div>
            <div className="font-bold text-primary">
              {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
            </div>
            <div className="text-xs text-muted-foreground">
              in your trial
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
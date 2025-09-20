import { useUser } from "@/contexts/user-context";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";
import { useMemo } from "react";

export default function TrialBanner() {
  const { userData, user } = useUser();
  
  // Don't show banner if user is authenticated or not in trial
  if (user || !userData.isGuest || !userData.trialStartDate) return null;

  const timeRemaining = useMemo(() => {
    if (!userData.trialStartDate) return null;
    const startDate = new Date(userData.trialStartDate);
    const currentDate = new Date();
    const hoursElapsed = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 72 - hoursElapsed);
    
    if (hoursRemaining <= 0) return null;
    
    const days = Math.floor(hoursRemaining / 24);
    const hours = Math.floor(hoursRemaining % 24);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ${hours}h`;
    } else {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
  }, [userData.trialStartDate]);
  
  if (!timeRemaining) return null;

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
              {timeRemaining} left
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
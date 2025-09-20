import { useUser } from "@/contexts/user-context";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function TrialNotifications() {
  const { userData, getTrialDaysRemaining, user } = useUser();
  const { toast } = useToast();
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [lastNotificationDay, setLastNotificationDay] = useState<number | null>(null);
  
  // Don't show if user is authenticated
  if (user || !userData.isGuest || !userData.trialStartDate) return null;

  const daysRemaining = getTrialDaysRemaining();

  // Show welcome message once on trial start
  useEffect(() => {
    if (userData.trialStartDate && !hasShownWelcome) {
      toast({
        title: "🎉 Welcome to Your 3-Day Free Trial!",
        description: "Enjoy full access. No sign-up required until day 3.",
        duration: 6000,
      });
      setHasShownWelcome(true);
      localStorage.setItem('apex_welcome_shown', 'true');
    }
  }, [userData.trialStartDate, hasShownWelcome, toast]);

  // Show daily reminders
  useEffect(() => {
    const welcomeShown = localStorage.getItem('apex_welcome_shown');
    if (welcomeShown) setHasShownWelcome(true);

    if (userData.trialStartDate && lastNotificationDay !== daysRemaining) {
      if (daysRemaining === 2) {
        toast({
          title: "⏰ Trial Day 2",
          description: "2 days left in your free trial. Enjoying the experience?",
          duration: 5000,
        });
      } else if (daysRemaining === 1) {
        toast({
          title: "🚨 Final Day of Trial",
          description: "Create your account today to continue your executive development!",
          duration: 8000,
        });
      }
      setLastNotificationDay(daysRemaining);
    }
  }, [daysRemaining, lastNotificationDay, userData.trialStartDate, toast]);

  return null; // This component only handles notifications
}
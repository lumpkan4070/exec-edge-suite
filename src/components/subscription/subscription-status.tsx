import { useState } from "react";
import { Calendar, Crown, ExternalLink, RefreshCw, CheckCircle, Clock } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/user-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function SubscriptionStatus() {
  const { userData, user, checkSubscription, hasActiveAccess, getTrialDaysRemaining } = useUser();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  const handleRefreshSubscription = async () => {
    setIsRefreshing(true);
    await checkSubscription();
    setTimeout(() => setIsRefreshing(false), 1000);
    toast.success("Subscription status updated");
  };

  const handleManageSubscription = async () => {
    if (!user) {
      toast.error("Please sign in to manage your subscription");
      return;
    }

    setIsOpeningPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) {
        throw new Error(error.message);
      }
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error("Unable to open subscription management. Please try again.");
    } finally {
      setIsOpeningPortal(false);
    }
  };

  const getStatusBadge = () => {
    if (userData.subscribed && userData.subscriptionStatus === 'active') {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active Subscription</Badge>;
    }
    if (userData.subscriptionStatus === 'trialing') {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Free Trial</Badge>;
    }
    if (userData.isGuest && userData.trialStartDate && hasActiveAccess()) {
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Guest Trial</Badge>;
    }
    return <Badge variant="outline">No Active Subscription</Badge>;
  };

  const getAccessInfo = () => {
    if (userData.subscribed && userData.subscriptionStatus === 'active') {
      const endDate = userData.subscriptionEnd ? new Date(userData.subscriptionEnd).toLocaleDateString() : 'Unknown';
      return {
        icon: Crown,
        title: "Premium Access",
        description: `Full access to all features until ${endDate}`,
        color: "text-green-600"
      };
    }
    
    if (userData.subscriptionStatus === 'trialing') {
      const endDate = userData.subscriptionEnd ? new Date(userData.subscriptionEnd).toLocaleDateString() : 'Unknown';
      return {
        icon: Clock,
        title: "Trial Period",
        description: `Full access until ${endDate}`,
        color: "text-blue-600"
      };
    }
    
    if (userData.isGuest && userData.trialStartDate && hasActiveAccess()) {
      const daysRemaining = getTrialDaysRemaining();
      return {
        icon: Clock,
        title: "Guest Trial",
        description: `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} remaining`,
        color: "text-amber-600"
      };
    }
    
    return {
      icon: Calendar,
      title: "No Active Access",
      description: "Subscribe to access all features",
      color: "text-slate-600"
    };
  };

  const accessInfo = getAccessInfo();
  const AccessIcon = accessInfo.icon;

  return (
    <Card className="p-6 border-2 border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 font-playfair mb-2">
            Subscription Status
          </h3>
          {getStatusBadge()}
        </div>
        <ExecutiveButton
          onClick={handleRefreshSubscription}
          variant="outline"
          size="sm"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </ExecutiveButton>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className={`w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center ${accessInfo.color}`}>
          <AccessIcon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 font-playfair">{accessInfo.title}</h4>
          <p className="text-sm text-slate-600 font-lato">{accessInfo.description}</p>
        </div>
      </div>

      {hasActiveAccess() && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800 font-playfair">Full Access Granted</span>
          </div>
          <p className="text-sm text-green-700 mt-1 font-lato">
            You have access to all APEX Executive features and training modules.
          </p>
        </div>
      )}

      {user && userData.subscribed && (
        <ExecutiveButton
          onClick={handleManageSubscription}
          variant="outline"
          disabled={isOpeningPortal}
          className="w-full"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {isOpeningPortal ? "Opening..." : "Manage Subscription"}
        </ExecutiveButton>
      )}
    </Card>
  );
}
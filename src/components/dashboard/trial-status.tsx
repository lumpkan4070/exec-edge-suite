import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';

interface TrialStatusProps {
  onUpgrade?: () => void;
  onCancel?: () => void;
}

export function TrialStatus({ onUpgrade, onCancel }: TrialStatusProps) {
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    checkSubscriptionStatus();
    // Update time remaining every minute
    const interval = setInterval(updateTimeRemaining, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      
      setSubscriptionData(data);
      if (data?.trial_end) {
        updateTimeRemaining(data.trial_end);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeRemaining = (trialEnd?: string) => {
    if (!trialEnd && !subscriptionData?.trial_end) return;
    
    const endDate = new Date(trialEnd || subscriptionData.trial_end);
    const now = new Date();
    const timeLeft = endDate.getTime() - now.getTime();
    
    if (timeLeft <= 0) {
      setTimeRemaining("Trial ended");
      return;
    }
    
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    
    if (days > 0) {
      setTimeRemaining(`${days}d ${hours}h remaining`);
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}m remaining`);
    } else {
      setTimeRemaining(`${minutes}m remaining`);
    }
  };

  const handleCancelTrial = async () => {
    if (!subscriptionData?.subscription_id) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: subscriptionData.subscription_id }
      });
      
      if (error) throw error;
      
      // Refresh subscription status
      checkSubscriptionStatus();
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show if user has an active trial
  if (subscriptionData?.status === "trialing") {
    const isLastDay = timeRemaining.includes("h") && !timeRemaining.includes("d");
    
    return (
      <Card className={`border-2 ${isLastDay ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Free Trial Active</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {subscriptionData.plan_name || "Pro Plan"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Time remaining:</span>
            <span className={`font-bold ${isLastDay ? 'text-amber-600' : 'text-blue-600'}`}>
              {timeRemaining}
            </span>
          </div>
          
          {isLastDay && (
            <div className="flex items-center space-x-2 p-3 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800">
                Your trial ends soon! You'll be charged ${subscriptionData.amount / 100}/month starting tomorrow.
              </span>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mb-4">
            After your trial ends, you'll be automatically charged ${subscriptionData.amount / 100}/month. 
            Cancel anytime before then to avoid charges.
          </div>
          
          <div className="flex space-x-2">
            {onUpgrade && (
              <Button 
                onClick={onUpgrade}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleCancelTrial}
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
            >
              Cancel Trial
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show if user has paid subscription
  if (subscriptionData?.status === "active") {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Active Subscription</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {subscriptionData.plan_name || "Pro Plan"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Next billing: {new Date(subscriptionData.current_period_end).toLocaleDateString()}
            <br />
            Amount: ${subscriptionData.amount / 100}/month
          </div>
        </CardContent>
      </Card>
    );
  }

  // No subscription found
  return null;
}
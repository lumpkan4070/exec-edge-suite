import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, Trash2, ArrowLeft, Crown, CreditCard } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/user-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import apexLogo from "@/assets/apex-logo-final-new.png";
import SubscriptionStatus from "@/components/subscription/subscription-status";

export default function Settings() {
  const navigate = useNavigate();
  const { user, userData, signOut } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase.functions.invoke('delete-account', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      toast.success("Account deleted successfully");
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsManaging(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error("Unable to open subscription management. Please try again.");
    } finally {
      setIsManaging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-6 h-6 text-muted-foreground" />
            </button>
            <img src={apexLogo} alt="APEX Executive" className="h-8 w-auto mr-4" />
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Account Information */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Account Information</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium text-foreground capitalize">{userData.role || 'Executive'}</p>
                </div>
              </div>
            </div>

            {userData.tier && (
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-medium text-foreground capitalize">{userData.tier}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Subscription Management */}
        <SubscriptionStatus />

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <CreditCard className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Subscription Management</h2>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Manage your subscription, payment methods, and billing information.
            </p>

            <ExecutiveButton
              variant="outline"
              onClick={handleManageSubscription}
              disabled={isManaging}
              className="w-full"
            >
              {isManaging ? "Opening..." : "Manage Subscription"}
            </ExecutiveButton>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/50">
          <div className="flex items-center space-x-3 mb-6">
            <Trash2 className="w-6 h-6 text-destructive" />
            <h2 className="text-xl font-bold text-destructive">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Once you delete your account, there is no going back. This action will:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Permanently delete your account and all associated data</li>
              <li>Cancel any active subscriptions</li>
              <li>Remove all your progress and achievements</li>
              <li>Delete all saved scenarios and preferences</li>
            </ul>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <ExecutiveButton
                  variant="destructive"
                  className="w-full"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account
                </ExecutiveButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to permanently delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All your data, progress, and subscriptions will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </div>
  );
}

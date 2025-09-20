import { useState } from "react";
import { useUser } from "@/contexts/user-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Card } from "@/components/ui/card";
import { Clock, Crown, CheckCircle } from "lucide-react";
import AuthModal from "@/components/auth/auth-modal";

export default function TrialExpiredModal() {
  const { hasTrialExpired, userData, user } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const isOpen = hasTrialExpired && userData.isGuest && !user;

  const handleSignUp = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} modal>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto p-3 rounded-full bg-primary/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              Your Trial Has Expired
            </DialogTitle>
            <p className="text-muted-foreground">
              You've experienced 3 days of APEX EXECUTIVE. Create your account to continue your executive development journey.
            </p>
          </DialogHeader>

          <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>All your trial progress will be saved</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Continue with your selected tier and objectives</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Access to premium features and AI coaching</span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <ExecutiveButton onClick={handleSignUp} className="w-full">
              <Crown className="h-4 w-4 mr-2" />
              Create Your Account
            </ExecutiveButton>
            <p className="text-xs text-center text-muted-foreground">
              Join thousands of executives transforming their leadership
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
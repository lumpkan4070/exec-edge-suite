import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/user-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExecutiveButton } from '@/components/ui/executive-button';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle, UserCheck } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import apexLogo from '@/assets/apex-logo-final-new.png';

interface AuthRouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}

export default function AuthRouteGuard({ 
  children, 
  requireAuth = false, 
  requireOnboarding = false 
}: AuthRouteGuardProps) {
  const { user, session, userData } = useUser();
  const navigate = useNavigate();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [profileStatus, setProfileStatus] = useState<'checking' | 'missing' | 'incomplete' | 'complete'>('checking');

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user || !session) {
        if (requireAuth) {
          navigate('/auth');
          return;
        }
        setCheckingProfile(false);
        return;
      }

      // User is authenticated, check profile status
      try {
        const hasRole = userData.role && userData.role !== '';
        const hasTier = userData.tier && userData.tier !== '';
        
        // Demo account should always have complete status
        if (userData.isDemoAccount || user.email === 'demo@apexexecutive.com') {
          setProfileStatus('complete');
        } else if (!hasRole || !hasTier) {
          setProfileStatus('incomplete');
        } else {
          setProfileStatus('complete');
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        setProfileStatus('missing');
      } finally {
        setCheckingProfile(false);
      }
    };

    checkUserProfile();
  }, [user, session, userData, requireAuth, navigate]);

  // Show loading spinner while checking authentication
  if (checkingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="executive-card p-8 text-center max-w-md">
          <img src={apexLogo} alt="APEX Executive" className="h-12 w-auto mx-auto mb-6" />
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-electric" />
          <h2 className="text-lg font-semibold text-foreground mb-2">Loading...</h2>
          <p className="text-muted-foreground">Checking your account status</p>
        </Card>
      </div>
    );
  }

  // User needs authentication
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="executive-card p-8 text-center max-w-md">
          <img src={apexLogo} alt="APEX Executive" className="h-12 w-auto mx-auto mb-6" />
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to sign in to access this feature.
          </p>
          <div className="space-y-3">
            <ExecutiveButton onClick={() => navigate('/auth')} className="w-full">
              Sign In
            </ExecutiveButton>
            <ExecutiveButton 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Back to Home
            </ExecutiveButton>
          </div>
        </Card>
      </div>
    );
  }

  // User needs onboarding
  if (requireOnboarding && user && (profileStatus === 'missing' || profileStatus === 'incomplete')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="executive-card p-8 text-center max-w-md">
          <img src={apexLogo} alt="APEX Executive" className="h-12 w-auto mx-auto mb-6" />
          <UserCheck className="w-12 h-12 text-electric mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-4">Complete Your Setup</h2>
          <p className="text-muted-foreground mb-6">
            Please complete your profile setup to access the dashboard.
          </p>
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              This will only take 2 minutes and personalizes your entire experience.
            </AlertDescription>
          </Alert>
          <div className="space-y-3">
            <ExecutiveButton onClick={() => navigate('/onboarding')} className="w-full">
              Complete Setup
            </ExecutiveButton>
            <ExecutiveButton 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Back to Home
            </ExecutiveButton>
          </div>
        </Card>
      </div>
    );
  }

  // All checks passed, render children
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
import React from 'react';
import { useUser } from '@/contexts/user-context';
import { ExecutiveButton } from '@/components/ui/executive-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Clock } from "lucide-react";
import apexLogo from '@/assets/apex-logo-transparent.png';

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, userData, startTrial, hasTrialExpired } = useUser();

  // Allow access if user is authenticated, has trial access, or trial hasn't expired
  if (user || (userData.userId && !hasTrialExpired)) {
    return <>{children}</>;
  }

  // Show welcome screen with option to continue as guest
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src={apexLogo} 
              alt="APEX EXECUTIVE" 
              className="h-16 w-auto"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Welcome to APEX EXECUTIVE
            </CardTitle>
            <p className="text-white/80">
              Unlock your executive potential with AI-powered coaching and strategic insights.
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Card className="p-4 bg-white/5 border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">3-Day Free Trial</span>
            </div>
            <p className="text-sm text-white/80 text-left">
              Experience the full platform with no sign-up required until day 3.
            </p>
          </Card>
          
          <ExecutiveButton 
            onClick={startTrial}
            className="w-full"
          >
            <Clock className="h-4 w-4 mr-2" />
            Start Free Trial
          </ExecutiveButton>
          
          <div className="text-center">
            <p className="text-sm text-white/60">
              All your progress will be saved when you create an account
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
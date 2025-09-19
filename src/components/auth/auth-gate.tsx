import React from 'react';
import { useUser } from '@/contexts/user-context';
import { ExecutiveButton } from '@/components/ui/executive-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apexLogo from '@/assets/apex-logo.png';

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, userData, continueAsGuest } = useUser();

  // If user is authenticated or is a guest, show the app
  if (user || userData.userId) {
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
          <ExecutiveButton 
            onClick={continueAsGuest}
            className="w-full"
          >
            Continue Without Account
          </ExecutiveButton>
          
          <div className="text-center">
            <p className="text-sm text-white/60">
              Get started instantly. Create an account later to sync across devices.
            </p>
          </div>
          
          <div className="pt-4 border-t border-white/20">
            <p className="text-xs text-white/50 text-center">
              Phase 1: Guest access with local storage<br/>
              Coming soon: Account creation & cloud sync
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/user-context';
import { useToast } from '@/hooks/use-toast';
import { ExecutiveButton } from '@/components/ui/executive-button';

export const DemoToggle = () => {
  const [isLogging, setIsLogging] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleDemoLogin = async () => {
    setIsLogging(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@apexexecutive.com',
        password: 'AppleReview2024!',
      });

      if (error) {
        toast({
          title: "Demo Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Demo Mode Activated",
          description: "You now have full access to all features.",
        });
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Demo login error:', err);
      toast({
        title: "Error",
        description: "Failed to activate demo mode.",
        variant: "destructive"
      });
    } finally {
      setIsLogging(false);
    }
  };

  const handleGiveFullAccess = async () => {
    if (!user) return;
    
    setIsLogging(true);
    try {
      // Force reload to dashboard with full access
      toast({
        title: "Full Access Granted",
        description: "You now have access to all features for testing. Redirecting...",
      });
      
      // Small delay then redirect
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err) {
      console.error('Access grant error:', err);
      toast({
        title: "Error",
        description: "Failed to grant access.",
        variant: "destructive"
      });
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg">
      <div className="text-xs text-slate-600 mb-2 font-medium">Testing Options:</div>
      <div className="space-y-2">
        <ExecutiveButton
          onClick={handleDemoLogin}
          disabled={isLogging}
          className="w-full text-sm py-2"
          variant="outline"
        >
          {isLogging ? 'Logging in...' : 'Use Demo Account'}
        </ExecutiveButton>
        
        {user && (
          <ExecutiveButton
            onClick={handleGiveFullAccess}
            disabled={isLogging}
            className="w-full text-sm py-2"
          >
            {isLogging ? 'Granting...' : 'Grant Full Access'}
          </ExecutiveButton>
        )}
      </div>
      <div className="text-xs text-slate-500 mt-2">
        Demo: demo@apexexecutive.com
      </div>
    </div>
  );
};
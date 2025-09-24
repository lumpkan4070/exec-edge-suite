import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: name
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Account created! 🎉",
          description: "Please check your email to verify your account, then sign in.",
        });
        
        // Switch to sign in mode after successful signup
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setName("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back! 👋",
          description: "You're now signed in.",
        });
        
        // Only call onSuccess for sign in (when user is actually authenticated)
        onSuccess();
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin_oidc' | 'apple') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during social login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="executive-card max-w-md w-full p-8 shadow-2xl" role="dialog" aria-labelledby="auth-modal-title" aria-modal="true">
        <div className="text-center mb-6">
          <h2 id="auth-modal-title" className="text-2xl font-bold text-foreground mb-2">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-muted-foreground">
            {isSignUp 
              ? "Join APEX to unlock your executive potential" 
              : "Welcome back to your executive journey"
            }
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 disabled:opacity-50"
            aria-label="Sign in with Apple"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.017 1.5c-.2 0-.393.009-.583.024-1.27.105-2.46.68-3.297 1.578-.75.8-1.406 1.95-1.235 3.1.034.268.063.337.181.337.086 0 .215-.034.329-.069 1.235-.378 2.342-.034 3.197.68.615.515.993 1.235 1.146 1.985.119.588.034 1.14-.181 1.664-.017.043-.034.086-.051.129-.069.163-.138.326-.163.523-.069.515.034 1.03.309 1.476.241.394.583.714.993.93.394.206.837.309 1.287.309.446 0 .898-.103 1.287-.309.41-.216.752-.536.993-.93.275-.446.378-.961.309-1.476-.025-.197-.094-.36-.163-.523-.017-.043-.034-.086-.051-.129-.215-.524-.3-1.076-.181-1.664.153-.75.531-1.47 1.146-1.985.855-.714 1.962-1.058 3.197-.68.114.035.243.069.329.069.118 0 .147-.069.181-.337.171-1.15-.485-2.3-1.235-3.1-.837-.898-2.027-1.473-3.297-1.578-.19-.015-.383-.024-.583-.024z"/>
            </svg>
            <span className="text-sm font-medium">Continue with Apple</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 disabled:opacity-50"
            aria-label="Sign in with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('linkedin_oidc')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 disabled:opacity-50"
            aria-label="Sign in with LinkedIn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm font-medium">Continue with LinkedIn</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="executive-input pl-10"
                  placeholder="Enter your full name"
                  required={isSignUp}
                  autoComplete="name"
                  aria-describedby={isSignUp ? "name-help" : undefined}
                />
              </div>
              {isSignUp && (
                <p id="name-help" className="text-xs text-muted-foreground mt-1">
                  This will be displayed in your profile
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="executive-input pl-10"
                placeholder="Enter your email"
                required
                autoComplete="email"
                aria-describedby="email-help"
              />
            </div>
            <p id="email-help" className="text-xs text-muted-foreground mt-1">
              We'll use this to send you important updates
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="executive-input pl-10 pr-10"
                placeholder="Enter your password"
                required
                minLength={6}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                aria-describedby="password-help"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {isSignUp && (
              <p id="password-help" className="text-xs text-muted-foreground mt-1">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          <ExecutiveButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </ExecutiveButton>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-electric hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 rounded"
          >
            {isSignUp 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 rounded"
            aria-label="Close authentication modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
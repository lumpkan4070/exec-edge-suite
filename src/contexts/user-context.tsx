import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  tier?: string;
  role?: string;
  objective?: string;
  isGuest: boolean;
  userId?: string;
  trialStartDate?: string;
  trialUsed?: boolean;
  subscribed?: boolean;
  subscriptionStatus?: string;
  subscriptionEnd?: string;
}

interface UserContextType {
  user: User | null;
  session: Session | null;
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  continueAsGuest: () => void;
  signOut: () => Promise<void>;
  migrateGuestData: () => Promise<void>;
  startTrial: () => void;
  getTrialDaysRemaining: () => number;
  isTrialExpired: () => boolean;
  hasTrialExpired: boolean;
  checkSubscription: () => Promise<void>;
  hasActiveAccess: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserDataState] = useState<UserData>({
    isGuest: true
  });
  const [hasTrialExpired, setHasTrialExpired] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // User is authenticated, load their data from backend
          loadUserData(session.user.id);
          // Check subscription status for authenticated users
          setTimeout(() => checkSubscription(), 1000);
        } else if (event === 'SIGNED_OUT') {
          // Reset to guest mode on sign out
          setUserDataState({ isGuest: true });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserData(session.user.id);
        // Check subscription status for authenticated users
        setTimeout(() => checkSubscription(), 1000);
      } else {
        // Load guest data from localStorage
        loadGuestData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadGuestData = () => {
    const guestData = localStorage.getItem('apex_guest_data');
    const deviceTrialData = localStorage.getItem('apex_device_trial');
    
    if (guestData) {
      const parsed = JSON.parse(guestData);
      setUserDataState({ ...parsed, isGuest: true });
    }
    
    // Auto-restore trial if exists
    if (deviceTrialData) {
      const trialData = JSON.parse(deviceTrialData);
      setUserDataState(prev => ({ 
        ...prev, 
        trialStartDate: trialData.trialStartDate,
        trialUsed: true,
        userId: trialData.userId || prev.userId || crypto.randomUUID()
      }));
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      console.log('Loading user data for:', userId);
      
      // Use the safe function to get or create profile
      const { data: profileData, error } = await supabase
        .rpc('get_or_create_user_profile', { user_id_param: userId });

      if (error) {
        console.error('Error loading user profile:', error);
        // Fallback: try direct query
        const { data: directProfile, error: directError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
          
        if (directError) {
          console.error('Error with direct profile query:', directError);
          setUserDataState(prev => ({ ...prev, isGuest: false, userId }));
          return;
        }
        
        if (directProfile) {
          setUserDataState(prev => ({ 
            ...prev, 
            isGuest: false, 
            userId,
            role: directProfile.role,
            tier: directProfile.tier || 'trial'
          }));
        } else {
          console.log('No profile found, user needs onboarding');
          setUserDataState(prev => ({ ...prev, isGuest: false, userId }));
        }
        return;
      }

      if (profileData && profileData.length > 0) {
        const profile = profileData[0];
        console.log('Profile loaded successfully:', profile);
        setUserDataState(prev => ({ 
          ...prev, 
          isGuest: false, 
          userId,
          role: profile.role,
          tier: profile.tier || 'trial'
        }));
      } else {
        console.log('No profile data returned, user needs onboarding');
        setUserDataState(prev => ({ ...prev, isGuest: false, userId }));
      }
    } catch (error) {
      console.error('Error in loadUserData:', error);
      setUserDataState(prev => ({ ...prev, isGuest: false, userId }));
    }
  };

  const setUserData = (data: Partial<UserData>) => {
    const newUserData = { ...userData, ...data };
    setUserDataState(newUserData);
    
    if (newUserData.isGuest) {
      // Store guest data in localStorage
      localStorage.setItem('apex_guest_data', JSON.stringify(newUserData));
    }
    // TODO: For authenticated users, save to Supabase
  };

  const continueAsGuest = () => {
    const guestId = crypto.randomUUID();
    setUserData({ isGuest: true, userId: guestId });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // Clear guest data
    localStorage.removeItem('apex_guest_data');
    setUserDataState({ isGuest: true });
  };

  const startTrial = () => {
    const deviceTrialData = localStorage.getItem('apex_device_trial');
    if (deviceTrialData) {
      const parsed = JSON.parse(deviceTrialData);
      setUserData({ 
        isGuest: true, 
        trialStartDate: parsed.trialStartDate,
        trialUsed: true,
        userId: parsed.userId || crypto.randomUUID()
      });
    } else {
      const trialStartDate = new Date().toISOString();
      const userId = crypto.randomUUID();
      localStorage.setItem('apex_device_trial', JSON.stringify({ 
        trialStartDate, 
        userId,
        trialUsed: true 
      }));
      setUserData({ 
        isGuest: true, 
        trialStartDate,
        trialUsed: true,
        userId
      });
    }
  };

  const getTrialDaysRemaining = () => {
    if (!userData.trialStartDate) return 3;
    const startDate = new Date(userData.trialStartDate);
    const currentDate = new Date();
    const hoursElapsed = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 72 - hoursElapsed);
    return Math.ceil(hoursRemaining / 24); // Convert to days for display
  };

  const isTrialExpired = () => {
    if (!userData.trialStartDate) return false;
    const startDate = new Date(userData.trialStartDate);
    const currentDate = new Date();
    const hoursElapsed = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return hoursElapsed >= 72;
  };

  // Check trial expiration every minute
  useEffect(() => {
    const checkTrialExpiration = () => {
      if (userData.trialStartDate && userData.isGuest && !user) {
        const expired = isTrialExpired();
        setHasTrialExpired(expired);
      }
    };

    checkTrialExpiration();
    const interval = setInterval(checkTrialExpiration, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [userData.trialStartDate, userData.isGuest, user]);

  const migrateGuestData = async () => {
    if (!userData.isGuest || !user) return;
    
    const guestData = localStorage.getItem('apex_guest_data');
    if (guestData) {
      try {
        const parsed = JSON.parse(guestData);
        // Migrate guest data to user profile if they haven't completed onboarding
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!existingProfile && parsed.role) {
          // Complete onboarding with guest data
          await supabase.functions.invoke('user-onboarding', {
            body: {
              role: parsed.role,
              goals: parsed.objective ? [parsed.objective] : [],
              display_name: user.email?.split('@')[0]
            }
          });
        }
        
        localStorage.removeItem('apex_guest_data');
      } catch (error) {
        console.error('Error migrating guest data:', error);
      }
    }
  };

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }
      
      if (data) {
        setUserData({
          subscribed: data.subscribed || false,
          subscriptionStatus: data.status,
          subscriptionEnd: data.subscription_end,
          tier: data.product_id || userData.tier
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const hasActiveAccess = () => {
    // User has access if:
    // 1. They have an active subscription
    // 2. They have an active trial (authenticated or guest)
    // 3. They are in guest trial period
    
    if (userData.subscribed && userData.subscriptionStatus === 'active') {
      return true;
    }
    
    if (userData.subscriptionStatus === 'trialing') {
      return true;
    }
    
    if (userData.isGuest && userData.trialStartDate && !isTrialExpired()) {
      return true;
    }
    
    return false;
  };

  return (
    <UserContext.Provider value={{
      user,
      session,
      userData,
      setUserData,
      continueAsGuest,
      signOut,
      migrateGuestData,
      startTrial,
      getTrialDaysRemaining,
      isTrialExpired,
      hasTrialExpired,
      checkSubscription,
      hasActiveAccess
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
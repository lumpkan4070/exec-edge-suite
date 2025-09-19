import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  tier?: string;
  role?: string;
  objective?: string;
  isGuest: boolean;
  userId?: string;
}

interface UserContextType {
  user: User | null;
  session: Session | null;
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  continueAsGuest: () => void;
  signOut: () => Promise<void>;
  migrateGuestData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserDataState] = useState<UserData>({
    isGuest: true
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // User is authenticated, load their data from backend
          loadUserData(session.user.id);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        // Load guest data from localStorage
        loadGuestData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadGuestData = () => {
    const guestData = localStorage.getItem('apex_guest_data');
    if (guestData) {
      const parsed = JSON.parse(guestData);
      setUserDataState({ ...parsed, isGuest: true });
    }
  };

  const loadUserData = async (userId: string) => {
    // TODO: Load user data from Supabase when profiles table is created
    setUserDataState(prev => ({ ...prev, isGuest: false, userId }));
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

  const migrateGuestData = async () => {
    if (!userData.isGuest || !user) return;
    
    // TODO: Migrate guest data to authenticated user profile
    const guestData = localStorage.getItem('apex_guest_data');
    if (guestData) {
      // This will be implemented when we create the profiles table
      localStorage.removeItem('apex_guest_data');
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      session,
      userData,
      setUserData,
      continueAsGuest,
      signOut,
      migrateGuestData
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
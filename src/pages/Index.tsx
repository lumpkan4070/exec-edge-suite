import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/onboarding/welcome-screen";
import ObjectiveScreen from "@/components/onboarding/objective-screen";
import ExecutiveDashboard from "@/components/dashboard/executive-dashboard";
import StrategyCopilot from "@/components/ai-copilot/strategy-copilot";
import SubscriptionScreen from "@/components/subscription/subscription-screen";

type AppScreen = 'welcome' | 'objective' | 'dashboard' | 'ai-copilot' | 'subscription' | 'scenarios' | 'habits' | 'settings';

interface UserProfile {
  name: string;
  role: string;
  objective: string;
  subscription: 'trial' | 'pro' | 'executive';
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Executive",
    role: "",
    objective: "",
    subscription: 'trial'
  });

  // Check if user has completed onboarding
  useEffect(() => {
    const savedProfile = localStorage.getItem('executiveProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleRoleSelection = (role: string) => {
    setUserProfile(prev => ({ ...prev, role }));
    setCurrentScreen('objective');
  };

  const handleObjectiveComplete = (objective: string) => {
    const updatedProfile = { ...userProfile, objective };
    setUserProfile(updatedProfile);
    localStorage.setItem('executiveProfile', JSON.stringify(updatedProfile));
    setCurrentScreen('dashboard');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as AppScreen);
  };

  const handleSubscribe = (tier: string) => {
    const updatedProfile = { 
      ...userProfile, 
      subscription: tier as 'pro' | 'executive' 
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('executiveProfile', JSON.stringify(updatedProfile));
    setCurrentScreen('dashboard');
  };

  // Apply dark mode by default for executive aesthetic
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen onNext={handleRoleSelection} />;
    
    case 'objective':
      return <ObjectiveScreen role={userProfile.role} onComplete={handleObjectiveComplete} />;
    
    case 'dashboard':
      return (
        <ExecutiveDashboard
          userName={userProfile.name}
          role={userProfile.role}
          objective={userProfile.objective}
          onNavigate={handleNavigation}
        />
      );
    
    case 'ai-copilot':
      return (
        <StrategyCopilot
          onBack={() => setCurrentScreen('dashboard')}
          userRole={userProfile.role}
          userObjective={userProfile.objective}
        />
      );
    
    case 'subscription':
      return (
        <SubscriptionScreen
          onBack={() => setCurrentScreen('dashboard')}
          onSubscribe={handleSubscribe}
        />
      );
    
    default:
      return (
        <ExecutiveDashboard
          userName={userProfile.name}
          role={userProfile.role}
          objective={userProfile.objective}
          onNavigate={handleNavigation}
        />
      );
  }
};

export default Index;

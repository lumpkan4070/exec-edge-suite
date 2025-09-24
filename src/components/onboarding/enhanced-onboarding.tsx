import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExecutiveButton } from '@/components/ui/executive-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Users, TrendingUp, Brain, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/user-context';
import { useToast } from '@/hooks/use-toast';
import apexLogo from '@/assets/apex-logo-final-new.png';

interface OnboardingProps {
  onComplete: () => void;
}

const roles = [
  {
    id: 'executive',
    title: 'Executive Leader',
    description: 'C-suite, VP, Director driving organizational strategy',
    icon: Target,
    color: 'bg-blue-500'
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'Founder, startup leader building and scaling businesses',
    icon: TrendingUp,
    color: 'bg-green-500'
  },
  {
    id: 'sales-leader',
    title: 'Sales Leader',
    description: 'Sales manager, director driving revenue growth',
    icon: Users,
    color: 'bg-purple-500'
  }
];

const suggestedGoals = [
  'Improve decision-making speed and quality',
  'Build high-performing teams',
  'Enhance strategic thinking',
  'Increase productivity and focus',
  'Develop leadership presence',
  'Scale business operations',
  'Improve communication skills',
  'Build resilience and mindset',
  'Drive innovation and growth',
  'Optimize time management'
];

export default function EnhancedOnboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [customGoal, setCustomGoal] = useState('');
  
  const { user } = useUser();
  const { toast } = useToast();

  const totalSteps = 4;

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (!displayName && user?.email) {
      setDisplayName(user.email.split('@')[0]);
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const addCustomGoal = () => {
    if (customGoal.trim() && !selectedGoals.includes(customGoal.trim())) {
      setSelectedGoals(prev => [...prev, customGoal.trim()]);
      setCustomGoal('');
    }
  };

  const handleComplete = async () => {
    if (!selectedRole || selectedGoals.length === 0) {
      toast({
        title: "Please complete all steps",
        description: "Select a role and at least one goal to continue.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('user-onboarding', {
        body: {
          role: selectedRole,
          goals: selectedGoals,
          display_name: displayName || user?.email?.split('@')[0],
          preferences: {
            onboarding_completed: true,
            onboarding_date: new Date().toISOString()
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Welcome to APEX Executive! 🎯",
        description: "Your personalized dashboard is ready with starter habits.",
      });

      onComplete();
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: "Setup Error",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={apexLogo} alt="APEX Executive" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to APEX Executive</h1>
          <p className="text-muted-foreground">Let's personalize your executive performance journey</p>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i + 1 <= step ? 'bg-electric' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="executive-card p-8 text-center">
                <Brain className="w-16 h-16 text-electric mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Elite Performance Coaching at Your Fingertips
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">AI-powered strategy insights tailored to your role</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">Performance habits proven by top executives</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">Real-world scenario training and simulations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">Progress tracking and achievement system</span>
                  </div>
                </div>
                <ExecutiveButton onClick={nextStep} className="mt-8 w-full">
                  Let's Get Started
                </ExecutiveButton>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="executive-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  What's your primary role?
                </h2>
                <div className="grid gap-4">
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedRole === role.id
                            ? 'border-electric bg-electric/10'
                            : 'border-border hover:border-electric/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${role.color} flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                          {selectedRole === role.id && (
                            <CheckCircle className="w-6 h-6 text-electric" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-8">
                  <ExecutiveButton variant="outline" onClick={prevStep}>
                    Back
                  </ExecutiveButton>
                  <ExecutiveButton 
                    onClick={nextStep} 
                    disabled={!selectedRole}
                  >
                    Continue
                  </ExecutiveButton>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Name Input */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="executive-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  What should we call you?
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your preferred name"
                      className="mt-2"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is how you'll be addressed in the app and your personalized content.
                  </p>
                </div>
                <div className="flex justify-between mt-8">
                  <ExecutiveButton variant="outline" onClick={prevStep}>
                    Back
                  </ExecutiveButton>
                  <ExecutiveButton 
                    onClick={nextStep}
                    disabled={!displayName.trim()}
                  >
                    Continue
                  </ExecutiveButton>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Goals Selection */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="executive-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  What are your key objectives?
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  Select 2-4 goals to personalize your experience
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {suggestedGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedGoals.includes(goal)
                          ? 'border-electric bg-electric/10 text-foreground'
                          : 'border-border hover:border-electric/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{goal}</span>
                        {selectedGoals.includes(goal) && (
                          <CheckCircle className="w-4 h-4 text-electric" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Goal Input */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="customGoal">Add your own goal</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="customGoal"
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      placeholder="Enter a custom goal..."
                      onKeyPress={(e) => e.key === 'Enter' && addCustomGoal()}
                    />
                    <ExecutiveButton 
                      type="button" 
                      onClick={addCustomGoal}
                      disabled={!customGoal.trim()}
                    >
                      Add
                    </ExecutiveButton>
                  </div>
                </div>

                {/* Selected Goals */}
                {selectedGoals.length > 0 && (
                  <div className="mb-6">
                    <Label className="mb-2 block">Selected Goals ({selectedGoals.length})</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedGoals.map((goal) => (
                        <Badge 
                          key={goal} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => toggleGoal(goal)}
                        >
                          {goal} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <ExecutiveButton variant="outline" onClick={prevStep}>
                    Back
                  </ExecutiveButton>
                  <ExecutiveButton 
                    onClick={handleComplete}
                    disabled={selectedGoals.length === 0 || loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Setting up...</span>
                      </div>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Complete Setup
                      </>
                    )}
                  </ExecutiveButton>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
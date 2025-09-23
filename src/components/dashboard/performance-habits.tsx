import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Home, Zap, Target, Crown, Brain, Users, TrendingUp, Lightbulb, Eye, MessageSquare, Trophy, Award } from "lucide-react";
import { HabitCategory } from "./habit-category";
import { Habit } from "./types";
import { AchievementSystem, Achievement } from "./achievement-system";
import { AchievementNotification } from "./achievement-notification";
import { StreakTracker } from "./streak-tracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface PerformanceHabitsProps {
  onBack: () => void;
  onHome: () => void;
  userRole: string;
}

const microPrompts = {
  mindset: [
    "Ask yourself: What assumption might be wrong today?",
    "Visualize overcoming one challenge you'll face today.",
    "Practice the 5-4-3-2-1 grounding technique when stressed.",
    "Write down 3 things you're grateful for this morning.",
    "Spend 2 minutes breathing deeply before important meetings."
  ],
  strategic: [
    "Ask: What am I missing in this situation?",
    "Identify the one decision that could change everything today.",
    "Challenge yourself: What would I do with unlimited resources?",
    "Review yesterday's decisions - what would you do differently?",
    "Think 3 steps ahead in your current major project."
  ],
  leadership: [
    "State your next point in one sentence without qualifiers.",
    "Ask one team member: 'How can I better support you?'",
    "Practice active listening in your next conversation.",
    "Give specific, actionable feedback to someone today.",
    "Make one difficult decision without seeking approval."
  ]
};

const getRandomPrompt = (category: keyof typeof microPrompts): string => {
  const prompts = microPrompts[category];
  return prompts[Math.floor(Math.random() * prompts.length)];
};

const getHabitsForRole = (role: string): Habit[] => {
  const baseHabits: Habit[] = [
    // Mindset Habits
    {
      id: "morning-preparation",
      title: "Executive Preparation",
      actionStep: "Visualize 3 wins for today in 5 minutes",
      microPrompt: getRandomPrompt('mindset'),
      streak: 4,
      weeklyProgress: 2,
      completedToday: false,
      icon: Zap,
      category: 'mindset'
    },
    {
      id: "mindfulness-practice",
      title: "Mindful Leadership",
      actionStep: "Practice 5-minute focused breathing before key decisions",
      microPrompt: getRandomPrompt('mindset'),
      streak: 8,
      weeklyProgress: 3,
      completedToday: true,
      icon: Brain,
      category: 'mindset'
    },
    
    // Strategic Habits
    {
      id: "strategic-thinking",
      title: "Strategic Thinking",
      actionStep: "Ask 'What am I missing?' and record 1 insight",
      microPrompt: getRandomPrompt('strategic'),
      streak: 12,
      weeklyProgress: 3,
      completedToday: false,
      icon: Target,
      category: 'strategic'
    },
    {
      id: "market-analysis",
      title: "Market Intelligence",
      actionStep: "Identify one market trend that could impact your business",
      microPrompt: getRandomPrompt('strategic'),
      streak: 6,
      weeklyProgress: 4,
      completedToday: true,
      icon: TrendingUp,
      category: 'strategic'
    },
    
    // Leadership Habits
    {
      id: "authority-building",
      title: "Authority Building",
      actionStep: "Deliver 1 message with absolute clarity today",
      microPrompt: getRandomPrompt('leadership'),
      streak: 21,
      weeklyProgress: 5,
      completedToday: false,
      icon: Crown,
      category: 'leadership'
    },
    {
      id: "team-connection",
      title: "Team Connection",
      actionStep: "Have one meaningful conversation with a team member",
      microPrompt: getRandomPrompt('leadership'),
      streak: 15,
      weeklyProgress: 4,
      completedToday: true,
      icon: Users,
      category: 'leadership'
    }
  ];

  // Add role-specific habits
  if (role === "sales-leader") {
    baseHabits.push({
      id: "prospecting",
      title: "Strategic Prospecting",
      actionStep: "Identify and research 3 high-value prospects",
      microPrompt: "Focus on prospects who align with your ideal customer profile.",
      streak: 0,
      weeklyProgress: 0,
      completedToday: false,
      icon: Eye,
      category: 'strategic'
    });
  } else if (role === "entrepreneur") {
    baseHabits.push({
      id: "customer-insights",
      title: "Customer Discovery",
      actionStep: "Have one customer conversation or gather feedback",
      microPrompt: "Ask customers what they wish you knew about their challenges.",
      streak: 0,
      weeklyProgress: 0,
      completedToday: false,
      icon: MessageSquare,
      category: 'strategic'
    });
  } else if (role === "executive") {
    baseHabits.push({
      id: "innovation-thinking",
      title: "Innovation Catalyst",
      actionStep: "Spend 10 minutes thinking about process improvements",
      microPrompt: "Question one 'that's how we've always done it' assumption.",
      streak: 0,
      weeklyProgress: 0,
      completedToday: false,
      icon: Lightbulb,
      category: 'strategic'
    });
  }

  return baseHabits;
};

export default function PerformanceHabits({ onBack, onHome, userRole }: PerformanceHabitsProps) {
  const [habits, setHabits] = useState<Habit[]>(getHabitsForRole(userRole));
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const { toast } = useToast();

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            weeklyProgress: !habit.completedToday ? 
              Math.min(7, habit.weeklyProgress + 1) : 
              Math.max(0, habit.weeklyProgress - 1),
            microPrompt: !habit.completedToday ? 
              getRandomPrompt(habit.category) : 
              habit.microPrompt
          }
        : habit
    ));

    // Show completion toast
    const habit = habits.find(h => h.id === habitId);
    if (habit && !habit.completedToday) {
      toast({
        title: "Habit Completed! 🎉",
        description: `Great work on ${habit.title}. Keep building that streak!`,
        duration: 3000,
      });
    }
  };

  const handleAchievementUnlocked = (achievement: Achievement) => {
    setNewAchievement(achievement);
    toast({
      title: "Achievement Unlocked! 🏆",
      description: `${achievement.title} - ${achievement.description}`,
      duration: 5000,
    });
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  const completionRate = (completedToday / totalHabits) * 100;
  
  const mindsetHabits = habits.filter(h => h.category === 'mindset');
  const strategicHabits = habits.filter(h => h.category === 'strategic');
  const leadershipHabits = habits.filter(h => h.category === 'leadership');

  const totalBadges = habits.filter(h => h.streak >= 7).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Executive Habits</h1>
              <p className="text-muted-foreground font-medium">Mission-critical daily behaviors</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ExecutiveButton
              variant="ghost"
              size="sm"
              onClick={onHome}
              className="font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </ExecutiveButton>
            <div className="text-right">
              <div className="text-2xl font-bold text-electric">{completedToday}/{totalHabits}</div>
              <div className="text-sm text-muted-foreground">Completed Today</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-8 max-w-6xl mx-auto">
        {/* Progress Overview */}
        <div className="executive-card p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Daily Progress Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-electric">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Completed Today</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-500">{totalBadges}</div>
                <div className="text-sm text-muted-foreground">Active Badges</div>
              </div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-4 mb-3 shadow-inner">
            <div 
              className="confidence-meter h-4 transition-all duration-700 ease-out rounded-full shadow-sm"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-muted-foreground font-medium">
            Executive excellence is built through consistent daily actions across mindset, strategy, and leadership
          </p>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="habits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="habits" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Daily Habits</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="streaks" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Streak Tracker</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-6">
            {/* Habit Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">Performance Habits by Growth Pillar</h3>
              
              <HabitCategory
                title="Mindset Habits"
                color="blue-600"
                bgColor="bg-blue-50"
                habits={mindsetHabits}
                onToggleHabit={toggleHabit}
              />
              
              <HabitCategory
                title="Strategic Habits"
                color="purple-600"
                bgColor="bg-purple-50"
                habits={strategicHabits}
                onToggleHabit={toggleHabit}
              />
              
              <HabitCategory
                title="Leadership Habits"
                color="amber-600"
                bgColor="bg-amber-50"
                habits={leadershipHabits}
                onToggleHabit={toggleHabit}
              />
            </div>

            {/* Performance Insights */}
            <div className="executive-card p-6 shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-4">Executive Performance Insights</h3>
              <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Mindset Mastery</h4>
                  <p className="text-sm">Visualization and preparation habits increase decision confidence by 40%</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600">Strategic Edge</h4>
                  <p className="text-sm">Daily strategic thinking creates compound improvements in problem-solving</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-600">Leadership Impact</h4>
                  <p className="text-sm">Consistent communication habits build trust and drive team performance</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementSystem 
              habits={habits} 
              onAchievementUnlocked={handleAchievementUnlocked}
            />
          </TabsContent>

          <TabsContent value="streaks">
            <StreakTracker habits={habits} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Achievement Notification Modal */}
      <AchievementNotification 
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
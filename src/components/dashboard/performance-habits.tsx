import { useState, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, CheckCircle2, Circle, Zap, Target, Crown, Home } from "lucide-react";

interface Habit {
  id: string;
  title: string;
  description: string;
  streak: number;
  completedToday: boolean;
  icon: any;
}

interface PerformanceHabitsProps {
  onBack: () => void;
  onHome: () => void;
  userRole: string;
}

const getHabitsForRole = (role: string): Habit[] => {
  const baseHabits = [
    {
      id: "morning-preparation",
      title: "Executive Preparation",
      description: "5-minute morning success visualization",
      streak: 0,
      completedToday: false,
      icon: Zap
    },
    {
      id: "strategic-thinking",
      title: "Strategic Thinking",
      description: "Ask 'What am I missing?' daily",
      streak: 0,
      completedToday: false,
      icon: Target
    },
    {
      id: "authority-building",
      title: "Authority Building",
      description: "Practice decisive communication",
      streak: 0,
      completedToday: false,
      icon: Crown
    }
  ];

  // Add role-specific habits
  if (role === "sales-leader") {
    baseHabits.push({
      id: "prospecting",
      title: "Strategic Prospecting",
      description: "Identify 3 high-value prospects",
      streak: 0,
      completedToday: false,
      icon: Target
    });
  } else if (role === "entrepreneur") {
    baseHabits.push({
      id: "market-validation",
      title: "Market Validation",
      description: "One customer conversation daily",
      streak: 0,
      completedToday: false,
      icon: Zap
    });
  } else if (role === "executive") {
    baseHabits.push({
      id: "team-check",
      title: "Team Connection",
      description: "Meaningful team interaction",
      streak: 0,
      completedToday: false,
      icon: Crown
    });
  }

  return baseHabits;
};

export default function PerformanceHabits({ onBack, onHome, userRole }: PerformanceHabitsProps) {
  const [habits, setHabits] = useState<Habit[]>(getHabitsForRole(userRole));

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
          }
        : habit
    ));
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  const completionRate = (completedToday / totalHabits) * 100;

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
      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Progress Overview */}
        <div className="executive-card p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Today's Progress</h2>
            <span className="text-2xl font-bold text-electric">{Math.round(completionRate)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 mb-3 shadow-inner">
            <div 
              className="confidence-meter h-4 transition-all duration-700 ease-out rounded-full shadow-sm"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-muted-foreground font-medium">
            Executive excellence requires consistency in the fundamentals
          </p>
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Performance Habits</h3>
          {habits.map((habit) => {
            const Icon = habit.icon;
            return (
              <div
                key={habit.id}
                className="executive-card p-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className="flex-shrink-0 transition-all duration-200 hover:scale-110"
                    >
                      {habit.completedToday ? (
                        <CheckCircle2 className="w-8 h-8 text-electric" />
                      ) : (
                        <Circle className="w-8 h-8 text-muted-foreground hover:text-electric" />
                      )}
                    </button>
                    <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-electric" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{habit.title}</h4>
                      <p className="text-muted-foreground">{habit.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-electric">{habit.streak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Habit Insights */}
        <div className="executive-card p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">Executive Insights</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>• Executives who maintain 80%+ habit consistency perform 35% better in high-stakes situations</p>
            <p>• Morning preparation rituals increase confidence and decision-making speed throughout the day</p>
            <p>• Strategic thinking habits compound over time, creating exponential performance improvements</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
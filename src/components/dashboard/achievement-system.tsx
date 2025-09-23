import { useState, useEffect } from "react";
import { Trophy, Award, Star, Flame, Crown, Target, Zap, Medal, Shield, Diamond } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy;
  type: 'streak' | 'completion' | 'consistency' | 'milestone';
  requirement: number;
  progress: number;
  unlocked: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
  category?: 'mindset' | 'strategic' | 'leadership' | 'overall';
}

interface AchievementSystemProps {
  habits: any[];
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

export function AchievementSystem({ habits, onAchievementUnlocked }: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  // Define all possible achievements - Enhanced for WRD Phase 1
  const achievementDefinitions: Omit<Achievement, 'progress' | 'unlocked'>[] = [
    // Streak Achievements (Enhanced)
    {
      id: 'first_step',
      title: 'First Step to Excellence',
      description: 'Complete your first habit session',
      icon: Flame,
      type: 'milestone',
      requirement: 1,
      tier: 'bronze',
      points: 5,
      category: 'overall'
    },
    {
      id: 'first_streak',
      title: 'Building Momentum',
      description: 'Complete any habit for 3 days in a row',
      icon: Flame,
      type: 'streak',
      requirement: 3,
      tier: 'bronze',
      points: 15,
      category: 'overall'
    },
    {
      id: 'week_warrior',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak on any habit',
      icon: Shield,
      type: 'streak',
      requirement: 7,
      tier: 'silver',
      points: 25,
      category: 'overall'
    },
    {
      id: 'month_master',
      title: 'Month Master',
      description: 'Maintain a 30-day streak on any habit',
      icon: Crown,
      type: 'streak',
      requirement: 30,
      tier: 'gold',
      points: 100,
      category: 'overall'
    },
    {
      id: 'streak_legend',
      title: 'Streak Legend',
      description: 'Achieve a 90-day streak on any habit',
      icon: Diamond,
      type: 'streak',
      requirement: 90,
      tier: 'platinum',
      points: 250,
      category: 'overall'
    },
    
    // Daily Completion Achievements
    {
      id: 'daily_champion',
      title: 'Daily Champion',
      description: 'Complete all habits in a single day',
      icon: Trophy,
      type: 'completion',
      requirement: 1,
      tier: 'bronze',
      points: 15,
      category: 'overall'
    },
    {
      id: 'perfect_week',
      title: 'Perfect Week',
      description: 'Complete all habits every day for a week',
      icon: Star,
      type: 'completion',
      requirement: 7,
      tier: 'gold',
      points: 75,
      category: 'overall'
    },
    
    // Category-specific achievements
    {
      id: 'mindset_master',
      title: 'Mindset Master',
      description: 'Complete 50 mindset habit sessions',
      icon: Zap,
      type: 'milestone',
      requirement: 50,
      tier: 'silver',
      points: 50,
      category: 'mindset'
    },
    {
      id: 'strategic_thinker',
      title: 'Strategic Thinker',
      description: 'Complete 50 strategic habit sessions',
      icon: Target,
      type: 'milestone',
      requirement: 50,
      tier: 'silver',
      points: 50,
      category: 'strategic'
    },
    {
      id: 'leadership_elite',
      title: 'Leadership Elite',
      description: 'Complete 50 leadership habit sessions',
      icon: Crown,
      type: 'milestone',
      requirement: 50,
      tier: 'silver',
      points: 50,
      category: 'leadership'
    },
    
    // Consistency achievements
    {
      id: 'consistency_king',
      title: 'Consistency Champion',
      description: 'Maintain 80% completion rate for 30 days',
      icon: Medal,
      type: 'consistency',
      requirement: 30,
      tier: 'gold',
      points: 100,
      category: 'overall'
    },
    
    // WRD Phase 1 New Achievements
    {
      id: 'early_bird',
      title: 'Early Bird Executive',
      description: 'Complete 5 morning habits before 9 AM',
      icon: Star,
      type: 'milestone',
      requirement: 5,
      tier: 'bronze',
      points: 20,
      category: 'overall'
    },
    {
      id: 'scenario_master',
      title: 'Scenario Master',
      description: 'Complete 10 executive scenarios',
      icon: Target,
      type: 'milestone',
      requirement: 10,
      tier: 'silver',
      points: 40,
      category: 'strategic'
    },
    {
      id: 'power_week',
      title: 'Power Week',
      description: 'Complete all habits for 7 consecutive days',
      icon: Crown,
      type: 'streak',
      requirement: 7,
      tier: 'silver',
      points: 50,
      category: 'overall'
    },
    {
      id: 'habit_explorer',
      title: 'Habit Explorer',
      description: 'Try habits from all 3 categories in one day',
      icon: Zap,
      type: 'completion',
      requirement: 1,
      tier: 'bronze',
      points: 25,
      category: 'overall'
    },
    {
      id: 'ai_collaborator',
      title: 'AI Collaborator',
      description: 'Use AI Strategy Co-pilot 15 times',
      icon: Trophy,
      type: 'milestone',
      requirement: 15,
      tier: 'silver',
      points: 35,
      category: 'strategic'
    },
    {
      id: 'executive_elite',
      title: 'Executive Elite',
      description: 'Reach 1000 total points',
      icon: Diamond,
      type: 'milestone',
      requirement: 1000,
      tier: 'platinum',
      points: 200,
      category: 'overall'
    },
    {
      id: 'weekend_warrior',
      title: 'Weekend Warrior',
      description: 'Complete habits on 10 weekend days',
      icon: Shield,
      type: 'milestone',
      requirement: 10,
      tier: 'silver',
      points: 30,
      category: 'overall'
    },
    {
      id: 'transformation_champion',
      title: 'Transformation Champion',
      description: 'Complete 100 total habit sessions',
      icon: Crown,
      type: 'milestone',
      requirement: 100,
      tier: 'gold',
      points: 150,
      category: 'overall'
    }
  ];

  // Calculate progress and unlock status for each achievement
  useEffect(() => {
    const updatedAchievements = achievementDefinitions.map(def => {
      let progress = 0;
      let unlocked = false;

      switch (def.type) {
        case 'streak':
          const maxStreak = Math.max(...habits.map(h => h.streak), 0);
          progress = Math.min(maxStreak, def.requirement);
          unlocked = maxStreak >= def.requirement;
          break;

        case 'completion':
          const completedToday = habits.filter(h => h.completedToday).length;
          const totalHabits = habits.length;
          const allCompleted = completedToday === totalHabits && totalHabits > 0;
          
          if (def.id === 'daily_champion') {
            progress = allCompleted ? 1 : 0;
            unlocked = allCompleted;
          }
          // Add logic for perfect_week when we have date tracking
          break;

        case 'milestone':
          const categoryHabits = habits.filter(h => 
            def.category === 'overall' || h.category === def.category
          );
          const totalSessions = categoryHabits.reduce((sum, h) => sum + h.weeklyProgress, 0);
          progress = Math.min(totalSessions, def.requirement);
          unlocked = totalSessions >= def.requirement;
          break;

        case 'consistency':
          // Simplified consistency calculation
          const completionRate = habits.length > 0 ? 
            habits.filter(h => h.completedToday).length / habits.length : 0;
          progress = completionRate >= 0.8 ? def.requirement : 0;
          unlocked = completionRate >= 0.8;
          break;
      }

      return {
        ...def,
        progress,
        unlocked
      };
    });

    // Check for newly unlocked achievements
    const currentAchievements = achievements;
    const newlyUnlocked = updatedAchievements.filter(updated => 
      updated.unlocked && !currentAchievements.find(current => 
        current.id === updated.id && current.unlocked
      )
    );

    // Notify about new achievements
    newlyUnlocked.forEach(achievement => {
      if (onAchievementUnlocked) {
        onAchievementUnlocked(achievement);
      }
    });

    setAchievements(updatedAchievements);
    
    // Calculate total points
    const points = updatedAchievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.points, 0);
    setTotalPoints(points);
  }, [habits, onAchievementUnlocked]);

  const getTierColor = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-50';
      case 'silver': return 'text-gray-500 bg-gray-50';
      case 'gold': return 'text-yellow-500 bg-yellow-50';
      case 'platinum': return 'text-purple-600 bg-purple-50';
      case 'diamond': return 'text-blue-600 bg-blue-50';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const inProgressAchievements = achievements.filter(a => !a.unlocked && a.progress > 0);
  const lockedAchievements = achievements.filter(a => !a.unlocked && a.progress === 0);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Achievement Progress</span>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                <Trophy className="w-4 h-4 mr-1" />
                {unlockedAchievements.length}/{achievements.length}
              </Badge>
              <Badge variant="outline" className="text-lg px-3 py-1">
                <Star className="w-4 h-4 mr-1" />
                {totalPoints} pts
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-electric to-electric/70 transition-all duration-500"
              style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {unlockedAchievements.length === achievements.length 
              ? "🎉 All achievements unlocked! You're an executive excellence master!"
              : `${achievements.length - unlockedAchievements.length} achievements remaining`
            }
          </p>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-electric" />
            Unlocked Achievements ({unlockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-amber-500" />
            In Progress ({inProgressAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-muted-foreground mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Locked Achievements ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.slice(0, 4).map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icon;
  const progressPercentage = (achievement.progress / achievement.requirement) * 100;
  
  return (
    <Card className={`transition-all duration-200 ${
      achievement.unlocked 
        ? 'bg-gradient-to-r from-electric/5 to-electric/10 border-electric/20 shadow-lg' 
        : 'hover:shadow-md'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${
            achievement.unlocked 
              ? 'bg-electric text-white' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`font-bold truncate ${
                achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement.title}
              </h4>
              <Badge 
                variant="secondary" 
                className={`text-xs ${achievement.unlocked ? getTierColor(achievement.tier) : 'bg-muted'}`}
              >
                {achievement.tier}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {achievement.description}
            </p>
            
            {!achievement.unlocked && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {achievement.progress}/{achievement.requirement}
                  </span>
                  <span className="text-muted-foreground">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-electric transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
            
            {achievement.unlocked && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-electric font-medium">✓ Unlocked</span>
                <Badge variant="outline" className="text-xs">
                  +{achievement.points} pts
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTierColor(tier: Achievement['tier']) {
  switch (tier) {
    case 'bronze': return 'text-amber-600 bg-amber-50';
    case 'silver': return 'text-gray-500 bg-gray-50';
    case 'gold': return 'text-yellow-500 bg-yellow-50';
    case 'platinum': return 'text-purple-600 bg-purple-50';
    case 'diamond': return 'text-blue-600 bg-blue-50';
  }
}
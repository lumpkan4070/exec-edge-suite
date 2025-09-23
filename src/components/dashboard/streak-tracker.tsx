import { useState, useEffect } from "react";
import { Flame, Calendar, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StreakData {
  current: number;
  longest: number;
  category: string;
  lastCompleted: Date | null;
}

interface StreakTrackerProps {
  habits: any[];
}

export function StreakTracker({ habits }: StreakTrackerProps) {
  const [streakData, setStreakData] = useState<StreakData[]>([]);
  const [overallStreak, setOverallStreak] = useState(0);

  useEffect(() => {
    // Calculate streaks for each category
    const categories = ['mindset', 'strategic', 'leadership'];
    const streaks = categories.map(category => {
      const categoryHabits = habits.filter(h => h.category === category);
      const currentStreak = Math.max(...categoryHabits.map(h => h.streak), 0);
      const longestStreak = Math.max(currentStreak, currentStreak + Math.floor(Math.random() * 10)); // Simulated longest
      
      return {
        current: currentStreak,
        longest: longestStreak,
        category,
        lastCompleted: new Date() // Simplified for demo
      };
    });

    setStreakData(streaks);

    // Calculate overall streak (simplified)
    const avgStreak = habits.length > 0 ? 
      Math.floor(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length) : 0;
    setOverallStreak(avgStreak);
  }, [habits]);

  const getStreakLevel = (streak: number) => {
    if (streak >= 90) return { level: 'Legendary', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (streak >= 30) return { level: 'Master', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (streak >= 14) return { level: 'Strong', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (streak >= 7) return { level: 'Building', color: 'text-green-600', bg: 'bg-green-50' };
    if (streak >= 3) return { level: 'Started', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { level: 'Beginning', color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindset': return '🧠';
      case 'strategic': return '🎯';
      case 'leadership': return '👑';
      default: return '💪';
    }
  };

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const overallLevel = getStreakLevel(overallStreak);
  const longestStreak = Math.max(...streakData.map(s => s.longest), 0);

  return (
    <div className="space-y-6">
      {/* Overall Streak Card */}
      <Card className="bg-gradient-to-r from-electric/5 to-electric/10 border-electric/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-6 h-6 text-electric" />
              <span>Overall Streak Power</span>
            </div>
            <Badge className={`${overallLevel.bg} ${overallLevel.color} border-current`}>
              {overallLevel.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-electric mb-1">{overallStreak}</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-1">{longestStreak}</div>
              <div className="text-sm text-muted-foreground">Personal Best</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {habits.filter(h => h.completedToday).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {streakData.map(streak => {
          const level = getStreakLevel(streak.current);
          return (
            <Card key={streak.category} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getCategoryIcon(streak.category)}</span>
                    <span>{formatCategoryName(streak.category)}</span>
                  </div>
                  <Badge variant="outline" className={`${level.bg} ${level.color} text-xs`}>
                    {level.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current</span>
                    <div className="flex items-center space-x-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-bold text-lg">{streak.current}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Best</span>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-lg">{streak.longest}</span>
                    </div>
                  </div>

                  {/* Progress to next level */}
                  <div className="pt-2">
                    {streak.current < 90 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Next level</span>
                          <span>
                            {streak.current < 7 ? '7 days' :
                             streak.current < 14 ? '14 days' :
                             streak.current < 30 ? '30 days' : '90 days'}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-electric transition-all duration-300"
                            style={{ 
                              width: `${
                                streak.current < 7 ? (streak.current / 7) * 100 :
                                streak.current < 14 ? ((streak.current - 7) / 7) * 100 :
                                streak.current < 30 ? ((streak.current - 14) / 16) * 100 :
                                ((streak.current - 30) / 60) * 100
                              }%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Streak Motivation */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 mb-1">Streak Power</h3>
              <p className="text-sm text-amber-700">
                {overallStreak >= 30 
                  ? "🔥 You're in the elite zone! Your consistency is building unstoppable momentum."
                  : overallStreak >= 14
                  ? "💪 Strong momentum! You're developing the habits of executive excellence."
                  : overallStreak >= 7
                  ? "⚡ Great start! You're building the foundation of lasting success."
                  : "🌱 Every expert was once a beginner. Your first streak starts with today!"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/user-context';
import { useToast } from '@/hooks/use-toast';
import { ExecutiveButton } from '@/components/ui/executive-button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Circle, Target, Clock, Flame, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  completed_today: boolean;
  streak: number;
}

interface UserProgress {
  total_points: number;
  current_streak: number;
  longest_streak: number;
  habits_completed_today: number;
  habits_completed_this_week: number;
  confidence_level: number;
}

interface HabitTrackerProps {
  userRole: string;
}

export default function HabitTracker({ userRole }: HabitTrackerProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserHabits();
      loadUserProgress();
    }
  }, [user]);

  const loadUserHabits = async () => {
    if (!user) return;

    try {
      // Get user's active habits with completion status for today
      const { data: userHabits, error } = await supabase
        .from('user_habits')
        .select(`
          habit_id,
          habits (
            id,
            title,
            description,
            category,
            points
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;

      // Get today's completions
      const today = new Date().toISOString().split('T')[0];
      const { data: completions, error: completionsError } = await supabase
        .from('habit_completions')
        .select('habit_id')
        .eq('user_id', user.id)
        .eq('completion_date', today);

      if (completionsError) throw completionsError;

      const completedHabitIds = new Set(completions?.map(c => c.habit_id) || []);

      // Calculate streaks for each habit
      const habitsWithStatus = await Promise.all(
        (userHabits || []).map(async (uh) => {
          const habit = uh.habits;
          if (!habit) return null;

          // Calculate streak for this habit
          const { data: streakData } = await supabase
            .from('habit_completions')
            .select('completion_date')
            .eq('user_id', user.id)
            .eq('habit_id', habit.id)
            .order('completion_date', { ascending: false })
            .limit(30);

          let streak = 0;
          if (streakData && streakData.length > 0) {
            const dates = streakData.map(d => d.completion_date).sort().reverse();
            let currentDate = new Date();
            
            for (const dateStr of dates) {
              const date = new Date(dateStr);
              const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
              
              if (diffDays === streak) {
                streak++;
              } else if (diffDays === streak + 1 && streak === 0) {
                // Allow for today not being completed yet
                streak++;
              } else {
                break;
              }
            }
          }

          return {
            id: habit.id,
            title: habit.title,
            description: habit.description,
            category: habit.category,
            points: habit.points,
            completed_today: completedHabitIds.has(habit.id),
            streak
          };
        })
      );

      setHabits(habitsWithStatus.filter(Boolean) as Habit[]);
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: "Failed to load your habits. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      setProgress(data || {
        total_points: 0,
        current_streak: 0,
        longest_streak: 0,
        habits_completed_today: 0,
        habits_completed_this_week: 0,
        confidence_level: 75
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('complete-habit', {
        body: { 
          habit_id: habitId,
          notes: '',
          completion_date: new Date().toISOString().split('T')[0]
        }
      });

      if (error) throw error;

      // Update local state
      setHabits(prev => prev.map(habit => 
        habit.id === habitId 
          ? { 
              ...habit, 
              completed_today: !habit.completed_today,
              streak: data.action === 'completed' ? habit.streak + 1 : Math.max(0, habit.streak - 1)
            }
          : habit
      ));

      // Refresh progress
      await loadUserProgress();

      toast({
        title: data.action === 'completed' ? "Habit Completed! 🎉" : "Habit Unchecked",
        description: data.action === 'completed' 
          ? `+${data.points_earned} points! Current streak: ${data.current_streak}`
          : `Habit removed from today's completions.`
      });

      // Show achievement notifications
      if (data.achievements_earned && data.achievements_earned.length > 0) {
        setTimeout(() => {
          toast({
            title: "Achievement Unlocked! 🏆",
            description: `You earned: ${data.achievements_earned.join(', ')}`,
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error toggling habit:', error);
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <Card className="executive-card p-8 text-center">
        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Habits Yet</h3>
        <p className="text-muted-foreground mb-4">
          Complete your onboarding to get personalized habit recommendations.
        </p>
        <ExecutiveButton onClick={() => window.location.href = '/onboarding'}>
          Complete Setup
        </ExecutiveButton>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      {progress && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{progress.current_streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
          <Card className="p-4 text-center">
            <Award className="w-6 h-6 text-electric mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{progress.total_points}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{progress.habits_completed_today}</div>
            <div className="text-sm text-muted-foreground">Today</div>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{progress.habits_completed_this_week}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </Card>
        </div>
      )}

      {/* Habits List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Today's Habits</h3>
        {habits.map((habit) => (
          <Card key={habit.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleToggleHabit(habit.id)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  habit.completed_today
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-muted-foreground hover:border-green-500"
                )}
              >
                {habit.completed_today ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={cn(
                    "font-medium",
                    habit.completed_today 
                      ? "text-muted-foreground line-through" 
                      : "text-foreground"
                  )}>
                    {habit.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{habit.points} pts</span>
                    {habit.streak > 0 && (
                      <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>{habit.streak}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Bell, Clock, Target, Zap, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Reminder {
  id: string;
  type: 'daily' | 'streak' | 'goal' | 'achievement';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  action?: string;
  dueTime?: string;
}

interface SmartRemindersProps {
  habits: any[];
  streakData?: any[];
  onReminderAction?: (reminderId: string, action: string) => void;
}

export function SmartReminders({ habits, streakData = [], onReminderAction }: SmartRemindersProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const generateReminders = () => {
      const newReminders: Reminder[] = [];
      const currentHour = new Date().getHours();

      // Morning routine reminder
      if (currentHour >= 6 && currentHour <= 10) {
        const incompleteHabits = habits.filter(h => !h.completedToday);
        if (incompleteHabits.length > 0) {
          newReminders.push({
            id: 'morning-routine',
            type: 'daily',
            title: 'Start Your Executive Day',
            description: `${incompleteHabits.length} habits waiting for your attention`,
            priority: 'high',
            action: 'complete-habits',
            dueTime: '10:00 AM'
          });
        }
      }

      // Streak protection reminders
      const riskStreaks = habits.filter(h => h.streak >= 3 && !h.completedToday);
      if (riskStreaks.length > 0 && currentHour >= 16) {
        newReminders.push({
          id: 'streak-protection',
          type: 'streak',
          title: 'Protect Your Streak',
          description: `${riskStreaks.length} streak(s) at risk - don't break the chain!`,
          priority: 'high',
          action: 'complete-streaks'
        });
      }

      // Achievement proximity
      const nearAchievements = habits.filter(h => {
        const nextMilestone = Math.ceil(h.weeklyProgress / 10) * 10;
        return nextMilestone - h.weeklyProgress <= 2;
      });
      if (nearAchievements.length > 0) {
        newReminders.push({
          id: 'achievement-close',
          type: 'achievement',
          title: 'Achievement Within Reach',
          description: 'You\'re just 1-2 sessions away from a new milestone!',
          priority: 'medium',
          action: 'view-progress'
        });
      }

      // Evening reflection
      if (currentHour >= 18 && currentHour <= 22) {
        const completedToday = habits.filter(h => h.completedToday).length;
        const totalHabits = habits.length;
        
        if (completedToday > 0) {
          newReminders.push({
            id: 'evening-reflection',
            type: 'daily',
            title: 'Reflect on Today\'s Wins',
            description: `You completed ${completedToday}/${totalHabits} habits today`,
            priority: 'low',
            action: 'view-analytics'
          });
        }
      }

      // Weekly goal reminder
      const isEndOfWeek = new Date().getDay() === 0; // Sunday
      if (isEndOfWeek) {
        newReminders.push({
          id: 'weekly-review',
          type: 'goal',
          title: 'Weekly Executive Review',
          description: 'Time to review your progress and set next week\'s focus',
          priority: 'medium',
          action: 'weekly-review'
        });
      }

      setReminders(newReminders);
    };

    generateReminders();
    
    // Refresh reminders every hour
    const interval = setInterval(generateReminders, 60000 * 60);
    return () => clearInterval(interval);
  }, [habits]);

  const getPriorityIcon = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'low': return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-amber-200 bg-amber-50';
      case 'low': return 'border-blue-200 bg-blue-50';
    }
  };

  const getTypeIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'daily': return <Target className="w-4 h-4" />;
      case 'streak': return <Zap className="w-4 h-4" />;
      case 'goal': return <Bell className="w-4 h-4" />;
      case 'achievement': return <Target className="w-4 h-4" />;
    }
  };

  const handleReminderAction = (reminder: Reminder) => {
    if (onReminderAction && reminder.action) {
      onReminderAction(reminder.id, reminder.action);
    }
  };

  const displayedReminders = showAll ? reminders : reminders.slice(0, 3);

  if (reminders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-green-500" />
            <span>Smart Reminders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-green-600 mb-2">✨</div>
            <p className="text-sm text-muted-foreground">
              You're all caught up! No reminders at this time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-electric" />
            <span>Smart Reminders</span>
          </div>
          {reminders.length > 0 && (
            <Badge variant="secondary" className="bg-electric/10 text-electric">
              {reminders.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedReminders.map(reminder => (
          <div
            key={reminder.id}
            className={`p-4 rounded-lg border ${getPriorityColor(reminder.priority)} hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex items-center space-x-1">
                  {getPriorityIcon(reminder.priority)}
                  {getTypeIcon(reminder.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{reminder.title}</h4>
                    {reminder.dueTime && (
                      <Badge variant="outline" className="text-xs">
                        {reminder.dueTime}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {reminder.description}
                  </p>
                  {reminder.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReminderAction(reminder)}
                      className="text-xs h-7"
                    >
                      {reminder.action === 'complete-habits' && 'Complete Now'}
                      {reminder.action === 'complete-streaks' && 'Protect Streak'}
                      {reminder.action === 'view-progress' && 'View Progress'}
                      {reminder.action === 'view-analytics' && 'View Analytics'}
                      {reminder.action === 'weekly-review' && 'Start Review'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {reminders.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-xs"
          >
            {showAll ? 'Show Less' : `Show ${reminders.length - 3} More`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
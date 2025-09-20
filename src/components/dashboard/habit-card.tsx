import { CheckCircle2, Circle, Award, Star } from "lucide-react";
import { Habit } from "./types";
import { ExecutiveButton } from "@/components/ui/executive-button";

interface HabitCardProps {
  habit: Habit;
  categoryColor: string;
  onToggle: () => void;
}

export function HabitCard({ habit, categoryColor, onToggle }: HabitCardProps) {
  const Icon = habit.icon;
  const weeklyCompletion = Math.round((habit.weeklyProgress / 7) * 100);
  
  const getBadgeLevel = (streak: number) => {
    if (streak >= 90) return { level: "Gold", icon: Award, color: "text-yellow-500" };
    if (streak >= 30) return { level: "Silver", icon: Star, color: "text-gray-400" };
    if (streak >= 7) return { level: "Bronze", icon: Award, color: "text-amber-600" };
    return null;
  };

  const badge = getBadgeLevel(habit.streak);

  return (
    <div className="bg-white rounded-xl p-6 border border-silver hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <button
            onClick={onToggle}
            className="flex-shrink-0 transition-all duration-200 hover:scale-110 mt-1"
          >
            {habit.completedToday ? (
              <CheckCircle2 className={`w-8 h-8 text-${categoryColor}`} />
            ) : (
              <Circle className={`w-8 h-8 text-muted-foreground hover:text-${categoryColor}`} />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 bg-${categoryColor}/10 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${categoryColor}`} />
              </div>
              <h4 className="font-bold text-foreground">{habit.title}</h4>
              {badge && (
                <div className="flex items-center space-x-1">
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  <span className={`text-xs font-medium ${badge.color}`}>{badge.level}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm font-medium text-muted-foreground mb-3">
              {habit.actionStep}
            </p>
            
            <div className="bg-muted/50 rounded-lg p-3 mb-3">
              <p className="text-sm text-foreground italic">
                💡 {habit.microPrompt}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Weekly Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              This Week: {habit.weeklyProgress}/7 days
            </span>
            <span className={`text-sm font-bold text-${categoryColor}`}>
              {weeklyCompletion}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-${categoryColor} transition-all duration-500`}
              style={{ width: `${weeklyCompletion}%` }}
            />
          </div>
        </div>
        
        {/* Streak */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Current Streak:</span>
            <span className={`font-bold text-${categoryColor}`}>{habit.streak} days</span>
          </div>
          
          {!habit.completedToday && (
            <ExecutiveButton
              onClick={onToggle}
              size="sm"
              className="text-xs px-3 py-1"
            >
              Mark Complete
            </ExecutiveButton>
          )}
        </div>
      </div>
    </div>
  );
}
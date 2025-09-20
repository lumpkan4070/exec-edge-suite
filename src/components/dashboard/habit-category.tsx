import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HabitCard } from "./habit-card";
import { Habit } from "./types";

interface HabitCategoryProps {
  title: string;
  color: string;
  bgColor: string;
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
}

export function HabitCategory({ title, color, bgColor, habits, onToggleHabit }: HabitCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completedThisWeek = habits.reduce((sum, habit) => sum + habit.weeklyProgress, 0);
  const totalPossible = habits.length * 7;
  const weeklyPercentage = Math.round((completedThisWeek / totalPossible) * 100);

  return (
    <div className="executive-card overflow-hidden shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-6 ${bgColor} border-l-4 border-${color} flex items-center justify-between hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center space-x-4">
          <h3 className={`text-xl font-bold text-${color}`}>{title}</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-${color}`} />
            <span className={`text-sm font-medium text-${color}`}>
              {completedThisWeek}/{totalPossible} this week ({weeklyPercentage}%)
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className={`w-5 h-5 text-${color}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 text-${color}`} />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-6 space-y-4 bg-card">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              categoryColor={color}
              onToggle={() => onToggleHabit(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
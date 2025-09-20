import { LucideIcon } from "lucide-react";

export interface Habit {
  id: string;
  title: string;
  actionStep: string;
  microPrompt: string;
  streak: number;
  weeklyProgress: number; // 0-7 days completed this week
  completedToday: boolean;
  icon: LucideIcon;
  category: 'mindset' | 'strategic' | 'leadership';
}

export interface HabitCategory {
  title: string;
  color: string;
  bgColor: string;
  habits: Habit[];
}
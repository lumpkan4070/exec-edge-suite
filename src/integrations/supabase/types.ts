export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_icon: string | null
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          name: string
          points_reward: number | null
          requirements: Json
        }
        Insert: {
          badge_icon?: string | null
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          name: string
          points_reward?: number | null
          requirements: Json
        }
        Update: {
          badge_icon?: string | null
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          name?: string
          points_reward?: number | null
          requirements?: Json
        }
        Relationships: []
      }
      ai_recommendations: {
        Row: {
          content: string
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          metadata: Json | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          recommendation_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      habit_completions: {
        Row: {
          completion_date: string
          created_at: string
          habit_id: string
          id: string
          notes: string | null
          points_earned: number | null
          user_id: string
        }
        Insert: {
          completion_date?: string
          created_at?: string
          habit_id: string
          id?: string
          notes?: string | null
          points_earned?: number | null
          user_id: string
        }
        Update: {
          completion_date?: string
          created_at?: string
          habit_id?: string
          id?: string
          notes?: string | null
          points_earned?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          category: string
          content: Json | null
          created_at: string
          description: string | null
          difficulty_level: number | null
          frequency: string
          id: string
          is_active: boolean | null
          points: number | null
          target_roles: string[] | null
          title: string
        }
        Insert: {
          category: string
          content?: Json | null
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          points?: number | null
          target_roles?: string[] | null
          title: string
        }
        Update: {
          category?: string
          content?: Json | null
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          points?: number | null
          target_roles?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          goals: string[] | null
          id: string
          preferences: Json | null
          role: string
          tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          goals?: string[] | null
          id?: string
          preferences?: Json | null
          role: string
          tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          goals?: string[] | null
          id?: string
          preferences?: Json | null
          role?: string
          tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          category: string
          content: Json
          created_at: string
          description: string
          difficulty_level: number | null
          estimated_duration: number | null
          id: string
          is_active: boolean | null
          is_premium: boolean | null
          target_roles: string[] | null
          title: string
        }
        Insert: {
          category: string
          content: Json
          created_at?: string
          description: string
          difficulty_level?: number | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          target_roles?: string[] | null
          title: string
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          description?: string
          difficulty_level?: number | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          target_roles?: string[] | null
          title?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_habits: {
        Row: {
          created_at: string
          custom_frequency: string | null
          custom_target: number | null
          habit_id: string
          id: string
          is_active: boolean | null
          started_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_frequency?: string | null
          custom_target?: number | null
          habit_id: string
          id?: string
          is_active?: boolean | null
          started_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_frequency?: string | null
          custom_target?: number | null
          habit_id?: string
          id?: string
          is_active?: boolean | null
          started_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_habits_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          confidence_level: number | null
          current_streak: number | null
          habits_completed_this_week: number | null
          habits_completed_today: number | null
          id: string
          last_updated: string
          longest_streak: number | null
          total_points: number | null
          user_id: string
        }
        Insert: {
          confidence_level?: number | null
          current_streak?: number | null
          habits_completed_this_week?: number | null
          habits_completed_today?: number | null
          id?: string
          last_updated?: string
          longest_streak?: number | null
          total_points?: number | null
          user_id: string
        }
        Update: {
          confidence_level?: number | null
          current_streak?: number | null
          habits_completed_this_week?: number | null
          habits_completed_today?: number | null
          id?: string
          last_updated?: string
          longest_streak?: number | null
          total_points?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_streak: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_or_create_user_profile: {
        Args: { user_id_param: string }
        Returns: {
          created_at: string
          display_name: string
          email: string
          goals: string[]
          id: string
          preferences: Json
          role: string
          tier: string
          updated_at: string
          user_id: string
        }[]
      }
      update_user_progress: {
        Args: { p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

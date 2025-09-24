import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[COMPLETE-HABIT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header provided');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error('User not authenticated');
    logStep("User authenticated", { userId: user.id });

    const { habit_id, notes = '', completion_date } = await req.json();
    if (!habit_id) throw new Error('Habit ID is required');

    const completionDateStr = completion_date || new Date().toISOString().split('T')[0];
    logStep("Processing habit completion", { habit_id, completionDate: completionDateStr });

    // Get habit details for points calculation
    const { data: habit, error: habitError } = await supabaseClient
      .from('habits')
      .select('points, title')
      .eq('id', habit_id)
      .single();

    if (habitError || !habit) {
      throw new Error('Habit not found');
    }

    // Check if already completed today
    const { data: existingCompletion } = await supabaseClient
      .from('habit_completions')
      .select('id')
      .eq('user_id', user.id)
      .eq('habit_id', habit_id)
      .eq('completion_date', completionDateStr)
      .single();

    if (existingCompletion) {
      // Toggle completion (remove it)
      const { error: deleteError } = await supabaseClient
        .from('habit_completions')
        .delete()
        .eq('id', existingCompletion.id);

      if (deleteError) throw new Error(`Failed to remove completion: ${deleteError.message}`);
      
      logStep("Habit completion removed");
      
      // Update user progress
      await supabaseClient.rpc('update_user_progress', { p_user_id: user.id });
      
      return new Response(JSON.stringify({ 
        success: true, 
        action: 'removed',
        habit_title: habit.title,
        points_lost: habit.points
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Add completion
      const { data: completion, error: completionError } = await supabaseClient
        .from('habit_completions')
        .insert({
          user_id: user.id,
          habit_id,
          completion_date: completionDateStr,
          notes,
          points_earned: habit.points
        })
        .select()
        .single();

      if (completionError) {
        throw new Error(`Failed to complete habit: ${completionError.message}`);
      }

      logStep("Habit completed successfully", { completionId: completion.id });

      // Update user progress
      await supabaseClient.rpc('update_user_progress', { p_user_id: user.id });

      // Get updated progress for achievements check
      const { data: progress } = await supabaseClient
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Check for achievements
      const achievements = [];
      
      if (progress) {
        // Check for streak achievements
        if (progress.current_streak === 7) {
          achievements.push('Week Warrior');
        } else if (progress.current_streak === 30) {
          achievements.push('Consistency Champion');
        }
        
        // Check for points achievement
        if (progress.total_points >= 1000) {
          achievements.push('Point Collector');
        }
        
        // Check for first habit completion
        if (progress.total_points === habit.points) {
          achievements.push('First Steps');
        }
      }

      // Award achievements
      for (const achievementName of achievements) {
        const { data: achievement } = await supabaseClient
          .from('achievements')
          .select('id')
          .eq('name', achievementName)
          .single();
          
        if (achievement) {
          await supabaseClient
            .from('user_achievements')
            .upsert({
              user_id: user.id,
              achievement_id: achievement.id
            }, { onConflict: 'user_id,achievement_id' });
        }
      }

      logStep("Achievements processed", { achievementsEarned: achievements.length });

      return new Response(JSON.stringify({ 
        success: true, 
        action: 'completed',
        habit_title: habit.title,
        points_earned: habit.points,
        current_streak: progress?.current_streak || 0,
        total_points: progress?.total_points || 0,
        achievements_earned: achievements
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in complete-habit", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
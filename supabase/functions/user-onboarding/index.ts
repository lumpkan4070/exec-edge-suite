import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[USER-ONBOARDING] ${step}${detailsStr}`);
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

    const { role, goals, display_name, preferences = {} } = await req.json();
    if (!role) throw new Error('Role is required');

    logStep("Processing onboarding data", { role, goalsCount: goals?.length || 0 });

    // Update user profile
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .upsert({
        user_id: user.id,
        email: user.email,
        role,
        goals: goals || [],
        display_name: display_name || user.email?.split('@')[0],
        preferences,
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      logStep("Profile update error", { error: profileError });
      throw new Error(`Failed to update profile: ${profileError.message}`);
    }

    logStep("Profile updated successfully");

    // Get role-appropriate starter habits
    const { data: starterHabits, error: habitsError } = await supabaseClient
      .from('habits')
      .select('*')
      .contains('target_roles', [role])
      .eq('is_active', true)
      .lte('difficulty_level', 2) // Start with easier habits
      .limit(5);

    if (habitsError) {
      logStep("Habits fetch error", { error: habitsError });
    } else {
      logStep("Retrieved starter habits", { count: starterHabits?.length || 0 });
    }

    // Add starter habits to user's routine
    if (starterHabits && starterHabits.length > 0) {
      const userHabitsToInsert = starterHabits.map(habit => ({
        user_id: user.id,
        habit_id: habit.id,
        is_active: true,
        started_date: new Date().toISOString().split('T')[0]
      }));

      const { error: userHabitsError } = await supabaseClient
        .from('user_habits')
        .upsert(userHabitsToInsert, { onConflict: 'user_id,habit_id' });

      if (userHabitsError) {
        logStep("User habits insert error", { error: userHabitsError });
      } else {
        logStep("Added starter habits to user routine");
      }
    }

    // Initialize user progress if not exists
    const { error: progressError } = await supabaseClient
      .from('user_progress')
      .upsert({
        user_id: user.id,
        total_points: 0,
        current_streak: 0,
        longest_streak: 0,
        habits_completed_today: 0,
        habits_completed_this_week: 0,
        confidence_level: 75,
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (progressError) {
      logStep("Progress initialization error", { error: progressError });
    } else {
      logStep("User progress initialized");
    }

    // Create welcome AI recommendation
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    if (openAIKey) {
      try {
        const welcomePrompt = `Generate a personalized welcome message for a new ${role} user who has these goals: ${goals?.join(', ') || 'general executive performance'}. 
        
        The message should:
        1. Welcome them to APEX Executive
        2. Reference their specific role and goals
        3. Mention their starter habit recommendations
        4. Set expectations for their journey (aim for 2-3 sentences)
        5. Be motivating and executive-appropriate
        
        Keep it concise but impactful.`;

        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-5-2025-08-07',
            messages: [
              { 
                role: 'system', 
                content: 'You are APEX, an elite executive performance advisor. Generate concise, powerful welcome messages.' 
              },
              { role: 'user', content: welcomePrompt }
            ],
            max_completion_tokens: 200,
            temperature: 0.8,
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const welcomeMessage = aiData.choices[0].message.content;

          await supabaseClient
            .from('ai_recommendations')
            .insert({
              user_id: user.id,
              recommendation_type: 'insight',
              title: 'Welcome to APEX Executive',
              content: welcomeMessage,
              metadata: { 
                type: 'onboarding_welcome',
                role,
                goals,
                timestamp: new Date().toISOString()
              }
            });

          logStep("Created welcome AI recommendation");
        }
      } catch (aiError) {
        logStep("AI welcome message error", { error: aiError });
        // Continue without AI welcome message
      }
    }

    // Return onboarding completion data
    const response = {
      success: true,
      profile: {
        role,
        goals,
        display_name
      },
      starter_habits: starterHabits || [],
      message: "Onboarding completed successfully"
    };

    logStep("Onboarding completed", { userId: user.id, role });

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in user-onboarding", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
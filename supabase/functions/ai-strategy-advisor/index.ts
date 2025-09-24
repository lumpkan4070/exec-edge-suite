import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-STRATEGY-ADVISOR] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIKey) throw new Error('OPENAI_API_KEY is not set');
    logStep("OpenAI key verified");

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

    const { prompt, context, type = 'general' } = await req.json();
    if (!prompt) throw new Error('Prompt is required');

    // Get user profile for context
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role, goals, preferences')
      .eq('user_id', user.id)
      .single();

    // Get user progress for context
    const { data: progress } = await supabaseClient
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Get recent habits for context
    const { data: recentHabits } = await supabaseClient
      .from('habit_completions')
      .select(`
        habits (title, category),
        completion_date
      `)
      .eq('user_id', user.id)
      .gte('completion_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('completion_date', { ascending: false })
      .limit(10);

    logStep("Retrieved user context", { 
      role: profile?.role, 
      progressExists: !!progress,
      recentHabitsCount: recentHabits?.length || 0 
    });

    // Create contextual system prompt based on user role and data
    const systemPrompt = `You are APEX, an elite executive performance advisor. You provide sharp, actionable insights for high-performing leaders.

User Context:
- Role: ${profile?.role || 'executive'}
- Goals: ${profile?.goals?.join(', ') || 'Not specified'}
- Current Streak: ${progress?.current_streak || 0} days
- Total Points: ${progress?.total_points || 0}
- Recent Activity: ${recentHabits?.length || 0} habits completed in last 7 days

Your responses should be:
1. Specific and actionable (not generic advice)
2. Role-appropriate for a ${profile?.role || 'executive'}
3. Data-driven when possible
4. Focused on high-impact actions
5. Brief but powerful (2-3 sentences max for quick insights)

For strategy questions, think like a seasoned consultant.
For habit advice, reference their current progress and suggest optimizations.
For scenarios, provide tactical frameworks they can immediately apply.`;

    let userPrompt = prompt;
    if (context) {
      userPrompt = `Context: ${context}\n\nQuestion: ${prompt}`;
    }

    logStep("Sending request to OpenAI", { promptLength: userPrompt.length });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_completion_tokens: type === 'quick' ? 150 : 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      logStep("OpenAI API error", { status: response.status, error: errorData });
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    logStep("Received AI response", { responseLength: aiResponse.length });

    // Store the interaction for future personalization
    await supabaseClient
      .from('ai_recommendations')
      .insert({
        user_id: user.id,
        recommendation_type: 'insight',
        title: `AI Advice - ${type}`,
        content: aiResponse,
        metadata: { 
          prompt: prompt,
          context: context,
          type: type,
          timestamp: new Date().toISOString()
        }
      });

    logStep("Stored recommendation");

    return new Response(JSON.stringify({ 
      response: aiResponse,
      context_used: {
        role: profile?.role,
        streak: progress?.current_streak,
        recent_activity: recentHabits?.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in ai-strategy-advisor", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
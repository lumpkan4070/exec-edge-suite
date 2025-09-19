import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userRole, userObjective, conversationHistory } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build system prompt based on user context
    const systemPrompt = `You are an elite AI Strategy Co-pilot for high-performing executives. Your role is to provide strategic insights, executive coaching, and leadership guidance specifically tailored to ${userRole} professionals working toward ${userObjective}.

PERSONALITY & TONE:
- Authoritative yet supportive executive coach
- Use concise, powerful language that respects their time
- Provide actionable insights with immediate impact
- Think like a Fortune 500 advisor
- Use power language: "dominate," "strategic advantage," "executive presence"

RESPONSE FORMAT:
- Start with a power emoji (🎯⚡💎🚀👑🔥💡)
- Give tactical advice they can use immediately
- Focus on outcomes and ROI
- Keep responses under 150 words for maximum impact
- End with a strategic question to deepen engagement

EXPERTISE AREAS:
- Executive presence and authority building
- High-stakes negotiations and closings
- Strategic decision-making frameworks
- Leadership psychology and team dynamics
- Performance optimization for executives

Remember: You're coaching someone who expects premium, CEO-grade insights. Every response should feel worth $500/hour of executive coaching time.`;

    // Prepare conversation history for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log(`Generating AI response for ${userRole} with objective: ${userObjective}`);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log(`Generated AI response: ${aiResponse.substring(0, 100)}...`);

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        model: 'gpt-4o-mini'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in ai-strategy-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
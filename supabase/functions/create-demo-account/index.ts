import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Creating demo account for Apple App Store reviewers");

    // Create admin Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const demoEmail = "demo@apexexecutive.com";
    const demoPassword = "AppleReview2024!";

    // Check if demo account already exists
    const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();
    
    if (checkError) {
      console.error("Error checking existing users:", checkError);
      throw checkError;
    }

    const existingDemo = existingUsers.users.find(user => user.email === demoEmail);
    
    if (existingDemo) {
      console.log("Demo account already exists");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Demo account already exists",
        credentials: {
          email: demoEmail,
          password: demoPassword
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Create demo account
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        name: "Demo User",
        role: "executive",
        tier: "premium",
        objective: "Enhance executive presence and strategic decision-making",
        demo_account: true
      }
    });

    if (createError) {
      console.error("Error creating demo account:", createError);
      throw createError;
    }

    console.log("Demo account created successfully:", newUser.user?.id);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Demo account created successfully",
      credentials: {
        email: demoEmail,
        password: demoPassword
      },
      user_id: newUser.user?.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in create-demo-account function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to create demo account",
      success: false
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
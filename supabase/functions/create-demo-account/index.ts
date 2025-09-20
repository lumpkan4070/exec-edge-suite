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
    // Initialize Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    console.log("Creating demo account for Apple App Store review...");

    // Check if demo account already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const demoExists = existingUser?.users?.some(user => user.email === "demo@apexexecutive.com");

    if (demoExists) {
      console.log("Demo account already exists");
      return new Response(JSON.stringify({ 
        message: "Demo account already exists",
        email: "demo@apexexecutive.com",
        password: "AppleReview2024!"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Create demo user using admin auth
    const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email: "demo@apexexecutive.com",
      password: "AppleReview2024!",
      email_confirm: true,
      user_metadata: {
        name: "Demo Executive User",
        role: "executive",
        tier: "premium",
        objective: "executive_presence",
        demo_account: true
      }
    });

    if (signUpError) {
      console.error("Error creating demo user:", signUpError);
      throw signUpError;
    }

    console.log("Demo account created successfully:", newUser.user?.id);

    return new Response(JSON.stringify({ 
      message: "Demo account created successfully",
      email: "demo@apexexecutive.com",
      password: "AppleReview2024!",
      userId: newUser.user?.id,
      note: "This account has premium tier access and sample executive data for App Store review"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in create-demo-account function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
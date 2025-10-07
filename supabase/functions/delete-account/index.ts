import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[DELETE-ACCOUNT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Initialize Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.id) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Delete user profile data from profiles table (if exists)
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .delete()
      .eq('user_id', user.id);
    
    if (profileError) {
      logStep("Profile deletion failed (may not exist)", { error: profileError.message });
    } else {
      logStep("Profile data deleted");
    }

    // Delete user from auth.users table
    const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(user.id);
    
    if (deleteError) {
      throw new Error(`Failed to delete user: ${deleteError.message}`);
    }
    
    logStep("User account deleted successfully", { userId: user.id });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Account deleted successfully" 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in delete-account", { message: errorMessage });
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2025-08-27.basil" as any 
    });
    
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating unsubscribed state");
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for active or trialing subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });
    
    // Find the most recent subscription (active or trialing)
    const activeSubscription = subscriptions.data.find(sub => 
      sub.status === "active" || sub.status === "trialing"
    );
    
    const hasActiveAccess = !!activeSubscription;
    let productId = null;
    let subscriptionEnd = null;
    let tier = null;
    let status = null;

    if (hasActiveAccess && activeSubscription) {
      status = activeSubscription.status;
      
      if (status === "trialing") {
        subscriptionEnd = new Date(activeSubscription.trial_end! * 1000).toISOString();
      } else {
        subscriptionEnd = new Date(activeSubscription.current_period_end * 1000).toISOString();
      }
      
      logStep("Active subscription found", { 
        subscriptionId: activeSubscription.id, 
        status: status,
        endDate: subscriptionEnd 
      });
      
      productId = activeSubscription.items.data[0].price.product;
      
      // Map product ID to tier
      const productTierMap: { [key: string]: string } = {
        "prod_T5HOqvEWNsmMrn": "personal",
        "prod_T5HO4VlE7HsFvA": "professional"
      };
      
      tier = productTierMap[productId as string] || "unknown";
      logStep("Determined subscription tier", { productId, tier, status });
    } else {
      logStep("No active subscription found");
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveAccess,
      status: status,
      product_id: productId,
      tier: tier,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
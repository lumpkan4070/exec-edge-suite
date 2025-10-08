import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VALIDATE-RECEIPT] ${step}${detailsStr}`);
};

/**
 * Apple Receipt Validation Edge Function
 * Validates App Store receipts with dual environment support
 * (production first, then sandbox if status == 21007)
 */
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

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.id) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Get receipt data from request
    const { receiptData } = await req.json();
    if (!receiptData) throw new Error("Receipt data is required");
    logStep("Receipt data received");

    // Validate with Apple - Production first
    logStep("Validating with Apple production environment");
    let validationResult = await validateWithApple(receiptData, false);
    
    // If production returns 21007 (sandbox receipt), retry with sandbox
    if (validationResult.status === 21007) {
      logStep("Production returned 21007, retrying with sandbox");
      validationResult = await validateWithApple(receiptData, true);
    }

    // Check validation result
    if (validationResult.status !== 0) {
      logStep("Validation failed", { status: validationResult.status });
      return new Response(JSON.stringify({ 
        valid: false, 
        error: `Apple validation failed with status ${validationResult.status}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    logStep("Validation successful");

    // Extract subscription info
    const latestReceipt = validationResult.latest_receipt_info?.[0];
    const productId = latestReceipt?.product_id;
    const expiresDate = latestReceipt?.expires_date_ms 
      ? new Date(parseInt(latestReceipt.expires_date_ms))
      : null;

    logStep("Receipt validated", { productId, expiresDate });

    // Update user subscription status in your database if needed
    // TODO: Update user's subscription tier in profiles table

    return new Response(JSON.stringify({
      valid: true,
      productId,
      expiresDate,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in validate-receipt", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/**
 * Validate receipt with Apple's servers
 * @param receiptData Base64 encoded receipt
 * @param sandbox Whether to use sandbox environment
 */
async function validateWithApple(receiptData: string, sandbox: boolean) {
  const url = sandbox
    ? "https://sandbox.itunes.apple.com/verifyReceipt"
    : "https://buy.itunes.apple.com/verifyReceipt";

  // TODO: Store your App Store shared secret in Supabase secrets
  const sharedSecret = Deno.env.get("APPLE_SHARED_SECRET") || "";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "receipt-data": receiptData,
      "password": sharedSecret,
      "exclude-old-transactions": true,
    }),
  });

  return await response.json();
}

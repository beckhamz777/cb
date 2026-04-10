// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Declare Deno global for TS environments lacking Deno types
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Preflight CORS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phone, amount, promoApplied, paymentType } = await req.json()

    // 1. Load Secure Environment Variables
    const MTN_SUBSCRIPTION_KEY = Deno.env.get('MTN_SUBSCRIPTION_KEY');
    const MTN_API_USER_ID = Deno.env.get('MTN_API_USER_ID');
    const MTN_API_SECRET = Deno.env.get('MTN_API_SECRET');
    const TARGET_ENVIRONMENT = Deno.env.get('MTN_ENV') || 'sandbox'; // 'mtnuganda' for production
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

    // Create a Supabase client with the Auth context of the user making the request
    const supabase = createClient(
      SUPABASE_URL ?? '',
      SUPABASE_ANON_KEY ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Securely identify the absolute user executing this
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("Unauthorized: User must be signed in to perform a transaction.")
    }

    if (!MTN_SUBSCRIPTION_KEY || !MTN_API_USER_ID || !MTN_API_SECRET) {
      throw new Error("Missing Server Configuration: MTN credentials not found in Supabase Vault.");
    }

    // 2. Generate MTN OAuth Bearer Token
    const authString = btoa(`${MTN_API_USER_ID}:${MTN_API_SECRET}`);
    const tokenResponse = await fetch(`https://sandbox.momodeveloper.mtn.com/collection/token/`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Ocp-Apim-Subscription-Key": MTN_SUBSCRIPTION_KEY
      }
    });

    if (!tokenResponse.ok) throw new Error("Failed to authenticate with MTN MoMo Network");
    const { access_token } = await tokenResponse.json();

    // 3. Initiate RequestToPay
    const referenceId = crypto.randomUUID(); // Transaction UUID

    // Clean phone number format for MTN (e.g., 25677...)
    const cleanPhone = phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.startsWith('0') ? `256${cleanPhone.substring(1)}` : cleanPhone;

    const paymentResponse = await fetch(`https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": TARGET_ENVIRONMENT,
        "Ocp-Apim-Subscription-Key": MTN_SUBSCRIPTION_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount.toString(),
        currency: "EUR", // Note: Sandbox usually requires EUR. Change to UGX in production environment
        externalId: user.id, // Tie to Supabase User
        payer: {
          partyIdType: "MSISDN",
          partyId: finalPhone
        },
        payerMessage: paymentType === 'cloud_subscription' ? "Payment for Cloud Backup" : "Payment for CheckBook Pro License",
        payeeNote: paymentType === 'cloud_subscription' ? "Cloud Backup Subscription" : "CheckBook Pro Activation"
      })
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      throw new Error(`MTN API Refused Transaction: ${errorText}`);
    }

    // 4. Update Supabase User metadata securely (Since Edge Function has service-level capability)
    // Wait, by default the user token may not be able to upgrade itself if RLS locks metadata edits
    // We will initialize the Supabase Admin client to safely lift their tier internally
    const supabaseAdmin = createClient(
      SUPABASE_URL ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    let updatePayload: any = {};

    if (paymentType === 'cloud_subscription') {
      updatePayload = {
        cloud_backup_enabled: true,
        cloud_expiration: thirtyDaysFromNow
      };
    } else {
      updatePayload = {
        pro_tier: true,
        account_status: 'active',
        phone,
        cloud_backup_enabled: true,
        cloud_expiration: thirtyDaysFromNow
      };
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { user_metadata: updatePayload }
    );

    if (updateError) throw new Error("Database failed to secure tier upgrade.");

    // Return Success
    return new Response(JSON.stringify({
      success: true,
      message: "Check your phone for the MoMo PIN prompt.",
      referenceId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: any) {
    console.error("Payment Execution Error:", error.message);
    // Return 200 instead of 400 so supabase-js correctly passes the JSON structure back to the frontend instead of throwing a generic "non-2xx" wrapper error
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  }
})

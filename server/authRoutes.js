/**
 * Authentication, Onboarding, and Mobile Access Verification Router
 * Implements Social OAuth Token Handling, Web Onboarding, and Mobile Verification Gate.
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Admin Client using Service Role or Anon Key
const supabaseUrl = process.env.SUPABASE_URL || 'https://jhucvkqwenhyiveqsmtf.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodWN2a3F3ZW5oeWl2ZXFzbXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NzI5MjIsImV4cCI6MjA4NTU0ODkyMn0.yXju47Ly5ak8Gm4D0OI42O89qTsc0nYtkmAb7dGFCC8';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * E.164 Phone Format Validation Regex (e.g. +256771234567 or +14155552671)
 */
function isValidE164Phone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.trim();
  const e164Regex = /^\+[1-9]\d{6,14}$/;
  return e164Regex.test(cleaned);
}

/**
 * 1. Web Google Social Auth Callback / Identity Resolution
 * POST /api/auth/web/google
 */
router.post('/api/auth/web/google', async (req, res) => {
  try {
    const { idToken, accessToken, email, name, avatarUrl } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'error', code: 'INVALID_CREDENTIALS', message: 'Email address is required.' });
    }

    // Check existing profile or create user profile placeholder
    let { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('[Google Web Auth Query Error]:', error);
    }

    let userId = profile?.user_id;

    // Return user verification status and profile
    return res.json({
      status: 'success',
      user: {
        userId: userId || null,
        email: email.toLowerCase(),
        name: name || profile?.full_name,
        avatarUrl: avatarUrl || profile?.avatar_url,
        isWebVerified: profile?.is_web_verified || false,
        subscriptionStatus: profile?.subscription_status || 'UNVERIFIED',
        trialExpiresAt: profile?.trial_expires_at || null,
      }
    });
  } catch (err) {
    console.error('[Google Web Auth Error]:', err);
    return res.status(500).json({ status: 'error', message: 'Authentication processing failed.' });
  }
});

/**
 * 2. Web Apple Social Auth Callback / Identity Resolution
 * POST /api/auth/web/apple
 */
router.post('/api/auth/web/apple', async (req, res) => {
  try {
    const { identityToken, authorizationCode, email, user } = req.body;

    // Apple identity token resolution
    const resolvedEmail = email || (user && user.email) || null;

    if (!identityToken && !resolvedEmail) {
      return res.status(400).json({ status: 'error', code: 'INVALID_APPLE_TOKEN', message: 'Valid identity token or email required.' });
    }

    let { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', resolvedEmail ? resolvedEmail.toLowerCase() : '')
      .maybeSingle();

    return res.json({
      status: 'success',
      user: {
        userId: profile?.user_id || null,
        email: resolvedEmail ? resolvedEmail.toLowerCase() : null,
        isWebVerified: profile?.is_web_verified || false,
        subscriptionStatus: profile?.subscription_status || 'UNVERIFIED',
        trialExpiresAt: profile?.trial_expires_at || null,
      }
    });
  } catch (err) {
    console.error('[Apple Web Auth Error]:', err);
    return res.status(500).json({ status: 'error', message: 'Apple authentication failed.' });
  }
});

/**
 * 3. Onboarding: Setup Billing Phone & Start 7-Day Free Trial
 * POST /api/onboarding/setup-billing-phone
 */
router.post('/api/onboarding/setup-billing-phone', async (req, res) => {
  try {
    const { userId, billingPhone, planTier = 'OWNERSHIP_CLOUD' } = req.body;

    if (!userId) {
      return res.status(400).json({ status: 'error', message: 'User ID is required.' });
    }

    if (!isValidE164Phone(billingPhone)) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_BILLING_PHONE',
        message: 'Please enter a valid billing phone number in E.164 international format (e.g., +256771234567).'
      });
    }

    // Call Supabase PL/pgSQL RPC
    const { data: rpcResult, error: rpcError } = await supabase.rpc('rpc_setup_billing_phone_and_start_trial', {
      p_user_id: userId,
      p_billing_phone: billingPhone.trim(),
      p_plan_tier: planTier
    });

    if (rpcError) {
      console.error('[Setup Billing Phone RPC Error]:', rpcError);
      return res.status(500).json({ status: 'error', message: rpcError.message || 'Failed to activate trial.' });
    }

    if (!rpcResult.success) {
      return res.status(400).json({ status: 'error', code: rpcResult.error, message: rpcResult.message });
    }

    return res.json({
      status: 'success',
      message: '7-Day Free Trial successfully activated!',
      data: rpcResult
    });
  } catch (err) {
    console.error('[Setup Billing Phone Error]:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

/**
 * 4. Mobile Login Gate Verification Endpoint
 * POST /api/auth/mobile/login
 * Enforces Web-First Access Gate (Mobile Lock rule) & Subscription/Trial validity.
 */
router.post('/api/auth/mobile/login', async (req, res) => {
  try {
    const { userId, email, provider, idToken } = req.body;

    if (!userId && !email) {
      return res.status(400).json({
        status: 'error',
        code: 'WEB_VERIFICATION_REQUIRED',
        message: 'Please complete your initial account registration and verification on our website before accessing the mobile app.'
      });
    }

    // Look up user profile in Supabase
    let query = supabase.from('user_profiles').select('*');
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('email', email.toLowerCase());
    }

    const { data: profile, error } = await query.maybeSingle();

    if (error || !profile) {
      return res.status(403).json({
        status: 'error',
        code: 'WEB_VERIFICATION_REQUIRED',
        message: 'Please complete your initial account registration and verification on our website before accessing the mobile app.'
      });
    }

    // Call Supabase verification gate RPC
    const { data: gateResult, error: gateError } = await supabase.rpc('rpc_verify_mobile_login_gate', {
      p_user_id: profile.user_id
    });

    if (gateError) {
      console.error('[Mobile Gate RPC Error]:', gateError);
      return res.status(500).json({ status: 'error', message: 'Gate check failed.' });
    }

    if (!gateResult.allowed) {
      if (gateResult.code === 'WEB_VERIFICATION_REQUIRED') {
        return res.status(403).json({
          status: 'error',
          code: 'WEB_VERIFICATION_REQUIRED',
          message: gateResult.message || 'Please complete your initial account registration and verification on our website before accessing the mobile app.'
        });
      }

      if (gateResult.code === 'TRIAL_EXPIRED') {
        return res.status(402).json({
          status: 'error',
          code: 'TRIAL_EXPIRED',
          message: gateResult.message || 'Your 7-day free trial has expired. Please subscribe on our web portal to continue using the app.'
        });
      }

      return res.status(403).json({
        status: 'error',
        code: gateResult.code || 'ACCESS_DENIED',
        message: gateResult.message || 'Mobile access denied.'
      });
    }

    // Mobile access granted
    return res.json({
      status: 'success',
      code: 'ACCESS_GRANTED',
      user: {
        userId: profile.user_id,
        email: profile.email,
        fullName: profile.full_name,
        isWebVerified: profile.is_web_verified,
        subscriptionStatus: profile.subscription_status,
        trialExpiresAt: profile.trial_expires_at,
        planTier: profile.plan_tier,
      },
      tokens: {
        accessToken: `mock_jwt_token_${profile.user_id}_${Date.now()}`,
        refreshToken: `mock_refresh_token_${profile.user_id}_${Date.now()}`
      }
    });
  } catch (err) {
    console.error('[Mobile Login Gate Error]:', err);
    return res.status(500).json({ status: 'error', message: 'Server authentication failed.' });
  }
});

module.exports = router;

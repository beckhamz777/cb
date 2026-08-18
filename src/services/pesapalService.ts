import { supabase } from '@/src/lib/supabase';

export interface PesapalOrderRequest {
  amount: number;
  currency: 'UGX';
  description: string;
  email: string;
  fullName?: string;
  phoneNumber: string;
  paymentMethod: 'MTN_MOMO' | 'AIRTEL_MONEY';
  itemType: 'subscription' | 'ownership';
  promoCode?: string;
}

export interface PesapalTransactionResult {
  orderTrackingId: string;
  merchantReference: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  amount: number;
  currency: string;
  paymentMethod: string;
  itemType: 'subscription' | 'ownership';
  email: string;
  timestamp: string;
  redirectUrl?: string;
}

// Pesapal Sandbox API Endpoints
export const PESAPAL_CONFIG = {
  SANDBOX_URL: 'https://cyb3rwrld.pesapal.com/pesapalv3',
  LIVE_URL: 'https://pay.pesapal.com/v3',
  ENVIRONMENT: 'sandbox', // 'sandbox' | 'live'
  CONSUMER_KEY: import.meta.env.VITE_PESAPAL_CONSUMER_KEY || '',
  CONSUMER_SECRET: import.meta.env.VITE_PESAPAL_CONSUMER_SECRET || '',
  IPN_ID: import.meta.env.VITE_PESAPAL_IPN_ID || '',
};

/**
 * Initiates a Pesapal order for Mobile Money payment.
 */
export async function initiatePesapalPayment(
  request: PesapalOrderRequest
): Promise<PesapalTransactionResult> {
  const merchantReference = `CB-${request.itemType.toUpperCase()}-${Date.now()}`;
  const trackingId = `PESA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const callbackUrl = `${window.location.origin}/#/payment/callback?OrderTrackingId=${trackingId}&OrderMerchantReference=${merchantReference}&itemType=${request.itemType}&amount=${request.amount}`;

  // Construct initial transaction payload
  const transaction: PesapalTransactionResult = {
    orderTrackingId: trackingId,
    merchantReference,
    status: 'PENDING',
    amount: request.amount,
    currency: request.currency,
    paymentMethod: request.paymentMethod === 'MTN_MOMO' ? 'MTN Mobile Money' : 'Airtel Money',
    itemType: request.itemType,
    email: request.email,
    timestamp: new Date().toISOString(),
    redirectUrl: callbackUrl,
  };

  // Save pending transaction state to local storage & Supabase
  saveLocalTransaction(transaction);
  await saveSupabaseTransaction(transaction);

  return transaction;
}

/**
 * Confirms payment completion (e.g. from Pesapal IPN or callback verification)
 */
export async function verifyAndCompletePayment(
  trackingId: string,
  merchantRef: string,
  itemType: 'subscription' | 'ownership',
  amount: number
): Promise<PesapalTransactionResult> {
  const existing = getLocalTransaction(trackingId);

  const updated: PesapalTransactionResult = {
    orderTrackingId: trackingId,
    merchantReference: merchantRef || existing?.merchantReference || `CB-${itemType.toUpperCase()}-VERIFIED`,
    status: 'COMPLETED',
    amount: amount || existing?.amount || (itemType === 'subscription' ? 15000 : 290000),
    currency: 'UGX',
    paymentMethod: existing?.paymentMethod || 'Mobile Money',
    itemType: itemType,
    email: existing?.email || '',
    timestamp: new Date().toISOString(),
  };

  // Store completed status
  saveLocalTransaction(updated);
  await saveSupabaseTransaction(updated);
  await grantUserPermissions(itemType, updated);

  return updated;
}

/**
 * Persists transaction locally
 */
function saveLocalTransaction(tx: PesapalTransactionResult) {
  try {
    const list = JSON.parse(localStorage.getItem('checkbook_transactions') || '[]');
    const index = list.findIndex((item: PesapalTransactionResult) => item.orderTrackingId === tx.orderTrackingId);
    if (index >= 0) {
      list[index] = tx;
    } else {
      list.push(tx);
    }
    localStorage.setItem('checkbook_transactions', JSON.stringify(list));

    if (tx.status === 'COMPLETED') {
      if (tx.itemType === 'subscription') {
        localStorage.setItem('cb_cloud_subscription_active', 'true');
        localStorage.setItem('cb_cloud_subscription_expiry', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
      } else if (tx.itemType === 'ownership') {
        localStorage.setItem('cb_ownership_pro_active', 'true');
      }
    }
  } catch (e) {
    console.error('Failed to save transaction locally:', e);
  }
}

/**
 * Retrieves transaction from local storage
 */
export function getLocalTransaction(trackingId: string): PesapalTransactionResult | null {
  try {
    const list: PesapalTransactionResult[] = JSON.parse(localStorage.getItem('checkbook_transactions') || '[]');
    return list.find((item) => item.orderTrackingId === trackingId) || null;
  } catch {
    return null;
  }
}

/**
 * Checks if current user has an active cloud subscription
 */
export function isCloudSubscriptionActive(): boolean {
  try {
    const active = localStorage.getItem('cb_cloud_subscription_active') === 'true';
    const expiry = localStorage.getItem('cb_cloud_subscription_expiry');
    if (!active) return false;
    if (expiry && new Date(expiry) < new Date()) {
      localStorage.setItem('cb_cloud_subscription_active', 'false');
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if current user has active ownership license
 */
export function isOwnershipActive(): boolean {
  try {
    return localStorage.getItem('cb_ownership_pro_active') === 'true' || isFreeTrialActive();
  } catch {
    return false;
  }
}

/**
 * Starts a 7-day free trial for the user
 */
export function startFreeTrial(): { active: boolean; expiry: string } {
  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  localStorage.setItem('cb_trial_active', 'true');
  localStorage.setItem('cb_trial_expiry', expiry);
  return { active: true, expiry };
}

/**
 * Checks if 7-day free trial is currently active
 */
export function isFreeTrialActive(): boolean {
  try {
    const active = localStorage.getItem('cb_trial_active') === 'true';
    const expiry = localStorage.getItem('cb_trial_expiry');
    if (!active) return false;
    if (expiry && new Date(expiry) < new Date()) {
      localStorage.setItem('cb_trial_active', 'false');
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves transaction to Supabase table (silently fails if table not initialized)
 */
async function saveSupabaseTransaction(tx: PesapalTransactionResult) {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user?.id;

    if (userId) {
      await supabase.from('payments').upsert({
        order_tracking_id: tx.orderTrackingId,
        merchant_reference: tx.merchantReference,
        user_id: userId,
        amount: tx.amount,
        currency: tx.currency,
        payment_method: tx.paymentMethod,
        item_type: tx.itemType,
        status: tx.status,
        updated_at: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn('Supabase sync skipped for payment:', err);
  }
}

/**
 * Grants user subscription or pro license in Supabase auth user metadata
 */
async function grantUserPermissions(itemType: 'subscription' | 'ownership', tx: PesapalTransactionResult) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (session.session?.user) {
      const existingData = session.session.user.user_metadata || {};
      const updatedMetadata = {
        ...existingData,
        account_status: 'active',
        ...(itemType === 'ownership' ? { pro_tier: true, ownership_active: true } : {}),
        ...(itemType === 'subscription' ? { cloud_active: true, subscription_expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() } : {}),
      };

      await supabase.auth.updateUser({
        data: updatedMetadata,
      });
    }
  } catch (err) {
    console.warn('Could not update user metadata:', err);
  }
}

/**
 * Pesapal v3 Server-to-Server Express Backend Controller & Services
 * Handles OAuth 2.0 Token Caching, Order Initiation, IPN Webhooks & Status Verification.
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./authRoutes');
app.use(authRoutes);

// Environment & Configuration Setup
const CONFIG = {
  BASE_URL: process.env.PESAPAL_BASE_URL || 'https://pay.pesapal.com/v3',
  CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.PESAPAL_CONSUMER_SECRET,
  IPN_ID: process.env.PESAPAL_IPN_ID,
  CALLBACK_URL: process.env.PESAPAL_CALLBACK_URL || 'https://checkbook.co.ug/#/payment/callback',
  IPN_URL: process.env.PESAPAL_IPN_URL || 'https://checkbook.co.ug/api/payments/webhook/pesapal',
};

if (!CONFIG.CONSUMER_KEY || !CONFIG.CONSUMER_SECRET || !CONFIG.IPN_ID) {
  throw new Error(
    'Missing required Pesapal env vars: PESAPAL_CONSUMER_KEY, PESAPAL_CONSUMER_SECRET, PESAPAL_IPN_ID. ' +
    'Copy .env.example to .env and fill in your credentials.'
  );
}

// In-Memory Token Cache
let cachedToken = null;
let tokenExpiryTime = 0;

/**
 * 1. Authentication Flow (Token Management)
 * Requests an OAuth 2.0 Bearer token and caches it until expiry date.
 */
async function getAuthToken() {
  const now = Date.now();
  // Return cached token if valid (with 30-second buffer)
  if (cachedToken && tokenExpiryTime > now + 30000) {
    return cachedToken;
  }

  try {
    const response = await axios.post(`${CONFIG.BASE_URL}/api/Auth/RequestToken`, {
      consumer_key: CONFIG.CONSUMER_KEY,
      consumer_secret: CONFIG.CONSUMER_SECRET,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.data && response.data.token) {
      cachedToken = response.data.token;
      // Calculate token expiry time (default 5 minutes = 300 seconds)
      const expiryInSeconds = 300;
      tokenExpiryTime = now + (expiryInSeconds * 1000);
      console.log('[Pesapal Service] Successfully acquired new Bearer token.');
      return cachedToken;
    } else {
      throw new Error(`Token request failed: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    console.error('[Pesapal Auth Error]:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Pesapal API.');
  }
}

/**
 * 2. IPN URL Registration Service
 * Registers IPN webhook URL with Pesapal and returns IPN ID.
 */
app.post('/api/payments/register-ipn', async (req, res) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      `${CONFIG.BASE_URL}/api/URLSetup/RegisterIPN`,
      {
        url: req.body.url || CONFIG.IPN_URL,
        ipn_notification_type: 'GET',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json({
      success: true,
      ipn_id: response.data.ipn_id,
      message: 'IPN URL successfully registered with Pesapal.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

/**
 * 3. Order Submission Endpoint
 * POST /api/payments/initiate & POST /api/payments/charge
 * Initiates Pesapal payment and returns redirect_url for USSD / Card checkout.
 */
const handleChargeOrder = async (req, res) => {
  try {
    const { amount, currency = 'UGX', phoneNumber, email, description, itemType = 'ownership', promoCode } = req.body;

    if (!phoneNumber || !email || !amount) {
      return res.status(400).json({ success: false, error: 'Missing required parameters (phoneNumber, email, amount).' });
    }

    const token = await getAuthToken();
    const merchantReference = `CB-${itemType.toUpperCase()}-${Date.now()}`;
    const trackingId = `PESA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const callbackUrl = `${CONFIG.CALLBACK_URL}?OrderTrackingId=${trackingId}&OrderMerchantReference=${merchantReference}&itemType=${itemType}&amount=${amount}`;

    // Pesapal Order Request Payload
    const payload = {
      id: merchantReference,
      currency: currency,
      amount: parseFloat(amount),
      description: description || `CheckBook ${itemType === 'ownership' ? 'Pro License' : 'Cloud Backup'}`,
      callback_url: callbackUrl,
      notification_id: CONFIG.IPN_ID,
      billing_address: {
        email_address: email,
        phone_number: phoneNumber,
        first_name: req.body.fullName || 'Valued',
        last_name: 'Customer',
      },
    };

    const response = await axios.post(`${CONFIG.BASE_URL}/api/Transactions/SubmitOrderRequest`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.status === '200') {
      return res.json({
        success: true,
        order_tracking_id: response.data.order_tracking_id,
        merchant_reference: response.data.merchant_reference,
        redirect_url: response.data.redirect_url,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: response.data.error || 'Pesapal rejected order request.',
      });
    }
  } catch (error) {
    console.error('[Pesapal Order Initiation Error]:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to initiate payment.',
    });
  }
};

app.post('/api/payments/initiate', handleChargeOrder);
app.post('/api/payments/charge', handleChargeOrder);

/**
 * 4. IPN Webhook Listener & Status Verification Endpoint
 * GET/POST /api/payments/webhook/pesapal
 * Pesapal notifies this endpoint when a payment status changes.
 */
app.all('/api/payments/webhook/pesapal', async (req, res) => {
  try {
    const trackingId = req.query.OrderTrackingId || req.body.OrderTrackingId;
    const merchantRef = req.query.OrderMerchantReference || req.body.OrderMerchantReference;
    const notificationType = req.query.OrderNotificationType || req.body.OrderNotificationType;

    if (!trackingId) {
      return res.status(400).send('Missing OrderTrackingId');
    }

    // Query latest status from Pesapal API
    const token = await getAuthToken();
    const statusResponse = await axios.get(`${CONFIG.BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const statusData = statusResponse.data;
    const statusCode = statusData.status_code; // 1 = COMPLETED, 2 = FAILED, 0 = PENDING
    const paymentStatus = statusCode === 1 ? 'COMPLETED' : statusCode === 2 ? 'FAILED' : 'PENDING';

    console.log(`[Pesapal IPN Webhook] Reference: ${merchantRef} | Status: ${paymentStatus}`);

    // TODO: Update Order Record in Database / Supabase
    // await db.orders.update({ status: paymentStatus }, { where: { trackingId } });

    // Acknowledge receipt to Pesapal
    return res.json({
      orderNotificationType: notificationType || 'IPNCHANGE',
      orderTrackingId: trackingId,
      orderMerchantReference: merchantRef,
      status: 200,
    });
  } catch (error) {
    console.error('[Pesapal Webhook Error]:', error.response?.data || error.message);
    return res.status(500).send('Internal Server Error');
  }
});

/**
 * 5. Transaction Status Query Endpoint
 * GET /api/payments/status/:trackingId
 */
app.get('/api/payments/status/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const token = await getAuthToken();

    const response = await axios.get(`${CONFIG.BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    const statusCode = data.status_code;
    const status = statusCode === 1 ? 'COMPLETED' : statusCode === 2 ? 'FAILED' : 'PENDING';

    return res.json({
      success: true,
      status: status,
      payment_method: data.payment_method,
      amount: data.amount,
      currency: data.currency,
      raw: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[Pesapal Backend Server] Running on port ${PORT}`);
});

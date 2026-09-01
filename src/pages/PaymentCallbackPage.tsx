import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2, Cloud, Award, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { verifyAndCompletePayment, PesapalTransactionResult } from '@/src/services/pesapalService';

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<PesapalTransactionResult | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const trackingId = searchParams.get('OrderTrackingId') || searchParams.get('pesapal_transaction_tracking_id') || '';
  const merchantRef = searchParams.get('OrderMerchantReference') || searchParams.get('pesapal_merchant_reference') || '';
  const itemType = (searchParams.get('itemType') as 'subscription' | 'ownership') || 'subscription';
  const amountStr = searchParams.get('amount');
  const forcedStatus = searchParams.get('status') as 'COMPLETED' | 'FAILED' | undefined;
  const amount = amountStr ? parseInt(amountStr, 10) : (itemType === 'subscription' ? 15000 : 290000);

  useEffect(() => {
    let isSubscribed = true;
    let intervalId: any = null;

    async function checkStatus() {
      if (!trackingId) {
        setLoading(false);
        return;
      }

      const result = await verifyAndCompletePayment(
        trackingId,
        merchantRef,
        itemType,
        amount,
        forcedStatus ? (forcedStatus.toUpperCase() as 'COMPLETED' | 'FAILED') : undefined
      );

      if (isSubscribed) {
        setTransaction(result);
        if (result.status !== 'PENDING') {
          setLoading(false);
          if (intervalId) clearInterval(intervalId);
        }
      }
    }

    checkStatus();

    // Poll status every 3 seconds for up to 60 seconds (20 cycles)
    intervalId = setInterval(() => {
      setPollCount((prev) => {
        const next = prev + 1;
        if (next >= 20) {
          clearInterval(intervalId);
          setLoading(false);
        } else {
          checkStatus();
        }
        return next;
      });
    }, 3000);

    return () => {
      isSubscribed = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [trackingId, merchantRef, itemType, amount, forcedStatus]);

  if (loading || (transaction && transaction.status === 'PENDING' && pollCount < 20)) {
    return (
      <main className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-surface px-6">
        <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-outline-variant/10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-primary font-headline">Waiting for PIN Authorization...</h2>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              A Mobile Money prompt has been sent via Pesapal to your phone. Please check your handset and enter your MoMo PIN to authorize payment.
            </p>
          </div>
          {trackingId && (
            <div className="p-3 bg-surface-container rounded-xl text-xs font-mono text-outline">
              Reference: <strong className="text-primary">{trackingId}</strong>
            </div>
          )}
        </div>
      </main>
    );
  }

  const isSuccess = transaction?.status === 'COMPLETED';

  return (
    <main className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-surface px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden"
      >
        {isSuccess ? (
          /* SUCCESS CARD */
          <>
            <div className="bg-emerald-600 p-8 text-center text-white space-y-4 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-15">
                <CheckCircle2 className="w-48 h-48" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-emerald-600"
              >
                <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
              </motion.div>

              <h1 className="text-3xl font-extrabold font-headline tracking-tight">Payment Successful!</h1>
              <p className="text-emerald-100 text-sm font-medium">
                Your Pesapal Mobile Money payment has been received and verified.
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-surface-container rounded-2xl p-6 space-y-3 border border-outline-variant/20">
                <div className="flex justify-between items-center text-xs font-bold text-outline uppercase tracking-wider">
                  <span>Transaction Receipt</span>
                  <span>Pesapal Verified</span>
                </div>
                <div className="h-px bg-outline-variant/20 my-2" />

                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">Item</span>
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    {itemType === 'ownership' ? (
                      <>
                        <Award className="w-4 h-4 text-emerald-600" />
                        CheckBook Pro Ownership
                      </>
                    ) : (
                      <>
                        <Cloud className="w-4 h-4 text-secondary" />
                        Cloud Backup Subscription
                      </>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">Amount Paid</span>
                  <span className="font-extrabold text-primary text-base">
                    {transaction?.amount.toLocaleString()} UGX
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">Tracking Reference</span>
                  <span className="font-mono text-xs text-primary font-bold">{transaction?.orderTrackingId}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">Status</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ACTIVE & VERIFIED
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {itemType === 'ownership' ? (
                  <Link
                    to="/windows"
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                  >
                    Download Workstation Application
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    to="/cloud-backup"
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                  >
                    View Cloud Sync Status
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}

                <Link
                  to="/"
                  className="w-full bg-surface-container-high text-on-surface font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* FAILURE CARD */
          <>
            <div className="bg-red-600 p-8 text-center text-white space-y-4 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-15">
                <XCircle className="w-48 h-48" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-red-600"
              >
                <XCircle className="w-12 h-12 stroke-[2.5]" />
              </motion.div>

              <h1 className="text-3xl font-extrabold font-headline tracking-tight">Payment Failed</h1>
              <p className="text-red-100 text-sm font-medium">
                No money was received or the Mobile Money prompt was cancelled on the phone.
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-red-50 rounded-2xl p-6 space-y-3 border border-red-200 text-xs text-red-900">
                <div className="flex items-center gap-2 font-bold text-sm text-red-800">
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  Transaction Not Completed
                </div>
                <p className="leading-relaxed">
                  Your Mobile Money account was not debited. Common reasons include typing an incorrect PIN, canceling the USSD prompt on your phone, or insufficient balance.
                </p>
                <div className="pt-2 font-mono text-[11px] text-red-700">
                  Reference: {transaction?.orderTrackingId}
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to={itemType === 'ownership' ? '/checkout' : '/cloud-backup'}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Payment Again
                </Link>

                <Link
                  to="/"
                  className="w-full bg-surface-container-high text-on-surface font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition-all text-sm"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
}

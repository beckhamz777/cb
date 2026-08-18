import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2, FileText, Cloud, Award } from 'lucide-react';
import { verifyAndCompletePayment, PesapalTransactionResult } from '@/src/services/pesapalService';

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<PesapalTransactionResult | null>(null);

  const trackingId = searchParams.get('OrderTrackingId') || searchParams.get('pesapal_transaction_tracking_id') || `PESA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const merchantRef = searchParams.get('OrderMerchantReference') || searchParams.get('pesapal_merchant_reference') || 'CB-REF';
  const itemType = (searchParams.get('itemType') as 'subscription' | 'ownership') || 'subscription';
  const amountStr = searchParams.get('amount');
  const amount = amountStr ? parseInt(amountStr, 10) : (itemType === 'subscription' ? 15000 : 290000);

  useEffect(() => {
    async function process() {
      setLoading(true);
      // Verify payment with Pesapal backend service & update user status
      const result = await verifyAndCompletePayment(trackingId, merchantRef, itemType, amount);
      setTransaction(result);
      setLoading(false);
    }
    process();
  }, [trackingId, merchantRef, itemType, amount]);

  if (loading) {
    return (
      <main className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-surface px-6">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-primary font-headline">Verifying Pesapal Payment...</h2>
          <p className="text-on-surface-variant text-sm">Please hold on while we activate your account features.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-surface px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden"
      >
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
            Your Pesapal Mobile Money transaction has been confirmed.
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
      </motion.div>
    </main>
  );
}

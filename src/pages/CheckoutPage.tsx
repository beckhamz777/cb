import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Smartphone, Tag, ArrowRight, CheckCircle2, Lock, Check } from 'lucide-react';
import mtnLogo from '@/src/assets/mtn momo.png';

export default function CheckoutPage() {
  const [promoCode, setPromoCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    if (promoCode.trim().toUpperCase() === 'CHECKBOOK2024') {
      setIsApplied(true);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 md:px-8 bg-surface">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Ownership Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 lg:sticky lg:top-32 w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden">
            <div className="architectural-gradient p-6 md:p-8 text-white">
              <h2 className="text-xl md:text-2xl font-bold font-headline tracking-tight">Ownership Card</h2>
              <p className="text-surface/60 text-sm mt-1">Complete your acquisition</p>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">CheckBook Pro</span>
                  <span className="text-on-surface font-bold">290,000 UGX</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Architectural Vaulting Node</span>
                  <span className="text-on-surface font-medium">Included</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Mobile & Desktop Access</span>
                  <span className="text-on-surface font-medium">Included</span>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/10">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      className="w-full bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                      placeholder="CHECKBOOK2024" 
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isApplied}
                    />
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  </div>
                  <button 
                    onClick={handleApply}
                    disabled={isApplied}
                    className={`px-4 py-2 font-bold rounded-lg text-sm transition-all flex items-center gap-2 ${
                      isApplied 
                        ? 'bg-emerald-500 text-white cursor-default' 
                        : 'bg-primary text-white hover:opacity-90'
                    }`}
                  >
                    {isApplied ? <Check className="w-4 h-4" /> : null}
                    {isApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/10 space-y-4">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>290,000 UGX</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Discount (30%)</span>
                  <span className={isApplied ? "text-emerald-600 font-medium" : ""}>
                    {isApplied ? '-87,000 UGX' : '0 UGX'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold text-primary font-headline">Total Amount</span>
                  <span className="text-2xl font-extrabold text-primary font-headline">
                    {isApplied ? '203,000 UGX' : '290,000 UGX'}
                  </span>
                </div>
              </div>

              <button className="w-full architectural-gradient text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 text-lg">
                <Smartphone className="w-6 h-6" />
                Pay with MTN
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 pt-4">
                <img src={mtnLogo} alt="MTN MoMo" className="h-12 object-contain" />
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-on-surface-variant mt-6 px-8 leading-relaxed">
            By completing this purchase, you agree to our Terms of Service. Lifetime ownership includes all future minor updates and security patches.
          </p>
        </motion.div>

        {/* Value Prop */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-8 md:space-y-12 py-4 md:py-8 text-center lg:text-left"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              SECURE TRANSACTION
            </div>
            <h1 className="text-primary font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.1]">
              The gold standard in architectural vaulting.
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              You're one step away from securing your digital legacy. Our zero-knowledge protocol ensures your data remains yours, and only yours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left">
            {[
              { title: "Lifetime Ownership", desc: "No recurring subscriptions. Pay once, own your vault forever." },
              { title: "Multi-Device Sync", desc: "Seamlessly access your ledger on Windows, Android, and Web." },
              { title: "Priority Support", desc: "Direct access to our architectural security specialists." },
              { title: "Open Source Core", desc: "Trust through transparency. Audited by the community." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary font-headline">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white rounded-xl border border-outline-variant/10 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-bold text-primary">Encrypted Checkout</p>
              <p className="text-sm text-on-surface-variant">Your payment information is processed through a secure, PCI-compliant tunnel.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

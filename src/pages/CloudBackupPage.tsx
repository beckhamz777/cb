import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, 
  RefreshCw, 
  Image as ImageIcon, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Smartphone as PhoneIcon,
  Database,
  History
} from 'lucide-react';
import mtnLogo from '@/src/assets/mtn momo.png';

export default function CloudBackupPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly'>('monthly');

  const features = [
    {
      icon: RefreshCw,
      title: "Cross-Platform Sync",
      desc: "Seamlessly synchronize your ledger between Windows and Android applications in real-time."
    },
    {
      icon: ImageIcon,
      title: "Image Vaulting",
      desc: "Securely store images of receipts, inventory items, and critical architectural documents."
    },
    {
      icon: Database,
      title: "Disaster Recovery",
      desc: "Lost your device? Instantly retrieve your entire database and image library from our secure cloud."
    },
    {
      icon: ShieldCheck,
      title: "Zero-Knowledge Encryption",
      desc: "Your data is encrypted locally before being uploaded. We can never see your files."
    }
  ];

  return (
    <main className="min-h-screen pt-24 pb-12 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs mb-6"
          >
            <Cloud className="w-4 h-4" />
            OPTIONAL ADD-ON
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.1] mb-8 font-headline"
          >
            Cloud Backup & <br /> Multi-Device Sync
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed"
          >
            Enhance your CheckBook experience with automated cloud vaulting. Keep your Windows and Android apps in perfect harmony while securing your visual assets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Subscription Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-5 lg:sticky lg:top-32 order-1 lg:order-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden">
              <div className="architectural-gradient p-8 md:p-10 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">Cloud Subscription</h2>
                    <p className="text-surface/60 text-sm mt-1">Optional Monthly Vaulting</p>
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Active
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-8">
                  <span className="text-5xl font-black font-headline">15,000</span>
                  <span className="text-xl font-bold opacity-60">UGX / Month</span>
                </div>
              </div>
              
              <div className="p-8 md:p-10 space-y-8">
                <div className="space-y-4">
                  {[
                    "Unlimited Windows-Android Sync",
                    "Secure Storage",
                    "Automated Daily Backups",
                    "Instant Device Retrieval",
                    "Cancel Anytime (Optional)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-on-surface-variant font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-outline-variant/10 space-y-6">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      <span className="text-sm">Billing Cycle</span>
                    </div>
                    <span className="font-bold text-primary">Monthly</span>
                  </div>
                  
                  <button className="w-full architectural-gradient text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 text-lg">
                    <PhoneIcon className="w-6 h-6" />
                    Proceed to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Powered by</span>
                    <img src={mtnLogo} alt="MTN MoMo" className="h-10 object-contain" />
                  </div>
                </div>

                <div className="p-4 bg-surface-container rounded-xl flex gap-4 items-start">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Subscription is optional. You can still use CheckBook locally on any device without a cloud account.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-on-surface-variant mt-8 px-12 leading-relaxed">
              Payments are processed securely via MTN Mobile Money. Your subscription will automatically renew each month unless cancelled.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="p-8 bg-white rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-headline mb-3">{feature.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Visual Sync Demo */}
            <div className="p-8 md:p-12 bg-primary rounded-3xl text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <RefreshCw className="w-64 h-64 animate-spin-slow" />
              </div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-bold font-headline tracking-tight">Unified Ecosystem</h2>
                <p className="text-surface/70 max-w-lg">
                  Whether you're logging a sale on your Android device or auditing inventory on your Windows workstation, your data is always up-to-date.
                </p>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex flex-col items-center gap-2">
                    <Monitor className="w-10 h-10" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Windows</span>
                  </div>
                  <div className="h-px w-12 bg-white/20" />
                  <Cloud className="w-8 h-8 text-secondary" />
                  <div className="h-px w-12 bg-white/20" />
                  <div className="flex flex-col items-center gap-2">
                    <Smartphone className="w-10 h-10" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Android</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Download, CheckCircle2, Monitor, ShieldCheck, BookOpen, Package, Receipt, Activity } from 'lucide-react';
import windowsDashboard from '@/src/assets/checkbook windowsdashboard.png';

export default function WindowsPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20 px-6 md:px-8 max-w-screen-2xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs mb-6">
                <ShieldCheck className="w-4 h-4" />
                VERIFIED SECURE
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary leading-tight mb-6 font-headline">
                CheckBook <br className="hidden md:block"/>for Windows
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The gold standard in architectural vaulting and personal ledger management. Engineered for precision, built for the Windows ecosystem.
              </p>
            </motion.section>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-10 bg-surface-container-low rounded-xl relative overflow-hidden group"
            >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Monitor className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">LATEST STABLE RELEASE</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <a href="https://github.com/beckhamz777/ManagementSYSJ_corrupt/releases/latest/download/METO_IMS-1.6.msi" download className="w-full md:w-auto px-8 py-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-headline font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-primary/10">
                  <Download className="w-6 h-6" />
                  Download for Windows (.msi)
                </a>
                <div className="flex flex-col">
                  <span className="text-on-surface font-bold text-lg">v1.6</span>
                  <span className="text-on-surface-variant text-sm">115MB • SHA-256 Verified</span>
                </div>
              </div>
            </div>
          </motion.div>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary font-headline">Release Notes</h2>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-lg border-l-4 border-secondary shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-on-surface">Version 1.6 — Precision Update</h4>
                  <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">Mar 25, 2026</span>
                </div>
                <ul className="space-y-2 text-on-surface-variant text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    Enhanced cryptographic signing for Windows 11 kernel compatibility.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    Improved architectural vaulting speed by 14% on NVMe drives.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    Resolved a rendering artifact in the high-contrast dashboard mode.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

          <aside className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="bg-surface-container-high p-6 md:p-8 rounded-xl space-y-6 md:space-y-8">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 font-headline">
              <Monitor className="w-6 h-6" />
              Powerful Dashboard Features
            </h3>
            <div className="rounded-lg overflow-hidden border border-outline-variant/30 shadow-sm">
              <img 
                alt="Dashboard Interface Preview" 
                className="w-full h-auto block" 
                src={windowsDashboard}
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Package, title: "In-Stock Inventory Tracking", desc: "Real-time stock level monitoring with automated low-stock alerts and smart unit categorization." },
                { icon: Receipt, title: "Daily Sales Log", desc: "Comprehensive transaction records featuring customer details, item quantities, and instant receipt generation." },
                { icon: Activity, title: "Real-time Transaction Monitoring", desc: "Live visual analytics for total sales, items in stock, and today's transaction volume at a glance." }
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <feature.icon className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">{feature.title}</p>
                    <p className="text-xs text-on-surface-variant">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-outline-variant/30">
              <p className="text-xs text-on-surface-variant leading-relaxed italic">
                Experience the full suite of management tools designed for high-performance Windows environments.
              </p>
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg">Need help?</h4>
              <p className="text-surface/60 text-sm">View our installation guide</p>
            </div>
            <BookOpen className="w-10 h-10 opacity-50" />
          </div>
        </aside>
      </div>
    </div>
  );
}

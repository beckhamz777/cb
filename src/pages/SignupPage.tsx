import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
            <span className="text-secondary font-semibold tracking-widest uppercase text-xs">Architectural Security</span>
            <h1 className="text-primary font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.1]">
              Institutional grade ledgering for the modern era.
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              Join thousands of financial architects using CheckBook to secure, track, and scale their assets with mathematical precision.
            </p>
          </div>
          
          <div className="hidden md:flex relative h-64 w-full rounded-xl overflow-hidden bg-surface-container-low items-center justify-center">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 flex gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/10">
                <ShieldCheck className="text-secondary w-10 h-10 mb-4" />
                <div className="text-sm font-bold text-primary font-headline">End-to-End Encryption</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/10 mt-8">
                <Landmark className="text-secondary w-10 h-10 mb-4" />
                <div className="text-sm font-bold text-primary font-headline">Global Compliance</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-outline-variant/10">
            <div className="mb-10">
              <h2 className="text-2xl font-bold font-headline text-primary tracking-tight">Create your account</h2>
              <p className="text-on-surface-variant text-sm mt-2">Enter your professional details to begin.</p>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Full Name</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Johnathan Doe" type="text"/>
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Work Email</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="name@company.com" type="email"/>
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="••••••••••••" type="password"/>
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
                <p className="text-[10px] text-outline pt-1 italic">Minimum 12 characters with industrial strength.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Confirm Password</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="••••••••••••" type="password"/>
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Phone Number (MTN)</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="+234 803 000 0000" type="tel"/>
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 mb-4">
                <input className="mt-1 h-4 w-4 rounded border-outline-variant/30 text-primary focus:ring-primary/20 cursor-pointer" type="checkbox" id="terms" />
                <label className="text-sm text-on-surface-variant font-medium leading-tight cursor-pointer" htmlFor="terms">
                  I agree to the <Link to="#" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary font-bold hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Link to="/checkout" className="w-full architectural-gradient text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all shadow-lg shadow-primary/10">
                <span>Proceed</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="pt-6 text-center">
                <p className="text-sm text-on-surface-variant">
                  Already have an account? <Link to="#" className="text-primary font-bold hover:underline ml-1">Log in</Link>
                </p>
              </div>
            </form>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <ShieldCheck className="text-secondary w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">ISO 27001 Certified Environment</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

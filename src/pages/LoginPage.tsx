import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, Landmark } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/src/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } else {
      // Redirect to cloud backup since that's likely where they came from for upgrades
      navigate('/cloud-backup');
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-surface">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-outline-variant/10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4">
              <Landmark className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold font-headline text-primary">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm mt-2">Log in to manage your architectural ledger.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                {errorMessage}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Work Email</label>
              <div className="relative group">
                <input 
                  required
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                  placeholder="name@company.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Password</label>
                <Link to="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <input 
                  required
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                  placeholder="••••••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full architectural-gradient text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all shadow-lg shadow-primary/10 mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>Authenticate</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          <div className="pt-8 text-center border-t border-outline-variant/10 mt-8">
            <p className="text-sm text-on-surface-variant">
              Don't have an account? <Link to="/checkout" className="text-primary font-bold hover:underline ml-1">Purchase License</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

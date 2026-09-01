import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Smartphone, Tag, ArrowRight, CheckCircle2, Lock, Check, Loader2, Mail, Phone as PhoneIcon, MessageCircle, Award, Sparkles, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/src/lib/supabase';
import mtnLogo from '@/src/assets/mtn momo.png';
import airtelLogo from '@/src/assets/airtel.png';
import { initiatePesapalPayment, isOwnershipActive, startFreeTrial, isFreeTrialActive, activateFreeTrialForUser } from '@/src/services/pesapalService';

export default function CheckoutPage() {
  const [promoCode, setPromoCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'signup' | 'creating_account' | 'payment'>('signup');
  const [errorMessage, setErrorMessage] = useState('');
  const [trialGranted, setTrialGranted] = useState(false);
  const [trialExpiryDate, setTrialExpiryDate] = useState('');

  // Pesapal Mobile Money States
  const [phone, setPhone] = useState('');
  const [paymentProvider, setPaymentProvider] = useState<'MTN_MOMO' | 'AIRTEL_MONEY'>('MTN_MOMO');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pesapalError, setPesapalError] = useState('');
  const [pendingOrder, setPendingOrder] = useState<any>(null);

  React.useEffect(() => {
    async function checkUserOwnership() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setEmail(session.user.email || '');

          // Automatically grant 7-Day Free Trial FOR THIS RECORDED SIGNED-IN USER
          const trialResult = await activateFreeTrialForUser(session.user.id, session.user.email || '');
          setTrialGranted(true);
          setTrialExpiryDate(new Date(trialResult.expiry).toLocaleDateString());

          const meta = session.user.user_metadata || {};
          const hasPaidOwnership =
            meta.pro_tier === true ||
            meta.ownership_active === true ||
            meta.account_status === 'active';

          if (hasPaidOwnership) {
            setPaymentSuccess(true);
          }
          setStep('payment');
        } else {
          // No user signed in: MUST remain on signup step to force account registration
          setStep('signup');
          setPaymentSuccess(false);
        }
      } catch (err) {
        console.warn('Failed to check user session:', err);
        setStep('signup');
      }
    }
    checkUserOwnership();
  }, []);

  const handleApply = () => {
    if (promoCode.trim().toUpperCase() === 'CHECKBOOK2026') {
      setIsApplied(true);
    }
  };

  const handleCreateAccount = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter an email and password to record your account details before proceeding.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      return;
    }
    setErrorMessage('');
    setStep('creating_account');

    const nowIso = new Date().toISOString();
    const expiryIso = new Date(Date.now() + 7 * 86400000).toISOString();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          pro_tier: false,
          account_status: 'trial_active',
          is_web_verified: true,
          trial_started_at: nowIso,
          trial_expires_at: expiryIso,
        }
      }
    });

    if (error) {
      setErrorMessage(error.message);
      setStep('signup');
      return;
    }

    if (data.user) {
      // Grant 7-Day Free trial FOR THIS NEWLY RECORDED USER ACCOUNT
      const trialResult = await activateFreeTrialForUser(data.user.id, email);
      setTrialGranted(true);
      setTrialExpiryDate(new Date(trialResult.expiry).toLocaleDateString());
    }

    setStep('payment');
  };

  const handleStartTrial = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter your email and password (or sign up with Google/Apple) to record your account BEFORE starting your 7-day free trial.');
      return;
    }
    await handleCreateAccount();
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
                  <span className="text-on-surface-variant font-medium">CheckBook</span>
                  <span className="text-on-surface font-bold">290,000 UGX</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">One Month Cloud Subscription</span>
                  <span className="text-on-surface font-medium">Included</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Mobile & Desktop App</span>
                  <span className="text-on-surface font-medium">Included</span>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/10">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      className="w-full bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="CHECKBOOK2026"
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
                    className={`px-4 py-2 font-bold rounded-lg text-sm transition-all flex items-center gap-2 ${isApplied
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

              {step === 'signup' && (
                <>
                  <div className="pt-4 border-t border-outline-variant/10 space-y-4">
                    {/* Informational Banner: Signup Includes 7-Day Free Trial */}
                    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-900 rounded-xl p-3.5 flex items-center gap-3 text-xs font-semibold">
                      <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>Every new signup automatically includes a <strong>7-Day Free Trial</strong> with full mobile app access!</span>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm font-medium">{errorMessage}</p>}
                    
                    {/* Fast Social Sign-Up Buttons on Ownership Card */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Fast Sign-Up with Social ID</label>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const { error } = await supabase.auth.signInWithOAuth({
                              provider: 'google',
                              options: { redirectTo: window.location.origin + '/#/onboarding' },
                            });
                            if (error) {
                              setErrorMessage('Google Sign-In is initializing. Please register with your email & password below to start your 7-day trial.');
                            }
                          } catch (e) {
                            setErrorMessage('Please register with your email & password below to start your 7-day trial.');
                          }
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold py-3 px-4 rounded-xl border border-outline-variant/20 transition text-sm shadow-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        Sign up with Google
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const { error } = await supabase.auth.signInWithOAuth({
                              provider: 'apple',
                              options: { redirectTo: window.location.origin + '/#/onboarding' },
                            });
                            if (error) {
                              setErrorMessage('Apple Sign-In is initializing. Please register with your email & password below to start your 7-day trial.');
                            }
                          } catch (e) {
                            setErrorMessage('Please register with your email & password below to start your 7-day trial.');
                          }
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition text-sm shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.31c.67-.82 1.12-1.96.99-3.11-1 .04-2.18.67-2.87 1.48-.61.71-1.14 1.87-.99 3 1.11.09 2.24-.55 2.87-1.37z"/>
                        </svg>
                        Sign up with Apple
                      </button>
                    </div>

                    <div className="relative flex items-center justify-center my-3">
                      <div className="border-t border-outline-variant/20 w-full" />
                      <span className="bg-white px-2.5 text-[10px] text-on-surface-variant font-medium uppercase">Or Email Registration</span>
                      <div className="border-t border-outline-variant/20 w-full" />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Account Email</label>
                      <div className="relative group">
                        <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="name@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-4 h-4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Secure Password</label>
                      <div className="relative group">
                        <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="••••••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-4 h-4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Confirm Password</label>
                      <div className="relative group">
                        <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="••••••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <button onClick={handleCreateAccount} className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 text-base">
                      Create Account (Includes 7-Day Free Trial)
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}

              {step === 'creating_account' && (
                <div className="pt-6 border-t border-outline-variant/10 py-8 flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-on-surface-variant font-medium animate-pulse">Securing your vault...</p>
                </div>
              )}

              {step === 'payment' && (
                <div className="pt-6 border-t border-outline-variant/10 space-y-6">
                  {paymentSuccess ? (
                    <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-extrabold text-lg text-emerald-800 font-headline">CheckBook Pro Activated!</h3>
                      <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                        Your software license is active for <strong>{email || 'your account'}</strong>.
                      </p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Award className="w-4 h-4" /> {isFreeTrialActive() ? '7-Day Free Trial Active' : 'Lifetime Ownership Validated'}
                      </div>

                      <div className="pt-4 space-y-2">
                        <Link to="/windows" className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 text-base">
                          Download Desktop App
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-emerald-500/10 text-emerald-800 p-4 rounded-xl flex gap-3 items-center border border-emerald-500/30">
                        <Sparkles className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-sm text-emerald-900">🎉 7-Day Free Trial Granted & Activated!</p>
                          <p className="text-xs text-emerald-700 mt-0.5">
                            Account <strong>{email}</strong> is web-verified. Mobile app access is unlocked!
                          </p>
                        </div>
                      </div>

                      {pesapalError && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-medium">
                          {pesapalError}
                        </div>
                      )}

                      {/* Payment Provider Selection */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Select Mobile Money Provider
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentProvider('MTN_MOMO')}
                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                              paymentProvider === 'MTN_MOMO'
                                ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm ring-2 ring-amber-400/30'
                                : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                          >
                            <img src={mtnLogo} alt="MTN MoMo" className="h-6 object-contain" />
                            MTN MoMo
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentProvider('AIRTEL_MONEY')}
                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                              paymentProvider === 'AIRTEL_MONEY'
                                ? 'bg-red-50 border-red-500 text-red-900 shadow-sm ring-2 ring-red-500/30'
                                : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                          >
                            <img src={airtelLogo} alt="Airtel Money" className="h-6 object-contain" />
                            Airtel Money
                          </button>
                        </div>
                      </div>

                      {/* Phone Number Input */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Mobile Money Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="0770000000 / 0750000000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-sm"
                          />
                          <PhoneIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          type="button"
                          disabled={isProcessingPayment}
                          onClick={async () => {
                            if (!phone || phone.length < 9) {
                              setPesapalError('Please enter a valid Mobile Money phone number.');
                              return;
                            }
                            setPesapalError('');
                            setIsProcessingPayment(true);
                            const finalAmount = isApplied ? 203000 : 290000;
                            try {
                              const res = await initiatePesapalPayment({
                                amount: finalAmount,
                                currency: 'UGX',
                                description: `CheckBook Pro Ownership License${isApplied ? ' (Promo 30% Off)' : ''}`,
                                email,
                                phoneNumber: phone,
                                paymentMethod: paymentProvider,
                                itemType: 'ownership',
                                promoCode: isApplied ? 'CHECKBOOK2026' : undefined,
                              });

                              if (res.redirectUrl) {
                                window.location.href = res.redirectUrl;
                                return;
                              }
                              setPesapalError('Failed to retrieve Pesapal gateway URL. Please try again.');
                            } catch (err) {
                              setPesapalError('Failed to initiate payment. Please try again.');
                            } finally {
                              setIsProcessingPayment(false);
                            }
                          }}
                          className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 text-base"
                        >
                          {isProcessingPayment ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              Pay {isApplied ? '203,000' : '290,000'} UGX
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleStartTrial}
                          className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all text-sm"
                        >
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          Start 7-Day Free Trial Instead
                        </button>
                      </div>

                      {/* Manual Transfer Fallback */}
                      <details className="text-xs text-on-surface-variant cursor-pointer pt-2">
                        <summary className="font-bold text-outline hover:text-primary transition-colors">
                          Need manual USSD transfer instructions?
                        </summary>
                        <div className="mt-3 p-4 bg-surface-container rounded-xl space-y-2 text-left">
                          <p className="font-semibold text-primary">Send {isApplied ? '203,000' : '290,000'} UGX to MTN: 076 031 5703</p>
                          <p className="text-[11px] text-outline">Name: Oworinawe Prince Beckham</p>
                          <p className="text-[11px] text-outline">WhatsApp receipt footprint to 076 031 5703.</p>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col items-center gap-2 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Powered by</span>
                <div className="flex items-center justify-center gap-6">
                  <img src={mtnLogo} alt="MTN MoMo" className="h-10 object-contain" />
                  <img src={airtelLogo} alt="Airtel Money" className="h-10 object-contain" />
                </div>
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

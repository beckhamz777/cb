import React from 'react';

export default function SupportPage() {
  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen pt-24">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[500px] flex items-center bg-surface overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary-container/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-primary-fixed/30 rounded-full blur-[100px]"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="text-sm uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-6 block">Concierge Assistance</span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary tracking-tighter leading-[1.05] mb-8">
                How can we help?
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Experience the precision of architectural-grade support. Whether you're verifying a ledger or integrating our API, our specialists are standing by.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Support Grid */}
        <section className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Direct Support Card */}
              <div className="md:col-span-8 bg-surface-container-lowest p-12 rounded-xl border border-outline-variant/10 group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-lg mb-6">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                    </div>
                    <h3 className="font-headline text-3xl font-bold text-primary mb-4">Direct Support</h3>
                    <p className="text-on-surface-variant text-lg mb-8 max-w-md">Real-time encryption assistance and account recovery via our verified secure line.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <a className="flex items-center gap-4 bg-surface-container-low px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-outline-variant/10" href="https://wa.me/0760315703">
                      <span className="material-symbols-outlined text-secondary">chat</span>
                      <div>
                        <p className="text-xs text-on-surface-variant font-label font-bold uppercase tracking-wider">WhatsApp Secure</p>
                        <p className="font-headline font-bold text-lg text-primary">0760315703</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[300px]">lock_person</span>
                </div>
              </div>

              {/* Social Presence Card */}
              <div className="md:col-span-4 bg-primary text-on-primary p-12 rounded-xl flex flex-col justify-between group">
                <div>
                  <h3 className="font-headline text-3xl font-bold mb-8">Social Presence</h3>
                  <ul className="space-y-6">
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-on-primary/10 flex items-center justify-center transition-colors group-hover:bg-secondary">
                        <span className="material-symbols-outlined text-xl">brand_family</span>
                      </div>
                      <div>
                        <p className="text-xs text-primary-fixed-dim/60 font-label font-bold uppercase tracking-widest">TikTok</p>
                        <p className="font-headline font-semibold text-lg">@checkbook</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-on-primary/10 flex items-center justify-center transition-colors group-hover:bg-secondary">
                        <span className="material-symbols-outlined text-xl">alternate_email</span>
                      </div>
                      <div>
                        <p className="text-xs text-primary-fixed-dim/60 font-label font-bold uppercase tracking-widest">X / Twitter</p>
                        <p className="font-headline font-semibold text-lg">checkbook</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-on-primary/10 flex items-center justify-center transition-colors group-hover:bg-secondary">
                        <span className="material-symbols-outlined text-xl">play_circle</span>
                      </div>
                      <div>
                        <p className="text-xs text-primary-fixed-dim/60 font-label font-bold uppercase tracking-widest">YouTube</p>
                        <p className="font-headline font-semibold text-lg">checkbook</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 pt-6 border-t border-on-primary/10">
                  <p className="text-xs text-primary-fixed-dim/60 italic leading-relaxed">Follow for structural updates and security briefs.</p>
                </div>
              </div>

              {/* Physical Presence Card */}
              <div className="md:col-span-12 bg-surface-container-highest rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 flex flex-col justify-center">
                  <span className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Physical Nodes</span>
                  <h3 className="font-headline text-3xl font-bold text-primary mb-6">Physical Presence</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full border border-primary/10">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                      <p className="text-on-surface-variant font-label text-sm uppercase tracking-wider font-bold">Global Headquarters</p>
                      <p className="font-headline text-2xl font-bold text-primary">Coming Soon</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">
                    We are currently establishing our architectural vaults in key financial districts. Physical verification services will be available in Q3.
                  </p>
                </div>
                <div className="h-64 lg:h-auto relative bg-surface-container flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #003527 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                  <div className="relative z-10 text-center px-8">
                    <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">architecture</span>
                    <p className="font-headline font-bold text-primary/40 tracking-[0.3em] uppercase text-sm">Mapping Secure Infrastructure</p>
                  </div>
                  <img 
                    alt="Modern Architecture" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoy6E5uFFB1MK8OWF5Lo9RSTt9iSjAYEg_Hx__YLEv-UEgdCR-SCJA5eYO2tXNla4hXjtM6K_nS5KYJ0qXzlfwKM6zzWZf7Fxoxmst-fubLQIS1yNQ8rjNCHLeU8El9Q278W8Kvf_UboDYZhWVsHYUs-IAIzxUB-h4TED8DDWxEW-tTSVOSpOqR4uh_uAY2Wua8n0fCg9G5LTotG81v_3rXiJUI4Uj7blqnpQJLbX6HsOpLJVEFYgUMe3Ze6RWdsp-2CVbLBd-4JAt"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Registry Section */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="font-headline text-4xl font-extrabold text-primary mb-8 tracking-tight">Inquiry Registry</h2>
              <p className="text-on-surface-variant mb-12 text-lg leading-relaxed">Submit a formal request to our technical department. Responses are typically issued within 24 operational hours.</p>
              <div className="space-y-6">
                <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10">
                  <h4 className="font-headline font-bold text-primary mb-2">Technical Integration</h4>
                  <p className="text-sm text-on-surface-variant">Assistance with API nodes, ledger syncing, and webhook delivery.</p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10">
                  <h4 className="font-headline font-bold text-primary mb-2">Audit Verification</h4>
                  <p className="text-sm text-on-surface-variant">Request detailed logs or certified verification of specific ledger entries.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_32px_64px_-12px_rgba(0,53,39,0.06)] border border-outline-variant/10">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Full Identity</label>
                      <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="e.g. Alexander Vance" type="text"/>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Secure Email</label>
                      <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="vance@corporate.com" type="email"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Subject Matter</label>
                    <select className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none">
                      <option>Technical Support</option>
                      <option>Security Inquiry</option>
                      <option>Billing & Accounts</option>
                      <option>Partnership Proposal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Detail Specification</label>
                    <textarea className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Describe your technical requirement..." rows={5}></textarea>
                  </div>
                  <button className="w-full architectural-gradient text-on-primary font-headline font-bold py-4 rounded-lg tracking-tight transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/10" type="submit">
                    Dispatch Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


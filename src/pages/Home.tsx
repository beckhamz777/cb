import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Verified, 
  Lock, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  FileText, 
  Activity,
  Cloud,
  RefreshCw,
  Image as ImageIcon,
  Database,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import windowsDashboard from '@/src/assets/checkbook windowsdashboard.png';
import securePasscode from '@/src/assets/secure passcode screen.png';
import inventoryMobile from '@/src/assets/inventory management mobile.png';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[800px] flex items-center bg-surface overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary-container/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-primary-fixed/20 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-5 flex flex-col justify-center text-center md:text-left"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-6">
              Security First Architecture
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary tracking-tighter leading-[1.05] mb-8">
              Secure Your Assets,<br/>Anywhere.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-12 leading-relaxed">
              East africa's industry-leading ledger system for professionals. Download now for Android and Windows.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/android" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-semibold rounded-md shadow-lg active:scale-95 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5" />
                Download Now
              </Link>
              <Link to="/windows" className="px-8 py-4 bg-surface-container-highest text-on-surface font-semibold rounded-md active:scale-95 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <Monitor className="w-5 h-5" />
                Download Now
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-7 flex items-center justify-center relative py-10 md:py-20"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-video flex items-center justify-center">
              {/* Windows Dashboard Image */}
              <div className="absolute w-[90%] left-0 top-1/2 -translate-y-1/2 z-10 transform -rotate-1 shadow-2xl rounded-xl overflow-hidden border border-primary/10">
                <img 
                  alt="CheckBook Windows Dashboard" 
                  className="w-full h-auto object-cover" 
                  src={windowsDashboard}
                />
              </div>
              {/* Mobile Screen 1 */}
              <div className="absolute right-[22%] -bottom-4 z-20 w-[24%] transform rotate-2 hover:-translate-y-4 transition-all duration-500 overflow-hidden">
                <img 
                  alt="Secure Passcode Screen" 
                  className="w-full h-auto" 
                  src={securePasscode}
                />
              </div>
              {/* Mobile Screen 2 */}
              <div className="absolute right-0 top-0 z-30 w-[24%] transform -rotate-3 hover:translate-y-4 transition-all duration-500 overflow-hidden">
                <img 
                  alt="Inventory Management Mobile" 
                  className="w-full h-auto" 
                  src={inventoryMobile}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="flex flex-col mb-12 md:mb-16 text-center md:text-left">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">Cross-Platform Integrity</h2>
            <p className="text-on-surface-variant">Engineered for the modern workflow, across every device.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Windows Feature */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bg-white p-6 md:p-12 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-6">
                    <Monitor className="w-8 h-8 text-secondary" />
                    <span className="font-headline font-bold text-xl">Windows Desktop Client</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Performance</h3>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    Experience lightning-fast local processing with hardware-accelerated encryption. Optimized for multi-monitor financial setups and large ledger volumes.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-secondary" /> 256-bit Local Storage
                    </li>
                    <li className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-secondary" /> Biometric Unlock
                    </li>
                    <li className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-secondary" /> Offline-First Syncing
                    </li>
                  </ul>
                  <Link to="/windows" className="text-primary font-bold flex items-center gap-2 group transition-all">
                    Download for Windows <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden bg-surface-container shadow-inner">
                  <img 
                    alt="Windows Workstation" 
                    className="w-full h-64 object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6iRW3uPqiuAVxsvtHDibM5NpP8Az_JAA-la9qo7HbRrIfwBRwmdlyHCdBajEyqhEMBIoZQQGI7xBrlQinoNkAQLgKFt1b19ryof14R5n8p17J5bcTBCjNIMhZyN8JkQd9M6Ni4qYDix9vVEsvlpmwxd6QARQYRxexlFOKKg9MdPAQJvrlFhQwtLMqdgWDAyHF73aDphRogfKjFUxzuMnLO_AxxEly-nER8HGqgykmFVhZ7yfiAUV9tUT94COvi2Gti2kWsABAlOj_"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>

            {/* Android Feature */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-primary text-white p-6 md:p-12 rounded-xl flex flex-col justify-between"
            >
              <div>
                <Smartphone className="w-10 h-10 text-secondary-container mb-8" />
                <h3 className="font-headline text-3xl font-bold mb-4">Android Mobile</h3>
                <p className="text-surface/80 mb-8 leading-relaxed">
                  Your entire financial vault, now pocket-sized with the security of a hardware wallet.
                </p>
              </div>
              <div className="bg-primary-container/50 p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <ShieldCheck className="w-5 h-5 text-secondary-fixed" />
                  <span className="text-xs font-bold uppercase tracking-widest">Verified Secure</span>
                </div>
                <p className="text-xs text-surface/60">Latest Scan: 2 minutes ago</p>
              </div>
              <Link to="/android" className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-md hover:bg-secondary-fixed transition-colors text-center">
                Get it Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cloud Backup Promotion */}
      <section className="py-16 md:py-24 bg-surface overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
              <Cloud className="w-64 h-64 md:w-96 md:h-96" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-xs">
                  <RefreshCw className="w-4 h-4" />
                  NEW: CLOUD SYNC
                </div>
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
                  Never lose a single <br className="hidden md:block" /> transaction again.
                </h2>
                <p className="text-surface/70 text-lg md:text-xl leading-relaxed max-w-xl">
                  Enable optional cloud vaulting to sync your Windows and Android apps. Securely store images and retrieve your data if you lose your device.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/cloud-backup" className="px-8 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-md hover:bg-secondary-fixed transition-all flex items-center gap-2">
                    Explore Cloud Features
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: RefreshCw, title: "Real-time Sync", desc: "Windows & Android in harmony." },
                  { icon: ImageIcon, title: "Image Vaulting", desc: "Securely store your receipts." },
                  { icon: Database, title: "Disaster Recovery", desc: "Instant device retrieval." },
                  { icon: History, title: "Daily Backups", desc: "Automated data protection." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <item.icon className="w-8 h-8 text-secondary-container mb-4" />
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-xs text-surface/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">Proven Reliability</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-12 md:mb-16">The Gold Standard in Digital Ledgers</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Shield, title: "SOC2 Certified", desc: "Annual Compliance Audit" },
              { icon: Lock, title: "AES-256 GCM", desc: "Military-Grade Encryption" },
              { icon: Verified, title: "Open Source Core", desc: "Publicly Audited Logic" },
              { icon: FileText, title: "No-Logs Policy", desc: "Zero-Knowledge Protocol" }
            ].map((item, i) => (
              <div key={i} className="bg-surface-container-low p-6 md:p-8 rounded-lg flex flex-col items-center justify-center border border-outline-variant/10">
                <item.icon className="w-8 h-8 md:w-10 md:h-10 text-secondary mb-4" />
                <p className="font-bold text-sm mb-1">{item.title}</p>
                <p className="text-xs text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

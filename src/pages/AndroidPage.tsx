import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, ShieldCheck, CheckCircle2, RefreshCw, Receipt, Fingerprint, Network, HardDrive, Bell, Info } from 'lucide-react';
import inventoryMobile from '@/src/assets/inventory management mobile.png';
import securePasscode from '@/src/assets/secure passcode screen.png';

export default function AndroidPage() {
  return (
    <div className="pt-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 text-center lg:text-left">
          <span className="text-on-surface-variant font-medium text-xs uppercase tracking-widest mb-4 block">Secure Mobile Architecture</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold font-headline tracking-tighter text-primary mb-8 leading-[1.1]">
            CheckBook for Android
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mb-12 leading-relaxed">
            Deploy the world's most secure financial ledger to your mobile environment. Version 2.4.1 introduces hardware-level encryption protocols and a refined architectural interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 justify-center lg:justify-start">
            <a href="https://github.com/beckhamz777/cb/releases/latest/download/CheckBook.apk" download="CheckBook.apk" className="group relative overflow-hidden bg-gradient-to-br from-primary to-primary-container text-white px-8 py-5 rounded-lg flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto">
              <Smartphone className="w-8 h-8" />
              <div className="text-left">
                <div className="font-headline font-bold text-xl leading-none">Download APK</div>
                <div className="text-xs opacity-80 mt-1">v2.4.1 • 99.49MB • 64-bit ARM</div>
              </div>
            </a>
            <div className="flex flex-col">
              <span className="text-secondary font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                SHA-256 Verified
              </span>
              <span className="text-outline text-xs mt-1">Current Build: 2024.08.15-PRIME</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full overflow-hidden">
          <div className="text-center lg:text-right mb-8">
            <h3 className="font-headline font-bold text-on-surface text-2xl">Preview the Mobile Experience</h3>
            <p className="text-sm text-on-surface-variant mt-2">Explore the high-fidelity stock management interface.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-end items-center sm:items-start w-full">
            {/* Phone Frame 1 */}
            <div className="relative w-[280px] h-[580px] bg-on-background rounded-[3rem] p-3 shadow-2xl border-4 border-on-surface-variant/20 scale-[0.85] sm:scale-90 md:scale-100 origin-top shrink-0">
              <div className="w-full h-full bg-white rounded-[2.25rem] overflow-hidden">
                <img
                  alt="Mobile App Screenshot 1"
                  className="w-full h-full object-cover"
                  src={inventoryMobile}
                />
              </div>
            </div>
            {/* Phone Frame 2 */}
            <div className="relative w-[280px] h-[580px] bg-on-background rounded-[3rem] p-3 shadow-2xl border-4 border-on-surface-variant/20 scale-[0.85] sm:scale-90 md:scale-100 origin-top sm:mt-12 shrink-0">
              <div className="w-full h-full bg-white rounded-[2.25rem] overflow-hidden">
                <img
                  alt="Mobile App Screenshot 2"
                  className="w-full h-full object-cover"
                  src={securePasscode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-20">
        <div className="bg-primary/5 p-6 md:p-12 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-8 md:mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Smartphone, title: "Real-Time Stock Monitoring", desc: "Track inventory levels, including low-stock alerts and smart unit categorization." },
              { icon: RefreshCw, title: "Cloud Sync & Visibility", desc: "Instantly synced to your Windows dashboard, allowing you to monitor sales and stock levels from anywhere." },
              { icon: Receipt, title: "Secure Transaction Logging", desc: "Every sale is recorded with instant profit calculation and precise timestamping." },
              { icon: Fingerprint, title: "Biometric Vault Access", desc: "Optional fingerprint or facial recognition for secure mobile access to your ledger." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30">
                <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-headline font-bold text-on-surface mb-3">{feature.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Layout: Details & Install */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low p-6 md:p-12 rounded-xl">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <Info className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary">How to Install</h2>
          </div>
          <div className="space-y-8 md:space-y-12">
            {[
              { step: 1, title: "Allow Unknown Sources", desc: "Navigate to Settings > Security on your device and enable \"Install from Unknown Sources\" or \"Allow from this source\" for your browser." },
              { step: 2, title: "Download & Open", desc: "Click the Download APK button above. Once the file finishes downloading, tap the notification or locate the file in your \"Downloads\" folder." },
              { step: 3, title: "Verify & Launch", desc: "Review the requested permissions and tap \"Install.\" Once complete, tap \"Open\" to initialize your local encrypted vault." }
            ].map((item) => (
              <div key={item.step} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex-none w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">{item.step}</div>
                <div>
                  <h4 className="font-headline font-bold text-lg md:text-xl mb-2 text-on-surface">{item.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-highest/30 p-6 md:p-10 rounded-xl">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <ShieldCheck className="w-6 h-6 text-secondary" />
            <h3 className="font-headline font-bold text-on-surface text-xl">Required Permissions</h3>
          </div>
          <ul className="space-y-4 md:space-y-6">
            {[
              { icon: Network, title: "Network Access", desc: "To synchronize your ledger with the architectural vault nodes." },
              { icon: Fingerprint, title: "Biometrics", desc: "Optional fingerprint or facial recognition for vault access." },
              { icon: HardDrive, title: "Storage Read/Write", desc: "To store the encrypted ledger database locally on your hardware." },
              { icon: Bell, title: "Notifications", desc: "Alerts for security audits and critical ledger updates." }
            ].map((perm, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                  <perm.icon className="w-5 h-5 text-on-surface-variant" />
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">{perm.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{perm.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 md:mt-12 p-6 bg-primary-container text-surface rounded-lg">
            <p className="text-xs leading-relaxed">
              CheckBook operates under a "Zero-Trust" architecture. We never access your contacts, camera (unless for QR), or private location data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

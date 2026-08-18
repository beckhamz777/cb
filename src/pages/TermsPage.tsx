import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 bg-surface px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-outline hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/10 space-y-8 text-on-surface">
          <div className="border-b border-outline-variant/10 pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs">
              <FileText className="w-4 h-4" /> LEGAL DOCUMENTATION
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary font-headline tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs font-bold text-outline uppercase tracking-widest pt-2">
              Last Updated: August 18, 2026 | CheckBook Company Limited
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">1. Acceptance of Terms & Eligibility</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              By accessing, installing, or registering an account with CheckBook, you agree to be legally bound by these Terms and Conditions. You must be at least 18 years of age or possess legal business authority to form a binding contract in Uganda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">2. Account Registration & Security</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              You are solely responsible for maintaining the confidentiality of your account credentials and zero-knowledge vault passcodes. CheckBook Company Limited is not liable for unauthorized access resulting from compromised local credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">3. Acceptable Use & Prohibited Conduct</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              The application must be used solely for legitimate inventory management and financial bookkeeping. You may not reverse engineer the application, interfere with cloud sync servers, or conduct unlawful financial ledger manipulation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">4. Payment, Billing & Subscriptions</h2>
            <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-1 leading-relaxed">
              <li><strong>Software Ownership:</strong> 290,000 UGX standard (203,000 UGX with 30% promo discount) one-time fee.</li>
              <li><strong>Cloud Backup Subscription:</strong> 15,000 UGX / month optional add-on.</li>
              <li><strong>Free Trial:</strong> New accounts receive a 7-Day Free Trial.</li>
              <li><strong>Payment Providers:</strong> Processed via MTN MoMo and Airtel Money.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">5. Intellectual Property & Data Ownership</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              CheckBook Company Limited owns all software IP and brand assets. Users maintain 100% ownership over their financial vault data under our zero-knowledge architecture.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">6. Termination & Account Suspension</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Accounts violating acceptable use policies or applicable laws in Uganda may be suspended or terminated. Users may discontinue services at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">7. Limitation of Liability & Disclaimers</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Services are provided "AS IS". Total aggregate liability shall not exceed the amount paid by the user in the preceding 12 months.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">8. Governing Law & Dispute Resolution</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              These terms are governed by the laws of the Republic of Uganda. Disputes shall be resolved through negotiation or in the courts of Kampala, Uganda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary font-headline">9. Contact Information</h2>
            <div className="p-4 bg-surface-container rounded-xl text-xs text-on-surface-variant space-y-1">
              <p className="font-bold text-primary">CheckBook Company Limited</p>
              <p>Email: support@checkbook.co.ug | Phone: +256 76 031 5703</p>
              <p>Kampala, Uganda</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

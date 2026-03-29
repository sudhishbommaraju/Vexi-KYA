'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[160px] pb-[120px] max-w-3xl mx-auto px-6 w-full">
         <h1 className="text-[48px] font-bold mb-6 font-sans tracking-tight">Privacy Policy</h1>
         <p className="text-textMuted font-mono text-[13px] mb-12">Last Updated: October 24, 2026</p>
         
         <div className="space-y-12 text-textSecondary font-inter leading-relaxed text-[16px]">
           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">1. Scope of Data Collection</h2>
             <p>
               Vexi operates as a deterministic compliance orchestration layer. To facilitate KYA (Know Your Agent), we collect specific identity proofs, cryptographic delegation logs, and vendor boundary constraints. 
             </p>
           </section>

           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">2. Cryptographic Immutability</h2>
             <p className="mb-4">
               Due to the nature of our audit trail architecture, core transaction evaluations and identity-to-agent binding proofs are stored in append-only cryptographic logs. Complete erasure of physical identity is subject to GDPR and CCPA restrictions, but network verification hashes cannot be deleted to ensure historic financial compliance.
             </p>
           </section>

           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">3. Data Sharing with Financial Networks</h2>
             <p>
               When an agent executes an authorized request, Vexi provides the terminating financial institution (e.g. issuing bank, clearing house) with a cryptographic proof of your identity block. We do NOT sell your identity to third-party marketers or data brokers. Data sharing is strictly confined to authorizing requested financial execution.
             </p>
           </section>

           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">4. Contact Information</h2>
             <p>
               For data access requests, cryptographic key revocation assistance, or privacy inquiries, please reach out to our compliance engineering team at <span className="font-mono text-white">privacy@vexi.dev</span>.
             </p>
           </section>
         </div>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[160px] pb-[120px] max-w-3xl mx-auto px-6 w-full">
         <h1 className="text-[48px] font-bold mb-6 font-sans tracking-tight">Terms of Service</h1>
         <p className="text-textMuted font-mono text-[13px] mb-12">Last Updated: October 24, 2026</p>
         
         <div className="space-y-12 text-textSecondary font-inter leading-relaxed text-[16px]">
           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">1. Acceptance of Terms</h2>
             <p>
               By accessing or using the Vexi KYA Infrastructure Platform ("Platform"), you agree to be bound by these Terms of Service. If you are registering on behalf of an enterprise or programmatic agent network, you represent that you have the authority to mathematically and legally bind such entity.
             </p>
           </section>

           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">2. Cryptographic Identity & KYA</h2>
             <p className="mb-4">
               The Vexi network provides identity orchestration for autonomous agents (KYA). You are strictly responsible for maintaining the security of your Root Identifiers and ED25519 signing keys. 
             </p>
             <p>
               Any agent dynamically delegated from your Root Identity carries the same legal weight as your direct action. Vexi is not liable for autonomous budget overruns or vendor API abuse committed by agents holding validly signed delegation tokens.
             </p>
           </section>

           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">3. Acceptable Use Policy</h2>
             <p className="mb-4">You may not use the Platform for:</p>
             <ul className="list-disc pl-5 space-y-2">
               <li>Bypassing compliance, sanctions, or AML network thresholds deterministically.</li>
               <li>Providing programmatic financial access to non-KYC verified third parties without explicit multi-sig authorization.</li>
               <li>Deploying autonomous agents intended for high-frequency DDOS attacks on financial clearing networks.</li>
             </ul>
           </section>

           <section>
             <h2 className="text-[24px] font-semibold text-white mb-4 font-sans">4. SLA and Observability Liability</h2>
             <p>
               Vexi provides the compliance engine on a best-effort 99.99% SLA. In the event of network disruption preventing policy evaluation, the system defaults to "Deny All" to prevent unrecorded financial execution. Vexi is not liable for opportunity costs lost during these strict default-block windows.
             </p>
           </section>
         </div>
      </main>
      <Footer />
    </div>
  );
}

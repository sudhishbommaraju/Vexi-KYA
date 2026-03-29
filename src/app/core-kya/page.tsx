'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { AnimatedGrid, BentoBox } from '@/components/VisualEffects';
import { KYAFlow } from '@/components/KYAFlow';
import { ShieldCheck, UserCheck, Lock, Activity, ArrowRight, Server, TerminalSquare } from 'lucide-react';
import Link from 'next/link';

const fadeUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function CoreKyaPage() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent/30 overflow-hidden">
      <Navbar />
      
      <main className="pt-[160px] pb-[160px] relative">
        <AnimatedGrid />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto mb-[120px]">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-[13px] font-mono tracking-tight mb-8 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" />
              <span>KYA Protocol Specification</span>
            </div>
            <h1 className="text-[52px] md:text-[72px] font-semibold text-white tracking-tight leading-[1.05] mb-8 font-sans">
              Cryptographic <br className="hidden md:block"/> Identity Wrappers.
            </h1>
            <p className="text-[20px] text-textSecondary leading-relaxed font-inter mx-auto">
              Vexi wraps every AI agent request in a cryptographically signed identity layer. We prove to the financial system exactly what is happening, down to the byte.
            </p>
          </motion.div>

          {/* KYAFlow Visual Architecture */}
          <motion.div {...fadeUp} className="w-full mb-[160px]">
             <KYAFlow />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[160px]">
             {[
               { icon: UserCheck, title: 'Parent Binding', desc: 'Every AI agent is mathematically bound to a verified human or corporate KYC entity using ED25519 signatures.' },
               { icon: Lock, title: 'Deterministic Scope', desc: 'Agents cannot act beyond their explicitly provisioned API functional scopes and budget envelopes.' },
               { icon: Activity, title: 'Immutable Provenance', desc: 'Bank compliance teams are given an append-only cryptographic ledger of every network decision made.' }
             ].map((pillar, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                  <BentoBox className="h-full">
                     <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <pillar.icon className="w-6 h-6 text-accent" />
                     </div>
                     <h3 className="text-[24px] font-semibold font-sans text-white mb-4">{pillar.title}</h3>
                     <p className="text-[16px] text-textSecondary font-inter leading-relaxed">{pillar.desc}</p>
                  </BentoBox>
                </motion.div>
             ))}
          </div>

          <motion.div {...fadeUp} className="max-w-[1280px] mx-auto border border-white/10 bg-[#0A0D12]/50 p-12 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
             <div>
               <h3 className="text-[32px] font-semibold text-white mb-4">Start integrating KYA.</h3>
               <p className="text-[18px] text-textSecondary max-w-xl">
                 Read the developer documentation or connect your first application to the sandbox network.
               </p>
             </div>
             <div className="flex items-center gap-4 shrink-0">
               <Link href="/docs" className="h-[64px] px-8 bg-white/5 border border-white/10 text-white font-bold text-[16px] rounded-[8px] flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <TerminalSquare className="w-5 h-5" /> Documentation
               </Link>
               <Link href="/auth" className="h-[64px] px-8 bg-white text-[#020409] font-bold text-[16px] rounded-[8px] flex items-center gap-3 hover:scale-105 transition-transform">
                  API Key Setup <ArrowRight className="w-5 h-5" />
               </Link>
             </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BentoBox, AnimatedGrid, FloatingParticles } from '@/components/VisualEffects';
import { ShieldAlert, Ban, Fingerprint, FileCheck, ArrowRight, Zap, Network } from 'lucide-react';
import Link from 'next/link';

const fadeUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function ProblemPage() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent/30 overflow-hidden">
      <Navbar />
      
      <main className="pt-[160px] pb-[160px] relative">
        <AnimatedGrid />
        <FloatingParticles count={10} />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          <motion.div {...fadeUp} className="max-w-3xl mb-[120px]">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-[4px] border border-white/10 bg-white/5 text-textSecondary text-[13px] font-mono tracking-tight mb-8">
              <Zap className="w-4 h-4 text-accent" />
              <span>The Industry Conflict</span>
            </div>
            <h1 className="text-[52px] md:text-[72px] font-semibold text-white tracking-tight leading-[1.05] mb-8 font-sans">
              The AI Commerce <br className="hidden md:block"/><span className="text-accent">Disconnect.</span>
            </h1>
            <p className="text-[20px] text-textSecondary leading-relaxed font-inter max-w-2xl">
              Agents are purchasing APIs, services, and cloud compute autonomously. Financial systems treat this emergent behavior as fraud, blocking legitimate automated spending because it lacks human identity context.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[64px] items-start mb-[160px]">
            <div className="lg:col-span-5 sticky top-32">
              <motion.div {...fadeUp}>
                <h2 className="text-[36px] font-semibold font-sans text-white tracking-tight mb-6 leading-[1.1]">
                  Why Legacy Risk Models Fail on AI
                </h2>
                <p className="text-[18px] text-textSecondary font-inter leading-relaxed mb-6">
                  Legacy underwriting relies on human velocity patterns. When a script runs 1,000 requests to an LLM provider, it looks exactly like a brute-force credential stuffing attack to the issuing bank.
                </p>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent my-8" />
                <ul className="space-y-4 font-mono text-[14px] text-textSecondary">
                  <li className="flex items-center gap-3"><span className="text-[#EF4444] block w-2 h-2 rounded-full" /> No sub-agent identity tags</li>
                  <li className="flex items-center gap-3"><span className="text-[#EF4444] block w-2 h-2 rounded-full" /> Velocity mismatch with human purchasing</li>
                  <li className="flex items-center gap-3"><span className="text-[#EF4444] block w-2 h-2 rounded-full" /> Zero proof of human delegation</li>
                </ul>
              </motion.div>
            </div>

            <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
              <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex flex-col gap-8">
                <BentoBox className="min-h-[340px] flex flex-col justify-between">
                  <div>
                    <ShieldAlert className="w-8 h-8 text-[#EF4444] mb-6" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">Automated Fraud Flags</h3>
                  </div>
                  <p className="text-[15px] text-textSecondary font-inter leading-relaxed mt-auto">
                    Transactions executed by machines match the exact velocity footprint of credential stuffing scripts, causing immediate network blocks.
                  </p>
                </BentoBox>
                
                <BentoBox className="min-h-[300px] flex flex-col justify-between">
                  <div>
                    <Ban className="w-8 h-8 text-[#FFBD2E] mb-6" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">AML False Positives</h3>
                  </div>
                  <p className="text-[15px] text-textSecondary font-inter leading-relaxed mt-auto">
                    High-volume autonomous purchasing triggers Anti-Money Laundering (AML) tripwires at the issuing bank level naturally.
                  </p>
                </BentoBox>
              </motion.div>

              <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col gap-8 md:mt-[60px]">
                <BentoBox className="min-h-[300px] flex flex-col justify-between">
                  <div>
                    <Fingerprint className="w-8 h-8 text-accent mb-6" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">No Sub-Identity</h3>
                  </div>
                  <p className="text-[15px] text-textSecondary font-inter leading-relaxed mt-auto">
                    Standard API keys provide zero context about which exact sub-agent is acting or who explicitly authorized its budget.
                  </p>
                </BentoBox>
                
                <BentoBox className="min-h-[340px] flex flex-col justify-between">
                  <div>
                    <FileCheck className="w-8 h-8 text-[#27C93F] mb-6" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">Zero Audit Trail</h3>
                  </div>
                  <p className="text-[15px] text-textSecondary font-inter leading-relaxed mt-auto">
                    Compliance teams are left completely blind when investigating rogue spikes in developer infrastructure spend across various vendor APIs.
                  </p>
                </BentoBox>
              </motion.div>
            </div>
          </div>

          {/* CTA Next Step */}
          <motion.div {...fadeUp} className="max-w-[1280px] mx-auto border border-white/10 bg-[#0A0D12]/50 p-12 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
             <div>
               <h3 className="text-[32px] font-semibold text-white mb-4">The Solution: Core KYA</h3>
               <p className="text-[18px] text-textSecondary max-w-xl">
                 Discover how Vexi uses cryptographic identity wrappers to solve the AI commerce disconnect deterministically.
               </p>
             </div>
             <Link href="/core-kya" className="shrink-0 h-[64px] px-8 bg-white text-[#020409] font-bold text-[16px] rounded-[8px] flex items-center gap-3 hover:scale-105 transition-transform">
                Read Core KYA <ArrowRight className="w-5 h-5" />
             </Link>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

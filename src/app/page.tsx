'use client';

import { ArrowRight, Bot, ShieldCheck, FileCheck, CheckCircle2, ChevronRight, Fingerprint, Lock, ShieldAlert, User, Ban } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { FloatingParticles, AnimatedGrid, ScrollProgress, GrainOverlay, ParallaxWrapper, BentoBox } from '@/components/VisualEffects';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { KYAFlow } from '@/components/KYAFlow';
import { RotatingCards } from '@/components/RotatingCards';
import { ComplianceTerminal } from '@/components/ComplianceTerminal';
import { useRef } from 'react';

// Reusable scroll reveal wrapper
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-background font-inter selection:bg-accent/30 overflow-hidden relative" ref={containerRef}>
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />

      {/* ─────────────────────────────────────────────────────────
          1. HERO SECTION (Asymmetric, Left-Aligned)
          ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center pt-[180px] pb-[160px] overflow-hidden px-6 lg:px-12">
        <AnimatedGrid />
        <FloatingParticles count={15} />

        <motion.div style={{ y: yHero }} className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-[64px]">
          
          <div className="flex-1 lg:pr-12">
            <FadeUp>
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-[4px] border border-border bg-surface text-textSecondary text-[13px] font-mono tracking-tight mb-8">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>KYA Infrastructure Protocol v1.0</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-[52px] md:text-[72px] font-semibold text-textPrimary tracking-tight leading-[1.05] mb-8 font-sans max-w-3xl">
                Compliance for <br />
                <span className="text-accent">AI-initiated</span> payments.
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-[18px] text-textSecondary max-w-xl mb-12 font-inter leading-relaxed">
                Banks cannot distinguish between fraud bots and legitimate AI agents. 
                Vexi proves who authorized each automated transaction and within what exact bound.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/auth" className="h-[56px] px-8 rounded-[4px] bg-textPrimary text-background font-semibold text-[15px] font-sans flex items-center justify-center gap-3 hover:bg-[#E6EDF3] transition-all hover:-translate-y-1 shadow-lg">
                  Generate Identity <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/docs" className="h-[56px] px-8 rounded-[4px] bg-transparent border border-border text-textPrimary font-semibold text-[15px] font-sans flex items-center justify-center gap-3 hover:bg-surface transition-all hover:-translate-y-1">
                  Read Documentation
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
            <FadeUp delay={0.4}>
              <ParallaxWrapper speed={0.05}>
                <RotatingCards />
              </ParallaxWrapper>
            </FadeUp>
          </div>

        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. THE PROBLEM (Asymmetric grid, Left side text, Right side staggered cards)
          ───────────────────────────────────────────────────────── */}
      <section id="problem" className="py-[160px] relative overflow-hidden px-6 lg:px-12 text-white">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[64px] items-start">
            
            {/* Left side text */}
            <div className="lg:col-span-5 sticky top-32">
              <FadeUp>
                <h2 className="text-[48px] font-semibold font-sans text-white tracking-tight mb-6 leading-[1.1]">
                  The AI commerce disconnect.
                </h2>
                <p className="text-[18px] text-textSecondary mb-8 font-inter leading-relaxed">
                  Agents are purchasing APIs, services, and cloud compute. 
                  Financial systems treat this behavior as fraud, blocking legitimate automated spending due to lack of identity context.
                </p>
                <Link href="/problem" className="text-accent font-semibold font-sans flex items-center gap-2 hover:gap-3 transition-all">
                  Understand the conflict <ChevronRight className="w-4 h-4" />
                </Link>
              </FadeUp>
            </div>

            {/* Right side staggered Bento Boxes */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-8 pt-12 lg:pt-0">
              <div className="flex flex-col gap-8">
                <FadeUp delay={0.1}>
                  <BentoBox className="min-h-[300px] flex flex-col justify-end">
                    <ShieldAlert className="w-8 h-8 text-[#EF4444] mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">Automated Fraud Flags</h3>
                    <p className="text-[15px] text-textSecondary font-inter leading-relaxed">Transactions executed by machines match the exact velocity footprint of credential stuffing scripts.</p>
                  </BentoBox>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <BentoBox className="min-h-[340px] flex flex-col justify-end">
                    <Ban className="w-8 h-8 text-[#FFBD2E] mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">AML False Positives</h3>
                    <p className="text-[15px] text-textSecondary font-inter leading-relaxed">High-volume autonomous purchasing triggers Anti-Money Laundering tripwires at the issuing bank level naturally.</p>
                  </BentoBox>
                </FadeUp>
              </div>

              <div className="flex flex-col gap-8 md:mt-[80px]">
                <FadeUp delay={0.3}>
                  <BentoBox className="min-h-[340px] flex flex-col justify-end">
                    <Fingerprint className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">No Sub-Identity</h3>
                    <p className="text-[15px] text-textSecondary font-inter leading-relaxed">Standard API keys provide zero context about which sub-agent is acting or who explicitly authorized it.</p>
                  </BentoBox>
                </FadeUp>
                <FadeUp delay={0.4}>
                  <BentoBox className="min-h-[300px] flex flex-col justify-end">
                    <FileCheck className="w-8 h-8 text-[#27C93F] mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-[22px] font-sans font-semibold text-white mb-3">Zero Audit Trail</h3>
                    <p className="text-[15px] text-textSecondary font-inter leading-relaxed">Compliance teams are left blind when investigating rogue spikes in developer infrastructure spend.</p>
                  </BentoBox>
                </FadeUp>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. THE SOLUTION (Right aligned text, Left side visual)
          ───────────────────────────────────────────────────────── */}
      <section id="solution" className="py-[160px] relative overflow-hidden px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto relative z-10">
          
          <div className="flex flex-col-reverse lg:flex-row items-center gap-[80px]">
             
             {/* Left side visual representation: Overhauled KYAFlow */}
             <div className="flex-1 w-full relative">
               <FadeUp>
                 <KYAFlow />
               </FadeUp>
             </div>

             {/* Right side text */}
             <div className="flex-1 lg:max-w-xl">
               <FadeUp delay={0.2}>
                  <div className="w-12 h-1 bg-accent mb-8" />
                  <h2 className="text-[48px] font-semibold font-sans text-white tracking-tight mb-6 leading-[1.1]">
                    Cryptographic identity wrappers.
                  </h2>
                  <p className="text-[18px] text-textSecondary font-inter leading-relaxed mb-8">
                    Vexi wraps every AI agent request in a cryptographically signed identity layer. 
                    We prove to the financial system exactly what is happening, down to the byte.
                  </p>
                  <ul className="space-y-4 font-mono text-[13px] text-textMuted border-l-2 border-white/10 pl-6">
                     <li className="flex items-center gap-3"><span className="text-accent">-</span> Binds agent to verified parent KYC</li>
                     <li className="flex items-center gap-3"><span className="text-accent">-</span> Denies unapproved vendor endpoints</li>
                     <li className="flex items-center gap-3"><span className="text-accent">-</span> Blocks runaway spending natively</li>
                  </ul>
                  <div className="mt-10">
                    <Link href="/core-kya" className="text-textPrimary hover:text-white font-semibold font-sans flex items-center gap-2 hover:gap-3 transition-all">
                      Explore core architecture <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
               </FadeUp>
             </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. HOW IT WORKS (Left text, Right terminal)
          ───────────────────────────────────────────────────────── */}
      <section id="developer" className="py-[160px] relative px-6 lg:px-12 bg-[#020409]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-[64px] items-center">
          
          <div className="lg:col-span-6 pr-0 lg:pr-12">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textSecondary text-[13px] font-mono mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> api.vexi.dev/v1/authorize
              </div>
              <h2 className="text-[48px] font-semibold font-sans text-white tracking-tight mb-6 leading-[1.1]">
                Implement KYA deterministically.
              </h2>
              <p className="text-[18px] text-textSecondary font-inter leading-relaxed mb-12">
                A simple API to construct the trust chain from verified human to autonomous agent transaction. No magic, just cryptography.
              </p>
              
              <div className="space-y-10 border-l border-white/10 pl-6 ml-3 relative">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent via-accent/50 to-transparent -ml-[1px]" />
                
                {[
                  { step: '01', title: 'Parent Identity', desc: 'Register the human responsible for legal liability.' },
                  { step: '02', title: 'Delegation', desc: 'Provision an agent identity link via ED25519 signature.' },
                  { step: '03', title: 'Authorization', desc: 'Generate a short-lived scoped token for exactly one task.' },
                  { step: '04', title: 'Verification', desc: 'Execute the transaction against the K-Engine validation.' },
                ].map((item, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(37,99,235,0.8)] transition-all duration-300" />
                    <div className="text-[12px] font-mono text-accent mb-1">{item.step}</div>
                    <h4 className="text-[18px] font-semibold font-sans text-white mb-2">{item.title}</h4>
                    <p className="text-[15px] text-textSecondary font-inter leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-6 relative w-full pt-12 lg:pt-0">
            <FadeUp delay={0.2}>
              {/* Premium Glow around terminal */}
              <div className="absolute inset-[-20px] bg-accent/10 rounded-3xl blur-2xl -z-10 animate-pulse" />
              <div className="shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-xl relative overflow-hidden border border-white/10">
                <ComplianceTerminal />
              </div>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. CTA (Left Aligned, Asymmetric)
          ───────────────────────────────────────────────────────── */}
      <section className="py-[160px] relative overflow-hidden px-6 lg:px-12 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_0%_50%,#000_10%,transparent_100%)] opacity-20" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-12 text-center md:text-left">
          
          <div className="flex-1 max-w-3xl">
            <FadeUp>
              <div className="w-20 h-20 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-8 relative md:mx-0 mx-auto backdrop-blur-md">
                <div className="absolute inset-0 ring-1 ring-accent/50 rounded-2xl animate-glow-pulse" />
                <ShieldCheck className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-[48px] md:text-[64px] font-semibold font-sans text-white tracking-tight mb-6 leading-[1.05]">
                Enable compliant <br className="hidden md:block" /> autonomous commerce.
              </h2>
              <p className="text-[18px] md:text-[20px] text-textSecondary font-inter leading-relaxed max-w-2xl">
                Build the exact trust layer required for API procurement. Let your agents spend without the risk of network flags.
              </p>
            </FadeUp>
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col gap-4">
             <FadeUp delay={0.2}>
                  <Link href="/auth" className="h-[64px] px-10 rounded-[8px] bg-white text-[#020409] font-bold text-[16px] font-sans flex items-center justify-center gap-3 hover:bg-[#E6EDF3] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Start Building <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/contact" className="h-[64px] px-10 rounded-[8px] bg-transparent border border-white/20 text-white font-semibold text-[16px] mt-4 font-sans flex items-center justify-center hover:bg-white/5 transition-all">
                    Contact Sales
                  </Link>
             </FadeUp>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

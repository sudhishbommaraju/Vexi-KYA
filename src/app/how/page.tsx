'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UserCheck, FileJson, Key, Lock, ShieldCheck, Zap } from 'lucide-react';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24 selection:bg-accent/30 selection:text-textPrimary font-inter">
        <div className="max-w-[1000px] mx-auto px-6">
          
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-[600] font-sans tracking-tight text-textPrimary mb-4 italic">How Vexi Works</h1>
            <p className="text-[18px] text-textSecondary leading-relaxed font-medium">
              A high-precision sequence binding code-level intent to physical infrastructure.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Vertical Tracker */}
            <div className="absolute left-[39px] top-6 bottom-6 w-px bg-border hidden md:block opacity-50"></div>

            {/* Step 1: Policy */}
            <div className="relative flex flex-col md:flex-row gap-12 mb-24 group">
              <div className="md:w-20 flex flex-col items-center z-10 scale-90 md:scale-100">
                <div className="w-20 h-20 rounded-full bg-[#0B0F14] border border-border flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-accent transition-all duration-500">
                  <ShieldCheck className="w-8 h-8 text-textSecondary group-hover:text-accent transition-colors" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-accent/10 text-accent font-mono text-[11px] font-bold px-3 py-1 rounded-[4px] border border-accent/20 tracking-wider">SEQUENCE 01</span>
                  <h3 className="text-2xl font-bold font-sans text-textPrimary tracking-tight">Immutable Policy Definition</h3>
                </div>
                <p className="text-[15px] text-textSecondary leading-[1.6] mb-8 max-w-xl">
                  Define exactly what your agents can and cannot do. Vexi compiles these JSON schemas into highly optimized bytecode for edge execution.
                </p>
                <InteractiveTerminal 
                  code={`"policy_aws_deployer": {\n  "allowed_mcc": ["5734", "5815"],\n  "velocity_daily": 15000\n}`}
                  output="✓ policy compiled"
                  delay={0}
                />
              </div>
            </div>

            {/* Step 2: Token */}
            <div className="relative flex flex-col md:flex-row gap-12 mb-24 group">
              <div className="md:w-20 flex flex-col items-center z-10 scale-90 md:scale-100">
                <div className="w-20 h-20 rounded-full bg-[#0B0F14] border border-border flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-[#FFBD2E] transition-all duration-500">
                  <Zap className="w-8 h-8 text-textSecondary group-hover:text-[#FFBD2E] transition-colors" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#FFBD2E]/10 text-[#FFBD2E] font-mono text-[11px] font-bold px-3 py-1 rounded-[4px] border border-[#FFBD2E]/20 tracking-wider">SEQUENCE 02</span>
                  <h3 className="text-2xl font-bold font-sans text-textPrimary tracking-tight">Scoped Agent Provisioning</h3>
                </div>
                <p className="text-[15px] text-textSecondary leading-[1.6] mb-8 max-w-xl">
                  Issue environment-specific tokens that inherit the exact permissions and velocity limits defined in the policy.
                </p>
                <InteractiveTerminal 
                  code={`const session = await vexi.tokens.create({\n  policy: 'pol_aws_deployer',\n  max_spend: 15000\n});`}
                  output="✓ scoped token issued"
                  delay={400}
                />
              </div>
            </div>

            {/* Step 3: Auth */}
            <div className="relative flex flex-col md:flex-row gap-12 group">
              <div className="md:w-20 flex flex-col items-center z-10 scale-90 md:scale-100">
                <div className="w-20 h-20 rounded-full bg-[#0B0F14] border border-border flex items-center justify-center shadow-[0_0_40px_rgba(39,201,63,0.15)] group-hover:border-[#27C93F] transition-all duration-500">
                  <Lock className="w-8 h-8 text-textSecondary group-hover:text-[#27C93F] transition-colors" />
                </div>
              </div>
              <div className="flex-1 shrink-0">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#27C93F]/10 text-[#27C93F] font-mono text-[11px] font-bold px-3 py-1 rounded-[4px] border border-[#27C93F]/20 tracking-wider">SEQUENCE 03</span>
                  <h3 className="text-2xl font-bold font-sans text-textPrimary tracking-tight">Runtime Authorization</h3>
                </div>
                <p className="text-[15px] text-textSecondary leading-[1.6] mb-8 max-w-xl">
                  As the agent attempts to spent capital, the transaction is intercepted and validated against the physical network. Hallucinations are dropped instantly.
                </p>
                <InteractiveTerminal 
                  code={`await vexi.authorize(tx_payload);`}
                  output="✓ authorization request processed"
                  status="APPROVED"
                  subStatus="remaining: 4880"
                  delay={800}
                />
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

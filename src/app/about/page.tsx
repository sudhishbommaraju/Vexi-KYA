'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, KeyRound, Network, AlertCircle, Database, ArrowRight, Zap, Lock, Activity, Bot, Fingerprint, CheckCircle2 } from 'lucide-react';

const fadeUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.4, delay: i * 0.1 },
});

// Architecture Flow Nodes for KYA
const FLOW_NODES = [
  { label: 'Human Identity', icon: Fingerprint, color: '#A78BFA', desc: 'Verified parent KYC' },
  { label: 'Agent Delegation', icon: Bot, color: '#2563EB', desc: 'Cryptographic sub-identity' },
  { label: 'Scoped Auth', icon: KeyRound, color: '#FFBD2E', desc: 'Time-bound limits' },
  { label: 'Evaluation', icon: ShieldCheck, color: '#2563EB', desc: 'Deterministic check' },
  { label: 'Audit Trail', icon: Database, color: '#27C93F', desc: 'Immutable append-log' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24 selection:bg-accent/30 selection:text-textPrimary font-inter">
        <div className="max-w-[1000px] mx-auto px-6">

          <motion.div {...fadeUp} className="mb-20">
            <h1 className="text-4xl md:text-5xl font-[600] font-sans tracking-tight text-textPrimary mb-4">The KYA Standard</h1>
            <p className="text-[18px] text-textSecondary max-w-2xl leading-relaxed font-medium">
              Know Your Agent (KYA) is the compliance infrastructure required for AI-initiated financial transactions.
            </p>
          </motion.div>

          {/* ─── KYA Architecture Flow ─── */}
          <motion.div {...fadeUp} className="mb-24">
            <h2 className="text-2xl font-bold text-textPrimary mb-10 border-b border-border pb-2">The Trust Chain</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-0 relative">
              {FLOW_NODES.map((node, i) => (
                <div key={node.label} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    whileHover={{ y: -4, boxShadow: `0 0 25px ${node.color}20` }}
                    className="bg-[#0D1117] border border-border rounded-[12px] p-5 text-center cursor-pointer transition-all min-w-[140px] group relative"
                  >
                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center border transition-colors"
                      style={{ borderColor: `${node.color}40`, backgroundColor: `${node.color}10` }}
                    >
                      <node.icon className="w-5 h-5" style={{ color: node.color }} />
                    </div>
                    <div className="text-[13px] font-bold text-textPrimary">{node.label}</div>
                    <div className="text-[10px] text-textMuted mt-1 leading-tight">{node.desc}</div>

                    <div className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ boxShadow: `inset 0 0 20px ${node.color}08` }}
                    />
                  </motion.div>

                  {i < FLOW_NODES.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="hidden md:flex items-center px-1"
                    >
                      <ArrowRight className="w-5 h-5 text-border" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Core Pillars ─── */}
          <div className="mb-24">
            <motion.h2 {...fadeUp} className="text-2xl font-bold text-textPrimary mb-8 border-b border-border pb-2">Core Pillars of KYA</motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Fingerprint, title: 'Cryptographic Delegation', desc: 'Every AI agent is mathematically bound to a verified human or corporate identity entity.' },
                { icon: Lock, title: 'Deterministic Scoping', desc: 'Agents cannot act beyond their explicitly provisioned API scopes and budget envelopes.' },
                { icon: ShieldCheck, title: 'AML & Velocity Limits', desc: 'High-frequency transaction bursts are flagged and blocked automatically by the compliance engine.' },
                { icon: Database, title: 'Immutable Provenance', desc: 'Bank compliance teams get an append-only cryptographic ledger of every decision made.' },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  {...stagger(i)}
                  whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
                  className="bg-[#0D1117] border border-border rounded-[10px] p-6 transition-all cursor-pointer group"
                >
                  <card.icon className="w-5 h-5 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[15px] font-bold text-textPrimary mb-2">{card.title}</h3>
                  <p className="text-[14px] text-textSecondary leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── The Status Quo vs KYA ─── */}
          <motion.div {...fadeUp} className="mb-24">
            <h2 className="text-2xl font-bold text-textPrimary mb-8 border-b border-border pb-2">The Legacy Status Quo vs Vexi KYA</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#1A1110] border border-[#3A1816] rounded-[10px] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-5 h-5 text-[#FF5F56]" />
                    <span className="text-[15px] font-bold text-[#FF5F56] uppercase tracking-wider">Legacy Rails</span>
                  </div>
                  <ul className="space-y-4 text-[13px] text-[#FFBDBD] font-mono">
                    <li className="flex items-start gap-2"><span>×</span> AI transaction volume blocked as "bot fraud".</li>
                    <li className="flex items-start gap-2"><span>×</span> API keys have full production access.</li>
                    <li className="flex items-start gap-2"><span>×</span> No auditable trail linking agents to humans.</li>
                    <li className="flex items-start gap-2"><span>×</span> Non-compliant with standard AML/KYC laws.</li>
                  </ul>
                </div>

                <div className="bg-[#0A1A12] border border-[#163A24] rounded-[10px] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-[#27C93F]" />
                    <span className="text-[15px] font-bold text-[#27C93F] uppercase tracking-wider">With Vexi KYA</span>
                  </div>
                  <ul className="space-y-4 text-[13px] text-[#A8E6CF] font-mono">
                    <li className="flex items-start gap-2"><span>✓</span> Agents pass as verified compliant actors.</li>
                    <li className="flex items-start gap-2"><span>✓</span> Scoped authorizations isolate risk perfectly.</li>
                    <li className="flex items-start gap-2"><span>✓</span> Cryptographic proof of delegation to KYC'd human.</li>
                    <li className="flex items-start gap-2"><span>✓</span> Built for complex compliance teams and banks.</li>
                  </ul>
                </div>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}

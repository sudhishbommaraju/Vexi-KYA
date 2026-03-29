'use client';

import { motion } from 'framer-motion';
import { Bot, User, Building, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function KYAFlow() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const Node = ({ icon: Icon, label, sublabel, active, delay = 0, x, y }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: active ? 1.05 : 1 }}
      transition={{ delay }}
      className="absolute w-32 flex flex-col items-center gap-3 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center relative backdrop-blur-md
        ${active ? 'bg-accent/10 border-accent/40 text-accent shadow-[0_0_30px_rgba(37,99,235,0.3)]' : 
          'bg-surface/50 border-border text-textSecondary'} transition-all duration-500`}
      >
        <Icon className="w-7 h-7" />
        {active && (
          <motion.div 
            layoutId="active-node-glow"
            className="absolute inset-0 rounded-2xl ring-2 ring-accent opacity-50"
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        )}
      </div>
      <div className="text-center">
        <div className={`text-[14px] font-bold tracking-tight ${active ? 'text-accent' : 'text-textPrimary'}`}>{label}</div>
        <div className="text-[11px] text-textMuted font-mono mt-1">{sublabel}</div>
      </div>
    </motion.div>
  );

  const Arrow = ({ startX, startY, endX, endY, active }: any) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      <defs>
        <linearGradient id={`grad-${startX}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0} />
          <stop offset="50%" stopColor="#2563EB" stopOpacity={active ? 1 : 0.1} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.line
        x1={`${startX}%`} y1={`${startY}%`}
        x2={`${endX}%`} y2={`${endY}%`}
        stroke={active ? '#2563EB' : 'var(--border)'}
        strokeWidth="2"
        className="transition-colors duration-500"
      />
      {active && (
        <motion.circle
          r="4"
          fill="#2563EB"
          animate={{
            cx: [`${startX}%`, `${endX}%`],
            cy: [`${startY}%`, `${endY}%`],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </svg>
  );

  // 3-Column Layout Options
  const col1 = 15;
  const col2 = 50;
  const col3 = 85;

  const pUser = { x: col1, y: 25 };
  const pAgent = { x: col1, y: 75 };
  const pKya = { x: col2, y: 50 };
  const pBank = { x: col3, y: 50 };

  return (
    <div className="w-full relative py-12 px-4 rounded-[24px] bg-[#0A0D12]/80 backdrop-blur-xl border border-white/5 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[12px] font-mono text-textMuted">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          AUTHORIZATION SEQUENCE
        </div>
        <div>PHASE {step + 1} / 5</div>
      </div>

      <div className="relative h-[400px] w-full max-w-4xl mx-auto mt-12">
        <Node icon={User} label="Human Identity" sublabel="Verified Root" active={step >= 0} x={pUser.x} y={pUser.y} />
        <Node icon={Bot} label="AI Agent" sublabel="ag_092jf..." active={step >= 1} x={pAgent.x} y={pAgent.y} />
        <Node icon={ShieldCheck} label="KYA Engine" sublabel="Policy Eval" active={step >= 2} x={pKya.x} y={pKya.y} />
        <Node icon={Building} label="Financial System" sublabel="Settlement" active={step >= 3} x={pBank.x} y={pBank.y} />

        {step >= 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute text-[#22C55E] flex flex-col gap-2 p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)]" style={{ left: `${pBank.x - 12}%`, top: `${pBank.y + 15}%` }}>
            <div className="flex items-center gap-2 font-bold text-[13px] uppercase tracking-wider"><CheckCircle2 className="w-5 h-5" /> EXECUTED</div>
            <div className="text-[11px] font-mono text-[#22C55E]">
              signature: valid<br/>
              budget: active<br/>
              scope: authorized
            </div>
          </motion.div>
        )}

        {/* Vertical arrow from User to Agent */}
        <Arrow startX={pUser.x} startY={pUser.y + 15} endX={pAgent.x} endY={pAgent.y - 15} active={step >= 1} />
        {/* Horizontal arrows to KYA and Bank */}
        <Arrow startX={pAgent.x + 8} startY={pAgent.y} endX={pKya.x - 8} endY={pKya.y} active={step >= 2} />
        <Arrow startX={pKya.x + 8} startY={pKya.y} endX={pBank.x - 8} endY={pBank.y} active={step >= 3} />
      </div>
    </div>
  );
}

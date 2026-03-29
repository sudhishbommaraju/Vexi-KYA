'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Bot, Lock, CheckCircle2 } from 'lucide-react';

const CARDS = [
  {
    id: 'id_verify',
    icon: UserCheck,
    title: 'Identity Verification',
    desc: 'Parent human or org KYC validated cryptographically.',
    color: '#3B82F6',
    step: 'Step 1 / 4'
  },
  {
    id: 'ag_delegate',
    icon: Bot,
    title: 'Agent Delegation',
    desc: 'Sub-agent dynamically provisioned via identity signature.',
    color: '#8B5CF6',
    step: 'Step 2 / 4'
  },
  {
    id: 'sc_auth',
    icon: Lock,
    title: 'Scope Authorization',
    desc: 'Strict vendor and budget limits enforced deterministically.',
    color: '#F59E0B',
    step: 'Step 3 / 4'
  },
  {
    id: 'tx_approve',
    icon: CheckCircle2,
    title: 'Payment Approval',
    desc: 'Transaction clears dynamically against isolated budget constraints.',
    color: '#10B981',
    step: 'Step 4 / 4'
  }
];

export function RotatingCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative w-full max-w-sm ml-auto h-[260px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <div className="w-full h-full p-8 rounded-[16px] bg-[#0A0E17]/80 backdrop-blur-md border border-white/10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle inner grid/glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-30" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10 flex items-center justify-between">
               <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                 {(() => {
                   const Icon = CARDS[activeIndex].icon;
                   return <Icon className="w-6 h-6" style={{ color: CARDS[activeIndex].color }} />;
                 })()}
               </div>
               <span className="text-[11px] font-mono text-textMuted tracking-widest uppercase">
                  {CARDS[activeIndex].step}
               </span>
            </div>

            <div className="relative z-10 mt-auto">
               <h3 className="text-2xl font-sans font-bold text-textPrimary tracking-tight mb-2">
                 {CARDS[activeIndex].title}
               </h3>
               <p className="text-[14px] font-inter text-textSecondary leading-relaxed">
                 {CARDS[activeIndex].desc}
               </p>
            </div>
            
            {/* Progress Bar Indicator */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: isPaused ? '100%' : '100%' }}
                 transition={{ duration: isPaused ? 0 : 2.5, ease: "linear" }}
                 className="h-full bg-accent"
               />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
        {CARDS.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

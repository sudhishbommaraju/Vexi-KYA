'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface InteractiveTerminalProps {
  code: string;
  output: string;
  status?: string;
  subStatus?: string;
  delay?: number;
}

export function InteractiveTerminal({
  code,
  output,
  status,
  subStatus,
  delay = 0,
}: InteractiveTerminalProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [inView, delay]);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayText(code.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTyping(false);
          setIsRunning(true);
          
          // Simulation of execution
          setTimeout(() => {
            setIsRunning(false);
            setIsComplete(true);
          }, 1000);
        }, 500);
      }
    }, 30); // Speed of typing

    return () => clearInterval(interval);
  }, [isTyping, code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setInView(true)}
      className="bg-[#0B0F14] border border-border rounded-[12px] overflow-hidden font-mono text-[13px] shadow-2xl relative group"
    >
      {/* Terminal Header */}
      <div className="bg-[#161B22] border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="text-[10px] text-textMuted uppercase tracking-widest font-bold">Vexi Console</div>
      </div>

      <div className="p-5 min-h-[160px] flex flex-col">
        {/* Code Input */}
        <div className="flex-1 text-[#E6EDF3] whitespace-pre-wrap leading-relaxed">
          {displayText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-accent ml-0.5 align-middle"
            />
          )}
        </div>

        {/* Execution State */}
        <div className="mt-4 pt-4 border-t border-border/50 min-h-[40px]">
          <AnimatePresence mode="wait">
            {isRunning && (
              <motion.div
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-textMuted italic text-[12px]"
              >
                <Clock className="w-3 h-3 animate-spin" />
                running...
              </motion.div>
            )}

            {isComplete && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-[#27C93F] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  {output}
                </div>
                
                {status && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                    className={`mt-1 inline-flex flex-col items-start gap-1 p-3 rounded-[6px] border ${
                      status === 'APPROVED' 
                        ? 'border-[#27C93F] bg-[#0F1D16] text-[#27C93F] shadow-[0_0_15px_rgba(39,201,63,0.1)]' 
                        : 'border-accent bg-accent/10 text-accent'
                    }`}
                  >
                    <div className="text-[11px] font-bold tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                       {status}
                    </div>
                    {subStatus && (
                      <div className="text-[10px] opacity-70 uppercase font-bold tracking-tight">
                        {subStatus}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle Glow Backdrop */}
      <AnimatePresence>
        {isComplete && status === 'APPROVED' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute inset-0 bg-[#27C93F] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

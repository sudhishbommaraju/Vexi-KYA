'use client';

import { useState, useEffect, useCallback } from 'react';

const STEP_DELAY = 600;    // ms between each step appearing
const LOOP_PAUSE = 8000;   // ms before restarting the loop

export function FlowDiagram() {
  const [activeStep, setActiveStep] = useState(0); // 0 = nothing visible, 1-4 = steps

  const runSequence = useCallback(() => {
    setActiveStep(0);
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= 4; i++) {
      timers.push(setTimeout(() => setActiveStep(i), i * STEP_DELAY));
    }
    // After full sequence + pause, restart
    timers.push(setTimeout(() => runSequence(), 4 * STEP_DELAY + LOOP_PAUSE));
    return timers;
  }, []);

  useEffect(() => {
    const timers = runSequence();
    return () => timers.forEach(clearTimeout);
  }, [runSequence]);

  const stepVisible = (step: number) => activeStep >= step;

  return (
    <div className="flex flex-col gap-0 select-none">

      {/* Step 1: Policy */}
      <div className={`transition-all duration-500 ${stepVisible(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-textMuted mb-2">1 · Policy</div>
        <div className="bg-surface border border-border rounded-[6px] p-4 font-mono text-[12px] leading-relaxed">
          <span className="text-textMuted">{'{'}</span><br/>
          {'  '}<span className="text-accent">"max_spend"</span>: <span className="text-textPrimary">5000</span>,<br/>
          {'  '}<span className="text-accent">"vendor"</span>: <span className="text-textPrimary">"aws"</span><br/>
          <span className="text-textMuted">{'}'}</span>
        </div>
      </div>

      {/* Arrow 1→2 */}
      <div className={`flex items-center justify-center py-2 transition-all duration-300 ${stepVisible(2) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-6 bg-accent"></div>
      </div>

      {/* Step 2: Token */}
      <div className={`transition-all duration-500 ${stepVisible(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-textMuted mb-2">2 · Scoped Token</div>
        <div className="bg-surface border border-border rounded-[6px] px-4 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0"></div>
          <span className="font-mono text-[13px] text-textPrimary tracking-wide">vx_91a8df...</span>
        </div>
      </div>

      {/* Arrow 2→3 */}
      <div className={`flex items-center justify-center py-2 transition-all duration-300 ${stepVisible(3) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-6 bg-accent"></div>
      </div>

      {/* Step 3: Transaction */}
      <div className={`transition-all duration-500 ${stepVisible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-textMuted mb-2">3 · Agent Transaction</div>
        <div className="bg-surface border border-border rounded-[6px] px-4 py-3 flex items-center justify-between">
          <span className="text-[13px] text-textSecondary">AWS charge</span>
          <span className="font-mono text-[14px] font-bold text-textPrimary">$120.00</span>
        </div>
      </div>

      {/* Arrow 3→4 */}
      <div className={`flex items-center justify-center py-2 transition-all duration-300 ${stepVisible(4) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-6 bg-accent"></div>
      </div>

      {/* Step 4: Audit */}
      <div className={`transition-all duration-500 ${stepVisible(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-textMuted mb-2">4 · Audit Log</div>
        <div className="bg-surface border border-border rounded-[6px] px-4 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] flex-shrink-0"></div>
          <span className="text-[13px] text-textPrimary">Approved</span>
          <span className="text-[11px] text-textMuted font-mono">· policy matched</span>
        </div>
      </div>

    </div>
  );
}

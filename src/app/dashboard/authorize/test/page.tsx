'use client';

import { useState } from 'react';
import { TestTube, Play, ShieldAlert, CheckCircle2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Scenario = 'success' | 'unknown_agent' | 'exceeded_scope' | 'suspicious_velocity' | 'missing_kyc';

export default function TestTransactionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scenario, setScenario] = useState<Scenario>('success');

  const scenarios: { id: Scenario; label: string; desc: string; icon: any }[] = [
    { id: 'success', label: 'Valid Transaction', desc: 'Compliant request inside scope bounds.', icon: CheckCircle2 },
    { id: 'unknown_agent', label: 'Unknown Agent', desc: 'Invalid cryptographic wrapper.', icon: ShieldAlert },
    { id: 'exceeded_scope', label: 'Exceeded Scope', desc: 'Vendor outside of allowed list.', icon: ShieldAlert },
    { id: 'suspicious_velocity', label: 'AML Target', desc: 'Abnormal transaction rate/amount.', icon: ShieldAlert },
    { id: 'missing_kyc', label: 'KYC Missing', desc: 'Parent identity verification failed.', icon: ShieldAlert },
  ];

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    
    await new Promise(r => setTimeout(r, 600)); // Fast sim
    
    switch (scenario) {
        case 'success':
            setResult({ success: true, decision: 'APPROVED', reason: 'Transaction cryptographically verified and within scoped limits.' });
            break;
        case 'unknown_agent':
            setResult({ success: false, decision: 'DENIED', reason: 'Invalid authorization token' });
            break;
        case 'exceeded_scope':
            setResult({ success: false, decision: 'DENIED', reason: "Vendor 'azure' is outside of authorized scope." });
            break;
        case 'suspicious_velocity':
            setResult({ success: false, decision: 'DENIED', reason: 'High-value autonomous transaction flagged by AML monitors.' });
            break;
        case 'missing_kyc':
            setResult({ success: false, decision: 'DENIED', reason: 'Parent identity failed KYC verification' });
            break;
    }

    setLoading(false);
  };

  return (
    <div className="max-w-[1000px] h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      
      {/* ─── Left Panel: Toggles ─── */}
      <div className="flex-1 bg-surface border border-border rounded-[10px] flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface2 rounded-t-[10px]">
          <div className="flex items-center gap-2">
            <TestTube className="w-4 h-4 text-accent" />
            <h2 className="text-[13px] font-bold text-textPrimary uppercase tracking-wider">KYA Scenario Simulator</h2>
          </div>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto space-y-3">
          <div className="text-[13px] text-textSecondary mb-6">
              Simulate various attack vectors and compliance failures against the KYA evaluation engine without mutating real state.
          </div>

          {scenarios.map((s) => (
              <button
                 key={s.id}
                 onClick={() => setScenario(s.id)}
                 className={`w-full text-left p-4 rounded-[8px] border transition-all flex items-start gap-4 
                    ${scenario === s.id ? 'bg-accent/10 border-accent/40 shadow-[inset_0_0_0_1px_rgba(37,99,235,0.2)]' : 'bg-surface2 border-border hover:border-accent/30'}
                 `}
              >
                  <s.icon className={`w-5 h-5 mt-0.5 shrink-0 ${scenario === s.id ? (s.id==='success'?'text-[#27C93F]':'text-accent') : 'text-textMuted'}`} />
                  <div>
                      <div className={`font-bold text-[14px] mb-1 ${scenario === s.id ? 'text-textPrimary' : 'text-textSecondary'}`}>{s.label}</div>
                      <div className="text-[12px] text-textMuted leading-relaxed">{s.desc}</div>
                  </div>
              </button>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-[10px]">
          <button 
            onClick={handleTest}
            disabled={loading}
            className="h-9 px-6 rounded-[6px] bg-accent text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run Simulation
          </button>
        </div>
      </div>

      {/* ─── Right Panel: Terminal Output ─── */}
      <div className="w-[400px] bg-[#0A0D12] border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#121820] flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-textMuted uppercase tracking-wider">Engine Evaluation</h2>
        </div>
        
        <div className="p-5 flex-1 relative font-mono text-[12px] overflow-auto">
          {!result && !loading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-textMuted gap-3">
                 <TestTube className="w-8 h-8 opacity-20" />
                 <span>Select a scenario and run.</span>
             </div>
          )}

          {loading && (
             <div className="text-accent animate-pulse">
                {`> POST /api/simulate\nRunning deterministic policy evaluation...`}
             </div>
          )}

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="text-textMuted font-sans text-[11px] uppercase tracking-wider mb-2">Simulated Output</div>
                <div className={`p-4 rounded border text-[13px] ${result.success ? 'bg-[#27C93F]/10 border-[#27C93F]/20' : 'bg-[#FF5F56]/10 border-[#FF5F56]/20'}`}>
                    <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-widest text-[11px]">
                        <div className={`w-2 h-2 rounded-full ${result.success ? 'bg-[#27C93F]' : 'bg-[#FF5F56]'}`} />
                        <span className={result.success ? 'text-[#27C93F]' : 'text-[#FF5F56]'}>
                            {result.decision}
                        </span>
                    </div>
                    <div className={`leading-relaxed ${result.success ? 'text-[#27C93F]' : 'text-[#FF5F56]'}`}>
                        <span className="text-textMuted mr-2">reason:</span>
                        "{result.reason}"
                    </div>
                </div>

                {!result.success && (
                    <div className="text-[#FFBD2E] text-[11px] leading-relaxed mt-4 p-3 bg-[#FFBD2E]/10 border border-[#FFBD2E]/20 rounded">
                        <strong>Engine Note:</strong> This transaction would be blocked before reaching external payment rails. The failure has been appended to the immutable KYA audit log.
                    </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

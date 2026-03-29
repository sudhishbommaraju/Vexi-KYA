'use client';

import { useState } from 'react';
import { Play, Copy, Terminal, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RunAuthorizationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [token, setToken] = useState('vx_auth_a7b8c9d0e1f2g3h4i5j6k7l8');
  const [vendor, setVendor] = useState('aws_api');
  const [amount, setAmount] = useState('420.50');

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1200));
    
    // Simple validation logic for demo
    if (!token || !vendor || !amount) {
        setResult({
            success: false,
            decision: "DENIED",
            reason: "Malformed request payload."
        });
    } else if (!token.startsWith('vx_auth_')) {
        setResult({
            success: false,
            decision: "DENIED",
            reason: "Invalid cryptographic authorization wrapper."
        });
    } else {
        setResult({
            success: true,
            decision: "APPROVED",
            reason: "Identity cryptographically verified and within scoped limits.",
            agent: "ag_092jf",
            remaining_budget: 779.50,
            transaction_id: `txn_${Math.random().toString(36).substr(2, 9)}`
        });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[1000px] h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      
      {/* ─── Left Panel: Interactive Code Runner ─── */}
      <div className="flex-1 bg-surface border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#161B22] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <h2 className="text-[12px] font-bold text-textPrimary uppercase tracking-wider font-mono">Live Execution Runner</h2>
          </div>
        </div>
        
        <div className="flex-1 p-6 bg-[#0B0F14] font-mono text-[13px] overflow-y-auto w-full max-w-full">
            <div className="text-textMuted mb-4"># Execute a payment on behalf of an agent using a scoped wrapper</div>
            
            <div className="flex gap-4">
                <span className="text-[#FF5F56]">POST</span>
                <span className="text-[#E6EDF3]">https://api.vexi.dev/v1/transactions</span>
            </div>

            <div className="mt-4 flex flex-col gap-1 w-full max-w-full overflow-hidden">
                <label className="text-[#FFBD2E]">Headers:</label>
                <div className="flex items-center group w-full">
                   <span className="text-textSecondary w-32 shrink-0">Authorization:</span>
                   <span className="text-textSecondary mr-2 shrink-0">Bearer</span>
                   <input 
                      type="text" 
                      value={token}
                      onChange={e => setToken(e.target.value)}
                      placeholder="paste token here"
                      className="bg-transparent text-accent focus:outline-none focus:ring-1 focus:ring-accent/50 min-w-0 w-full rounded px-1 transition-shadow"
                   />
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-1 w-full max-w-full overflow-hidden">
                <label className="text-[#FFBD2E] mb-1">Body:</label>
                <div className="text-[#E6EDF3]">{"{"}</div>
                <div className="flex items-center pl-4 w-full group">
                    <span className="text-[#8B5CF6]">"vendor"</span>
                    <span className="text-textSecondary mx-2">:</span>
                    <span className="text-textSecondary">"</span>
                    <input 
                      type="text" 
                      value={vendor}
                      onChange={e => setVendor(e.target.value)}
                      className="bg-transparent text-[#27C93F] focus:outline-none border-b border-transparent focus:border-accent/50 w-32"
                    />
                    <span className="text-textSecondary">",</span>
                </div>
                <div className="flex items-center pl-4 w-full mt-1 group">
                    <span className="text-[#8B5CF6]">"amount"</span>
                    <span className="text-textSecondary mx-2">:</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="bg-transparent text-[#27C93F] focus:outline-none border-b border-transparent focus:border-accent/50 w-32"
                    />
                </div>
                <div className="text-[#E6EDF3]">{"}"}</div>
            </div>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-between gap-3 bg-surface/50">
            <div className="text-[12px] text-textMuted flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Editable environment</span>
            </div>
          <button 
            onClick={handleRun}
            disabled={loading}
            className="h-9 px-6 rounded-[6px] bg-accent text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Execute Request
          </button>
        </div>
      </div>

      {/* ─── Right Panel: Terminal Output ─── */}
      <div className="w-[400px] bg-[#0A0D12] border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#121820] flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-textMuted uppercase tracking-wider">Engine Response</h2>
        </div>
        
        <div className="p-5 flex-1 relative font-mono text-[12px] overflow-auto">
          {!result && !loading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-textMuted gap-3">
                 <Terminal className="w-8 h-8 opacity-20" />
                 <span>Waiting for execution...</span>
             </div>
          )}

          {loading && (
             <div className="text-accent animate-pulse">
                Evaluating transaction payload against KYA cryptographic bound...
             </div>
          )}

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
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

                {result.success && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-border/20">
                        <div className="flex justify-between text-textSecondary border-b border-border/10 py-1">
                            <span>verified_agent</span><span className="text-accent">{result.agent}</span>
                        </div>
                        <div className="flex justify-between text-textSecondary border-b border-border/10 py-1">
                            <span>remaining_budget</span><span className="text-textPrimary">${result.remaining_budget}</span>
                        </div>
                        <div className="flex justify-between text-textSecondary border-b border-border/10 py-1">
                            <span>transaction_id</span><span className="text-textMuted">{result.transaction_id}</span>
                        </div>
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

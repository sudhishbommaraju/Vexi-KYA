'use client';

import { useState } from 'react';
import { KeyRound, ShieldCheck, Copy, Loader2, ArrowRight, Activity, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IssueAuthorizationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    agent_id: 'ag_092jf', // Mock
    allow_vendors: 'aws_api, stripe',
    budget: 1200,
    ttl: '24',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLogs([]);
    setResult(null);
    
    const steps = [
      `> POST /api/authorize`,
      `[engine] Verifying agent identity: ${formData.agent_id}...`,
      `[engine] Checking parent KYC status... APPROVED`,
      `[crypto] Generating scoped authorization wrapper...`,
      `[crypto] Signing payload with budget: $${formData.budget}`,
      `> SUCCESS: Token vx_auth_ generated.`
    ];

    for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 400));
        setLogs(prev => [...prev, steps[i]]);
    }
    
    setResult({
      token: `vx_auth_${Math.random().toString(36).substr(2, 24)}`,
      agent: formData.agent_id,
      scope: formData.allow_vendors
    });
    setLoading(false);
  };

  return (
    <div className="max-w-[1000px] h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      
      {/* ─── Left Panel: Form ─── */}
      <div className="flex-1 bg-surface border border-border rounded-[10px] flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface2 rounded-t-[10px]">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-accent" />
            <h2 className="text-[13px] font-bold text-textPrimary uppercase tracking-wider">Issue Authorization</h2>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="bg-accent/5 border border-accent/20 rounded-[8px] p-4 flex gap-3">
             <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
             <div className="text-[13px] text-textSecondary text-balance leading-relaxed">
               Wrap your agent's requests in a cryptographic authorization token. The KYA engine will verify identity, scope, and budget bounds on every execution.
             </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Agent ID</label>
              <input
                type="text"
                placeholder="ag_..."
                className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                value={formData.agent_id}
                onChange={e => setFormData({...formData, agent_id: e.target.value})}
                required
              />
            </div>

            <div>
               <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Allowed Vendors (Scope)</label>
               <input
                 type="text"
                 placeholder="e.g. aws_api, stripe, openai"
                 className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                 value={formData.allow_vendors}
                 onChange={e => setFormData({...formData, allow_vendors: e.target.value})}
                 required
               />
               <p className="text-[11px] text-textMuted mt-1.5 font-sans">Comma separated list of permitted destinations.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Budget Envelope ($)</label>
                <input
                  type="number"
                  className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Time-to-Live (Hours)</label>
                <input
                  type="number"
                  className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                  value={formData.ttl}
                  onChange={e => setFormData({...formData, ttl: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-[10px]">
          <button type="button" className="h-9 px-4 text-[13px] font-semibold text-textSecondary hover:text-textPrimary transition-colors">Cancel</button>
          <button 
            onClick={handleSubmit}
            disabled={loading || !formData.agent_id}
            className="h-9 px-4 rounded-[6px] bg-accent text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
            Generate Auth Token
          </button>
        </div>
      </div>

      {/* ─── Right Panel: Terminal Output ─── */}
      <div className="w-[400px] bg-[#0A0D12] border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#121820] flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-textMuted" />
              <h2 className="text-[11px] font-bold text-textMuted uppercase tracking-wider">Engine Evaluation</h2>
          </div>
          {loading && <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />}
        </div>
        
        <div className="p-5 flex-1 relative font-mono text-[12px] overflow-auto">
          
          <div className="space-y-2 mb-6 text-textSecondary">
             {logs.map((l, i) => (
                 <motion.div initial={{opacity:0, x:-5}} animate={{opacity:1, x:0}} key={i} className={`${l.includes('SUCCESS') ? 'text-[#27C93F] font-bold mt-4' : ''}`}>
                     {l}
                 </motion.div>
             ))}
             {loading && <motion.div animate={{opacity:[1,0]}} transition={{repeat:Infinity, duration:0.7}} className="w-2 h-4 bg-accent mt-2" />}
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-border/30"
              >
                <div className="text-textMuted mb-2 text-[10px] uppercase tracking-wider">Authorization Token</div>
                <div className="group relative">
                  <div className="w-full break-all bg-[#0D1117] border border-accent/30 rounded p-3 text-accent selection:bg-accent/30">
                    {result.token}
                  </div>
                  <button className="absolute top-2 right-2 p-1.5 bg-[#161B22] rounded border border-border hover:bg-surface transition-colors opacity-0 group-hover:opacity-100">
                      <Copy className="w-3.5 h-3.5 text-textMuted hover:text-textPrimary" />
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-border/30">
                  <a href="/dashboard/authorize/run" className="h-[32px] px-3 w-full bg-[#161B22] border border-border text-textPrimary rounded flex items-center justify-center gap-2 font-bold hover:bg-[#1C2128] transition-colors">
                    Test Transaction Execution <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

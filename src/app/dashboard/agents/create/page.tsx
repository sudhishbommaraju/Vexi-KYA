'use client';

import { useState } from 'react';
import { Bot, Save, Copy, Loader2, ArrowRight, ShieldCheck, User, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateAgentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    parent_identity_id: 'id_human_01', // Pre-populated for demo
    default_scope: 'aws_api, stripe',
    max_budget: 5000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    
    setResult({
      id: `ag_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name,
      parent_identity: formData.parent_identity_id,
      delegation: `del_${Math.random().toString(36).substr(2, 9)}`,
      status: 'active'
    });
    setLoading(false);
  };

  return (
    <div className="max-w-[1000px] h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      
      {/* ─── Left Panel: Form ─── */}
      <div className="flex-1 bg-surface border border-border rounded-[10px] flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface2 rounded-t-[10px]">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-accent" />
            <h2 className="text-[13px] font-bold text-textPrimary uppercase tracking-wider">Create Agent Identity</h2>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="bg-accent/5 border border-accent/20 rounded-[8px] p-4 flex gap-3">
             <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
             <div className="text-[13px] text-textSecondary text-balance leading-relaxed">
               Agents are autonomous sub-identities bounded by cryptographic delegations. 
               All transactions executed by an agent will permanently trace back to the parent identity below.
             </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Agent Name</label>
              <input
                type="text"
                placeholder="e.g. Infrastructure Procurement Bot"
                className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Parent Identity (Verified KYC)</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
                <input
                  type="text"
                  disabled
                  className="w-full h-10 pl-9 pr-3 bg-surface2 border border-border rounded-[6px] text-[13px] text-textSecondary font-mono cursor-not-allowed"
                  value={formData.parent_identity_id}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Max Budget Limit ($)</label>
                <input
                  type="number"
                  className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                  value={formData.max_budget}
                  onChange={e => setFormData({...formData, max_budget: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-textPrimary uppercase tracking-wider mb-2">Global Scopes</label>
                <input
                  type="text"
                  placeholder="aws_api, stripe"
                  className="w-full h-10 px-3 bg-surface border border-border rounded-[6px] text-[13px] text-textPrimary focus:outline-none focus:border-accent font-mono transition-colors"
                  value={formData.default_scope}
                  onChange={e => setFormData({...formData, default_scope: e.target.value})}
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
            disabled={loading || !formData.name}
            className="h-9 px-4 rounded-[6px] bg-accent text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Provision Agent
          </button>
        </div>
      </div>

      {/* ─── Right Panel: Preview & Result ─── */}
      <div className="w-[360px] bg-[#0A0D12] border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#121820]">
          <h2 className="text-[11px] font-bold text-textMuted uppercase tracking-wider">Delegation Chain Preview</h2>
        </div>
        
        <div className="p-5 flex-1 relative font-mono text-[12px]">
          
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="text-textMuted mb-2">Graph visualization:</div>
                <div className="p-3 border border-border/50 rounded bg-[#161B22]">
                  <div className="text-[#27C93F] flex items-center gap-2"><User className="w-3.5 h-3.5"/> Identity: {formData.parent_identity_id}</div>
                  <div className="pl-2 border-l border-border/50 ml-1.5 my-1 text-textMuted">│</div>
                  <div className="text-accent flex items-center gap-2"><Bot className="w-3.5 h-3.5"/> Agent: {formData.name || '(pending)'}</div>
                </div>

                <div className="text-textMuted mt-6 mb-2">Constraints:</div>
                <div className="space-y-1">
                  <div className="flex justify-between border-b border-border/20 py-1"><span className="text-textSecondary">Budget</span><span className="text-textPrimary">${formData.max_budget}</span></div>
                  <div className="flex justify-between border-b border-border/20 py-1"><span className="text-textSecondary">Scopes</span><span className="text-textPrimary">{formData.default_scope}</span></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-[#27C93F] font-bold text-[14px] mb-6">
                  <CheckCircle2 className="w-5 h-5" /> Agent Provisioned
                </div>

                <div>
                  <div className="text-textMuted mb-1 text-[10px] uppercase">Agent ID</div>
                  <div className="flex items-center justify-between p-2 bg-[#161B22] border border-border rounded group">
                    <span className="text-textPrimary">{result.id}</span>
                    <button className="text-textMuted hover:text-textPrimary"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div>
                  <div className="text-textMuted mb-1 mt-4 text-[10px] uppercase">Delegation ID</div>
                  <div className="flex items-center justify-between p-2 bg-[#161B22] border border-border rounded group">
                    <span className="text-accent">{result.delegation}</span>
                    <button className="text-textMuted hover:text-textPrimary"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/30">
                  <div className="text-[11px] text-textSecondary mb-3">
                    Next step: Issue an authorization wrapper to allow this agent to send transactions.
                  </div>
                  <a href="/dashboard/authorize/issue" className="h-[32px] px-3 w-full bg-accent/10 border border-accent/20 text-accent rounded flex items-center justify-center gap-2 font-bold hover:bg-accent/20 transition-colors">
                    Issue Authorization <ArrowRight className="w-3.5 h-3.5" />
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

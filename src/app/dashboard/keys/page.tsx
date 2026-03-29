'use client';

import { useState } from 'react';
import { Copy, Trash2, Plus, Check } from 'lucide-react';

const initialKeys = [
  { id: 'vx_91a8df21', policy: 'pol_aws_deploy', maxSpend: '$5,000', expiry: '2h remaining', status: 'active' },
  { id: 'vx_f2e891c4', policy: 'pol_stripe_only', maxSpend: '$2,500', expiry: '45m remaining', status: 'active' },
  { id: 'vx_c4d920bb', policy: 'pol_budget_q1', maxSpend: '$25,000', expiry: 'Expired', status: 'expired' },
  { id: 'vx_a1b2c3d4', policy: 'pol_gcp_infra', maxSpend: '$10,000', expiry: '5h remaining', status: 'active' },
];

export default function APIKeysPage() {
  const [keys, setKeys] = useState(initialKeys);
  const [copied, setCopied] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleRevoke = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked', expiry: 'Revoked' } : k));
  };

  return (
    <div className="max-w-[1100px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-textPrimary font-sans">API Keys</h1>
          <p className="text-[13px] text-textMuted mt-1">Manage scoped access tokens issued to agents.</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="h-[32px] px-3 flex items-center gap-1.5 rounded-[6px] bg-accent text-white text-[12px] font-semibold hover:bg-[#1D4ED8] transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Key
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-surface border border-border rounded-[8px] p-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-medium text-textMuted mb-1 block uppercase tracking-wider">Policy</label>
              <select className="w-full h-[36px] px-3 rounded-[6px] bg-background border border-border text-textPrimary text-[13px] focus:outline-none focus:border-accent transition-colors">
                <option>pol_aws_deploy</option>
                <option>pol_stripe_only</option>
                <option>pol_budget_q1</option>
                <option>pol_gcp_infra</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-textMuted mb-1 block uppercase tracking-wider">Max Spend</label>
              <input type="text" placeholder="$5,000" className="w-full h-[36px] px-3 rounded-[6px] bg-background border border-border text-textPrimary text-[13px] placeholder:text-textMuted focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-textMuted mb-1 block uppercase tracking-wider">TTL</label>
              <select className="w-full h-[36px] px-3 rounded-[6px] bg-background border border-border text-textPrimary text-[13px] focus:outline-none focus:border-accent transition-colors">
                <option>1 hour</option>
                <option>4 hours</option>
                <option>24 hours</option>
                <option>7 days</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowCreate(false)} className="mt-3 h-[32px] px-4 rounded-[6px] bg-accent text-white text-[12px] font-semibold hover:bg-[#1D4ED8] transition-colors">
            Issue Token
          </button>
        </div>
      )}

      {/* Keys Table */}
      <div className="bg-surface border border-border rounded-[8px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wider text-textMuted font-medium">
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Policy</th>
              <th className="px-4 py-3">Max Spend</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {keys.map(k => (
              <tr key={k.id} className="hover:bg-surface2/50 transition-colors text-[13px]">
                <td className="px-4 py-3 font-mono text-textPrimary">{k.id}</td>
                <td className="px-4 py-3 font-mono text-accent">{k.policy}</td>
                <td className="px-4 py-3 text-textSecondary">{k.maxSpend}</td>
                <td className="px-4 py-3 text-textMuted">{k.expiry}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${k.status === 'active' ? 'bg-[#22C55E]/10 text-[#22C55E]' : k.status === 'revoked' ? 'bg-[#FF5F56]/10 text-[#FF5F56]' : 'bg-surface2 text-textMuted'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${k.status === 'active' ? 'bg-[#22C55E]' : k.status === 'revoked' ? 'bg-[#FF5F56]' : 'bg-textMuted'}`}></span>
                    {k.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleCopy(k.id)} className="p-1.5 rounded-[4px] text-textMuted hover:text-textPrimary hover:bg-surface2 transition-colors" title="Copy">
                      {copied === k.id ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {k.status === 'active' && (
                      <button onClick={() => handleRevoke(k.id)} className="p-1.5 rounded-[4px] text-textMuted hover:text-[#FF5F56] hover:bg-[#FF5F56]/10 transition-colors" title="Revoke">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

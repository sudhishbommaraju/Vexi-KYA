'use client';

import { Fingerprint, CheckCircle2, ShieldAlert, Clock, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const KYC_LOGS = [
  { id: 'kyc_92m4', identity: 'id_human_01', type: 'individual', provider: 'Socure', provider_id: 'soc_192', score: 98, status: 'verified', ts: '2026-03-28T08:12:00Z' },
  { id: 'kyc_92m5', identity: 'id_org_012', type: 'business', provider: 'Alloy', provider_id: 'aly_842', score: 65, status: 'review', ts: '2026-03-28T09:44:12Z' },
  { id: 'kyc_92m6', identity: 'id_human_02', type: 'individual', provider: 'Stripe ID', provider_id: 'str_991', score: 100, status: 'verified', ts: '2026-03-28T10:05:41Z' },
  { id: 'kyc_92m7', identity: 'id_human_03', type: 'individual', provider: 'Socure', provider_id: 'soc_195', score: 12, status: 'rejected', ts: '2026-03-28T11:22:05Z', reason: 'SSN verification failed' },
];

export default function KYCSignalsPage() {
  return (
    <div className="max-w-[1200px] h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-textPrimary font-sans">KYC Signal Streams</h1>
          <p className="text-[13px] text-textMuted mt-0.5">Verified identities required as the root of the KYA trust chain.</p>
        </div>
        <button className="h-[32px] px-3 flex items-center gap-1.5 rounded-[6px] bg-surface2 border border-border text-textPrimary text-[12px] font-semibold hover:bg-surface transition-colors">
          <RefreshCcw className="w-3.5 h-3.5" /> Force Sync
        </button>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#161B22] flex items-center gap-2">
          <Fingerprint className="w-4 h-4 text-accent" />
          <h2 className="text-[12px] font-bold text-textPrimary uppercase tracking-wider font-mono">External Provider Webhooks</h2>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-[13px] text-left">
            <thead className="bg-[#0B0F14] sticky top-0 border-b border-border/50 text-textMuted uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-5 py-3 font-mono">Timestamp</th>
                <th className="px-5 py-3">Identity (Root)</th>
                <th className="px-5 py-3">Provider</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Trust Score</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {KYC_LOGS.map((log, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={log.id} 
                  className="hover:bg-[#0D1117] transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-3 text-textMuted font-mono whitespace-nowrap">{log.ts.replace('T', ' ').slice(0, 19)}</td>
                  <td className="px-5 py-3 font-mono font-medium text-textPrimary whitespace-nowrap">{log.identity}</td>
                  <td className="px-5 py-3 text-textSecondary whitespace-nowrap">
                     <div className="flex flex-col">
                        <span>{log.provider}</span>
                        <span className="text-[10px] text-textMuted font-mono">{log.provider_id}</span>
                     </div>
                  </td>
                  <td className="px-5 py-3 text-textSecondary uppercase text-[10px] tracking-wider font-bold whitespace-nowrap">{log.type}</td>
                  <td className="px-5 py-3 whitespace-nowrap">
                     <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${log.score > 80 ? 'text-[#27C93F]' : log.score > 40 ? 'text-[#FFBD2E]' : 'text-[#FF5F56]'}`}>{log.score}/100</span>
                        <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden">
                           <div className={`h-full ${log.score > 80 ? 'bg-[#27C93F]' : log.score > 40 ? 'bg-[#FFBD2E]' : 'bg-[#FF5F56]'}`} style={{ width: `${log.score}%` }} />
                        </div>
                     </div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      log.status === 'verified' ? 'bg-[#27C93F]/10 text-[#27C93F]' :
                      log.status === 'rejected' ? 'bg-[#FF5F56]/10 text-[#FF5F56]' :
                      'bg-[#FFBD2E]/10 text-[#FFBD2E]'
                    }`}>
                      {log.status === 'verified' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {log.status === 'rejected' && <ShieldAlert className="w-3.5 h-3.5" />}
                      {log.status === 'review' && <Clock className="w-3.5 h-3.5" />}
                      {log.status}
                    </div>
                    {log.reason && <div className="text-[10px] text-[#FF5F56] mt-1">{log.reason}</div>}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

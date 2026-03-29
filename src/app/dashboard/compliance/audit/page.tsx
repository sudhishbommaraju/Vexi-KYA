'use client';

import { ClipboardList, Download, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const AUDIT_LOGS = [
  { ts: '2026-03-28T00:24:51.109Z', id: 'log_9x8e', action: 'TRANSACTION_EVALUATED', details: 'Transaction APPROVED for ag_092jf ($120 on aws_api). Policy requirements met.' },
  { ts: '2026-03-28T00:23:15.822Z', id: 'log_9x8b', action: 'TRANSACTION_DENIED', details: 'Transaction DENIED for ag_crawler ($6,200 on openai). Identity KYC state missing.' },
  { ts: '2026-03-28T00:21:10.045Z', id: 'log_9x7z', action: 'AUTH_ISSUED', details: 'Token wrapper vx_auth_... generated for ag_092jf (Budget: $1200).' },
  { ts: '2026-03-28T00:20:11.901Z', id: 'log_9x7y', action: 'AGENT_PROVISIONED', details: 'Agent ag_092jf delegated by root identity id_human_01.' },
  { ts: '2026-03-28T00:19:33.444Z', id: 'log_9x7x', action: 'IDENTITY_CREATED', details: 'Human identity id_human_01 initialized.' },
  { ts: '2026-03-28T00:18:45.112Z', id: 'log_9x7w', action: 'KYC_SIGNAL_RECEIVED', details: 'Socure webhook reported APPROVED for id_human_01.' },
];

export default function AuditTrailPage() {
  return (
    <div className="max-w-[1200px] h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-textPrimary font-sans">Immutable Audit Trail</h1>
          <p className="text-[13px] text-textMuted mt-0.5">Append-only cryptographic record of all engine operations.</p>
        </div>
        <button className="h-[32px] px-4 flex items-center gap-2 rounded-[6px] bg-accent text-white hover:bg-[#1D4ED8] text-[12px] font-bold transition-colors">
          <Download className="w-3.5 h-3.5" /> Export Log
        </button>
      </div>

      <div className="flex-1 bg-[#0B0F14] border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#161B22] flex items-center justify-between">
           <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-accent" />
            <span className="text-[12px] font-bold text-textPrimary uppercase tracking-wider font-mono">System Append-Log</span>
           </div>
           <div className="flex items-center gap-2 text-[10px] font-mono text-textMuted uppercase tracking-wider bg-[#0B0F14] px-2 py-1 rounded border border-border">
              <Terminal className="w-3.5 h-3.5" /> read-only replica
           </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed">
           <div className="text-textMuted mb-4 border-l-2 border-[#27C93F] pl-3">
              # Vexi Core Engine Ledger<br/>
              # Checksums verified. Log tail continuous.<br/>
              # All events cryptographically bound.
           </div>
           
           <div className="space-y-2">
             {AUDIT_LOGS.map((log, i) => (
               <motion.div 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.05 }}
                 key={log.id} 
                 className="flex gap-4 p-2 hover:bg-[#161B22] rounded transition-colors"
               >
                 <span className="text-textMuted shrink-0 w-[180px]">{log.ts}</span>
                 <span className="text-[#8B5CF6] shrink-0 w-[80px]">{log.id}</span>
                 <span className={`shrink-0 w-[160px] font-bold ${
                    log.action.includes('DENIED') ? 'text-[#FF5F56]' :
                    log.action.includes('APPROVED') || log.action.includes('VERIFIED') ? 'text-[#27C93F]' :
                    'text-accent'
                 }`}>{log.action}</span>
                 <span className="text-[#E6EDF3]">{log.details}</span>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

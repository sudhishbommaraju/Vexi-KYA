'use client';

import { Scale, ShieldAlert, BarChart3, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AML_ALERTS = [
  { id: 'alrt_1092', agent: 'ag_marketing', risk: 'HIGH', trigger: 'Velocity Threshold Exceeded ($12,500/hr)', identity: 'id_org_012', action: 'Transactions Blocked', ts: '2026-03-28T00:21:55Z' },
  { id: 'alrt_1091', agent: 'ag_crawler', risk: 'CRITICAL', trigger: 'Target Vendor Watchlist (openai)', identity: 'id_human_03', action: 'Agent Revoked', ts: '2026-03-27T18:44:10Z' },
  { id: 'alrt_1090', agent: 'ag_092jf', risk: 'LOW', trigger: 'Unusual Time of Execution (03:00 AM)', identity: 'id_human_01', action: 'Flagged for Review', ts: '2026-03-27T03:00:12Z' },
];

export default function AMLSignalsPage() {
  return (
    <div className="max-w-[1200px] h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-textPrimary font-sans">AML Monitor & Flags</h1>
          <p className="text-[13px] text-textMuted mt-0.5">Automated velocity and pattern detection for agent transactions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#0D1117] border border-border rounded-[10px] p-5">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[12px] font-bold text-textSecondary uppercase tracking-wider">High Risk Alerts (24h)</h3>
                  <ShieldAlert className="w-4 h-4 text-[#FF5F56]" />
              </div>
              <div className="text-3xl font-mono font-bold text-[#FF5F56]">2</div>
              <div className="text-[11px] text-textMuted mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-[#FF5F56]"/> +1 since yesterday</div>
          </div>
          <div className="bg-[#0D1117] border border-border rounded-[10px] p-5">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[12px] font-bold text-textSecondary uppercase tracking-wider">Agents Revoked</h3>
                  <Scale className="w-4 h-4 text-accent" />
              </div>
              <div className="text-3xl font-mono font-bold text-textPrimary">1</div>
              <div className="text-[11px] text-textMuted mt-2 flex items-center gap-1">Actioned by engine</div>
          </div>
          <div className="bg-[#0D1117] border border-border rounded-[10px] p-5">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[12px] font-bold text-textSecondary uppercase tracking-wider">Transactions Blocked</h3>
                  <BarChart3 className="w-4 h-4 text-[#FFBD2E]" />
              </div>
              <div className="text-3xl font-mono font-bold text-[#FFBD2E]">$18,700</div>
              <div className="text-[11px] text-textMuted mt-2 flex items-center gap-1">Mitigated risk exposure</div>
          </div>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-[10px] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-[#161B22] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FF5F56]" />
          <h2 className="text-[12px] font-bold text-textPrimary uppercase tracking-wider font-mono">Suspicious Activity Reports (SAR Candidates)</h2>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-[13px] text-left">
            <thead className="bg-[#0B0F14] sticky top-0 border-b border-border/50 text-textMuted uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-5 py-3 font-mono w-[160px]">Timestamp</th>
                <th className="px-5 py-3 w-[100px]">Risk Level</th>
                <th className="px-5 py-3">Agent ID</th>
                <th className="px-5 py-3">Trigger Event</th>
                <th className="px-5 py-3">Parent Identity</th>
                <th className="px-5 py-3">Automated Engine Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {AML_ALERTS.map((log, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={log.id} 
                  className="hover:bg-[#0D1117] transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-4 text-textMuted font-mono whitespace-nowrap">{log.ts.replace('T', ' ').slice(0, 19)}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                      ${log.risk === 'CRITICAL' ? 'bg-[#FF5F56] text-white' : 
                        log.risk === 'HIGH' ? 'bg-[#FF5F56]/20 text-[#FF5F56]' : 
                        'bg-[#FFBD2E]/20 text-[#FFBD2E]'}
                    `}>{log.risk}</span>
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-accent whitespace-nowrap">{log.agent}</td>
                  <td className="px-5 py-4 text-textPrimary font-medium whitespace-nowrap">{log.trigger}</td>
                  <td className="px-5 py-4 font-mono text-textSecondary whitespace-nowrap">{log.identity}</td>
                  <td className="px-5 py-4 text-textMuted whitespace-nowrap">{log.action}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

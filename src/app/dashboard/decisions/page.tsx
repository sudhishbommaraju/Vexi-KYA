'use client';

import { CheckCircle, XCircle, Clock } from 'lucide-react';

const decisions = [
  { id: 'dec_001', token: 'vx_91a8df21', agent: 'ag_deployer_01', action: 'charge', vendor: 'aws', amount: '$120.00', policy: 'pol_aws_deploy', result: 'ALLOW', latency: '38ms', ts: '00:24:32' },
  { id: 'dec_002', token: 'vx_f2e891c4', agent: 'ag_buyer_03', action: 'charge', vendor: 'shopify', amount: '$450.00', policy: 'pol_stripe_only', result: 'DENY', latency: '12ms', ts: '00:22:04' },
  { id: 'dec_003', token: 'vx_a1b2c3d4', agent: 'ag_ops_07', action: 'charge', vendor: 'gcp', amount: '$89.00', policy: 'pol_gcp_infra', result: 'ALLOW', latency: '42ms', ts: '00:19:33' },
  { id: 'dec_004', token: 'vx_91a8df21', agent: 'ag_deploy_09', action: 'charge', vendor: 'aws', amount: '$45.50', policy: 'pol_aws_deploy', result: 'ALLOW', latency: '29ms', ts: '00:15:09' },
  { id: 'dec_005', token: 'vx_c4d920bb', agent: 'ag_monitor_12', action: 'charge', vendor: 'datadog', amount: '$200.00', policy: 'pol_budget_q1', result: 'DENY', latency: '15ms', ts: '00:12:44' },
  { id: 'dec_006', token: 'vx_a1b2c3d4', agent: 'ag_ops_07', action: 'charge', vendor: 'gcp', amount: '$310.00', policy: 'pol_gcp_infra', result: 'ALLOW', latency: '35ms', ts: '00:10:22' },
];

export default function DecisionsPage() {
  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-textPrimary font-sans">Decisions</h1>
        <p className="text-[13px] text-textMuted mt-1">Every authorization decision made by the policy engine.</p>
      </div>
      <div className="bg-surface border border-border rounded-[8px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wider text-textMuted font-medium">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Policy</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3 text-right">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {decisions.map(d => (
              <tr key={d.id} className="hover:bg-surface2/50 transition-colors text-[13px]">
                <td className="px-4 py-3 font-mono text-textMuted">{d.ts}</td>
                <td className="px-4 py-3 font-mono text-textPrimary">{d.token}</td>
                <td className="px-4 py-3 text-textSecondary">{d.agent}</td>
                <td className="px-4 py-3 text-textSecondary">{d.vendor}</td>
                <td className="px-4 py-3 font-mono text-textPrimary">{d.amount}</td>
                <td className="px-4 py-3 font-mono text-accent">{d.policy}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${d.result === 'ALLOW' ? 'text-[#22C55E]' : 'text-[#FF5F56]'}`}>
                    {d.result === 'ALLOW' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {d.result}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-textMuted">{d.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

const agents = [
  { id: 'ag_deployer_01', name: 'AWS Deployer', policy: 'pol_aws_deploy', status: 'active', lastActivity: '2s ago', spend: '$120.00' },
  { id: 'ag_buyer_03', name: 'Procurement Bot', policy: 'pol_stripe_only', status: 'blocked', lastActivity: '5m ago', spend: '$0.00' },
  { id: 'ag_ops_07', name: 'GCP Operations', policy: 'pol_gcp_infra', status: 'active', lastActivity: '12m ago', spend: '$89.00' },
  { id: 'ag_monitor_12', name: 'Cost Monitor', policy: 'pol_budget_q1', status: 'idle', lastActivity: '1h ago', spend: '$0.00' },
  { id: 'ag_deploy_09', name: 'CI/CD Runner', policy: 'pol_aws_deploy', status: 'active', lastActivity: '30s ago', spend: '$45.50' },
];

export default function AgentsPage() {
  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-textPrimary font-sans">Agents</h1>
        <p className="text-[13px] text-textMuted mt-1">Monitor registered agents and their authorization status.</p>
      </div>

      <div className="bg-surface border border-border rounded-[8px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wider text-textMuted font-medium">
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Policy</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Activity</th>
              <th className="px-4 py-3 text-right">Spend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {agents.map(a => (
              <tr key={a.id} className="hover:bg-surface2/50 transition-colors text-[13px]">
                <td className="px-4 py-3 text-textPrimary font-medium">{a.name}</td>
                <td className="px-4 py-3 font-mono text-textMuted">{a.id}</td>
                <td className="px-4 py-3 font-mono text-accent">{a.policy}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${a.status === 'active' ? 'bg-[#22C55E]/10 text-[#22C55E]' : a.status === 'blocked' ? 'bg-[#FF5F56]/10 text-[#FF5F56]' : 'bg-surface2 text-textMuted'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'active' ? 'bg-[#22C55E]' : a.status === 'blocked' ? 'bg-[#FF5F56]' : 'bg-textMuted'}`}></span>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-textMuted">{a.lastActivity}</td>
                <td className="px-4 py-3 text-right font-mono text-textPrimary">{a.spend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

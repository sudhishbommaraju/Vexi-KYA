'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const allLogs = [
  { ts: '2026-03-28T00:24:51Z', level: 'INFO', msg: 'token.issued', detail: 'vx_91a8df21 → pol_aws_deploy · limit=$5000 · ttl=1h' },
  { ts: '2026-03-28T00:24:48Z', level: 'INFO', msg: 'policy.evaluated', detail: 'pol_stripe_only · mcc=5734 · result=ALLOW' },
  { ts: '2026-03-28T00:24:32Z', level: 'INFO', msg: 'transaction.approved', detail: 'ag_deployer_01 · vendor=aws · amount=$120.00' },
  { ts: '2026-03-28T00:23:15Z', level: 'WARN', msg: 'token.expired', detail: 'vx_f2e891c4 · ttl exceeded · destroyed' },
  { ts: '2026-03-28T00:22:04Z', level: 'ERROR', msg: 'transaction.blocked', detail: 'ag_buyer_03 · mcc=5411 · policy=DENY' },
  { ts: '2026-03-28T00:21:55Z', level: 'INFO', msg: 'policy.updated', detail: 'pol_budget_q1 · max_spend: 25000→30000' },
  { ts: '2026-03-28T00:20:11Z', level: 'WARN', msg: 'token.revoked', detail: 'vx_c4d920bb · manual revocation via API' },
  { ts: '2026-03-28T00:19:33Z', level: 'INFO', msg: 'transaction.approved', detail: 'ag_ops_07 · vendor=gcp · amount=$89.00' },
  { ts: '2026-03-28T00:18:01Z', level: 'INFO', msg: 'agent.registered', detail: 'ag_monitor_12 · policy=pol_budget_q1' },
  { ts: '2026-03-28T00:17:44Z', level: 'ERROR', msg: 'kyc.rejected', detail: 'user_8f2a · provider=persona · signal=false' },
  { ts: '2026-03-28T00:16:22Z', level: 'INFO', msg: 'token.issued', detail: 'vx_a1b2c3d4 → pol_gcp_infra · limit=$10000 · ttl=5h' },
  { ts: '2026-03-28T00:15:09Z', level: 'INFO', msg: 'transaction.approved', detail: 'ag_deploy_09 · vendor=aws · amount=$45.50' },
];

const categories = ['all', 'token', 'policy', 'transaction', 'agent', 'kyc'];

export default function LogsPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [category, setCategory] = useState('all');

  const filtered = allLogs.filter(l => {
    const matchSearch = !search || l.msg.includes(search) || l.detail.includes(search);
    const matchLevel = level === 'all' || l.level === level;
    const matchCat = category === 'all' || l.msg.startsWith(category);
    return matchSearch && matchLevel && matchCat;
  });

  return (
    <div className="max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-textPrimary font-sans">Live Logs</h1>
        <p className="text-[13px] text-textMuted mt-1">Real-time event stream from the authorization engine.</p>
      </div>

      <div className="flex gap-6">
        {/* Left: Filters */}
        <div className="w-[200px] flex-shrink-0 space-y-5">
          <div>
            <div className="text-[10px] font-bold text-textMuted uppercase tracking-[0.1em] mb-2">Level</div>
            <div className="space-y-0.5">
              {['all', 'INFO', 'WARN', 'ERROR'].map(f => (
                <button key={f} onClick={() => setLevel(f)} className={`w-full text-left px-3 py-[6px] rounded-[6px] text-[12px] font-medium transition-colors ${level === f ? 'bg-accent/10 text-accent' : 'text-textSecondary hover:text-textPrimary hover:bg-surface2'}`}>
                  {f === 'all' ? 'All Levels' : f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-textMuted uppercase tracking-[0.1em] mb-2">Category</div>
            <div className="space-y-0.5">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`w-full text-left px-3 py-[6px] rounded-[6px] text-[12px] font-medium transition-colors capitalize ${category === c ? 'bg-accent/10 text-accent' : 'text-textSecondary hover:text-textPrimary hover:bg-surface2'}`}>
                  {c === 'all' ? 'All Categories' : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Stream */}
        <div className="flex-1">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textMuted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="w-full h-[32px] pl-9 pr-3 rounded-[6px] bg-surface border border-border text-textPrimary text-[12px] placeholder:text-textMuted focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div className="bg-[#0A0D12] border border-border rounded-[8px] overflow-hidden font-mono text-[12px]">
            <div className="divide-y divide-border/50">
              {filtered.map((l, i) => (
                <div key={i} className="px-4 py-2.5 flex items-start gap-3 hover:bg-surface/30 transition-colors">
                  <span className="text-textMuted w-[160px] flex-shrink-0">{l.ts.replace('T', ' ').replace('Z', '')}</span>
                  <span className={`w-[45px] flex-shrink-0 font-bold ${l.level === 'INFO' ? 'text-textSecondary' : l.level === 'WARN' ? 'text-[#FFBD2E]' : 'text-[#FF5F56]'}`}>{l.level}</span>
                  <span className="text-accent w-[170px] flex-shrink-0">{l.msg}</span>
                  <span className="text-textMuted truncate">{l.detail}</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-textMuted">No logs match your filters.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

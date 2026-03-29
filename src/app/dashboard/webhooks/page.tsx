'use client';

import { useState } from 'react';
import { Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';

const initialWebhooks = [
  { id: 'wh_001', url: 'https://api.myapp.com/webhooks/vexi', events: ['token.issued', 'transaction.denied'], status: 'active', lastDelivery: '2m ago', lastStatus: 200 },
  { id: 'wh_002', url: 'https://slack.com/hooks/vexi-alerts', events: ['transaction.denied', 'token.revoked'], status: 'active', lastDelivery: '18m ago', lastStatus: 200 },
  { id: 'wh_003', url: 'https://old-service.com/hooks', events: ['token.issued'], status: 'failing', lastDelivery: '4h ago', lastStatus: 500 },
];

const availableEvents = ['token.issued', 'token.revoked', 'token.expired', 'transaction.authorized', 'transaction.denied', 'policy.updated', 'agent.registered', 'kyc.signal_received'];

export default function WebhooksPage() {
  const [webhooks] = useState(initialWebhooks);
  const [showCreate, setShowCreate] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleEvent = (e: string) => {
    setSelectedEvents(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  return (
    <div className="max-w-[900px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-textPrimary font-sans">Webhooks</h1>
          <p className="text-[13px] text-textMuted mt-1">Receive real-time event notifications via HTTP.</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="h-[32px] px-3 flex items-center gap-1.5 rounded-[6px] bg-accent text-white text-[12px] font-semibold hover:bg-[#1D4ED8] transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Endpoint
        </button>
      </div>

      {showCreate && (
        <div className="bg-surface border border-border rounded-[8px] p-5 mb-6 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-textMuted mb-1.5 block uppercase tracking-wider">Endpoint URL</label>
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://your-app.com/webhooks/vexi" className="w-full h-[36px] px-3 rounded-[6px] bg-background border border-border text-textPrimary text-[13px] font-mono placeholder:text-textMuted focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-textMuted mb-2 block uppercase tracking-wider">Events</label>
            <div className="flex flex-wrap gap-2">
              {availableEvents.map(e => (
                <button key={e} onClick={() => toggleEvent(e)} className={`px-2.5 py-1 rounded-[5px] text-[11px] font-mono font-medium transition-colors ${selectedEvents.includes(e) ? 'bg-accent/10 text-accent border border-accent/30' : 'bg-surface2 text-textMuted border border-border hover:text-textPrimary'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowCreate(false)} className="h-[32px] px-4 rounded-[6px] bg-accent text-white text-[12px] font-semibold hover:bg-[#1D4ED8] transition-colors">
            Create Webhook
          </button>
        </div>
      )}

      <div className="space-y-3">
        {webhooks.map(wh => (
          <div key={wh.id} className="bg-surface border border-border rounded-[8px] p-4 hover:border-accent/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {wh.status === 'active' ? <CheckCircle className="w-4 h-4 text-[#22C55E]" /> : <XCircle className="w-4 h-4 text-[#FF5F56]" />}
                <span className="font-mono text-[13px] text-textPrimary">{wh.url}</span>
              </div>
              <button className="p-1.5 rounded-[4px] text-textMuted hover:text-[#FF5F56] hover:bg-[#FF5F56]/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="text-textMuted">Events:</span>
                <div className="flex gap-1">
                  {wh.events.map(e => (
                    <span key={e} className="px-1.5 py-0.5 rounded-[3px] bg-surface2 text-textSecondary font-mono text-[10px]">{e}</span>
                  ))}
                </div>
              </div>
              <span className="text-textMuted">Last: {wh.lastDelivery}</span>
              <span className={`font-mono font-bold ${wh.lastStatus === 200 ? 'text-[#22C55E]' : 'text-[#FF5F56]'}`}>{wh.lastStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

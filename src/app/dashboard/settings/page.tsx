'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [workspace, setWorkspace] = useState('vexi-production');
  const [webhookUrl, setWebhookUrl] = useState('');

  return (
    <div className="max-w-[700px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-textPrimary font-sans">Settings</h1>
        <p className="text-[13px] text-textMuted mt-1">Manage workspace configuration.</p>
      </div>

      <div className="space-y-6">

        {/* General */}
        <div className="bg-surface border border-border rounded-[8px] p-5">
          <h2 className="text-[14px] font-semibold text-textPrimary mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-medium text-textMuted mb-1 block uppercase tracking-wider">Workspace Name</label>
              <input value={workspace} onChange={e => setWorkspace(e.target.value)} className="w-full h-[36px] px-3 rounded-[6px] bg-background border border-border text-textPrimary text-[13px] focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-textMuted mb-1 block uppercase tracking-wider">Workspace ID</label>
              <div className="h-[36px] px-3 rounded-[6px] bg-background border border-border text-textMuted text-[13px] font-mono flex items-center">ws_vexi_prod_01</div>
            </div>
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-surface border border-border rounded-[8px] p-5">
          <h2 className="text-[14px] font-semibold text-textPrimary mb-4">Webhooks</h2>
          <div>
            <label className="text-[11px] font-medium text-textMuted mb-1 block uppercase tracking-wider">Endpoint URL</label>
            <input value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} placeholder="https://your-app.com/webhooks/vexi" className="w-full h-[36px] px-3 rounded-[6px] bg-background border border-border text-textPrimary text-[13px] placeholder:text-textMuted focus:outline-none focus:border-accent transition-colors" />
            <p className="text-[11px] text-textMuted mt-2">Receive real-time events for token issuance, policy changes, and blocked transactions.</p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-surface border border-[#FF5F56]/30 rounded-[8px] p-5">
          <h2 className="text-[14px] font-semibold text-[#FF5F56] mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] text-textPrimary font-medium">Delete Workspace</div>
              <div className="text-[12px] text-textMuted">Permanently remove workspace and all associated data.</div>
            </div>
            <button className="h-[32px] px-3 rounded-[6px] border border-[#FF5F56]/50 text-[#FF5F56] text-[12px] font-semibold hover:bg-[#FF5F56]/10 transition-colors">
              Delete
            </button>
          </div>
        </div>

        <button className="h-[36px] px-5 rounded-[6px] bg-accent text-white text-[13px] font-semibold hover:bg-[#1D4ED8] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

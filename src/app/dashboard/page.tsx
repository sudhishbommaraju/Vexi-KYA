'use client';

import { useState } from 'react';
import { 
  MonitorSmartphone, Key, CheckCircle2, ChevronRight, 
  Command, DownloadCloud, Fingerprint, ArrowRight, Check, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
  const [copied, setCopied] = useState(false);
  const secretKey = 'vx_live_9a8df...e82c1';

  const copyToClipboard = () => {
    navigator.clipboard.writeText('vx_live_9a8df7c4b3a20bf1e82c1');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tasks = [
    { title: 'Download Vexi Desktop', completed: true },
    { title: 'Generate Agent Identity', completed: false },
    { title: 'Create first Delegation', completed: false },
    { title: 'Verify Signature', completed: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-sans font-bold text-textPrimary tracking-tight mb-2">Welcome to Vexi</h1>
        <p className="text-[15px] text-textSecondary">Manage your control plane and environment configurations.</p>
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-accent/20 via-surface to-surface border border-accent/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_-15px_rgba(37,99,235,0.2)]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-[12px] bg-accent/20 flex items-center justify-center flex-shrink-0 border border-accent/30">
            <MonitorSmartphone className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-textPrimary mb-1">Run Vexi KYA locally</h3>
            <p className="text-[14px] text-textSecondary leading-relaxed max-w-[480px]">
              Vexi is a hybrid architecture. To manage cryptographic identities, issue delegations, and verify agent signatures, you must download the desktop client.
            </p>
          </div>
        </div>
        <Link href="/dashboard/download" className="relative z-10 h-[44px] px-6 rounded-[8px] bg-accent text-white font-semibold flex items-center gap-2 hover:bg-[#1D4ED8] transition-all whitespace-nowrap group">
          Download App <DownloadCloud className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environment & Keys */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-textPrimary uppercase tracking-wider mb-5 flex items-center gap-2">
              <Key className="w-4 h-4 text-textSecondary" /> API Credentials
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-medium text-textMuted mb-1.5 block">Environment</label>
                <div className="flex items-center gap-2 h-[36px]">
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded-[6px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" /> Production
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-textMuted mb-1.5 block">Live Secret Key</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[40px] bg-surface2 border border-border rounded-[6px] px-3 flex items-center font-mono text-[13px] text-textPrimary tracking-tight">
                    {secretKey}
                  </div>
                  <button onClick={copyToClipboard} className="h-[40px] px-4 rounded-[6px] bg-surface2 border border-border text-[13px] font-medium text-textPrimary hover:bg-border transition-colors flex items-center gap-2">
                    {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Command className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-[12px] text-textMuted mt-2 flex items-start gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Pass this key to the desktop app to link your workspace.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Checklist */}
        <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm flex flex-col">
          <h3 className="text-[14px] font-bold text-textPrimary uppercase tracking-wider mb-5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-textSecondary" /> Getting Started
          </h3>
          
          <div className="space-y-1 flex-1">
            {tasks.map((task, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-[8px] transition-colors ${task.completed ? 'opacity-50' : 'bg-surface2 border border-border'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${task.completed ? 'bg-accent border-accent text-white' : 'border-border bg-surface'}`}>
                  {task.completed && <Check className="w-3 h-3" />}
                </div>
                <span className={`text-[14px] font-medium ${task.completed ? 'line-through text-textMuted' : 'text-textPrimary'}`}>
                  {task.title}
                </span>
                {!task.completed && (
                  <ChevronRight className="w-4 h-4 text-textMuted ml-auto" />
                )}
              </div>
            ))}
          </div>
          
          <Link href="/dashboard/download" className="mt-4 text-[13px] text-accent font-medium hover:underline flex items-center gap-1 group w-max">
            Go to Next Step <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}

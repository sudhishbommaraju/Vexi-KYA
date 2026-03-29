'use client';

import Link from 'next/link';
import { FileCode, ExternalLink } from 'lucide-react';

const endpoints = [
  { method: 'POST', path: '/v1/tokens/create', desc: 'Issue a new scoped token with policy constraints.' },
  { method: 'GET', path: '/v1/tokens/:id', desc: 'Retrieve a token by ID.' },
  { method: 'DELETE', path: '/v1/tokens/:id', desc: 'Revoke an active token.' },
  { method: 'POST', path: '/v1/authorize', desc: 'Submit a transaction for policy evaluation.' },
  { method: 'GET', path: '/v1/policies', desc: 'List all policies in the workspace.' },
  { method: 'POST', path: '/v1/policies/create', desc: 'Create a new policy.' },
  { method: 'GET', path: '/v1/agents', desc: 'List all registered agents.' },
  { method: 'GET', path: '/v1/logs', desc: 'Query the audit log stream.' },
];

const methodColor: Record<string, string> = {
  GET: 'text-[#22C55E] bg-[#22C55E]/10',
  POST: 'text-accent bg-accent/10',
  DELETE: 'text-[#FF5F56] bg-[#FF5F56]/10',
};

export default function DocsPage() {
  return (
    <div className="max-w-[900px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-textPrimary font-sans">API Docs</h1>
        <p className="text-[13px] text-textMuted mt-1">REST API reference for the Vexi authorization engine.</p>
      </div>

      <div className="bg-surface border border-border rounded-[8px] p-5 mb-6">
        <div className="text-[11px] font-bold text-textMuted mb-2 uppercase tracking-wider">Base URL</div>
        <code className="text-[14px] font-mono text-accent">https://api.vexi.dev</code>
      </div>

      <div className="bg-surface border border-border rounded-[8px] overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-[13px] font-semibold text-textPrimary">Endpoints</h2>
        </div>
        <div className="divide-y divide-border">
          {endpoints.map((ep, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-surface2/50 transition-colors">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] w-[55px] text-center ${methodColor[ep.method]}`}>{ep.method}</span>
              <span className="font-mono text-[13px] text-textPrimary w-[240px]">{ep.path}</span>
              <span className="text-[12px] text-textMuted flex-1">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/docs" className="flex items-center gap-1.5 text-[13px] text-accent hover:underline mt-4">
        <ExternalLink className="w-3.5 h-3.5" /> View full documentation
      </Link>
    </div>
  );
}

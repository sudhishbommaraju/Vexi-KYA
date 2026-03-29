'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Download, Fingerprint, ShieldCheck, Play, ScrollText, Settings,
  Plus, LogOut, ChevronDown, MonitorSmartphone
} from 'lucide-react';
import { useState } from 'react';

const sections = [
  {
    label: 'CONTROL PLANE',
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/download', label: 'Download App', icon: Download },
    ],
  },
  {
    label: 'CRYPTOGRAPHY (Requires App)',
    items: [
      { href: '/dashboard/identities', label: 'Identities', icon: Fingerprint },
      { href: '/dashboard/delegations', label: 'Delegations', icon: ShieldCheck },
      { href: '/dashboard/verification', label: 'Verification', icon: Play },
      { href: '/dashboard/audit', label: 'Audit Logs', icon: ScrollText },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userMenu, setUserMenu] = useState(false);

  const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;

  return (
    <div className="min-h-screen bg-background flex font-inter">

      {/* Sidebar */}
      <aside className="w-[260px] border-r border-border bg-surface flex flex-col flex-shrink-0 sticky top-0 h-screen">

        {/* Logo */}
        <div className="h-14 px-5 flex items-center border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 bg-textPrimary rounded-[4px] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 4 12 20 20 4"></polyline></svg>
            </div>
            <span className="font-bold text-[15px] text-textPrimary tracking-tight">Vexi KYA</span>
          </Link>
        </div>

        {/* Workspace selector */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[4px] bg-accent/20 flex items-center justify-center text-accent text-[11px] font-bold">VX</div>
              <span className="text-[13px] font-semibold text-textPrimary">vexi-production</span>
            </div>
            <ChevronDown className="w-4 h-4 text-textMuted group-hover:text-textPrimary transition-colors" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
          {sections.map(section => (
            <div key={section.label}>
              <div className="px-3 mb-2 text-[10px] font-bold text-textMuted tracking-[0.08em] uppercase flex items-center gap-2">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[13px] font-medium transition-all ${active ? 'bg-accent/10 text-accent shadow-[inset_0_0_0_1px_rgba(37,99,235,0.15)]' : 'text-textSecondary hover:text-textPrimary hover:bg-surface2'}`}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-border bg-surface2/50">
          <div className="flex items-center gap-2 text-[12px]">
            {isTauri ? (
              <>
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-[#22C55E] font-medium">Running locally</span>
              </>
            ) : (
              <>
                <MonitorSmartphone className="w-4 h-4 text-accent" />
                <span className="text-textSecondary">Hybrid architecture active</span>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 border-b border-border flex items-center justify-end px-6 bg-surface/80 flex-shrink-0 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setUserMenu(!userMenu)} className="h-8 w-8 rounded-full bg-surface2 border border-border flex items-center justify-center text-[12px] font-bold text-textPrimary hover:bg-border transition-colors">
                D
              </button>
              {userMenu && (
                <div className="absolute right-0 top-10 w-[180px] bg-surface border border-border rounded-[8px] shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <div className="text-[13px] text-textPrimary font-medium">demo@vexi.dev</div>
                  </div>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-[13px] text-textSecondary hover:text-textPrimary hover:bg-surface2 transition-colors">
                    <Settings className="w-3.5 h-3.5" /> Settings
                  </Link>
                  <Link href="/" className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#FF5F56] hover:bg-[#FF5F56]/10 transition-colors">
                    <LogOut className="w-3.5 h-3.5" /> Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-auto bg-background" onClick={() => setUserMenu(false)}>
          <div className="max-w-[1000px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

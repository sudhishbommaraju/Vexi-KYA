'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-[13px]">
        
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-textPrimary rounded-[4px] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 4 12 20 20 4"></polyline></svg>
            </div>
            <span className="font-extrabold text-[14px] text-textPrimary tracking-tight">Vexi</span>
          </Link>
          <p className="text-textSecondary mb-4 pr-4">
            The Know Your Agent (KYA) standard for autonomous financial transactions.
          </p>
          <p className="text-textMuted text-[12px]">© {new Date().getFullYear()} Vexi, Inc.</p>
        </div>

        <div>
          <h4 className="font-bold text-textPrimary mb-4">Platform</h4>
          <ul className="space-y-3">
            <li><Link href="/dashboard" className="text-textSecondary hover:text-accent transition-colors">Dashboard</Link></li>
            <li><Link href="/about" className="text-textSecondary hover:text-accent transition-colors">What is KYA?</Link></li>
            <li><Link href="/demo" className="text-textSecondary hover:text-accent transition-colors">Interactive Demo</Link></li>
            <li><Link href="/pricing" className="text-textSecondary hover:text-accent transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-textPrimary mb-4">Developers</h4>
          <ul className="space-y-3">
            <li><Link href="/docs" className="text-textSecondary hover:text-accent transition-colors">API Reference</Link></li>
            <li><Link href="/dashboard/sdks" className="text-textSecondary hover:text-accent transition-colors">SDKs</Link></li>
            <li><Link href="/dashboard/webhooks" className="text-textSecondary hover:text-accent transition-colors">Webhooks</Link></li>
            <li><Link href="/status" className="text-textSecondary hover:text-accent transition-colors">System Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-textPrimary mb-4">Compliance</h4>
          <ul className="space-y-3">
            <li><Link href="/security" className="text-textSecondary hover:text-accent transition-colors">Security</Link></li>
            <li><Link href="/kyc" className="text-textSecondary hover:text-accent transition-colors">KYC Standards</Link></li>
            <li><Link href="/terms" className="text-textSecondary hover:text-accent transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-textSecondary hover:text-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

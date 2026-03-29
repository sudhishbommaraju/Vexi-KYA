'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const NAV_LINKS = [
    { label: 'Problem', href: '/problem' },
    { label: 'Core KYA', href: '/core-kya' },
    { label: 'About', href: '/about' },
    { label: 'Demo', href: '/demo' },
    { label: 'Docs', href: '/docs' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 border-b z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#020409]/80 backdrop-blur-xl border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-textPrimary rounded-[6px] flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
            <ShieldCheck className="w-4 h-4 text-background group-hover:text-white" />
          </div>
          <span className="font-extrabold text-[16px] text-textPrimary tracking-tight">Vexi KYA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`text-[13px] font-medium relative py-2 group transition-colors ${isActive ? 'text-textPrimary' : 'text-textSecondary hover:text-textPrimary'}`}>
                {link.label}
                <span className={`absolute left-0 bottom-0 h-[2px] w-full bg-accent origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="hidden sm:flex text-[13px] font-medium text-textSecondary hover:text-textPrimary transition-colors relative group py-2">
            Sign In
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-textPrimary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
          <Link href="/auth" className="h-[34px] px-4 rounded-[6px] bg-[#E6EAF0] text-[#020409] text-[13px] font-semibold flex items-center justify-center hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300">
            Start Building
          </Link>
        </div>
      </div>
    </header>
  );
}

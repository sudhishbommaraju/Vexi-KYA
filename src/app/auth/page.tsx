import { Suspense } from 'react';
import Link from 'next/link';
import { AuthFlow } from '@/components/auth/AuthFlow';
import { FloatingAuthBackground } from '@/components/auth/FloatingAuthBackground';

export default function AuthPage() {
  return (
    <div className="relative min-h-screen bg-[#020409] font-inter flex flex-col justify-center overflow-hidden py-24 selection:bg-accent/30 selection:text-white">
      <FloatingAuthBackground />

      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 4 12 20 20 4"></polyline></svg>
          </div>
          <span className="font-extrabold text-[18px] text-white tracking-tight">Vexi</span>
        </Link>
      </div>

      <main className="w-full relative z-10 px-4 mt-8 md:mt-0">
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
          <AuthFlow />
        </Suspense>
      </main>
    </div>
  );
}

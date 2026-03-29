'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ShieldAlert } from 'lucide-react';

export function SecurityPanel() {
  const revealRef = useScrollReveal();

  return (
    <section ref={revealRef} id="security" className="py-24 px-6 bg-[#111214] border-y border-[#23262B]">
      <div className="max-w-5xl mx-auto">
        <div className="reveal p-10 md:p-16 rounded-xl bg-[#0B0C0E] border border-[#23262B] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          {/* Subtle grid bg inside panel */}
          <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #E7E8EA 1px, transparent 1px), linear-gradient(to bottom, #E7E8EA 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-[#16181C] border border-[#23262B] flex-shrink-0">
            <ShieldAlert className="w-12 h-12 text-[#4F6FFF]" />
          </div>

          <div className="relative z-10 flex-1">
            <div className="text-xs font-mono text-accent uppercase tracking-widest mb-3">Enterprise ready</div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Built for financial-grade controls.</h2>
            <p className="text-sm text-secondary mb-8">
              SOC2 Type II, PCI-DSS Level 1 compliant infrastructure designed specifically to protect organizations against runaway, hallucinatory, or compromised large language models.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="text-sm font-medium">Hardware Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="text-sm font-medium">Idempotent execution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="text-sm font-medium">99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="text-sm font-medium">Zero-trust architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

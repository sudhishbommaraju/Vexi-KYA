import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Target, Database, Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24 selection:bg-accent/30 selection:text-textPrimary font-inter">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-[600] font-sans tracking-tight text-textPrimary mb-4">Infrastructure Security</h1>
            <p className="text-[18px] text-textSecondary max-w-3xl leading-relaxed font-medium">
              Enterprise-grade risk management. Vexi was built on the assumption that AI agents will eventually fail. Our physical network layer exists to contain and neutralize that failure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            
            {/* Policy Enforcement */}
            <div className="border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between">
              <div>
                <Shield className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-[16px] font-bold text-textPrimary mb-3 font-sans">Deterministic Enforcement</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed">
                  Policies are not suggestions. Vexi acts as a zero-trust interception network between the agent's intent and the physical credit rail.
                </p>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between">
              <div>
                <Database className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-[16px] font-bold text-textPrimary mb-3 font-sans">Immutable Audit Trail</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed">
                  Every API call, policy modification, and transaction decline is permanently logged with cryptographic timestamping for SOC2 compliance.
                </p>
              </div>
            </div>

            {/* Token Expiration */}
            <div className="border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between">
              <div>
                <Clock className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-[16px] font-bold text-textPrimary mb-3 font-sans">Tear-down Expiration</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed">
                  Tokens default to 1-hour lifespans. If an agent compromises a token in logging, the attack surface mathematically collapses to zero upon expiry.
                </p>
              </div>
            </div>

            {/* KYC Signal Support */}
            <div className="lg:col-span-2 border border-[#27C93F]/30 bg-[#0F1D16]/40 rounded-[12px] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                 <CheckCircle2 className="w-32 h-32 text-[#27C93F]" />
              </div>
              <div className="relative z-10">
                <CheckCircle2 className="w-6 h-6 text-[#27C93F] mb-4" />
                <h3 className="text-[20px] font-bold text-textPrimary mb-3 font-sans">Explicit KYC Signal Integration</h3>
                <p className="text-[14px] text-[#A3ADBA] max-w-xl leading-relaxed mb-6">
                  We integrate natively with global KYC operators. You can write firm policies demanding a verified <code>kyc_signal === true</code> before Vexi processes even a penny of the requested transaction load. No identity, no execution.
                </p>
                <div className="bg-[#0A0D12] border border-[#27C93F]/50 px-4 py-2 rounded-[6px] font-mono text-[12px] inline-flex items-center gap-2">
                  <span className="text-[#A5F3FC]">require_kyc</span>: <span className="text-[#FFBD2E]">true</span>
                </div>
              </div>
            </div>

            {/* Revocation */}
            <div className="border border-[#FF5F56]/30 bg-[#1A1110]/80 rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(255,95,86,0.1)] transition-all flex flex-col justify-between">
              <div>
                <Zap className="w-6 h-6 text-[#FF5F56] mb-4" />
                <h3 className="text-[16px] font-bold text-textPrimary mb-3 font-sans">Killbox Revocation</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed">
                  Halt an agent mid-execution. A revocation command propagates through our global edge nodes in under 50 milliseconds.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Key, Network, Play, UserCheck, ShieldCheck, Database, CreditCard } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24 selection:bg-accent/30 selection:text-textPrimary font-inter">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-[600] font-sans tracking-tight text-textPrimary mb-4">Core Infrastructure</h1>
            <p className="text-[16px] text-textSecondary leading-relaxed">
              Vexi provides the exact physical primitives necessary to grant agents spending power with zero compromise on corporate governance.
            </p>
          </div>

          {/* High Density Feature Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            
            {/* Policy Engine */}
            <div className="lg:col-span-2 border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between">
              <div>
                <Shield className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-2xl font-bold text-textPrimary mb-3 font-sans">Policy Engine</h3>
                <p className="text-[14px] text-textSecondary max-w-md leading-relaxed">
                  The semantic brain of Vexi. Define JSON structures that parse, evaluate, and reject transactions based on Merchant Category Codes, explicit allowlists, and contextual metadata extracted from the agent graph.
                </p>
              </div>
              <div className="mt-8 bg-[#0B0F14] border border-border p-4 rounded-[6px] font-mono text-[11px] text-textMuted shadow-inner max-w-sm">
                "Resource": "merchant:AWS",<br/>
                "Condition": {'{'} "NumericLessThan": {'{'} "amount": 500 {'}'} {'}'}
              </div>
            </div>

            {/* Spend Controls */}
            <div className="border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between">
              <div>
                <CreditCard className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-xl font-bold text-textPrimary mb-3 font-sans">Velocity Spend Controls</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed">
                  Hardcode non-overrideable daily, weekly, and monthly velocity thresholds natively into the issuance schema.
                </p>
              </div>
            </div>

            {/* Agent Isolation */}
            <div className="border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all">
              <Network className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-xl font-bold text-textPrimary mb-3 font-sans">Agent Isolation</h3>
              <p className="text-[14px] text-textSecondary leading-relaxed">
                Partition capital pools so that a compromised agent running rogue code cannot drain sibling application balances.
              </p>
            </div>

            {/* Audit Logs */}
            <div className="lg:col-span-2 flex flex-col md:flex-row gap-6">
              <div className="flex-1 border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] transition-all">
                <Database className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-xl font-bold text-textPrimary mb-3 font-sans">Cryptographic Audit Logs</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed mb-6">
                  Extract permanent hashes validating the exact prompt, user intent, and agent state that requested a transaction. Perfect traceability for compliance officers.
                </p>
                <div className="w-full h-2 bg-surface2 rounded-full overflow-hidden flex"><div className="bg-accent w-[40%]"></div><div className="bg-[#FFBD2E] w-[20%]"></div><div className="bg-[#FF5F56] w-[10%]"></div></div>
              </div>
              <div className="flex-1 border border-border bg-surface rounded-[12px] p-8 hover:-translate-y-[2px] transition-all relative overflow-hidden group">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#FF5F56] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Play className="w-6 h-6 text-[#FF5F56] mb-4 transform rotate-180" />
                <h3 className="text-xl font-bold text-textPrimary mb-3 font-sans">Sub-50ms Revocation</h3>
                <p className="text-[14px] text-textSecondary leading-relaxed">
                  Instantly destroy and freeze any active virtual card globally utilizing our low-latency global invalidation edge network.
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

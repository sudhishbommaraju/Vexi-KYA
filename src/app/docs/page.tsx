import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Terminal, Copy, ShieldAlert } from 'lucide-react';

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-24 font-inter">
        
        <div className="flex border-t border-border mt-6">
          
          {/* Developer Sidebar Layout */}
          {/* Developer Sidebar Layout */}
          <aside className="hidden lg:block w-[280px] border-r border-border h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto bg-surface/30 backdrop-blur-md">
             <div className="p-8">
              <div className="mb-10">
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-textMuted mb-4">Introduction</h4>
                <ul className="space-y-3 text-[14px] font-medium font-inter">
                  <li><a href="#" className="text-accent flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Getting Started</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Architecture Overview</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Identity Chain Model</a></li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-textMuted mb-4">Core API</h4>
                <ul className="space-y-3 text-[14px] font-medium font-inter">
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Create Delegation Token</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Create Policy</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Issue Token</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Verify Signature</a></li>
                </ul>
              </div>

              <div className="mb-10">
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-textMuted mb-4">Integrations</h4>
                <ul className="space-y-3 text-[14px] font-medium font-inter">
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">KYC Binding</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Webhooks</a></li>
                  <li><a href="#" className="text-textSecondary hover:text-white transition-colors">Compliance Mapping</a></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Docs Content */}
          <div className="flex-1 max-w-4xl mx-auto px-8 lg:px-16 py-16">
            
            <div className="mb-4 text-[13px] font-bold text-accent tracking-widest uppercase font-mono">Core API</div>
            <h1 className="text-[42px] font-bold font-sans tracking-tight text-white mb-6">Issue KYA Token</h1>
            <p className="text-[18px] text-textSecondary leading-relaxed mb-12 font-inter">
              The issue token endpoint is the core functional unit binding an immutable policy rule to an AI agent entity. Without a cryptographically verified token, the agent carries zero financial authority.
            </p>

            <div className="bg-[#1A1110]/50 border-l-2 border-[#FF5F56] p-6 mb-12 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-[#FF5F56] flex-shrink-0 mt-0.5" />
              <div className="text-[15px] text-textSecondary leading-relaxed font-inter">
                <strong className="text-white block mb-2 font-semibold font-sans">KYC Verification Enforcement</strong>
                If your platform requires explicit KYC/AML compliance, you must define <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#FFBD2E] font-mono text-[13px]">kyc_required: true</code> when creating the policy. A token will permanently fail issuance if the <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#FFBD2E] font-mono text-[13px]">kyc_signal</code> attached to the parent user object is false.
              </div>
            </div>

            <h2 className="text-[28px] font-semibold text-white mb-6 font-sans">Cryptographic Issuance</h2>
            <p className="text-[16px] text-textSecondary leading-relaxed mb-8 font-inter">
              When constructing the issuance request, map the external identity provider's truth signal directly to the payload. This ensures the trust chain is unbroken from human to agent.
            </p>

            <div className="bg-[#0A0D12] border border-border rounded-[12px] overflow-hidden mb-12 group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
              <div className="bg-surface2/50 border-b border-border px-5 py-3 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[13px] font-mono text-textMuted">
                  <Terminal className="w-4 h-4" /> Node.js / TypeScript
                </div>
                <button className="text-textMuted hover:text-white transition-colors duration-300"><Copy className="w-4 h-4" /></button>
              </div>
              <div className="p-8 font-mono text-[14px] overflow-auto leading-loose relative text-textPrimary">
                <span className="text-accentSoft">const</span> <span className="text-[#A5D6FF]">sessionToken</span> = <span className="text-accentSoft">await</span> vexi.tokens.<span className="text-[#A5D6FF]">create</span>({'{'}<br/>
                {'  '}policy: <span className="text-[#A5F3FC]">"pol_strict_verified_only"</span>,<br/>
                {'  '}kyc_required: <span className="text-[#FFBD2E]">true</span>,<br/>
                {'  '}max_spend: <span className="text-[#FCD34D]">10000</span>,<br/>
                {'  '}ed25519_signature: <span className="text-[#A5F3FC]">"sig_89xf2j..."</span><br/>
                {'}'});
              </div>
            </div>

            <h3 className="text-[24px] font-semibold text-white mb-6 font-sans mt-16">Response Schema</h3>
            <p className="text-[16px] text-textSecondary leading-relaxed mb-8 font-inter">
              A successful issuance generates a cryptographically active virtual token bounded by the policy parameters.
            </p>
            
            <div className="bg-surface border border-border rounded-[12px] overflow-hidden">
               <table className="w-full text-left text-[15px] font-inter">
                 <thead className="bg-surface2 border-b border-border text-textSecondary font-semibold">
                   <tr>
                     <th className="px-6 py-4 font-sans text-white">Property</th>
                     <th className="px-6 py-4 font-sans text-white">Type</th>
                     <th className="px-6 py-4 font-sans text-white">Description</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border text-textSecondary">
                   <tr className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-5 font-mono text-accent text-[13px]">token_id</td>
                     <td className="px-6 py-5 font-mono text-textPrimary text-[13px]">string</td>
                     <td className="px-6 py-5">The globally unique identifier for the issued KYA token.</td>
                   </tr>
                   <tr className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-5 font-mono text-accent text-[13px]">kyc_status</td>
                     <td className="px-6 py-5 font-mono text-textPrimary text-[13px]">boolean</td>
                     <td className="px-6 py-5">Confirmed boolean asserting the identity provider successfully signed the state.</td>
                   </tr>
                   <tr className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-5 font-mono text-accent text-[13px]">expires_at</td>
                     <td className="px-6 py-5 font-mono text-textPrimary text-[13px]">unix_timestamp</td>
                     <td className="px-6 py-5">Crucial timestamp dictating immediate network destruction.</td>
                   </tr>
                 </tbody>
               </table>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

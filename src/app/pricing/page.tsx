import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 pb-24 selection:bg-accent/30 selection:text-textPrimary font-inter">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-textPrimary mb-4">Transparent Infrastructure Pricing</h1>
            <p className="text-textSecondary text-[16px] max-w-2xl mx-auto">
              Pay strictly for the volume of autonomous transactions your system authorizes. No hidden gateway fees or percentage cuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
            
            {/* Developer Tier */}
            <div className="border border-border bg-surface rounded-[8px] p-8 flex flex-col hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300">
              <h3 className="text-lg font-bold text-textPrimary">Developer</h3>
              <p className="text-[13px] text-textSecondary mt-2">For individuals building autonomous side projects.</p>
              <div className="text-4xl font-bold text-textPrimary my-6"><span className="text-lg text-textMuted mr-1">$</span>0<span className="text-[14px] text-textMuted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> First 100 transactions free
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> Basic rate limits (10/sec)
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> 1 active integration
                </li>
              </ul>
              <button className="w-full text-[14px] h-10 font-medium rounded-[6px] bg-background border border-border text-textPrimary hover:bg-surface2 hover:-translate-y-[1px] shadow-sm transition-all focus:ring-2 focus:ring-accent focus:outline-none">Get Started Free</button>
            </div>

            {/* Scale Tier */}
            <div className="border-2 border-accent bg-surface rounded-[8px] p-8 flex flex-col relative hover:shadow-[0_8px_30px_rgba(108,123,255,0.15)] hover:-translate-y-[2px] transition-all duration-300 transform scale-105 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">RECOMMENDED</div>
              <h3 className="text-lg font-bold text-textPrimary">Pro</h3>
              <p className="text-[13px] text-textSecondary mt-2">For startups shipping autonomous agents to production.</p>
              <div className="text-4xl font-bold text-textPrimary my-6"><span className="text-lg text-textMuted mr-1">$</span>99<span className="text-[14px] text-textMuted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> Up to 10,000 transactions/mo
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> $0.05 per additional tx
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> Prioritized support SLAs
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> Unlimited integrations
                </li>
              </ul>
              <button className="w-full text-[14px] h-10 font-medium rounded-[6px] bg-accent text-white hover:brightness-110 shadow-md hover:-translate-y-[1px] transition-all focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background focus:outline-none">Upgrade to Pro</button>
            </div>

            {/* Enterprise Tier */}
            <div className="border border-border bg-surface rounded-[8px] p-8 flex flex-col hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300">
              <h3 className="text-lg font-bold text-textPrimary">Enterprise</h3>
              <p className="text-[13px] text-textSecondary mt-2">For large organizations requiring bespoke infrastructure.</p>
              <div className="text-4xl font-bold text-textPrimary my-6">Custom</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> Volume-based custom discounts
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> VPC Peering & On-Prem routing
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> Dedicated Success Manager
                </li>
                <li className="text-[14px] text-textSecondary flex items-start gap-3">
                  <span className="text-accent">✓</span> 99.999% Uptime SLA
                </li>
              </ul>
              <button className="w-full text-[14px] h-10 font-medium rounded-[6px] bg-background border border-border text-textPrimary hover:bg-surface2 hover:-translate-y-[1px] shadow-sm transition-all focus:ring-2 focus:ring-accent focus:outline-none">Contact Sales</button>
            </div>
          </div>

          {/* Usage Calculator */}
          <div className="max-w-3xl mx-auto border border-border bg-surface2 rounded-[8px] p-8 md:p-10 shadow-sm">
             <h3 className="text-xl font-bold tracking-tight text-textPrimary mb-2">Estimate Your Volume</h3>
             <p className="text-[14px] text-textSecondary mb-8">Move the slider to calculate estimated monthly costs based on your deployed agent interactions.</p>
             
             <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 w-full">
                  <input type="range" min="1000" max="500000" defaultValue="45000" className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent" />
                  <div className="flex justify-between text-[12px] text-textMuted mt-4 font-mono">
                    <span>1k</span>
                    <span>500k+ Transactions</span>
                  </div>
                </div>
                
                <div className="w-full md:w-48 bg-background border border-border rounded-[6px] p-4 text-center">
                  <div className="text-[11px] text-textSecondary uppercase tracking-wider font-semibold mb-1">Est. Cost</div>
                  <div className="text-2xl font-bold text-textPrimary"><span className="text-accent">$</span>274</div>
                  <div className="text-[12px] text-textMuted mt-1">/ month</div>
                </div>
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

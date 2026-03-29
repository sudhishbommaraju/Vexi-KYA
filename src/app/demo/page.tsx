'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Settings, Play, Database, CheckCircle2, Loader2, StopCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DemoPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [showJson, setShowJson] = useState(false);

  const rawCode = `import { VexiClient } from '@vexi/node';

const vexi = new VexiClient({
  token: process.env.VEXI_KEY
});

const session = await vexi.tokens.create({
  policy: 'pol_aws_deployment_only',
  max_spend: 25000,
  expires_in: '1h',
  agent_id: 'ag_deployer_01'
});`;

  const runDemo = () => {
    if (status === 'running') return;
    setStatus('running');
    setLogs([]);
    setShowJson(false);

    const steps = [
      "Connecting to Vexi KYA Network...",
      "Validating human identity proof...",
      "Evaluating agent ED25519 signature...",
      "Resolving strict policy constraints...",
      "Applying spend limits and velocity caps...",
      "Cryptographic token minted"
    ];

    let currentStep = 0;
    
    // Simulate staggered network latency
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowJson(true);
          setStatus('success');
        }, 300);
      }
    }, 400); // 400ms per log line
  };

  const resetDemo = () => {
    setStatus('idle');
    setLogs([]);
    setShowJson(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24 selection:bg-accent/30 selection:text-textPrimary font-inter">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="text-[52px] font-semibold tracking-tight text-white mb-6 font-sans">Run Vexi KYA Locally</h1>
            <p className="text-textSecondary text-[18px] leading-relaxed font-inter">
              See exactly how your agents negotiate deterministic financial authorization with cryptographic identity proofs before transaction execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
            
            {/* Left: Code Editor */}
            <div className="lg:col-span-5 border border-border rounded-[12px] bg-surface overflow-hidden shadow-sm flex flex-col h-[520px]">
              <div className="bg-surface2 px-5 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Settings className="w-4 h-4 text-textMuted" />
                   <h2 className="text-[13px] font-mono text-textPrimary tracking-wide">execute.ts</h2>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
              </div>
              
              <div className="p-5 flex-1 bg-surface font-mono text-[14px] overflow-auto leading-relaxed relative group">
                {/* Syntax Highlighting Mapping (Hardcoded for this specific demo content) */}
                <div className="text-textPrimary">
                  <span className="text-accentSoft">import</span> {'{'} VexiClient {'}'} <span className="text-accentSoft">from</span> <span className="text-[#A5F3FC]" >'@vexi/node'</span>;<br/><br/>
                  <span className="text-accentSoft">const</span> <span className="text-[#A5D6FF]">vexi</span> = <span className="text-accentSoft">new</span> VexiClient({'{'}<br/>
                  {'  '}token: process.<span className="text-[#A5D6FF]">env</span>.VEXI_KEY<br/>
                  {'}'});<br/><br/>
                  <span className="text-accentSoft">const</span> <span className="text-[#A5D6FF]">session</span> = <span className="text-accentSoft">await</span> vexi.tokens.<span className="text-[#A5D6FF]">create</span>({'{'}<br/>
                  {'  '}policy: <span className="text-[#A5F3FC]">'pol_aws_deployment_only'</span>,<br/>
                  {'  '}max_spend: <span className="text-[#FCD34D]">25000</span>,<br/>
                  {'  '}expires_in: <span className="text-[#A5F3FC]">'1h'</span>,<br/>
                  {'  '}agent_id: <span className="text-[#A5F3FC]">'ag_deployer_01'</span><br/>
                  {'}'});
                </div>
              </div>

              <div className="p-6 border-t border-border bg-background flex gap-4">
                {status === 'idle' || status === 'success' ? (
                  <button onClick={status === 'success' ? resetDemo : runDemo} className="flex-1 bg-white text-[#020409] font-bold text-[15px] font-sans rounded-[8px] py-3.5 flex items-center justify-center gap-2 hover:bg-[#E6EDF3] transition-all shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50">
                    {status === 'success' ? <><Settings className="w-5 h-5" /> Reset Simulation</> : <><Play className="w-5 h-5" /> Execute Payload</>}
                  </button>
                ) : (
                  <button disabled className="flex-1 bg-surface2 border border-border text-textMuted font-bold text-[14px] rounded-[8px] py-3.5 flex items-center justify-center gap-2 cursor-not-allowed">
                    <Loader2 className="w-5 h-5 animate-spin" /> Resolving Cryptography...
                  </button>
                )}
              </div>
            </div>

            {/* Right: Output Panel */}
            <div className="lg:col-span-7 flex flex-col gap-6 h-[520px]">
               
               {/* Terminal Interface */}
               <div className="w-full border border-border rounded-[12px] bg-[#000000] overflow-hidden shadow-sm flex-1 flex flex-col relative group">
                 <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                 
                 <div className="bg-[#0B0F14] px-4 py-3 border-b border-border text-[12px] font-mono text-textMuted flex items-center justify-between z-10">
                   <div className="flex items-center gap-2">
                     <Database className="w-4 h-4" /> Terminal Output
                   </div>
                   {status === 'success' && <div className="flex items-center gap-1.5 text-green-500 font-bold tracking-wide"><CheckCircle2 className="w-3.5 h-3.5" /> 200 OK</div>}
                 </div>
                 
                 <div className="p-6 font-mono text-[13px] overflow-y-auto flex-1 z-10 scrollbar-hide flex flex-col">
                   {status === 'idle' && (
                     <div className="text-textMuted flex items-center">
                       Waiting for execution... <span className="w-2 h-4 bg-textMuted animate-cursor-blink inline-block align-middle ml-2"></span>
                     </div>
                   )}
                   
                   {/* Render Staggered Logs */}
                   {logs.map((log, i) => (
                     <div key={i} className={`flex items-start gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${i === logs.length - 1 && status === 'running' ? 'text-textPrimary' : 'text-textSecondary'}`}>
                       <span className="text-textMuted whitespace-nowrap pt-[2px]">{'>'}</span> 
                       <span className="leading-relaxed">{log}</span>
                     </div>
                   ))}

                   {status === 'running' && logs.length > 0 && (
                     <div className="mt-2 ml-4 w-2 h-4 bg-accent animate-cursor-blink inline-block align-middle"></div>
                   )}

                   {/* Render Final JSON Response */}
                   {showJson && (
                     <div className="mt-4 animate-in fade-in zoom-in-95 duration-500 origin-top">
                       <pre className="text-textPrimary bg-[#0A0D12] p-4 rounded-[6px] border border-border shadow-inner">
{`{
  "token_id": "kya_demo_91a8df21",
  "identity_root": "usr_verified_44x9",
  "policy": "pol_aws_deployment_only",
  "max_spend": 25000,
  "signature": "valid",
  "expires_in": "1h",
  "agent_id": "ag_deployer_01",
  "status": "active"
}`}
                       </pre>
                       
                       {/* Metadata Badges */}
                       <div className="flex gap-3 mt-6 flex-wrap">
                         <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px] text-[12px] font-bold text-white tracking-wide flex items-center gap-2 shadow-sm font-sans">
                           <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(37,99,235,0.8)]"></span> Latency: 42ms
                         </div>
                         <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px] text-[12px] font-bold text-white tracking-wide flex items-center gap-2 shadow-sm font-sans">
                           <span className="w-2 h-2 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.8)]"></span> Cryptography verified
                         </div>
                         <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px] text-[12px] font-bold text-white tracking-wide flex items-center gap-2 shadow-sm font-sans">
                           <span className="w-2 h-2 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.8)]"></span> Velocity limits nominal
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

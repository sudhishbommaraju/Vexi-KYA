'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, CheckCircle2 } from 'lucide-react';

export function ComplianceTerminal() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      action: 'POST /v1/identities',
      payload: '{\n  "type": "organization",\n  "name": "Acme Corp",\n  "verified_kyc": true\n}',
      response: 'id_01hqxyz... generated',
      delay: 0,
    },
    {
      action: 'POST /v1/agents',
      payload: '{\n  "parent_id": "id_01hqxyz...",\n  "name": "Procurement Bot",\n  "budget": 5000\n}',
      response: 'ag_99jkl... provisioned',
      delay: 2000,
    },
    {
      action: 'POST /v1/authorize',
      payload: '{\n  "agent_id": "ag_99jkl...",\n  "scope": ["stripe_api", "aws_api"],\n  "ttl": "24h"\n}',
      response: 'vx_auth_a7b8c... signed',
      delay: 4000,
    },
    {
      action: 'POST /v1/transactions',
      payload: '{\n  "auth_token": "vx_auth_a7b8c...",\n  "vendor": "aws_api",\n  "amount": 420.50\n}',
      response: '✅ APPROVED (identity verified, scope matched)',
      delay: 6000,
    }
  ];

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    const runSequence = () => {
      setStep(0);
      steps.forEach((s, i) => {
        timeouts.push(setTimeout(() => setStep(i + 1), s.delay + 1000));
      });
      timeouts.push(setTimeout(runSequence, 10000)); // Loop every 10s
    };

    runSequence();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-[#0A0D12] border border-border overflow-hidden shadow-2xl font-mono text-[13px]">
      
      {/* Terminal Header */}
      <div className="h-10 bg-[#121820] border-b border-border flex items-center px-4 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
          <div className="w-3 h-3 rounded-full bg-[#EAB308]/80" />
          <div className="w-3 h-3 rounded-full bg-[#22C55E]/80" />
        </div>
        <div className="flex items-center gap-2 text-textMuted text-[12px] font-sans font-medium">
          <Shield className="w-3.5 h-3.5" />
          Vexi KYA Implementation
        </div>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Terminal Body */}
      <div className="p-6 h-[400px] overflow-y-auto space-y-6">
        <AnimatePresence>
          {steps.map((s, index) => {
            if (index >= step) return null;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-accent font-bold">
                  <span className="text-textMuted">root@vexi-kya:~ $</span>
                  {s.action}
                </div>
                
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pl-4 border-l-2 border-border/50 text-textSecondary whitespace-pre"
                >
                  {s.payload}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`${index === 3 ? 'text-[#22C55E] font-bold bg-[#22C55E]/10 p-2 rounded inline-block border border-[#22C55E]/20 mt-2' : 'text-textMuted'}`}
                >
                  {index === 3 ? null : '> '}{s.response}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

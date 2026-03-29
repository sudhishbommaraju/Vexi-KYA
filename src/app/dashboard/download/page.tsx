'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, Command, Check, X, HardDrive, Cpu, Loader2, Monitor, Terminal, ExternalLink, Globe } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type OS = 'mac' | 'win' | 'linux';

interface OSData {
  id: OS;
  name: string;
  icon: JSX.Element;
  desc: string;
  ext: string;
  url: string;
  size: string;
  color: string;
}

export default function DownloadPage() {
  const [detectedOs, setDetectedOs] = useState<OS | null>(null);
  const [downloading, setDownloading] = useState<OS | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OS>('mac');

  useEffect(() => {
    // Basic OS detection using navigator.userAgent
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) {
      setDetectedOs('mac');
      setActiveTab('mac');
    } else if (ua.includes('win')) {
      setDetectedOs('win');
      setActiveTab('win');
    } else if (ua.includes('linux')) {
      setDetectedOs('linux');
      setActiveTab('linux');
    } else {
      setDetectedOs('mac'); // fallback
      setActiveTab('mac');
    }
  }, []);

  const osList: OSData[] = [
    { 
      id: 'mac', 
      name: 'macOS', 
      icon: <Command className="w-8 h-8" />, 
      desc: 'Universal binary (Apple Silicon & Intel)', 
      ext: '.dmg', 
      url: 'https://github.com/sudhishbommaraju/Vexi-KYA/releases/download/v0.1.0/Vexi-KYA.dmg', 
      size: '124 MB',
      color: 'from-blue-500/20 to-indigo-500/20'
    },
    { 
      id: 'win', 
      name: 'Windows', 
      icon: <Monitor className="w-8 h-8" />, 
      desc: 'MSI Installer for x64 architecture', 
      ext: '.msi', 
      url: 'https://github.com/sudhishbommaraju/Vexi-KYA/releases/download/v0.1.0/Vexi-KYA.msi', 
      size: '108 MB',
      color: 'from-cyan-500/20 to-blue-500/20'
    },
    { 
      id: 'linux', 
      name: 'Linux', 
      icon: <Terminal className="w-8 h-8" />, 
      desc: 'AppImage for all major distributions', 
      ext: '.AppImage', 
      url: 'https://github.com/sudhishbommaraju/Vexi-KYA/releases/download/v0.1.0/Vexi-KYA.AppImage', 
      size: '115 MB',
      color: 'from-orange-500/20 to-red-500/20'
    },
  ];

  const handleDownload = (os: (typeof osList)[0]) => {
    setDownloading(os.id);
    setShowModal(true);
    
    // The actual download is triggered by the natural <a> tag behavior
    // We just provide visual feedback and close the modal after a delay
    setTimeout(() => {
      setShowModal(false);
      setToastMessage('Download started');
      setDownloading(null);
      setTimeout(() => setToastMessage(null), 3000); // Hide toast
    }, 2500); // Slightly longer delay for visual presence
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#22C55E] text-white px-6 py-4 rounded-[12px] font-bold text-[14px] flex items-center gap-3 shadow-[0_20px_50px_rgba(34,197,94,0.3)] border border-white/10"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </div>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pt-8 max-w-[1000px] mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none">
              Vexi KYA v0.1.0
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            Run Vexi KYA locally
          </h1>
          <p className="text-xl text-textSecondary max-w-[700px] leading-relaxed font-medium">
            Full KYA identity engine runs on your machine. Secure, private, and high-performance cryptographic operations at the edge.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12"
        >
          {/* Main Download Area - Bento Left */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {osList.map((os) => {
                const isRecommended = os.id === detectedOs;
                return (
                  <button
                    key={os.id}
                    onClick={() => setActiveTab(os.id)}
                    className={`relative p-8 rounded-[24px] border transition-all duration-500 text-left group overflow-hidden ${
                      activeTab === os.id 
                        ? 'bg-surface border-accent shadow-[0_0_40px_-10px_rgba(37,99,235,0.2)]' 
                        : 'bg-surface/40 border-border hover:border-borderSecondary hover:bg-surface/60'
                    }`}
                  >
                    {/* Active Indicator & Glow */}
                    {activeTab === os.id && (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${os.color} opacity-40 pointer-events-none`} />
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                      </>
                    )}

                    <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center mb-6 transition-all duration-500 ${
                      activeTab === os.id ? 'bg-accent text-white scale-110 shadow-lg' : 'bg-surface2 text-textSecondary group-hover:text-textPrimary'
                    }`}>
                      {os.icon}
                    </div>

                    <h3 className={`text-lg font-bold mb-1 transition-colors ${activeTab === os.id ? 'text-white' : 'text-textSecondary'}`}>
                      {os.name}
                    </h3>
                    
                    {isRecommended && (
                      <span className="text-[9px] font-bold text-accent uppercase tracking-tighter bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
                        Default
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected OS Action Card */}
            <div className="relative bg-surface rounded-[32px] border border-border p-10 overflow-hidden group shadow-xl">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${osList.find(o => o.id === activeTab)?.color} blur-[80px] opacity-10 -mr-20 -mt-20 pointer-events-none transition-all duration-1000`} />
              
              <div className="relative flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 rounded-[28px] bg-surface2 border border-borderSecondary flex items-center justify-center text-textPrimary shadow-inner group-hover:scale-105 transition-transform duration-500">
                  {osList.find(o => o.id === activeTab)?.icon}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white">
                      Vexi KYA for {osList.find(o => o.id === activeTab)?.name}
                    </h2>
                    <span className="text-[12px] font-mono text-textMuted bg-surface2 px-3 py-1 rounded-full border border-borderSecondary">
                      {osList.find(o => o.id === activeTab)?.size}
                    </span>
                  </div>
                  <p className="text-[16px] text-textSecondary mb-6 font-medium">
                    {osList.find(o => o.id === activeTab)?.desc}
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href={osList.find(o => o.id === activeTab)?.url}
                      onClick={() => {
                        handleDownload(osList.find(o => o.id === activeTab)!);
                      }}
                      download={`Vexi-KYA${osList.find(o => o.id === activeTab)?.ext}`}
                      className={`group/btn relative h-[56px] px-8 bg-accent text-white rounded-[14px] font-bold text-[15px] flex items-center justify-center gap-3 transition-all hover:bg-accentLight hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 ${downloading !== null ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5 group-hover/btn:animate-bounce" />}
                      {downloading ? 'Starting...' : `Download ${osList.find(o => o.id === activeTab)?.ext} Installer`}
                      <div className="absolute inset-0 rounded-[14px] bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                    
                    <div className="flex items-center justify-center md:justify-start gap-4 text-[13px] text-textMuted px-1">
                      <span>Stuck?</span>
                      <a 
                        href={osList.find(o => o.id === activeTab)?.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-accent hover:text-accentLight font-bold underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-all"
                      >
                        Try direct download fallback <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Bento Grid - Right Column */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 flex flex-col gap-6"
          >
            {/* System Requirements */}
            <div className="bg-surface/60 backdrop-blur-md border border-border rounded-[24px] p-6 hover:border-borderSecondary transition-colors">
              <h4 className="text-[13px] font-bold text-textMuted uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Requirements
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent/40" />
                  <p className="text-[14px] text-textSecondary leading-snug">
                    <span className="text-textPrimary font-bold">Memory</span><br/>8GB RAM minimum
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent/40" />
                  <p className="text-[14px] text-textSecondary leading-snug">
                    <span className="text-textPrimary font-bold">Storage</span><br/>500MB free space
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent/40" />
                  <p className="text-[14px] text-textSecondary leading-snug">
                    <span className="text-textPrimary font-bold">Security</span><br/>TPM 2.0 or Secure Enclave
                  </p>
                </li>
              </ul>
            </div>

            {/* Security Note */}
            <div className="relative bg-gradient-to-br from-[#10141B] to-surface border border-accent/20 rounded-[24px] p-8 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Command className="w-20 h-20" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Air-Gapped Ready</h4>
              <p className="text-[14px] text-textSecondary leading-relaxed">
                Our desktop architecture allows for cold-wallet integration. Your private keys never leave your device memory during transaction signing.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Setup Guide Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-surface2/30 border border-border rounded-[28px] p-10 mt-12"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-accent/20 flex items-center justify-center border border-accent/30">
                  <span className="text-accent text-sm font-bold">?</span>
                </div>
                Quick Setup Guide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { step: "01", title: "Install", desc: "Run the downloaded executable and follow on-screen prompts." },
                  { step: "02", title: "Link", desc: "Open the app and click 'Link Account' to sync with dashboard." },
                  { step: "03", title: "API Key", desc: "Enter your secure API workspace key from your account overview." },
                  { step: "04", title: "Active", desc: "Start processing AI-initiated payments with full local compliance." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <span className="text-5xl font-black text-textMuted/10 transition-colors group-hover:text-accent/10">{item.step}</span>
                    <div>
                      <h4 className="text-[15px] font-bold text-textPrimary mb-1">{item.title}</h4>
                      <p className="text-[14px] text-textSecondary leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Download Preparation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface border border-white/5 rounded-[32px] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
              
              <div className="w-24 h-24 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-20" />
                <Loader2 className="w-10 h-10 text-accent animate-spin" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Preparing download</h3>
              <p className="text-[15px] text-textSecondary mb-10 max-w-[300px] leading-relaxed">
                Verifying cryptographic package and preparing the secure installer for your {detectedOs === 'mac' ? 'macOS' : detectedOs === 'win' ? 'Windows' : 'Linux'} workstation.
              </p>
              
              <div className="w-full bg-surface2/50 rounded-full h-2 overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 1.2, ease: "circIn" }}
                  className="bg-accent h-full rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                />
              </div>
              <div className="mt-4 text-[11px] font-mono text-textMuted uppercase tracking-widest">
                Identity Engine Readiness: 100%
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

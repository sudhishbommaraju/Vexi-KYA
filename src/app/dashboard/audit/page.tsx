import Link from 'next/link';
import { ScrollText, DownloadCloud } from 'lucide-react';

export default function AuditLogsPage() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center max-w-[500px] mx-auto animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-[16px] bg-surface border border-border flex items-center justify-center mb-6 shadow-lg shadow-black/20">
        <ScrollText className="w-8 h-8 text-textMuted" />
      </div>
      
      <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-3">Audit Trails</h2>
      <p className="text-[15px] text-textSecondary leading-relaxed mb-8">
        Vexi does not store your transaction plaintext logs remotely. View your comprehensive audit trail via the local desktop client to maintain data privacy compliance.
      </p>

      <Link href="/dashboard/download" className="h-[44px] px-6 rounded-[8px] bg-accent text-white font-semibold flex items-center gap-2 hover:bg-[#1D4ED8] transition-all">
        <DownloadCloud className="w-4 h-4" /> Download Vexi Desktop 
      </Link>
    </div>
  );
}

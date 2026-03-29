import Link from 'next/link';
import { Play, DownloadCloud } from 'lucide-react';

export default function VerificationPage() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center max-w-[500px] mx-auto animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-[16px] bg-surface border border-border flex items-center justify-center mb-6 shadow-lg shadow-black/20">
        <Play className="w-8 h-8 text-textMuted ml-1" />
      </div>
      
      <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-3">Verification Engine</h2>
      <p className="text-[15px] text-textSecondary leading-relaxed mb-8">
        Validate incoming agent transaction signatures and tokens against your local trust chain configuration. You must run the node locally or in your VPC.
      </p>

      <Link href="/dashboard/download" className="h-[44px] px-6 rounded-[8px] bg-accent text-white font-semibold flex items-center gap-2 hover:bg-[#1D4ED8] transition-all">
        <DownloadCloud className="w-4 h-4" /> Download Vexi Desktop 
      </Link>
    </div>
  );
}

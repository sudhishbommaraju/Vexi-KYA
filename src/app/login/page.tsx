'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Github, Mail, ChevronLeft, Loader2, Check, Eye, EyeOff, Shield, Key, CreditCard } from 'lucide-react';
import Link from 'next/link';

type Step = 'method' | 'credentials' | 'success';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('method');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 'success') {
      const t = setTimeout(() => router.push('/dashboard'), 1500);
      return () => clearTimeout(t);
    }
  }, [step, router]);

  const handleOAuth = (provider: string) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1500);
  };

  const handleLogin = () => {
    if (!email || password.length < 8) return;
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex font-inter">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12 bg-surface border-r border-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15 pointer-events-none"></div>

        <div className="absolute top-[20%] right-[15%] opacity-40 animate-float">
          <div className="bg-surface2 border border-border rounded-[6px] p-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-accent" />
            <span className="font-mono text-[11px] text-textMuted">vx_91a8df...</span>
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[10%] opacity-30 animate-float-delayed">
          <div className="bg-surface2 border border-border rounded-[6px] p-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-textMuted" />
            <span className="font-mono text-[11px] text-textMuted">policy: active</span>
          </div>
        </div>
        <div className="absolute top-[55%] right-[8%] opacity-25 animate-float">
          <div className="bg-surface2 border border-border rounded-[6px] p-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-textMuted" />
            <span className="font-mono text-[11px] text-textMuted">$0 / $5,000</span>
          </div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-20">
            <div className="w-6 h-6 bg-textPrimary rounded-[6px] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 4 12 20 20 4"></polyline></svg>
            </div>
            <span className="font-extrabold text-[18px] text-textPrimary tracking-tight">Vexi</span>
          </Link>
        </div>

        <div className="relative z-10 mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-textPrimary mb-3 leading-tight">
            Welcome back
          </h2>
          <p className="text-[16px] text-textSecondary leading-relaxed max-w-sm">
            Sign in to manage your API keys, policies, and agent spending controls.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[420px]">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-textPrimary rounded-[6px] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 4 12 20 20 4"></polyline></svg>
              </div>
              <span className="font-extrabold text-[18px] text-textPrimary tracking-tight">Vexi</span>
            </Link>
          </div>

          {/* Back Button */}
          {step === 'credentials' && (
            <button onClick={() => { setStep('method'); setError(''); }} className="flex items-center gap-1 text-[13px] text-textMuted hover:text-textPrimary transition-colors mb-6">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}

          {/* ===== STEP 1: METHOD SELECT ===== */}
          {step === 'method' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl font-bold text-textPrimary mb-2 font-sans">Sign in</h1>
              <p className="text-[14px] text-textSecondary mb-8">Choose how you want to sign in.</p>

              <div className="flex flex-col gap-3">
                <button onClick={() => handleOAuth('github')} disabled={loading} className="h-[44px] w-full rounded-[8px] bg-surface border border-border flex items-center justify-center gap-3 text-[14px] font-semibold text-textPrimary hover:bg-surface2 hover:-translate-y-px transition-all disabled:opacity-50">
                  <Github className="w-5 h-5" /> Continue with GitHub
                </button>
                <button onClick={() => handleOAuth('google')} disabled={loading} className="h-[44px] w-full rounded-[8px] bg-surface border border-border flex items-center justify-center gap-3 text-[14px] font-semibold text-textPrimary hover:bg-surface2 hover:-translate-y-px transition-all disabled:opacity-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
              </div>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-[12px] text-textMuted font-medium">or</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <button onClick={() => setStep('credentials')} className="h-[44px] w-full rounded-[8px] bg-surface border border-border flex items-center justify-center gap-3 text-[14px] font-semibold text-textPrimary hover:bg-surface2 hover:-translate-y-px transition-all">
                <Mail className="w-5 h-5" /> Continue with Email
              </button>

              <p className="text-[14px] text-textSecondary text-center mt-8">
                Don&apos;t have an account?{' '}
                <Link href="/auth" className="text-accent hover:underline font-medium">Sign up</Link>
              </p>
            </div>
          )}

          {/* ===== STEP 2: EMAIL + PASSWORD ===== */}
          {step === 'credentials' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl font-bold text-textPrimary mb-2 font-sans">Sign in with email</h1>
              <p className="text-[14px] text-textSecondary mb-8">Enter your credentials to continue.</p>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[12px] font-medium text-textMuted mb-1.5 block">Email</label>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="you@company.com" autoFocus className="w-full h-[44px] px-4 rounded-[8px] bg-surface border border-border text-textPrimary text-[14px] placeholder:text-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[12px] font-medium text-textMuted">Password</label>
                    <button className="text-[12px] text-accent hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Enter your password" onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }} className="w-full h-[44px] px-4 pr-11 rounded-[8px] bg-surface border border-border text-textPrimary text-[14px] placeholder:text-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textPrimary transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-[13px] text-[#FF5F56] mt-3">{error}</p>
              )}

              <button onClick={handleLogin} disabled={loading || !email || password.length < 8} className="w-full h-[44px] mt-5 rounded-[8px] bg-[#2563EB] text-white font-semibold text-[14px] hover:bg-[#1D4ED8] hover:-translate-y-px transition-all disabled:opacity-40 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
              </button>

              <p className="text-[14px] text-textSecondary text-center mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/auth" className="text-accent hover:underline font-medium">Sign up</Link>
              </p>
            </div>
          )}

          {/* ===== STEP 3: SUCCESS ===== */}
          {step === 'success' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-[#22C55E]" />
              </div>
              <h1 className="text-2xl font-bold text-textPrimary mb-2 font-sans">Welcome back</h1>
              <p className="text-[14px] text-textSecondary flex items-center gap-2">
                Redirecting to dashboard <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

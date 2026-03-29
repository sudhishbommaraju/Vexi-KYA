'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Mail, ArrowRight, Loader2, Check, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Step = 
  | 'contact' 
  | 'otp'
  | 'terms'
  | 'onboarding_role'
  | 'onboarding_intent'
  | 'onboarding_team';

const STEPS: Step[] = [
  'contact',
  'otp',
  'terms',
  'onboarding_role',
  'onboarding_intent',
  'onboarding_team'
];

export function AuthFlow() {
  const router = useRouter();

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentStep = STEPS[stepIndex];

  if (!supabase) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-[#020409]/60 backdrop-blur-2xl border border-white/10 rounded-[24px]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Authentication unavailable</h2>
        <p className="text-textSecondary">Supabase configuration is missing or invalid.</p>
      </div>
    );
  }

  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [role, setRole] = useState('');
  const [intent, setIntent] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [countdown, setCountdown] = useState(30);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const nextStep = (skipSteps: number = 1) => {
    setErrorMsg(null);
    setDirection(1);
    setStepIndex(prev => Math.min(prev + skipSteps, STEPS.length - 1));
  };

  const prevStep = (skipSteps: number = 1) => {
    setErrorMsg(null);
    setDirection(-1);
    setStepIndex(prev => Math.max(prev - skipSteps, 0));
  };

  useEffect(() => {
    if (currentStep !== 'otp') return;
    setCountdown(30);
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(4px)',
    })
  };

  const calculateProgress = () => {
    return ((stepIndex + 1) / STEPS.length) * 100;
  };

  const isEmail = contact.includes('@');

  const handleSendOtp = async () => {
    if (!contact) return;
    setLoading(true);
    setErrorMsg(null);
    
    // Check if it looks like a phone number (just digits and +)
    // If we have an @ it's an email, else assume phone
    
    const { error } = isEmail 
      ? await supabase!.auth.signInWithOtp({ email: contact })
      : await supabase!.auth.signInWithOtp({ phone: contact });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      nextStep();
    }
  };

  const renderContact = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-2">Welcome to Vexi</h2>
        <p className="text-textSecondary text-[15px]">Enter your email or phone to get started.</p>
      </div>
      <div>
        <input 
          type="text" 
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            setErrorMsg(null);
          }}
          placeholder="name@company.com or +1234567890"
          autoFocus
          className={`w-full h-[48px] px-4 rounded-[10px] bg-white/5 border ${errorMsg ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-accent focus:ring-accent/50'} text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all text-[15px]`}
          onKeyDown={(e) => { if (e.key === 'Enter' && contact.length > 3) handleSendOtp(); }}
        />
        {errorMsg && (
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-red-400">
            <AlertCircle className="w-3.5 h-3.5" />
            {errorMsg}
          </p>
        )}
      </div>
      <button 
        onClick={handleSendOtp}
        disabled={contact.length <= 3 || loading}
        className="w-full h-[48px] rounded-[10px] bg-white text-black font-semibold text-[15px] hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
          <>
            Continue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </div>
  );

  const renderOtp = () => {
    const handleVerifyOtp = async (fullOtp: string) => {
      setLoading(true);
      setErrorMsg(null);
      
      const { data, error } = isEmail
        ? await supabase!.auth.verifyOtp({ email: contact, token: fullOtp, type: 'email' })
        : await supabase!.auth.verifyOtp({ phone: contact, token: fullOtp, type: 'sms' });

      setLoading(false);

      if (error) {
        setErrorMsg('Invalid or expired code. Please try again.');
        setOtp(['', '', '', '', '', '']);
        otpRefs.current[0]?.focus();
      } else {
        // Success animation
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          nextStep();
        }, 1500); // Wait for animation before next step
      }
    };

    const handleOtpChange = (index: number, val: string) => {
      if (!/^\d*$/.test(val)) return;
      
      let newOtp = [...otp];
      
      // Handle pasting full code in a single box
      if (val.length > 1) {
        const digits = val.slice(0, 6).split('');
        newOtp = ['', '', '', '', '', ''];
        digits.forEach((d, i) => { if (i < 6) newOtp[i] = d; });
        setOtp(newOtp);
        
        const nextIndex = Math.min(digits.length, 5);
        otpRefs.current[nextIndex]?.focus();
        
        if (newOtp.every(x => x !== '')) {
          handleVerifyOtp(newOtp.join(''));
        }
        return;
      }
      
      // Single digit entry
      newOtp[index] = val;
      setOtp(newOtp);
      
      if (val && index < 5) otpRefs.current[index + 1]?.focus();
      
      if (newOtp.every(x => x !== '')) {
        handleVerifyOtp(newOtp.join(''));
      }
    };

    const handleResend = async () => {
      if (countdown > 0) return;
      setLoading(true);
      const { error } = isEmail 
        ? await supabase!.auth.signInWithOtp({ email: contact })
        : await supabase!.auth.signInWithOtp({ phone: contact });
      setLoading(false);
      
      if (error) {
        setErrorMsg('Too many requests. Please try again later.');
      } else {
        setCountdown(30);
        setErrorMsg(null);
      }
    };

    return (
      <div className="space-y-6">
        <div className="relative">
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#020409]/90 backdrop-blur-sm rounded-[10px]"
              >
                <motion.div 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4"
                >
                  <Check className="w-8 h-8 text-accent" strokeWidth={3} />
                </motion.div>
                <div className="text-white font-semibold text-lg tracking-tight">Verified</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-2">Verification Code</h2>
            <p className="text-textSecondary text-[15px]">We sent a 6-digit code to <span className="text-white font-medium">{contact}</span></p>
          </div>
          <div className="flex gap-2 justify-between mt-6">
            {otp.map((digit, i) => (
              <input 
                key={i} 
                ref={el => { otpRefs.current[i] = el; }}
                type="text" 
                inputMode="numeric" 
                maxLength={6} 
                value={digit} 
                autoFocus={i === 0}
                onChange={e => handleOtpChange(i, e.target.value)} 
                onKeyDown={e => { 
                  if (e.key === 'Backspace' && !otp[i] && i > 0) {
                    otpRefs.current[i - 1]?.focus();
                  } 
                }} 
                disabled={loading || success}
                className={`w-12 h-14 rounded-[10px] bg-white/5 border ${errorMsg ? 'border-red-500/50 text-red-400' : 'border-white/10 text-white'} text-center text-[20px] font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all`} 
              />
            ))}
          </div>
          
          {errorMsg && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center justify-center gap-1.5 text-[13.5px] text-red-400 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </motion.p>
          )}

          <div className="text-center pt-6">
            {countdown > 0 ? (
              <span className="text-[14px] text-white/40">Resend code in {countdown}s</span>
            ) : (
              <button onClick={handleResend} disabled={loading} className="text-[14px] text-accent font-medium hover:text-accent/80 transition-colors disabled:opacity-50">Resend code</button>
            )}
          </div>
          {loading && !success && (
            <div className="flex justify-center mt-4">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTerms = () => {
    const handleAcceptTerms = async () => {
      setLoading(true);
      
      const { error } = await supabase!.auth.updateUser({
        data: { accepted_terms_at: new Date().toISOString() }
      });

      if (error) {
        console.error('Failed to update user metadata:', error);
      }

      setTimeout(() => { 
        setLoading(false); 
        nextStep(); 
      }, 600);
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-2">Legal Agreements</h2>
          <p className="text-textSecondary text-[15px]">Please review our terms to utilize Vexi infrastructure.</p>
        </div>
        
        <label className="flex items-start gap-4 p-5 rounded-[12px] bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors group">
          <div className="mt-0.5 relative flex items-center justify-center">
            <input 
              type="checkbox" 
              checked={termsAccepted} 
              onChange={e => setTermsAccepted(e.target.checked)} 
              className="peer w-5 h-5 appearance-none rounded-[6px] border border-white/20 checked:bg-accent checked:border-accent transition-all cursor-pointer" 
            />
            <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
          </div>
          <div className="text-[14px] text-white/60 leading-relaxed">
            I acknowledge and agree to the <span className="text-accent hover:underline">Terms of Service</span> and <span className="text-accent hover:underline">Privacy Policy</span>. I understand Vexi acts as a cryptographic authorization layer.
          </div>
        </label>

        <button 
          onClick={handleAcceptTerms}
          disabled={!termsAccepted || loading}
          className="w-full h-[48px] mt-2 rounded-[10px] bg-white text-black font-semibold text-[15px] hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Accept & Continue'}
        </button>
      </div>
    );
  };

  const renderOnboardingRole = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Step 1/3</span>
        </div>
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-2">What is your role?</h2>
        <p className="text-textSecondary text-[15px]">We'll tailor your dashboard experience.</p>
      </div>
      
      <div className="space-y-3">
        {['Developer / Engineer', 'Product Manager', 'Founder / Executive', 'Other'].map((r) => (
          <button 
            key={r}
            onClick={() => { setRole(r); setTimeout(() => nextStep(), 300); }}
            className={`w-full h-[52px] px-5 rounded-[10px] border transition-all flex items-center justify-between group ${role === r ? 'bg-accent/10 border-accent/50 text-accent' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white'}`}
          >
            <span className="font-medium text-[15px]">{r}</span>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${role === r ? 'border-accent' : 'border-white/20 group-hover:border-white/40'}`}>
              {role === r && <div className="w-2 h-2 bg-accent rounded-full" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderOnboardingIntent = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Step 2/3</span>
        </div>
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-2">Primary use case</h2>
        <p className="text-textSecondary text-[15px]">How do you plan to use Vexi?</p>
      </div>
      
      <div className="space-y-3">
        {['Agent API Procurement', 'Automated Trading/Defi', 'Internal Automation', 'Customer-facing Agents'].map((i) => (
          <button 
            key={i}
            onClick={() => { setIntent(i); setTimeout(() => nextStep(), 300); }}
            className={`w-full h-[52px] px-5 rounded-[10px] border transition-all flex items-center justify-between group ${intent === i ? 'bg-accent/10 border-accent/50 text-accent' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white'}`}
          >
            <span className="font-medium text-[15px]">{i}</span>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${intent === i ? 'border-accent' : 'border-white/20 group-hover:border-white/40'}`}>
              {intent === i && <div className="w-2 h-2 bg-accent rounded-full" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderOnboardingTeam = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Step 3/3</span>
        </div>
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight mb-2">Team size</h2>
        <p className="text-textSecondary text-[15px]">Just one last detail.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {['Just me', '2-10', '11-50', '50+'].map((t) => (
          <button 
            key={t}
            onClick={() => setTeamSize(t)}
            className={`h-[52px] rounded-[10px] border transition-all flex items-center justify-center group ${teamSize === t ? 'bg-accent/10 border-accent/50 text-accent font-semibold' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium'}`}
          >
            <span className="text-[15px]">{t}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => { setLoading(true); setTimeout(() => router.push('/dashboard'), 1500); }}
        disabled={!teamSize || loading}
        className="w-full h-[48px] mt-4 rounded-[10px] bg-white text-black font-semibold text-[15px] hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Setup'}
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'contact': return renderContact();
      case 'otp': return renderOtp();
      case 'terms': return renderTerms();
      case 'onboarding_role': return renderOnboardingRole();
      case 'onboarding_intent': return renderOnboardingIntent();
      case 'onboarding_team': return renderOnboardingTeam();
      default: return null;
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto z-10 px-4">
      
      {/* Back Button */}
      {stepIndex > 0 && currentStep !== 'terms' && ( // Prevent going back from terms into OTP
        <button 
          onClick={() => prevStep()}
          disabled={loading}
          className="absolute -top-12 left-4 md:left-0 flex items-center gap-1.5 text-[14px] text-white/50 hover:text-white transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      )}

      {/* Progress Indicator */}
      <div className="absolute -top-12 right-4 md:right-0 flex items-center gap-2">
        <div className="text-[13px] font-medium text-white/50 font-mono tracking-wider">
          {Math.round(calculateProgress())}%
        </div>
      </div>

      {/* Glassmorphism Container */}
      <div className="w-full rounded-[24px] bg-[#020409]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_-20px_rgba(37,99,235,0.15)] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-20">
          <motion.div 
            className="h-full bg-accent shadow-[0_0_10px_rgba(37,99,235,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>

        <div className="px-6 py-8 md:px-8 md:py-10 relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                filter: { duration: 0.2 }
              }}
              className="w-full absolute inset-0 px-6 py-8 md:px-8 md:py-10"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 text-center pb-8">
        <p className="text-[13px] text-white/40">
          Protected by Vexi Infrastructure. <br/> End-to-end encrypted.
        </p>
      </div>
    </div>
  );
}

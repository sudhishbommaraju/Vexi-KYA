'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   1. FLOATING PARTICLES — ambient orbs drifting across hero
   ═══════════════════════════════════════════════════════ */
export function FloatingParticles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.3 + 0.05,
    // Strictly blue/white for KYA clinical look
    color: i % 4 === 0 ? '#FFFFFF' : '#2563EB',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}40`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.3, p.opacity],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. MOUSE SPOTLIGHT — radial glow that follows cursor
   ═══════════════════════════════════════════════════════ */
export function MouseSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = (e: MouseEvent) => {
        x.set(e.clientX);
        y.set(e.clientY + window.scrollY);
        setVisible(true);
      };
      window.addEventListener('mousemove', handler);
      return () => window.removeEventListener('mousemove', handler);
    }
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[2] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: x,
        top: y,
        background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.02) 30%, transparent 70%)',
        opacity: visible ? 1 : 0,
        position: 'fixed',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   3. SCROLL PROGRESS BAR — top of screen
   ═══════════════════════════════════════════════════════ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: '#2563EB', // Solid blue, no gradient
      }}
    />
  );
}


/* ═══════════════════════════════════════════════════════
   4. FILM GRAIN OVERLAY — subtle noise texture
   ═══════════════════════════════════════════════════════ */
export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   5. ANIMATED GRID BACKGROUND — subtle scanning lines
   ═══════════════════════════════════════════════════════ */
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)] opacity-20" />
      
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.2), transparent)',
        }}
        animate={{ left: ['0%', '100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   6. GLOW CARD — card wrapper with animated border glow
   ═══════════════════════════════════════════════════════ */
export function GlowCard({
  children,
  className = '',
  glowColor = '#2563EB',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      className={`relative group ${className}`}
    >
      {/* Animated border glow */}
      <div
        className="absolute -inset-[1px] rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${glowColor}30, transparent 60%)`,
        }}
      />
      <div className="relative bg-surface border border-border rounded-[10px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   7. ANIMATED COUNTER — number that counts up on scroll
   ═══════════════════════════════════════════════════════ */
export function AnimatedStat({
  value,
  suffix = '',
  prefix = '',
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 50;
    let current = 0;
    const interval = setInterval(() => {
      current += value / steps;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-textPrimary tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-[13px] text-textMuted mt-1 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   8. MAGNETIC BUTTON — button that reacts to hover
   ═══════════════════════════════════════════════════════ */
export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [x, y, strength]);

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   9. PARALLAX SECTION — content moves at different rates
   ═══════════════════════════════════════════════════════ */
export function ParallaxWrapper({
  children,
  speed = 0.5,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   10. BENTO BOX — premium glassmorphism card with hover depth
   ═══════════════════════════════════════════════════════ */
export function BentoBox({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ${className}`}>
      <div className="absolute -inset-[1px] rounded-[16px] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-[15px] bg-gradient-to-b from-[#161B22]/80 to-[#0A0D12]/90 backdrop-blur-xl border border-white/5 group-hover:border-accent/30 transition-colors duration-500 overflow-hidden shadow-inner">
         <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
      </div>
      <div className="relative z-10 w-full h-full p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}

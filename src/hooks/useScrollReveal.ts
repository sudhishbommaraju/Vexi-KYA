'use client';
import { useEffect, useRef } from 'react';

export function useScrollReveal(options = { threshold: 0.1, rootMargin: '0px' }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      // Find all reveal targets inside this ref
      const targets = currentRef.querySelectorAll('.reveal');
      targets.forEach((target) => observer.observe(target));
      if (currentRef.classList.contains('reveal')) {
        observer.observe(currentRef);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return ref;
}

import React, { useState, useEffect } from 'react';

export const WordmarkCurtain: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      return;
    }

    // Trigger curtain exit after 1000ms
    const timer1 = setTimeout(() => {
      setIsFading(true);
    }, 950);

    // Completely remove from DOM
    const timer2 = setTimeout(() => {
      setIsVisible(false);
    }, 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0E0A08] text-[#F4ECDD] pointer-events-auto cursor-pointer transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFading ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      aria-hidden="true"
    >
      <div className="text-center space-y-3">
        <h1 className="font-serif text-5xl sm:text-7xl tracking-tight text-[#F4ECDD] animate-fade-in">
          Ovelo
        </h1>
        <div className="w-10 h-px bg-[#B8935A] mx-auto"></div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#B8935A] font-light">
          Timeless / Classic / Yours
        </p>
      </div>
    </div>
  );
};

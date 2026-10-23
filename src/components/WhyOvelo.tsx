import React from 'react';

export const WhyOvelo: React.FC = () => {
  return (
    <section id="brand-story" className="py-24 bg-[#F4ECDD] text-[#2B1A12] border-t border-[#B8935A]/25 relative">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B4A22] font-semibold block">
          WHY OVELO
        </span>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1A12] tracking-tight leading-tight">
          Quiet elegance. Designed for every journey.
        </h2>

        {/* 60-Word Poised Brand Manifesto */}
        <p className="text-base sm:text-lg text-[#2B1A12]/85 font-light leading-relaxed font-serif max-w-2xl mx-auto">
          Ovelo was created for the modern man who values quiet confidence over passing trends. We craft purposeful essentials—balanced between refined boardroom structure and effortless weekend ease. Each piece is constructed with honest materials, functional proportions, and clean lines. No unnecessary ornamentation. Just timeless design made to accompany your journey with understated elegance.
        </p>

        {/* Brand Signatures */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-medium border-t border-[#B8935A]/25 max-w-lg mx-auto">
          <span>Carry Confidence</span>
          <span className="hidden sm:inline text-[#B8935A]">/</span>
          <span>Choose Timeless</span>
          <span className="hidden sm:inline text-[#B8935A]">/</span>
          <span>Yours</span>
        </div>

      </div>
    </section>
  );
};

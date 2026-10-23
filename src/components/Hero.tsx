import React, { useState, useEffect } from 'react';
import { ArrowDown, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { openProductModal, products } = useStore();
  const bagProduct = products.find(p => p.category === 'Bags');

  // Real-time countdown timer: e.g. 3 hours, 12 minutes, 45 seconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 12,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num: number) => num.toString().padStart(2, '0');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[94vh] flex items-center bg-[#0E0A08] text-[#F4ECDD] overflow-hidden -mt-[72px] pt-[72px]">
      {/* Background Hero Media with Subtle Parallax & Luxury Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_ovelo_bag_desk_1792733194496.jpg"
          alt="Ovelo Classic Leather Bag on Walnut Desk"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05] scale-100 hover:scale-[1.01] transition-transform duration-1000 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic gradient scrim ensuring WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0A08]/90 via-[#0E0A08]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Eyebrow & Launch Offer Countdown */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#B8935A] font-semibold">
              THE CLASSIC COLLECTION
            </span>
            <span className="text-[#E6D8C3]/30">·</span>
            
            {/* Launch Offer Badge with Countdown Clock */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B1A12]/80 backdrop-blur-md border border-[#B8935A]/40 text-xs text-[#F4ECDD] rounded-none">
              <span className="text-[#B8935A] font-medium tracking-wide">Launch Offer</span>
              <span className="text-[#E6D8C3]/40">·</span>
              <div className="flex items-center gap-1 font-mono text-[11px] text-[#F4ECDD] tabular-nums">
                <Clock size={12} className="text-[#B8935A]" />
                <span>
                  Offer ends in {formatDigits(timeLeft.hours)} : {formatDigits(timeLeft.minutes)} : {formatDigits(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#F4ECDD] leading-[1.08] text-balance">
            Timeless. Classic. Yours.
          </h1>

          {/* Subcopy */}
          <p className="text-base sm:text-lg text-[#E6D8C3]/90 font-light max-w-lg leading-relaxed">
            Refined style for every journey. Handcrafted leather pieces crafted for the quiet confidence of the modern professional.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => scrollTo('signature-pieces')}
              className="inline-flex justify-center items-center px-8 py-4 bg-[#B8935A] text-[#0E0A08] hover:bg-[#c9a46b] font-medium text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shadow-lg shadow-black/20"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => scrollTo('ovelo-set')}
              className="inline-flex justify-center items-center px-8 py-4 border border-[#B8935A]/70 text-[#F4ECDD] hover:bg-[#B8935A]/15 font-medium text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer"
            >
              Shop the Set
            </button>
          </div>

          {/* Quiet Trust Bar */}
          <div className="pt-8 border-t border-[#B8935A]/20 flex flex-wrap items-center gap-6 text-xs text-[#E6D8C3]/75 font-light">
            <span className="flex items-center gap-1.5">
              <span className="text-[#B8935A]">✓</span> Cash on Delivery nationwide
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#B8935A]">✓</span> Complimentary gift presentation
            </span>
            {bagProduct && (
              <button
                onClick={() => openProductModal(bagProduct)}
                className="hover-gold-underline text-[#B8935A] cursor-pointer"
              >
                Inspect The Classic Bag Details →
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase text-[#E6D8C3]/50">
        <span>Scroll to Explore</span>
        <ArrowDown size={12} className="animate-bounce text-[#B8935A]" />
      </div>
    </section>
  );
};

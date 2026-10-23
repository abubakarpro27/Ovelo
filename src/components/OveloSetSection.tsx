import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OVELO_BUNDLE_INFO } from '../data/products';

export const OveloSetSection: React.FC = () => {
  const { addBundleToCart, formatPrice } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddBundle = () => {
    addBundleToCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="ovelo-set" className="py-24 bg-[#2B1A12] text-[#F4ECDD] relative overflow-hidden border-t border-[#B8935A]/30">
      {/* Background grain and brass ambient radial glow */}
      <div className="absolute inset-0 bg-grain-dark opacity-35 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#8B4A22]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0E0A08] border border-[#B8935A]/30 shadow-2xl">
              <img
                src={OVELO_BUNDLE_INFO.image}
                alt="The Ovelo Set Bundle — Bag, Wallet, Shoes"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08]/80 via-transparent to-transparent"></div>

              {/* Embossed Brand Inset */}
              <div className="absolute bottom-5 left-5 bg-[#0E0A08]/85 backdrop-blur-md px-4 py-2 border border-[#B8935A]/40 flex items-center gap-2">
                <Sparkles size={14} className="text-[#B8935A]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#F4ECDD] font-medium">
                  The Ovelo Set · 3-Piece Ensemble
                </span>
              </div>
            </div>

            {/* Quick Pill-less breakdown labels */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#E6D8C3]/75 font-light px-1">
              <span>01. Classic Leather Bag</span>
              <span className="text-[#B8935A]">·</span>
              <span>02. Classic Leather Wallet</span>
              <span className="text-[#B8935A]">·</span>
              <span>03. Camel Suede Shoes</span>
            </div>
          </div>

          {/* Right Column: Bundle Pricing, Value & 1-Click Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#B8935A] font-semibold">
                CURATED COMPREHENSIVE SET
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#F4ECDD] leading-[1.1]">
                Complete the Set.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#E6D8C3]/85 leading-relaxed font-light">
              The Bag, the Wallet, and the Shoes. Together they establish a disciplined, coordinated standard for your travel, executive meetings, and daily schedule.
            </p>

            {/* Bundle Math Box */}
            <div className="p-6 bg-[#0E0A08]/75 border border-[#B8935A]/35 space-y-3 shadow-inner">
              <div className="flex justify-between items-center text-xs text-[#E6D8C3]/70">
                <span>Individual Catalog Total</span>
                <span className="line-through tabular-nums text-sm">
                  {formatPrice(OVELO_BUNDLE_INFO.individualTotal)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-[#B8935A] font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Set Bundle Privilege (10% Off)</span>
                </span>
                <span className="tabular-nums">- {formatPrice(OVELO_BUNDLE_INFO.bundleSavings)}</span>
              </div>

              <div className="pt-3 border-t border-[#B8935A]/25 flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#F4ECDD] font-medium block">
                    The Ovelo Set
                  </span>
                  <span className="text-[10px] text-[#E6D8C3]/60">All 3 Signature Pieces</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-serif text-[#F4ECDD] font-semibold tabular-nums">
                    {formatPrice(OVELO_BUNDLE_INFO.bundlePrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Single Add to Bag Button */}
            <button
              onClick={handleAddBundle}
              className="w-full py-4 bg-[#B8935A] hover:bg-[#c9a46b] text-[#0E0A08] font-medium text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>The Set Has Been Added to Bag</span>
                </>
              ) : (
                <span>Add the Set to Bag (Save 10%)</span>
              )}
            </button>

            {/* Delivery & Assurance */}
            <div className="pt-2 flex flex-col gap-2 text-xs text-[#E6D8C3]/70 font-light">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-[#B8935A] shrink-0" />
                <span>Complimentary insured express delivery nationwide</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#B8935A] shrink-0" />
                <span>Individually gift-boxed in embossed matte packaging</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Code, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const MESSAGES = [
  'Delivery calculated at checkout · Free over Rs. 6,000',
  'Cash on delivery available nationwide',
  'Gift-ready presentation included with every piece',
  'Use code OVELO10 for 10% off your first order'
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { currency, setCurrency, openShopifyCode, openAnalytics } = useStore();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  return (
    <div
      className="bg-[#0E0A08] text-[#F4ECDD] text-xs border-b border-[#B8935A]/25 relative z-40 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
        {/* Left: Quick Currency Switcher */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#E6D8C3]/70">
          <span>Currency:</span>
          <button
            onClick={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
            className="hover:text-[#B8935A] font-medium tracking-wider transition-colors cursor-pointer"
            title="Toggle between PKR and USD"
          >
            {currency === 'PKR' ? 'PKR (Rs.)' : 'USD ($)'}
          </button>
        </div>

        {/* Center: Rotating Announcement Ticker */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            className="text-[#E6D8C3]/40 hover:text-[#B8935A] transition-colors p-0.5"
            aria-label="Previous announcement"
          >
            <ChevronLeft size={13} />
          </button>

          <div className="overflow-hidden text-center min-w-[280px] sm:min-w-[360px]">
            <p className="font-light tracking-wide text-[#F4ECDD] transition-opacity duration-300">
              <span className="text-[#B8935A] mr-1.5">✦</span>
              {MESSAGES[currentIndex]}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="text-[#E6D8C3]/40 hover:text-[#B8935A] transition-colors p-0.5"
            aria-label="Next announcement"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Right: Quick actions for Developer & Store Insights */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#E6D8C3]/70">
          <button
            onClick={openShopifyCode}
            className="flex items-center gap-1.5 hover:text-[#B8935A] transition-colors cursor-pointer"
            title="Inspect Shopify Liquid 2.0 Theme files"
          >
            <Code size={12} className="text-[#B8935A]" />
            <span>Shopify 2.0 Code</span>
          </button>
          <span className="text-[#E6D8C3]/20">|</span>
          <button
            onClick={openAnalytics}
            className="flex items-center gap-1.5 hover:text-[#B8935A] transition-colors cursor-pointer"
            title="View customer insights & live event stream"
          >
            <Sparkles size={11} className="text-[#B8935A]" />
            <span>Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};

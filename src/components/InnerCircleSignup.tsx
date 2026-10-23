import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const InnerCircleSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { applyPromoCode, trackEvent } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    applyPromoCode('OVELO10');
    trackEvent('page_view', { action: 'inner_circle_signup', email });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('OVELO10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#0E0A08] text-[#F4ECDD] border-t border-[#B8935A]/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 text-center space-y-6 relative z-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#B8935A] font-semibold block">
          PRIVATE CLIENT PRIVILEGE
        </span>

        <h2 className="text-3xl sm:text-4xl font-serif text-[#F4ECDD] tracking-tight">
          Join the Ovelo Inner Circle.
        </h2>

        <p className="text-sm sm:text-base text-[#E6D8C3]/80 font-light max-w-lg mx-auto">
          Early access to limited production runs, bespoke release previews, and 10% off your first order.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-[#2B1A12] border border-[#B8935A]/50 max-w-md mx-auto space-y-3 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-[#B8935A]">
              <Check size={18} />
              <span className="text-xs uppercase tracking-widest font-semibold">
                Welcome to the Inner Circle
              </span>
            </div>
            <p className="text-xs text-[#E6D8C3]/80 font-light">
              Your 10% privilege has been automatically applied to your cart! You can also use code:
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="px-4 py-2 bg-[#0E0A08] font-mono text-base font-bold text-[#B8935A] border border-[#B8935A]/40 tracking-wider">
                OVELO10
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2.5 bg-[#B8935A] hover:bg-[#c9a46b] text-[#0E0A08] text-xs transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#2B1A12]/80 border border-[#B8935A]/40 text-xs text-[#F4ECDD] placeholder-[#E6D8C3]/50 focus:outline-none focus:border-[#B8935A] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#B8935A] hover:bg-[#c9a46b] text-[#0E0A08] text-xs uppercase tracking-widest font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap shadow-md"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#E6D8C3]/50 font-light">
          We honor your privacy. Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};

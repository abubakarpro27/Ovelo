import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Code, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { openShopifyCode, openAnalytics, openSizeGuide } = useStore();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E0A08] text-[#F4ECDD] border-t border-[#B8935A]/30 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-16">
        
        {/* Top Grid: Wordmark & Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block"
            >
              <span className="font-serif text-3xl tracking-tight text-[#F4ECDD]">
                Ovelo
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-[#B8935A] font-light mt-0.5">
                Timeless / Classic / Yours
              </span>
            </a>
            <p className="text-xs text-[#E6D8C3]/75 font-light leading-relaxed max-w-sm">
              Understated luxury essentials for the modern man. Engineered for effortless mobility across the boardroom, long-haul travel, and relaxed weekends.
            </p>
            <div className="pt-2 text-xs italic font-serif text-[#B8935A]">
              “Carry confidence. Carry Ovelo.”
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#E6D8C3]/80 font-light">
              <li>
                <button
                  onClick={() => scrollTo('signature-pieces')}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer text-left"
                >
                  Ovelo Classic Bag (Briefcase)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('signature-pieces')}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer text-left"
                >
                  Ovelo Classic Wallet
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('signature-pieces')}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer text-left"
                >
                  Ovelo Suede Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ovelo-set')}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer text-left text-[#B8935A] font-medium"
                >
                  The Ovelo Set (Save 10%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gift-edit')}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer text-left"
                >
                  Gift Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              Support & Care
            </h4>
            <ul className="space-y-2 text-xs text-[#E6D8C3]/80 font-light">
              <li>
                <span className="text-[#E6D8C3]/90">Nationwide Express Delivery</span>
              </li>
              <li>
                <span className="text-[#E6D8C3]/90">Cash on Delivery (COD)</span>
              </li>
              <li>
                <button
                  onClick={openSizeGuide}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer text-left"
                >
                  Footwear Size Guide
                </button>
              </li>
              <li>
                <span className="text-[#E6D8C3]/90">Leather Preservation Guide</span>
              </li>
              <li>
                <span className="text-[#E6D8C3]/90">7-Day Exchange Courtesy</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Store Engine */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              Storefront Engine
            </h4>
            <ul className="space-y-2 text-xs text-[#E6D8C3]/80 font-light">
              <li>
                <a
                  href="https://no5e827smb2hm24p-77128073414.shopifypreview.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8935A] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Shopify Storefront Preview ↗</span>
                </a>
              </li>
              <li>
                <button
                  onClick={openShopifyCode}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                >
                  <Code size={13} className="text-[#B8935A]" />
                  <span>Liquid 2.0 Theme Source</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openAnalytics}
                  className="hover:text-[#B8935A] transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                >
                  <Sparkles size={13} className="text-[#B8935A]" />
                  <span>Customer Insights Stream</span>
                </button>
              </li>
              <li>
                <span className="text-[#E6D8C3]/60">SSL 256-Bit Secure Gateway</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Bar: Supported Payment Icons & Trust Markers */}
        <div className="pt-8 border-t border-[#B8935A]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#E6D8C3]/70 font-light">
          
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#B8935A]" />
              <span>Insured Courier Dispatch</span>
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw size={14} className="text-[#B8935A]" />
              <span>Hassle-Free Inspection Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#B8935A]" />
              <span>Authentic Materials Assured</span>
            </span>
          </div>

          {/* Payment Gateways */}
          <div className="flex items-center gap-2 text-[11px] text-[#E6D8C3]/80">
            <span className="text-[#E6D8C3]/50 mr-1">Accepted:</span>
            <span className="px-2 py-1 bg-[#2B1A12] border border-[#B8935A]/30">Cash on Delivery</span>
            <span className="px-2 py-1 bg-[#2B1A12] border border-[#B8935A]/30">Visa / Mastercard</span>
            <span className="px-2 py-1 bg-[#2B1A12] border border-[#B8935A]/30">EasyPaisa</span>
            <span className="px-2 py-1 bg-[#2B1A12] border border-[#B8935A]/30">JazzCash</span>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social */}
        <div className="pt-8 border-t border-[#B8935A]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E6D8C3]/50 font-light">
          <div>
            © {new Date().getFullYear()} Ovelo Essentials. All rights reserved. Quiet luxury for the modern man.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#B8935A] font-serif italic">“Make every step your own.”</span>
            <span>·</span>
            <span className="hover:text-[#F4ECDD] cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-[#F4ECDD] cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

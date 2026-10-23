import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, openCart, openSearch, currency, setCurrency, openShopifyCode } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'bg-[#F4ECDD]/90 backdrop-blur-md shadow-xs border-b border-[#B8935A]/20 py-3.5 text-[#2B1A12]'
            : 'bg-transparent py-5 text-[#F4ECDD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Zone 1: Left Navigation Links (Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-6 lg:w-1/3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 text-inherit hover:text-[#B8935A] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu size={22} />
            </button>

            <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-widest uppercase">
              <button
                onClick={() => handleScrollTo('signature-pieces')}
                className="hover-gold-underline text-inherit cursor-pointer whitespace-nowrap"
              >
                Bags
              </button>
              <button
                onClick={() => handleScrollTo('signature-pieces')}
                className="hover-gold-underline text-inherit cursor-pointer whitespace-nowrap"
              >
                Wallets
              </button>
              <button
                onClick={() => handleScrollTo('signature-pieces')}
                className="hover-gold-underline text-inherit cursor-pointer whitespace-nowrap"
              >
                Shoes
              </button>
              <button
                onClick={() => handleScrollTo('ovelo-set')}
                className="hover-gold-underline text-[#B8935A] font-semibold cursor-pointer whitespace-nowrap"
              >
                The Set
              </button>
            </nav>
          </div>

          {/* Zone 2: Centered Ovelo Wordmark */}
          <div className="text-center lg:w-1/3 flex justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group inline-flex flex-col items-center cursor-pointer text-decoration-none"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-inherit transition-transform duration-300 group-hover:scale-[1.02]">
                Ovelo
              </span>
              <span className={`text-[8.5px] uppercase tracking-[0.3em] font-light transition-colors ${
                isScrolled ? 'text-[#8B4A22]' : 'text-[#B8935A]'
              }`}>
                Timeless / Classic / Yours
              </span>
            </a>
          </div>

          {/* Zone 3: Right Action Icons (Search, Shopify Live, Bag Counter) */}
          <div className="flex items-center justify-end gap-5 lg:w-1/3">
            <button
              onClick={openSearch}
              className="p-1.5 text-inherit hover:text-[#B8935A] transition-colors cursor-pointer"
              aria-label="Search collection"
              title="Search collection"
            >
              <Search size={19} />
            </button>

            <button
              onClick={() => handleScrollTo('brand-story')}
              className="hidden sm:inline-flex items-center text-xs tracking-wider uppercase text-inherit hover:text-[#B8935A] transition-colors cursor-pointer"
              title="Why Ovelo"
            >
              Story
            </button>

            {/* Shopping Bag Trigger with Live Counter */}
            <button
              onClick={openCart}
              className="relative p-1.5 text-inherit hover:text-[#B8935A] transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={20} />
              <span className="font-mono text-xs font-semibold tabular-nums">
                ({cartCount})
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-in Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#F4ECDD] text-[#2B1A12] h-full shadow-2xl flex flex-col p-6 z-10">
            <div className="flex items-center justify-between pb-6 border-b border-[#B8935A]/25">
              <span className="font-serif text-2xl text-[#2B1A12]">Ovelo</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#2B1A12]/60 hover:text-[#2B1A12]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 py-8 flex flex-col gap-6 text-sm font-medium uppercase tracking-widest">
              <button
                onClick={() => handleScrollTo('signature-pieces')}
                className="text-left py-2 hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                Bags (Briefcase)
              </button>
              <button
                onClick={() => handleScrollTo('signature-pieces')}
                className="text-left py-2 hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                Wallets (Bi-Fold)
              </button>
              <button
                onClick={() => handleScrollTo('signature-pieces')}
                className="text-left py-2 hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                Shoes (Camel Suede)
              </button>
              <button
                onClick={() => handleScrollTo('ovelo-set')}
                className="text-left py-2 text-[#8B4A22] font-semibold hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                The Ovelo Set (Save 10%)
              </button>
              <button
                onClick={() => handleScrollTo('gift-edit')}
                className="text-left py-2 hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                Gift Edit
              </button>
              <button
                onClick={() => handleScrollTo('brand-story')}
                className="text-left py-2 hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                Why Ovelo
              </button>
              <button
                onClick={() => handleScrollTo('reviews-section')}
                className="text-left py-2 hover:text-[#B8935A] transition-colors border-b border-[#B8935A]/15"
              >
                Client Reviews
              </button>
            </nav>

            <div className="pt-6 border-t border-[#B8935A]/25 space-y-4 text-xs text-[#2B1A12]/80">
              <div className="flex items-center justify-between">
                <span>Currency</span>
                <button
                  onClick={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
                  className="font-semibold text-[#8B4A22]"
                >
                  {currency === 'PKR' ? 'PKR (Rs.)' : 'USD ($)'}
                </button>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openShopifyCode();
                }}
                className="w-full py-2.5 bg-[#2B1A12] text-[#F4ECDD] text-center font-medium uppercase tracking-wider text-[11px]"
              >
                View Shopify Liquid Files
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Gift, Check, PenTool } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const GiftEdit: React.FC = () => {
  const { products, addToCart, giftNote, setGiftNote, isGiftBox, setIsGiftBox, formatPrice } = useStore();
  const [localNote, setLocalNote] = useState(giftNote || 'Wishing you quiet confidence and effortless elegance on your next chapter.');
  const [isAdded, setIsAdded] = useState(false);

  const wallet = products.find(p => p.category === 'Wallets')!;

  const handleAddGiftWallet = () => {
    setGiftNote(localNote);
    setIsGiftBox(true);
    addToCart(wallet);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="gift-edit" className="py-24 bg-[#E6D8C3]/50 text-[#2B1A12] border-t border-[#B8935A]/25 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial & Gift Note Customizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B4A22] font-semibold flex items-center gap-2">
                <Gift size={13} className="text-[#8B4A22]" />
                THE GIFT EDIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2B1A12] leading-tight">
                A thoughtful gift for birthdays, Father’s Day and special occasions.
              </h2>
            </div>

            <p className="text-sm text-[#2B1A12]/80 leading-relaxed font-light">
              Few gestures endure like handcrafted leather. The Ovelo Classic Leather Wallet arrives presented in our signature rigid matte drawer box, wrapped in archival tissue paper, with a personalized letterpress card.
            </p>

            {/* Interactive Handwritten Gift Note Field */}
            <div className="p-6 bg-[#F4ECDD] border border-[#B8935A]/35 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#2B1A12] flex items-center gap-1.5">
                  <PenTool size={13} className="text-[#8B4A22]" />
                  <span>Complimentary Personalized Gift Card</span>
                </label>
                <span className="text-[11px] text-[#8B4A22] font-light">Handwritten by our team</span>
              </div>

              <textarea
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                maxLength={140}
                rows={3}
                placeholder="Write your personal gift inscription here..."
                className="w-full p-3 bg-white/80 border border-[#B8935A]/30 text-xs font-serif italic text-[#2B1A12] focus:outline-none focus:border-[#8B4A22] transition-colors resize-none leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-[#2B1A12]/60">
                <span>{localNote.length} / 140 characters</span>
                <span className="text-[#8B4A22]">Included complimentary</span>
              </div>
            </div>

            {/* Gift Box Packaging Checkbox */}
            <div className="flex items-center gap-3 text-xs text-[#2B1A12]/90">
              <input
                type="checkbox"
                id="giftBoxToggle"
                checked={isGiftBox}
                onChange={(e) => setIsGiftBox(e.target.checked)}
                className="w-4 h-4 accent-[#8B4A22] cursor-pointer"
              />
              <label htmlFor="giftBoxToggle" className="cursor-pointer select-none">
                Include luxury gift bag & wax-sealed satin ribbon (+Rs. 0)
              </label>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleAddGiftWallet}
                className="px-8 py-3.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer shadow-md flex items-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check size={14} className="text-[#B8935A]" />
                    <span>Gift Wallet Added</span>
                  </>
                ) : (
                  <span>Send as a Gift · {formatPrice(wallet.price)}</span>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Visual Gift Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] bg-[#E6D8C3] border border-[#B8935A]/30 overflow-hidden shadow-xl">
              <img
                src={wallet.primaryImage}
                alt="Ovelo Classic Wallet Gift Edition"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1A12]/70 via-transparent to-transparent"></div>
              
              {/* Overlay Letterpress Card Mockup */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#F4ECDD]/95 backdrop-blur-xs border border-[#B8935A]/40 shadow-md">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B4A22] block mb-1">
                  Letterpress Card Inscription
                </span>
                <p className="font-serif italic text-xs text-[#2B1A12] leading-relaxed">
                  “{localNote || 'Your custom message will appear here...'}”
                </p>
                <div className="mt-2 pt-2 border-t border-[#B8935A]/20 flex justify-between items-center text-[10px] text-[#2B1A12]/60">
                  <span>Ovelo Heritage Stationery</span>
                  <span className="font-serif text-[#8B4A22]">Embossed Seal</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

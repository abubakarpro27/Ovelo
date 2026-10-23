import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles, Tag, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    qualifiesFreeShipping,
    freeShippingRemaining,
    freeShippingProgress,
    products,
    addToCart,
    openCheckout,
    orderNote,
    setOrderNote,
    formatPrice
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [showNoteField, setShowNoteField] = useState(Boolean(orderNote));

  if (!isCartOpen) return null;

  // Determine presence of signature items
  const hasBag = cart.some(i => i.product.category === 'Bags');
  const hasWallet = cart.some(i => i.product.category === 'Wallets');
  const hasShoes = cart.some(i => i.product.category === 'Shoes');

  const bagProduct = products.find(p => p.category === 'Bags')!;
  const walletProduct = products.find(p => p.category === 'Wallets')!;
  const shoesProduct = products.find(p => p.category === 'Shoes')!;

  const itemsPresentCount = [hasBag, hasWallet, hasShoes].filter(Boolean).length;

  // Complete the Set banner if 2 out of 3 items are present
  const showCompleteTheSetBanner = itemsPresentCount === 2;
  let missingProduct: Product | null = null;
  if (itemsPresentCount === 2) {
    if (!hasBag) missingProduct = bagProduct;
    else if (!hasWallet) missingProduct = walletProduct;
    else if (!hasShoes) missingProduct = shoesProduct;
  }

  // Single item smart upsell if only 1 item is present
  const showSingleUpsell = itemsPresentCount === 1;
  let singleUpsellProduct: Product | null = null;
  if (showSingleUpsell) {
    if (hasBag) singleUpsellProduct = walletProduct;
    else if (hasWallet) singleUpsellProduct = bagProduct;
    else singleUpsellProduct = bagProduct;
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromoCode(promoInput);
    if (ok) setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#F4ECDD] text-[#2B1A12] h-full shadow-2xl flex flex-col z-10 border-l border-[#B8935A]/30">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#B8935A]/30 flex items-center justify-between bg-[#F4ECDD]">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl text-[#2B1A12]">Your Bag</h3>
            <span className="font-mono text-xs text-[#8B4A22] font-semibold tabular-nums">
              ({cartCount})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#2B1A12]/60 hover:text-[#2B1A12] transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        <div className="px-6 py-3.5 bg-[#E6D8C3]/60 border-b border-[#B8935A]/25 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium">
              {qualifiesFreeShipping ? (
                <span className="text-[#8B4A22] font-semibold flex items-center gap-1">
                  <Check size={13} />
                  Qualified for Free Insured Delivery
                </span>
              ) : (
                <span>Free nationwide delivery at {formatPrice(freeShippingThreshold)}</span>
              )}
            </span>
            {!qualifiesFreeShipping && (
              <span className="text-[#8B4A22] font-medium font-mono text-[11px] tabular-nums">
                {formatPrice(freeShippingRemaining)} away
              </span>
            )}
          </div>
          <div className="w-full bg-[#E6D8C3] h-1.5 overflow-hidden">
            <div
              className="bg-[#B8935A] h-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items Scroll Container or Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="p-4 bg-[#E6D8C3]/50 rounded-full text-[#8B4A22]">
                <ShoppingBag size={32} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-xl text-[#2B1A12]">Your bag is waiting.</h4>
              <p className="text-xs text-[#2B1A12]/70 font-light max-w-xs leading-relaxed">
                Discover refined pieces crafted with quiet elegance for your everyday carry.
              </p>
              <div className="pt-2 flex flex-col gap-2 w-full max-w-xs">
                <button
                  onClick={() => {
                    closeCart();
                    const el = document.getElementById('signature-pieces');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-[#2B1A12] text-[#F4ECDD] text-xs uppercase tracking-wider font-medium hover:bg-[#8B4A22] transition-colors"
                >
                  Explore The Collection
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* "Complete the Set" Nudge Banner if 2 of 3 pieces are present */}
              {showCompleteTheSetBanner && missingProduct && (
                <div className="p-3.5 bg-[#2B1A12] text-[#F4ECDD] border border-[#B8935A]/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#B8935A] font-semibold">
                      <Sparkles size={13} />
                      Complete the Set & Save 10%
                    </span>
                    <span className="text-[11px] text-[#E6D8C3]/80">Save Rs. 1,200</span>
                  </div>
                  <p className="text-[11px] text-[#E6D8C3]/80 leading-relaxed font-light">
                    Add the <strong>{missingProduct.title}</strong> to unlock the official 10% bundle privilege across your entire order.
                  </p>
                  <button
                    onClick={() => addToCart(missingProduct!)}
                    className="w-full py-1.5 bg-[#B8935A] hover:bg-[#c9a46b] text-[#0E0A08] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    + Add {missingProduct.title} · {formatPrice(missingProduct.price)}
                  </button>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-4 divide-y divide-[#B8935A]/15">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-24 bg-[#E6D8C3] shrink-0 overflow-hidden border border-[#B8935A]/25">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-semibold text-[#2B1A12] leading-tight">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#2B1A12]/40 hover:text-[#8B4A22] p-1 transition-colors"
                            aria-label={`Remove ${item.product.title}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        {item.selectedSize && (
                          <span className="text-[11px] text-[#8B4A22] font-medium block mt-0.5">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        <span className="text-xs font-serif text-[#2B1A12] block mt-1 tabular-nums">
                          {formatPrice(item.unitPrice)}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#B8935A]/35 bg-white/70">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-[#2B1A12]/70 hover:text-[#2B1A12] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2.5 py-1 text-xs font-mono tabular-nums text-[#2B1A12]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-[#2B1A12]/70 hover:text-[#2B1A12] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-medium text-[#2B1A12] tabular-nums">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Smart Upsell: If only 1 piece is in cart */}
              {showSingleUpsell && singleUpsellProduct && (
                <div className="p-3 bg-[#E6D8C3]/50 border border-[#B8935A]/25 space-y-2 mt-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#8B4A22] font-semibold block">
                    Recommended Pairing
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={singleUpsellProduct.primaryImage}
                      alt={singleUpsellProduct.title}
                      className="w-12 h-12 object-cover bg-white/60 border border-[#B8935A]/20"
                    />
                    <div className="flex-1">
                      <span className="font-serif text-xs font-medium block text-[#2B1A12]">
                        {singleUpsellProduct.title}
                      </span>
                      <span className="text-[11px] text-[#2B1A12]/70 tabular-nums">
                        {formatPrice(singleUpsellProduct.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(singleUpsellProduct!)}
                      className="px-3 py-1.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-[10px] uppercase tracking-wider font-medium transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer (Only when cart has items) */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-[#B8935A]/30 bg-[#F4ECDD] space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 bg-[#E6D8C3]/70 border border-[#B8935A]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[#8B4A22] font-medium">
                    <Tag size={12} />
                    <span>Code <strong>{appliedPromo}</strong> applied (10% off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[11px] text-[#2B1A12]/60 hover:text-red-700 underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code (e.g. OVELO10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 p-2 bg-white/70 border border-[#B8935A]/30 text-xs text-[#2B1A12] uppercase placeholder-normal focus:outline-none focus:border-[#8B4A22]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2B1A12] text-[#F4ECDD] hover:bg-[#8B4A22] text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <span className="text-[11px] text-red-600 block mt-1">{promoError}</span>
              )}
            </div>

            {/* Order Note Toggle */}
            <div className="text-xs">
              <button
                type="button"
                onClick={() => setShowNoteField(!showNoteField)}
                className="text-[#8B4A22] hover:text-[#2B1A12] font-medium underline text-[11px] cursor-pointer"
              >
                {showNoteField ? 'Hide order note' : '+ Add order note or instructions'}
              </button>
              {showNoteField && (
                <textarea
                  rows={2}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Special courier instructions, gate code, or gift request..."
                  className="mt-2 w-full p-2 bg-white/70 border border-[#B8935A]/30 text-xs text-[#2B1A12] focus:outline-none"
                />
              )}
            </div>

            {/* Subtotal, Discount & Total Calculation */}
            <div className="space-y-1.5 text-xs border-t border-[#B8935A]/20 pt-3">
              <div className="flex justify-between text-[#2B1A12]/75">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-sm text-[#2B1A12]">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#8B4A22] font-medium">
                  <span>Privilege Savings</span>
                  <span className="font-mono tabular-nums text-sm">
                    - {formatPrice(cartDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#2B1A12] font-serif text-lg font-semibold pt-1 border-t border-[#B8935A]/15">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="text-[10px] text-[#2B1A12]/60">
                Taxes included. Insured express delivery calculated at next step.
              </p>
            </div>

            {/* Full-width Proceed to Checkout CTA */}
            <button
              onClick={openCheckout}
              className="w-full py-4 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest font-semibold transition-colors duration-200 cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} className="text-[#B8935A]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#2B1A12]/60">
              <ShieldCheck size={12} className="text-[#8B4A22]" />
              <span>Cash on Delivery & Encrypted Card Payments</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

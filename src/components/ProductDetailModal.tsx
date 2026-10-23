import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    addToCart,
    openSizeGuide,
    openCheckout,
    products,
    formatPrice
  } = useStore();

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('EU 42');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  if (!selectedProduct) return null;

  const currentImage = activeImage || selectedProduct.primaryImage;
  const isShoes = selectedProduct.category === 'Shoes';

  // Cross-sell items ("Complete the Look")
  const crossSellProducts = products.filter(p => p.id !== selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, isShoes ? selectedSize : undefined, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, isShoes ? selectedSize : undefined, quantity);
    closeProductModal();
    openCheckout();
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(prev => prev === key ? null : key);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#F4ECDD] text-[#2B1A12] shadow-2xl border border-[#B8935A]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Bar with Breadcrumbs & Close */}
        <div className="px-6 py-4 border-b border-[#B8935A]/25 flex items-center justify-between bg-[#F4ECDD] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#2B1A12]/70 font-light truncate">
            <span className="hover:text-[#2B1A12] cursor-pointer" onClick={closeProductModal}>Collection</span>
            <span>/</span>
            <span className="text-[#8B4A22] font-medium">{selectedProduct.category}</span>
            <span>/</span>
            <span className="truncate text-[#2B1A12] font-medium">{selectedProduct.title}</span>
          </div>

          <button
            onClick={closeProductModal}
            className="p-1.5 text-[#2B1A12]/60 hover:text-[#2B1A12] transition-colors cursor-pointer"
            aria-label="Close product preview"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body (Desktop 2-Column Split) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Sticky Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] bg-[#E6D8C3] border border-[#B8935A]/30 overflow-hidden group">
              <img
                src={currentImage}
                alt={selectedProduct.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {selectedProduct.discountBadge && (
                <div className="absolute top-4 left-4 bg-[#2B1A12] text-[#F4ECDD] px-3 py-1 text-xs uppercase tracking-wider font-medium border border-[#B8935A]/40">
                  {selectedProduct.discountBadge}
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-3 gap-3">
              {[selectedProduct.primaryImage, selectedProduct.secondaryImage, selectedProduct.lifestyleImage]
                .filter(Boolean)
                .map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl!)}
                    className={`aspect-square bg-[#E6D8C3] border overflow-hidden transition-all cursor-pointer ${
                      currentImage === imgUrl ? 'border-[#B8935A] ring-1 ring-[#B8935A]' : 'border-[#B8935A]/25 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl!} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold">
                {selectedProduct.signoff}
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif text-[#2B1A12] leading-tight">
                {selectedProduct.title}
              </h1>

              {/* Star rating */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-[#B8935A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#B8935A" />
                  ))}
                </div>
                <span className="text-xs font-semibold tabular-nums text-[#2B1A12]">
                  {selectedProduct.rating}
                </span>
                <span className="text-xs text-[#2B1A12]/60">
                  ({selectedProduct.reviewCount} verified client reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-[#B8935A]/20">
              <span className="text-3xl font-serif text-[#2B1A12] tabular-nums font-semibold">
                {formatPrice(selectedProduct.price)}
              </span>
              {selectedProduct.compareAtPrice && (
                <span className="text-base line-through text-[#2B1A12]/45 tabular-nums">
                  {formatPrice(selectedProduct.compareAtPrice)}
                </span>
              )}
              {selectedProduct.discountBadge && (
                <span className="text-xs text-[#8B4A22] font-semibold tracking-wider uppercase ml-1">
                  Save 27%
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-[#2B1A12]/85 font-light leading-relaxed">
              {selectedProduct.shortDescription}
            </p>

            {/* Shoes Size Selector with Sold-Out States & Size Guide */}
            {isShoes && selectedProduct.sizes && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium uppercase tracking-wider">
                    Select Size: <strong>{selectedSize}</strong>
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="text-[#8B4A22] hover-gold-underline cursor-pointer font-medium"
                  >
                    Size Guide & Fit Advice 📐
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.available}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 text-xs font-mono text-center border transition-all cursor-pointer ${
                        !s.available
                          ? 'border-[#2B1A12]/15 bg-[#E6D8C3]/40 text-[#2B1A12]/30 line-through cursor-not-allowed'
                          : selectedSize === s.size
                          ? 'bg-[#2B1A12] text-[#F4ECDD] border-[#2B1A12] font-semibold shadow-xs'
                          : 'bg-white/80 border-[#B8935A]/35 text-[#2B1A12] hover:border-[#8B4A22]'
                      }`}
                    >
                      {s.size.replace('EU ', '')}
                    </button>
                  ))}
                </div>
                {selectedProduct.sizes.some(s => s.size === selectedSize && !s.available) && (
                  <span className="text-[11px] text-[#8B4A22] block">Size sold out</span>
                )}
              </div>
            )}

            {/* Quantity Stepper & Buy Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider font-medium text-[#2B1A12]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#B8935A]/40 bg-white/70">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-[#2B1A12]/70 hover:text-[#2B1A12]"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono tabular-nums font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-[#2B1A12]/70 hover:text-[#2B1A12]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Solid Brass Add to Bag + Dark Buy It Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-4 bg-[#B8935A] hover:bg-[#c9a46b] text-[#0E0A08] font-semibold text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {isAddedFeedback ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag</span>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-4 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] font-medium text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shadow-md"
                >
                  Buy It Now
                </button>
              </div>
            </div>

            {/* "Why You'll Love It" bullets */}
            <div className="p-4 bg-[#E6D8C3]/50 border border-[#B8935A]/30 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B4A22] flex items-center gap-1.5">
                <Sparkles size={13} />
                Why You’ll Love It
              </h4>
              <ul className="space-y-1.5 text-xs text-[#2B1A12]/80 font-light">
                {selectedProduct.whyLoveIt.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8B4A22] font-semibold">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#B8935A]/25 divide-y divide-[#B8935A]/20 text-xs">
              
              {/* Accordion 1: Details & Specs */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3.5 flex items-center justify-between font-medium uppercase tracking-wider text-left hover:text-[#8B4A22]"
                >
                  <span>Craftsmanship & Specifications</span>
                  <ChevronDown size={14} className={`transform transition-transform ${activeAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'details' && (
                  <div className="pb-4 space-y-2 text-[#2B1A12]/80 font-light">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <tbody>
                        <tr className="border-b border-[#B8935A]/15">
                          <td className="py-1.5 font-medium text-[#2B1A12] w-1/3">Dimensions</td>
                          <td className="py-1.5">{selectedProduct.specs.dimensions}</td>
                        </tr>
                        <tr className="border-b border-[#B8935A]/15">
                          <td className="py-1.5 font-medium text-[#2B1A12]">Primary Material</td>
                          <td className="py-1.5">{selectedProduct.specs.material}</td>
                        </tr>
                        <tr className="border-b border-[#B8935A]/15">
                          <td className="py-1.5 font-medium text-[#2B1A12]">Interior Lining</td>
                          <td className="py-1.5">{selectedProduct.specs.lining}</td>
                        </tr>
                        <tr className="border-b border-[#B8935A]/15">
                          <td className="py-1.5 font-medium text-[#2B1A12]">Hardware Appointments</td>
                          <td className="py-1.5">{selectedProduct.specs.hardware}</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 font-medium text-[#2B1A12]">Closure Type</td>
                          <td className="py-1.5">{selectedProduct.specs.closure}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping & Delivery Policy */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-3.5 flex items-center justify-between font-medium uppercase tracking-wider text-left hover:text-[#8B4A22]"
                >
                  <span>Shipping & Delivery Policy</span>
                  <ChevronDown size={14} className={`transform transition-transform ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#2B1A12]/80 space-y-1.5 font-light leading-relaxed">
                    <p>• Nationwide Express Delivery: <strong>2 to 4 business days</strong> via insured courier partners.</p>
                    <p>• Free shipping threshold: <strong>Complimentary on all orders over Rs. 6,000</strong>.</p>
                    <p>• Cash on Delivery (COD) supported across 150+ cities in Pakistan.</p>
                    <p>• SMS tracking number dispatched immediately upon warehouse packaging.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care & Preservation */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3.5 flex items-center justify-between font-medium uppercase tracking-wider text-left hover:text-[#8B4A22]"
                >
                  <span>Care & Material Preservation</span>
                  <ChevronDown size={14} className={`transform transition-transform ${activeAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-4 text-xs text-[#2B1A12]/80 space-y-1.5 font-light leading-relaxed">
                    <p>• Store in the provided breathable cotton dust bag away from direct tropical sunlight.</p>
                    <p>• If exposed to rain, blot gently with a dry microfiber cloth and allow to air-dry naturally.</p>
                    <p>• Condition genuine leather pieces bi-annually with neutral beeswax cream.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Returns & Courtesy Exchange */}
              <div>
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="w-full py-3.5 flex items-center justify-between font-medium uppercase tracking-wider text-left hover:text-[#8B4A22]"
                >
                  <span>Returns & Courtesy Exchange</span>
                  <ChevronDown size={14} className={`transform transition-transform ${activeAccordion === 'returns' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'returns' && (
                  <div className="pb-4 text-xs text-[#2B1A12]/80 space-y-1.5 font-light leading-relaxed">
                    <p>• <strong>7-Day Inspection Courtesy</strong>: You may inspect the package upon courier arrival.</p>
                    <p>• Free size exchange for footwear if unworn in original presentation packaging.</p>
                    <p>• Simply contact concierge via WhatsApp or email for immediate doorstep pickup.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Cross-Sell: Complete the Look */}
            <div className="pt-4 border-t border-[#B8935A]/25 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8B4A22] font-semibold block">
                Complete the Look
              </span>
              <div className="grid grid-cols-2 gap-3">
                {crossSellProducts.map((cross) => (
                  <div
                    key={cross.id}
                    className="p-2.5 bg-white/70 border border-[#B8935A]/30 flex items-center gap-3"
                  >
                    <img
                      src={cross.primaryImage}
                      alt={cross.title}
                      className="w-12 h-12 object-cover bg-[#E6D8C3]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-xs font-semibold block truncate text-[#2B1A12]">
                        {cross.title}
                      </span>
                      <span className="text-[11px] text-[#8B4A22] font-mono tabular-nums block">
                        {formatPrice(cross.price)}
                      </span>
                      <button
                        onClick={() => addToCart(cross)}
                        className="text-[10px] uppercase font-semibold text-[#2B1A12] hover:text-[#8B4A22] hover-gold-underline mt-0.5 cursor-pointer"
                      >
                        + Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Sticky Mobile Add-to-Bag Bar */}
        <div className="lg:hidden p-3 bg-[#F4ECDD] border-t border-[#B8935A]/30 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="font-serif text-xs font-semibold block truncate max-w-[150px]">
              {selectedProduct.title}
            </span>
            <span className="font-mono text-xs text-[#8B4A22] tabular-nums">
              {formatPrice(selectedProduct.price)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 bg-[#B8935A] text-[#0E0A08] text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            Add to Bag
          </button>
        </div>

      </div>
    </div>
  );
};

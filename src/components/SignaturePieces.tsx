import React, { useState } from 'react';
import { ArrowRight, Check, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const SignaturePieces: React.FC = () => {
  const { products, addToCart, openProductModal, openSizeGuide, formatPrice } = useStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const bag = products.find(p => p.category === 'Bags')!;
  const wallet = products.find(p => p.category === 'Wallets')!;
  const shoes = products.find(p => p.category === 'Shoes')!;

  return (
    <section id="signature-pieces" className="py-24 bg-[#F4ECDD] text-[#2B1A12] border-b border-[#B8935A]/25 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-28">

        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B4A22] font-semibold">
            THE SIGNATURE EDIT
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2B1A12] tracking-tight">
            Three Signature Pieces
          </h2>
          <p className="text-sm text-[#2B1A12]/80 font-light max-w-md mx-auto">
            Individually purposeful. Collectively cohesive. Designed with timeless discipline.
          </p>
          <div className="w-12 h-px bg-[#B8935A] mx-auto mt-4"></div>
        </div>

        {/* 1. The Bag (Left: 4:5 image, Right: Copy) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            onClick={() => openProductModal(bag)}
            className="lg:col-span-7 group relative aspect-[4/5] overflow-hidden bg-[#E6D8C3] cursor-pointer border border-[#B8935A]/20 shadow-lg shadow-black/5"
          >
            <img
              src={bag.primaryImage}
              alt={bag.title}
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <img
              src={bag.secondaryImage}
              alt={`${bag.title} secondary angle`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Sale Badge */}
            <div className="absolute top-4 left-4 bg-[#2B1A12] text-[#F4ECDD] px-3.5 py-1 text-[11px] font-medium uppercase tracking-widest border border-[#B8935A]/40">
              Save 27%
            </div>

            {/* Hover Quick View Trigger */}
            <div className="absolute bottom-4 right-4 bg-[#0E0A08]/75 backdrop-blur-xs text-[#F4ECDD] px-3 py-1.5 text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye size={13} className="text-[#B8935A]" />
              <span>Quick View</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold">
              BESPOKE EXECUTIVE CARRY
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#2B1A12] leading-tight">
              {bag.title}
            </h3>
            <p className="text-xl italic font-serif text-[#8B4A22]">
              “{bag.poeticLine}”
            </p>
            <p className="text-sm text-[#2B1A12]/85 leading-relaxed font-light">
              {bag.shortDescription}
            </p>

            {/* Pricing with Sale Strikethrough */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-serif text-[#2B1A12] tabular-nums font-semibold">
                {formatPrice(bag.price)}
              </span>
              {bag.compareAtPrice && (
                <span className="text-base line-through text-[#2B1A12]/45 tabular-nums">
                  {formatPrice(bag.compareAtPrice)}
                </span>
              )}
              <span className="text-xs uppercase tracking-wider text-[#8B4A22] font-medium ml-2">
                Save 27%
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={(e) => handleQuickAdd(bag, e)}
                className="px-8 py-3.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer shadow-md flex items-center gap-2"
              >
                {addedId === bag.id ? (
                  <>
                    <Check size={14} className="text-[#B8935A]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>
              <button
                onClick={() => openProductModal(bag)}
                className="hover-gold-underline text-xs uppercase tracking-widest text-[#2B1A12] font-semibold cursor-pointer"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

        {/* 2. The Wallet (Reversed: Left Copy, Right 4:5 image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 lg:order-1 order-2 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold">
              THE ENTRY-PRICE PIECE
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#2B1A12] leading-tight">
              {wallet.title}
            </h3>
            <p className="text-xl italic font-serif text-[#8B4A22]">
              “{wallet.poeticLine}”
            </p>
            <p className="text-sm text-[#2B1A12]/85 leading-relaxed font-light">
              {wallet.shortDescription}
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-serif text-[#2B1A12] tabular-nums font-semibold">
                {formatPrice(wallet.price)}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#B8935A] font-medium">
                The Ideal Gift
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={(e) => handleQuickAdd(wallet, e)}
                className="px-8 py-3.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer shadow-md flex items-center gap-2"
              >
                {addedId === wallet.id ? (
                  <>
                    <Check size={14} className="text-[#B8935A]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>
              <button
                onClick={() => openProductModal(wallet)}
                className="hover-gold-underline text-xs uppercase tracking-widest text-[#2B1A12] font-semibold cursor-pointer"
              >
                View Details →
              </button>
            </div>
          </div>

          <div
            onClick={() => openProductModal(wallet)}
            className="lg:col-span-7 lg:order-2 order-1 group relative aspect-[4/5] overflow-hidden bg-[#E6D8C3] cursor-pointer border border-[#B8935A]/20 shadow-lg shadow-black/5"
          >
            <img
              src={wallet.primaryImage}
              alt={wallet.title}
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <img
              src={wallet.secondaryImage}
              alt={`${wallet.title} secondary angle`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#2B1A12] text-[#F4ECDD] px-3.5 py-1 text-[11px] font-medium uppercase tracking-widest border border-[#B8935A]/40">
              Timeless Bi-Fold
            </div>
            <div className="absolute bottom-4 right-4 bg-[#0E0A08]/75 backdrop-blur-xs text-[#F4ECDD] px-3 py-1.5 text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye size={13} className="text-[#B8935A]" />
              <span>Quick View</span>
            </div>
          </div>
        </div>

        {/* 3. The Shoes (Left: 4:5 image, Right: Copy + Size Guide Link) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            onClick={() => openProductModal(shoes)}
            className="lg:col-span-7 group relative aspect-[4/5] overflow-hidden bg-[#E6D8C3] cursor-pointer border border-[#B8935A]/20 shadow-lg shadow-black/5"
          >
            <img
              src={shoes.primaryImage}
              alt={shoes.title}
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <img
              src={shoes.secondaryImage}
              alt={`${shoes.title} secondary angle`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#2B1A12] text-[#F4ECDD] px-3.5 py-1 text-[11px] font-medium uppercase tracking-widest border border-[#B8935A]/40">
              Camel Suede
            </div>
            <div className="absolute bottom-4 right-4 bg-[#0E0A08]/75 backdrop-blur-xs text-[#F4ECDD] px-3 py-1.5 text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye size={13} className="text-[#B8935A]" />
              <span>Quick View</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold">
                MINIMALIST SNEAKER
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openSizeGuide();
                }}
                className="hover-gold-underline text-xs text-[#8B4A22] font-medium cursor-pointer"
              >
                Size Guide 📐
              </button>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-[#2B1A12] leading-tight">
              {shoes.title}
            </h3>
            <p className="text-xl italic font-serif text-[#8B4A22]">
              “{shoes.poeticLine}”
            </p>
            <p className="text-sm text-[#2B1A12]/85 leading-relaxed font-light">
              {shoes.shortDescription}
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-serif text-[#2B1A12] tabular-nums font-semibold">
                {formatPrice(shoes.price)}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#2B1A12]/60 font-light">
                EU 40 – 44 In Stock
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={(e) => handleQuickAdd(shoes, e)}
                className="px-8 py-3.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer shadow-md flex items-center gap-2"
              >
                {addedId === shoes.id ? (
                  <>
                    <Check size={14} className="text-[#B8935A]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>
              <button
                onClick={() => openProductModal(shoes)}
                className="hover-gold-underline text-xs uppercase tracking-widest text-[#2B1A12] font-semibold cursor-pointer"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

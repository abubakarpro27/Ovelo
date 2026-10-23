import React from 'react';
import { X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const SIZE_CONVERSIONS = [
  { eu: 'EU 40', uk: 'UK 6.5', us: 'US 7.5', cm: '25.4 cm', fit: 'True to Size' },
  { eu: 'EU 41', uk: 'UK 7.5', us: 'US 8.5', cm: '26.0 cm', fit: 'True to Size' },
  { eu: 'EU 42', uk: 'UK 8.0', us: 'US 9.0', cm: '26.7 cm', fit: 'True to Size' },
  { eu: 'EU 43', uk: 'UK 9.0', us: 'US 10.0', cm: '27.3 cm', fit: 'True to Size' },
  { eu: 'EU 44', uk: 'UK 10.0', us: 'US 11.0', cm: '28.0 cm', fit: 'True to Size' },
  { eu: 'EU 45', uk: 'UK 11.0', us: 'US 12.0', cm: '28.6 cm', fit: 'Sold Out' }
];

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-[#F4ECDD] text-[#2B1A12] w-full max-w-xl p-6 sm:p-8 shadow-2xl border border-[#B8935A]/40 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#B8935A]/25">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold block">
              FOOTWEAR SIZING & FIT
            </span>
            <h3 className="font-serif text-2xl text-[#2B1A12]">
              Ovelo Shoe Size Guide
            </h3>
          </div>
          <button
            onClick={closeSizeGuide}
            className="text-[#2B1A12]/60 hover:text-[#2B1A12] p-1 text-sm"
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-[#2B1A12]/80 font-light leading-relaxed">
          Our camel suede sneakers are engineered using standard European lasts. They run true to size. If you normally wear half-sizes, we recommend sizing up to the next full size.
        </p>

        {/* Table */}
        <div className="overflow-x-auto border border-[#B8935A]/30 bg-white/70">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#E6D8C3] text-[#2B1A12] uppercase tracking-wider text-[11px] font-semibold border-b border-[#B8935A]/30">
              <tr>
                <th className="py-2.5 px-3">EU Size</th>
                <th className="py-2.5 px-3">UK Size</th>
                <th className="py-2.5 px-3">US Men</th>
                <th className="py-2.5 px-3">Foot Length</th>
                <th className="py-2.5 px-3">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8935A]/15 font-mono">
              {SIZE_CONVERSIONS.map((row) => (
                <tr key={row.eu} className={row.fit === 'Sold Out' ? 'opacity-40 line-through bg-black/5' : 'hover:bg-amber-50/50'}>
                  <td className="py-2.5 px-3 font-semibold text-[#2B1A12]">{row.eu}</td>
                  <td className="py-2.5 px-3 text-[#2B1A12]/80">{row.uk}</td>
                  <td className="py-2.5 px-3 text-[#2B1A12]/80">{row.us}</td>
                  <td className="py-2.5 px-3 text-[#8B4A22]">{row.cm}</td>
                  <td className="py-2.5 px-3 font-sans text-[11px]">
                    {row.fit === 'Sold Out' ? (
                      <span className="text-red-700 font-medium">Sold Out</span>
                    ) : (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <Check size={11} /> In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Guarantee Callout */}
        <div className="p-4 bg-[#E6D8C3]/50 border border-[#B8935A]/25 text-xs text-[#2B1A12]/85 font-light space-y-1">
          <strong className="font-semibold text-[#8B4A22] block uppercase tracking-wider text-[10px]">
            Complimentary Doorstep Size Exchange
          </strong>
          <p>
            Unsure of your fit? Order with peace of mind. We offer one complimentary size exchange nationwide within 7 days of delivery.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="px-6 py-2.5 bg-[#2B1A12] text-[#F4ECDD] text-xs uppercase tracking-wider font-medium hover:bg-[#8B4A22] transition-colors"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};

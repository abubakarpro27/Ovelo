import React, { useState } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, products, openProductModal, formatPrice } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.poeticLine.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#F4ECDD] text-[#2B1A12] w-full max-w-2xl shadow-2xl border border-[#B8935A]/40 overflow-hidden animate-fade-in">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#B8935A]/30 flex items-center gap-3 bg-white/70">
          <SearchIcon size={20} className="text-[#8B4A22]" />
          <input
            type="text"
            autoFocus
            placeholder="Search bags, bi-fold wallets, camel shoes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#2B1A12] placeholder-[#2B1A12]/40 focus:outline-none font-serif"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#2B1A12]/40 hover:text-[#2B1A12]"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-[#2B1A12]/60 hover:text-[#2B1A12] text-sm ml-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#B8935A]/20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold block mb-3">
            {searchTerm.trim() ? `Search Results (${filteredProducts.length})` : 'The Classic Collection'}
          </span>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#2B1A12]/60">
              No pieces match "{searchTerm}". Try searching "bag", "wallet", or "shoes".
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  closeSearch();
                  openProductModal(product);
                }}
                className="py-3 flex items-center justify-between gap-4 hover:bg-[#E6D8C3]/50 p-2 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.primaryImage}
                    alt={product.title}
                    className="w-12 h-14 object-cover bg-[#E6D8C3] border border-[#B8935A]/25"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#2B1A12] group-hover:text-[#8B4A22] transition-colors">
                      {product.title}
                    </h4>
                    <span className="text-xs italic text-[#8B4A22] font-serif block">
                      “{product.poeticLine}”
                    </span>
                    <span className="text-[11px] text-[#2B1A12]/60">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#2B1A12] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  <ArrowRight size={14} className="text-[#8B4A22] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Quick Links */}
        <div className="p-4 bg-[#E6D8C3]/60 border-t border-[#B8935A]/20 flex items-center justify-between text-xs text-[#2B1A12]/70">
          <span>Popular searches: Bag, Wallet, Camel Shoes, The Set</span>
          <span className="text-[10px] uppercase tracking-wider text-[#8B4A22]">Esc to close</span>
        </div>

      </div>
    </div>
  );
};

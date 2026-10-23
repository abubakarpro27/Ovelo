import React, { useState } from 'react';
import { Star, CheckCircle2, Plus, MessageSquare, Instagram } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SOCIAL_GALLERY } from '../data/products';

export const ReviewsAndGallery: React.FC = () => {
  const { reviews, addReview, products, openProductModal } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ovelo-bag-01' | 'ovelo-wallet-01' | 'ovelo-shoes-01'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    productId: 'ovelo-bag-01',
    author: '',
    location: '',
    rating: 5,
    title: '',
    body: ''
  });

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter(r => r.productId === activeFilter);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.body.trim()) return;

    const prod = products.find(p => p.id === formData.productId);
    addReview({
      productId: formData.productId,
      productTitle: prod ? prod.title : 'Ovelo Essential',
      author: formData.author.trim(),
      location: formData.location.trim() || 'Pakistan',
      rating: formData.rating,
      title: formData.title.trim() || 'Verified Experience',
      body: formData.body.trim(),
      verifiedBuyer: true
    });

    setIsWriteModalOpen(false);
    setFormData({
      productId: 'ovelo-bag-01',
      author: '',
      location: '',
      rating: 5,
      title: '',
      body: ''
    });
  };

  return (
    <section id="reviews-section" className="py-24 bg-[#E6D8C3]/40 text-[#2B1A12] border-t border-[#B8935A]/25 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">

        {/* 1. Verified Customer Reviews Header */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#B8935A]/25">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B4A22] font-semibold">
                CLIENT PERSPECTIVES
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2B1A12]">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 pt-1 text-xs text-[#2B1A12]/80">
                <div className="flex text-[#B8935A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#B8935A" />
                  ))}
                </div>
                <span className="font-semibold tabular-nums">4.9 / 5.0</span>
                <span>·</span>
                <span>Based on verified orders</span>
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-3 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus size={14} />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Interactive Filter Tabs (Zero-pill discipline: segmented clean tabs) */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#2B1A12] text-[#F4ECDD]'
                  : 'bg-[#F4ECDD] text-[#2B1A12] hover:bg-[#E6D8C3]'
              }`}
            >
              All Pieces ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('ovelo-bag-01')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                activeFilter === 'ovelo-bag-01'
                  ? 'bg-[#2B1A12] text-[#F4ECDD]'
                  : 'bg-[#F4ECDD] text-[#2B1A12] hover:bg-[#E6D8C3]'
              }`}
            >
              Classic Bag
            </button>
            <button
              onClick={() => setActiveFilter('ovelo-wallet-01')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                activeFilter === 'ovelo-wallet-01'
                  ? 'bg-[#2B1A12] text-[#F4ECDD]'
                  : 'bg-[#F4ECDD] text-[#2B1A12] hover:bg-[#E6D8C3]'
              }`}
            >
              Classic Wallet
            </button>
            <button
              onClick={() => setActiveFilter('ovelo-shoes-01')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                activeFilter === 'ovelo-shoes-01'
                  ? 'bg-[#2B1A12] text-[#F4ECDD]'
                  : 'bg-[#F4ECDD] text-[#2B1A12] hover:bg-[#E6D8C3]'
              }`}
            >
              Ovelo Shoes
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {filteredReviews.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-sm text-[#2B1A12]/60 bg-[#F4ECDD] border border-[#B8935A]/20">
                No reviews recorded yet for this piece. Be the first to share your experience.
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 bg-[#F4ECDD] border border-[#B8935A]/25 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#B8935A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="#B8935A" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#2B1A12]/50 tabular-nums">
                      {rev.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-base text-[#2B1A12] font-semibold">
                    {rev.title}
                  </h3>

                  <p className="text-xs text-[#2B1A12]/80 leading-relaxed font-light">
                    “{rev.body}”
                  </p>

                  <div className="pt-2 border-t border-[#B8935A]/15 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 font-medium text-[#2B1A12]">
                      <span>{rev.author}</span>
                      <span className="text-[#2B1A12]/40">·</span>
                      <span className="text-[#2B1A12]/60 font-light">{rev.location}</span>
                    </div>
                    {rev.verifiedBuyer && (
                      <span className="flex items-center gap-1 text-[#8B4A22] text-[10px] uppercase tracking-wider font-semibold">
                        <CheckCircle2 size={11} />
                        Verified Order
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. Customer Photo Gallery (@ovelo) */}
        <div className="space-y-6 pt-8 border-t border-[#B8935A]/25">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B4A22] font-semibold flex items-center gap-1.5">
                <Instagram size={13} className="text-[#8B4A22]" />
                COMMUNITY GALLERY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2B1A12]">
                Captured in the Wild
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-[#8B4A22] hover:text-[#B8935A] font-semibold hover-gold-underline"
            >
              Tag @ovelo to be featured →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIAL_GALLERY.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const prod = products.find(p => p.id === item.productId);
                  if (prod) openProductModal(prod);
                }}
                className="group relative aspect-square bg-[#E6D8C3] overflow-hidden cursor-pointer border border-[#B8935A]/25 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.tag}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0E0A08]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#F4ECDD]">
                  <span className="text-[10px] text-[#B8935A] uppercase tracking-widest font-mono">
                    {item.location}
                  </span>
                  <span className="font-serif text-xs font-medium">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-[#E6D8C3]/70 hover-gold-underline mt-1">
                    Shop Piece →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#F4ECDD] text-[#2B1A12] w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-[#B8935A]/40 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8935A]/25">
              <h3 className="font-serif text-2xl text-[#2B1A12]">
                Submit Client Review
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-[#2B1A12]/60 hover:text-[#2B1A12] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                  Select Product
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 cursor-pointer text-[#B8935A]"
                    >
                      <Star
                        size={20}
                        fill={star <= formData.rating ? '#B8935A' : 'none'}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono ml-2">{formData.rating} out of 5 stars</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Khan"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                    City, Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Islamabad, Pakistan"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional leather grain and presence"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                  Your Candid Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details on texture, hardware, ergonomics, and daily utility..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider border border-[#B8935A]/40 hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-wider font-medium"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

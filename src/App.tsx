/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { WordmarkCurtain } from './components/WordmarkCurtain';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FourPillarStrip } from './components/FourPillarStrip';
import { SignaturePieces } from './components/SignaturePieces';
import { OveloSetSection } from './components/OveloSetSection';
import { GiftEdit } from './components/GiftEdit';
import { WhyOvelo } from './components/WhyOvelo';
import { ReviewsAndGallery } from './components/ReviewsAndGallery';
import { InnerCircleSignup } from './components/InnerCircleSignup';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FastCheckoutModal } from './components/FastCheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { ShopifyFilesModal } from './components/ShopifyFilesModal';
import { AnalyticsModal } from './components/AnalyticsModal';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#F4ECDD] text-[#2B1A12] flex flex-col font-sans selection:bg-[#B8935A]/30 selection:text-[#2B1A12]">
        {/* Luxury wordmark curtain on initial load */}
        <WordmarkCurtain />

        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 3. Hero */}
          <Hero />

          {/* 4. Four-Pillar Trust Strip */}
          <FourPillarStrip />

          {/* 5. Three Signature Pieces (Alternating Editorial Rows) */}
          <SignaturePieces />

          {/* 6. The Ovelo Set Bundle */}
          <OveloSetSection />

          {/* 7. Gift Edit */}
          <GiftEdit />

          {/* 8. Why Ovelo Brand Story */}
          <WhyOvelo />

          {/* 9. Reviews & @ovelo Community Photo Gallery */}
          <ReviewsAndGallery />

          {/* 10. Inner Circle Private Newsletter Signup */}
          <InnerCircleSignup />
        </main>

        {/* 11. Footer */}
        <Footer />

        {/* Interactive Drawers & Overlays */}
        <CartDrawer />
        <ProductDetailModal />
        <SizeGuideModal />
        <FastCheckoutModal />
        <OrderConfirmationModal />
        <SearchModal />
        <ShopifyFilesModal />
        <AnalyticsModal />
      </div>
    </StoreProvider>
  );
}

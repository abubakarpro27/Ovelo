import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review, AnalyticsEvent, OrderConfirmation, CheckoutDetails } from '../types/store';
import { OVELO_PRODUCTS, INITIAL_REVIEWS } from '../data/products';

interface StoreContextType {
  products: Product[];
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  addBundleToCart: () => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  appliedPromo: string;
  promoError: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  
  freeShippingThreshold: number;
  qualifiesFreeShipping: boolean;
  freeShippingRemaining: number;
  freeShippingProgress: number;

  currency: 'PKR' | 'USD';
  setCurrency: (c: 'PKR' | 'USD') => void;
  formatPrice: (amountInPKR: number) => string;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  lastOrder: OrderConfirmation | null;
  completeCheckout: (details: CheckoutDetails) => void;
  closeOrderConfirmation: () => void;

  isShopifyCodeOpen: boolean;
  openShopifyCode: () => void;
  closeShopifyCode: () => void;

  isAnalyticsOpen: boolean;
  openAnalytics: () => void;
  closeAnalytics: () => void;
  analyticsEvents: AnalyticsEvent[];
  trackEvent: (eventName: AnalyticsEvent['eventName'], parameters: Record<string, any>) => void;

  orderNote: string;
  setOrderNote: (note: string) => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  isGiftBox: boolean;
  setIsGiftBox: (val: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY_CART = 'ovelo_cart_items_v1';
const STORAGE_KEY_REVIEWS = 'ovelo_reviews_v1';
const PKR_TO_USD_RATE = 0.0036; // Approx 1 USD = 278 PKR

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(OVELO_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  
  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Currency
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  // Modals
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);
  const [isShopifyCodeOpen, setIsShopifyCodeOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Extras
  const [orderNote, setOrderNote] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isGiftBox, setIsGiftBox] = useState(false);

  // Analytics event log
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([
    {
      id: 'evt-init',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      eventName: 'page_view',
      parameters: { page_title: "Ovelo Storefront", page_location: "/" }
    }
  ]);

  const trackEvent = (eventName: AnalyticsEvent['eventName'], parameters: Record<string, any>) => {
    const newEvent: AnalyticsEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      eventName,
      parameters
    };
    setAnalyticsEvents(prev => [newEvent, ...prev].slice(0, 50));
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    trackEvent('view_item', {
      item_id: product.id,
      item_name: product.title,
      price: product.price,
      currency: 'PKR'
    });
  };

  const closeProductModal = () => setSelectedProduct(null);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const defaultSize = product.category === 'Shoes' ? (size || 'EU 42') : undefined;
    const itemId = defaultSize ? `${product.id}-${defaultSize}` : product.id;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: defaultSize,
          quantity,
          unitPrice: product.price
        }
      ];
    });

    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.title,
      price: product.price,
      quantity,
      selected_size: defaultSize
    });

    setIsCartOpen(true);
  };

  const addBundleToCart = () => {
    const bag = products.find(p => p.category === 'Bags')!;
    const wallet = products.find(p => p.category === 'Wallets')!;
    const shoes = products.find(p => p.category === 'Shoes')!;

    setCart(prev => {
      let updated = [...prev];
      const itemsToAdd = [
        { product: bag, size: undefined },
        { product: wallet, size: undefined },
        { product: shoes, size: 'EU 42' }
      ];

      itemsToAdd.forEach(({ product, size }) => {
        const itemId = size ? `${product.id}-${size}` : product.id;
        const exists = updated.find(i => i.id === itemId);
        if (exists) {
          updated = updated.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          updated.push({
            id: itemId,
            product,
            selectedSize: size,
            quantity: 1,
            unitPrice: product.price
          });
        }
      });
      return updated;
    });

    trackEvent('apply_bundle', {
      bundle_name: 'The Ovelo Set',
      bundle_price: 10797,
      savings: 1200,
      items: ['ovelo-classic-brown-business-bag', 'ovelo-classic-leather-wallet', 'ovelo-shoes']
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    const removedItem = cart.find(i => i.id === itemId);
    if (removedItem) {
      trackEvent('remove_from_cart', {
        item_id: removedItem.product.id,
        item_name: removedItem.product.title
      });
    }
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  // Bundle detection: if Bag, Wallet, and Shoes are all in cart
  const hasBag = cart.some(i => i.product.category === 'Bags');
  const hasWallet = cart.some(i => i.product.category === 'Wallets');
  const hasShoes = cart.some(i => i.product.category === 'Shoes');
  const isSetBundleQualified = hasBag && hasWallet && hasShoes;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Discount calculation:
  // If set bundle qualified: 10% bundle discount
  // If promo code OVELO10: 10%
  let calculatedDiscount = 0;
  if (isSetBundleQualified) {
    calculatedDiscount = Math.round(cartSubtotal * 0.1);
  } else if (appliedPromo.toUpperCase() === 'OVELO10') {
    calculatedDiscount = Math.round(cartSubtotal * 0.1);
  }

  const cartDiscount = calculatedDiscount;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Free shipping at Rs. 6,000 threshold
  const freeShippingThreshold = 6000;
  const qualifiesFreeShipping = cartSubtotal >= freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'OVELO10') {
      setAppliedPromo('OVELO10');
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid promotion code. Try OVELO10');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setPromoError('');
  };

  const formatPrice = (amountInPKR: number) => {
    if (currency === 'USD') {
      const inUSD = Math.round(amountInPKR * PKR_TO_USD_RATE);
      return `$${inUSD}`;
    }
    return `Rs. ${amountInPKR.toLocaleString()}`;
  };

  const addReview = (newReview: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const fullReview: Review = {
      ...newReview,
      id: 'rev-' + Date.now(),
      date: 'Today',
      helpfulCount: 1
    };
    setReviews(prev => [fullReview, ...prev]);
  };

  const completeCheckout = (details: CheckoutDetails) => {
    const orderNum = 'OVL-' + Math.floor(1000 + Math.random() * 9000);
    const tracking = 'TRK-' + Math.floor(10000000 + Math.random() * 90000000);
    const shippingCost = qualifiesFreeShipping ? 0 : 250;

    const confirmation: OrderConfirmation = {
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: shippingCost,
      total: cartTotal + shippingCost,
      customer: details,
      trackingNumber: tracking,
      estimatedDelivery: '2–4 Business Days via Express Courier'
    };

    setLastOrder(confirmation);
    clearCart();
    setIsCheckoutOpen(false);

    trackEvent('purchase', {
      transaction_id: orderNum,
      value: confirmation.total,
      currency: 'PKR',
      items_count: confirmation.items.length,
      payment_method: details.paymentMethod
    });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        selectedProduct,
        openProductModal,
        closeProductModal,
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        addBundleToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
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
        currency,
        setCurrency,
        formatPrice,
        reviews,
        addReview,
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        isSearchOpen,
        openSearch: () => {
          setIsSearchOpen(true);
        },
        closeSearch: () => setIsSearchOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          trackEvent('begin_checkout', { subtotal: cartSubtotal, items_count: cartCount });
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        lastOrder,
        completeCheckout,
        closeOrderConfirmation: () => setLastOrder(null),
        isShopifyCodeOpen,
        openShopifyCode: () => setIsShopifyCodeOpen(true),
        closeShopifyCode: () => setIsShopifyCodeOpen(false),
        isAnalyticsOpen,
        openAnalytics: () => setIsAnalyticsOpen(true),
        closeAnalytics: () => setIsAnalyticsOpen(false),
        analyticsEvents,
        trackEvent,
        orderNote,
        setOrderNote,
        giftNote,
        setGiftNote,
        isGiftBox,
        setIsGiftBox
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};

export interface ProductSpec {
  dimensions: string;
  material: string;
  lining: string;
  hardware: string;
  compartments: string;
  closure: string;
}

export interface ShoeSize {
  size: string;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  category: 'Bags' | 'Wallets' | 'Shoes';
  price: number;
  compareAtPrice?: number;
  discountBadge?: string;
  primaryImage: string;
  secondaryImage: string;
  lifestyleImage?: string;
  shortDescription: string;
  poeticLine: string;
  signoff: string;
  rating: number;
  reviewCount: number;
  specs: ProductSpec;
  features: string[];
  whyLoveIt: string[];
  sizes?: ShoeSize[];
}

export interface CartItem {
  id: string; // unique item id (productId + size)
  product: Product;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: 'page_view' | 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'apply_bundle' | 'begin_checkout' | 'purchase';
  parameters: Record<string, any>;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: 'cod' | 'card' | 'easypaisa' | 'jazzcash' | 'bank';
  orderNotes?: string;
  isGift?: boolean;
  giftNote?: string;
  giftBoxIncluded?: boolean;
  isGiftBox?: boolean;
}

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: CheckoutDetails;
  trackingNumber: string;
  estimatedDelivery: string;
}

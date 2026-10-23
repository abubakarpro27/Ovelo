import { Product, Review } from '../types/store';

export const OVELO_PRODUCTS: Product[] = [
  {
    id: 'ovelo-bag-01',
    handle: 'ovelo-classic-brown-business-bag',
    title: 'Ovelo Classic Leather Bag',
    category: 'Bags',
    price: 5499,
    compareAtPrice: 7499,
    discountBadge: 'Save 27%',
    primaryImage: '/src/assets/images/product_ovelo_leather_bag_1792733196235.jpg',
    secondaryImage: '/src/assets/images/hero_ovelo_bag_desk_1792733194496.jpg',
    lifestyleImage: '/src/assets/images/hero_ovelo_bag_desk_1792733194496.jpg',
    poeticLine: 'Carry confidence.',
    signoff: 'Carry confidence. Carry Ovelo.',
    shortDescription: 'Refined dark brown business briefcase crafted with structured dual top handles, brass zipper appointments, and an adjustable shoulder strap. Designed for seamless transitions between boardroom meetings, airport terminals, and evening dinners.',
    rating: 4.9,
    reviewCount: 38,
    specs: {
      dimensions: '40cm × 29cm × 8.5cm (Fits up to 15.6" laptop)',
      material: 'Full-grain espresso pull-up leather with vegetable tanning',
      lining: 'High-density sand canvas with moisture barrier coating',
      hardware: 'Brushed antique solid brass zippers and reinforced clasps',
      compartments: '1 padded laptop sleeve, 1 zipped document folio, 2 pen slips, 1 exterior quick-access zip pouch',
      closure: 'Dual smooth-glide brass two-way zippers with leather pulls'
    },
    features: [
      'Padded shock-absorbing laptop compartment tailored for 13"–15.6" devices',
      'Detachable, ergonomic shoulder strap with contoured leather pad',
      'Quiet embossed Ovelo insignia centered below top trim',
      'Dual reinforced top-rolled carry handles for structured grip',
      'Pass-through trolley strap on reverse for effortless flight travel'
    ],
    whyLoveIt: [
      'Architectural silhouette that stands upright on desks and tables without slumping',
      'Develops a deep, rich personal patina unique to your journey over years',
      'Balances spacious utility with an ultra-slim, tailored silhouette'
    ]
  },
  {
    id: 'ovelo-wallet-01',
    handle: 'ovelo-classic-leather-wallet',
    title: 'Ovelo Classic Leather Wallet',
    category: 'Wallets',
    price: 2499,
    primaryImage: '/src/assets/images/product_ovelo_leather_wallet_1792733195868.jpg',
    secondaryImage: '/src/assets/images/bundle_ovelo_full_set_1792733195663.jpg',
    lifestyleImage: '/src/assets/images/product_ovelo_leather_wallet_1792733195868.jpg',
    poeticLine: 'Choose timeless.',
    signoff: 'Choose timeless. Choose Ovelo.',
    shortDescription: 'The entry-price signature piece and quintessential gift. An ultra-slim dark brown bi-fold wallet engineered with subtle cream contrast edge stitching, embossed monogram, and integrated electromagnetic shield lining.',
    rating: 4.95,
    reviewCount: 64,
    specs: {
      dimensions: '11cm × 9cm × 1.2cm (Ultra-slim pocket profile)',
      material: 'Hand-burnished dark brown top-grain leather',
      lining: 'RFID-blocking metallic woven barrier with silk-touch finish',
      hardware: 'None (Pure leather construction with beveled edges)',
      compartments: '8 precision card slots, 2 concealed receipt slips, 1 full-length currency divider',
      closure: 'Classic seamless bi-fold fold'
    },
    features: [
      'Engineered ultra-slim profile prevents pocket bulge in tailored trousers',
      'Contrast saddle-stitch hand detailing along outer perimeters',
      'Discreet debossed Ovelo wordmark on bottom interior corner',
      'Full RFID protection against wireless skimming and unauthorized scanning',
      'Accommodates PKR, USD, GBP, and EUR notes without creasing'
    ],
    whyLoveIt: [
      'Effortless everyday carry that fits neatly into suit jackets and denim pockets',
      'Arrives in a rigid foil-stamped gift box with cotton drawstring pouch',
      'Exceptional price-to-quality ratio that outlasts mass-produced wallets'
    ]
  },
  {
    id: 'ovelo-shoes-01',
    handle: 'ovelo-shoes',
    title: 'Ovelo Shoes',
    category: 'Shoes',
    price: 3999,
    primaryImage: '/src/assets/images/product_ovelo_camel_shoes_1792733195847.jpg',
    secondaryImage: '/src/assets/images/bundle_ovelo_full_set_1792733195663.jpg',
    lifestyleImage: '/src/assets/images/product_ovelo_camel_shoes_1792733195847.jpg',
    poeticLine: 'Make every step your own.',
    signoff: 'Make every step your own.',
    shortDescription: 'Understated camel suede-style minimalist sneaker featuring refined tonal perimeter stitching, calfskin interior collar, and a custom cream ridged rubber sole. Built for effortless weekend ease and contemporary smart-casual offices.',
    rating: 4.88,
    reviewCount: 42,
    specs: {
      dimensions: 'Standard European fit (true to size)',
      material: 'Velvety camel micro-suede upper with water-resistant treatment',
      lining: 'Breathable full-grain soft leather sockliner with antibacterial foam',
      hardware: 'Blind tonal eyelets with waxed flat cotton laces',
      compartments: 'Removable ergonomic memory foam footbed with arch support',
      closure: 'Lace-up front with padded suede tongue'
    },
    features: [
      'Cream ridged vulcanized rubber outsole provides steady all-weather traction',
      'Padded ankle collar prevents friction during extended airport walking',
      'Tonal stitching delivers a monochromatic, quiet luxury aesthetic',
      'Supplied with complimentary spare cream laces and travel dust bag',
      'Engineered to flex naturally without unsightly toe-box creasing'
    ],
    whyLoveIt: [
      'Seamlessly pairs with tailored trousers, selvedge denim, or chinos',
      'Ultra-lightweight construction keeps your feet energized through 12-hour days',
      'Clean minimalist silhouette free of loud logos or athletic graphics'
    ],
    sizes: [
      { size: 'EU 40', available: true },
      { size: 'EU 41', available: true },
      { size: 'EU 42', available: true },
      { size: 'EU 43', available: true },
      { size: 'EU 44', available: true },
      { size: 'EU 45', available: false } // Sold out state as requested
    ]
  }
];

export const OVELO_BUNDLE_INFO = {
  title: 'The Ovelo Set',
  subtitle: 'Complete the Set',
  description: 'The definitive triumvirate of quiet luxury. Own the Classic Leather Bag, Classic Leather Wallet, and Camel Shoes in one cohesive ensemble.',
  individualTotal: 11997,
  bundleDiscountPercent: 10,
  bundlePrice: 10797,
  bundleSavings: 1200,
  image: '/src/assets/images/bundle_ovelo_full_set_1792733195663.jpg',
  tagline: 'Timeless / Classic / Yours'
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'ovelo-bag-01',
    productTitle: 'Ovelo Classic Leather Bag',
    author: 'Hamza K.',
    location: 'Lahore, Pakistan',
    rating: 5,
    date: '14 October 2026',
    title: 'Unrivaled presence in client meetings',
    body: 'The leather feels substantive yet not cumbersome. It comfortably holds my 15-inch laptop, charger, notebooks, and keys without ever losing its crisp silhouette. Colleagues immediately remarked on the brass hardware.',
    verifiedBuyer: true,
    helpfulCount: 19
  },
  {
    id: 'rev-02',
    productId: 'ovelo-wallet-01',
    productTitle: 'Ovelo Classic Leather Wallet',
    author: 'Danish R.',
    location: 'Karachi, Pakistan',
    rating: 5,
    date: '28 September 2026',
    title: 'The finest bi-fold I have owned',
    body: 'Slim, clean, and the contrast stitching is razor-sharp. Even with 7 cards and banknotes inserted, it slips into suit jacket pockets seamlessly. The presentation box made it feel like receiving a bespoke gift.',
    verifiedBuyer: true,
    helpfulCount: 14
  },
  {
    id: 'rev-03',
    productId: 'ovelo-shoes-01',
    productTitle: 'Ovelo Shoes',
    author: 'Bilal M.',
    location: 'Islamabad, Pakistan',
    rating: 5,
    date: '02 October 2026',
    title: 'Subtle elegance and immediate comfort',
    body: 'True to size. Wore them straight out of the box through a 3-day conference with zero break-in period. The camel suede pairs exceptionally with off-white trousers and navy blazers.',
    verifiedBuyer: true,
    helpfulCount: 22
  },
  {
    id: 'rev-04',
    productId: 'ovelo-bag-01',
    productTitle: 'Ovelo Classic Leather Bag',
    author: 'Zain A.',
    location: 'Peshawar, Pakistan',
    rating: 5,
    date: '19 September 2026',
    title: 'Solid craftsmanship throughout',
    body: 'Noticeably better leather than imported options at double this price point. The shoulder strap cushioning is generous, and the brass zippers glide smoothly.',
    verifiedBuyer: true,
    helpfulCount: 11
  }
];

export const SOCIAL_GALLERY = [
  {
    id: 'social-1',
    handle: '@ovelo',
    location: 'Islamabad Club',
    image: '/src/assets/images/hero_ovelo_bag_desk_1792733194496.jpg',
    tag: 'Classic Leather Bag',
    productId: 'ovelo-bag-01'
  },
  {
    id: 'social-2',
    handle: '@ovelo',
    location: 'Karachi Financial District',
    image: '/src/assets/images/product_ovelo_leather_wallet_1792733195868.jpg',
    tag: 'Classic Leather Wallet',
    productId: 'ovelo-wallet-01'
  },
  {
    id: 'social-3',
    handle: '@ovelo',
    location: 'Mall of Lahore',
    image: '/src/assets/images/product_ovelo_camel_shoes_1792733195847.jpg',
    tag: 'Ovelo Shoes',
    productId: 'ovelo-shoes-01'
  },
  {
    id: 'social-4',
    handle: '@ovelo',
    location: 'F-7 Terrace Cafe',
    image: '/src/assets/images/bundle_ovelo_full_set_1792733195663.jpg',
    tag: 'The Ovelo Set',
    productId: 'ovelo-bag-01'
  }
];

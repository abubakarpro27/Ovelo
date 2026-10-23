export interface ShopifyThemeFile {
  filename: string;
  category: 'Section' | 'Snippet' | 'Asset' | 'Documentation';
  description: string;
  code: string;
}

export const SHOPIFY_THEME_FILES: ShopifyThemeFile[] = [
  {
    filename: 'sections/hero.liquid',
    category: 'Section',
    description: 'Full-viewport hero with dynamic lifestyle imagery, launch offer countdown, and dual CTAs',
    code: `{% comment %}
  Ovelo Storefront — Hero Section
  Online Store 2.0 Schema Architecture
  File: sections/hero.liquid
{% endcomment %}

<div class="ovelo-hero relative w-full min-h-[92vh] flex items-center bg-[#0E0A08] text-[#F4ECDD] overflow-hidden" data-section-id="{{ section.id }}">
  <!-- Background Lifestyle Media -->
  <div class="absolute inset-0 z-0">
    {% if section.settings.hero_image != blank %}
      <img
        src="{{ section.settings.hero_image | image_url: width: 2400 }}"
        srcset="{{ section.settings.hero_image | image_url: width: 1200 }} 1200w, {{ section.settings.hero_image | image_url: width: 2400 }} 2400w"
        alt="{{ section.settings.headline | escape }}"
        class="w-full h-full object-cover object-center filter brightness-[0.72] transition-transform duration-1000 ease-out"
        loading="eager"
      />
    {% else %}
      {{ 'lifestyle-1' | placeholder_svg_tag: 'w-full h-full object-cover opacity-20' }}
    {% endif %}
    <!-- Luxury Contrast Vignette -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-black/40 to-black/20"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
    <div class="max-w-2xl space-y-6">
      <!-- Eyebrow & Live Launch Offer Tag -->
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-semibold">
          {{ section.settings.eyebrow | default: 'The Classic Collection' }}
        </span>
        <span class="text-[#E6D8C3]/40">·</span>
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#2B1A12]/80 backdrop-blur-sm border border-[#B8935A]/30 text-xs text-[#F4ECDD]">
          <span class="text-[#B8935A] font-medium">{{ section.settings.launch_tag | default: 'Launch Offer' }}</span>
          <span class="text-[#E6D8C3]/60">·</span>
          <span class="ovelo-countdown-timer font-mono text-[#F4ECDD]" data-end-time="{{ section.settings.countdown_end }}">
            Offer ends in 03 : 12 : 45
          </span>
        </div>
      </div>

      <!-- Headline -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#F4ECDD] leading-[1.1]">
        {{ section.settings.headline | default: 'Timeless. Classic. Yours.' }}
      </h1>

      <!-- Subcopy -->
      <p class="text-base sm:text-lg text-[#E6D8C3]/90 font-light max-w-lg leading-relaxed">
        {{ section.settings.subcopy | default: 'Refined style for every journey. Handcrafted leather pieces designed for quiet confidence in the boardroom and on weekend retreats.' }}
      </p>

      <!-- Action Buttons -->
      <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <a href="{{ section.settings.primary_cta_link | default: '#signature-pieces' }}" 
           class="inline-flex justify-center items-center px-8 py-3.5 bg-[#B8935A] text-[#0E0A08] hover:bg-[#c9a46b] font-medium text-sm tracking-wide transition-colors duration-200">
          {{ section.settings.primary_cta_text | default: 'Shop the Collection' }}
        </a>
        <a href="{{ section.settings.secondary_cta_link | default: '#ovelo-set' }}" 
           class="inline-flex justify-center items-center px-8 py-3.5 border border-[#B8935A]/60 text-[#F4ECDD] hover:bg-[#B8935A]/10 font-medium text-sm tracking-wide transition-colors duration-200">
          {{ section.settings.secondary_cta_text | default: 'Shop the Set' }}
        </a>
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Ovelo Hero",
  "settings": [
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Lifestyle Image"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow Text",
      "default": "THE CLASSIC COLLECTION"
    },
    {
      "type": "text",
      "id": "headline",
      "label": "Hero Headline",
      "default": "Timeless. Classic. Yours."
    },
    {
      "type": "textarea",
      "id": "subcopy",
      "label": "Hero Subcopy",
      "default": "Refined style for every journey."
    },
    {
      "type": "text",
      "id": "launch_tag",
      "label": "Launch Offer Badge Text",
      "default": "Launch Offer"
    },
    {
      "type": "text",
      "id": "countdown_end",
      "label": "Countdown End Timestamp (ISO)",
      "default": "2026-10-31T23:59:59"
    },
    {
      "type": "text",
      "id": "primary_cta_text",
      "label": "Primary Button Text",
      "default": "Shop the Collection"
    },
    {
      "type": "url",
      "id": "primary_cta_link",
      "label": "Primary Button Link"
    },
    {
      "type": "text",
      "id": "secondary_cta_text",
      "label": "Secondary Button Text",
      "default": "Shop the Set"
    },
    {
      "type": "url",
      "id": "secondary_cta_link",
      "label": "Secondary Button Link"
    }
  ],
  "presets": [
    {
      "name": "Ovelo Hero"
    }
  ]
}
{% endschema %}`
  },
  {
    filename: 'sections/three-pieces.liquid',
    category: 'Section',
    description: 'Alternating editorial rows for Bag, Wallet, and Shoes with dynamic Liquid data',
    code: `{% comment %}
  Ovelo Storefront — Three Signature Pieces
  File: sections/three-pieces.liquid
  Pulls live product data from Shopify handles via Liquid.
{% endcomment %}

<section id="signature-pieces" class="py-24 bg-[#F4ECDD] text-[#2B1A12] border-t border-[#B8935A]/20">
  <div class="max-w-7xl mx-auto px-6 lg:px-12 space-y-28">

    <!-- Header -->
    <div class="text-center max-w-xl mx-auto space-y-3">
      <span class="text-xs uppercase tracking-[0.25em] text-[#8B4A22] font-semibold">The Core Essentials</span>
      <h2 class="text-3xl sm:text-4xl font-serif text-[#2B1A12]">Three Signature Pieces</h2>
      <div class="w-12 h-px bg-[#B8935A] mx-auto mt-4"></div>
    </div>

    <!-- Alternating Product Rows -->
    {% assign bag_product = all_products[section.settings.bag_handle] %}
    {% assign wallet_product = all_products[section.settings.wallet_handle] %}
    {% assign shoes_product = all_products[section.settings.shoes_handle] %}

    <!-- 1. The Bag -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div class="lg:col-span-7 group relative aspect-[4/5] overflow-hidden bg-[#E6D8C3]">
        <img src="{{ bag_product.featured_image | image_url: width: 1400 }}" 
             alt="{{ bag_product.title | escape }}" 
             class="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0" />
        {% if bag_product.images[1] %}
          <img src="{{ bag_product.images[1] | image_url: width: 1400 }}" 
               alt="{{ bag_product.title | escape }}" 
               class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {% endif %}
        <span class="absolute top-4 left-4 bg-[#2B1A12] text-[#F4ECDD] px-3 py-1 text-xs font-medium uppercase tracking-wider">
          Save 27%
        </span>
      </div>
      <div class="lg:col-span-5 space-y-6">
        <span class="text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-medium">Bespoke Carry</span>
        <h3 class="text-3xl sm:text-4xl font-serif text-[#2B1A12]">{{ bag_product.title | default: 'Ovelo Classic Leather Bag' }}</h3>
        <p class="text-lg italic font-serif text-[#8B4A22]">“Carry confidence.”</p>
        <p class="text-sm text-[#2B1A12]/80 leading-relaxed font-light">
          {{ bag_product.description | strip_html | truncatewords: 32 }}
        </p>
        <div class="flex items-baseline gap-3">
          <span class="text-2xl font-serif text-[#2B1A12]">{{ bag_product.price | money }}</span>
          {% if bag_product.compare_at_price > bag_product.price %}
            <span class="text-sm line-through text-[#2B1A12]/40">{{ bag_product.compare_at_price | money }}</span>
          {% endif %}
        </div>
        <div class="pt-2 flex items-center gap-4">
          <button data-ajax-add="{{ bag_product.selected_or_first_available_variant.id }}" class="ovelo-add-to-bag px-6 py-3 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors">
            Add to Bag
          </button>
          <a href="{{ bag_product.url }}" class="hover-gold-underline text-xs uppercase tracking-widest text-[#2B1A12] font-medium">
            View Details →
          </a>
        </div>
      </div>
    </div>

    <!-- 2. The Wallet (Reversed) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div class="lg:col-span-5 lg:order-1 order-2 space-y-6">
        <span class="text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-medium">Everyday Essential</span>
        <h3 class="text-3xl sm:text-4xl font-serif text-[#2B1A12]">{{ wallet_product.title | default: 'Ovelo Classic Leather Wallet' }}</h3>
        <p class="text-lg italic font-serif text-[#8B4A22]">“Choose timeless.”</p>
        <p class="text-sm text-[#2B1A12]/80 leading-relaxed font-light">
          The entry-price piece and quintessential gift. Crafted with subtle contrast perimeter stitching, RFID protection, and an ultra-slim pocket profile.
        </p>
        <div class="flex items-baseline gap-3">
          <span class="text-2xl font-serif text-[#2B1A12]">{{ wallet_product.price | money }}</span>
        </div>
        <div class="pt-2 flex items-center gap-4">
          <button data-ajax-add="{{ wallet_product.selected_or_first_available_variant.id }}" class="ovelo-add-to-bag px-6 py-3 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors">
            Add to Bag
          </button>
          <a href="{{ wallet_product.url }}" class="hover-gold-underline text-xs uppercase tracking-widest text-[#2B1A12] font-medium">
            View Details →
          </a>
        </div>
      </div>
      <div class="lg:col-span-7 lg:order-2 order-1 group relative aspect-[4/5] overflow-hidden bg-[#E6D8C3]">
        <img src="{{ wallet_product.featured_image | image_url: width: 1400 }}" 
             alt="{{ wallet_product.title | escape }}" 
             class="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0" />
        {% if wallet_product.images[1] %}
          <img src="{{ wallet_product.images[1] | image_url: width: 1400 }}" 
               alt="{{ wallet_product.title | escape }}" 
               class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {% endif %}
      </div>
    </div>

    <!-- 3. The Shoes -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div class="lg:col-span-7 group relative aspect-[4/5] overflow-hidden bg-[#E6D8C3]">
        <img src="{{ shoes_product.featured_image | image_url: width: 1400 }}" 
             alt="{{ shoes_product.title | escape }}" 
             class="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0" />
        {% if shoes_product.images[1] %}
          <img src="{{ shoes_product.images[1] | image_url: width: 1400 }}" 
               alt="{{ shoes_product.title | escape }}" 
               class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {% endif %}
      </div>
      <div class="lg:col-span-5 space-y-6">
        <span class="text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-medium">Refined Footwear</span>
        <h3 class="text-3xl sm:text-4xl font-serif text-[#2B1A12]">{{ shoes_product.title | default: 'Ovelo Shoes' }}</h3>
        <p class="text-lg italic font-serif text-[#8B4A22]">“Make every step your own.”</p>
        <p class="text-sm text-[#2B1A12]/80 leading-relaxed font-light">
          Camel suede sneaker with tonal precision stitching and cream ridged rubber sole. Engineered for prolonged comfort and effortless smart-casual pairing.
        </p>
        <div class="flex items-baseline gap-3">
          <span class="text-2xl font-serif text-[#2B1A12]">{{ shoes_product.price | money }}</span>
        </div>
        <div class="pt-2 flex items-center gap-4">
          <button data-ajax-add="{{ shoes_product.selected_or_first_available_variant.id }}" class="ovelo-add-to-bag px-6 py-3 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors">
            Add to Bag
          </button>
          <a href="{{ shoes_product.url }}" class="hover-gold-underline text-xs uppercase tracking-widest text-[#2B1A12] font-medium">
            View Details →
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

{% schema %}
{
  "name": "Three Signature Pieces",
  "settings": [
    {
      "type": "text",
      "id": "bag_handle",
      "label": "Bag Product Handle",
      "default": "ovelo-classic-brown-business-bag"
    },
    {
      "type": "text",
      "id": "wallet_handle",
      "label": "Wallet Product Handle",
      "default": "ovelo-classic-leather-wallet"
    },
    {
      "type": "text",
      "id": "shoes_handle",
      "label": "Shoes Product Handle",
      "default": "ovelo-shoes"
    }
  ],
  "presets": [
    {
      "name": "Three Signature Pieces"
    }
  ]
}
{% endschema %}`
  },
  {
    filename: 'sections/ovelo-set.liquid',
    category: 'Section',
    description: 'Dark espresso bundle section with multi-item /cart/add.js bundle automation',
    code: `{% comment %}
  Ovelo Storefront — The Ovelo Set Bundle
  File: sections/ovelo-set.liquid
{% endcomment %}

<section id="ovelo-set" class="py-24 bg-[#2B1A12] text-[#F4ECDD] border-t border-[#B8935A]/30 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      <!-- Visual Bundle Flatlay -->
      <div class="lg:col-span-7 relative aspect-[4/3] bg-[#0E0A08] border border-[#B8935A]/30 overflow-hidden">
        {% if section.settings.set_image != blank %}
          <img src="{{ section.settings.set_image | image_url: width: 1600 }}" 
               alt="The Ovelo Set" 
               class="w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-700 ease-out" />
        {% endif %}
        <div class="absolute bottom-4 left-4 bg-[#0E0A08]/80 backdrop-blur-sm px-4 py-2 border border-[#B8935A]/30">
          <span class="text-xs uppercase tracking-[0.2em] text-[#B8935A]">Complete 3-Piece Ensemble</span>
        </div>
      </div>

      <!-- Bundle Details & 1-Click Multi-Add Action -->
      <div class="lg:col-span-5 space-y-6">
        <span class="text-xs uppercase tracking-[0.25em] text-[#B8935A] font-medium">Curated Essentials</span>
        <h2 class="text-3xl sm:text-5xl font-serif text-[#F4ECDD] leading-tight">Complete the Set.</h2>
        <p class="text-sm sm:text-base text-[#E6D8C3]/80 leading-relaxed font-light">
          The Bag, the Wallet, and the Shoes. Together they establish a disciplined, coordinated standard for your travel and daily schedule.
        </p>

        <!-- Pricing Math -->
        <div class="p-6 bg-[#0E0A08]/60 border border-[#B8935A]/30 space-y-3">
          <div class="flex justify-between text-xs text-[#E6D8C3]/70">
            <span>Individual Items Total:</span>
            <span class="line-through">Rs. 11,997</span>
          </div>
          <div class="flex justify-between text-sm text-[#B8935A] font-medium">
            <span>Set Privilege (10% Off):</span>
            <span>- Rs. 1,200</span>
          </div>
          <div class="pt-2 border-t border-[#B8935A]/20 flex justify-between items-baseline">
            <span class="text-sm font-medium uppercase tracking-wider text-[#F4ECDD]">Bundle Price:</span>
            <span class="text-2xl font-serif text-[#F4ECDD]">Rs. 10,797</span>
          </div>
        </div>

        <!-- 1-Click Add Entire Set to Cart via /cart/add.js -->
        <button id="add-ovelo-set-btn" class="w-full py-4 bg-[#B8935A] hover:bg-[#c9a46b] text-[#0E0A08] font-medium text-xs uppercase tracking-widest transition-colors duration-200">
          Add the Set to Bag (Save 10%)
        </button>
        <p class="text-[11px] text-center text-[#E6D8C3]/60 italic">
          Complimentary insured shipping nationwide & gift presentation box included.
        </p>
      </div>

    </div>
  </div>
</section>

{% schema %}
{
  "name": "The Ovelo Set",
  "settings": [
    {
      "type": "image_picker",
      "id": "set_image",
      "label": "Set Flatlay Image"
    }
  ],
  "presets": [
    {
      "name": "The Ovelo Set"
    }
  ]
}
{% endschema %}`
  },
  {
    filename: 'snippets/cart-drawer.liquid',
    category: 'Snippet',
    description: 'Slide-in AJAX Cart Drawer with free shipping progress, smart upsell, and notes',
    code: `{% comment %}
  Ovelo Storefront — AJAX Cart Drawer
  File: snippets/cart-drawer.liquid
{% endcomment %}

<div id="ovelo-cart-drawer" class="fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 opacity-0" aria-hidden="true">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" id="ovelo-cart-backdrop"></div>

  <!-- Drawer Container -->
  <div class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#F4ECDD] text-[#2B1A12] shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" id="ovelo-cart-panel">
    
    <!-- Drawer Header -->
    <div class="px-6 py-5 border-b border-[#B8935A]/30 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h3 class="font-serif text-xl text-[#2B1A12]">Your Bag</h3>
        <span id="ovelo-drawer-count" class="text-xs text-[#8B4A22] font-mono">(0)</span>
      </div>
      <button id="ovelo-close-cart" class="text-[#2B1A12]/60 hover:text-[#2B1A12] text-sm tracking-wider uppercase">
        Close ✕
      </button>
    </div>

    <!-- Free Nationwide Delivery Progress Bar -->
    <div class="px-6 py-3 bg-[#E6D8C3]/50 border-b border-[#B8935A]/20">
      <div class="flex justify-between text-xs mb-1.5 font-medium">
        <span id="free-shipping-text">Free Delivery at Rs. 6,000</span>
        <span id="free-shipping-remaining" class="text-[#8B4A22]">Rs. 6,000 away</span>
      </div>
      <div class="w-full bg-[#E6D8C3] h-1.5 rounded-full overflow-hidden">
        <div id="free-shipping-bar" class="bg-[#B8935A] h-full transition-all duration-300" style="width: 0%;"></div>
      </div>
    </div>

    <!-- Line Items List -->
    <div id="ovelo-cart-items" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      <!-- Injected dynamically via ovelo.js -->
    </div>

    <!-- Drawer Footer -->
    <div class="px-6 py-5 border-t border-[#B8935A]/30 bg-[#F4ECDD] space-y-4">
      <!-- Order Notes / Gift Message Toggle -->
      <details class="text-xs text-[#2B1A12]/80">
        <summary class="cursor-pointer hover:text-[#2B1A12] font-medium">Add complimentary gift note</summary>
        <textarea name="note" rows="2" class="mt-2 w-full p-2 text-xs bg-white/70 border border-[#B8935A]/30 focus:outline-none" placeholder="Write your heartfelt note..."></textarea>
      </details>

      <div class="space-y-1">
        <div class="flex justify-between text-sm">
          <span>Subtotal</span>
          <span id="ovelo-drawer-subtotal" class="font-serif font-medium text-lg">Rs. 0</span>
        </div>
        <p class="text-[11px] text-[#2B1A12]/60">Taxes and shipping calculated at checkout.</p>
      </div>

      <a href="/checkout" class="block text-center w-full py-4 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest transition-colors font-medium">
        Proceed to Checkout
      </a>
    </div>

  </div>
</div>`
  },
  {
    filename: 'assets/ovelo.css',
    category: 'Asset',
    description: 'Luxury styling tokens, brass dividers, typography, and motion transitions',
    code: `/* Ovelo Luxury Storefront CSS */
:root {
  --ovelo-espresso: #2B1A12;
  --ovelo-cognac: #8B4A22;
  --ovelo-camel: #B88A5E;
  --ovelo-cream: #F4ECDD;
  --ovelo-marble: #E6D8C3;
  --ovelo-brass: #B8935A;
  --ovelo-ink: #0E0A08;
  --ease-luxury: cubic-bezier(0.22, 1, 0.36, 1);
}

body {
  background-color: var(--ovelo-cream);
  color: var(--ovelo-espresso);
  font-family: 'Manrope', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.font-serif {
  font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
}

/* Hairline brass rules */
.hairline-brass {
  border-color: rgba(184, 147, 90, 0.25);
}

/* Subtle link underline on hover */
.hover-gold-underline {
  position: relative;
  display: inline-block;
}
.hover-gold-underline::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: var(--ovelo-brass);
  transform-origin: bottom right;
  transition: transform 0.3s var(--ease-luxury);
}
.hover-gold-underline:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}`
  },
  {
    filename: 'assets/ovelo.js',
    category: 'Asset',
    description: 'AJAX Cart management, bundle multi-add automation, and countdown clock',
    code: `// Ovelo Shopify Storefront AJAX Engine
document.addEventListener('DOMContentLoaded', () => {
  // 1. AJAX Cart Drawer Open / Close
  const drawer = document.getElementById('ovelo-cart-drawer');
  const backdrop = document.getElementById('ovelo-cart-backdrop');
  const panel = document.getElementById('ovelo-cart-panel');
  const closeBtn = document.getElementById('ovelo-close-cart');

  function openCart() {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.add('opacity-100');
    panel.classList.remove('translate-x-full');
    fetchCart();
  }

  function closeCart() {
    drawer.classList.add('opacity-0', 'pointer-events-none');
    drawer.classList.remove('opacity-100');
    panel.classList.add('translate-x-full');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (backdrop) backdrop.addEventListener('click', closeCart);

  // 2. Fetch and Render Cart
  async function fetchCart() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      renderCart(cart);
    } catch (e) {
      console.error('Error fetching cart:', e);
    }
  }

  function renderCart(cart) {
    const itemsContainer = document.getElementById('ovelo-cart-items');
    const countEl = document.getElementById('ovelo-drawer-count');
    const subtotalEl = document.getElementById('ovelo-drawer-subtotal');
    const shippingBar = document.getElementById('free-shipping-bar');
    const shippingText = document.getElementById('free-shipping-remaining');

    if (countEl) countEl.innerText = \`(\${cart.item_count})\`;
    if (subtotalEl) subtotalEl.innerText = \`Rs. \${(cart.total_price / 100).toLocaleString()}\`;

    // Free delivery calculation (Rs. 6,000 threshold)
    const threshold = 600000; // in cents
    const percent = Math.min(100, (cart.total_price / threshold) * 100);
    if (shippingBar) shippingBar.style.width = \`\${percent}%\`;
    if (shippingText) {
      if (cart.total_price >= threshold) {
        shippingText.innerText = 'You qualify for Free Nationwide Delivery';
      } else {
        const remaining = (threshold - cart.total_price) / 100;
        shippingText.innerText = \`Rs. \${remaining.toLocaleString()} away\`;
      }
    }
  }

  // 3. Multi-item Bundle Add to Cart (/cart/add.js)
  const addSetBtn = document.getElementById('add-ovelo-set-btn');
  if (addSetBtn) {
    addSetBtn.addEventListener('click', async () => {
      // Bag + Wallet + Shoes variant IDs
      const payload = {
        items: [
          { id: window.OVELO_BAG_VARIANT_ID, quantity: 1 },
          { id: window.OVELO_WALLET_VARIANT_ID, quantity: 1 },
          { id: window.OVELO_SHOES_VARIANT_ID, quantity: 1 }
        ]
      };
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      openCart();
    });
  }
});`
  },
  {
    filename: 'SETUP-GUIDE.md',
    category: 'Documentation',
    description: 'Shopify Admin setup guide for bundle discounts, apps, and live store linking',
    code: `# Ovelo Shopify Storefront Setup Guide

## 1. Connecting Live Store Preview
- **Live Preview URL**: \`https://no5e827smb2hm24p-77128073414.shopifypreview.com/\`
- Upload the sections and snippets via Shopify Admin > Online Store > Themes > Edit Code.

## 2. Setting Up "The Ovelo Set" Automatic Bundle Discount (10% Off)
1. In Shopify Admin, navigate to **Discounts** > **Create discount**.
2. Select **Automatic discount**.
3. Title: \`The Ovelo Set - 10% Bundle Discount\`.
4. Type: **Percentage (10%)**.
5. Applies to: **Specific products** -> Select \`Ovelo Classic Leather Bag\`, \`Ovelo Classic Leather Wallet\`, and \`Ovelo Shoes\`.
6. Minimum requirement: **Minimum quantity of items = 3**.
7. Save. When customers click "Add the Set to Bag", all three are added and 10% is deducted at checkout automatically!

## 3. Recommended Shopify Apps for Production
- **Product Reviews**: Judge.me Product Reviews (Clean serif styling, photo upload, zero impact on page speed).
- **Cart & Upsell**: Rebuy Smart Cart or In-Cart Upsell.
- **Cash on Delivery (Pakistan)**: ReCharge / COD Confirmation SMS & OTP verification app.
- **Analytics**: Google Analytics 4 (GA4) with Shopify Native Enhanced E-commerce Integration.`
  }
];

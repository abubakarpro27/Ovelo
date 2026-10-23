import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CheckoutDetails } from '../types/store';

export const FastCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    qualifiesFreeShipping,
    completeCheckout,
    orderNote,
    giftNote,
    isGiftBox,
    formatPrice
  } = useStore();

  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    city: 'Lahore',
    address: '',
    postalCode: '',
    paymentMethod: 'cod',
    orderNotes: orderNote,
    giftNote: giftNote,
    isGiftBox: isGiftBox
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const [walletPhone, setWalletPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingFee = qualifiesFreeShipping ? 0 : 250;
  const grandTotal = cartTotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      completeCheckout(formData);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#F4ECDD] text-[#2B1A12] shadow-2xl border border-[#B8935A]/40 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#B8935A]/30 flex items-center justify-between bg-[#F4ECDD] shrink-0">
          <div className="flex items-center gap-2">
            <Lock size={15} className="text-[#8B4A22]" />
            <h2 className="font-serif text-xl sm:text-2xl text-[#2B1A12]">
              Ovelo Express Checkout
            </h2>
            <span className="text-[10px] uppercase tracking-wider text-[#8B4A22] font-mono bg-[#E6D8C3] px-2 py-0.5 ml-2">
              256-Bit SSL Encrypted
            </span>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1 text-[#2B1A12]/60 hover:text-[#2B1A12] cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form & Summary Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer & Delivery Details */}
          <form id="checkout-form" onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Contact Information */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-semibold block">
                01. Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Rehman"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium mb-1">
                    Mobile Phone (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="space-y-3 pt-3 border-t border-[#B8935A]/20">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-semibold block">
                02. Shipping Address
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-medium mb-1">
                    Street Address & Suite / House # *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House 42, Street 7, Sector F-6/3"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium mb-1">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Multan">Multan</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other Nationwide City</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 54000"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#B8935A]/35 text-xs text-[#2B1A12] focus:outline-none focus:border-[#8B4A22]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="space-y-3 pt-3 border-t border-[#B8935A]/20">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8B4A22] font-semibold block">
                03. Secure Payment Gateway
              </span>

              <div className="space-y-2">
                {/* Cash on Delivery (COD) */}
                <label className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#8B4A22] bg-[#E6D8C3]/50 ring-1 ring-[#8B4A22]'
                    : 'border-[#B8935A]/30 bg-white/70 hover:bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-0.5 accent-[#8B4A22]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-[#2B1A12] flex items-center gap-1.5">
                        <Banknote size={14} className="text-[#8B4A22]" />
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2B1A12]/75 font-light mt-0.5">
                      Pay cash upon doorstep delivery after inspecting package seal.
                    </p>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#8B4A22] bg-[#E6D8C3]/50 ring-1 ring-[#8B4A22]'
                    : 'border-[#B8935A]/30 bg-white/70 hover:bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="mt-0.5 accent-[#8B4A22]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-[#2B1A12] flex items-center gap-1.5">
                        <CreditCard size={14} className="text-[#8B4A22]" />
                        Credit / Debit Card (Visa, Mastercard, PayPak)
                      </span>
                      <span className="text-[10px] text-[#2B1A12]/60">Instant</span>
                    </div>
                    {formData.paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-[#B8935A]/20 grid grid-cols-2 gap-2 text-[11px]">
                        <div className="col-span-2">
                          <input
                            type="text"
                            placeholder="Card Number (4000 1234 5678 9010)"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            className="w-full p-2 bg-white border border-[#B8935A]/35 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full p-2 bg-white border border-[#B8935A]/35 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="CVC / CVV"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            className="w-full p-2 bg-white border border-[#B8935A]/35 text-xs font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* EasyPaisa / JazzCash */}
                <label className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'easypaisa'
                    ? 'border-[#8B4A22] bg-[#E6D8C3]/50 ring-1 ring-[#8B4A22]'
                    : 'border-[#B8935A]/30 bg-white/70 hover:bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="easypaisa"
                    checked={formData.paymentMethod === 'easypaisa'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                    className="mt-0.5 accent-[#8B4A22]"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-xs text-[#2B1A12] flex items-center gap-1.5">
                      <Smartphone size={14} className="text-[#8B4A22]" />
                      EasyPaisa / JazzCash Mobile Account
                    </span>
                    {formData.paymentMethod === 'easypaisa' && (
                      <div className="mt-2">
                        <input
                          type="tel"
                          placeholder="Enter EasyPaisa / JazzCash Account Number"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          className="w-full p-2 bg-white border border-[#B8935A]/35 text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

          </form>

          {/* Right Column: Order Summary & Execution */}
          <div className="lg:col-span-5 bg-[#E6D8C3]/60 p-6 border border-[#B8935A]/30 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#2B1A12] border-b border-[#B8935A]/25 pb-2">
                Order Review ({cart.length} items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.title}
                      className="w-10 h-10 object-cover bg-white border border-[#B8935A]/20"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block truncate text-[#2B1A12]">
                        {item.product.title}
                      </span>
                      <span className="text-[#2B1A12]/60 text-[11px]">
                        Qty: {item.quantity} {item.selectedSize ? `· Size ${item.selectedSize}` : ''}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-medium tabular-nums">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gift & Special Notes */}
              {(formData.orderNotes || formData.giftNote) && (
                <div className="p-3 bg-[#F4ECDD] border border-[#B8935A]/25 text-[11px] space-y-1">
                  {formData.giftNote && (
                    <p><strong>Gift Inscription:</strong> “{formData.giftNote}”</p>
                  )}
                  {formData.orderNotes && (
                    <p><strong>Courier Note:</strong> {formData.orderNotes}</p>
                  )}
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs border-t border-[#B8935A]/25 pt-3">
                <div className="flex justify-between text-[#2B1A12]/75">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#8B4A22] font-medium">
                    <span>Discount Privilege</span>
                    <span className="font-mono tabular-nums">- {formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#2B1A12]/75">
                  <span>Insured Express Courier</span>
                  <span className="font-mono tabular-nums">
                    {qualifiesFreeShipping ? (
                      <span className="text-emerald-700 font-semibold">FREE (Over Rs. 6,000)</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#B8935A]/30 flex justify-between items-baseline font-serif text-xl font-bold text-[#2B1A12]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-3">
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] font-semibold text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order & Generating Dispatch...</span>
                ) : (
                  <span>Place Order · {formatPrice(grandTotal)}</span>
                )}
              </button>

              <div className="space-y-1 text-center text-[10px] text-[#2B1A12]/60">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck size={12} className="text-[#8B4A22]" />
                  <span>Guaranteed authentic handcrafted leather pieces</span>
                </p>
                <p>Doorstep inspection permitted upon courier arrival</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

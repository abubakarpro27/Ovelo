import React from 'react';
import { CheckCircle, Package, Truck, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastOrder, closeOrderConfirmation, formatPrice } = useStore();

  if (!lastOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#F4ECDD] text-[#2B1A12] shadow-2xl border border-[#B8935A]/50 p-6 sm:p-10 my-auto space-y-6">
        
        {/* Top Status */}
        <div className="text-center space-y-3 pb-6 border-b border-[#B8935A]/25">
          <div className="w-14 h-14 bg-[#2B1A12] text-[#B8935A] rounded-full mx-auto flex items-center justify-center border border-[#B8935A]/40 shadow-inner">
            <CheckCircle size={28} />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B4A22] font-semibold block">
            ORDER CONFIRMED & DISPATCH PENDING
          </span>

          <h2 className="text-3xl font-serif text-[#2B1A12]">
            Thank You, {lastOrder.customer.fullName}
          </h2>

          <p className="text-xs text-[#2B1A12]/80 font-light max-w-md mx-auto">
            Your order has been registered into our bespoke dispatch registry. We will send SMS notifications with live courier milestones.
          </p>
        </div>

        {/* Tracking & Milestone Banner */}
        <div className="p-4 bg-[#E6D8C3]/70 border border-[#B8935A]/35 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#2B1A12]/60 font-semibold block">
              Order Reference
            </span>
            <span className="font-mono text-sm font-bold text-[#8B4A22]">
              {lastOrder.orderNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-[#2B1A12]/60 font-semibold block">
              Tracking Number
            </span>
            <span className="font-mono text-sm text-[#2B1A12]">
              {lastOrder.trackingNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-[#2B1A12]/60 font-semibold block">
              Estimated Delivery
            </span>
            <span className="text-xs font-medium text-[#2B1A12]">
              2–4 Business Days
            </span>
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8B4A22]">
            Summary of Dispatched Items
          </h3>

          <div className="divide-y divide-[#B8935A]/20 border border-[#B8935A]/30 bg-white/70">
            {lastOrder.items.map((item) => (
              <div key={item.id} className="p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.title}
                    className="w-10 h-10 object-cover bg-[#E6D8C3]"
                  />
                  <div>
                    <span className="font-serif font-semibold text-[#2B1A12] block">
                      {item.product.title}
                    </span>
                    <span className="text-[11px] text-[#2B1A12]/60 font-mono">
                      Qty: {item.quantity} {item.selectedSize ? `· Size ${item.selectedSize}` : ''}
                    </span>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-medium text-[#2B1A12]">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div className="p-4 bg-[#E6D8C3]/50 border border-[#B8935A]/25 space-y-1.5 text-xs">
            <div className="flex justify-between text-[#2B1A12]/75">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">{formatPrice(lastOrder.subtotal)}</span>
            </div>
            {lastOrder.discount > 0 && (
              <div className="flex justify-between text-[#8B4A22] font-medium">
                <span>Discount Privilege Applied</span>
                <span className="font-mono tabular-nums">- {formatPrice(lastOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#2B1A12]/75">
              <span>Insured Courier Dispatch</span>
              <span className="font-mono tabular-nums">
                {lastOrder.shipping === 0 ? 'FREE' : formatPrice(lastOrder.shipping)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#B8935A]/30 flex justify-between items-baseline font-serif text-lg font-bold text-[#2B1A12]">
              <span>Grand Total</span>
              <span className="tabular-nums">{formatPrice(lastOrder.total)}</span>
            </div>
          </div>
        </div>

        {/* Destination & Payment Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#2B1A12]/80">
          <div className="p-3.5 bg-white/60 border border-[#B8935A]/25">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B4A22] block mb-1">
              Delivery Address
            </span>
            <p className="font-medium text-[#2B1A12]">{lastOrder.customer.fullName}</p>
            <p>{lastOrder.customer.address}</p>
            <p>{lastOrder.customer.city}, {lastOrder.customer.postalCode || 'Pakistan'}</p>
            <p className="font-mono text-[11px] mt-1">{lastOrder.customer.phone}</p>
          </div>

          <div className="p-3.5 bg-white/60 border border-[#B8935A]/25">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B4A22] block mb-1">
              Payment Terms
            </span>
            <p className="font-medium text-[#2B1A12] uppercase tracking-wider text-[11px]">
              {lastOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card'}
            </p>
            <p className="text-[11px] text-[#2B1A12]/70 font-light mt-1">
              {lastOrder.customer.paymentMethod === 'cod'
                ? `Please keep exact amount of ${formatPrice(lastOrder.total)} ready upon delivery.`
                : 'Payment processed and verified under 256-bit encryption.'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 border border-[#B8935A]/40 hover:bg-black/5 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer size={14} />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={closeOrderConfirmation}
            className="w-full sm:w-auto px-8 py-3 bg-[#2B1A12] hover:bg-[#8B4A22] text-[#F4ECDD] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Return to Storefront</span>
            <ArrowRight size={14} className="text-[#B8935A]" />
          </button>
        </div>

      </div>
    </div>
  );
};

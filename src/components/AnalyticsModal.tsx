import React from 'react';
import { X, Sparkles, Activity, Eye, ShoppingCart, CreditCard, CheckCircle, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnalyticsModal: React.FC = () => {
  const { isAnalyticsOpen, closeAnalytics, analyticsEvents, formatPrice } = useStore();

  if (!isAnalyticsOpen) return null;

  // Aggregate metrics
  const pageViews = analyticsEvents.filter(e => e.eventName === 'page_view').length;
  const itemViews = analyticsEvents.filter(e => e.eventName === 'view_item').length;
  const addToCarts = analyticsEvents.filter(e => e.eventName === 'add_to_cart').length;
  const bundleAdds = analyticsEvents.filter(e => e.eventName === 'apply_bundle').length;
  const checkouts = analyticsEvents.filter(e => e.eventName === 'begin_checkout').length;
  const purchases = analyticsEvents.filter(e => e.eventName === 'purchase').length;

  const totalRevenue = analyticsEvents
    .filter(e => e.eventName === 'purchase')
    .reduce((sum, e) => sum + (e.parameters?.value || 0), 0);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analyticsEvents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ovelo_analytics_stream_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#0E0A08] text-[#F4ECDD] shadow-2xl border border-[#B8935A]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#B8935A]/30 flex items-center justify-between bg-[#1A120D] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2B1A12] border border-[#B8935A]/30 text-[#B8935A]">
              <Activity size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl text-[#F4ECDD]">
                  Customer Insights & E-Commerce Event Telemetry
                </h3>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800 uppercase tracking-widest font-mono">
                  Live Stream
                </span>
              </div>
              <p className="text-xs text-[#E6D8C3]/70 font-light mt-0.5">
                Real-time user engagement tracking across product views, bundle conversions, and payment flows.
              </p>
            </div>
          </div>

          <button
            onClick={closeAnalytics}
            className="p-1.5 text-[#F4ECDD]/60 hover:text-[#F4ECDD] cursor-pointer"
            aria-label="Close analytics"
          >
            <X size={20} />
          </button>
        </div>

        {/* Funnel Metrics Grid */}
        <div className="p-6 bg-[#140E0A] border-b border-[#B8935A]/25 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-[#0E0A08] border border-[#B8935A]/20">
            <span className="text-[10px] uppercase text-[#E6D8C3]/60 font-semibold block">Store Views</span>
            <span className="font-mono text-xl font-bold text-[#F4ECDD] tabular-nums">{pageViews}</span>
          </div>

          <div className="p-3 bg-[#0E0A08] border border-[#B8935A]/20">
            <span className="text-[10px] uppercase text-[#E6D8C3]/60 font-semibold block">PDP Views</span>
            <span className="font-mono text-xl font-bold text-[#B8935A] tabular-nums">{itemViews}</span>
          </div>

          <div className="p-3 bg-[#0E0A08] border border-[#B8935A]/20">
            <span className="text-[10px] uppercase text-[#E6D8C3]/60 font-semibold block">Add to Bag</span>
            <span className="font-mono text-xl font-bold text-[#F4ECDD] tabular-nums">{addToCarts}</span>
          </div>

          <div className="p-3 bg-[#0E0A08] border border-[#B8935A]/20">
            <span className="text-[10px] uppercase text-[#E6D8C3]/60 font-semibold block">The Set Adds</span>
            <span className="font-mono text-xl font-bold text-[#B8935A] tabular-nums">{bundleAdds}</span>
          </div>

          <div className="p-3 bg-[#0E0A08] border border-[#B8935A]/20">
            <span className="text-[10px] uppercase text-[#E6D8C3]/60 font-semibold block">Checkouts</span>
            <span className="font-mono text-xl font-bold text-[#F4ECDD] tabular-nums">{checkouts}</span>
          </div>

          <div className="p-3 bg-[#0E0A08] border border-[#B8935A]/20">
            <span className="text-[10px] uppercase text-[#E6D8C3]/60 font-semibold block">Revenue</span>
            <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
              {formatPrice(totalRevenue)}
            </span>
          </div>
        </div>

        {/* Live Event Stream Table */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#B8935A]">
              Real-Time Event Stream ({analyticsEvents.length} Captured)
            </span>
            <button
              onClick={handleExportJSON}
              className="text-xs text-[#E6D8C3]/75 hover:text-[#B8935A] flex items-center gap-1.5 cursor-pointer underline"
            >
              <Download size={12} />
              <span>Export Raw JSON</span>
            </button>
          </div>

          <div className="border border-[#B8935A]/25 divide-y divide-[#B8935A]/15 bg-[#0A0706] font-mono text-xs">
            {analyticsEvents.map((evt) => (
              <div key={evt.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#1A120D]">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#E6D8C3]/40 tabular-nums">
                    {evt.timestamp}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                    evt.eventName === 'purchase'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : evt.eventName === 'add_to_cart' || evt.eventName === 'apply_bundle'
                      ? 'bg-[#B8935A]/20 text-[#B8935A] border border-[#B8935A]/40'
                      : evt.eventName === 'begin_checkout'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-black/50 text-[#E6D8C3]/70'
                  }`}>
                    {evt.eventName}
                  </span>
                </div>

                <div className="text-[11px] text-[#E6D8C3]/80 truncate max-w-md font-sans">
                  {evt.parameters?.item_name && <span>{evt.parameters.item_name} · </span>}
                  {evt.parameters?.value && <span className="font-semibold text-emerald-400">Rs. {evt.parameters.value.toLocaleString()} · </span>}
                  {evt.parameters?.bundle_name && <span>{evt.parameters.bundle_name} · </span>}
                  {evt.parameters?.page_title && <span>{evt.parameters.page_title} · </span>}
                  <span className="text-[#E6D8C3]/50">{JSON.stringify(evt.parameters)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#140E0A] border-t border-[#B8935A]/25 flex items-center justify-between text-xs text-[#E6D8C3]/60">
          <span>Ovelo Enhanced E-Commerce Data Layer</span>
          <button onClick={closeAnalytics} className="hover:text-[#F4ECDD] underline cursor-pointer">
            Close Console
          </button>
        </div>

      </div>
    </div>
  );
};

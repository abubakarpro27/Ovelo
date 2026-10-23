import React from 'react';
import { Sparkles, Maximize2, ShieldCheck, Compass } from 'lucide-react';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Premium Look & Feel',
    description: 'Supple full-grain leather and tactile camel micro-suede that develop rich patina over years.'
  },
  {
    icon: Maximize2,
    title: 'Spacious & Functional',
    description: 'Dedicated 15.6" padded laptop protection, passport slips, and engineered ultra-slim profiles.'
  },
  {
    icon: ShieldCheck,
    title: 'Durable Craftsmanship',
    description: 'Heavy gauge contrast saddle-stitching, solid brass hardware, and vulcanized rubber outsoles.'
  },
  {
    icon: Compass,
    title: 'Timeless Design',
    description: 'Quiet, logo-restrained elegance designed for the boardroom, airport lounges, and weekends.'
  }
];

export const FourPillarStrip: React.FC = () => {
  return (
    <section className="bg-[#E6D8C3]/60 border-y border-[#B8935A]/25 py-12 px-6 lg:px-12 text-[#2B1A12]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-start space-y-3 group"
            >
              <div className="p-2.5 bg-[#F4ECDD] border border-[#B8935A]/30 text-[#8B4A22] transition-colors group-hover:border-[#B8935A] group-hover:text-[#B8935A]">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-[#2B1A12] font-semibold tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#2B1A12]/80 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

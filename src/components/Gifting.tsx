import React, { useState } from 'react';
import { Gift, Copy, Check, Smartphone } from 'lucide-react';

export default function Gifting() {
  const [copied, setCopied] = useState(false);
  const mpesaNumber = '+254 718 289127';

  const handleCopy = () => {
    navigator.clipboard.writeText(mpesaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative max-w-xl mx-auto py-8 px-4 font-sans">
      {/* Floating Decorative Icon Badge at the Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 rounded-full bg-white border border-brand-gold-200 shadow-md flex items-center justify-center text-brand-gold-600">
          <Gift className="w-6 h-6 stroke-1.2" />
        </div>
      </div>

      {/* Main Wedding Gifts Card */}
      <div className="bg-white/60 backdrop-blur-md border border-brand-gold-200/40 rounded-[2rem] pt-12 pb-10 px-6 sm:px-10 text-center shadow-lg relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold-100/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blush-100/30 rounded-full blur-3xl pointer-events-none" />

        <h3 className="font-serif text-3xl sm:text-4xl text-stone-800 tracking-wide font-light mb-6">
          Wedding Gifts
        </h3>

        {/* Elegant Quote */}
        <p className="font-serif italic text-base sm:text-lg text-stone-600 leading-relaxed max-w-md mx-auto mb-8 px-2">
          "Your presence is our greatest gift. However, if you wish to appreciate us, please consider an enveloped gift or an electronic transfer."
        </p>

        {/* Electronic Transfer Header */}
        <div className="flex items-center justify-center gap-2 mb-4 text-stone-400">
          <Smartphone className="w-4 h-4 text-brand-gold-500/80" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] font-sans">
            Electronic Transfer
          </span>
        </div>

        {/* Dashed Border Transfer Box */}
        <div className="border border-dashed border-brand-gold-300/60 bg-white/40 rounded-2xl p-6 max-w-sm mx-auto mb-8 relative group hover:border-brand-gold-500/50 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">M-Pesa Number</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-base sm:text-lg text-stone-800 font-semibold tracking-wider">
                Vivian: 0718 289127
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-stone-100 text-stone-400 hover:text-brand-gold-600 transition-all cursor-pointer"
                title="Copy Number"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-[9px] text-emerald-600 font-medium animate-pulse mt-0.5">
                Copied to clipboard!
              </span>
            )}
          </div>
        </div>

        {/* Gratitude Footer text */}
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold-600/80">
          With Heartfelt Gratitude!
        </div>
      </div>
    </div>
  );
}

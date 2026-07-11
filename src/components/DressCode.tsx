import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DressCode() {
  const colors = [
    { name: 'Blush Pink', hex: '#E8C5C8' },
    { name: 'Swaying Sage', hex: '#C2CAB8' },
    { name: 'Dusty Lavender', hex: '#D0C0D4' },
    { name: 'Cream Champagne', hex: '#EDE5D3' },
    { name: 'Powder Peach', hex: '#ECCFBE' },
  ];

  return (
    <div className="bg-white/45 backdrop-blur-sm border border-brand-gold-200/40 rounded-2xl p-6 md:p-8 shadow-sm max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl text-stone-800 tracking-wide font-light">
          Dress Code
        </h3>
        <p className="font-cursive text-xl text-brand-gold-500 mt-1">
          Classy Floral Pastels
        </p>
        <p className="text-xs text-stone-500 mt-3 max-w-md mx-auto font-sans leading-relaxed">
          We kindly invite our guests to dress in elegant floral patterns and soft pastel tones to harmonize with our beachfront scenery.
        </p>
      </div>

      {/* simplified, beautiful color palette layout */}
      <div className="grid grid-cols-5 gap-3 max-w-md mx-auto mb-6">
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-inner border border-stone-200/40"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-[9px] md:text-xs font-sans tracking-wide text-stone-600 text-center font-medium leading-none">
              {color.name}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-gold-100/40 pt-4 text-center">
        <p className="text-xs text-stone-600 max-w-md mx-auto font-sans leading-relaxed">
          <strong>Attire Suggestion:</strong> Flowing pastel maxi dresses, floral prints, light linen suits, sand-colored trousers, or soft pastel collar shirts are perfect for the beachside weather.
        </p>
      </div>

      <div className="flex items-center gap-2 justify-center mt-4 text-[10px] text-brand-gold-600 font-sans italic font-light">
        <Sparkles className="w-3.5 h-3.5" /> Floral prints are highly encouraged!
      </div>
    </div>
  );
}

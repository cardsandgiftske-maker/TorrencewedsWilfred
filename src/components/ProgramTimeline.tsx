/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Clock, 
  BookOpen, 
  Heart, 
  GlassWater, 
  Sparkles, 
  Compass, 
  UtensilsCrossed, 
  Mic, 
  Gift, 
  Cake, 
  Music, 
  Info,
  CalendarCheck
} from 'lucide-react';

export default function ProgramTimeline() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  // High-fidelity details matching the attached photo
  const ceremonyEvents = [
    {
      id: "arrival",
      time: "10:30 a.m.",
      title: "Arrival & Seating",
      icon: Clock,
      description: "Doors open early from 6:00 A.M., and guests are warmly welcomed to be seated by 10:30 A.M. Prelude music will guide your seating under the refreshing breezes of Naiposha Gardens."
    },
    {
      id: "officiant",
      time: "Officiant",
      title: "Hope Church Lavington",
      icon: BookOpen,
      description: "Our reverend guest structures the service, opening prayer, and words of blessings for our lifelong covenant."
    },
    {
      id: "vows",
      time: "Exchange",
      title: "Exchange of Vows",
      icon: Heart,
      description: "Torrence & Wilfred declare their endless promises, rings exchange, and seal with a precious kiss."
    }
  ];

  const receptionEvents = [
    {
      id: "drinks",
      title: "Arrival & Welcome Drinks",
      icon: GlassWater,
      description: "Refreshing cold drinks and light Hors d'oeuvres following the formal vows photoshoot. Mingle among the greens."
    },
    {
      id: "entrance",
      title: "Grand Entrance",
      icon: Sparkles,
      description: "Welcoming the newly weds! Torrence & Wilfred enter with high energy, dancing, and songs of triumph."
    },
    {
      id: "prayer",
      title: "Opening Prayer",
      icon: Compass, // Stands in elegantly for hands/compass mapping
      description: "A short thanksgiving blessing to sanctify the wedding reception meal and celebrate companionship."
    },
    {
      id: "dining",
      title: "Lunch & Dining",
      icon: UtensilsCrossed,
      description: "A gourmet buffet featuring fresh, organically sourced local Kenyan cuisines, Tigoni tea accents, and desserts."
    },
    {
      id: "speeches",
      title: "Toasts & Speeches",
      icon: Mic,
      description: "Heartwarming, hilarious, and emotional words shared by the parents, Maid of Honor, Best Man, and the couple."
    },
    {
      id: "gifts",
      title: "Presentation of Gifts",
      icon: Gift,
      description: "A delicate moment of envelope blessings, gratitude tokens and speeches to support the couples' embarking milestone."
    },
    {
      id: "cake",
      title: "Cake Cutting",
      icon: Cake,
      description: "The sweet centerpiece cake is shared among Torrence, Wilfred, and the families. Sweets for a sweet marriage!"
    },
    {
      id: "dance",
      title: "Open Dance Floor",
      icon: Music,
      description: "Let the celebrations begin! The DJ queues up the best beats; guests are invited to dance till the quiet dusk of Tigoni."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4 font-sans">
      
      {/* Container simulating a high-quality physical program card */}
      <div className="relative bg-[#FAF8F5] border-2 border-[#E9ECE0] rounded-3xl shadow-xl overflow-hidden p-6 md:p-12 border-t-8 border-t-sage-500">
        
        {/* Breathtaking luxury botanical absolute background highlights */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-25 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 0 C40 10, 10 50, 0 80" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 0 C15 35, 35 15, 60 0" stroke="#8F9779" strokeWidth="1" />
            {/* Delicate flower petals */}
            <circle cx="20" cy="20" r="8" fill="#FAF9F6" stroke="#DEC186" strokeWidth="0.75" />
            <circle cx="20" cy="20" r="2.5" fill="#DEC186" />
            <circle cx="45" cy="12" r="6" fill="#F4EBD6" stroke="#C5A059" strokeWidth="0.5" />
            <circle cx="45" cy="12" r="1.5" fill="#C5A059" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-25 pointer-events-none rotate-180">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 0 C40 10, 10 50, 0 80" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 0 C15 35, 35 15, 60 0" stroke="#8F9779" strokeWidth="1" />
            {/* Delicate flower petals */}
            <circle cx="20" cy="20" r="8" fill="#FAF9F6" stroke="#DEC186" strokeWidth="0.75" />
            <circle cx="20" cy="20" r="2.5" fill="#DEC186" />
            <circle cx="45" cy="12" r="6" fill="#F4EBD6" stroke="#C5A059" strokeWidth="0.5" />
            <circle cx="45" cy="12" r="1.5" fill="#C5A059" />
          </svg>
        </div>

        {/* Top Centered Program Monogram Logo - Exactly matching photos */}
        <div className="text-center flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full border border-double border-[#C5A059] flex items-center justify-center relative mb-4">
            <div className="absolute inset-[3px] rounded-full border border-[#C5A059]/40" />
            
            {/* Elegant Monogram Branches sketch & initial */}
            <span className="font-serif text-xl tracking-widest text-[#4A4F3F] font-bold select-none flex items-center">
              T <span className="text-[#C5A059] font-light mx-1 text-xs">|</span> W
            </span>

            {/* Subtle laurel branch motif */}
            <div className="absolute -bottom-1 text-[11px] text-[#C5A059] animate-pulse">🌿</div>
          </div>
          
          <h2 className="font-serif text-[#4A4F3F] text-2xl md:text-4xl tracking-[0.15em] font-medium uppercase mb-1">
            WEDDING
          </h2>
          <h3 className="font-script text-4xl md:text-5xl text-[#C5A059] italic mt-1 font-bold">
            Program
          </h3>
          
          <div className="flex items-center gap-1.5 mt-4">
            <span className="w-6 h-[1px] bg-sage-400 opacity-60" />
            <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
            <span className="w-6 h-[1px] bg-sage-400 opacity-60" />
          </div>
        </div>

        {/* Informative Hint */}
        <p className="text-center text-xs text-sage-600/70 font-sans tracking-wide italic mb-8">
          Click on any event stage to explore beautiful celebration details
        </p>

        {/* Two-Column Grid Setup with divider line */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Vertical gold center divider on desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#C5A059]/20 via-[#C5A059]/40 to-[#C5A059]/20">
            <div className="sticky top-1/2 w-7 h-7 -left-[14px] rounded-full bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center p-1.5 shadow-sm">
              <Heart className="w-full h-full fill-[#C5A059] text-[#C5A059]" />
            </div>
          </div>

          {/* ================= LEFT COLUMN: CEREMONY ================= */}
          <div className="flex flex-col items-center md:items-stretch">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mb-2">
                <Building className="w-5 h-5 text-sage-600" />
              </div>
              <h4 className="font-serif text-[#4A4F3F] text-lg uppercase tracking-[0.2em] font-semibold">
                Ceremony
              </h4>
              <div className="mt-1 flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 fill-sage-400 text-sage-400" />
              </div>
            </div>

            <div className="space-y-6 flex flex-col items-center w-full">
              {ceremonyEvents.map((evt) => {
                const IconComp = evt.icon;
                const isSelected = activeSegment === evt.id;

                return (
                  <motion.div
                    key={evt.id}
                    layoutId={`program-card-${evt.id}`}
                    onClick={() => setActiveSegment(isSelected ? null : evt.id)}
                    className={`w-full max-w-sm rounded-[18px] p-5 border text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? 'bg-sage-100/50 border-sage-300 shadow-md ring-1 ring-sage-400/20' 
                        : 'bg-white/80 border-sage-100 hover:border-sage-200 hover:shadow-sm'
                    }`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ${
                        isSelected ? 'bg-sage-500 text-white' : 'bg-sage-50 text-sage-600'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      
                      <span className="font-serif font-bold text-xs uppercase tracking-[0.15em] text-[#C5A059] block">
                        {evt.time}
                      </span>
                      
                      <h5 className="font-serif text-[#4A4F3F] text-base font-semibold tracking-wide">
                        {evt.title}
                      </h5>

                      {isSelected && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-[#5D634E] leading-relaxed mt-2 pt-2 border-t border-sage-200/50"
                        >
                          {evt.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: RECEPTION ================= */}
          <div className="flex flex-col items-center md:items-stretch">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center mb-2">
                {/* Visual cheer representation */}
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h4 className="font-serif text-[#4A4F3F] text-lg uppercase tracking-[0.2em] font-semibold">
                Reception
              </h4>
              <div className="mt-1 flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 fill-[#C5A059] text-[#C5A059]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto">
              {receptionEvents.map((evt) => {
                const IconComp = evt.icon;
                const isSelected = activeSegment === evt.id;

                return (
                  <motion.div
                    key={evt.id}
                    layoutId={`program-card-${evt.id}`}
                    onClick={() => setActiveSegment(isSelected ? null : evt.id)}
                    className={`w-full rounded-[16px] p-4 border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? 'bg-[#EBF1ED]/80 border-sage-300 shadow-md' 
                        : 'bg-white/80 border-[#F4EBD6]/50 hover:border-[#D4AF37]/20 hover:shadow-sm'
                    }`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition duration-300 ${
                        isSelected ? 'bg-sage-600 text-white' : 'bg-[#FFFDF9] border border-champagne-200 text-[#C5A059]'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h5 className="font-serif text-[#4A4F3F] text-[14px] md:text-base font-semibold leading-snug">
                          {evt.title}
                        </h5>
                      </div>
                    </div>

                    {isSelected && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-[#5D634E] leading-relaxed mt-2.5 pt-2 border-t border-sage-200/50 text-left"
                      >
                        {evt.description}
                      </motion.p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Kindly Note Footer - exactly matching bottom panel details */}
        <div className="mt-12 pt-8 border-t border-[#DFDCCB] text-center max-w-sm mx-auto flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-sage-50 flex items-center justify-center border border-sage-100">
            <Info className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          
          <h5 className="font-serif text-xs uppercase tracking-[0.25em] text-[#4F5341] font-bold">
            Kindly Note
          </h5>
          
          <p className="text-sm font-medium text-[#4A4F3F] opacity-90 font-serif leading-relaxed">
            The celebration concludes at 6:00 p.m.
          </p>
          
          <p className="font-script text-2xl text-[#C5A059] italic text-shadow-sm font-semibold mt-1">
            We look forward to celebrating with you!
          </p>
        </div>

      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DigitalEnvelopeProps {
  onOpened: () => void;
}

export default function DigitalEnvelope({ onOpened }: DigitalEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  // Trigger opening sequence
  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Transition directly to the main wedding home page once doors have parted
    setTimeout(() => {
      onOpened();
    }, 1400);
  };

  return (
    <div className="relative min-h-screen w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#FDFBF7] via-[#FAF6ED] to-[#F5F2E9] font-sans selection:bg-sage-200 selection:text-[#4A4F3F] z-50">
      
      {/* Self-contained premium calligraphy and texture setups */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');
        
        .font-pinyon {
          font-family: 'Pinyon Script', cursive;
        }
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .plaster-texture {
          background-image: radial-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 0),
                            radial-gradient(rgba(0, 0, 0, 0.01) 1px, transparent 0);
          background-size: 12px 12px;
          background-position: 0 0, 6px 6px;
        }
        .cotton-texture {
          background-image: linear-gradient(rgba(93, 99, 78, 0.015) 1px, transparent 0),
                            linear-gradient(90deg, rgba(93, 99, 78, 0.015) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Decorative organic shadow elements inside the underlying canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vh] border border-[#C5A059]/15 rounded-[30px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84vw] h-[83vh] border-[0.5px] border-[#C5A059]/10 rounded-[28px]" />
      </div>

      {/* Glowing atmospheric background radial hints */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-radial from-[#8F9779]/15 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-radial from-[#C5A059]/15 to-transparent blur-[120px] rounded-full" />
      </div>

      {/* Luxury Golden dust particles floating in background */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => {
          const size = Math.random() * 3 + 2;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-[#DEC186] to-white opacity-40"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -90 - Math.random() * 80],
                x: [0, (Math.random() - 0.5) * 35],
                opacity: [0, 0.6, 0],
                scale: [0.7, 1.3, 0.5],
              }}
              transition={{
                duration: 7 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* ================= GATES: THE ELEVENTH-HOUR DOUBLE FLAP FLAPS ================= */}
      
      {/* TOP GATE (Sits in the upper 50% and opens UP) */}
      <motion.div
        id="gate_top"
        className="absolute top-0 left-0 w-full h-[50vh] origin-top z-40 bg-[#FAF7F0] shadow-[0_15px_30px_rgba(40,43,30,0.04)] select-none overflow-visible"
        animate={isOpening ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Paper visual characteristics and subtle linen linings */}
        <div className="absolute inset-0 cotton-texture opacity-25" />
        <div className="absolute inset-0 plaster-texture opacity-30" />
        
        {/* Gold Accent Double-Border Line near Top Screen Boundary */}
        <div className="absolute inset-x-8 top-8 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute inset-x-12 top-10 h-[0.5px] bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent" />

        {/* Monogram or text styling on the top flap face - Shifted up to clear the seal perfectly */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="font-montserrat text-[9px] tracking-[0.45em] text-[#C5A059] uppercase font-semibold leading-none mb-2">
            The Wedding Covenant of
          </p>
          <p className="font-playfair text-[20px] font-light text-[#4A4F3F] uppercase tracking-widest leading-none">
            Torrence & Wilfred
          </p>
        </div>

        {/* Wavy Scoop Organic Bottom Overlay SVG - Nesting Over the Bottom Gate */}
        <div className="absolute bottom-0 translate-y-[100%] left-0 w-full h-[40px] pointer-events-none">
          <svg 
            viewBox="0 0 1440 40" 
            preserveAspectRatio="none" 
            className="w-full h-full fill-[#FAF7F0] filter drop-shadow-[0_12px_15px_rgba(40,43,30,0.06)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant wavy curvature dipping in center to exactly 50vh + 40px */}
            <path d="M 0,0 L 1440,0 L 1440,0 C 1080,0 900,40 720,40 C 540,40 360,0 0,0 Z" />
            
            {/* Gold foil line matching luxury invitation stamps */}
            <path 
              d="M 0,-2 C 360,1 540,39 720,39 C 900,39 1080,1 1440,-2" 
              fill="none" 
              stroke="#C5A059" 
              strokeWidth="1.2" 
              opacity="0.35" 
            />
          </svg>
        </div>
      </motion.div>

      {/* BOTTOM GATE (Sits in the lower 50% and opens DOWN) */}
      <motion.div
        id="gate_bottom"
        className="absolute bottom-0 left-0 w-full h-[50vh] origin-bottom z-30 bg-[#FAF7F0] select-none overflow-visible"
        animate={isOpening ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Paper texture matching perfectly */}
        <div className="absolute inset-0 cotton-texture opacity-25" />
        <div className="absolute inset-0 plaster-texture opacity-30" />

        {/* Gold Border Line near Bottom Screen Boundary */}
        <div className="absolute inset-x-8 bottom-8 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute inset-x-12 bottom-10 h-[0.5px] bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent" />

        {/* Complementary Wavy Scoop Top Overlay SVG for perfect seal nesting */}
        <div className="absolute top-0 -translate-y-[100%] left-0 w-full h-[40px] pointer-events-none">
          <svg 
            viewBox="0 0 1440 40" 
            preserveAspectRatio="none" 
            className="w-full h-full fill-[#FAF7F0]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant wavy curve contour matching the top gate exactly */}
            <path d="M 0,40 L 0,0 C 360,0 540,40 720,40 C 900,40 1080,0 1440,0 L 1440,40 Z" />
          </svg>
        </div>
      </motion.div>

      {/* ================= ROYAL WAX SEAL MONOGRAM (Splits/Fades upon click) ================= */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            className="absolute z-50 pointer-events-auto flex flex-col items-center justify-center gap-4"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.1, opacity: 0, rotate: -25 }}
            transition={{ duration: 1.0, ease: [0.6, -0.28, 0.735, 0.045] }}
          >
            <motion.button
              id="wax_seal_button"
              className="relative w-24 h-24 rounded-full cursor-pointer focus:outline-none flex items-center justify-center select-none"
              style={{ 
                background: 'radial-gradient(circle at 35% 35%, #F0D18F 0%, #D4AF37 35%, #B38F24 70%, #70550B 100%)',
                boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.45), 0 12px 30px rgba(54,58,42,0.38)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleSealClick}
            >
              {/* Organic melted wax edge outlines matching photographic reference */}
              <div className="absolute inset-[-6px] rounded-[52%_48%_51%_49%_/_48%_52%_49%_51%] border-[5px] border-solid border-[#CFA935]/85 opacity-90 pointer-events-none transform rotate-12" />
              <div className="absolute inset-[-5px] rounded-[49%_51%_48%_52%_/_53%_47%_51%_49%] border-[4px] border-solid border-[#AE8E1F] opacity-75 pointer-events-none transform -rotate-45" />

              {/* Embossed inside border frame */}
              <div className="w-[83%] h-[83%] rounded-full border border-[#D5B048]/55 flex flex-col items-center justify-center shadow-inner pt-0.5">
                {/* Clean serif & script initials "TW" centered elegantly with soft shadow */}
                <span className="font-pinyon text-4xl font-normal text-[#FAF9F5] select-none text-shadow-md drop-shadow-[0_2px_4px_rgba(72,55,10,0.85)] block translate-y-[-2px] tracking-widest pl-1.5">
                  TW
                </span>
              </div>

              {/* Realistic glass sheen highlights across the wax curvature */}
              <div className="absolute top-[8px] left-[16px] w-[50px] h-[16px] bg-white/20 rounded-full blur-[1px] -rotate-12" />

              {/* Pulsing luxurious golden beacon guiding user hands */}
              <span className="absolute inset-0 rounded-full animate-ping bg-[#DEC186]/20 opacity-60 pointer-events-none duration-[2200ms]" />
            </motion.button>

            {/* Instruction directly under the seal button */}
            <p className="font-montserrat text-[10px] tracking-[0.3em] text-[#8F9779] font-semibold uppercase animate-pulse select-none pointer-events-none mt-1">
              Click the seal to open
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guidance Text aligned perfectly at base of device */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="absolute bottom-12 text-center z-25 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-montserrat text-[11px] tracking-[0.25em] text-[#C5A059] font-semibold animate-pulse uppercase">
              Revealing Celestine Site
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

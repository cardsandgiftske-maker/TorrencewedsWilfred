import React, { useState } from 'react';
import { motion } from 'motion/react';

interface EnvelopeProps {
  onOpen: () => void;
  waxSealUrl: string;
}

export default function Envelope({ onOpen, waxSealUrl }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = () => {
    if (isClicked) return;
    setIsClicked(true);
    setIsOpening(true);

    // After 1.5s, once the splitting animation is complete, transition to the minisite
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isOpening ? { opacity: [1, 1, 0] } : { opacity: 1 }}
      transition={{ duration: 1.5, times: [0, 0.8, 1], ease: "easeInOut" }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F5E5D9] via-[#FAF3ED] to-[#F5E5D9] p-4 sm:p-8 select-none overflow-hidden relative"
    >
      {/* Decorative background ambient circles matching the original aesthetic */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#FAF3ED]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FAF3ED]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-[420px] h-[720px] sm:h-[760px] rounded-[2.5rem] bg-transparent shadow-[0_25px_60px_rgba(139,115,85,0.18)] border border-brand-gold-200/20 overflow-hidden">
        
        {/* Top Flap Component */}
        <motion.div
          animate={isOpening ? { y: '-101%' } : { y: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#FAF8F5] z-10 origin-top"
          style={{ clipPath: 'url(#wave-top-clip)' }}
        >
          {/* Top Flap Content - Centered text in the upper half */}
          <div className="absolute inset-x-6 top-[30%] -translate-y-1/2 flex flex-col items-center justify-center text-center">
            <span className="text-brand-gold-600/90 uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold font-sans mb-3 block">
              THE WEDDING COVENANT OF
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-800 tracking-wider font-light uppercase">
              VIVIAN &amp; CHRIS
            </h1>
          </div>
        </motion.div>

        {/* Bottom Flap Component */}
        <motion.div
          animate={isOpening ? { y: '101%' } : { y: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#FAF8F5] z-10 origin-bottom"
          style={{ clipPath: 'url(#wave-bottom-clip)' }}
        >
          {/* "CLICK THE SEAL TO OPEN" text below the seal */}
          {!isClicked && (
            <div className="absolute left-[68%] top-[58%] -translate-x-1/2 text-center pointer-events-none select-none">
              <span className="text-[9px] sm:text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-medium animate-pulse block">
                CLICK THE SEAL TO OPEN
              </span>
            </div>
          )}

          {/* Footer details on the bottom flap */}
          <div className="absolute inset-x-6 bottom-10 text-center">
            <p className="text-[9px] sm:text-[10px] text-brand-gold-600/70 font-sans tracking-[0.25em] uppercase font-semibold">
              SEVERIN SEA LODGE • MOMBASA
            </p>
          </div>
        </motion.div>

        {/* Decorative realistic gold foil line overlay along the wave seam */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 0,52 C 8,52 18,56 32,56 C 45,56 55,50 68,49 C 78,48 85,50 100,51"
            fill="none"
            stroke="url(#gold-wave-gradient)"
            strokeWidth="0.25"
            opacity="0.65"
          />
          <defs>
            <linearGradient id="gold-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F3E5AB" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#AA7C11" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Realistic Wax Seal button positioned offset-right on the wave seam */}
        <motion.div
          onClick={handleOpen}
          className="absolute left-[68%] top-[49%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
          animate={isOpening ? {
            scale: [1, 1.2, 0],
            opacity: [1, 0.8, 0],
          } : {
            scale: [1, 1.03, 1],
          }}
          transition={isOpening ? {
            duration: 0.6,
            ease: "easeInOut",
          } : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1, rotate: 2 }}
        >
          <div className="relative group select-none">
            {/* Soft ambient golden aura */}
            <div className="absolute -inset-2 bg-brand-gold-500/20 rounded-full blur-md group-hover:bg-brand-gold-500/30 transition-all duration-300" />
            
            {/* Realistic gold wax seal image */}
            <img
              src={waxSealUrl}
              alt="Golden Wax Seal V&C"
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-[0_10px_25px_rgba(139,115,85,0.35)] relative border border-brand-gold-400/40"
            />
          </div>
        </motion.div>
      </div>

      {/* SVG Definitions for Wave Seam Clip Paths */}
      <svg className="absolute w-0 h-0 pointer-events-none" width="0" height="0">
        <defs>
          <clipPath id="wave-top-clip" clipPathUnits="objectBoundingPoints">
            <path d="M 0,0 L 1,0 L 1,0.51 C 0.85,0.50 0.78,0.48 0.68,0.49 C 0.55,0.50 0.45,0.56 0.32,0.56 C 0.18,0.56 0.08,0.52 0,0.52 Z" />
          </clipPath>
          <clipPath id="wave-bottom-clip" clipPathUnits="objectBoundingPoints">
            <path d="M 0,0.52 C 0.08,0.52 0.18,0.56 0.32,0.56 C 0.45,0.56 0.55,0.50 0.68,0.49 C 0.78,0.48 0.85,0.50 1,0.51 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

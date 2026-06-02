/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playWaxSealCrackHarp } from './AmbientHarp';
import { DETAILS } from '../types';

interface DigitalEnvelopeProps {
  onOpened: () => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
}

export default function DigitalEnvelope({ onOpened, isAudioEnabled, toggleAudio }: DigitalEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  // Trigger opening animation
  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play sparkling harp arpeggio!
    if (isAudioEnabled) {
      playWaxSealCrackHarp();
    }

    // Phase 1: Wax seal cracks and glows
    setTimeout(() => {
      setIsBroken(true);
    }, 600);

    // Phase 2: Top flap opens and letter slides out
    // Phase 3: Transition to main web portfolio after 3.2 seconds
    setTimeout(() => {
      onOpened();
    }, 2800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-radial from-[#FAF9F5] via-[#E4ECD5] to-[#B3BF93] px-4 font-sans selection:bg-sage-200">
      
      {/* Decorative leafy overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-48 h-48 bg-radial from-sage-500/20 to-transparent blur-2xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-radial from-champagne-300/20 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Floating elegant wedding petals/leaves in the background */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => {
          const size = Math.random() * 20 + 10;
          return (
            <motion.div
              key={i}
              className="absolute bg-sage-400/10 rounded-br-2xl rounded-tl-2xl border border-sage-500/5"
              style={{
                width: size,
                height: size * 1.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -10}%`,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: ["0px", `${(Math.random() - 0.5) * 150}px`],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          );
        })}
      </div>

      {/* Outer Envelope Wrapper */}
      <div className="relative w-full max-w-[580px] aspect-[4/3] flex items-center justify-center z-20">
        <AnimatePresence>
          {!isBroken ? (
            <motion.div 
              className="absolute text-center -top-16 left-0 right-0 pointer-events-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="font-serif text-[#4A4F3F] text-xs uppercase tracking-[0.25em] font-semibold opacity-75">
                The Royal Invitation
              </h1>
              <div className="w-12 h-[1px] bg-champagne-500 mx-auto mt-2 opacity-50" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          id="digital_envelope_container"
          className="relative w-full h-full bg-[#EAE5D9] paper-texture rounded-xl shadow-[0_25px_60px_-15px_rgba(101,107,83,0.35)] overflow-visible"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Inner lining / Card (slides out later) */}
          <motion.div
            id="letter_inside_envelope"
            className="absolute inset-x-4 top-4 h-[calc(100%-32px)] bg-[#FAF8F5] card-texture rounded-lg shadow-inner flex flex-col items-center justify-center p-8 border border-[#EBE6DC] overflow-hidden"
            animate={isOpening ? { y: -240, scale: 0.96, opacity: 0.8 } : { y: 0 }}
            transition={{ delay: 1.0, duration: 1.4, ease: "easeInOut" }}
          >
            {/* Top-Left Beautiful Elegant Floral Spray */}
            <div className="absolute top-0 left-0 w-24 h-24 opacity-85 select-none pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Sage Green Leaves */}
                <path d="M10 25 C15 15, 25 10, 35 15 C25 25, 15 25, 10 25 Z" fill="#8F9779" opacity="0.85" />
                <path d="M25 10 C32 2, 42 5, 45 15 C35 20, 28 18, 25 10 Z" fill="#7B8265" opacity="0.9" />
                <path d="M5 40 C12 35, 20 38, 22 46 C15 48, 8 45, 5 40 Z" fill="#A3B899" opacity="0.75" />
                {/* Champagne Gold stems */}
                <path d="M0 0 Q30 10, 50 45" stroke="#DEC186" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M0 0 Q15 35, 30 65" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" />
                {/* Ivory White Gold-Hearted Blooms */}
                <circle cx="20" cy="20" r="8" fill="#FAF9F6" stroke="#DEC186" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="#DEC186" />
                
                <circle cx="38" cy="18" r="6" fill="#FAF9F6" stroke="#E2CF97" strokeWidth="0.75" />
                <circle cx="38" cy="18" r="2" fill="#C5A059" />
              </svg>
            </div>

            {/* Bottom-Right Gorgeous Elegant Floral Spray */}
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-85 select-none pointer-events-none rotate-180">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Sage Green Leaves */}
                <path d="M10 25 C15 15, 25 10, 35 15 C25 25, 15 25, 10 25 Z" fill="#8F9779" opacity="0.85" />
                <path d="M25 10 C32 2, 42 5, 45 15 C35 20, 28 18, 25 10 Z" fill="#7B8265" opacity="0.9" />
                <path d="M5 40 C12 35, 20 38, 22 46 C15 48, 8 45, 5 40 Z" fill="#A3B899" opacity="0.75" />
                {/* Champagne Gold stems */}
                <path d="M0 0 Q30 10, 50 45" stroke="#DEC186" strokeWidth="1.5" strokeLinecap="round" />
                {/* Ivory White Gold-Hearted Blooms */}
                <circle cx="20" cy="20" r="8" fill="#FAF9F6" stroke="#DEC186" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="#DEC186" />
                
                <circle cx="38" cy="18" r="6" fill="#FAF9F6" stroke="#E2CF97" strokeWidth="0.75" />
                <circle cx="38" cy="18" r="2" fill="#C5A059" />
              </svg>
            </div>

            {/* Elegant preview typography on the card */}
            <div className="text-center font-serif text-[#4F5341] pointer-events-none">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block mb-1">Naiposha Gardens, Tigoni</span>
              <h2 className="font-script text-4xl md:text-5xl text-[#C5A059] my-1 leading-none select-none">Torrence & Wilfred</h2>
              <div className="w-8 h-[1px] bg-sage-400 mx-auto my-3 opacity-40" />
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#656B53]">Saturday, Sep 26, 2026</p>
            </div>
          </motion.div>

          {/* Left/Right folding flaps of envelope (gives beautiful deep envelope back effect) */}
          <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden rounded-xl pointer-events-none z-30">
            {/* Left side triangle */}
            <div 
              className="absolute left-0 bottom-0 h-full w-[51%] bg-[#DFD9CA] paper-texture"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            {/* Right side triangle */}
            <div 
              className="absolute right-0 bottom-0 h-full w-[51%] bg-[#DFD9CA] paper-texture"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            {/* Bottom pocket triangle */}
            <div 
              className="absolute left-0 bottom-0 w-full h-[62%] bg-[#D5CDBD] paper-texture border-t border-[#FFF/10]"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          </div>

          {/* Rotating Top Triangular Flap */}
          <motion.div
            id="envelope_top_flap"
            className="absolute top-0 inset-x-0 h-1/2 bg-[#DED7C6] paper-texture"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top',
              zIndex: isOpening ? 10 : 40 // Flip z-index so inside paper can slide up from underneath it once open
            }}
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />

          {/* Wax Seal Button (Sits in the middle, locking the top flap to the bottom) */}
          <motion.button
            id="wax_seal_button"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full cursor-pointer z-50 focus:outline-none flex items-center justify-center select-none"
            style={{ 
              background: 'radial-gradient(circle, #788461 40%, #5E6948 95%)',
              boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.4), 0 8px 24px rgba(60,65,50,0.45)' 
            }}
            whileHover={{ scale: isOpening ? 1 : 1.08, rotate: isOpening ? 0 : [0, -3, 3, 0] }}
            onClick={handleSealClick}
            disabled={isOpening}
          >
            {/* Authentic Wax Seal Outer Edge Contour */}
            <div className="absolute inset-[-4px] rounded-full border-[3px] border-solid border-[#4B5338] opacity-35 pointer-events-none" />
            <div className="absolute inset-[3px] rounded-full border border-dashed border-[#FAF8F5]/30 pointer-events-none" />

            {/* Glowing or pulsing gold ring */}
            <motion.div 
              className="absolute inset-[6px] rounded-full flex flex-col items-center justify-center bg-radial from-[#5E6948] to-[#4F583C]"
              animate={isOpening ? { scale: [1, 1.15, 0.95], opacity: [1, 0.8, 0] } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="w-[85%] h-[85%] rounded-full border border-[#FAF8F5]/25 flex flex-col items-center justify-center">
                {/* Gold Engraved Initial Mono */}
                <span className="font-serif text-[#E8DCC8] hover:text-white font-semibold text-sm tracking-[0.05em] select-none text-shadow-sm flex flex-col items-center justify-center">
                  <span className="leading-none text-xs text-[#DEC384]">T</span>
                  <span className="text-[9px] text-[#DEC384]/80 leading-none my-[1px]">♥</span>
                  <span className="leading-none text-xs text-[#DEC384]">W</span>
                </span>
              </div>
            </motion.div>

            {/* Shine highlight */}
            <div className="absolute top-[8px] left-[14px] w-12 h-4 bg-white/10 rounded-full blur-[2px] -rotate-12" />

            {/* Glowing gold border circle pulsing */}
            {!isOpening && (
              <span className="absolute inset-0 rounded-full animate-ping bg-[#DEC384]/15 opacity-40 pointer-events-none duration-[2000ms]" />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Guide text and Sound notice */}
      <AnimatePresence>
        {!isOpening ? (
          <motion.div
            className="mt-10 text-center flex flex-col items-center gap-4 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="font-serif text-sm tracking-[0.2em] text-[#656B53] font-medium animate-pulse">
              Click the wax seal to unveil
            </p>
            
            {/* Audio Toggle Indicator */}
            <button 
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-sage-200 text-[#656B53] text-xs transition duration-200 shadow-sm font-medium cursor-pointer"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAudioEnabled ? 'bg-green-500 animate-pulse' : 'bg-rose-400'}`} />
              {isAudioEnabled ? "Harp soundscapes enabled" : "Music is muted"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="mt-10 text-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-script text-3xl text-[#C2AA78] italic">Unfolding your invitation...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

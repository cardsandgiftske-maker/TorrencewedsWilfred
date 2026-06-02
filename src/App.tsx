/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Lock, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Heart, 
  Info, 
  Gift, 
  ArrowRight,
  ClipboardCheck,
  Building,
  Flower
} from 'lucide-react';

import DigitalEnvelope from './components/DigitalEnvelope';
import Countdown from './components/Countdown';
import ProgramTimeline from './components/ProgramTimeline';
import RSVPForm from './components/RSVPForm';
import AdminPanel from './components/AdminPanel';
import { startGardenAmbientMusic, stopGardenAmbientMusic } from './components/AmbientHarp';
import { DETAILS } from './types';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rsvpsTick, setRsvpsTick] = useState(0);
  const [copiedText, setCopiedText] = useState<'mpesa' | 'bank' | null>(null);

  // Synchronize ambient background music loop with sound toggles
  useEffect(() => {
    if (isOpen && isAudioEnabled) {
      startGardenAmbientMusic();
    } else {
      stopGardenAmbientMusic();
    }
    return () => stopGardenAmbientMusic();
  }, [isOpen, isAudioEnabled]);

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  const handleCopy = (text: string, type: 'mpesa' | 'bank') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const triggerRefresh = () => {
    setRsvpsTick((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#4A4F3F] selection:bg-sage-200">
      <AnimatePresence mode="wait">
        
        {/* ================= STAGE 1: CLOSED DIGITAL ENVELOPE ================= */}
        {!isOpen ? (
          <motion.div 
            key="envelope-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <DigitalEnvelope 
              onOpened={() => setIsOpen(true)}
              isAudioEnabled={isAudioEnabled}
              toggleAudio={toggleAudio}
            />
          </motion.div>
        ) : (
          
          /* ================= STAGE 2: MAIN WEDDING PORTAL ================= */
          <motion.main
            key="portal-view"
            className="relative w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 1.2 }}
          >
            {/* Floating colorful floral & leaf simulation overlays across the full screen */}
            <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => {
                const size = Math.random() * 18 + 10;
                // Alternate between Sage green leaf, Champagne gold petal, and Ivory flower blossom
                const types = [
                  { bg: 'bg-[#A3B899]/15', border: 'border-[#8F9779]/20', radius: 'rounded-br-2xl rounded-tl-2xl' }, // Sage Leaf
                  { bg: 'bg-[#E2CF97]/25', border: 'border-[#C5A059]/20', radius: 'rounded-full' },                  // Champagne Gold Petal
                  { bg: 'bg-[#FAF9F5]/80', border: 'border-[#E2CF97]/30', radius: 'rounded-tr-full rounded-bl-full shadow-2xs' } // Ivory Blossom Petal
                ];
                const type = types[i % types.length];

                return (
                  <motion.div
                    key={i}
                    className={`absolute ${type.bg} ${type.radius} border ${type.border}`}
                    style={{
                      width: size,
                      height: size * (i % 2 === 0 ? 1.4 : 1),
                      left: `${Math.random() * 100}%`,
                      top: `-5%`,
                    }}
                    animate={{
                      y: ["0vh", "110vh"],
                      x: ["0px", `${(Math.random() - 0.5) * 160}px`],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: Math.random() * 18 + 12,
                      repeat: Infinity,
                      delay: Math.random() * 6,
                      ease: "linear"
                    }}
                  />
                );
              })}
            </div>

            {/* Float Music Stop/Play Button on bottom left */}
            <div className="fixed bottom-6 left-6 z-40">
              <button
                onClick={toggleAudio}
                className="w-12 h-12 rounded-full border border-sage-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#656B53] shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                title={isAudioEnabled ? "Silence Serene music" : "Play Serene background music"}
              >
                {isAudioEnabled ? (
                  <Volume2 className="w-5 h-5 text-sage-600 animate-pulse" />
                ) : (
                  <VolumeX className="w-5 h-5 text-sage-400" />
                )}
              </button>
            </div>

            {/* Float Crown Lock Admin access button on bottom right */}
            <div className="fixed bottom-6 right-6 z-40">
              <button
                onClick={() => setShowAdmin(true)}
                className="w-12 h-12 rounded-full bg-sage-600 border border-sage-700 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                title="Couple's Lounge Admin Board"
              >
                <Lock className="w-4.5 h-4.5 text-champagne-300" />
              </button>
            </div>

            {/* ================= SECTION A: HERO HEADER ================= */}
            <header className="relative w-full h-screen md:h-[90vh] flex flex-col items-center justify-center text-center p-6 bg-radial from-[#FAF8F5] via-[#F5F2EB] to-[#EBE7DC] overflow-hidden">
              
              {/* Botanical vector decoration backdrops - Top Left */}
              <div className="absolute top-4 left-4 w-48 h-48 md:w-72 md:h-72 opacity-40 select-none pointer-events-none animate-pulse duration-[8000ms]">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Sage Green Leaves */}
                  <path d="M40 80 Q60 50, 90 60 C80 90, 50 100, 40 80 Z" fill="#8F9779" opacity="0.7" />
                  <path d="M20 110 Q50 90, 70 120 C50 140, 30 130, 20 110 Z" fill="#A3B899" opacity="0.6" />
                  <path d="M80 40 Q110 20, 120 50 C100 70, 80 60, 80 40 Z" fill="#7B8265" opacity="0.8" />
                  {/* Champagne stems */}
                  <path d="M10 10 Q100 50, 150 150" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
                  {/* Ivory beautiful lilies with golden pistils */}
                  <circle cx="85" cy="85" r="15" fill="#FAF9F6" stroke="#E2CF97" strokeWidth="1.5" />
                  <circle cx="85" cy="85" r="5" fill="#DEC186" />
                  {/* Additional buds */}
                  <circle cx="120" cy="75" r="10" fill="#FCF8F0" stroke="#E2CF97" strokeWidth="1" />
                  <circle cx="120" cy="75" r="3" fill="#C5A059" />
                  <circle cx="55" cy="115" r="8" fill="#F4EBD6" stroke="#C5A059" strokeWidth="1" />
                </svg>
              </div>

              {/* Botanical vector decoration backdrops - Bottom Right */}
              <div className="absolute bottom-4 right-4 w-48 h-48 md:w-72 md:h-72 opacity-40 select-none pointer-events-none rotate-180 animate-pulse duration-[10000ms]">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Sage Green Leaves */}
                  <path d="M40 80 Q60 50, 90 60 C80 90, 50 100, 40 80 Z" fill="#8F9779" opacity="0.7" />
                  <path d="M20 110 Q50 90, 70 120 C50 140, 30 130, 20 110 Z" fill="#A3B899" opacity="0.6" />
                  <path d="M80 40 Q110 20, 120 50 C100 70, 80 60, 80 40 Z" fill="#7B8265" opacity="0.8" />
                  {/* Champagne stems */}
                  <path d="M10 10 Q100 50, 150 150" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
                  {/* Ivory beautiful lilies with golden pistils */}
                  <circle cx="85" cy="85" r="15" fill="#FAF9F6" stroke="#E2CF97" strokeWidth="1.5" />
                  <circle cx="85" cy="85" r="5" fill="#DEC186" />
                  {/* Additional buds */}
                  <circle cx="120" cy="75" r="10" fill="#FCF8F0" stroke="#E2CF97" strokeWidth="1" />
                  <circle cx="120" cy="75" r="3" fill="#C5A059" />
                </svg>
              </div>

              {/* Dynamic Golden Flower Motif surrounding the Monogram */}
              <div className="relative mb-6 select-none group">
                <div className="absolute inset-[-12px] animate-[spin_40s_linear_infinite] opacity-65 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 100 100" className="w-24 h-24">
                    <defs>
                      <path id="leaf-shape" d="M50 5 C55 20, 45 35, 52 48 C48 35, 45 20, 50 5 Z M50 5 C45 20, 55 35, 48 48 C52 35, 55 20, 50 5 Z" fill="#8F9779" />
                    </defs>
                    <use href="#leaf-shape" transform="rotate(0, 50, 50)" />
                    <use href="#leaf-shape" transform="rotate(45, 50, 50)" fill="#C5A059" />
                    <use href="#leaf-shape" transform="rotate(90, 50, 50)" />
                    <use href="#leaf-shape" transform="rotate(135, 50, 50)" fill="#C5A059" />
                    <use href="#leaf-shape" transform="rotate(180, 50, 50)" />
                    <use href="#leaf-shape" transform="rotate(225, 50, 50)" fill="#C5A059" />
                    <use href="#leaf-shape" transform="rotate(270, 50, 50)" />
                    <use href="#leaf-shape" transform="rotate(315, 50, 50)" fill="#C5A059" />
                  </svg>
                </div>
                {/* Monogram Circle at header */}
                <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 bg-[#FAF8F5]/90 flex items-center justify-center relative select-none z-10 shadow-xs">
                  <span className="font-serif text-sm tracking-widest text-[#4A4F3F] font-bold">
                    T <span className="text-[#C5A059] font-light">|</span> W
                  </span>
                </div>
              </div>

              {/* Core Wedding invite message */}
              <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold block mb-4">
                Together with their families,
              </span>
              
              <h1 className="font-serif text-[#4A4F3F] text-4xl md:text-7xl font-light tracking-wide leading-tight mb-2">
                Torrence Nalisi
              </h1>
              
              <p className="font-script text-4xl text-[#C5A059] italic my-3 font-semibold select-none">
                &
              </p>
              
              <h1 className="font-serif text-[#4A4F3F] text-4xl md:text-7xl font-light tracking-wide leading-tight mb-8">
                Wilfred Katuka
              </h1>

              <div className="w-16 h-[1px] bg-champagne-500 mb-8 opacity-60" />

              <span className="font-serif text-sm tracking-[0.25em] text-[#656B53] font-semibold uppercase block mb-3">
                Cordially invite you to celebrate their union
              </span>

              {/* Mini details card */}
              <div className="p-4 px-6 rounded-2xl bg-[#FFFDF9]/80 border border-sage-100 shadow-xs flex flex-col md:flex-row items-center gap-4 md:gap-8 font-sans mt-4 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-medium text-[#4A4F3F]">Saturday, Sept 26, 2026</span>
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-sage-400" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-medium text-[#4A4F3F]">Naiposha Gardens, Tigoni</span>
                </div>
              </div>

              {/* Indicator downward arrow */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#656B53] font-serif text-[10px] tracking-widest uppercase opacity-75 animate-bounce">
                <span>The Celebration Details</span>
                <span className="text-sm">↓</span>
              </div>
            </header>

            {/* ================= SECTION B: COUNTDOWN TIMER ================= */}
            <section className="bg-white py-12 px-4 shadow-[inset_0_4px_24px_rgba(0,0,0,0.01)]">
              <Countdown />
            </section>

            {/* ================= SECTION C: WEDDING TIMELINE PROGRAM ================= */}
            <section className="py-16 bg-[#FDFCF9] border-t border-b border-[#E9ECE0]/30">
              <ProgramTimeline />
            </section>

            {/* ================= SECTION D: LOGISTICS & ATTURE ================= */}
            <section className="py-20 px-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch font-sans">
              
              {/* Naiposha Location Details */}
              <div className="flex flex-col justify-between bg-[#FAF8F5] border border-sage-200/50 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-sage-200/20 to-transparent blur-xl rounded-full" />
                
                <div>
                  <div className="w-10 h-10 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mb-4">
                    <MapPin className="w-4.5 h-4.5 text-sage-600" />
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">Naiposha Gardens</span>
                  <h4 className="font-serif text-[#4A4F3F] text-xl font-bold mb-3">Tigoni, Limuru</h4>
                  
                  <p className="text-xs md:text-sm text-[#5D634E] leading-relaxed mb-6">
                    {DETAILS.locationDetails}
                  </p>
                </div>

                <div className="pt-4 border-t border-sage-200/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-sage-500 uppercase font-semibold block">Wedding Time</span>
                    <span className="text-sm font-semibold font-serif text-[#4A4F3F]">Doors open at 10:30 A.M</span>
                  </div>
                  
                  <a 
                    href="https://maps.google.com/?q=Naiposha+Gardens+Tigoni" 
                    target="_blank" 
                    rel="referrer nofollow"
                    className="flex items-center gap-1.5 px-4 py-2 border border-sage-300 text-xs font-semibold rounded-full hover:bg-sage-100 transition duration-200 text-[#4A4F3F]"
                  >
                    Open Map
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Dress Code Palette Section */}
              <div className="bg-[#FAF8F5] border border-[#F4EBD6]/80 p-8 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#FFFBF0]/20 rounded-full blur-2xl" />
                
                <div>
                  <div className="w-10 h-10 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center mb-4">
                    <Sparkles className="w-4.5 h-4.5 text-[#C5A059]" />
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">Dress Code</span>
                  <h4 className="font-serif text-[#4A4F3F] text-xl font-bold mb-3">Elegant & Formal</h4>
                  
                  <p className="text-xs md:text-sm text-[#5D634E] leading-relaxed mb-6">
                    We invite you to celebrate in your finest formal wear! To align beautifully with our wedding aesthetic and photography layout, we invite you to dress in shades of our mood board palette.
                  </p>
                </div>

                {/* Theme Swatches */}
                <div>
                  <span className="text-[10px] text-sage-500 font-bold uppercase tracking-wider block mb-3">Our Palette Coordinate</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-white border border-sage-100 shadow-2xs">
                      <div className="w-8 h-8 rounded-full shadow-inner mb-1 bg-[#8F9779]" />
                      <span className="text-[10px] font-bold text-sage-800 tracking-wide block">Sage Green</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-white border border-sage-100 shadow-2xs">
                      <div className="w-8 h-8 rounded-full border border-sage-200 shadow-inner mb-1 bg-[#FAF9F6]" />
                      <span className="text-[10px] font-bold text-[#4D4539] tracking-wide block">Ivory</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-white border border-sage-100 shadow-2xs">
                      <div className="w-8 h-8 rounded-full shadow-inner mb-1 bg-[#DEC186]" />
                      <span className="text-[10px] font-bold text-[#8F6C2E] tracking-wide block">Champagne</span>
                    </div>
                  </div>
                </div>

              </div>

            </section>

            {/* ================= SECTION E: REGISTRY GIFTS ================= */}
            <section className="py-16 bg-[#FAF8F5]/50 border-t border-b border-[#E9ECE0]/30 font-sans">
              <div className="max-w-2xl mx-auto px-4 text-center">
                
                <div className="w-12 h-12 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-5 h-5 text-[#C5A059]" />
                </div>
                
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">Blessings Registry</span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#4A4F3F] mb-3">Gift Offerings</h3>
                <p className="text-xs md:text-sm text-[#5D634E] leading-relaxed italic max-w-lg mx-auto mb-8">
                  &ldquo;Your presence, thoughts, and prayers are our absolute greatest treasures. Should you wish to honor our covenant with a gift, <strong>enveloped financial gifts are preferred</strong> to help us securely embark on our new home.&rdquo;
                </p>

                {/* Sub-block options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
                  
                  {/* Option 1: Mobile money blessing card */}
                  <div className="bg-white border text-center p-5 rounded-2xl border-sage-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-green-50 text-green-700 text-[9px] font-bold tracking-wider uppercase mb-3">
                        M-Pesa Envelope
                      </span>
                      <h5 className="font-bold text-sm text-[#4A4F3F] mb-1">Buy Goods Till No.</h5>
                      <p className="font-mono text-xl text-sage-700 font-extrabold tracking-widest my-1.5">
                        987654
                      </p>
                      <p className="text-[10px] text-sage-500 italic">Registered as: Torrence & Wilfred Blessings</p>
                    </div>
                    <button
                      onClick={() => handleCopy('987654', 'mpesa')}
                      className="mt-4 w-full py-2 bg-sage-50 hover:bg-sage-100 border border-sage-200 text-xs text-sage-600 font-semibold rounded-lg transition"
                    >
                      {copiedText === 'mpesa' ? "Copied Till Number!" : "Copy Till Number"}
                    </button>
                  </div>

                  {/* Option 2: Bank blessings */}
                  <div className="bg-white border text-center p-5 rounded-2xl border-sage-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[9px] font-bold tracking-wider uppercase mb-3">
                        Bank Transfer
                      </span>
                      <h5 className="font-bold text-sm text-[#4A4F3F] mb-1">NCBA Bank Kenya</h5>
                      <p className="text-xs font-semibold text-[#5D634E] leading-tight">Account No: 1234567890</p>
                      <p className="text-[10px] text-sage-500 mt-1 italic">Account Name: Wilfred Katuka</p>
                    </div>
                    <button
                      onClick={() => handleCopy('1234567890', 'bank')}
                      className="mt-4 w-full py-2 bg-sage-50 hover:bg-sage-100 border border-sage-200 text-xs text-sage-600 font-semibold rounded-lg transition"
                    >
                      {copiedText === 'bank' ? "Copied Account!" : "Copy Account Details"}
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* ================= SECTION F: RSVP FORM PORTAL ================= */}
            <section id="rsvp-section" className="py-8 bg-white">
              <RSVPForm onRSVPSubmitted={triggerRefresh} />
            </section>

            {/* ================= SECTION G: FOOTER ================= */}
            <footer className="py-16 text-center select-none bg-[#FAF8F5] border-t border-sage-100">
              <div className="w-10 h-10 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Heart className="w-4 h-4 text-sage-500 fill-sage-500" />
              </div>
              
              <h4 className="font-serif text-[#4A4F3F] text-lg font-medium">Torrence & Wilfred</h4>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mt-1 font-semibold">September 26, 2026</p>
              
              <div className="w-12 h-[1px] bg-champagne-500 mx-auto my-6 opacity-40" />
              
              <p className="text-[10px] text-sage-600 font-sans max-w-xs mx-auto opacity-75 leading-relaxed">
                Exclusive digital invitation minisite.<br />Naiposha Gardens, Tigoni — Limuru.
              </p>

              <p className="text-[9px] text-[#A3B899] font-sans mt-8 uppercase tracking-widest">
                Designed with love &bull; Wedding Portal
              </p>
            </footer>

            {/* Admin dashboard side view */}
            <AnimatePresence>
              {showAdmin && (
                <AdminPanel 
                  onClosed={() => setShowAdmin(false)} 
                  rsvpsCountChangedTrigger={rsvpsTick}
                  triggerRefresh={triggerRefresh}
                />
              )}
            </AnimatePresence>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

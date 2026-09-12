/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
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
  Flower,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import DigitalEnvelope from './components/DigitalEnvelope';
import Countdown from './components/Countdown';
import ProgramTimeline from './components/ProgramTimeline';
import AdminPanel from './components/AdminPanel';
import HeroCarousel from './components/HeroCarousel';
import TableLookup from './components/TableLookup';
import { DETAILS } from './types';

// @ts-ignore
import lakesidePathway from './assets/images/lakeside_pathway_1780905636052.png';
import couplePhoto1 from './assets/images/torrence-wilfred-01.jpg';
import couplePhoto2 from './assets/images/torrence-wilfred-02.jpg';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rsvpsTick, setRsvpsTick] = useState(0);
  const [copiedText, setCopiedText] = useState<'mpesa' | 'bank' | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroPhotos = [couplePhoto1, couplePhoto2];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroPhotos.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const previousHeroSlide = () => {
    setHeroSlide((current) => (current - 1 + heroPhotos.length) % heroPhotos.length);
  };

  const nextHeroSlide = () => {
    setHeroSlide((current) => (current + 1) % heroPhotos.length);
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

            {/* RSVP submissions are closed; no guest RSVP action is shown. */}

            {/* ================= SECTION A: HERO HEADER ================= */}
            <header className="relative w-full min-h-screen md:min-h-[92vh] flex flex-col text-center bg-[#FAF9F5] overflow-hidden">

              {/* Couple photo carousel */}
              <div className="relative w-full h-[54vh] md:h-[58vh] overflow-hidden bg-[#E8E9E1]">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={`hero-bg-${heroSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <img
                      src={heroPhotos[heroSlide]}
                      alt={`Torrence and Wilfred — engagement photo ${heroSlide + 1}`}
                      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-35"
                    />
                    <div className="absolute inset-0 bg-[#4A4F3F]/10" />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={`hero-photo-${heroSlide}`}
                    src={heroPhotos[heroSlide]}
                    alt={`Torrence and Wilfred — engagement photo ${heroSlide + 1}`}
                    initial={{ opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Soft cinematic gradient keeps the carousel integrated with the invitation */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#FAF9F5]/75 pointer-events-none" />

                {/* Carousel controls */}
                <button
                  type="button"
                  onClick={previousHeroSlide}
                  aria-label="Previous photo"
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/75 backdrop-blur-sm border border-white/70 text-[#4A4F3F] shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextHeroSlide}
                  aria-label="Next photo"
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/75 backdrop-blur-sm border border-white/70 text-[#4A4F3F] shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {heroPhotos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setHeroSlide(index)}
                      aria-label={`View photo ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        heroSlide === index ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Invitation copy beneath the photos */}
              <div className="relative flex-1 flex flex-col items-center justify-center px-4 pt-7 pb-14 md:pt-8 md:pb-16">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#C5A059]/55" />

                {/* Clean, double-circular monogram */}
                <div className="mb-5 select-none relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#C5A059] p-1 flex items-center justify-center bg-[#FAF9F6]/95 shadow-sm relative mx-auto">
                    <div className="w-full h-full rounded-full border border-dashed border-[#C5A059]/40 flex flex-col items-center justify-center">
                      <span className="font-serif text-base md:text-lg tracking-[0.2em] font-extrabold text-[#4A4F3F] pl-1 select-none">
                        T <span className="text-[#C5A059] font-light mx-0.5">|</span> W
                      </span>
                      <div className="text-[9px] text-[#C5A059] leading-none mb-0.5 opacity-80 select-none">🌿</div>
                    </div>
                  </div>
                </div>

                <span className="font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-2">
                  Together with their families,
                </span>

                <div className="my-2 md:my-3">
                  <h1 className="font-script text-[#C5A059] text-5xl sm:text-6xl md:text-7xl font-normal tracking-wide leading-none select-none drop-shadow-[0_2px_4px_rgba(197,160,89,0.2)]">
                    Torrence
                  </h1>
                  <p className="font-serif text-2xl md:text-3xl text-[#5F6D48] italic my-2 md:my-3 font-light select-none">&</p>
                  <h1 className="font-script text-[#C5A059] text-5xl sm:text-6xl md:text-7xl font-normal tracking-wide leading-none select-none drop-shadow-[0_2px_4px_rgba(197,160,89,0.2)]">
                    Wilfred
                  </h1>
                </div>

                <div className="w-12 h-px bg-[#C5A059] mb-4 opacity-75" />

                <span className="font-serif text-[10px] md:text-sm tracking-[0.22em] text-[#556B2F] font-bold uppercase block mb-4">
                  Cordially invite you to celebrate their union
                </span>

                <div id="wedding_date_pop" className="relative px-7 py-3 md:px-9 md:py-4 border border-[#C5A059]/40 bg-white/95 rounded-2xl shadow-[0_15px_30px_rgba(143,151,121,0.12)] max-w-sm mx-auto scale-[1.02] z-10">
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#8F9779] rounded-full border border-white" />
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#8F9779] rounded-full border border-white" />
                  <span className="text-[9px] tracking-[0.3em] font-bold uppercase block text-[#8F9779] mb-1">Save our Date</span>
                  <span className="font-serif text-[#4A4F3F] text-lg md:text-2xl font-extrabold tracking-wide block">SEPTEMBER 26, 2026</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-sage-200/60 shadow-xs text-[10px] md:text-sm font-sans mt-3">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C5A059]" />
                  <span className="font-medium text-[#4A4F3F]">Naiposha Gardens, Tigoni</span>
                </div>

                <div className="mt-5 flex flex-col items-center gap-1 text-[#556B2F] font-serif text-[9px] tracking-widest uppercase opacity-85">
                  <span>The Celebration Details</span>
                  <span className="text-sm animate-bounce">↓</span>
                </div>
              </div>
            </header>

            {/* ================= SECTION B: COUNTDOWN TIMER ================= */}
            <section className="relative overflow-hidden bg-[#FAF9F5] py-12 px-4 border-t border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.025]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <Countdown />
            </section>

            {/* ================= SECTION C: WEDDING LOCATION ================= */}
            <section className="relative overflow-hidden py-24 bg-[#FAF9F6] border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.025]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <div className="px-4 max-w-2xl mx-auto font-sans">
                {/* Naiposha Location Details with beautiful center alignment */}
                <div className="flex flex-col bg-[#FAF8F5] border border-sage-200/50 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-sage-200/20 to-transparent blur-xl rounded-full" />
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mb-4">
                      <MapPin className="w-4.5 h-4.5 text-sage-600" />
                    </div>
                    
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">Naiposha Gardens</span>
                    <h4 className="font-serif text-[#4A4F3F] text-xl font-bold mb-4">A Lakeside Celebration</h4>

                    {/* Beautiful venue photo matching uploaded photo */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-sage-200 shadow-3xs group bg-sage-50 max-w-lg">
                      <img 
                        src={lakesidePathway} 
                        alt="Naiposha Gardens Ceremony Venue" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />
                      
                      {/* Dark gradient overlay & info text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 flex flex-col justify-end p-3 pointer-events-none">
                        <span className="text-[10px] text-white/95 drop-shadow-md text-left font-serif italic">
                          Waterfront altar setup & guest seating
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm text-[#5D634E] leading-relaxed mb-6 max-w-lg font-serif italic pr-1">
                      {DETAILS.locationDetails}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-sage-200/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] text-sage-500 uppercase font-semibold block">Wedding Session timings</span>
                      <span className="text-xs font-semibold font-serif text-[#4A4F3F] leading-snug block mt-1">
                        Doors open early by 6:00 A.M.<br />
                        Guests seated by 10:30 A.M.
                      </span>
                    </div>
                    
                    <a 
                      href="https://maps.google.com/?q=Naiposha+Gardens+Tigoni" 
                      target="_blank" 
                      rel="referrer nofollow"
                      className="flex items-center gap-1.5 px-5 py-2.5 border border-sage-300 text-xs font-semibold rounded-full hover:bg-sage-100 transition duration-200 text-[#4A4F3F] bg-white shadow-2xs inline-flex"
                    >
                      Open Map
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= SECTION D: WEDDING TIMELINE PROGRAM ================= */}
            <section className="relative overflow-hidden py-20 bg-[#FAF7F2] border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.020]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <ProgramTimeline />
            </section>

            {/* ================= SECTION E: DRESS CODE ================= */}
            <section className="relative overflow-hidden py-24 bg-[#FAF9F6] border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.025]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <div className="max-w-xl mx-auto px-4 text-center font-sans">
                {/* Dress Code Center-Aligned Panel */}
                <div className="bg-[#FAF8F5] border border-[#F4EBD6]/80 p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col items-center">
                  <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#FFFBF0]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="w-10 h-10 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center mb-4">
                    <Sparkles className="w-4.5 h-4.5 text-[#C5A059]" />
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">Dress Code</span>
                  <h4 className="font-serif text-[#4A4F3F] text-xl font-bold mb-3">Elegant Semi-Formal</h4>
                  
                  <p className="text-xs md:text-sm text-[#5D634E] leading-relaxed max-w-md font-sans">
                    We invite you to celebrate in polished yet relaxed attire. Choose colors and styles that make you feel your best &mdash; the emphasis is on elegance and comfort for our garden setting.
                  </p>
                </div>
              </div>
            </section>

            {/* ================= SECTION F: REGISTRY GIFTS ================= */}
            <section className="relative overflow-hidden py-24 bg-[#FAF9F6] font-sans border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.025]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <div className="max-w-2xl mx-auto px-4 text-center font-sans">
                
                <div className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-5 h-5 text-[#C5A059]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">Blessings Registry</span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#4A4F3F] mb-3">Gifting</h3>
                <p className="text-sm md:text-base text-[#5D634E] leading-relaxed font-light max-w-lg mx-auto mb-8 font-serif">
                  Your presence,  thoughts and prayers are our absolute greatest treasures. Should you wish to honour our covenant with a gift we warmly welcome enveloped or electronic, as most meaningful to you.
                </p>

                {/* Centered Single Contribution Frame */}
                <div className="max-w-xs mx-auto">
                  
                  {/* Option 1: Mobile money blessing card */}
                  <div className="bg-white border text-center p-6 rounded-2xl border-sage-200 shadow-md flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#EBF1ED] text-[#4F5341] text-[10px] font-bold tracking-wider uppercase mb-3">
                        M-Pesa Envelope
                      </span>
                      <h5 className="font-bold text-sm text-[#4A4F3F] mb-1">Send to Mobile Number</h5>
                      <p className="font-mono text-2xl text-sage-700 font-extrabold tracking-widest my-2">
                        0724444499
                      </p>
                      <p className="text-xs text-sage-500 italic">Registered as: Torrence Nalisi</p>
                    </div>
                    <button
                      onClick={() => handleCopy('0724444499', 'mpesa')}
                      className="mt-5 w-full py-2.5 bg-sage-50 hover:bg-sage-100 border border-sage-200 text-xs text-sage-600 font-semibold rounded-xl transition cursor-pointer"
                    >
                      {copiedText === 'mpesa' ? "Copied Mobile Number!" : "Copy Mobile Number"}
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* ================= SECTION G: TABLE ALLOCATION ================= */}
            <TableLookup />

            {/* ================= SECTION H: RSVP CLOSED ================= */}
            <section id="rsvp-section" className="relative overflow-hidden py-16 bg-[#FAF7F2] border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.020]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <div className="relative w-full max-w-2xl mx-auto px-4">
                <div className="bg-[#FAF8F5] border border-sage-200/60 rounded-3xl p-8 md:p-12 shadow-lg text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-sage-600" />
                  </div>
                  <span className="font-serif text-[#C5A059] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
                    R.S.V.P
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#4A4F3F] tracking-wide">
                    RSVP Is Now Closed
                  </h3>
                  <p className="text-sm text-[#5D634E] mt-4 leading-relaxed max-w-md mx-auto">
                    Thank you for your response. RSVP submissions for Torrence & Wilfred's wedding have now closed.
                  </p>
                  <div className="w-12 h-[1px] bg-champagne-500 mx-auto mt-6 opacity-50" />
                  <p className="text-xs text-sage-600 mt-5 italic">
                    We look forward to celebrating with you.
                  </p>
                </div>
              </div>
            </section>

            {/* ================= SECTION I: FOOTER ================= */}
            <footer className="relative overflow-hidden py-16 text-center select-none bg-[#FAF9F6] border-t border-sage-100/30">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.020]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
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

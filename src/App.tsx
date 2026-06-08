/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Flower
} from 'lucide-react';

import DigitalEnvelope from './components/DigitalEnvelope';
import Countdown from './components/Countdown';
import ProgramTimeline from './components/ProgramTimeline';
import RSVPForm from './components/RSVPForm';
import AdminPanel from './components/AdminPanel';
import { DETAILS } from './types';

// @ts-ignore
import lakesidePathway from './assets/images/lakeside_pathway_1780905636052.png';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rsvpsTick, setRsvpsTick] = useState(0);
  const [copiedText, setCopiedText] = useState<'mpesa' | 'bank' | null>(null);
  const [showScrollReminder, setShowScrollReminder] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => {
      // Show reminder if user has scrolled down a bit to remind them to confirm attendance
      if (window.scrollY > 120) {
        setShowScrollReminder(true);
      } else {
        setShowScrollReminder(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

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

            {/* Scroll-activated Floating Confirm Attendance Reminder */}
            <AnimatePresence>
              {showScrollReminder && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-6 left-6 z-40"
                >
                  <button
                    onClick={() => {
                      document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#8F9779] hover:bg-[#7D8568] text-[#FAF9F5] shadow-lg border border-sage-600/30 font-semibold text-xs tracking-wider uppercase cursor-pointer transform hover:scale-105 active:scale-95 transition"
                    title="Confirm your wedding attendance template"
                  >
                    <span className="relative flex h-2 w-2 mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DEC186] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DEC186]"></span>
                    </span>
                    <ClipboardCheck className="w-4 h-4 text-[#DEC186]" />
                    <span>Confirm Attendance</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================= SECTION A: HERO HEADER ================= */}
            <header className="relative w-full min-h-screen md:min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-24 bg-gradient-to-b from-[#FDFBF7] via-[#FAF7F2] to-[#FAF9F5] overflow-hidden">
              
              {/* Subtle background photo watermark */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.025]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />

              {/* Vibrant soft gold and champagne warm glowing highlights */}
              <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[#F2EDDB] opacity-50 blur-[100px] pointer-events-none select-none" />
              <div className="absolute bottom-[10%] right-[3%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[#F5EED8] opacity-60 blur-[110px] pointer-events-none select-none" />



              {/* Clean, double-circular monogram as shown in the ecard, safely brought down to prevent clipping */}
              <div className="mt-12 mb-8 select-none relative z-10">
                <div className="w-24 h-24 rounded-full border border-[#C5A059] p-1 flex items-center justify-center bg-[#FAF9F6]/95 shadow-sm relative mx-auto group hover:scale-[1.03] transition-transform duration-300">
                  <div className="w-full h-full rounded-full border border-dashed border-[#C5A059]/40 flex flex-col items-center justify-center">
                    <span className="font-serif text-xl tracking-[0.2em] font-extrabold text-[#4A4F3F] pl-1 select-none">
                      T <span className="text-[#C5A059] font-light mx-0.5">|</span> W
                    </span>
                    {/* Laurel branch motif matching bottom of the seal/monogram ring in the ecard */}
                    <div className="text-[10px] text-[#C5A059] leading-none mb-1 opacity-80 select-none">🌿</div>
                  </div>
                </div>
              </div>

              {/* Core Wedding invite message */}
              <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-4">
                Together with their families,
              </span>
              
              <div className="my-6">
                <h1 className="font-script text-[#C5A059] text-7xl md:text-9xl font-normal tracking-wide leading-none select-none drop-shadow-[0_2px_4px_rgba(197,160,89,0.2)]">
                  Torrence
                </h1>
                
                <p className="font-serif text-3xl text-[#5F6D48] italic my-4 font-light select-none sm:my-6">
                  &
                </p>
                
                <h1 className="font-script text-[#C5A059] text-7xl md:text-9xl font-normal tracking-wide leading-none select-none drop-shadow-[0_2px_4px_rgba(197,160,89,0.2)]">
                  Wilfred
                </h1>
              </div>
 
              <div className="w-16 h-[1.5px] bg-[#C5A059] mb-8 opacity-75" />
 
              <span className="font-serif text-sm tracking-[0.25em] text-[#556B2F] font-bold uppercase block mb-3">
                Cordially invite you to celebrate their union
              </span>
 
              {/* Dynamic Spectacular Golden Date Stamp Frame to make it POP */}
              <div id="wedding_date_pop" className="my-10 relative px-10 py-5 border border-[#C5A059]/40 bg-white/95 rounded-2xl shadow-[0_15px_30px_rgba(143,151,121,0.12)] max-w-sm mx-auto scale-105 z-10">
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#8F9779] rounded-full border border-white" />
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#8F9779] rounded-full border border-white" />
                
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase block text-[#8F9779] mb-1">
                  Save our Date
                </span>
                <span className="font-serif text-[#4A4F3F] text-2xl md:text-3xl font-extrabold tracking-wide block">
                  SEPTEMBER 26, 2026
                </span>
              </div>
 
              {/* Location Badge */}
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-sage-200/60 shadow-xs text-xs md:text-sm font-sans mt-2 transform hover:scale-[1.03] transition-transform">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium text-[#4A4F3F]">Naiposha Gardens, Tigoni</span>
              </div>
 
              {/* Indicator downward arrow */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#556B2F] font-serif text-[10px] tracking-widest uppercase opacity-85 animate-bounce">
                <span>The Celebration Details</span>
                <span className="text-sm">↓</span>
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
                    We warmly invite you to celebrate in polished yet relaxed attire. Choose colors and styles that make you feel your best &mdash; the emphasis is on elegance and comfort for our garden setting.
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

            {/* ================= SECTION G: RSVP FORM PORTAL ================= */}
            <section id="rsvp-section" className="relative overflow-hidden py-16 bg-[#FAF7F2] border-b border-sage-100">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-[0.020]" 
                style={{ backgroundImage: `url(${lakesidePathway})` }} 
              />
              <RSVPForm onRSVPSubmitted={triggerRefresh} />
            </section>

            {/* ================= SECTION H: FOOTER ================= */}
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

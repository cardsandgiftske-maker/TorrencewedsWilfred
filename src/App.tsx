import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Calendar, Clock, Sparkles, Heart, 
  Volume2, VolumeX, Navigation, ExternalLink, ChevronDown 
} from 'lucide-react';
import Envelope from './components/Envelope';
import Countdown from './components/Countdown';
import DressCode from './components/DressCode';
import Gifting from './components/Gifting';
import RSVPForm from './components/RSVPForm';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Paths to generated assets
  const waxSealUrl = '/src/assets/images/wax_seal_gold_1783692877922.jpg';
  const floralBgUrl = '/src/assets/images/floral_watercolor_1783692893236.jpg';
  const severinSeaLodgeUrl = '/src/assets/images/severin_sea_lodge_1783693759831.jpg';

  // Toggle background music
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio playback blocked or failed:", err));
    }
  };

  // Automatically try playing music when invitation slides open
  useEffect(() => {
    if (isOpen && audioRef.current) {
      // Set volume to soft background levels
      audioRef.current.volume = 0.35;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Auto-play was blocked, which is standard browser behavior.
          // The user can unmute using our floating music button.
          setIsPlaying(false);
        });
    }
  }, [isOpen]);

  const handleEnvelopeOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen text-stone-800 bg-[#FAF9F5] selection:bg-brand-gold-100">
      {/* Hidden Audio element - Romantic Chopin Piano Nocturne */}
      <audio
        ref={audioRef}
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Chopin_Nocturne_Op._9%2C_No._2_in_E-flat_major_played_by_Frank_Levy.mp3"
        loop
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Envelope onOpen={handleEnvelopeOpen} waxSealUrl={waxSealUrl} />
          </motion.div>
        ) : (
          <motion.div
            key="minisite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full overflow-x-hidden"
          >
            {/* Ambient Background Watermark Floral */}
            <div className="absolute top-0 inset-x-0 h-[700px] pointer-events-none opacity-[0.12] mix-blend-multiply overflow-hidden">
              <img
                src={floralBgUrl}
                alt="Floral Background Watermark"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover origin-top scale-110 blur-[0.5px]"
              />
            </div>

            {/* Floating Music Controller */}
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={toggleMusic}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-brand-gold-200/50 flex items-center justify-center text-brand-gold-600 hover:text-brand-gold-700 hover:scale-105 active:scale-95 transition-all cursor-pointer group relative"
                aria-label="Toggle background music"
              >
                {/* Rotating aura when playing */}
                {isPlaying && (
                  <span className="absolute inset-0 rounded-full border border-brand-gold-500 animate-ping opacity-35" />
                )}
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-stone-400" />}
                
                {/* Micro tooltip */}
                <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-stone-900/80 text-white text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {isPlaying ? 'Pause Music' : 'Play Music'}
                </span>
              </button>
            </div>

            {/* Floating Invitation Header */}
            <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-40 relative">
              <span className="font-serif text-sm tracking-widest text-stone-500 font-medium select-none">
                V & C
              </span>
              <span className="font-sans text-[10px] text-brand-gold-600 uppercase tracking-[0.25em] font-bold border-b border-brand-gold-500/20 pb-1 select-none">
                21st July 2026
              </span>
            </nav>

            {/* HERO SECTION (MORE APPEALING & ROMANTIC) */}
            <header className="relative w-full max-w-4xl mx-auto text-center px-4 pt-16 pb-24 flex flex-col items-center justify-center min-h-[85vh]">
              {/* Decorative Laurel / Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative mb-6"
              >
                <div className="w-16 h-16 rounded-full border border-brand-gold-500/30 flex items-center justify-center bg-white/45 backdrop-blur-sm shadow-inner">
                  <span className="font-serif text-xl text-brand-gold-600 tracking-wider font-light">
                    V&amp;C
                  </span>
                </div>
                <div className="absolute -inset-1 border border-dashed border-brand-gold-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="flex items-center gap-1.5 justify-center mb-4"
              >
                <span className="h-px w-8 bg-brand-gold-500/40" />
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] text-brand-gold-600 font-semibold uppercase">
                  Celebrate our Union
                </span>
                <span className="h-px w-8 bg-brand-gold-500/40" />
              </motion.div>

              {/* Enhanced Elegant Typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-light text-stone-800 tracking-wide mt-2 leading-none">
                  Vivian Akinyi
                </h1>
                <span className="block font-cursive text-5xl sm:text-6xl text-brand-gold-500 my-4 md:my-5">
                  &amp;
                </span>
                <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-light text-stone-800 tracking-wide leading-none">
                  Chris Blackshaw
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="font-serif text-base sm:text-lg italic text-stone-500 max-w-xl leading-relaxed mt-8"
              >
                "With joy in our hearts, we invite you to share our seaside wedding celebration under the beautiful Mombasa sky."
              </motion.p>

              {/* Countdown Ticker */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="mt-12 w-full"
              >
                <Countdown targetDateStr="2026-07-21T14:00:00" />
              </motion.div>

              {/* Animated Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5, y: [0, 8, 0] }}
                transition={{ delay: 1.6, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-16 flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight * 0.85,
                    behavior: 'smooth'
                  });
                }}
              >
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-stone-400">
                  Scroll to details
                </span>
                <ChevronDown className="w-4 h-4 text-brand-gold-500" />
              </motion.div>
            </header>

            {/* EVENT OVERVIEW TILES */}
            <section className="w-full max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white/60 border border-brand-gold-200/30 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-gold-100/30 flex items-center justify-center text-brand-gold-600 mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block mb-1">
                  The Date
                </span>
                <h3 className="font-serif text-lg text-stone-800 font-semibold mb-1">
                  Tuesday, 21st July 2026
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Kindly mark your calendars to witness our vows.
                </p>
              </div>

              <div className="bg-white/60 border border-brand-gold-200/30 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-gold-100/30 flex items-center justify-center text-brand-gold-600 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block mb-1">
                  The Time
                </span>
                <h3 className="font-serif text-lg text-stone-800 font-semibold mb-1">
                  2:00 PM Prompt
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Ceremony begins on the lawn; sunset toast to follow.
                </p>
              </div>

              <div className="bg-white/60 border border-brand-gold-200/30 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-gold-100/30 flex items-center justify-center text-brand-gold-600 mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block mb-1">
                  The Venue
                </span>
                <h3 className="font-serif text-lg text-stone-800 font-semibold mb-1">
                  Severin Sea Lodge
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Bamburi Beach, Mombasa, Kenya
                </p>
              </div>
            </section>

            {/* THE VENUE FEATURE CARD WITH HIGH-RES RESORT PHOTO */}
            <section className="w-full max-w-5xl mx-auto px-4 py-12 relative z-10">
              <div className="bg-white/50 border border-brand-gold-200/30 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 hover:shadow-md transition-all duration-300">
                <div className="md:col-span-5 h-[300px] md:h-full relative overflow-hidden min-h-[300px]">
                  <img
                    src={severinSeaLodgeUrl}
                    alt="Severin Sea Lodge - Mombasa, Kenya"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Transparent subtle warm overlay */}
                  <div className="absolute inset-0 bg-brand-gold-600/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent flex flex-col justify-end p-6 text-white md:hidden">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold-200">
                      Beachside Oasis
                    </span>
                    <h4 className="font-serif text-xl font-light">Severin Sea Lodge</h4>
                  </div>
                </div>

                <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-sans font-bold text-brand-gold-600 uppercase tracking-widest block mb-1">
                    Coastal Vows & Celebration
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-800 font-light tracking-wide mb-4">
                    The Venue: Severin Sea Lodge
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans mb-6">
                    Our ceremony will take place amidst the pristine gardens and swaying coconut palms of Severin Sea Lodge on Bamburi Beach. Influenced by traditional Swahili design with thatched roofs and stunning ocean views, the lodge overlooks the crystal-clear waters of the Indian Ocean, making it the perfect setting for our coastal union.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://maps.google.com/?q=Severin+Sea+Lodge+Bamburi+Mombasa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-sans text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Navigate on Maps
                    </a>
                    <a
                      href="https://www.severinsealodge.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-brand-gold-500 hover:bg-brand-gold-100/30 text-brand-gold-600 font-sans text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View Resort Details <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* DRESS CODE */}
            <section className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10">
              <DressCode />
            </section>

            {/* RSVP & ETIQUETTE RULES */}
            <section className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10">
              <RSVPForm />
            </section>

            {/* GIFT REGISTRY GUIDE */}
            <section className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10 mb-16">
              <Gifting />
            </section>

            {/* FOOTER */}
            <footer className="w-full border-t border-brand-gold-200/40 bg-brand-gold-50/20 py-12 text-center relative z-10">
              <div className="max-w-md mx-auto px-4 flex flex-col items-center">
                <Heart className="w-6 h-6 text-brand-gold-500/60 mb-4 animate-pulse stroke-1" />
                <p className="font-serif italic text-sm text-stone-500">
                  "I have found the one whom my soul loves."
                </p>
                <span className="text-[10px] font-sans font-bold text-brand-gold-500 uppercase tracking-widest mt-1">
                  Song of Solomon 3:4
                </span>
                
                <p className="text-[10px] text-stone-400 font-sans mt-8 uppercase tracking-widest">
                  Vivian Akinyi &amp; Chris Blackshaw
                </p>
                <p className="text-[9px] text-stone-300 font-sans mt-1">
                  July 21, 2026 • Mombasa, Kenya
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

// @ts-ignore
import Couple1 from '../assets/images/torrence-wilfred-01.jpg';
// @ts-ignore
import Couple2 from '../assets/images/torrence-wilfred-02.jpg';
// @ts-ignore
import Couple3 from '../assets/images/torrence-wilfred-03.jpg';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    id: 'pathway',
    image: Couple1,
    title: 'Smiles of Love',
    subtitle: 'For Love, Happiness and Smiles'
  },
  {
    id: 'ceremony',
    image: Couple2,
    title: 'Looking Good Together',
    subtitle: 'Blessed and Highly Favoured Together'
  },
  {
    id: 'aerial',
    image: Couple3,
    title: 'Journey of Love',
    subtitle: 'Us Together Forever Side by Side'
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto advance every 5 seconds unless hovered/touched
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      id="hero-photo-carousel"
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Container with decorative subtle gold frame and soft shadow */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.1/1] max-h-[380px] rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(74,79,63,0.12)] border border-[#E7DFD0] bg-[#FAF8F5]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Blurred Background Layer (Prevents cropped/black edges) */}
            <img
              src={currentSlide.image}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter blur-xl scale-110 brightness-75 pointer-events-none"
            />

            {/* Foreground Uncropped Photo */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center drop-shadow-lg"
              />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

            {/* Top label / Counter badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#4A4F3F] text-[11px] font-medium tracking-wide shadow-xs border border-white/40">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Wedding Venue</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-mono tracking-wider font-semibold">
                {currentIndex + 1} / {SLIDES.length}
              </span>
            </div>

            {/* Bottom title & description caption */}
            <div className="absolute bottom-4 left-4 right-4 text-left z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 text-[#EFE7D3] text-[11px] uppercase tracking-widest font-semibold mb-0.5 drop-shadow-sm">
                <MapPin className="w-3 h-3 text-[#E8C982]" />
                <span>{currentSlide.subtitle}</span>
              </div>
              <h3 className="font-serif text-white text-base sm:text-lg md:text-xl font-bold tracking-wide drop-shadow-md">
                {currentSlide.title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button */}
        <button
          type="button"
          id="hero-carousel-prev"
          onClick={handlePrev}
          aria-label="Previous Photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#4A4F3F] hover:text-[#2A2E23] flex items-center justify-center backdrop-blur-md border border-white/60 shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          id="hero-carousel-next"
          onClick={handleNext}
          aria-label="Next Photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#4A4F3F] hover:text-[#2A2E23] flex items-center justify-center backdrop-blur-md border border-white/60 shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                id={`hero-carousel-dot-${idx}`}
                type="button"
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-2 bg-[#DEC186] shadow-xs'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

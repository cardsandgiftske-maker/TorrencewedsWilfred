/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DETAILS } from '../types';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date(DETAILS.date).getTime();
  
  const calculateTimeLeft = (): TimeLeft => {
    // Standard JS Date handling
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [hasReached, setHasReached] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const calculated = calculateTimeLeft();
      setTimeLeft(calculated);
      
      const totalDiff = targetDate - new Date().getTime();
      if (totalDiff <= 0) {
        setHasReached(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-[#FAF8F5] border border-sage-200/50 rounded-2xl max-w-2xl mx-auto shadow-sm my-12 relative overflow-hidden">
      {/* Elegant theme-appropriate botanical bouquet decoration backdrop */}
      <div className="absolute right-[-20px] top-[-30px] w-40 h-40 opacity-25 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Leaves */}
          <path d="M20 50 C25 35, 45 40, 50 30 C45 45, 30 50, 20 50 Z" fill="#8F9779" />
          <path d="M40 70 C55 60, 60 75, 75 65 C60 80, 45 75, 40 70 Z" fill="#7B8265" />
          {/* Stem */}
          <path d="M10 90 Q40 60, 80 20" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
          {/* Flowers */}
          <circle cx="50" cy="40" r="10" fill="#FAF9F6" stroke="#DEC186" strokeWidth="0.75" />
          <circle cx="50" cy="40" r="3" fill="#DEC186" />
          
          <circle cx="75" cy="30" r="6" fill="#F4EBD6" stroke="#C5A059" strokeWidth="0.5" />
          <circle cx="75" cy="30" r="1.5" fill="#C5A059" />
        </svg>
      </div>

      <span className="font-serif text-[#C5A059] text-xs uppercase tracking-[0.25em] font-semibold mb-3">
        Countdown to Forever
      </span>
      
      <div className="w-8 h-[1px] bg-champagne-500 mb-8 opacity-60" />

      {hasReached ? (
        <p className="font-serif text-2xl text-[#4A4F3F] text-center tracking-wide py-4">
          Today, we begin our beautiful journey together! 🎉
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-lg mb-4">
          {timeBlocks.map((block, index) => (
            <div 
              key={index}
              className="flex flex-col items-center bg-[#FAF8F5] border border-sage-200/40 rounded-xl p-3 md:p-5 shadow-[0_4px_16px_rgba(143,151,121,0.06)] backdrop-blur-sm"
            >
              <div className="relative font-serif text-2xl md:text-4xl font-medium text-[#4A4F3F] tracking-tight tabular-nums select-none mb-1">
                {String(block.value).padStart(2, '0')}
              </div>
              <div className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-sage-600 font-semibold select-none">
                {block.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="font-serif italic text-[#656B53] text-sm mt-4 text-center">
        September 26, 2026 — Naiposha Gardens, Tigoni
      </p>
    </div>
  );
}

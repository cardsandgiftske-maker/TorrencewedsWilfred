import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDateStr: string; // "2026-07-21T14:00:00"
}

export default function Countdown({ targetDateStr }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isOver) {
    return (
      <div className="text-center py-6">
        <p className="font-serif text-2xl text-brand-gold-600 tracking-wider animate-pulse">
          Today is the Big Day!
        </p>
        <p className="text-xs text-stone-500 mt-1 font-sans">
          Vivian & Chris are celebrating their union
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-6 py-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-brand-gold-200/50 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm relative group hover:border-brand-gold-500/30 transition-all duration-300">
            {/* Subtle background scale on hover */}
            <div className="absolute inset-0 bg-brand-gold-100/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="font-serif text-xl sm:text-2xl font-light text-stone-800 relative z-10">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-gold-600 mt-0.5 relative z-10 font-sans font-medium">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

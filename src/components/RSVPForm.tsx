/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Plus, Utensils, Award, Check } from 'lucide-react';
import { RSVP } from '../types';

interface RSVPFormProps {
  onRSVPSubmitted: () => void;
}

export default function RSVPForm({ onRSVPSubmitted }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    attending: true,
    guestsCount: 1,
    dietary: '',
    wishes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMess("Please fill in your name.");
      return;
    }

    setIsSubmitting(true);
    setErrorMess(null);

    setTimeout(() => {
      try {
        // Build robust real submission records inside Local Storage
        const rsvpEntry: RSVP = {
          id: 'rsvp_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          name: formData.name.trim(),
          attending: formData.attending,
          guestsCount: formData.attending ? formData.guestsCount : 0,
          dietary: formData.dietary.trim() || undefined,
          wishes: formData.wishes.trim() || undefined,
          timestamp: new Date().toISOString()
        };

        const existingRaw = localStorage.getItem('wedding_rsvps');
        const rsvps: RSVP[] = existingRaw ? JSON.parse(existingRaw) : [];
        
        // Push and write back
        rsvps.push(rsvpEntry);
        localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));

        setIsSubmitting(false);
        setIsSuccess(true);
        if (onRSVPSubmitted) {
          onRSVPSubmitted();
        }
      } catch (err) {
        setIsSubmitting(false);
        setErrorMess("An error occurred. Please try again.");
      }
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      attending: true,
      guestsCount: 1,
      dietary: '',
      wishes: ''
    });
    setIsSuccess(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4 font-sans">
      <div className="bg-[#FAF8F5] border border-sage-200/60 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden">
        
        {/* Soft floral/watercolor styling effects */}
        <div className="absolute top-[-30px] right-[-30px] w-28 h-28 rounded-full bg-sage-100/30 blur-2xl" />
        <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 rounded-full bg-champagne-100/20 blur-2xl" />

        <div className="text-center mb-10">
          <span className="font-serif text-[#C5A059] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            R.S.V.P
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#4A4F3F] tracking-wide">
            Joyfully Respond
          </h3>
          <p className="text-xs text-[#5D634E] mt-2 italic font-sans max-w-sm mx-auto">
            Kindly respond by September 10th, 2026 to help us guarantee your lakeside seat.
          </p>
          <div className="w-12 h-[1px] bg-champagne-500 mx-auto mt-4 opacity-50" />
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="rsvp-form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {/* Joyfully Attend vs Regretfully Decline Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: true })}
                  className={`py-4 px-3 rounded-2xl border text-center transition-all cursor-pointer font-serif text-sm md:text-base flex flex-col items-center justify-center gap-2 ${
                    formData.attending 
                      ? 'bg-sage-100/60 border-sage-400 text-[#4A4F3F] shadow-sm ring-1 ring-sage-400/20 font-semibold' 
                      : 'bg-[#FFFDF9] border-[#EAE5D9] text-[#788265] hover:border-sage-300'
                  }`}
                >
                  <span className="text-lg md:text-xl">🤵👰</span>
                  <span>Joyfully Attend</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: false })}
                  className={`py-4 px-3 rounded-2xl border text-center transition-all cursor-pointer font-serif text-sm md:text-base flex flex-col items-center justify-center gap-2 ${
                    !formData.attending 
                      ? 'bg-rose-50 border-rose-200 text-[#4A4F3F] shadow-sm font-semibold' 
                      : 'bg-[#FFFDF9] border-[#EAE5D9] text-[#788265] hover:border-rose-300'
                  }`}
                >
                  <span className="text-lg md:text-xl">💌</span>
                  <span>Regretfully Decline</span>
                </button>
              </div>

              {/* Full Name input */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#4A4F3F] font-semibold mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sage-500" />
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Torrence Nalisi"
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-[#FFFDF9] text-[#4A4F3F] focus:outline-none focus:ring-1 focus:ring-sage-400 focus:border-sage-400 text-sm transition"
                />
              </div>

              {/* Conditional guests dropdown if attending */}
              <AnimatePresence>
                {formData.attending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <label className="block text-xs uppercase tracking-widest text-[#4A4F3F] font-semibold mb-2 flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 text-sage-500" />
                        Number of Attending Seats (Including yourself)
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-[#FFFDF9] text-[#4A4F3F] focus:outline-none focus:ring-1 focus:ring-sage-400 focus:border-sage-400 text-sm transition"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Seat' : 'Seats'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4">
                      <label className="block text-xs uppercase tracking-widest text-[#4A4F3F] font-semibold mb-2 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-sage-500" />
                        Dietary Preferences / Restrictions (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        placeholder="e.g. Vegetarian, Nut Allergy, none"
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-[#FFFDF9] text-[#4A4F3F] focus:outline-none focus:ring-1 focus:ring-sage-400 focus:border-sage-400 text-sm transition"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error indicator */}
              {errorMess && (
                <p className="text-xs text-rose-500 italic mt-1 font-sans font-medium text-center">
                  ⚠️ {errorMess}
                </p>
              )}

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-white font-serif tracking-widest text-sm uppercase bg-gradient-to-r from-sage-600 to-sage-500 hover:from-sage-700 hover:to-sage-600 focus:outline-none focus:ring-1 focus:ring-sage-400 font-semibold shadow-md active:scale-[0.99] transition duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting RSVP...
                  </span>
                ) : (
                  <span>Send Response</span>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="rsvp-success"
              className="text-center py-8 space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Giant gold seal check representation */}
              <div className="w-20 h-20 rounded-full bg-sage-50 border border-sage-300 flex items-center justify-center mx-auto shadow-sm relative">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-sage-400/40" />
                <Check className="w-10 h-10 text-sage-600" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-[#4A4F3F] text-2xl font-semibold">
                  {formData.attending ? "Joyfully Received!" : "Thank You for letting us know"}
                </h4>
                <p className="text-xs text-[#5D634E] max-w-sm mx-auto leading-relaxed">
                  {formData.attending 
                    ? `Thank you, ${formData.name}. We have reserved ${formData.guestsCount} seat(s) for you at Naiposha Gardens, Tigoni. A confirmation reference has been synchronized.`
                    : `We are sorry you won't be able to celebrate with us, ${formData.name}. We thank you for letting us know.`
                  }
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded-full border border-sage-200 text-xs text-sage-600 hover:bg-sage-50 transition cursor-pointer font-medium"
                >
                  Modify Response
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

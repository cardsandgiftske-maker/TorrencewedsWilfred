/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Plus, Utensils, Award, Check } from 'lucide-react';
import { RSVP } from '../types';
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

interface RSVPFormProps {
  onRSVPSubmitted: () => void;
}

export default function RSVPForm({ onRSVPSubmitted }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    attending: true,
    guestsCount: 1,
    childSeatsCount: 0,
    dietary: '',
    wishes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMess("Please fill in your name.");
      return;
    }
    setErrorMess(null);
    setShowConfirmModal(true);
  };
const handleSeedTestData = async () => {
  alert("Demo data disabled because the app now uses Firebase.");
};
  const handleConfirmSubmit = async () => {
  setShowConfirmModal(false);
  setIsSubmitting(true);
  setErrorMess(null);

  try {
    const rsvpEntry: RSVP = {
      id: 'rsvp_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      name: formData.name.trim(),
      attending: formData.attending,
      guestsCount: formData.attending ? formData.guestsCount : 0,
      childSeatsCount: formData.attending ? formData.childSeatsCount : 0,
      dietary: formData.dietary.trim(),
      wishes: formData.wishes.trim(),
      timestamp: new Date().toISOString()
    };

    await addDoc(collection(db, "wedding_rsvps"), {
      name: rsvpEntry.name,
      attending: rsvpEntry.attending,
      guestsCount: rsvpEntry.guestsCount,
      childSeatsCount: rsvpEntry.childSeatsCount,
      dietary: rsvpEntry.dietary,
      wishes: rsvpEntry.wishes,
      createdAt: serverTimestamp()
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    if (onRSVPSubmitted) {
      onRSVPSubmitted();
    }

  } catch (error) {
    console.error("Firebase error:", error);
    setErrorMess(
      `Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    setIsSubmitting(false);
  }
};
  const handleReset = () => {
    setFormData({
      name: '',
      attending: true,
      guestsCount: 1,
      childSeatsCount: 0,
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
                        {[1, 2].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Seat' : 'Seats'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4">
                      <label className="block text-xs uppercase tracking-widest text-[#4A4F3F] font-semibold mb-2 flex items-center gap-1.5">
                        <span className="text-xs">👶</span>
                        Accompanied by a child?
                      </label>
                      <select
                        value={formData.childSeatsCount}
                        onChange={(e) => setFormData({ ...formData, childSeatsCount: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-[#FFFDF9] text-[#4A4F3F] focus:outline-none focus:ring-1 focus:ring-sage-400 focus:border-sage-400 text-sm transition"
                      >
                        <option value={0}>No children</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <label className="block text-xs uppercase tracking-widest text-[#4A4F3F] font-semibold mb-2 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-sage-500" />
                        Dietary restrictions (Optional)
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

              {/* Wishes for the Couple */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#4A4F3F] font-semibold mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sage-500" />
                  Send a Sweet Note to the Couple (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.wishes}
                  onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  placeholder="e.g. Congratulations Torrence and Wilfred! Wishing you two eternal love and light, we are so excited..."
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-[#FFFDF9] text-[#4A4F3F] focus:outline-none focus:ring-1 focus:ring-sage-400 focus:border-sage-400 text-sm transition resize-none"
                />
              </div>

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
                    ? `Thank you, ${formData.name}. We have reserved ${formData.guestsCount} adult seat(s)${formData.childSeatsCount > 0 ? ` and ${formData.childSeatsCount} child seat(s)` : ''} for you at Naiposha Gardens, Tigoni. A confirmation reference has been synchronized.`
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

      {/* Confirm Attendance Pop up Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-hidden animate-fade-in"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#FAF8F5] border border-sage-300 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden text-center"
            >
              {/* Decorative gold background stamp */}
              <div className="absolute top-0 left-0 w-16 h-16 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="15" fill="#C5A059" />
                </svg>
              </div>

              <div className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💍</span>
              </div>

              <h4 className="font-serif text-[#4A4F3F] text-xl font-bold mb-2">
                Confirm Attendance
              </h4>
              
              <p className="text-xs text-sage-600 mb-6 font-sans">
                Please review and confirm your RSVP details below before sending.
              </p>

              <div className="bg-white border border-sage-100 rounded-2xl p-4 mb-6 text-left space-y-3 text-sm">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-sage-400 font-bold block mb-0.5">Name</span>
                  <span className="font-serif font-bold text-[#4A4F3F]">{formData.name}</span>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider text-sage-400 font-bold block mb-0.5">Response</span>
                  <span className={`font-semibold font-serif ${formData.attending ? 'text-sage-700' : 'text-rose-600'}`}>
                    {formData.attending ? "Joyfully Attending" : "Regretfully Declining"}
                  </span>
                </div>

                {formData.attending && (
                  <>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-sage-400 font-bold block mb-0.5">Reserved Seats</span>
                      <span className="font-serif font-medium text-[#4A4F3F]">{formData.guestsCount} Seat(s)</span>
                    </div>

                    {formData.childSeatsCount > 0 && (
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-sage-400 font-bold block mb-0.5">Accompanied Children</span>
                        <span className="font-serif font-medium text-[#4A4F3F]">{formData.childSeatsCount} Child Seat(s)</span>
                      </div>
                    )}
                    
                    {formData.dietary.trim() && (
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-sage-400 font-bold block mb-0.5">Dietary Restrictions</span>
                        <span className="text-xs text-[#5D634E] italic bg-[#FAF9F5] px-2 py-1 rounded inline-block mt-0.5">{formData.dietary}</span>
                      </div>
                    )}
                  </>
                )}

                {formData.wishes.trim() && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-sage-400 font-bold block mb-0.5">Wishes Note</span>
                    <span className="text-xs text-sage-600 italic block mt-0.5 line-clamp-2">"{formData.wishes}"</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 border border-sage-200 hover:bg-sage-50 rounded-xl text-xs font-semibold text-[#4A4F3F] cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="flex-1 py-3 bg-gradient-to-r from-sage-600 to-sage-500 hover:from-slide-400 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-md"
                >
                  Confirm & Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

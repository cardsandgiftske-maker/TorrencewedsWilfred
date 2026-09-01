import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Utensils, Users, Sparkles } from 'lucide-react';
import { db } from './firebase';

interface Allocation {
  name: string;
  tableNumber: number;
  seats: number;
}

export default function TableLookup() {
  const [code, setCode] = useState('');
  const [allocation, setAllocation] = useState<Allocation | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) return;

    setLoading(true);
    setError('');
    setAllocation(null);
    try {
      const snap = await getDoc(doc(db, 'table_allocations', normalized));
      if (!snap.exists()) {
        setError('We could not find that guest code. Please check it and try again.');
      } else {
        const data = snap.data();
        setAllocation({
          name: data.name || 'Guest',
          tableNumber: Number(data.tableNumber),
          seats: Number(data.seats || 1),
        });
      }
    } catch (err) {
      console.error(err);
      setError('We could not retrieve your table right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 bg-[#FAF9F6] border-b border-sage-100">
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.02] bg-[radial-gradient(circle_at_center,#8F9779_0,transparent_55%)]" />
      <div className="relative max-w-xl mx-auto px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mx-auto mb-4">
          <Utensils className="w-5 h-5 text-[#C5A059]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">Reception Seating</span>
        <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#4A4F3F] mt-1 mb-3">Find Your Table</h3>
        <p className="text-sm text-[#5D634E] leading-relaxed font-serif italic max-w-md mx-auto mb-7">
          Enter the guest code provided with your invitation to view your table allocation.
        </p>

        <form onSubmit={handleLookup} className="max-w-sm mx-auto flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. TW7K2P"
            maxLength={8}
            className="min-w-0 flex-1 px-4 py-3 rounded-xl border border-sage-200 bg-white text-center font-mono tracking-[0.18em] text-sm text-[#4A4F3F] uppercase focus:outline-none focus:ring-2 focus:ring-sage-300"
            aria-label="Guest table code"
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="px-5 py-3 rounded-xl bg-sage-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-sage-700 disabled:opacity-50 transition shadow-sm"
          >
            {loading ? 'Checking…' : <><Search className="inline w-4 h-4 mr-1 -mt-0.5" /> Find</>}
          </button>
        </form>

        {error && <p className="mt-4 text-xs text-rose-600 font-medium">{error}</p>}

        <AnimatePresence>
          {allocation && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-8 bg-white border border-sage-200 rounded-3xl p-7 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059] mx-auto mb-2" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-sage-500 font-bold">Welcome, {allocation.name}</p>
              <p className="font-serif text-sm text-[#5D634E] mt-4">Your table is</p>
              <div className="mx-auto my-4 w-28 h-28 rounded-full border-2 border-[#C5A059]/70 bg-[#FAF9F6] flex flex-col items-center justify-center shadow-inner">
                <span className="text-[9px] uppercase tracking-widest text-sage-500">Table</span>
                <span className="font-serif text-4xl font-bold text-[#4A4F3F]">{allocation.tableNumber}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-50 border border-sage-100 text-xs text-[#4A4F3F]">
                <Users className="w-3.5 h-3.5 text-sage-600" />
                {allocation.seats} {allocation.seats === 1 ? 'seat' : 'seats'} allocated
              </div>
              <p className="text-[11px] text-sage-500 mt-5">Please ask a member of the reception team if you need assistance.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  setDoc
} from "firebase/firestore";

import { db } from "./firebase";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Users, 
  UserCheck, 
  UserMinus, 
  Search, 
  Download, 
  Trash2, 
  UserPlus, 
  Sparkles, 
  X,
  LayoutGrid,
  Save,
  Copy,
  Pencil
} from 'lucide-react';
import { RSVP } from '../types';

interface AdminPanelProps {
  onClosed: () => void;
  triggerRefresh: () => void; // Maintained for parent component synchronization if needed
}

export default function AdminPanel({ onClosed, triggerRefresh }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Manual add guest form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    attending: true,
    guestsCount: 1,
    dietary: '',
    wishes: ''
  });

  const TABLE_COUNT = 24;
  const TABLE_CAPACITY = 11;
  const [savingTable, setSavingTable] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [editingGuest, setEditingGuest] = useState<RSVP | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    attending: true,
    guestsCount: 1,
    childSeatsCount: 0,
    dietary: '',
    wishes: ''
  });
  const [savingEdit, setSavingEdit] = useState(false);

  const generateGuestCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'TW';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  const getTableOccupancy = (tableNumber: number, excludingGuestId?: string) =>
    rsvps.reduce((total, guest) => {
      if (!guest.attending || guest.id === excludingGuestId || guest.tableNumber !== tableNumber) return total;
      return total + (guest.guestsCount || 0) + (guest.childSeatsCount || 0);
    }, 0);

  const handleAssignTable = async (guest: RSVP, tableValue: string) => {
    if (!tableValue) return;
    const tableNumber = Number(tableValue);
    const adultSeats = guest.attending ? (guest.guestsCount || 0) : 0;
    const childSeats = guest.attending ? (guest.childSeatsCount || 0) : 0;
    const seats = adultSeats + childSeats;
    if (!guest.attending) {
      alert('Only attending guests can be assigned a table.');
      return;
    }
    const occupied = getTableOccupancy(tableNumber, guest.id);
    if (occupied + seats > TABLE_CAPACITY) {
      alert(`Table ${tableNumber} only has ${TABLE_CAPACITY - occupied} seat(s) remaining.`);
      return;
    }

    setSavingTable(guest.id);
    try {
      const code = guest.tableCode || generateGuestCode();
      await updateDoc(doc(db, 'wedding_rsvps', guest.id), { tableNumber, tableCode: code });
      await setDoc(doc(db, 'table_allocations', code), {
        guestId: guest.id,
        name: guest.name,
        tableNumber,
        seats,
        adultSeats,
        childSeats,
        totalSeats: seats,
        code,
        updatedAt: serverTimestamp()
      });
      triggerRefresh();
    } catch (error) {
      console.error('Error assigning table:', error);
      alert('Failed to save the table allocation. Please try again.');
    } finally {
      setSavingTable(null);
    }
  };

  const handleRemoveTable = async (guest: RSVP) => {
    if (!guest.tableNumber) return;
    if (!window.confirm(`Remove ${guest.name} from Table ${guest.tableNumber}?`)) return;
    setSavingTable(guest.id);
    try {
      await updateDoc(doc(db, 'wedding_rsvps', guest.id), { tableNumber: null, tableCode: null });
      if (guest.tableCode) await deleteDoc(doc(db, 'table_allocations', guest.tableCode));
      triggerRefresh();
    } catch (error) {
      console.error('Error removing table:', error);
      alert('Failed to remove the table allocation.');
    } finally {
      setSavingTable(null);
    }
  };

  const copyGuestCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1800);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  // Real-time Firestore sync
  useEffect(() => {
    if (!isUnlocked) return;

    const unsubscribe = onSnapshot(
      collection(db, "wedding_rsvps"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const docData = doc.data();
          // Safely handle Firestore Timestamp vs fallback string strings for the export map
          const formattedDate = docData.createdAt?.toDate 
            ? docData.createdAt.toDate().toLocaleDateString() 
            : 'N/A';

          return {
            id: doc.id,
            ...docData,
            timestamp: formattedDate
          };
        }) as RSVP[];

        setRsvps(data);
      },
      (error) => {
        console.error("Firestore subscription error:", error);
      }
    );

    return () => unsubscribe();
  }, [isUnlocked]);

  const handleUnlock = () => {
    // Production secure check matching your dashboard credentials
    if (password === '2609' || password === '2026' || password === 'admin') {
      setIsUnlocked(true);
      setErrorMess(null);
    } else {
      setErrorMess("Incorrect access code.");
    }
  };

  const handleOpenEdit = (guest: RSVP) => {
    setEditingGuest(guest);
    setEditForm({
      name: guest.name || '',
      email: guest.email || '',
      attending: guest.attending,
      guestsCount: guest.guestsCount || 1,
      childSeatsCount: guest.childSeatsCount || 0,
      dietary: guest.dietary || '',
      wishes: guest.wishes || ''
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest || !editForm.name.trim()) return;

    const adultSeats = editForm.attending ? Math.max(1, Number(editForm.guestsCount) || 1) : 0;
    const childSeats = editForm.attending ? Math.max(0, Number(editForm.childSeatsCount) || 0) : 0;
    const totalSeats = adultSeats + childSeats;

    if (editForm.attending && editingGuest.tableNumber) {
      const occupied = getTableOccupancy(editingGuest.tableNumber, editingGuest.id);
      if (occupied + totalSeats > TABLE_CAPACITY) {
        alert(`Table ${editingGuest.tableNumber} does not have enough space for this updated RSVP. It has ${TABLE_CAPACITY - occupied} seat(s) available.`);
        return;
      }
    }

    setSavingEdit(true);
    try {
      await updateDoc(doc(db, 'wedding_rsvps', editingGuest.id), {
        name: editForm.name.trim(),
        email: editForm.email.trim() || null,
        attending: editForm.attending,
        guestsCount: adultSeats,
        childSeatsCount: childSeats,
        dietary: editForm.dietary.trim() || null,
        wishes: editForm.wishes.trim() || null
      });

      if (editingGuest.tableCode) {
        if (editForm.attending && editingGuest.tableNumber) {
          await setDoc(doc(db, 'table_allocations', editingGuest.tableCode), {
            guestId: editingGuest.id,
            name: editForm.name.trim(),
            tableNumber: editingGuest.tableNumber,
            seats: totalSeats,
            adultSeats,
            childSeats,
            totalSeats,
            code: editingGuest.tableCode,
            updatedAt: serverTimestamp()
          });
        } else {
          await deleteDoc(doc(db, 'table_allocations', editingGuest.tableCode));
          await updateDoc(doc(db, 'wedding_rsvps', editingGuest.id), { tableNumber: null, tableCode: null });
        }
      }

      setEditingGuest(null);
      triggerRefresh();
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert('Failed to update RSVP. Please try again.');
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete individual RSVP from Firestore
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this guest's response?")) {
      try {
        const guest = rsvps.find(r => r.id === id);
        await deleteDoc(doc(db, "wedding_rsvps", id));
        if (guest?.tableCode) {
          await deleteDoc(doc(db, "table_allocations", guest.tableCode));
        }
        triggerRefresh();
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete guest response. Please try again.");
      }
    }
  };

  // CSV export handler built directly from Firestore live data array
  const handleExportCSV = () => {
    if (rsvps.length === 0) return;

    const headers = ['Guest Name', 'Email', 'Attending', 'Guests Count', 'Children', 'Table', 'Guest Code', 'Dietary Restrictions', 'Congratulatory Messages', 'Date Submitted'];
    const rows = rsvps.map(r => [
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${r.email || ''}"`,
      r.attending ? 'YES' : 'NO',
      r.guestsCount || 0,
      r.childSeatsCount || 0,
      r.tableNumber || '',
      `"${r.tableCode || ''}"`,
      `"${(r.dietary || '').replace(/"/g, '""')}"`,
      `"${(r.wishes || '').replace(/"/g, '""')}"`,
      `"${r.timestamp || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Torrence_Wilfred_Wedding_RSVP_List.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Append new manual entry straight to your collection
  const handleAddManualGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;

    try {
      await addDoc(collection(db, "wedding_rsvps"), {
        name: newGuest.name.trim(),
        email: newGuest.email.trim() || null,
        attending: newGuest.attending,
        guestsCount: newGuest.attending ? newGuest.guestsCount : 0,
        childSeatsCount: 0,
        dietary: newGuest.dietary.trim() || null,
        wishes: newGuest.wishes.trim() || null,
        tableNumber: null,
        tableCode: null,
        createdAt: serverTimestamp()
      });

      setNewGuest({
        name: "",
        email: "",
        attending: true,
        guestsCount: 1,
        childSeatsCount: 0,
        dietary: "",
        wishes: ""
      });

      setShowAddForm(false);
      triggerRefresh();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save guest manually.");
    }
  };

  // Live KPI Metric Math
  const totalRSVPEntries = rsvps.length;
  const attendingRsvps = rsvps.filter(r => r.attending);
  const declinedRsvps = rsvps.filter(r => !r.attending);
  const totalAttendingSeats = attendingRsvps.reduce((acc, curr) => acc + (curr.guestsCount || 0), 0);
  const dietaryRestrictionsCount = rsvps.filter(r => r.dietary && r.dietary.toLowerCase() !== 'none').length;
  const accompaniedByKidsCount = attendingRsvps.filter(r => (r.childSeatsCount || 0) > 0).length;
  const totalChildren = attendingRsvps.reduce((acc, curr) => acc + (curr.childSeatsCount || 0), 0);

  const filteredRsvps = rsvps.filter(r => 
    (r.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (r.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-[#3B3E31]/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-sage-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header bar */}
        <div className="bg-sage-600 px-6 py-5 flex items-center justify-between text-white border-b border-sage-700">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-champagne-300" />
            <h3 className="font-serif font-semibold text-lg tracking-wide">
              Torrence & Wilfred — RSVP Couple's Lounge
            </h3>
          </div>
          <button 
            onClick={onClosed}
            className="p-1.5 rounded-full hover:bg-sage-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          /* ================= LOGIN DIALOG ================= */
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6 flex-1 py-16">
            <div className="w-14 h-14 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center shadow-inner">
              <Lock className="w-6 h-6 text-sage-600" />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#4A4F3F]">Secure Couple Access Only</h4>
              <p className="text-xs text-sage-600 font-sans">
                Review and coordinate submitted wedding guest seats. 
              </p>
            </div>

            <div className="w-full space-y-3">
              <input
                type="password"
                placeholder="Enter Access Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className="w-full text-center px-4 py-3 rounded-xl border border-sage-200 font-mono text-sm tracking-widest bg-sage-50/50 focus:outline-none focus:ring-1 focus:ring-sage-500"
                autoFocus
              />
              {errorMess && (
                <p className="text-xs text-rose-500 italic font-sans font-medium">
                  {errorMess}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={handleUnlock}
                className="w-full py-3 rounded-xl text-white font-serif tracking-widest text-xs uppercase bg-sage-600 hover:bg-sage-700 transition cursor-pointer font-semibold shadow-sm"
              >
                Verify Code
              </button>
            </div>
          </div>
        ) : (
          /* ================= UNLOCKED DASHBOARD ================= */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-sage-50/30">
            
            {/* KPI Metrics row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-default shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-[#4A4F3F]">{totalRSVPEntries}</span>
                  <span className="text-[10px] uppercase font-semibold text-sage-500 tracking-wider block">Total RSVPs</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-default shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-[#4A4F3F]">{totalAttendingSeats}</span>
                  <span className="text-[10px] uppercase font-semibold text-green-600 tracking-wider block">Attending Seats</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-default shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                  <UserMinus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-[#4A4F3F]">{declinedRsvps.length}</span>
                  <span className="text-[10px] uppercase font-semibold text-rose-500 tracking-wider block">Decliners</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-default shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-champagne-100 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-[#4A4F3F]">{dietaryRestrictionsCount}</span>
                  <span className="text-[10px] uppercase font-semibold text-[#8B7340] tracking-wider block">Dietary Needs</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-default shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <span className="text-lg">👶</span>
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-[#4A4F3F]">{accompaniedByKidsCount}</span>
                  <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-wider block">RSVPs With Kids</span>
                  <span className="text-[9px] text-sage-400 block">{totalChildren} children total</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Search bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-sage-100 shadow-xs">
              
              {/* Search query box */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  type="text"
                  placeholder="Search guests by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-sage-200 bg-[#FFFDF9] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sage-500 text-[#4A4F3F]"
                />
              </div>

              {/* Action buttons list */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto justify-end">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-1 px-3 py-2 bg-sage-50 border border-sage-200 text-xs text-sage-700 rounded-xl hover:bg-sage-100 transition cursor-pointer font-medium whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Add Guest
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={rsvps.length === 0}
                  className="flex items-center gap-1 px-3 py-2 bg-sage-600 text-[#FAF8F5] text-xs rounded-xl hover:bg-sage-700 transition cursor-pointer font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>

            </div>

            {/* Add manual guest drawer/form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.form
                  onSubmit={handleAddManualGuest}
                  className="bg-white p-5 rounded-2xl border-2 border-dashed border-sage-200 grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Guest Name</label>
                    <input
                      type="text"
                      required
                      value={newGuest.name}
                      onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                      placeholder="e.g. Sandra Nalisi"
                      className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Email (Optional)</label>
                    <input
                      type="text"
                      value={newGuest.email}
                      onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                      placeholder="e.g. sandra@gmail.com"
                      className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="col-span-1 flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Status</label>
                      <select
                        value={newGuest.attending ? 'yes' : 'no'}
                        onChange={(e) => setNewGuest({ ...newGuest, attending: e.target.value === 'yes' })}
                        className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs"
                      >
                        <option value="yes">Joyfully Attend</option>
                        <option value="no">Decline</option>
                      </select>
                    </div>
                    {newGuest.attending && (
                      <div className="w-16">
                        <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Seats</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={newGuest.guestsCount}
                          onChange={(e) => setNewGuest({ ...newGuest, guestsCount: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Dietary notes (Optional)</label>
                      <input
                        type="text"
                        value={newGuest.dietary}
                        onChange={(e) => setNewGuest({ ...newGuest, dietary: e.target.value })}
                        placeholder="e.g. Halal"
                        className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Note (Optional)</label>
                      <input
                        type="text"
                        value={newGuest.wishes}
                        onChange={(e) => setNewGuest({ ...newGuest, wishes: e.target.value })}
                        placeholder="Congra blessings..."
                        className="w-full px-3 py-2 border border-sage-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 flex justify-end gap-2 pt-1 border-t border-sage-100">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-1.5 border border-sage-200 text-[11px] font-semibold text-sage-600 rounded-lg hover:bg-sage-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-sage-600 text-[#FAF8F5] text-[11px] font-semibold rounded-lg hover:bg-sage-700"
                    >
                      Save Guest
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* ================= TABLE ALLOCATION OVERVIEW ================= */}
            <div className="bg-white rounded-2xl border border-sage-100 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-sage-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[#4A4F3F]">
                    <LayoutGrid className="w-4 h-4 text-[#C5A059]" />
                    <h4 className="font-serif text-lg font-semibold">Reception Table Allocation</h4>
                  </div>
                  <p className="text-[11px] text-sage-500 mt-1">24 restaurant tables · maximum 11 seats per table</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl font-bold text-[#4A4F3F]">{rsvps.filter(g => g.attending && g.tableNumber).reduce((n, g) => n + (g.guestsCount || 0), 0)}</span>
                  <span className="block text-[9px] uppercase tracking-wider text-sage-500">Allocated seats</span>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((tableNumber) => {
                  const occupied = getTableOccupancy(tableNumber);
                  const remaining = TABLE_CAPACITY - occupied;
                  const isFull = remaining === 0;
                  return (
                    <button key={tableNumber} type="button" onClick={() => setSelectedTable(tableNumber)} className={`w-full rounded-2xl border p-3 text-center cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition ${isFull ? 'border-[#C5A059]/60 bg-[#FBF7EB]' : 'border-sage-100 bg-[#FAF9F6]'}`}>
                      <div className={`mx-auto w-14 h-14 rounded-full border flex flex-col items-center justify-center ${isFull ? 'border-[#C5A059] bg-white' : 'border-sage-200 bg-white'}`}>
                        <span className="text-[8px] uppercase tracking-wider text-sage-500">Table</span>
                        <span className="font-serif text-lg font-bold text-[#4A4F3F]">{tableNumber}</span>
                      </div>
                      <p className="mt-2 text-[10px] font-bold text-[#4A4F3F]">{occupied}/{TABLE_CAPACITY} seats</p>
                      <p className={`text-[9px] mt-0.5 ${isFull ? 'text-[#8B7340]' : 'text-sage-500'}`}>{isFull ? 'FULL' : `${remaining} available`}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {selectedTable !== null && (() => {
                const tableGuests = rsvps.filter(g => g.attending && g.tableNumber === selectedTable);
                const occupied = getTableOccupancy(selectedTable);
                return (
                  <motion.div className="fixed inset-0 z-[70] bg-[#3B3E31]/60 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTable(null)}>
                    <motion.div className="bg-white w-full max-w-lg max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden" initial={{ y: 20, scale: 0.97 }} animate={{ y: 0, scale: 1 }} onClick={(e) => e.stopPropagation()}>
                      <div className="bg-sage-600 text-white px-6 py-5 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-champagne-300">Reception Seating</p>
                          <h4 className="font-serif text-2xl font-semibold">Table {selectedTable}</h4>
                          <p className="text-[10px] text-white/75 mt-1">{occupied}/{TABLE_CAPACITY} seats allocated</p>
                        </div>
                        <button type="button" onClick={() => setSelectedTable(null)} className="p-2 rounded-full hover:bg-sage-700"><X className="w-5 h-5" /></button>
                      </div>
                      <div className="p-5 overflow-y-auto max-h-[55vh]">
                        {tableGuests.length === 0 ? (
                          <div className="py-10 text-center">
                            <p className="font-serif text-lg text-[#4A4F3F]">No guests assigned</p>
                            <p className="text-xs text-sage-500 mt-1">This table currently has {TABLE_CAPACITY} seats available.</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {tableGuests.map(guest => (
                              <div key={guest.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-sage-100">
                                <div className="min-w-0">
                                  <p className="font-semibold text-sm text-[#4A4F3F]">{guest.name}</p>
                                  <p className="text-[10px] text-sage-500 mt-1">{guest.guestsCount || 0} adult seat(s){(guest.childSeatsCount || 0) > 0 ? ` · ${guest.childSeatsCount} child seat(s)` : ''}</p>
                                </div>
                                {guest.tableCode && <span className="font-mono text-[9px] tracking-widest px-2 py-1 rounded-lg border border-sage-200 bg-white">{guest.tableCode}</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            <AnimatePresence>
              {editingGuest && (
                <motion.div
                  className="fixed inset-0 z-[80] bg-[#3B3E31]/60 backdrop-blur-sm flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => !savingEdit && setEditingGuest(null)}
                >
                  <motion.form
                    onSubmit={handleSaveEdit}
                    className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto"
                    initial={{ y: 20, scale: 0.97 }}
                    animate={{ y: 0, scale: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-sage-600 text-white px-6 py-5 flex items-center justify-between sticky top-0 z-10">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-champagne-300">Manage RSVP</p>
                        <h4 className="font-serif text-2xl font-semibold">Edit Guest</h4>
                      </div>
                      <button type="button" onClick={() => setEditingGuest(null)} disabled={savingEdit} className="p-2 rounded-full hover:bg-sage-700 disabled:opacity-50">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-6 space-y-5">
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <p className="text-[11px] font-semibold text-amber-800">Use this to correct accidental RSVP selections.</p>
                        <p className="text-[10px] text-amber-700 mt-1">Changes are saved directly to the existing RSVP. The kids statistics and table occupancy will update automatically.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Guest Name</label>
                          <input required type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sage-400" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Email</label>
                          <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sage-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Attendance</label>
                          <select value={editForm.attending ? 'yes' : 'no'} onChange={(e) => setEditForm({ ...editForm, attending: e.target.value === 'yes' })} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-xs">
                            <option value="yes">Joyfully Attend</option>
                            <option value="no">Decline</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Adult Seats</label>
                          <input type="number" min={1} max={11} disabled={!editForm.attending} value={editForm.guestsCount} onChange={(e) => setEditForm({ ...editForm, guestsCount: Number(e.target.value) })} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-xs disabled:bg-sage-50 disabled:text-sage-300" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-amber-700 mb-1">Children Seats</label>
                          <input type="number" min={0} max={11} disabled={!editForm.attending} value={editForm.childSeatsCount} onChange={(e) => setEditForm({ ...editForm, childSeatsCount: Number(e.target.value) })} className="w-full px-3 py-2.5 border border-amber-200 rounded-xl text-xs bg-amber-50/40 disabled:bg-sage-50 disabled:text-sage-300" />
                        </div>
                      </div>

                      <div className="text-[10px] text-sage-500 bg-sage-50 rounded-xl px-3 py-2">
                        Total table seats for this guest: <strong className="text-[#4A4F3F]">{editForm.attending ? (Math.max(1, Number(editForm.guestsCount) || 1) + Math.max(0, Number(editForm.childSeatsCount) || 0)) : 0}</strong>
                        {editingGuest.tableNumber ? ` · Currently assigned to Table ${editingGuest.tableNumber}` : ' · No table assigned'}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Dietary Notes</label>
                          <input type="text" value={editForm.dietary} onChange={(e) => setEditForm({ ...editForm, dietary: e.target.value })} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#4A4F3F] mb-1">Wishes / Note</label>
                          <input type="text" value={editForm.wishes} onChange={(e) => setEditForm({ ...editForm, wishes: e.target.value })} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-sage-100 flex justify-end gap-2 sticky bottom-0 bg-white">
                      <button type="button" onClick={() => setEditingGuest(null)} disabled={savingEdit} className="px-4 py-2 rounded-xl border border-sage-200 text-xs font-semibold text-sage-600 hover:bg-sage-50 disabled:opacity-50">Cancel</button>
                      <button type="submit" disabled={savingEdit} className="px-5 py-2 rounded-xl bg-sage-600 text-white text-xs font-semibold hover:bg-sage-700 disabled:opacity-60 flex items-center gap-2">
                        <Save className="w-3.5 h-3.5" />
                        {savingEdit ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Guestlist Table */}
            <div className="bg-white rounded-2xl border border-sage-100 shadow-xs overflow-hidden">
              {filteredRsvps.length === 0 ? (
                <div className="p-12 text-center text-[#5D634E] space-y-2">
                  <p className="font-serif italic text-base">No registered wedding guests matched your keyword.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-sage-50 border-b border-sage-100 text-[#4A4F3F] text-[10px] uppercase tracking-wider font-semibold">
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Attendance</th>
                        <th className="p-4 text-center">Seats</th>
                        <th className="p-4 text-center">Kids</th>
                        <th className="p-4">Table</th>
                        <th className="p-4">Guest Code</th>
                        <th className="p-4">Dietary Notes</th>
                        <th className="p-4 max-w-sm">Wishes note</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sage-100 text-[#4A4F3F]">
                      {filteredRsvps.map((guest) => (
                        <tr key={guest.id} className="hover:bg-sage-50/40 transition">
                          <td className="p-4 font-semibold">{guest.name}</td>
                          <td className="p-4 text-sage-600 font-mono text-[11px]">{guest.email || <span className="text-sage-300">—</span>}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                              guest.attending 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-rose-50 text-rose-600 border border-rose-200'
                            }`}>
                              {guest.attending ? 'JOYFUL YES' : 'DECLINED'}
                            </span>
                          </td>
                          <td className="p-4 text-center font-bold font-mono">
                            {guest.attending ? guest.guestsCount : '—'}
                          </td>
                          <td className="p-4 text-center font-bold font-mono">
                            {guest.attending ? (guest.childSeatsCount || 0) : '—'}
                          </td>
                          <td className="p-4 min-w-[150px]">
                            {guest.attending ? (
                              <div className="flex items-center gap-1.5">
                                <select
                                  value={guest.tableNumber || ''}
                                  disabled={savingTable === guest.id}
                                  onChange={(e) => e.target.value ? handleAssignTable(guest, e.target.value) : handleRemoveTable(guest)}
                                  className="w-full px-2 py-1.5 rounded-lg border border-sage-200 bg-white text-[11px] text-[#4A4F3F] focus:outline-none focus:ring-1 focus:ring-sage-400"
                                >
                                  <option value="">Unassigned</option>
                                  {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((tableNumber) => {
                                    const occupied = getTableOccupancy(tableNumber, guest.id);
                                    const guestTotalSeats = (guest.guestsCount || 0) + (guest.childSeatsCount || 0);
                                    const allowed = occupied + guestTotalSeats <= TABLE_CAPACITY;
                                    return <option key={tableNumber} value={tableNumber} disabled={!allowed}>Table {tableNumber}{allowed ? ` (${TABLE_CAPACITY - occupied} free)` : ' (full)'}</option>;
                                  })}
                                </select>
                                {savingTable === guest.id && <Save className="w-3.5 h-3.5 text-sage-500 animate-pulse shrink-0" />}
                              </div>
                            ) : <span className="text-sage-300">—</span>}
                          </td>
                          <td className="p-4 min-w-[120px]">
                            {guest.tableCode ? (
                              <button onClick={() => copyGuestCode(guest.tableCode!)} title="Copy guest code" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-sage-200 font-mono text-[10px] font-bold tracking-widest text-[#4A4F3F] hover:bg-sage-50">
                                {copiedCode === guest.tableCode ? 'COPIED' : guest.tableCode}
                                <Copy className="w-3 h-3 text-sage-500" />
                              </button>
                            ) : <span className="text-sage-300 text-[10px]">Assign table first</span>}
                          </td>
                          <td className="p-4 italic text-sage-600 text-xs">
                            {guest.dietary && guest.dietary !== 'none' ? guest.dietary : <span className="text-sage-300">none</span>}
                          </td>
                          <td className="p-4 text-xs font-serif leading-relaxed text-[#4A4F3F]/80 max-w-xs truncate" title={guest.wishes}>
                            {guest.wishes || <span className="text-sage-300">—</span>}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenEdit(guest)}
                                className="p-1.5 rounded-lg border border-sage-200 text-sage-600 hover:bg-sage-50 transition cursor-pointer"
                                title="Edit RSVP"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(guest.id)}
                                className="p-1.5 rounded-lg border border-sage-200 text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                                title="Delete RSVP"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}

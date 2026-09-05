'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Plus, Minus, Search, Tag, DoorOpen } from 'lucide-react';
import { useBookingStore } from '@/stores/booking-store';

interface BookingSearchWidgetProps {
  variant?: 'default' | 'glass';
  className?: string;
}

export default function BookingSearchWidget({ variant = 'default', className = '' }: BookingSearchWidgetProps) {
  const router = useRouter();
  const searchParams = useBookingStore((state) => state.searchParams);
  
  // Local state for the widget form
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || '');
  const [adults, setAdults] = useState(searchParams.adults || 2);
  const [children, setChildren] = useState(searchParams.children || 0);
  const [rooms, setRooms] = useState(searchParams.rooms || 1);
  const [promoCode, setPromoCode] = useState(searchParams.promoCode || '');
  const [showPromo, setShowPromo] = useState(!!searchParams.promoCode);

  useEffect(() => {
    if (!checkIn) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setCheckIn(today.toISOString().split('T')[0]);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
    }
  }, [checkIn]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }
    
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
      ...(promoCode && { promoCode })
    });
    
    router.push(`/search?${query.toString()}`);
  };

  const isGlass = variant === 'glass';
  const containerClasses = isGlass
    ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl'
    : 'bg-white border border-gray-200 shadow-lg';

  const inputClasses = isGlass
    ? 'bg-transparent text-white placeholder-white/70 border-white/30 focus:border-white focus:ring-white'
    : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]';
    
  const textClasses = isGlass ? 'text-white' : 'text-gray-900';
  const labelClasses = isGlass ? 'text-white/80' : 'text-gray-500';

  return (
    <form onSubmit={handleSearch} className={`p-4 md:p-6 rounded-2xl ${containerClasses} ${className}`}>
      <div className="flex flex-col md:flex-row items-end gap-4">
        
        <div className="w-full md:w-auto flex-1">
          <label className={`block text-xs font-semibold mb-1 ${labelClasses} uppercase tracking-wider`}>Check-in</label>
          <div className="relative">
            <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isGlass ? 'text-white/70' : 'text-gray-400'}`} />
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${inputClasses}`}
              required
            />
          </div>
        </div>

        <div className="w-full md:w-auto flex-1">
          <label className={`block text-xs font-semibold mb-1 ${labelClasses} uppercase tracking-wider`}>Check-out</label>
          <div className="relative">
            <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isGlass ? 'text-white/70' : 'text-gray-400'}`} />
            <input
              type="date"
              min={checkIn || new Date().toISOString().split('T')[0]}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${inputClasses}`}
              required
            />
          </div>
        </div>

        <div className="w-full md:w-auto flex-1 flex gap-2">
          <div className="flex-1">
            <label className={`block text-xs font-semibold mb-1 ${labelClasses} uppercase tracking-wider`}>Guests</label>
            <div className={`flex items-center justify-between border rounded-lg px-3 py-2 h-[50px] ${inputClasses}`}>
              <Users className={`w-5 h-5 ${isGlass ? 'text-white/70' : 'text-gray-400'}`} />
              <div className="flex items-center gap-2">
                <span className={`font-medium ${textClasses}`}>{adults + children}</span>
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => setAdults(Math.min(6, adults + 1))} className="p-0.5 bg-gray-200/20 rounded hover:bg-gray-200/40"><Plus className="w-3 h-3" /></button>
                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="p-0.5 bg-gray-200/20 rounded hover:bg-gray-200/40"><Minus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className={`block text-xs font-semibold mb-1 ${labelClasses} uppercase tracking-wider`}>Rooms</label>
            <div className={`flex items-center justify-between border rounded-lg px-3 py-2 h-[50px] ${inputClasses}`}>
              <DoorOpen className={`w-5 h-5 ${isGlass ? 'text-white/70' : 'text-gray-400'}`} />
              <div className="flex items-center gap-2">
                <span className={`font-medium ${textClasses}`}>{rooms}</span>
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => setRooms(Math.min(5, rooms + 1))} className="p-0.5 bg-gray-200/20 rounded hover:bg-gray-200/40"><Plus className="w-3 h-3" /></button>
                  <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="p-0.5 bg-gray-200/20 rounded hover:bg-gray-200/40"><Minus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full md:w-auto bg-[#C9A96E] hover:bg-[#B5955C] text-white font-semibold py-3 px-8 rounded-lg h-[50px] flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          <Search className="w-5 h-5" />
          <span>CHECK AVAILABILITY</span>
        </button>
      </div>
      
      <div className="mt-4">
        {showPromo ? (
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <div className="relative flex-1">
              <Tag className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isGlass ? 'text-white/70' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none transition-all ${inputClasses}`}
              />
            </div>
            <button 
              type="button" 
              onClick={() => { setShowPromo(false); setPromoCode(''); }}
              className={`text-xs underline ${isGlass ? 'text-white/80' : 'text-gray-500'}`}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            onClick={() => setShowPromo(true)}
            className={`text-sm flex items-center gap-1 font-medium hover:underline ${isGlass ? 'text-white' : 'text-[#1B4D3E]'}`}
          >
            <Tag className="w-4 h-4" /> Have a promo code?
          </button>
        )}
      </div>
    </form>
  );
}

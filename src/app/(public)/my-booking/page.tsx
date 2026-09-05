"use client";

import { useState } from "react";
import { Search, Calendar, Users, Home, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function MyBookingPage() {
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !email) return;
    
    setIsSearching(true);
    // Simulate API search
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-[#1B4D3E] mb-4">Manage Your Booking</h1>
          <p className="text-gray-600">
            Enter your booking details below to view, modify, or cancel your reservation.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-[#1B4D3E] p-6 text-white text-center">
            <h2 className="text-xl font-medium text-[#C9A96E]">Find My Booking</h2>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Booking Reference Number *</label>
                <input 
                  required
                  type="text" 
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all uppercase"
                  placeholder="e.g. GVH84729"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address or Phone *</label>
                <input 
                  required
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all"
                  placeholder="Email or Phone used for booking"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSearching}
                className="w-full py-4 bg-[#C9A96E] text-white rounded font-medium hover:bg-[#B0925A] transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? "SEARCHING..." : (
                  <>FIND MY BOOKING <Search className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Area */}
        {hasSearched && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
              <div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1 w-fit mb-2">
                  <CheckCircle className="w-4 h-4" /> Confirmed
                </span>
                <h3 className="text-2xl font-serif text-[#1B4D3E]">Booking #{bookingId.toUpperCase() || "GVH84729"}</h3>
                <p className="text-gray-500 text-sm mt-1">Booked on Sep 1, 2026</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-gray-500 text-sm">Total Amount</p>
                <p className="text-2xl font-medium text-[#1B4D3E]">₹18,000</p>
                <p className="text-green-600 text-sm font-medium">Paid in full</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-[#C9A96E] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Premium Room</p>
                    <p className="text-sm text-gray-500">1 Room, Bed & Breakfast</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#C9A96E] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Guests</p>
                    <p className="text-sm text-gray-500">2 Adults, 0 Children</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#C9A96E] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Check-in</p>
                    <p className="text-sm text-gray-500">Fri, Oct 15, 2026 (From 14:00)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Check-out</p>
                    <p className="text-sm text-gray-500">Sun, Oct 17, 2026 (Until 12:00)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:hidden mb-8 border-t border-gray-100 pt-6">
               <p className="text-gray-500 text-sm">Total Amount</p>
               <p className="text-2xl font-medium text-[#1B4D3E]">₹18,000</p>
               <p className="text-green-600 text-sm font-medium">Paid in full</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-6">
              <button className="flex-1 py-2 text-[#1B4D3E] border border-[#1B4D3E] rounded hover:bg-[#1B4D3E]/5 transition-colors font-medium">
                Download Invoice
              </button>
              <button className="flex-1 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors font-medium">
                Cancel Booking
              </button>
            </div>
          </div>
        )}

        {/* Help Text */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Can't find your booking? <Link href="/contact" className="text-[#C9A96E] hover:underline">Contact our support team</Link>.
        </p>

      </div>
    </div>
  );
}

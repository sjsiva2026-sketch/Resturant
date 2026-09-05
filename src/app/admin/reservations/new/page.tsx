'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, UserPlus, Search, Calendar, CreditCard, Save } from 'lucide-react';

export default function NewReservationPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <Link href="/reservations" className="hover:text-emerald-700 flex items-center">
          <ChevronLeft size={16} className="mr-1" /> Back to Reservations
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Booking</h1>
          <p className="text-sm text-gray-500">Create a manual reservation</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-6 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 font-medium transition-colors">
            <Save size={18} className="mr-2" /> Create Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Stay Details */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
              <Calendar size={20} className="mr-2 text-emerald-700" /> Stay Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800">
                  <option>Walk-in</option>
                  <option>Phone</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Corporate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                <input type="number" min="1" defaultValue="1" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                <input type="number" min="0" defaultValue="0" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800">
                  <option value="">Select Room Type...</option>
                  <option>Standard Room (3 Available)</option>
                  <option>Deluxe Suite (1 Available)</option>
                  <option>Family Room (0 Available)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate Plan</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800">
                  <option>Standard Rate (Room Only)</option>
                  <option>Bed & Breakfast</option>
                  <option>Half Board</option>
                </select>
              </div>
            </div>
          </div>

          {/* Guest Details */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <UserPlus size={20} className="mr-2 text-emerald-700" /> Guest Details
              </h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search existing guest..." className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address / Notes</label>
              <textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800"></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Summary & Payment */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
              <CreditCard size={20} className="mr-2 text-emerald-700" /> Summary
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4 text-center text-gray-500 text-sm border border-dashed border-gray-300">
              Select stay dates and room type to see price calculation.
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800">
                  <option>Pay Later (at Check-in)</option>
                  <option>Cash</option>
                  <option>Credit/Debit Card</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Amount Received</label>
                <input type="number" placeholder="₹0.00" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
              </div>
            </div>

            <button className="w-full mt-6 bg-emerald-800 text-white py-3 rounded-md hover:bg-emerald-700 transition-colors font-bold text-lg shadow-sm">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

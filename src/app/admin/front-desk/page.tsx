'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, LogIn, LogOut, BedDouble, UserPlus, History, Clock } from 'lucide-react';

export default function FrontDeskPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Front Desk</h1>
          <p className="text-sm text-gray-500">Operational overview for today</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
            <UserPlus size={16} className="mr-2" /> Walk-in Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-t-4 border-t-blue-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">Today's Arrivals</h3>
            <LogIn className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">8</p>
          <p className="text-sm text-gray-500">3 Checked-in • 5 Pending</p>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-t-4 border-t-orange-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">Today's Departures</h3>
            <LogOut className="text-orange-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
          <p className="text-sm text-gray-500">4 Checked-out • 2 Pending</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-t-4 border-t-emerald-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">In-House</h3>
            <BedDouble className="text-emerald-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">24</p>
          <p className="text-sm text-gray-500">Occupied Rooms</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-t-4 border-t-purple-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">Available</h3>
            <BedDouble className="text-purple-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
          <p className="text-sm text-gray-500">Ready to assign</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <LogIn className="mr-2 text-blue-500" size={20} /> Pending Arrivals (5)
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">John Doe {i}</p>
                  <p className="text-sm text-gray-500">BKG-00{i} • Deluxe Room</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100">
                  Check In
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <LogOut className="mr-2 text-orange-500" size={20} /> Pending Departures (2)
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[4, 5].map((i) => (
              <div key={i} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">Jane Smith {i}</p>
                  <p className="text-sm text-gray-500">Room 20{i} • Balance: ₹0</p>
                </div>
                <button className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-md text-sm font-medium hover:bg-orange-100">
                  Check Out
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

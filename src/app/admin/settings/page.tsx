'use client';
import React from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hotel Settings</h1>
        <p className="text-sm text-gray-500">Configure global hotel properties and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
              <input type="text" defaultValue="Grand Vista Hotel" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" defaultValue="Experience Luxury and Comfort" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors">
              <Save size={16} className="mr-2" /> Save Section
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Booking Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-In Time</label>
              <input type="time" defaultValue="14:00" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out Time</label>
              <input type="time" defaultValue="11:00" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Advance Booking (Days)</label>
              <input type="number" defaultValue="365" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors">
              <Save size={16} className="mr-2" /> Save Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

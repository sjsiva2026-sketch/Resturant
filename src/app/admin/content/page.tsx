'use client';
import React, { useState } from 'react';
import { Save, Eye } from 'lucide-react';

const TABS = ['Hero Section', 'About Us', 'Facilities', 'Policies'];

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('Hero Section');

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-sm text-gray-500">Edit website copy and information</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Eye size={16} className="mr-2" /> Preview Website
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 shrink-0">
          <nav className="flex flex-row md:flex-col p-2 gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-3 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">{activeTab}</h2>
          
          {activeTab === 'Hero Section' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                <input type="text" defaultValue="Experience Luxury at Grand Vista" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800" />
                <p className="text-xs text-gray-500 mt-1">Main title displayed on the homepage banner.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
                <textarea rows={2} defaultValue="Discover the perfect blend of modern comfort and natural beauty in the heart of the city." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Call to Action Button Text</label>
                <input type="text" defaultValue="Book Your Stay" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-800 focus:border-emerald-800 max-w-sm" />
              </div>
              
              <div className="pt-4 border-t border-gray-200 mt-6 flex justify-end">
                <button className="inline-flex items-center px-6 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 font-medium transition-colors">
                  <Save size={18} className="mr-2" /> Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab !== 'Hero Section' && (
            <div className="text-center py-12 text-gray-500">
              Settings for {activeTab} go here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

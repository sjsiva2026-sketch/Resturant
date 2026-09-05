'use client';
import React, { useState } from 'react';
import { Upload, Trash2, Move } from 'lucide-react';

const CATEGORIES = ['All', 'Rooms', 'Hotel Exterior', 'Restaurant', 'Pool', 'Events'];

const IMAGES = [
  { id: 1, category: 'Rooms', alt: 'Deluxe Room View', color: 'from-blue-200 to-blue-400' },
  { id: 2, category: 'Hotel Exterior', alt: 'Front Facade', color: 'from-emerald-200 to-emerald-400' },
  { id: 3, category: 'Pool', alt: 'Swimming Pool at Night', color: 'from-cyan-200 to-cyan-400' },
  { id: 4, category: 'Restaurant', alt: 'Fine Dining Area', color: 'from-amber-200 to-amber-400' },
  { id: 5, category: 'Rooms', alt: 'Premium Suite Bathroom', color: 'from-purple-200 to-purple-400' },
  { id: 6, category: 'Events', alt: 'Banquet Hall Setup', color: 'from-rose-200 to-rose-400' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-sm text-gray-500">Manage images displayed on the website</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 border-dashed p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <Upload className="text-emerald-700" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Upload New Images</h3>
        <p className="text-sm text-gray-500 mb-4">Drag and drop images here, or click to browse</p>
        <button className="px-6 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 font-medium transition-colors">
          Select Files
        </button>
        <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WEBP up to 5MB</p>
      </div>

      <div>
        <div className="flex overflow-x-auto gap-2 pb-4 mb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGES.filter(img => activeCategory === 'All' || img.category === activeCategory).map(img => (
            <div key={img.id} className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className={`aspect-video w-full bg-gradient-to-br ${img.color} flex items-center justify-center p-4`}>
                <span className="text-white font-bold opacity-70 text-center drop-shadow-md">{img.alt}</span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{img.alt}</p>
                <p className="text-xs text-gray-500">{img.category}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-white text-gray-700 rounded-md shadow hover:text-blue-600" title="Move">
                  <Move size={14} />
                </button>
                <button className="p-1.5 bg-white text-red-600 rounded-md shadow hover:bg-red-50" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

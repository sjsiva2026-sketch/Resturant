'use client';
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const OFFERS = [
  { id: 1, title: 'Summer Special Retreat', discount: '20% OFF', validUntil: 'Aug 31, 2024', promoCode: 'SUMMER20', status: 'Active' },
  { id: 2, title: 'Early Bird Discount', discount: '15% OFF', validUntil: 'Dec 31, 2024', promoCode: 'EARLY15', status: 'Active' },
  { id: 3, title: 'Weekend Getaway', discount: '10% OFF', validUntil: 'Jun 30, 2024', promoCode: 'WKND10', status: 'Inactive' },
];

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers & Promotions</h1>
          <p className="text-sm text-gray-500">Manage special offers displayed on the website</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
          <Plus size={16} className="mr-2" /> Create Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFERS.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 bg-gray-100 relative">
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded text-xs font-bold bg-white text-emerald-800 shadow-sm">
                {offer.promoCode}
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="font-bold text-white text-lg leading-tight">{offer.title}</h3>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-emerald-700">{offer.discount}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {offer.status}
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-gray-500 mb-4">Valid until: {offer.validUntil}</p>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">
                    <Edit size={16} className="mr-2" /> Edit
                  </button>
                  <button className="flex-1 flex justify-center items-center py-2 border border-red-200 rounded-md text-red-600 hover:bg-red-50 text-sm font-medium transition-colors">
                    <Trash2 size={16} className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

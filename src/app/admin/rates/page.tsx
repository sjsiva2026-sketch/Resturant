'use client';
import React from 'react';
import { Plus, Calendar as CalendarIcon, Settings, Edit, Trash2 } from 'lucide-react';

const RATE_PLANS = [
  {
    roomType: 'Standard Room',
    plans: [
      { id: 1, name: 'Room Only (RO)', rate: '₹4,000', refundable: false, meals: 'None', minStay: 1 },
      { id: 2, name: 'Bed & Breakfast (BB)', rate: '₹4,800', refundable: true, meals: 'Breakfast', minStay: 1 },
    ]
  },
  {
    roomType: 'Deluxe Room',
    plans: [
      { id: 3, name: 'Room Only (RO)', rate: '₹6,500', refundable: false, meals: 'None', minStay: 1 },
      { id: 4, name: 'Bed & Breakfast (BB)', rate: '₹7,500', refundable: true, meals: 'Breakfast', minStay: 1 },
      { id: 5, name: 'Half Board (HB)', rate: '₹8,500', refundable: true, meals: 'Breakfast + Dinner', minStay: 2 },
    ]
  }
];

export default function RatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rates & Inventory</h1>
          <p className="text-sm text-gray-500">Manage rate plans and pricing rules</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <CalendarIcon size={16} className="mr-2" /> Rate Calendar
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
            <Plus size={16} className="mr-2" /> New Rate Plan
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {RATE_PLANS.map((group, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">{group.roomType}</h2>
              <button className="text-emerald-700 text-sm font-medium hover:text-emerald-800 flex items-center">
                <Settings size={16} className="mr-1" /> Manage Base Rates
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">Rate Plan Name</th>
                    <th className="px-6 py-3 font-medium">Base Rate</th>
                    <th className="px-6 py-3 font-medium">Meals Included</th>
                    <th className="px-6 py-3 font-medium">Policy</th>
                    <th className="px-6 py-3 font-medium">Min. Stay</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {group.plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{plan.rate}</td>
                      <td className="px-6 py-4 text-gray-600">{plan.meals}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          plan.refundable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {plan.refundable ? 'Refundable' : 'Non-Refundable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{plan.minStay} Night(s)</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                          <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

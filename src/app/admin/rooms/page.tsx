'use client';
import React, { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const ROOM_TYPES = [
  { id: 1, name: 'Standard Room', code: 'STD', basePrice: '₹4,000', count: 15, maxGuests: 2, status: 'Active' },
  { id: 2, name: 'Deluxe Room', code: 'DLX', basePrice: '₹6,500', count: 10, maxGuests: 3, status: 'Active' },
  { id: 3, name: 'Premium Suite', code: 'STE', basePrice: '₹12,000', count: 5, maxGuests: 4, status: 'Active' },
];

const PHYSICAL_ROOMS = [
  { id: '101', type: 'Standard Room', floor: '1st Floor', status: 'Clean', condition: 'Good' },
  { id: '102', type: 'Standard Room', floor: '1st Floor', status: 'Occupied', condition: 'Good' },
  { id: '103', type: 'Deluxe Room', floor: '1st Floor', status: 'Dirty', condition: 'Good' },
  { id: '201', type: 'Premium Suite', floor: '2nd Floor', status: 'Clean', condition: 'Good' },
  { id: '202', type: 'Deluxe Room', floor: '2nd Floor', status: 'Maintenance', condition: 'AC Issue' },
];

export default function RoomsPage() {
  const [activeTab, setActiveTab] = useState<'types' | 'rooms'>('types');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rooms Management</h1>
          <p className="text-sm text-gray-500">Manage room types and physical inventory</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'types' ? (
            <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
              <Plus size={16} className="mr-2" /> Add Room Type
            </button>
          ) : (
            <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
              <Plus size={16} className="mr-2" /> Add Room
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('types')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
              activeTab === 'types' ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Room Types
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
              activeTab === 'rooms' ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-800' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Physical Rooms
          </button>
        </div>

        {activeTab === 'types' && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium">Room Type</th>
                    <th className="px-6 py-4 font-medium">Code</th>
                    <th className="px-6 py-4 font-medium">Base Price</th>
                    <th className="px-6 py-4 font-medium">Total Rooms</th>
                    <th className="px-6 py-4 font-medium">Max Guests</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ROOM_TYPES.map((type) => (
                    <tr key={type.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{type.name}</td>
                      <td className="px-6 py-4 text-gray-500">{type.code}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{type.basePrice}</td>
                      <td className="px-6 py-4 text-gray-500">{type.count} Rooms</td>
                      <td className="px-6 py-4 text-gray-500">{type.maxGuests} Persons</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center w-max">
                          <CheckCircle size={12} className="mr-1" /> {type.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                          <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div>
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative w-full sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search room number..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-emerald-800 focus:border-emerald-800"
                />
              </div>
              <div className="flex gap-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <option>All Floors</option>
                  <option>1st Floor</option>
                  <option>2nd Floor</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
                  <option>All Statuses</option>
                  <option>Clean</option>
                  <option>Dirty</option>
                  <option>Occupied</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium">Room #</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Floor</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Condition</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PHYSICAL_ROOMS.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-gray-900">{room.id}</td>
                      <td className="px-6 py-4 text-gray-600">{room.type}</td>
                      <td className="px-6 py-4 text-gray-500">{room.floor}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium w-max inline-block ${
                          room.status === 'Clean' ? 'bg-green-100 text-green-700' :
                          room.status === 'Dirty' ? 'bg-orange-100 text-orange-700' :
                          room.status === 'Occupied' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{room.condition}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

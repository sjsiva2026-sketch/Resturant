'use client';
import React from 'react';
import { Filter, User } from 'lucide-react';

const COLUMNS = [
  { id: 'dirty', title: 'Dirty', color: 'border-t-orange-500', count: 4 },
  { id: 'cleaning', title: 'Cleaning', color: 'border-t-blue-500', count: 2 },
  { id: 'clean', title: 'Clean (Uninspected)', color: 'border-t-yellow-500', count: 3 },
  { id: 'inspected', title: 'Ready / Inspected', color: 'border-t-green-500', count: 12 },
];

const ROOMS = [
  { id: '101', type: 'Standard', status: 'dirty', time: '2 hrs ago', assignee: null },
  { id: '102', type: 'Deluxe', status: 'dirty', time: '1 hr ago', assignee: 'Maria' },
  { id: '205', type: 'Suite', status: 'cleaning', time: '30 mins ago', assignee: 'Raj' },
  { id: '206', type: 'Standard', status: 'clean', time: '10 mins ago', assignee: 'Raj' },
];

export default function HousekeepingPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Housekeeping Board</h1>
          <p className="text-sm text-gray-500">Drag and drop to update room status</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
            <option>All Floors</option>
            <option>1st Floor</option>
            <option>2nd Floor</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Filter size={16} className="mr-2" /> More Filters
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
        {COLUMNS.map((col) => (
          <div key={col.id} className={`bg-gray-100 rounded-lg border border-gray-200 flex flex-col overflow-hidden border-t-4 ${col.color}`}>
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center font-bold text-gray-700 shrink-0">
              {col.title}
              <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{col.count}</span>
            </div>
            <div className="p-2 flex-1 overflow-y-auto space-y-3">
              {ROOMS.filter(r => r.status === col.id).map(room => (
                <div key={room.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-grab hover:border-emerald-500 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-lg text-gray-900">{room.id}</span>
                    <span className="text-xs text-gray-500">{room.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{room.type}</p>
                  <div className="flex justify-between items-center">
                    {room.assignee ? (
                      <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        <User size={12} className="mr-1" /> {room.assignee}
                      </div>
                    ) : (
                      <button className="text-xs text-blue-600 hover:underline">Assign Staff</button>
                    )}
                    <select className="text-xs border-gray-300 rounded py-1 pl-2 pr-6">
                      <option value="">Move to...</option>
                      {COLUMNS.filter(c => c.id !== col.id).map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

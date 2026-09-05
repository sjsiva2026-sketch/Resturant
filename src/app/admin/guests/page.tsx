'use client';
import React from 'react';
import Link from 'next/link';
import { Search, Download, Eye, ExternalLink } from 'lucide-react';

const MOCK_GUESTS = [
  { id: 'G-001', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98765 43210', totalStays: 4, totalSpent: '₹45,000', lastStay: '2023-09-15' },
  { id: 'G-002', name: 'Priya Patel', email: 'priya.p@example.com', phone: '+91 98765 43211', totalStays: 1, totalSpent: '₹4,200', lastStay: '2023-10-01' },
  { id: 'G-003', name: 'Amit Kumar', email: 'amitk@example.com', phone: '+91 98765 43212', totalStays: 2, totalSpent: '₹15,800', lastStay: '2023-08-20' },
  { id: 'G-004', name: 'Neha Gupta', email: 'ngupta@example.com', phone: '+91 98765 43213', totalStays: 7, totalSpent: '₹112,000', lastStay: '2023-10-10' },
];

export default function GuestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guest Directory</h1>
          <p className="text-sm text-gray-500">Manage all guest profiles and history</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Download size={16} className="mr-2" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-emerald-800 focus:border-emerald-800"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-medium">Guest Name</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Total Stays</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Last Stay</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_GUESTS.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    <Link href={`/guests/${guest.id}`} className="hover:text-emerald-700">
                      {guest.name}
                    </Link>
                    <div className="text-xs text-gray-500 font-normal mt-0.5">{guest.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{guest.phone}</div>
                    <div className="text-xs text-gray-500">{guest.email}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{guest.totalStays}</td>
                  <td className="px-6 py-4 font-medium text-emerald-700">{guest.totalSpent}</td>
                  <td className="px-6 py-4 text-gray-500">{guest.lastStay}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/guests/${guest.id}`} className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800">
                      View Profile <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

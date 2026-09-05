'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, Download, MoreVertical, Eye, Edit, Ban, LogIn, Calendar } from 'lucide-react';

const TABS = ['All', 'Upcoming', 'Today', 'In-House', 'Completed', 'Cancelled'];

const MOCK_RESERVATIONS = [
  { id: 'BKG-001', guest: 'Rahul Sharma', phone: '+91 98765 43210', room: 'Deluxe Suite', checkIn: '2023-10-15', checkOut: '2023-10-18', guests: '2, 0', amount: '₹12,500', payment: 'Paid', status: 'Confirmed', source: 'Website' },
  { id: 'BKG-002', guest: 'Priya Patel', phone: '+91 98765 43211', room: 'Standard Room', checkIn: '2023-10-16', checkOut: '2023-10-19', guests: '1, 0', amount: '₹4,200', payment: 'Partial', status: 'Pending', source: 'Booking.com' },
  { id: 'BKG-003', guest: 'Amit Kumar', phone: '+91 98765 43212', room: 'Family Room', checkIn: '2023-10-12', checkOut: '2023-10-15', guests: '2, 2', amount: '₹8,900', payment: 'Paid', status: 'Checked In', source: 'Walk-in' },
  { id: 'BKG-004', guest: 'Neha Gupta', phone: '+91 98765 43213', room: 'Premium Suite', checkIn: '2023-10-10', checkOut: '2023-10-12', guests: '2, 0', amount: '₹15,000', payment: 'Paid', status: 'Completed', source: 'Corporate' },
  { id: 'BKG-005', guest: 'Vikram Singh', phone: '+91 98765 43214', room: 'Standard Room', checkIn: '2023-10-20', checkOut: '2023-10-22', guests: '2, 0', amount: '₹4,200', payment: 'Refunded', status: 'Cancelled', source: 'Website' },
];

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-sm text-gray-500">Manage all your hotel bookings</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Download size={16} className="mr-2" /> Export
          </button>
          <Link href="/reservations/new" className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
            <Plus size={16} className="mr-2" /> New Booking
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-8 px-5" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-emerald-700 text-emerald-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-200">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, guest name, phone..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-emerald-800 focus:border-emerald-800"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
              <Calendar size={16} className="mr-2" /> Date Range
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
              <Filter size={16} className="mr-2" /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Guest Info</th>
                <th className="px-5 py-3 font-medium">Room Type</th>
                <th className="px-5 py-3 font-medium">Stay Dates</th>
                <th className="px-5 py-3 font-medium">Amount/Payment</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RESERVATIONS.map((res, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-emerald-700">
                    <Link href={`/reservations/${res.id}`}>{res.id}</Link>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{res.guest}</div>
                    <div className="text-xs text-gray-500">{res.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <div>{res.room}</div>
                    <div className="text-xs text-gray-400">Source: {res.source}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <div>In: {res.checkIn}</div>
                    <div>Out: {res.checkOut}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{res.amount}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      res.payment === 'Paid' ? 'bg-green-100 text-green-700' :
                      res.payment === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {res.payment}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      res.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      res.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      res.status === 'Checked In' ? 'bg-blue-100 text-blue-700' :
                      res.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/reservations/${res.id}`} className="p-1.5 text-gray-400 hover:text-emerald-700 rounded-md hover:bg-emerald-50" title="View">
                        <Eye size={16} />
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-blue-700 rounded-md hover:bg-blue-50" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing 1 to 5 of 156 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-emerald-50 text-emerald-700 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

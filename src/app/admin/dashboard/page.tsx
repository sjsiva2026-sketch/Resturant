'use client';
import React from 'react';
import { IndianRupee, Users, BedDouble, Calendar, ArrowUpRight, ArrowDownRight, Clock, Plus } from 'lucide-react';

const STATS = [
  { name: "Today's Revenue", value: "₹32,450", trend: "+12.5%", positive: true, icon: IndianRupee },
  { name: "Monthly Revenue", value: "₹4,56,780", trend: "+8.2%", positive: true, icon: IndianRupee },
  { name: "Today's Bookings", value: "3", trend: "-2", positive: false, icon: Calendar },
  { name: "Total Reservations", value: "156", trend: "+15", positive: true, icon: Calendar },
  { name: "Occupancy Rate", value: "75%", trend: "+5%", positive: true, icon: Users },
  { name: "Available Rooms", value: "12", trend: "Normal", positive: true, icon: BedDouble },
  { name: "Today's Arrivals", value: "8", trend: "", positive: true, icon: ArrowDownRight },
  { name: "Today's Departures", value: "6", trend: "", positive: true, icon: ArrowUpRight },
];

const RECENT_BOOKINGS = [
  { id: 'BKG-001', guest: 'Rahul Sharma', room: 'Deluxe Suite', checkIn: 'Today', status: 'Confirmed', amount: '₹12,500' },
  { id: 'BKG-002', guest: 'Priya Patel', room: 'Standard Room', checkIn: 'Tomorrow', status: 'Pending', amount: '₹4,200' },
  { id: 'BKG-003', guest: 'Amit Kumar', room: 'Family Room', checkIn: 'Today', status: 'Checked In', amount: '₹8,900' },
  { id: 'BKG-004', guest: 'Neha Gupta', room: 'Premium Suite', checkIn: 'Oct 15', status: 'Confirmed', amount: '₹15,000' },
  { id: 'BKG-005', guest: 'Vikram Singh', room: 'Standard Room', checkIn: 'Oct 16', status: 'Cancelled', amount: '₹4,200' },
];

export default function Dashboard() {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
            <Plus size={16} className="mr-2" /> New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                <stat.icon size={20} />
              </div>
              {stat.trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded text-gray-400">
            [Chart Placeholder - Line/Area]
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Room Status</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded text-gray-400">
            [Chart Placeholder - Donut]
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
          <button className="text-sm text-emerald-700 font-medium hover:text-emerald-800">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Guest Name</th>
                <th className="px-5 py-3 font-medium">Room Type</th>
                <th className="px-5 py-3 font-medium">Check In</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((booking, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-emerald-700">{booking.id}</td>
                  <td className="px-5 py-3 text-gray-900">{booking.guest}</td>
                  <td className="px-5 py-3 text-gray-500">{booking.room}</td>
                  <td className="px-5 py-3 text-gray-500">{booking.checkIn}</td>
                  <td className="px-5 py-3 text-gray-900">{booking.amount}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      booking.status === 'Checked In' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status}
                    </span>
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

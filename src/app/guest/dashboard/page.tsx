import { CalendarDays, Key, MapPin, Clock, User } from 'lucide-react';
import Link from 'next/link';

export default function GuestDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's an overview of your stays with Grand Vista Hotel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1B4D3E]/10 rounded-full flex items-center justify-center text-[#1B4D3E]">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Stays</p>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-full flex items-center justify-center text-[#C9A96E]">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Upcoming</p>
            <p className="text-2xl font-bold text-gray-900">1</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B4D3E] to-[#2a6d59] p-6 rounded-xl shadow-sm text-white flex flex-col justify-center">
          <p className="text-sm text-gray-200 font-medium mb-1">Loyalty Tier</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#C9A96E]">Gold Member</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Stay</h2>
          
          {/* Upcoming Booking Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gray-200 relative">
              <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Room" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-[#1B4D3E]">
                Confirmed
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Premium Ocean View Suite</h3>
                  <p className="text-gray-500 text-sm mt-1">Booking ID: GVH-A7X9</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#C9A96E]" />
                  Oct 15 - Oct 18, 2026
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C9A96E]" />
                  2 Adults
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A96E]" />
                  Check-in 3:00 PM
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link href="/dashboard/bookings" className="px-4 py-2 bg-[#1B4D3E] text-white text-sm font-medium rounded-lg hover:bg-[#1B4D3E]/90 transition text-center flex-1">
                  Manage Booking
                </Link>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                  View Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-2">
            <Link href="/" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition">
              <span className="font-medium text-gray-700 group-hover:text-[#1B4D3E]">Book a New Stay</span>
              <CalendarDays className="w-5 h-5 text-gray-400 group-hover:text-[#C9A96E]" />
            </Link>
            <Link href="/dashboard/profile" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition">
              <span className="font-medium text-gray-700 group-hover:text-[#1B4D3E]">Update Profile</span>
              <User className="w-5 h-5 text-gray-400 group-hover:text-[#C9A96E]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

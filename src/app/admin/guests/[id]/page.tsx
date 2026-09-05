'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, User, Mail, Phone, MapPin, Edit, Calendar, IndianRupee } from 'lucide-react';

export default function GuestProfilePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <Link href="/guests" className="hover:text-emerald-700 flex items-center">
          <ChevronLeft size={16} className="mr-1" /> Back to Guests
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guest Profile</h1>
          <p className="text-sm text-gray-500">{id}</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
          <Edit size={16} className="mr-2" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              RS
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Rahul Sharma</h2>
            <p className="text-sm text-gray-500 mb-4">VIP Guest (Since Jan 2022)</p>
            
            <div className="space-y-3 text-left border-t border-gray-100 pt-4">
              <div className="flex items-center text-sm">
                <Phone size={16} className="text-gray-400 mr-3 w-5" />
                <span className="text-gray-900">+91 98765 43210</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail size={16} className="text-gray-400 mr-3 w-5" />
                <span className="text-gray-900">rahul.sharma@example.com</span>
              </div>
              <div className="flex items-start text-sm">
                <MapPin size={16} className="text-gray-400 mr-3 w-5 mt-0.5" />
                <span className="text-gray-900">123 MG Road, Bangalore,<br/>KA, India 560001</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Internal Notes</h3>
            <textarea 
              className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-emerald-800 focus:border-emerald-800" 
              rows={4} 
              defaultValue="Prefers high floor rooms away from the elevator. Vegan diet requirement for breakfast. Late checkout usually requested."
            ></textarea>
            <button className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
              Update Notes
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-full">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Stays</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-purple-50 text-purple-700 rounded-full">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Nights</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-full">
                <IndianRupee size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spend</p>
                <p className="text-2xl font-bold text-gray-900">₹45,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Booking History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium">Booking ID</th>
                    <th className="px-6 py-3 font-medium">Dates</th>
                    <th className="px-6 py-3 font-medium">Room</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-emerald-700"><Link href="/reservations/BKG-001">BKG-001</Link></td>
                    <td className="px-6 py-4 text-gray-600">15 Oct 23 - 18 Oct 23</td>
                    <td className="px-6 py-4 text-gray-600">Deluxe Suite</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₹12,500</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Confirmed</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-emerald-700"><Link href="/reservations/BKG-984">BKG-984</Link></td>
                    <td className="px-6 py-4 text-gray-600">01 Sep 23 - 05 Sep 23</td>
                    <td className="px-6 py-4 text-gray-600">Premium Suite</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₹20,000</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

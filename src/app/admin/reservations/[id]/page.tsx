'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Printer, Mail, Edit, Ban, LogIn, User, Phone, Mail as MailIcon, MapPin, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';

export default function ReservationDetail() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <Link href="/reservations" className="hover:text-emerald-700 flex items-center">
          <ChevronLeft size={16} className="mr-1" /> Back to Reservations
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{id}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Confirmed
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Printer size={16} className="mr-2" /> Print
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Mail size={16} className="mr-2" /> Email
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Edit size={16} className="mr-2" /> Modify
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 text-red-600 rounded-md hover:bg-red-50 text-sm font-medium transition-colors">
            <Ban size={16} className="mr-2" /> Cancel
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
            <LogIn size={16} className="mr-2" /> Check In
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Guest Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <User className="text-gray-400 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">Rahul Sharma</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-gray-400 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MailIcon className="text-gray-400 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">rahul.sharma@example.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-gray-400 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">123 MG Road, Bangalore, KA, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Stay Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar size={16} className="mr-2" /> Check-in
                </div>
                <p className="font-bold text-gray-900">15 Oct 2023</p>
                <p className="text-xs text-gray-500 mt-1">From 14:00</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar size={16} className="mr-2" /> Check-out
                </div>
                <p className="font-bold text-gray-900">18 Oct 2023</p>
                <p className="text-xs text-gray-500 mt-1">Until 11:00</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-md border border-emerald-100 flex flex-col justify-center">
                <p className="text-sm text-emerald-800 font-medium">Duration</p>
                <p className="text-2xl font-bold text-emerald-700">3 Nights</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Deluxe Suite</p>
                  <p className="text-sm text-gray-500">Room 204 • 2 Adults, 0 Children</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹10,500</p>
                  <p className="text-xs text-gray-500">₹3,500 / night</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Airport Pickup</p>
                  <p className="text-sm text-gray-500">Add-on service</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹1,500</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Price Breakdown</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Room Charges</span>
                <span className="font-medium">₹10,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Add-ons</span>
                <span className="font-medium">₹1,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">₹2,160</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount (PROMO10)</span>
                <span className="font-medium">-₹1,200</span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900">Grand Total</span>
                <span className="text-xl font-bold text-emerald-700">₹12,960</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Paid Amount</span>
                <span className="font-medium text-gray-900">₹5,000</span>
              </div>
              <div className="flex justify-between text-sm font-medium mt-1">
                <span className="text-red-600">Balance Due</span>
                <span className="text-red-600">₹7,960</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              Add Payment
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Notes</h3>
            <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-800 border border-yellow-100 mb-4">
              Guest requested early check-in at 12:00 PM if possible. Also prefers a quiet room away from the elevator.
            </div>
            <textarea 
              className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-emerald-800 focus:border-emerald-800" 
              rows={3} 
              placeholder="Add internal note..."
            ></textarea>
            <button className="mt-2 px-4 py-1.5 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

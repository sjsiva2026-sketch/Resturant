'use client';
import React from 'react';
import { Download, Search, Filter } from 'lucide-react';

const PAYMENTS = [
  { id: 'PAY-1001', bookingId: 'BKG-001', guest: 'Rahul Sharma', amount: '₹12,500', method: 'Credit Card', status: 'Completed', date: 'Oct 15, 2023 10:30 AM' },
  { id: 'PAY-1002', bookingId: 'BKG-002', guest: 'Priya Patel', amount: '₹4,200', method: 'UPI', status: 'Pending', date: 'Oct 15, 2023 11:15 AM' },
  { id: 'PAY-1003', bookingId: 'BKG-003', guest: 'Amit Kumar', amount: '₹8,900', method: 'Cash', status: 'Completed', date: 'Oct 14, 2023 04:45 PM' },
  { id: 'PAY-1004', bookingId: 'BKG-005', guest: 'Vikram Singh', amount: '₹4,200', method: 'Net Banking', status: 'Refunded', date: 'Oct 14, 2023 09:20 AM' },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Ledger</h1>
          <p className="text-sm text-gray-500">Track all incoming and outgoing payments</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
          <Download size={16} className="mr-2" /> Export
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Collected (Today)</p>
          <p className="text-2xl font-bold text-gray-900">₹25,600</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Payments</p>
          <p className="text-2xl font-bold text-gray-900">₹12,400</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">Refunds Processed</p>
          <p className="text-2xl font-bold text-gray-900">₹4,200</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search Payment ID or Booking ID..." className="pl-9 pr-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-emerald-800 focus:border-emerald-800" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
              <option>All Methods</option>
              <option>Credit Card</option>
              <option>UPI</option>
              <option>Cash</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">Payment ID</th>
                <th className="px-6 py-3 font-medium">Booking ID</th>
                <th className="px-6 py-3 font-medium">Guest</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Method</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-emerald-700">{payment.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.bookingId}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.guest}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4 text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {payment.status}
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

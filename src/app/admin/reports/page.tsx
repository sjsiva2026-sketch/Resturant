'use client';
import React, { useState } from 'react';
import { Download, Calendar, Printer } from 'lucide-react';

const REPORT_TYPES = ['Revenue Report', 'Occupancy Report', 'Booking Source', 'Cancellations', 'Tax Report'];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('Revenue Report');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500">Analytics and business intelligence</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
            <Printer size={16} className="mr-2" /> Print
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
            <Download size={16} className="mr-2" /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
          <select 
            value={activeReport}
            onChange={(e) => setActiveReport(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-emerald-800 focus:border-emerald-800"
          >
            {REPORT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-auto flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="pl-9 pr-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="pl-9 pr-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-emerald-800 focus:border-emerald-800" />
            </div>
          </div>
        </div>
        <button className="w-full md:w-auto px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors">
          Generate
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{activeReport}</h2>
        
        <div className="h-80 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-8">
          [Chart Visualization Area]
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Date / Category</th>
                <th className="px-6 py-4 font-medium text-right">Room Revenue</th>
                <th className="px-6 py-4 font-medium text-right">F&B Revenue</th>
                <th className="px-6 py-4 font-medium text-right">Other Services</th>
                <th className="px-6 py-4 font-medium text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Oct 01, 2023</td>
                <td className="px-6 py-4 text-right text-gray-600">₹45,000</td>
                <td className="px-6 py-4 text-right text-gray-600">₹12,500</td>
                <td className="px-6 py-4 text-right text-gray-600">₹3,000</td>
                <td className="px-6 py-4 text-right font-bold text-emerald-700">₹60,500</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Oct 02, 2023</td>
                <td className="px-6 py-4 text-right text-gray-600">₹52,000</td>
                <td className="px-6 py-4 text-right text-gray-600">₹15,200</td>
                <td className="px-6 py-4 text-right text-gray-600">₹4,500</td>
                <td className="px-6 py-4 text-right font-bold text-emerald-700">₹71,700</td>
              </tr>
              <tr className="bg-gray-50 font-bold border-t border-gray-300">
                <td className="px-6 py-4 text-gray-900">Grand Total</td>
                <td className="px-6 py-4 text-right text-gray-900">₹97,000</td>
                <td className="px-6 py-4 text-right text-gray-900">₹27,700</td>
                <td className="px-6 py-4 text-right text-gray-900">₹7,500</td>
                <td className="px-6 py-4 text-right text-emerald-800">₹132,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

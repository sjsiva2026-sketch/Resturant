'use client';
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const COUPONS = [
  { id: 1, code: 'NEWUSER500', type: 'Flat Amount', value: '₹500', minAmount: '₹3000', usage: '45/100', expiry: '2024-12-31', status: 'Active' },
  { id: 2, code: 'FESTIVE10', type: 'Percentage', value: '10%', minAmount: '₹0', usage: '12/50', expiry: '2024-11-15', status: 'Active' },
  { id: 3, code: 'CORP20', type: 'Percentage', value: '20%', minAmount: '₹10000', usage: '8/Unlimited', expiry: '2025-01-01', status: 'Active' },
  { id: 4, code: 'EXPIRED15', type: 'Percentage', value: '15%', minAmount: '₹2000', usage: '100/100', expiry: '2023-12-31', status: 'Expired' },
];

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons & Promo Codes</h1>
          <p className="text-sm text-gray-500">Create discount codes for checkout</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
          <Plus size={16} className="mr-2" /> Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Coupon Code</th>
                <th className="px-6 py-4 font-medium">Discount Type</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium">Min. Amount</th>
                <th className="px-6 py-4 font-medium">Usage Limit</th>
                <th className="px-6 py-4 font-medium">Expiry Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COUPONS.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-emerald-800">{coupon.code}</td>
                  <td className="px-6 py-4 text-gray-600">{coupon.type}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{coupon.value}</td>
                  <td className="px-6 py-4 text-gray-600">{coupon.minAmount}</td>
                  <td className="px-6 py-4 text-gray-600">{coupon.usage}</td>
                  <td className="px-6 py-4 text-gray-500">{coupon.expiry}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      coupon.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={18} /></button>
                      <button className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>
                    </div>
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

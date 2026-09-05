'use client';
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const STAFF = [
  { id: 1, name: 'Admin User', email: 'admin@grandvista.com', role: 'Admin', status: 'Active', lastLogin: 'Today, 09:30 AM' },
  { id: 2, name: 'Sarah Manager', email: 'sarah@grandvista.com', role: 'Manager', status: 'Active', lastLogin: 'Yesterday, 06:15 PM' },
  { id: 3, name: 'Raj Frontdesk', email: 'raj@grandvista.com', role: 'Receptionist', status: 'Active', lastLogin: 'Today, 07:00 AM' },
  { id: 4, name: 'Anita Housekeeping', email: 'anita@grandvista.com', role: 'Housekeeping', status: 'Inactive', lastLogin: 'Oct 10, 2023' },
];

export default function StaffPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-500">Manage system users and access roles</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
          <Plus size={16} className="mr-2" /> Add Staff Member
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Login</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {STAFF.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-gray-600">{member.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                      member.role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                      member.role === 'Receptionist' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{member.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={18} /></button>
                      <button className="text-red-600 hover:text-red-800" title="Delete" disabled={member.role === 'Admin'}><Trash2 size={18} className={member.role === 'Admin' ? 'opacity-50' : ''} /></button>
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

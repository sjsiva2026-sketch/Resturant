'use client';
import React from 'react';
import { Plus, Search, Wrench, CheckCircle, Clock } from 'lucide-react';

const TICKETS = [
  { id: 'T-101', room: '102', issue: 'AC not cooling properly', priority: 'High', status: 'Open', reportedBy: 'Housekeeping', date: 'Today, 10:30 AM' },
  { id: 'T-102', room: '205', issue: 'Leaky faucet in bathroom', priority: 'Medium', status: 'In Progress', reportedBy: 'Guest', date: 'Yesterday, 2:15 PM' },
  { id: 'T-103', room: 'Lobby', issue: 'Main door sensor malfunctioning', priority: 'Urgent', status: 'Resolved', reportedBy: 'Front Desk', date: 'Oct 12, 9:00 AM' },
];

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-sm text-gray-500">Manage repair and maintenance tickets</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
          <Plus size={16} className="mr-2" /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-red-800 font-medium text-sm">Open Tickets</p>
            <p className="text-2xl font-bold text-red-900">5</p>
          </div>
          <Wrench className="text-red-300" size={32} />
        </div>
        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-yellow-800 font-medium text-sm">In Progress</p>
            <p className="text-2xl font-bold text-yellow-900">3</p>
          </div>
          <Clock className="text-yellow-300" size={32} />
        </div>
        <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-green-800 font-medium text-sm">Resolved (This Week)</p>
            <p className="text-2xl font-bold text-green-900">12</p>
          </div>
          <CheckCircle className="text-green-300" size={32} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search tickets..." className="pl-9 pr-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-emerald-800 focus:border-emerald-800" />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">Ticket ID</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Issue</th>
                <th className="px-6 py-3 font-medium">Priority</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date Reported</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TICKETS.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-700">{ticket.room}</td>
                  <td className="px-6 py-4 text-gray-600">{ticket.issue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'Urgent' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-red-100 text-red-700' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{ticket.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-700 hover:text-emerald-900 font-medium text-sm">View</button>
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

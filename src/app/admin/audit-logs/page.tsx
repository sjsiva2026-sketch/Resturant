'use client';
import React from 'react';
import { Search } from 'lucide-react';

const LOGS = [
  { id: 1, time: '2023-10-15 14:32:01', user: 'admin@grandvista.com', action: 'CREATE', entity: 'Reservation', entityId: 'BKG-008', ip: '192.168.1.1' },
  { id: 2, time: '2023-10-15 14:15:22', user: 'sarah@grandvista.com', action: 'UPDATE', entity: 'Room Status', entityId: 'Room 205', ip: '192.168.1.5' },
  { id: 3, time: '2023-10-15 11:05:10', user: 'raj@grandvista.com', action: 'LOGIN', entity: 'Session', entityId: '-', ip: '192.168.1.12' },
  { id: 4, time: '2023-10-14 18:45:00', user: 'admin@grandvista.com', action: 'DELETE', entity: 'Coupon', entityId: 'OLDPROMO', ip: '192.168.1.1' },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-sm text-gray-500">System activity trail for security and compliance</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50">
          <div className="relative max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search logs..." className="pl-9 pr-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:ring-emerald-800 focus:border-emerald-800" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium">Entity Type</th>
                <th className="px-6 py-3 font-medium">Entity ID</th>
                <th className="px-6 py-3 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-500">{log.time}</td>
                  <td className="px-6 py-3 text-blue-600">{log.user}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                      log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                      log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{log.entity}</td>
                  <td className="px-6 py-3 text-gray-900 font-bold">{log.entityId}</td>
                  <td className="px-6 py-3 text-gray-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

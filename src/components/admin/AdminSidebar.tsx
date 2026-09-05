'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Calendar, CalendarDays, BedDouble, Layers, IndianRupee, 
  Users, ConciergeBell, LogIn, Sparkles, Wrench, CreditCard, RotateCcw, 
  Gift, Tag, BarChart3, FileText, Image as ImageIcon, UserCog, Settings, 
  ClipboardList, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';

const MENU_GROUPS = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Front Desk', href: '/admin/front-desk', icon: ConciergeBell },
    ]
  },
  {
    title: 'Reservations',
    items: [
      { name: 'Reservations', href: '/admin/reservations', icon: Calendar },
      { name: 'Calendar View', href: '/admin/reservations', icon: CalendarDays },
      { name: 'Check-In/Out', href: '/admin/front-desk', icon: LogIn },
    ]
  },
  {
    title: 'Rooms & Rates',
    items: [
      { name: 'Rooms', href: '/admin/rooms', icon: BedDouble },
      { name: 'Room Types', href: '/admin/rooms', icon: Layers },
      { name: 'Rates & Inventory', href: '/admin/rates', icon: IndianRupee },
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'Housekeeping', href: '/admin/housekeeping', icon: Sparkles },
      { name: 'Maintenance', href: '/admin/maintenance', icon: Wrench },
    ]
  },
  {
    title: 'Guests & Finances',
    items: [
      { name: 'Guests', href: '/admin/guests', icon: Users },
      { name: 'Payments', href: '/admin/payments', icon: CreditCard },
      { name: 'Refunds', href: '/admin/payments', icon: RotateCcw },
    ]
  },
  {
    title: 'Marketing',
    items: [
      { name: 'Offers', href: '/admin/offers', icon: Gift },
      { name: 'Coupons', href: '/admin/coupons', icon: Tag },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
      { name: 'Content', href: '/admin/content', icon: FileText },
      { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
      { name: 'Staff', href: '/admin/staff', icon: UserCog },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
      { name: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
    ]
  }
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-full bg-gray-900 text-gray-300 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 bg-gray-950 border-b border-gray-800 shrink-0">
        {!collapsed && (
          <div className="flex items-center space-x-2 font-serif">
            <div className="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center text-white font-bold">
              GV
            </div>
            <span className="text-xl text-white font-semibold tracking-wide">Grand Vista</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto w-8 h-8 bg-emerald-700 rounded flex items-center justify-center text-white font-bold">
            GV
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="hidden lg:block text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {MENU_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center px-6 py-2.5 mx-2 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-emerald-800 text-white' 
                          : 'hover:bg-gray-800 hover:text-white'
                      }`}
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon size={20} className={collapsed ? 'mx-auto' : 'mr-3'} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-950 border-t border-gray-800 shrink-0">
        <button className={`flex items-center w-full text-gray-400 hover:text-white transition-colors ${collapsed ? 'justify-center' : 'px-2'}`}>
          <LogOut size={20} className={collapsed ? '' : 'mr-3'} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

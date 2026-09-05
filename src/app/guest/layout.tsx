import Link from 'next/link';
import { LayoutDashboard, CalendarDays, User, FileText, Settings, LogOut } from 'lucide-react';
import { ReactNode } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/guest/dashboard', icon: LayoutDashboard },
  { label: 'Bookings', href: '/guest/dashboard/bookings', icon: CalendarDays },
  { label: 'Profile', href: '/guest/dashboard/profile', icon: User },
  { label: 'Invoices', href: '/guest/dashboard', icon: FileText },
  { label: 'Settings', href: '/guest/dashboard/profile', icon: Settings },
];

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B4D3E] text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-[#2a6d59]">
          <h2 className="text-2xl font-serif font-bold text-[#C9A96E]">Grand Vista</h2>
          <p className="text-sm text-gray-300 mt-1">Guest Portal</p>
        </div>
        
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-[#2a6d59] transition-colors text-gray-100 hover:text-white"
                  >
                    <Icon className="w-5 h-5 text-[#C9A96E]" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[#2a6d59]">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-red-900/30 text-red-300 hover:text-red-200 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm h-16 flex items-center px-4 justify-between">
          <h2 className="text-xl font-serif font-bold text-[#1B4D3E]">Grand Vista</h2>
          {/* Mobile menu button would go here */}
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

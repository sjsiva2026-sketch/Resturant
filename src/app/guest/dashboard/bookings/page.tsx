import { Calendar, MapPin, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';

// Mock data for display purposes
const bookings = [
  {
    id: 'GVH-A7X9',
    room: 'Premium Ocean View Suite',
    checkIn: 'Oct 15, 2026',
    checkOut: 'Oct 18, 2026',
    status: 'CONFIRMED',
    amount: '₹45,000',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'GVH-B2Y4',
    room: 'Deluxe City View Room',
    checkIn: 'Aug 10, 2026',
    checkOut: 'Aug 12, 2026',
    status: 'CHECKED_OUT',
    amount: '₹18,500',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  }
];

export default function GuestBookingsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Confirmed</span>;
      case 'CHECKED_OUT':
        return <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Completed</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your past and upcoming reservations.</p>
        </div>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition">
            <div className="w-full md:w-64 h-48 md:h-auto">
              <img src={booking.image} alt={booking.room} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#1B4D3E]">{booking.room}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-sm text-gray-500 mb-4">Booking ID: {booking.id}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A96E]" />
                    {booking.checkIn} - {booking.checkOut}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="font-semibold text-gray-900">{booking.amount}</div>
                <div className="flex gap-3">
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
                    <Download className="w-4 h-4" /> Invoice
                  </button>
                  <Link href={`/dashboard/bookings/${booking.id}`} className="px-4 py-1.5 text-sm font-medium text-white bg-[#1B4D3E] rounded-lg hover:bg-[#1B4D3E]/90 transition flex items-center gap-1">
                    Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CheckCircle, Download, Printer, Calendar, User, MapPin } from 'lucide-react';
import Link from 'next/link';

export default async function BookingConfirmationPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const reservation = await prisma.reservation.findFirst({
    where: { bookingId },
    include: {
      reservationRooms: {
        include: { roomType: true },
      },
      payments: true,
    },
  });

  if (!reservation) {
    notFound();
  }

  const checkInDate = new Date(reservation.checkIn);
  const checkOutDate = new Date(reservation.checkOut);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#1B4D3E] px-6 py-8 text-center text-white">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#C9A96E]" />
            <h1 className="text-3xl font-serif font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-[#C9A96E] text-lg">Thank you for choosing Grand Vista Hotel</p>
          </div>

          <div className="p-8">
            {/* Booking ID and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-8 border-b">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Booking ID</p>
                <p className="text-2xl font-bold text-gray-900">{reservation.bookingId}</p>
              </div>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#C9A96E] rounded-lg hover:bg-[#B8995D] transition"
                >
                  <Printer className="w-4 h-4" /> Print / Save
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#1B4D3E]">Reservation Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Guest Name</p>
                      <p className="font-medium">
                        {reservation.guestFirstName} {reservation.guestLastName}
                      </p>
                      <p className="text-xs text-gray-500">{reservation.guestEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Stay Dates</p>
                      <p className="font-medium">
                        {checkInDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} –{' '}
                        {checkOutDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#1B4D3E]">Room Information</h3>
                <div className="space-y-4">
                  {reservation.reservationRooms.map((rr, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-900">{rr.roomType?.name || 'Standard Room'}</p>
                      <p className="text-sm text-gray-600">Rate: ₹{Number(rr.ratePerNight).toLocaleString('en-IN')} / night</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium text-gray-900">
                      {reservation.adults} Adults{reservation.children > 0 ? `, ${reservation.children} Children` : ''} · {reservation.numRooms} Room(s)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#1B4D3E]">Payment Summary</h3>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Room Subtotal</span>
                <span className="font-medium">₹{Number(reservation.subtotal).toLocaleString('en-IN')}</span>
              </div>
              {Number(reservation.addonAmount) > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Add-ons</span>
                  <span className="font-medium">₹{Number(reservation.addonAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Taxes (GST)</span>
                <span className="font-medium">₹{Number(reservation.taxAmount).toLocaleString('en-IN')}</span>
              </div>
              {Number(reservation.discountAmount) > 0 && (
                <div className="flex justify-between items-center py-2 text-green-700">
                  <span>Discount</span>
                  <span>-₹{Number(reservation.discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 border-t mt-2">
                <span className="text-gray-900 font-bold text-lg">Total Amount</span>
                <span className="font-bold text-xl text-[#1B4D3E]">₹{Number(reservation.totalAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t mt-2">
                <span className="text-gray-600">Booking Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  {reservation.status}
                </span>
              </div>
            </div>

            {/* Hotel Info */}
            <div className="text-center pt-8 border-t">
              <p className="text-gray-900 font-serif font-bold text-lg mb-1">Grand Vista Hotel</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <MapPin className="w-4 h-4 text-[#C9A96E]" /> 42 Marina Boulevard, Gateway District, Mumbai, Maharashtra 400001
              </div>
              <div className="flex justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-[#1B4D3E] text-[#1B4D3E] font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Return to Home
                </Link>
                <Link
                  href="/my-booking"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#1B4D3E] text-white font-medium rounded-lg hover:bg-[#153e32] transition"
                >
                  Manage Booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

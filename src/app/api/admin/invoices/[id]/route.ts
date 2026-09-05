import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        reservationRooms: {
          include: {
            roomType: true,
            ratePlan: true,
          },
        },
        payments: true,
      },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    const hotelSettings = await prisma.hotelSetting.findMany();
    const settingsMap = hotelSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    const taxNum = Number(reservation.taxAmount);
    const totalNum = Number(reservation.totalAmount);
    const subtotalNum = Number(reservation.subtotal);
    const cgst = taxNum / 2;
    const sgst = taxNum / 2;

    const invoiceData = {
      hotel: {
        name: settingsMap['hotel_name'] || 'Grand Vista Hotel',
        address: settingsMap['hotel_address'] || '42 Marina Boulevard, Mumbai, Maharashtra 400001',
        phone: settingsMap['hotel_phone'] || '+91 22 6789 0000',
        email: settingsMap['hotel_email'] || 'reservations@grandvistahotel.com',
        gstin: settingsMap['hotel_gst_number'] || '27AABCU9603R1ZM',
      },
      invoiceId: `INV-${reservation.bookingId}`,
      date: new Date().toISOString(),
      reservation: {
        id: reservation.id,
        bookingId: reservation.bookingId,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        guestName: `${reservation.guestFirstName} ${reservation.guestLastName}`,
        guestEmail: reservation.guestEmail,
        guestPhone: reservation.guestPhone,
      },
      rooms: reservation.reservationRooms.map((r) => ({
        type: r.roomType?.name || 'Standard',
        pricePerNight: Number(r.ratePerNight),
        ratePlan: r.ratePlan?.name || 'Standard Rate',
      })),
      financials: {
        subtotal: subtotalNum,
        taxes: {
          total: taxNum,
          cgst,
          sgst,
        },
        totalAmount: totalNum,
        payments: reservation.payments.map((p) => ({
          date: p.createdAt,
          amount: Number(p.amount),
          method: p.method,
          status: p.status,
        })),
      },
    };

    return NextResponse.json(invoiceData);
  } catch (error) {
    console.error('Invoice generation error:', error);
    return NextResponse.json({ error: 'Failed to generate invoice data' }, { status: 500 });
  }
}

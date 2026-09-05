import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { PaymentStatus, ReservationStatus } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'revenue';
    const startDateStr = searchParams.get('startDate');
    const endDateStr = searchParams.get('endDate');

    if (!startDateStr || !endDateStr) {
      return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
    }

    const start = startOfDay(parseISO(startDateStr));
    const end = endOfDay(parseISO(endDateStr));

    let data: any = {};

    switch (type) {
      case 'revenue': {
        const payments = await db.payment.findMany({
          where: {
            createdAt: { gte: start, lte: end },
            status: PaymentStatus.PAID,
          },
          select: { amount: true, method: true, createdAt: true },
        });
        
        const total = payments.reduce((sum, p) => sum + Number(p.amount), 0);
        const byMethod = payments.reduce((acc: Record<string, number>, p) => {
          acc[p.method] = (acc[p.method] || 0) + Number(p.amount);
          return acc;
        }, {});

        data = { total, byMethod, paymentsCount: payments.length };
        break;
      }
      case 'occupancy': {
        const totalRooms = await db.room.count({ where: { isActive: true } });
        const reservations = await db.reservation.findMany({
          where: {
            status: { in: [ReservationStatus.CHECKED_IN, ReservationStatus.CONFIRMED] },
            checkIn: { lte: end },
            checkOut: { gte: start },
          },
          include: {
            reservationRooms: {
              include: { roomType: { select: { name: true } } },
            },
          },
        });

        const byRoomType = reservations.reduce((acc: Record<string, number>, res) => {
          const rt = res.reservationRooms[0]?.roomType?.name || 'Standard';
          acc[rt] = (acc[rt] || 0) + 1;
          return acc;
        }, {});

        data = {
          totalReservationsInRange: reservations.length,
          totalRooms,
          byRoomType,
        };
        break;
      }
      case 'bookings': {
        const bookings = await db.reservation.groupBy({
          by: ['status', 'source'],
          where: { createdAt: { gte: start, lte: end } },
          _count: true,
        });
        data = { distribution: bookings };
        break;
      }
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Reports GET error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}

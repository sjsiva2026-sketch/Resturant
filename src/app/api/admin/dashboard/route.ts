import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { startOfDay, endOfDay, startOfMonth, subDays, format } from 'date-fns';
import { PaymentStatus, ReservationStatus, RoomStatus } from '@prisma/client';

export async function GET() {
  try {
    const today = startOfDay(new Date());
    const tonight = endOfDay(new Date());
    const thisMonth = startOfMonth(new Date());
    const thirtyDaysAgo = subDays(today, 30);

    // 1. Revenue
    const todayPayments = await db.payment.aggregate({
      where: { createdAt: { gte: today }, status: PaymentStatus.PAID },
      _sum: { amount: true },
    });
    
    const monthlyPayments = await db.payment.aggregate({
      where: { createdAt: { gte: thisMonth }, status: PaymentStatus.PAID },
      _sum: { amount: true },
    });

    // 2. Bookings & Reservations
    const todayBookings = await db.reservation.count({
      where: { createdAt: { gte: today } },
    });
    
    const totalReservations = await db.reservation.count({
      where: { status: { notIn: [ReservationStatus.CANCELLED, ReservationStatus.NO_SHOW] } },
    });

    // 3. Occupancy
    const totalRooms = await db.room.count({ where: { isActive: true } });
    const occupiedRooms = await db.room.count({ where: { status: RoomStatus.OCCUPIED } });
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
    const availableRooms = Math.max(0, totalRooms - occupiedRooms);

    // 4. Arrivals / Departures Today
    const todayArrivals = await db.reservation.count({
      where: {
        checkIn: { gte: today, lte: tonight },
        status: ReservationStatus.CONFIRMED,
      },
    });
    
    const todayDepartures = await db.reservation.count({
      where: {
        checkOut: { gte: today, lte: tonight },
        status: ReservationStatus.CHECKED_IN,
      },
    });

    // 5. Recent Bookings
    const recentBookings = await db.reservation.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        guest: true,
        reservationRooms: {
          include: { roomType: true },
        },
      },
    });

    // 6. Revenue for last 30 days
    const last30DaysPayments = await db.payment.findMany({
      where: { createdAt: { gte: thirtyDaysAgo }, status: PaymentStatus.PAID },
      select: { amount: true, createdAt: true },
    });
    
    const revenueByDay = last30DaysPayments.reduce((acc: Record<string, number>, payment) => {
      const date = format(payment.createdAt, 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + Number(payment.amount);
      return acc;
    }, {});

    const chartData = Object.keys(revenueByDay).map((date) => ({
      date,
      revenue: revenueByDay[date],
    })).sort((a, b) => a.date.localeCompare(b.date));

    // 7. Booking status distribution
    const statusDistribution = await db.reservation.groupBy({
      by: ['status'],
      _count: true,
    });

    return NextResponse.json({
      revenue: {
        today: todayPayments._sum?.amount ? Number(todayPayments._sum.amount) : 0,
        monthly: monthlyPayments._sum?.amount ? Number(monthlyPayments._sum.amount) : 0,
      },
      bookings: {
        today: todayBookings,
        total: totalReservations,
      },
      occupancy: {
        rate: Math.round(occupancyRate * 10) / 10,
        available: availableRooms,
        occupied: occupiedRooms,
        total: totalRooms,
      },
      movements: {
        arrivals: todayArrivals,
        departures: todayDepartures,
      },
      recentBookings,
      revenueChart: chartData,
      statusDistribution,
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
}

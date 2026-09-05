import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createReservation } from '@/lib/booking';
import { z } from 'zod';

const reservationSchema = z.object({
  roomTypeId: z.string(),
  ratePlanId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().int().min(1).default(2),
  children: z.number().int().min(0).default(0),
  rooms: z.number().int().min(1).default(1),
  guestFirstName: z.string().optional(),
  guestLastName: z.string().optional(),
  guestName: z.string().optional(),
  guestEmail: z.string().email(),
  guestPhone: z.string(),
  guestCity: z.string().optional(),
  guestState: z.string().optional(),
  guestCountry: z.string().optional(),
  guestPostalCode: z.string().optional(),
  specialRequests: z.string().optional(),
  holdId: z.string().optional(),
  couponCode: z.string().optional(),
  addons: z.array(z.any()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = reservationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.issues }, { status: 400 });
    }
    
    const reservation = await createReservation(result.data);
    return NextResponse.json(reservation, { status: 201 });
  } catch (error: any) {
    console.error('Reservation creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create reservation' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const reservations = await prisma.reservation.findMany({
      where: email ? { guestEmail: email } : undefined,
      include: {
        reservationRooms: {
          include: { roomType: true },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Fetch reservations error:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

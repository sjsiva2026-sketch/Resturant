import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const lookupSchema = z.object({
  bookingId: z.string(),
  contactInfo: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = lookupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.issues }, { status: 400 });
    }

    const { bookingId, contactInfo } = result.data;

    const reservation = await prisma.reservation.findFirst({
      where: {
        bookingId: bookingId.trim().toUpperCase(),
        OR: [
          { guestEmail: { equals: contactInfo.trim(), mode: 'insensitive' } },
          { guestPhone: { contains: contactInfo.trim() } },
        ],
      },
      include: {
        reservationRooms: {
          include: { roomType: true, ratePlan: true },
        },
        reservationAddons: {
          include: { addon: true },
        },
        payments: true,
      },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found with matching booking ID and contact info' }, { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Lookup error:', error);
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }
}

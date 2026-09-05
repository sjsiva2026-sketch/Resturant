import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const holdSchema = z.object({
  roomTypeId: z.string(),
  checkIn: z.string().transform((str) => new Date(str)),
  checkOut: z.string().transform((str) => new Date(str)),
  rooms: z.number().int().positive(),
  sessionId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = holdSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.issues }, { status: 400 });
    }
    
    const { roomTypeId, checkIn, checkOut, rooms, sessionId } = result.data;
    
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    const hold = await prisma.bookingHold.create({
      data: {
        roomTypeId,
        checkIn,
        checkOut,
        roomsHeld: rooms,
        sessionId,
        expiresAt,
        isReleased: false,
      },
    });
    
    return NextResponse.json({ holdId: hold.id, expiresAt: hold.expiresAt });
  } catch (error) {
    console.error('Booking hold creation error:', error);
    return NextResponse.json({ error: 'Failed to create booking hold' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const holdId = searchParams.get('holdId');
    const sessionId = searchParams.get('sessionId');
    
    if (!holdId || !sessionId) {
      return NextResponse.json({ error: 'Missing holdId or sessionId' }, { status: 400 });
    }
    
    await prisma.bookingHold.updateMany({
      where: {
        id: holdId,
        sessionId: sessionId,
        isReleased: false,
      },
      data: {
        isReleased: true,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking hold release error:', error);
    return NextResponse.json({ error: 'Failed to release booking hold' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { RoomStatus } from '@prisma/client';

const roomSchema = z.object({
  roomNumber: z.string().min(1),
  roomTypeId: z.string().min(1),
  floor: z.number().int().default(1),
  status: z.enum(['AVAILABLE', 'RESERVED', 'OCCUPIED', 'DIRTY', 'CLEANING', 'MAINTENANCE', 'OUT_OF_SERVICE']).default('AVAILABLE'),
  notes: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const roomTypeId = searchParams.get('roomTypeId');

    const where: any = {};
    if (status) where.status = status as RoomStatus;
    if (roomTypeId) where.roomTypeId = roomTypeId;

    const rooms = await db.room.findMany({
      where,
      include: {
        roomType: true,
      },
      orderBy: { roomNumber: 'asc' },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Rooms GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = roomSchema.parse(body);

    const existing = await db.room.findUnique({
      where: { roomNumber: data.roomNumber },
    });

    if (existing) {
      return NextResponse.json({ error: 'Room number already exists' }, { status: 400 });
    }

    const room = await db.room.create({
      data: {
        roomNumber: data.roomNumber,
        roomTypeId: data.roomTypeId,
        floor: data.floor,
        status: data.status as RoomStatus,
        notes: data.notes,
      },
      include: { roomType: true },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error: any) {
    console.error('Room POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create room' }, { status: 500 });
  }
}

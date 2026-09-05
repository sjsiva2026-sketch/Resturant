import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { RoomStatus } from '@prisma/client';

const roomUpdateSchema = z.object({
  roomNumber: z.string().min(1).optional(),
  roomTypeId: z.string().min(1).optional(),
  floor: z.number().int().optional(),
  status: z.enum(['AVAILABLE', 'RESERVED', 'OCCUPIED', 'DIRTY', 'CLEANING', 'MAINTENANCE', 'OUT_OF_SERVICE']).optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional(),
});

const roomStatusSchema = z.object({
  status: z.enum(['AVAILABLE', 'RESERVED', 'OCCUPIED', 'DIRTY', 'CLEANING', 'MAINTENANCE', 'OUT_OF_SERVICE']),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const room = await db.room.findUnique({
      where: { id },
      include: { roomType: true },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error('Room GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = roomUpdateSchema.parse(body);

    const room = await db.room.update({
      where: { id },
      data: {
        ...validatedData,
        status: validatedData.status ? (validatedData.status as RoomStatus) : undefined,
      },
      include: { roomType: true },
    });

    return NextResponse.json(room);
  } catch (error: any) {
    console.error('Room PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = roomStatusSchema.parse(body);

    const room = await db.room.update({
      where: { id },
      data: { status: status as RoomStatus },
    });

    return NextResponse.json(room);
  } catch (error: any) {
    console.error('Room PATCH error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update room status' }, { status: 500 });
  }
}

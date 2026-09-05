import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const roomTypeUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  basePrice: z.number().min(0).optional(),
  maxOccupancy: z.number().min(1).optional(),
  maxAdults: z.number().min(1).optional(),
  maxChildren: z.number().optional(),
  bedType: z.string().optional(),
  sizeSqft: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const roomType = await db.roomType.findUnique({
      where: { id },
      include: {
        rooms: true,
        images: true,
        amenities: {
          include: { amenity: true },
        },
      },
    });

    if (!roomType) {
      return NextResponse.json({ error: 'Room type not found' }, { status: 404 });
    }

    return NextResponse.json(roomType);
  } catch (error) {
    console.error('RoomType GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch room type' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = roomTypeUpdateSchema.parse(body);

    const roomType = await db.roomType.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(roomType);
  } catch (error: any) {
    console.error('RoomType PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update room type' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const roomType = await db.roomType.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, message: 'Room type deactivated', roomType });
  } catch (error) {
    console.error('RoomType DELETE error:', error);
    return NextResponse.json({ error: 'Failed to deactivate room type' }, { status: 500 });
  }
}

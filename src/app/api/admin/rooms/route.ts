import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import slugify from 'slugify';

const roomTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  basePrice: z.number().min(0),
  maxOccupancy: z.number().min(1).default(2),
  maxAdults: z.number().min(1).default(2),
  maxChildren: z.number().default(1),
  bedType: z.string().default('King'),
  sizeSqft: z.number().optional(),
});

export async function GET() {
  try {
    const roomTypes = await db.roomType.findMany({
      include: {
        _count: {
          select: { rooms: true },
        },
        images: true,
        amenities: {
          include: { amenity: true },
        },
      },
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(roomTypes);
  } catch (error) {
    console.error('RoomTypes GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch room types' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = roomTypeSchema.parse(body);

    const slug = slugify(data.name, { lower: true, strict: true });

    const roomType = await db.roomType.create({
      data: {
        name: data.name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        description: data.description,
        shortDescription: data.shortDescription,
        basePrice: data.basePrice,
        maxOccupancy: data.maxOccupancy,
        maxAdults: data.maxAdults,
        maxChildren: data.maxChildren,
        bedType: data.bedType,
        sizeSqft: data.sizeSqft,
      },
    });

    return NextResponse.json(roomType, { status: 201 });
  } catch (error: any) {
    console.error('RoomType POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create room type' }, { status: 500 });
  }
}

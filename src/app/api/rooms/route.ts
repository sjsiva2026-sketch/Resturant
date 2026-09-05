import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const rooms = await prisma.roomType.findMany({
      where: { isActive: true },
      include: {
        images: true,
        amenities: { include: { amenity: true } }
      },
      orderBy: { sortOrder: 'asc' }
    });
    
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

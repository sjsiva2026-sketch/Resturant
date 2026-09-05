import { NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/availability';
import { z } from 'zod';
import { parseISO, isBefore } from 'date-fns';

const querySchema = z.object({
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.string().optional().default('2').transform(Number),
  children: z.string().optional().default('0').transform(Number),
  rooms: z.string().optional().default('1').transform(Number),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = querySchema.safeParse(Object.fromEntries(searchParams));
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters', details: result.error.issues }, { status: 400 });
    }
    
    const { checkIn, checkOut, adults, children, rooms } = result.data;
    const startDate = parseISO(checkIn);
    const endDate = parseISO(checkOut);
    
    if (!isBefore(startDate, endDate)) {
      return NextResponse.json({ error: 'Check-out date must be after check-in date' }, { status: 400 });
    }
    
    const available = await checkAvailability(startDate, endDate);
    
    // Filter by capacity and requested rooms
    const filtered = available.filter((rt) => {
      const fitsAdults = rt.maxAdults >= adults;
      const fitsRooms = rt.availableCount >= rooms;
      return fitsAdults && fitsRooms;
    });

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

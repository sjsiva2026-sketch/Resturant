import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

const setRatesSchema = z.object({
  ratePlanId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  rate: z.number().min(0),
  isClosed: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ratePlanId = searchParams.get('ratePlanId');
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');

    if (!ratePlanId || !start || !end) {
      return NextResponse.json({ error: 'Missing required parameters: ratePlanId, startDate, endDate' }, { status: 400 });
    }

    const rates = await db.roomRate.findMany({
      where: {
        ratePlanId,
        date: {
          gte: startOfDay(parseISO(start)),
          lte: endOfDay(parseISO(end)),
        },
      },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(rates);
  } catch (error) {
    console.error('Calendar Rates GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar rates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ratePlanId, startDate, endDate, rate, isClosed } = setRatesSchema.parse(body);

    const start = startOfDay(parseISO(startDate));
    const end = startOfDay(parseISO(endDate));
    
    await db.$transaction(async (tx) => {
      await tx.roomRate.deleteMany({
        where: {
          ratePlanId,
          date: { gte: start, lte: end },
        },
      });

      const datesToInsert = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        datesToInsert.push({
          ratePlanId,
          date: new Date(currentDate),
          rate,
          isClosed: !!isClosed,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (datesToInsert.length > 0) {
        await tx.roomRate.createMany({
          data: datesToInsert,
        });
      }
    });

    return NextResponse.json({ success: true, message: 'Rates updated successfully' });
  } catch (error: any) {
    console.error('Calendar Rates POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to set calendar rates' }, { status: 500 });
  }
}

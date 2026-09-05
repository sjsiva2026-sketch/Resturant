import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const ratePlanSchema = z.object({
  name: z.string().min(1),
  roomTypeId: z.string().min(1),
  baseRate: z.number().min(0),
  description: z.string().optional(),
  cancellationPolicy: z.string().optional(),
  includedServices: z.string().optional(),
  isRefundable: z.boolean().default(true),
  minStay: z.number().int().min(1).default(1),
  maxStay: z.number().int().default(30),
});

export async function GET() {
  try {
    const ratePlans = await db.ratePlan.findMany({
      include: { roomType: true },
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    const grouped = ratePlans.reduce((acc: Record<string, any>, rate: any) => {
      const rtId = rate.roomTypeId;
      if (!acc[rtId]) {
        acc[rtId] = {
          roomType: rate.roomType,
          plans: [],
        };
      }
      acc[rtId].plans.push(rate);
      return acc;
    }, {});

    return NextResponse.json(Object.values(grouped));
  } catch (error) {
    console.error('RatePlans GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch rate plans' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ratePlanSchema.parse(body);

    const ratePlan = await db.ratePlan.create({
      data: {
        name: data.name,
        roomTypeId: data.roomTypeId,
        baseRate: data.baseRate,
        description: data.description,
        cancellationPolicy: data.cancellationPolicy,
        includedServices: data.includedServices,
        isRefundable: data.isRefundable,
        minStay: data.minStay,
        maxStay: data.maxStay,
      },
    });

    return NextResponse.json(ratePlan, { status: 201 });
  } catch (error: any) {
    console.error('RatePlan POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create rate plan' }, { status: 500 });
  }
}

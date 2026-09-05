import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const ratePlanUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  baseRate: z.number().min(0).optional(),
  description: z.string().optional(),
  cancellationPolicy: z.string().optional(),
  includedServices: z.string().optional(),
  isRefundable: z.boolean().optional(),
  minStay: z.number().int().min(1).optional(),
  maxStay: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = ratePlanUpdateSchema.parse(body);

    const ratePlan = await db.ratePlan.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(ratePlan);
  } catch (error: any) {
    console.error('RatePlan PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update rate plan' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ratePlan = await db.ratePlan.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, message: 'Rate plan deactivated', ratePlan });
  } catch (error) {
    console.error('RatePlan DELETE error:', error);
    return NextResponse.json({ error: 'Failed to deactivate rate plan' }, { status: 500 });
  }
}

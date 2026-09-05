import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { DiscountType } from '@prisma/client';

const updateOfferSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).optional(),
  discountValue: z.number().min(0).optional(),
  promoCode: z.string().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateOfferSchema.parse(body);

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.discountType !== undefined) updateData.discountType = data.discountType as DiscountType;
    if (data.discountValue !== undefined) updateData.discountValue = data.discountValue;
    if (data.promoCode !== undefined) updateData.promoCode = data.promoCode;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.validFrom) updateData.validFrom = new Date(data.validFrom);
    if (data.validUntil) updateData.validTo = new Date(data.validUntil);

    const offer = await db.offer.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(offer);
  } catch (error: any) {
    console.error('Offers PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const offer = await db.offer.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ success: true, offer });
  } catch (error) {
    console.error('Offers DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { DiscountType } from '@prisma/client';

const updateCouponSchema = z.object({
  discountType: z.enum(['PERCENTAGE', 'FIXED']).optional(),
  discountValue: z.number().min(0).optional(),
  usageLimit: z.number().optional().nullable(),
  startDate: z.string().optional(),
  expiryDate: z.string().optional(),
  minBookingAmount: z.number().optional().nullable(),
  maxDiscount: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  description: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateCouponSchema.parse(body);

    const updateData: any = { ...data };
    if (data.discountType) updateData.discountType = data.discountType as DiscountType;
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.expiryDate) updateData.expiryDate = new Date(data.expiryDate);

    const coupon = await db.coupon.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(coupon);
  } catch (error: any) {
    console.error('Coupons PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const coupon = await db.coupon.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    console.error('Coupons DELETE error:', error);
    return NextResponse.json({ error: 'Failed to deactivate coupon' }, { status: 500 });
  }
}

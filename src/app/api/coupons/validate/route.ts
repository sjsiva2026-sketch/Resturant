import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const validateSchema = z.object({
  code: z.string(),
  subtotal: z.number(),
  roomTypeId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.issues }, { status: 400 });
    }

    const { code, subtotal } = result.data;

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive || (coupon.expiryDate && new Date() > coupon.expiryDate)) {
      return NextResponse.json({ valid: false, error: 'Invalid or expired coupon' }, { status: 400 });
    }

    if (coupon.minBookingAmount && subtotal < Number(coupon.minBookingAmount)) {
      return NextResponse.json({
        valid: false,
        error: `Minimum booking amount of ₹${Number(coupon.minBookingAmount)} required for this coupon`,
      }, { status: 400 });
    }

    let discountAmount = 0;
    const discountVal = Number(coupon.discountValue);
    const maxDiscountNum = coupon.maxDiscount ? Number(coupon.maxDiscount) : null;

    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (subtotal * discountVal) / 100;
      if (maxDiscountNum && discountAmount > maxDiscountNum) {
        discountAmount = maxDiscountNum;
      }
    } else {
      discountAmount = discountVal;
    }

    return NextResponse.json({
      valid: true,
      discountAmount,
      discountType: coupon.discountType,
      description: coupon.description,
    });
  } catch (error) {
    console.error('Coupon validate error:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}

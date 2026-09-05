import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { DiscountType } from '@prisma/client';

const couponSchema = z.object({
  code: z.string().min(1).toUpperCase(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.number().min(0),
  usageLimit: z.number().optional().nullable(),
  startDate: z.string().optional(),
  expiryDate: z.string().optional(),
  minBookingAmount: z.number().optional().nullable(),
  maxDiscount: z.number().optional().nullable(),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(coupons);
  } catch (error) {
    console.error('Coupons GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = couponSchema.parse(body);

    const existing = await db.coupon.findUnique({ where: { code: data.code } });
    if (existing) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }

    const coupon = await db.coupon.create({
      data: {
        code: data.code,
        discountType: data.discountType as DiscountType,
        discountValue: data.discountValue,
        usageLimit: data.usageLimit,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : new Date(Date.now() + 365 * 86400000),
        minBookingAmount: data.minBookingAmount,
        maxDiscount: data.maxDiscount,
        isActive: data.isActive,
        description: data.description,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    console.error('Coupons POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create coupon' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import slugify from 'slugify';
import { DiscountType } from '@prisma/client';

const offerSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  shortDescription: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).default('PERCENTAGE'),
  discountValue: z.number().min(0),
  promoCode: z.string().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const offers = await db.offer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Offers GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = offerSchema.parse(body);

    const slug = slugify(data.title, { lower: true, strict: true });

    const offer = await db.offer.create({
      data: {
        title: data.title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        description: data.description,
        shortDescription: data.shortDescription,
        discountType: data.discountType as DiscountType,
        discountValue: data.discountValue,
        promoCode: data.promoCode,
        validFrom: data.validFrom ? new Date(data.validFrom) : new Date(),
        validTo: data.validUntil ? new Date(data.validUntil) : new Date(Date.now() + 90 * 86400000),
        isActive: data.isActive,
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error: any) {
    console.error('Offers POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create offer' }, { status: 500 });
  }
}

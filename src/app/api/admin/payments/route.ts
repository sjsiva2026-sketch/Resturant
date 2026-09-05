import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { createAuditLog } from '@/lib/audit';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

const paymentSchema = z.object({
  reservationId: z.string().min(1),
  amount: z.number().min(0.01),
  method: z.enum(['CASH', 'CARD', 'BANK_TRANSFER', 'UPI', 'RAZORPAY']),
  reference: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let whereClause: any = {};
    if (status) whereClause.status = status as PaymentStatus;

    const payments = await db.payment.findMany({
      where: whereClause,
      include: {
        reservation: {
          select: {
            id: true,
            bookingId: true,
            guestFirstName: true,
            guestLastName: true,
            guestEmail: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Payments GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id') || 'system';
    const body = await req.json();
    const data = paymentSchema.parse(body);

    const payment = await db.$transaction(async (tx) => {
      const p = await tx.payment.create({
        data: {
          reservationId: data.reservationId,
          amount: data.amount,
          method: data.method as PaymentMethod,
          notes: data.reference,
          status: PaymentStatus.PAID,
        },
      });
      return p;
    });

    createAuditLog(userId, 'CREATE_PAYMENT', 'Payment', payment.id, null, data).catch(console.error);

    return NextResponse.json(payment, { status: 201 });
  } catch (error: any) {
    console.error('Payments POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to record payment' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { createAuditLog } from '@/lib/audit';
import { PaymentStatus } from '@prisma/client';

const refundSchema = z.object({
  paymentId: z.string().min(1),
  amount: z.number().min(0.01),
  reason: z.string().min(1),
});

export async function GET() {
  try {
    const refundedPayments = await db.payment.findMany({
      where: {
        status: { in: [PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED, PaymentStatus.REFUND_PENDING] },
      },
      include: {
        reservation: {
          select: {
            id: true,
            bookingId: true,
            guestFirstName: true,
            guestLastName: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(refundedPayments);
  } catch (error) {
    console.error('Refunds GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch refunds' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id') || 'system';
    const body = await req.json();
    const data = refundSchema.parse(body);

    const updatedPayment = await db.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({ where: { id: data.paymentId } });
      if (!payment) throw new Error('Payment not found');
      if (Number(payment.amount) < data.amount) throw new Error('Refund amount exceeds payment amount');

      const isFullRefund = data.amount >= Number(payment.amount);
      const updated = await tx.payment.update({
        where: { id: data.paymentId },
        data: {
          refundAmount: data.amount,
          refundReason: data.reason,
          refundedAt: new Date(),
          refundId: `rfnd_${Date.now()}`,
          status: isFullRefund ? PaymentStatus.REFUNDED : PaymentStatus.PARTIALLY_REFUNDED,
        },
      });

      return updated;
    });

    createAuditLog(userId, 'PROCESS_REFUND', 'Payment', updatedPayment.id, null, data).catch(console.error);

    return NextResponse.json(updatedPayment, { status: 201 });
  } catch (error: any) {
    console.error('Refunds POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to process refund' }, { status: 500 });
  }
}

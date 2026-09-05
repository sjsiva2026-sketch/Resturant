import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PaymentStatus, ReservationStatus } from '@prisma/client';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const text = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'test_secret';

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(text)
        .digest('hex');

      if (process.env.NODE_ENV === 'production' && expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(text);

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const orderId = event.payload.payment?.entity?.order_id || event.payload.order?.entity?.id;
      
      if (orderId) {
        await prisma.$transaction(async (tx) => {
          const payment = await tx.payment.findFirst({ where: { gatewayOrderId: orderId } });
          
          if (payment && payment.status !== PaymentStatus.PAID) {
            await tx.payment.update({
              where: { id: payment.id },
              data: { status: PaymentStatus.PAID },
            });
            
            await tx.reservation.update({
              where: { id: payment.reservationId },
              data: { status: ReservationStatus.CONFIRMED },
            });
          }
        });
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

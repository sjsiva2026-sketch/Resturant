import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PaymentStatus, ReservationStatus } from '@prisma/client';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, reservationId } = await request.json();
    
    const secret = process.env.RAZORPAY_KEY_SECRET || 'test_secret';
    
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');
      
    // If not matching and not development bypass
    if (process.env.NODE_ENV === 'production' && expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Update payment and reservation status
    const updatedReservation = await prisma.$transaction(async (tx) => {
      await tx.payment.updateMany({
        where: { gatewayOrderId: razorpay_order_id },
        data: { 
          status: PaymentStatus.PAID,
          gatewayPaymentId: razorpay_payment_id,
          gatewaySignature: razorpay_signature,
        },
      });
      
      return tx.reservation.update({
        where: { id: reservationId },
        data: { status: ReservationStatus.CONFIRMED },
      });
    });
    
    return NextResponse.json({ success: true, reservation: updatedReservation });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}

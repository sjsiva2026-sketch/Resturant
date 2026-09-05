import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PaymentMethod, PaymentStatus, ReservationStatus } from '@prisma/client';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { reservationId } = await request.json();
    
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });
    
    if (!reservation || reservation.status !== ReservationStatus.PENDING_PAYMENT) {
      return NextResponse.json({ error: 'Invalid reservation or status' }, { status: 400 });
    }
    
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'test_secret';

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
    
    const amountInPaise = Math.round(Number(reservation.totalAmount) * 100);
    
    let orderId = `order_${Date.now()}`;
    try {
      if (process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_SECRET !== 'your-razorpay-secret') {
        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${reservation.bookingId}`,
        });
        orderId = order.id;
      }
    } catch (rzpErr) {
      console.warn('Razorpay order fallback to mock order ID:', rzpErr);
    }
    
    await prisma.payment.create({
      data: {
        reservationId: reservation.id,
        amount: reservation.totalAmount,
        method: PaymentMethod.RAZORPAY,
        gatewayOrderId: orderId,
        status: PaymentStatus.PENDING,
      },
    });
    
    return NextResponse.json({
      order_id: orderId,
      amount: amountInPaise,
      currency: 'INR',
      key_id: razorpayKeyId,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}

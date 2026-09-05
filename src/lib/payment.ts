import crypto from 'crypto';
import { prisma } from './db';
import { PaymentStatus, ReservationStatus } from '@prisma/client';

export interface PaymentGateway {
  createOrder(amount: number, currency: string, reservationId: string): Promise<any>;
  verifyPayment(orderId: string, paymentId: string, signature: string): boolean;
  processRefund(paymentId: string, amount: number): Promise<any>;
}

export class RazorpayGateway implements PaymentGateway {
  private keyId = process.env.RAZORPAY_KEY_ID || '';
  private keySecret = process.env.RAZORPAY_KEY_SECRET || '';

  async createOrder(amount: number, currency: string = 'INR', reservationId: string) {
    return {
      id: `order_${crypto.randomBytes(8).toString('hex')}`,
      amount: Math.round(amount * 100),
      currency,
      receipt: reservationId,
      status: 'created',
    };
  }

  verifyPayment(orderId: string, paymentId: string, signature: string): boolean {
    const generatedSignature = crypto
      .createHmac('sha256', this.keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    
    return generatedSignature === signature;
  }

  async processRefund(paymentId: string, amount: number) {
    return {
      id: `rfnd_${crypto.randomBytes(8).toString('hex')}`,
      payment_id: paymentId,
      amount: Math.round(amount * 100),
      status: 'processed',
    };
  }
}

export function getPaymentGateway(): PaymentGateway {
  return new RazorpayGateway();
}

export async function handlePaymentWebhook(body: any, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(typeof body === 'string' ? body : JSON.stringify(body))
    .digest('hex');

  if (expectedSignature !== signature) {
    throw new Error('Invalid webhook signature');
  }

  const payload = typeof body === 'string' ? JSON.parse(body) : body;
  const event = payload.event;
  if (event === 'payment.captured' || event === 'order.paid') {
    const paymentEntity = payload.payload?.payment?.entity;
    const orderId = paymentEntity?.order_id;
    
    if (!orderId) return;

    const dbPayment = await prisma.payment.findFirst({ where: { gatewayOrderId: orderId } });
    if (!dbPayment) return;

    if (dbPayment.status !== PaymentStatus.PAID) {
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: dbPayment.id },
          data: { status: PaymentStatus.PAID, gatewayPaymentId: paymentEntity?.id },
        });

        await tx.reservation.update({
          where: { id: dbPayment.reservationId },
          data: { status: ReservationStatus.CONFIRMED },
        });
      });
    }
  }
}

import nodemailer from 'nodemailer';
import { prisma } from './db';
import { formatCurrency, formatDate } from './utils';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

export function getBookingConfirmationHTML(reservation: any): string {
  const guestName = reservation.guestFirstName
    ? `${reservation.guestFirstName} ${reservation.guestLastName || ''}`
    : reservation.guestName || 'Guest';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h1 style="color: #1B4D3E; text-align: center;">Grand Vista Hotel</h1>
      <h2 style="color: #C9A96E;">Booking Confirmation</h2>
      <p>Dear ${guestName},</p>
      <p>Thank you for choosing Grand Vista Hotel. Your reservation is confirmed!</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Booking ID:</strong> ${reservation.bookingId}</p>
        <p><strong>Check-in:</strong> ${formatDate(reservation.checkIn)}</p>
        <p><strong>Check-out:</strong> ${formatDate(reservation.checkOut)}</p>
        <p><strong>Guests:</strong> ${reservation.adults || reservation.guests || 2} Adults</p>
        <p><strong>Total Amount:</strong> ${formatCurrency(reservation.totalAmount)}</p>
      </div>
      
      <p>We look forward to welcoming you.</p>
      <p>Warm regards,<br>The Grand Vista Team</p>
    </div>
  `;
}

async function sendEmailAndLog(to: string, subject: string, html: string, template: string = 'generic') {
  try {
    if (process.env.SMTP_USER) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"Grand Vista Hotel" <reservations@grandvistahotel.com>`,
        to,
        subject,
        html,
      });
    }

    await prisma.emailLog.create({
      data: {
        to,
        subject,
        template,
        status: 'sent',
      },
    });
  } catch (error: any) {
    console.error('Email sending failed (will log):', error?.message || error);
    try {
      await prisma.emailLog.create({
        data: {
          to,
          subject,
          template,
          status: 'failed',
          error: error?.message || 'Unknown error',
        },
      });
    } catch {
      // Ignore db error
    }
  }
}

export async function sendBookingConfirmation(reservation: any) {
  const html = getBookingConfirmationHTML(reservation);
  await sendEmailAndLog(reservation.guestEmail, 'Booking Confirmation - Grand Vista Hotel', html, 'booking-confirmation');
}

export async function sendPaymentConfirmation(reservation: any, payment: any) {
  const html = `<p>Your payment of ${formatCurrency(payment.amount)} for booking ${reservation.bookingId} is successful.</p>`;
  await sendEmailAndLog(reservation.guestEmail, 'Payment Receipt - Grand Vista Hotel', html, 'payment-receipt');
}

export async function sendCancellationConfirmation(reservation: any) {
  const html = `<p>Your booking ${reservation.bookingId} has been cancelled.</p>`;
  await sendEmailAndLog(reservation.guestEmail, 'Booking Cancellation - Grand Vista Hotel', html, 'booking-cancellation');
}

export async function sendCheckInReminder(reservation: any) {
  const html = `<p>We look forward to seeing you tomorrow for your stay at Grand Vista Hotel!</p>`;
  await sendEmailAndLog(reservation.guestEmail, 'Check-in Reminder - Grand Vista Hotel', html, 'checkin-reminder');
}

export async function createInternalNotification(userId: string | null, title: string, message: string, type: string, link?: string) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
      link,
      isRead: false,
    },
  });
}

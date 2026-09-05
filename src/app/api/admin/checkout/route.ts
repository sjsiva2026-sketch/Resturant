import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { createAuditLog } from '@/lib/audit';
import { differenceInDays } from 'date-fns';
import { ReservationStatus, RoomStatus, HousekeepingStatus } from '@prisma/client';

const checkoutSchema = z.object({
  reservationId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id') || 'system';
    
    const body = await req.json();
    const { reservationId } = checkoutSchema.parse(body);

    const result = await db.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({ 
        where: { id: reservationId },
        include: { reservationRooms: true, guest: true },
      });
      
      if (!reservation) throw new Error('Reservation not found');
      if (reservation.status !== ReservationStatus.CHECKED_IN) {
        throw new Error('Reservation must be CHECKED_IN to check out');
      }

      const assignedRoomId = reservation.reservationRooms[0]?.roomId;

      const checkInDate = new Date(reservation.checkIn);
      const checkOutDate = new Date();
      let nights = differenceInDays(checkOutDate, checkInDate);
      if (nights <= 0) nights = 1;

      // Update reservation
      const updatedRes = await tx.reservation.update({
        where: { id: reservationId },
        data: {
          status: ReservationStatus.CHECKED_OUT,
          checkedOutAt: checkOutDate,
        },
      });

      // Update room status to DIRTY if room was assigned
      if (assignedRoomId) {
        await tx.room.update({
          where: { id: assignedRoomId },
          data: { status: RoomStatus.DIRTY },
        });

        // Create housekeeping task
        await tx.housekeepingTask.create({
          data: {
            roomId: assignedRoomId,
            status: HousekeepingStatus.DIRTY,
            notes: 'Checkout cleaning required',
          },
        });
      }

      // Update guest stats on user table
      if (reservation.guestId) {
        await tx.user.update({
          where: { id: reservation.guestId },
          data: {
            totalStays: { increment: 1 },
            totalNights: { increment: nights },
            totalSpending: { increment: reservation.totalAmount },
            lastStay: checkOutDate,
          },
        });
      }

      return { reservation: updatedRes, nights };
    });

    createAuditLog(userId, 'CHECK_OUT', 'Reservation', reservationId).catch(console.error);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Checkout POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to check out' }, { status: 400 });
  }
}

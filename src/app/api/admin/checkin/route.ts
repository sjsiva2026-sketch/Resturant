import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { createAuditLog } from '@/lib/audit';
import { ReservationStatus, RoomStatus } from '@prisma/client';

const checkinSchema = z.object({
  reservationId: z.string().min(1),
  roomId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id') || 'system';
    const body = await req.json();
    const { reservationId, roomId } = checkinSchema.parse(body);

    const result = await db.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: { id: reservationId },
        include: { reservationRooms: true },
      });
      if (!reservation) throw new Error('Reservation not found');
      if (reservation.status !== ReservationStatus.CONFIRMED) {
        throw new Error('Reservation must be CONFIRMED to check in');
      }

      const room = await tx.room.findUnique({ where: { id: roomId } });
      if (!room) throw new Error('Room not found');
      if (room.status !== RoomStatus.AVAILABLE) {
        throw new Error(`Room is currently ${room.status}, not AVAILABLE`);
      }

      // Update room in reservationRooms
      if (reservation.reservationRooms.length > 0) {
        await tx.reservationRoom.update({
          where: { id: reservation.reservationRooms[0].id },
          data: { roomId },
        });
      }

      // Update reservation
      const updatedRes = await tx.reservation.update({
        where: { id: reservationId },
        data: {
          status: ReservationStatus.CHECKED_IN,
          checkedInAt: new Date(),
        },
      });

      // Update physical room status
      await tx.room.update({
        where: { id: roomId },
        data: { status: RoomStatus.OCCUPIED },
      });

      return updatedRes;
    });

    createAuditLog(userId, 'CHECK_IN', 'Reservation', reservationId, null, { roomId }).catch(console.error);

    return NextResponse.json({ success: true, reservation: result });
  } catch (error: any) {
    console.error('Checkin POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to check in' }, { status: 400 });
  }
}

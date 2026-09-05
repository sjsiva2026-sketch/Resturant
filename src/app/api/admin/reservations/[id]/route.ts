import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { ReservationStatus } from '@prisma/client';

const updateReservationSchema = z.object({
  status: z.enum(['PENDING_PAYMENT', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW']).optional(),
  specialRequests: z.string().optional(),
  roomId: z.string().optional().nullable(),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const reservation = await db.reservation.findUnique({
      where: { id },
      include: {
        guest: true,
        reservationRooms: {
          include: { roomType: true, room: true },
        },
        payments: true,
        reservationAddons: {
          include: { addon: true },
        },
      },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Reservation GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch reservation' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, specialRequests, roomId } = updateReservationSchema.parse(body);

    const reservation = await db.$transaction(async (tx) => {
      if (roomId) {
        const resRooms = await tx.reservationRoom.findMany({ where: { reservationId: id } });
        if (resRooms.length > 0) {
          await tx.reservationRoom.update({
            where: { id: resRooms[0].id },
            data: { roomId },
          });
        }
      }

      return tx.reservation.update({
        where: { id },
        data: {
          status: status ? (status as ReservationStatus) : undefined,
          specialRequests: specialRequests !== undefined ? specialRequests : undefined,
        },
      });
    });

    return NextResponse.json(reservation);
  } catch (error: any) {
    console.error('Reservation PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const reservation = await db.reservation.findUnique({ where: { id } });
    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    if (['CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'].includes(reservation.status)) {
      return NextResponse.json({ error: `Cannot cancel reservation in ${reservation.status} state` }, { status: 400 });
    }

    const cancelled = await db.reservation.update({
      where: { id },
      data: {
        status: ReservationStatus.CANCELLED,
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: 'Reservation cancelled', reservation: cancelled });
  } catch (error) {
    console.error('Reservation DELETE error:', error);
    return NextResponse.json({ error: 'Failed to cancel reservation' }, { status: 500 });
  }
}

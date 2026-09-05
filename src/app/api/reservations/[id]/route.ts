import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        reservationRooms: {
          include: {
            roomType: true,
            ratePlan: true,
          },
        },
        reservationAddons: {
          include: { addon: true },
        },
        payments: true,
      },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Fetch reservation error:', error);
    return NextResponse.json({ error: 'Failed to fetch reservation' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { specialRequests, estimatedArrivalTime } = await request.json();

    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        specialRequests: specialRequests !== undefined ? specialRequests : undefined,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Update reservation error:', error);
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}

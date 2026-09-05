import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id }
    });

    if (!reservation || reservation.status === 'CANCELLED') {
      return NextResponse.json({ error: 'Reservation cannot be cancelled' }, { status: 400 });
    }

    // Example logic for cancellation fee, simplified
    const cancellationFee = 0; 
    
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Reservation cancelled successfully', 
      cancellationFee,
      reservation: updatedReservation
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to cancel reservation' }, { status: 500 });
  }
}

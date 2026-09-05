import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { MaintenanceStatus, RoomStatus } from '@prisma/client';

const updateTicketSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']).optional(),
  description: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, description } = updateTicketSchema.parse(body);

    const ticket = await db.$transaction(async (tx) => {
      const existing = await tx.maintenanceTicket.findUnique({ where: { id } });
      if (!existing) throw new Error('Ticket not found');

      const updated = await tx.maintenanceTicket.update({
        where: { id },
        data: {
          status: status ? (status as MaintenanceStatus) : undefined,
          description: description || undefined,
          resolvedAt: status === 'RESOLVED' ? new Date() : undefined,
        },
      });

      if (status === 'RESOLVED') {
        await tx.room.update({
          where: { id: existing.roomId },
          data: { status: RoomStatus.DIRTY },
        });

        await tx.availabilityBlock.deleteMany({
          where: {
            roomId: existing.roomId,
            reason: { startsWith: 'Maintenance' },
          },
        });
      }

      return updated;
    });

    return NextResponse.json(ticket);
  } catch (error: any) {
    console.error('Maintenance PUT error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update maintenance ticket' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.maintenanceTicket.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Ticket deleted' });
  } catch (error) {
    console.error('Maintenance DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete maintenance ticket' }, { status: 500 });
  }
}

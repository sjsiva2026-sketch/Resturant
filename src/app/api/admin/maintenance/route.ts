import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { MaintenancePriority, MaintenanceStatus, RoomStatus } from '@prisma/client';

const createTicketSchema = z.object({
  roomId: z.string().min(1),
  issue: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let whereClause: any = {};
    if (status) whereClause.status = status as MaintenanceStatus;

    const tickets = await db.maintenanceTicket.findMany({
      where: whereClause,
      include: {
        room: true,
        reportedBy: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Maintenance GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch maintenance tickets' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id') || 'system';
    const body = await req.json();
    const data = createTicketSchema.parse(body);

    // Ensure we have a valid reporter user
    let reporter = await db.user.findFirst({ where: { role: 'ADMIN' } });
    if (!reporter) {
      reporter = await db.user.findFirst();
    }
    const reportedById = reporter?.id || userId;

    const ticket = await db.$transaction(async (tx) => {
      const newTicket = await tx.maintenanceTicket.create({
        data: {
          roomId: data.roomId,
          issue: data.issue,
          description: data.description,
          priority: data.priority as MaintenancePriority,
          status: MaintenanceStatus.OPEN,
          reportedById,
        },
      });

      await tx.room.update({
        where: { id: data.roomId },
        data: { status: RoomStatus.MAINTENANCE },
      });

      await tx.availabilityBlock.create({
        data: {
          roomId: data.roomId,
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          reason: `Maintenance: ${data.issue}`,
        },
      });

      return newTicket;
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error: any) {
    console.error('Maintenance POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create maintenance ticket' }, { status: 500 });
  }
}

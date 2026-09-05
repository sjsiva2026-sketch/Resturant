import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { HousekeepingStatus, RoomStatus } from '@prisma/client';

const updateHousekeepingSchema = z.object({
  roomId: z.string().min(1),
  status: z.enum(['DIRTY', 'CLEANING', 'CLEAN', 'INSPECTED']),
  notes: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const floor = searchParams.get('floor');

    let whereClause: any = {};
    if (status) whereClause.status = status as RoomStatus;
    if (floor) whereClause.floor = parseInt(floor, 10);

    const rooms = await db.room.findMany({
      where: whereClause,
      include: {
        roomType: { select: { name: true } },
        housekeepingTasks: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { roomNumber: 'asc' },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Housekeeping GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch housekeeping status' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { roomId, status, notes } = updateHousekeepingSchema.parse(body);

    const result = await db.$transaction(async (tx) => {
      let newRoomStatus: RoomStatus | undefined = undefined;
      if (status === 'INSPECTED' || status === 'CLEAN') {
        newRoomStatus = RoomStatus.AVAILABLE;
      } else if (status === 'DIRTY') {
        newRoomStatus = RoomStatus.DIRTY;
      } else if (status === 'CLEANING') {
        newRoomStatus = RoomStatus.CLEANING;
      }
      
      if (newRoomStatus) {
        await tx.room.update({
          where: { id: roomId },
          data: { status: newRoomStatus },
        });
      }

      const task = await tx.housekeepingTask.create({
        data: {
          roomId,
          status: status as HousekeepingStatus,
          notes,
        },
      });

      return task;
    });

    return NextResponse.json({ success: true, task: result });
  } catch (error: any) {
    console.error('Housekeeping PATCH error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update housekeeping status' }, { status: 500 });
  }
}

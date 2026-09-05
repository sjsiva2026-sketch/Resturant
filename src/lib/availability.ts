import { prisma } from './db';
import { ReservationStatus } from '@prisma/client';

export async function checkAvailability(checkIn: Date, checkOut: Date, roomTypeId?: string) {
  const roomTypes = await prisma.roomType.findMany({
    where: {
      isActive: true,
      ...(roomTypeId ? { id: roomTypeId } : {}),
    },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
      ratePlans: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  const availableRoomTypes = await Promise.all(
    roomTypes.map(async (rt) => {
      const count = await getAvailableRoomCount(rt.id, checkIn, checkOut);
      return {
        ...rt,
        availableCount: count,
      };
    })
  );

  return availableRoomTypes.filter((rt) => rt.availableCount > 0);
}

export async function getAvailableRoomCount(
  roomTypeId: string,
  checkIn: Date,
  checkOut: Date
): Promise<number> {
  const rooms = await prisma.room.findMany({
    where: {
      roomTypeId,
      isActive: true,
      status: { notIn: ['OUT_OF_SERVICE'] },
    },
  });

  const roomIds = rooms.map((r) => r.id);
  if (roomIds.length === 0) return 0;

  // Find overlaps in reservations (PENDING_PAYMENT, CONFIRMED, CHECKED_IN)
  const overlappingReservationRooms = await prisma.reservationRoom.findMany({
    where: {
      OR: [
        { roomId: { in: roomIds } },
        { roomTypeId: roomTypeId },
      ],
      reservation: {
        status: {
          in: [
            ReservationStatus.PENDING_PAYMENT,
            ReservationStatus.CONFIRMED,
            ReservationStatus.CHECKED_IN,
          ],
        },
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
      },
    },
    select: {
      roomId: true,
    },
  });

  // Count occupied rooms
  const assignedRoomIds = new Set<string>();
  let unassignedCount = 0;

  overlappingReservationRooms.forEach((rr) => {
    if (rr.roomId) {
      assignedRoomIds.add(rr.roomId);
    } else {
      unassignedCount++;
    }
  });

  // Find overlaps in availability blocks (e.g. maintenance)
  const availabilityBlocks = await prisma.availabilityBlock.findMany({
    where: {
      roomId: { in: roomIds },
      startDate: { lt: checkOut },
      endDate: { gt: checkIn },
    },
  });

  availabilityBlocks.forEach((ab) => assignedRoomIds.add(ab.roomId));

  // Find active holds
  const activeHolds = await prisma.bookingHold.findMany({
    where: {
      roomTypeId,
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn },
      expiresAt: { gt: new Date() },
      isReleased: false,
    },
  });

  const holdCount = activeHolds.reduce((sum, hold) => sum + hold.roomsHeld, 0);

  const availablePhysical = rooms.length - assignedRoomIds.size - unassignedCount;
  return Math.max(0, availablePhysical - holdCount);
}

export async function isRoomAvailable(roomId: string, checkIn: Date, checkOut: Date): Promise<boolean> {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room || !room.isActive || room.status === 'OUT_OF_SERVICE') {
    return false;
  }

  const overlappingReservation = await prisma.reservationRoom.findFirst({
    where: {
      roomId,
      reservation: {
        status: {
          in: [
            ReservationStatus.PENDING_PAYMENT,
            ReservationStatus.CONFIRMED,
            ReservationStatus.CHECKED_IN,
          ],
        },
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
      },
    },
  });

  if (overlappingReservation) return false;

  const overlappingBlock = await prisma.availabilityBlock.findFirst({
    where: {
      roomId,
      startDate: { lt: checkOut },
      endDate: { gt: checkIn },
    },
  });

  return !overlappingBlock;
}

export async function getBlockedDates(roomTypeId: string) {
  const futureBookings = await prisma.reservationRoom.findMany({
    where: {
      roomTypeId,
      reservation: {
        status: {
          in: [
            ReservationStatus.PENDING_PAYMENT,
            ReservationStatus.CONFIRMED,
            ReservationStatus.CHECKED_IN,
          ],
        },
        checkOut: { gt: new Date() },
      },
    },
    include: { reservation: true },
  });

  return futureBookings.map((b) => ({
    start: b.reservation.checkIn,
    end: b.reservation.checkOut,
  }));
}

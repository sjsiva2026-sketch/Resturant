import { prisma } from './db';
import { generateBookingId } from './utils';
import { getAvailableRoomCount } from './availability';
import { calculateBookingTotal } from './pricing';
import { ReservationStatus } from '@prisma/client';

export async function createBookingHold(sessionId: string, roomTypeId: string, checkIn: Date, checkOut: Date, rooms: number) {
  const available = await getAvailableRoomCount(roomTypeId, checkIn, checkOut);
  if (available < rooms) {
    throw new Error('Not enough rooms available for these dates');
  }

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return prisma.bookingHold.create({
    data: {
      sessionId,
      roomTypeId,
      checkIn,
      checkOut,
      roomsHeld: rooms,
      expiresAt,
      isReleased: false,
    },
  });
}

export async function releaseExpiredHolds() {
  return prisma.bookingHold.updateMany({
    where: {
      expiresAt: { lt: new Date() },
      isReleased: false,
    },
    data: {
      isReleased: true,
    },
  });
}

export async function createReservation(data: any) {
  return prisma.$transaction(async (tx) => {
    // 1 & 2. Validate hold & availability if holdId provided
    if (data.holdId) {
      const hold = await tx.bookingHold.findUnique({ where: { id: data.holdId } });
      if (!hold || hold.isReleased || hold.expiresAt < new Date()) {
        throw new Error('Booking hold is invalid or expired');
      }
    }

    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);

    // 3. Calculate total
    const pricing = await calculateBookingTotal({
      ratePlanId: data.ratePlanId,
      checkIn,
      checkOut,
      addons: data.addons || [],
      guests: (data.adults || 2) + (data.children || 0),
      rooms: data.rooms || 1,
      couponCode: data.couponCode,
      roomTypeId: data.roomTypeId,
      userId: data.guestId,
    });

    // 4. Create reservation
    const bookingId = generateBookingId();

    const reservation = await tx.reservation.create({
      data: {
        bookingId,
        guestId: data.guestId,
        status: ReservationStatus.PENDING_PAYMENT,
        checkIn,
        checkOut,
        adults: data.adults || 2,
        children: data.children || 0,
        numRooms: data.rooms || 1,
        totalAmount: pricing.totalAmount,
        subtotal: pricing.subtotal,
        taxAmount: pricing.taxAmount,
        discountAmount: pricing.discountAmount,
        addonAmount: pricing.addonTotal,
        specialRequests: data.specialRequests,
        guestFirstName: data.guestFirstName || (data.guestName ? data.guestName.split(' ')[0] : 'Guest'),
        guestLastName: data.guestLastName || (data.guestName ? data.guestName.split(' ').slice(1).join(' ') || 'User' : 'User'),
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        guestCity: data.guestCity,
        guestState: data.guestState,
        guestCountry: data.guestCountry || 'India',
        guestPostalCode: data.guestPostalCode,
        reservationRooms: {
          create: {
            roomTypeId: data.roomTypeId,
            ratePlanId: data.ratePlanId,
            ratePerNight: pricing.nightlyRates[0] || pricing.subtotal,
          },
        },
      },
    });

    // Mark hold as released/consumed
    if (data.holdId) {
      await tx.bookingHold.update({
        where: { id: data.holdId },
        data: { isReleased: true },
      });
    }

    return reservation;
  }, {
    isolationLevel: 'Serializable',
  });
}

export async function cancelReservation(reservationId: string, reason: string) {
  const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
  if (!reservation) throw new Error('Reservation not found');

  return prisma.reservation.update({
    where: { id: reservationId },
    data: {
      status: ReservationStatus.CANCELLED,
      cancellationReason: reason,
      cancelledAt: new Date(),
    },
  });
}

export async function getReservation(bookingId: string) {
  return prisma.reservation.findUnique({
    where: { bookingId },
    include: {
      reservationRooms: {
        include: { roomType: true },
      },
      reservationAddons: {
        include: { addon: true },
      },
      payments: true,
      guest: true,
    },
  });
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  return prisma.reservation.update({
    where: { id },
    data: { status },
  });
}

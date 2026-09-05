import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { BookingSource, PaymentMethod, PaymentStatus, ReservationStatus, UserRole } from '@prisma/client';
import { generateBookingId } from '@/lib/utils';
import { hash } from 'bcryptjs';

const createReservationSchema = z.object({
  guestId: z.string().optional(),
  guestData: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
  }).optional(),
  roomTypeId: z.string(),
  ratePlanId: z.string().optional(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  adults: z.number().min(1).default(2),
  children: z.number().default(0),
  totalPrice: z.number().min(0),
  source: z.enum(['WEBSITE', 'WALK_IN', 'PHONE', 'WHATSAPP', 'EMAIL', 'ADMIN', 'CORPORATE']).default('ADMIN'),
  paidAmount: z.number().default(0),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;
    
    let whereClause: any = {};
    if (status) whereClause.status = status as ReservationStatus;
    if (search) {
      whereClause.OR = [
        { bookingId: { contains: search, mode: 'insensitive' } },
        { guestFirstName: { contains: search, mode: 'insensitive' } },
        { guestLastName: { contains: search, mode: 'insensitive' } },
        { guestEmail: { contains: search, mode: 'insensitive' } },
        { guestPhone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [reservations, total] = await Promise.all([
      db.reservation.findMany({
        where: whereClause,
        include: {
          guest: {
            select: { id: true, firstName: true, lastName: true, email: true, phone: true },
          },
          reservationRooms: {
            include: { roomType: true, room: true },
          },
          payments: { select: { amount: true, status: true, method: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.reservation.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: reservations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Reservations GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createReservationSchema.parse(body);

    const reservation = await db.$transaction(async (tx) => {
      let guestId = data.guestId;
      let firstName = data.guestData?.firstName || 'Walk-in';
      let lastName = data.guestData?.lastName || 'Guest';
      let email = data.guestData?.email || `guest_${Date.now()}@grandvistahotel.com`;
      let phone = data.guestData?.phone || '';
      
      if (!guestId && data.guestData) {
        let user = await tx.user.findUnique({ where: { email: data.guestData.email } });
        if (!user) {
          const defaultPassword = await hash('Guest@2026', 10);
          user = await tx.user.create({
            data: {
              email: data.guestData.email,
              firstName: data.guestData.firstName,
              lastName: data.guestData.lastName,
              phone: data.guestData.phone || null,
              passwordHash: defaultPassword,
              role: UserRole.GUEST,
            },
          });
        }
        guestId = user.id;
        firstName = user.firstName;
        lastName = user.lastName;
        email = user.email;
        phone = user.phone || '';
      }

      if (!guestId) {
        let fallbackUser = await tx.user.findFirst({ where: { role: UserRole.GUEST } });
        if (!fallbackUser) {
          fallbackUser = await tx.user.findFirst();
        }
        guestId = fallbackUser?.id || '';
      }

      // Find rate plan if not provided
      let ratePlanId = data.ratePlanId;
      if (!ratePlanId) {
        const defaultRatePlan = await tx.ratePlan.findFirst({
          where: { roomTypeId: data.roomTypeId, isActive: true },
        });
        ratePlanId = defaultRatePlan?.id || '';
      }

      const res = await tx.reservation.create({
        data: {
          bookingId: generateBookingId(),
          guestId,
          checkIn: new Date(data.checkInDate),
          checkOut: new Date(data.checkOutDate),
          adults: data.adults,
          children: data.children,
          subtotal: data.totalPrice,
          totalAmount: data.totalPrice,
          status: ReservationStatus.CONFIRMED,
          source: data.source as BookingSource,
          guestFirstName: firstName,
          guestLastName: lastName,
          guestEmail: email,
          guestPhone: phone,
          reservationRooms: {
            create: {
              roomTypeId: data.roomTypeId,
              ratePlanId: ratePlanId,
              ratePerNight: data.totalPrice,
            },
          },
        },
      });

      if (data.paidAmount > 0) {
        await tx.payment.create({
          data: {
            reservationId: res.id,
            amount: data.paidAmount,
            method: PaymentMethod.CASH,
            status: PaymentStatus.PAID,
          },
        });
      }

      return res;
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error: any) {
    console.error('Reservation POST error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create reservation' }, { status: 500 });
  }
}

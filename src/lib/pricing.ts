import { prisma } from './db';
import { calculateNights } from './utils';
import { Prisma } from '@prisma/client';

export async function calculateRoomRate(ratePlanId: string, checkIn: Date, checkOut: Date) {
  const ratePlan = await prisma.ratePlan.findUniqueOrThrow({ where: { id: ratePlanId } });
  const nights = calculateNights(checkIn, checkOut);
  const nightlyRates: Array<{ date: Date; amount: Prisma.Decimal }> = [];
  
  let subtotal = new Prisma.Decimal(0);
  
  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(checkIn);
    currentDate.setDate(currentDate.getDate() + i);
    
    const specificRate = await prisma.roomRate.findFirst({
      where: {
        ratePlanId,
        date: {
          gte: new Date(currentDate.setHours(0, 0, 0, 0)),
          lt: new Date(currentDate.setHours(23, 59, 59, 999)),
        },
      },
    });

    const amount = specificRate ? specificRate.rate : ratePlan.baseRate;
    nightlyRates.push({ date: currentDate, amount });
    subtotal = subtotal.add(amount);
  }

  return { nightlyRates, subtotal };
}

export function calculateTax(amount: Prisma.Decimal) {
  const numAmount = amount.toNumber();
  const taxRate = numAmount <= 7500 ? 0.12 : 0.18;
  const taxAmount = new Prisma.Decimal(numAmount * taxRate);
  return { taxAmount, taxRate: taxRate * 100 };
}

export function calculateAddonPrice(addon: any, nights: number, guests: number, rooms: number) {
  let total = new Prisma.Decimal(0);
  const price = new Prisma.Decimal(addon.price || 0);

  switch (addon.pricingMethod) {
    case 'PER_BOOKING':
      total = price;
      break;
    case 'PER_NIGHT':
      total = price.mul(nights);
      break;
    case 'PER_PERSON':
      total = price.mul(guests);
      break;
    case 'PER_PERSON_PER_NIGHT':
      total = price.mul(guests * nights);
      break;
    case 'PER_ROOM':
      total = price.mul(rooms);
      break;
    default:
      total = price;
  }
  return total;
}

export async function applyCoupon(subtotal: Prisma.Decimal, couponCode: string, roomTypeId: string, userId?: string) {
  const coupon = await prisma.coupon.findUnique({
    where: { code: couponCode, isActive: true },
  });

  if (!coupon) throw new Error('Invalid or expired coupon');
  
  if (coupon.expiryDate && coupon.expiryDate < new Date()) {
    throw new Error('Coupon has expired');
  }

  if (coupon.minBookingAmount && subtotal.lessThan(coupon.minBookingAmount)) {
    throw new Error(`Minimum spend of ₹${coupon.minBookingAmount} required`);
  }

  let discountAmount = new Prisma.Decimal(0);
  if (coupon.discountType === 'PERCENTAGE') {
    discountAmount = subtotal.mul(coupon.discountValue).div(100);
    if (coupon.maxDiscount && discountAmount.greaterThan(coupon.maxDiscount)) {
      discountAmount = new Prisma.Decimal(coupon.maxDiscount);
    }
  } else {
    discountAmount = new Prisma.Decimal(coupon.discountValue);
  }

  return { discountAmount, couponId: coupon.id };
}

export async function calculateBookingTotal(params: {
  ratePlanId: string;
  checkIn: Date;
  checkOut: Date;
  addons: any[];
  guests: number;
  rooms: number;
  couponCode?: string;
  roomTypeId: string;
  userId?: string;
}) {
  const { ratePlanId, checkIn, checkOut, addons, guests, rooms, couponCode, roomTypeId, userId } = params;
  
  const { nightlyRates, subtotal } = await calculateRoomRate(ratePlanId, checkIn, checkOut);
  
  let addonTotal = new Prisma.Decimal(0);
  const nights = calculateNights(checkIn, checkOut);

  for (const addon of addons) {
    addonTotal = addonTotal.add(calculateAddonPrice(addon, nights, guests, rooms));
  }

  const baseTotal = subtotal.add(addonTotal);
  
  let discountAmount = new Prisma.Decimal(0);
  let couponId = null;

  if (couponCode) {
    try {
      const couponResult = await applyCoupon(baseTotal, couponCode, roomTypeId, userId);
      discountAmount = couponResult.discountAmount;
      couponId = couponResult.couponId;
    } catch {
      // Ignore coupon error if invalid and calculate without discount
    }
  }

  const taxableAmount = baseTotal.sub(discountAmount);
  const { taxAmount, taxRate } = calculateTax(taxableAmount);
  
  const totalAmount = taxableAmount.add(taxAmount);

  return {
    nightlyRates: nightlyRates.map((nr) => nr.amount.toNumber()),
    subtotal: subtotal.toNumber(),
    addonTotal: addonTotal.toNumber(),
    taxAmount: taxAmount.toNumber(),
    taxRate,
    discountAmount: discountAmount.toNumber(),
    couponDiscount: discountAmount.toNumber(),
    totalAmount: totalAmount.toNumber(),
    couponId,
  };
}

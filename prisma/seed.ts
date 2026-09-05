import { PrismaClient, UserRole, RoomStatus, ReservationStatus, BookingSource, PaymentStatus, PaymentMethod, DiscountType, AddonPricing, MaintenancePriority, MaintenanceStatus, HousekeepingStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🏨 Seeding Grand Vista Hotel...');

  // ============================================
  // 1. HOTEL SETTINGS
  // ============================================
  const settings = [
    { key: 'hotel_name', value: 'Grand Vista Hotel', type: 'text', group: 'general', label: 'Hotel Name' },
    { key: 'hotel_tagline', value: 'Where Luxury Meets Serenity', type: 'text', group: 'general', label: 'Tagline' },
    { key: 'hotel_description', value: 'Nestled in the heart of the city, Grand Vista Hotel offers an unparalleled blend of luxury, comfort, and world-class hospitality. With stunning views, exquisite dining, and impeccable service, every stay becomes an extraordinary experience.', type: 'text', group: 'general', label: 'Description' },
    { key: 'hotel_stars', value: '5', type: 'number', group: 'general', label: 'Star Rating' },
    { key: 'hotel_address', value: '42 Marina Boulevard, Gateway District', type: 'text', group: 'contact', label: 'Address' },
    { key: 'hotel_city', value: 'Mumbai', type: 'text', group: 'contact', label: 'City' },
    { key: 'hotel_state', value: 'Maharashtra', type: 'text', group: 'contact', label: 'State' },
    { key: 'hotel_country', value: 'India', type: 'text', group: 'contact', label: 'Country' },
    { key: 'hotel_postal_code', value: '400001', type: 'text', group: 'contact', label: 'Postal Code' },
    { key: 'hotel_phone', value: '+91 22 6789 0000', type: 'text', group: 'contact', label: 'Phone' },
    { key: 'hotel_whatsapp', value: '+91 98765 43210', type: 'text', group: 'contact', label: 'WhatsApp' },
    { key: 'hotel_email', value: 'reservations@grandvistahotel.com', type: 'text', group: 'contact', label: 'Email' },
    { key: 'hotel_checkin_time', value: '14:00', type: 'text', group: 'booking', label: 'Check-in Time' },
    { key: 'hotel_checkout_time', value: '11:00', type: 'text', group: 'booking', label: 'Check-out Time' },
    { key: 'hotel_currency', value: 'INR', type: 'text', group: 'booking', label: 'Currency' },
    { key: 'hotel_currency_symbol', value: '₹', type: 'text', group: 'booking', label: 'Currency Symbol' },
    { key: 'hotel_timezone', value: 'Asia/Kolkata', type: 'text', group: 'booking', label: 'Timezone' },
    { key: 'hotel_gst_number', value: '27AABCU9603R1ZM', type: 'text', group: 'tax', label: 'GST Number' },
    { key: 'hotel_pan', value: 'AABCU9603R', type: 'text', group: 'tax', label: 'PAN' },
    { key: 'primary_color', value: '#1B4D3E', type: 'color', group: 'appearance', label: 'Primary Color' },
    { key: 'secondary_color', value: '#C9A96E', type: 'color', group: 'appearance', label: 'Secondary Color' },
    { key: 'google_maps_url', value: 'https://maps.google.com/?q=19.0760,72.8777', type: 'text', group: 'contact', label: 'Google Maps URL' },
    { key: 'google_maps_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.86!2d72.8777!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1', type: 'text', group: 'contact', label: 'Google Maps Embed URL' },
    { key: 'social_instagram', value: 'https://instagram.com/grandvistahotel', type: 'text', group: 'social', label: 'Instagram' },
    { key: 'social_facebook', value: 'https://facebook.com/grandvistahotel', type: 'text', group: 'social', label: 'Facebook' },
    { key: 'social_youtube', value: 'https://youtube.com/@grandvistahotel', type: 'text', group: 'social', label: 'YouTube' },
    { key: 'social_x', value: 'https://x.com/grandvistahotel', type: 'text', group: 'social', label: 'X (Twitter)' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/grandvistahotel', type: 'text', group: 'social', label: 'LinkedIn' },
    { key: 'booking_hold_minutes', value: '10', type: 'number', group: 'booking', label: 'Booking Hold (minutes)' },
    { key: 'max_advance_booking_days', value: '365', type: 'number', group: 'booking', label: 'Max Advance Booking (days)' },
  ];

  for (const setting of settings) {
    await prisma.hotelSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Hotel settings seeded');

  // ============================================
  // 2. TAX CONFIGURATION (India GST Slabs)
  // ============================================
  const taxes = [
    { name: 'GST 12% (Room rate up to ₹7,500)', rate: 12, minAmount: 0, maxAmount: 7500 },
    { name: 'GST 18% (Room rate ₹7,501+)', rate: 18, minAmount: 7501, maxAmount: null },
  ];

  for (const tax of taxes) {
    await prisma.taxConfig.create({
      data: {
        name: tax.name,
        rate: tax.rate,
        type: 'percentage',
        minAmount: tax.minAmount,
        maxAmount: tax.maxAmount,
      },
    });
  }
  console.log('✅ Tax configuration seeded');

  // ============================================
  // 3. USERS
  // ============================================
  const adminPassword = await hash('Admin@2026', 12);
  const receptionPassword = await hash('Reception@2026', 12);
  const housekeepingPassword = await hash('Housekeeping@2026', 12);
  const guestPassword = await hash('Guest@2026', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@grandvistahotel.com',
      phone: '+91 98765 00001',
      passwordHash: adminPassword,
      firstName: 'Rajesh',
      lastName: 'Sharma',
      role: 'ADMIN',
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      email: 'reception@grandvistahotel.com',
      phone: '+91 98765 00002',
      passwordHash: receptionPassword,
      firstName: 'Priya',
      lastName: 'Patel',
      role: 'RECEPTIONIST',
    },
  });

  const housekeeper = await prisma.user.create({
    data: {
      email: 'housekeeping@grandvistahotel.com',
      phone: '+91 98765 00003',
      passwordHash: housekeepingPassword,
      firstName: 'Suresh',
      lastName: 'Kumar',
      role: 'HOUSEKEEPING',
    },
  });

  const guest1 = await prisma.user.create({
    data: {
      email: 'arjun.mehta@email.com',
      phone: '+91 98765 11111',
      passwordHash: guestPassword,
      firstName: 'Arjun',
      lastName: 'Mehta',
      role: 'GUEST',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      totalStays: 3,
      totalNights: 7,
      totalSpending: 52500,
    },
  });

  const guest2 = await prisma.user.create({
    data: {
      email: 'sneha.reddy@email.com',
      phone: '+91 98765 22222',
      passwordHash: guestPassword,
      firstName: 'Sneha',
      lastName: 'Reddy',
      role: 'GUEST',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      totalStays: 1,
      totalNights: 2,
      totalSpending: 15000,
    },
  });

  console.log('✅ Users seeded');

  // ============================================
  // 4. AMENITIES
  // ============================================
  const amenityData = [
    { name: 'Free Wi-Fi', icon: 'wifi', category: 'connectivity' },
    { name: 'Air Conditioning', icon: 'thermometer', category: 'comfort' },
    { name: 'Smart TV', icon: 'tv', category: 'entertainment' },
    { name: 'Mini Bar', icon: 'wine', category: 'dining' },
    { name: 'Coffee Maker', icon: 'coffee', category: 'dining' },
    { name: '24/7 Room Service', icon: 'concierge-bell', category: 'service' },
    { name: 'Hot Water', icon: 'droplets', category: 'bathroom' },
    { name: 'Premium Wardrobe', icon: 'shirt', category: 'comfort' },
    { name: 'Work Desk', icon: 'laptop', category: 'business' },
    { name: 'In-room Safe', icon: 'lock', category: 'security' },
    { name: 'Hair Dryer', icon: 'wind', category: 'bathroom' },
    { name: 'Iron & Board', icon: 'shirt', category: 'comfort' },
    { name: 'Telephone', icon: 'phone', category: 'connectivity' },
    { name: 'Bathrobe & Slippers', icon: 'shirt', category: 'comfort' },
    { name: 'Rain Shower', icon: 'shower-head', category: 'bathroom' },
    { name: 'Balcony', icon: 'door-open', category: 'room' },
    { name: 'City View', icon: 'mountain', category: 'room' },
    { name: 'Sea View', icon: 'waves', category: 'room' },
    { name: 'Jacuzzi', icon: 'bath', category: 'bathroom' },
    { name: 'Living Area', icon: 'sofa', category: 'room' },
    { name: 'Kitchenette', icon: 'utensils', category: 'dining' },
    { name: 'Bluetooth Speaker', icon: 'speaker', category: 'entertainment' },
  ];

  const amenities: Record<string, string> = {};
  for (const a of amenityData) {
    const created = await prisma.amenity.create({ data: a });
    amenities[a.name] = created.id;
  }
  console.log('✅ Amenities seeded');

  // ============================================
  // 5. ROOM TYPES
  // ============================================
  const roomTypeData = [
    {
      name: 'Deluxe Room',
      slug: 'deluxe-room',
      description: 'Elegantly appointed and thoughtfully designed, our Deluxe Rooms offer a perfect retreat after a day of exploration. Featuring contemporary furnishings, plush bedding, and floor-to-ceiling windows that flood the space with natural light, these rooms provide the ideal balance of comfort and sophistication.',
      shortDescription: 'Contemporary comfort with city views and premium amenities',
      maxAdults: 2,
      maxChildren: 1,
      maxOccupancy: 3,
      bedType: 'King',
      sizeSqft: 350,
      viewType: 'City View',
      basePrice: 4500,
      sortOrder: 1,
      metaTitle: 'Deluxe Room - Grand Vista Hotel | Premium Stay in Mumbai',
      metaDescription: 'Book our elegant Deluxe Room with city views, king bed, and premium amenities. Starting at ₹4,500 per night.',
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Maker', '24/7 Room Service', 'Hot Water', 'Premium Wardrobe', 'Work Desk', 'In-room Safe', 'Hair Dryer', 'Iron & Board', 'Telephone', 'City View'],
    },
    {
      name: 'Premium Room',
      slug: 'premium-room',
      description: 'Step into refined luxury with our Premium Rooms. Offering additional space and enhanced amenities, these rooms feature handcrafted furniture, premium bath amenities, and a dedicated seating area. The perfect choice for discerning travelers who appreciate the finer details.',
      shortDescription: 'Enhanced luxury with extra space and premium bath amenities',
      maxAdults: 2,
      maxChildren: 1,
      maxOccupancy: 3,
      bedType: 'King',
      sizeSqft: 420,
      viewType: 'City View',
      basePrice: 6000,
      sortOrder: 2,
      metaTitle: 'Premium Room - Grand Vista Hotel | Luxury Accommodation Mumbai',
      metaDescription: 'Experience enhanced luxury in our Premium Room with extra space, premium amenities, and stunning views. From ₹6,000/night.',
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Maker', '24/7 Room Service', 'Hot Water', 'Premium Wardrobe', 'Work Desk', 'In-room Safe', 'Hair Dryer', 'Iron & Board', 'Telephone', 'Bathrobe & Slippers', 'Rain Shower', 'City View'],
    },
    {
      name: 'Executive Room',
      slug: 'executive-room',
      description: 'Designed for the modern business traveler, our Executive Rooms combine workspace efficiency with residential comfort. Featuring a large work desk, ergonomic seating, high-speed connectivity, and a luxurious bathroom with rain shower. Complimentary access to the Executive Lounge.',
      shortDescription: 'Business-ready luxury with Executive Lounge access',
      maxAdults: 2,
      maxChildren: 1,
      maxOccupancy: 3,
      bedType: 'King',
      sizeSqft: 480,
      viewType: 'City View',
      basePrice: 7500,
      sortOrder: 3,
      metaTitle: 'Executive Room - Grand Vista Hotel | Business Travel Mumbai',
      metaDescription: 'Our Executive Room offers business-ready luxury with lounge access, high-speed WiFi, and premium amenities. From ₹7,500/night.',
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Maker', '24/7 Room Service', 'Hot Water', 'Premium Wardrobe', 'Work Desk', 'In-room Safe', 'Hair Dryer', 'Iron & Board', 'Telephone', 'Bathrobe & Slippers', 'Rain Shower', 'Bluetooth Speaker', 'City View'],
    },
    {
      name: 'Family Room',
      slug: 'family-room',
      description: 'Spacious and thoughtfully designed for families, our Family Rooms offer ample space for parents and children. Featuring twin beds or a king bed with an additional sofa bed, child-friendly amenities, and a separate dressing area. Creating memories together in comfort.',
      shortDescription: 'Spacious family-friendly room with extra beds and amenities',
      maxAdults: 3,
      maxChildren: 2,
      maxOccupancy: 5,
      bedType: 'Twin + Sofa Bed',
      sizeSqft: 550,
      viewType: 'Garden View',
      basePrice: 8500,
      sortOrder: 4,
      metaTitle: 'Family Room - Grand Vista Hotel | Family Stay Mumbai',
      metaDescription: 'Perfect for families — spacious rooms with extra beds, child-friendly amenities, and garden views. From ₹8,500/night.',
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Maker', '24/7 Room Service', 'Hot Water', 'Premium Wardrobe', 'Work Desk', 'In-room Safe', 'Hair Dryer', 'Iron & Board', 'Telephone', 'Bathrobe & Slippers'],
    },
    {
      name: 'Junior Suite',
      slug: 'junior-suite',
      description: 'Our Junior Suites redefine luxury living with a seamless flow between the sleeping and living areas. Featuring a spacious layout with premium furnishings, a deep soaking bathtub, walk-in rain shower, and a private balcony offering breathtaking views of the city skyline.',
      shortDescription: 'Luxurious suite with living area, bathtub, and private balcony',
      maxAdults: 2,
      maxChildren: 2,
      maxOccupancy: 4,
      bedType: 'King',
      sizeSqft: 650,
      viewType: 'Sea View',
      basePrice: 12000,
      sortOrder: 5,
      metaTitle: 'Junior Suite - Grand Vista Hotel | Luxury Suite Mumbai',
      metaDescription: 'Indulge in our Junior Suite with living area, private balcony, sea views, and luxury bath. From ₹12,000/night.',
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Maker', '24/7 Room Service', 'Hot Water', 'Premium Wardrobe', 'Work Desk', 'In-room Safe', 'Hair Dryer', 'Iron & Board', 'Telephone', 'Bathrobe & Slippers', 'Rain Shower', 'Balcony', 'Sea View', 'Living Area', 'Bluetooth Speaker'],
    },
    {
      name: 'Executive Suite',
      slug: 'executive-suite',
      description: 'The pinnacle of luxury at Grand Vista Hotel. Our Executive Suites offer a grand living room, a private dining area, a master bedroom with walk-in closet, a marble bathroom with Jacuzzi, and a wraparound balcony with panoramic sea views. Butler service and exclusive privileges included.',
      shortDescription: 'Ultimate luxury with panoramic views, Jacuzzi, and butler service',
      maxAdults: 2,
      maxChildren: 2,
      maxOccupancy: 4,
      bedType: 'King',
      sizeSqft: 950,
      viewType: 'Panoramic Sea View',
      basePrice: 22000,
      sortOrder: 6,
      metaTitle: 'Executive Suite - Grand Vista Hotel | Premier Suite Mumbai',
      metaDescription: 'Our finest suite — panoramic sea views, Jacuzzi, butler service, and exclusive privileges. From ₹22,000/night.',
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Maker', '24/7 Room Service', 'Hot Water', 'Premium Wardrobe', 'Work Desk', 'In-room Safe', 'Hair Dryer', 'Iron & Board', 'Telephone', 'Bathrobe & Slippers', 'Rain Shower', 'Balcony', 'Sea View', 'Jacuzzi', 'Living Area', 'Kitchenette', 'Bluetooth Speaker'],
    },
  ];

  const roomTypes: Record<string, string> = {};
  for (const rt of roomTypeData) {
    const { amenities: amenityNames, ...roomTypeFields } = rt;
    const created = await prisma.roomType.create({
      data: roomTypeFields,
    });
    roomTypes[rt.slug] = created.id;

    // Link amenities
    for (const amenityName of amenityNames) {
      if (amenities[amenityName]) {
        await prisma.roomTypeAmenity.create({
          data: { roomTypeId: created.id, amenityId: amenities[amenityName] },
        });
      }
    }
  }
  console.log('✅ Room types seeded');

  // ============================================
  // 6. PHYSICAL ROOMS
  // ============================================
  const physicalRooms = [
    { roomNumber: '101', floor: 1, roomTypeSlug: 'deluxe-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '102', floor: 1, roomTypeSlug: 'deluxe-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '103', floor: 1, roomTypeSlug: 'premium-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '104', floor: 1, roomTypeSlug: 'premium-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '201', floor: 2, roomTypeSlug: 'executive-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '202', floor: 2, roomTypeSlug: 'executive-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '203', floor: 2, roomTypeSlug: 'family-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '204', floor: 2, roomTypeSlug: 'family-room', status: RoomStatus.AVAILABLE },
    { roomNumber: '301', floor: 3, roomTypeSlug: 'junior-suite', status: RoomStatus.AVAILABLE },
    { roomNumber: '302', floor: 3, roomTypeSlug: 'junior-suite', status: RoomStatus.AVAILABLE },
    { roomNumber: '401', floor: 4, roomTypeSlug: 'executive-suite', status: RoomStatus.AVAILABLE },
    { roomNumber: '402', floor: 4, roomTypeSlug: 'executive-suite', status: RoomStatus.AVAILABLE },
  ];

  const rooms: Record<string, string> = {};
  for (const room of physicalRooms) {
    const created = await prisma.room.create({
      data: {
        roomNumber: room.roomNumber,
        floor: room.floor,
        roomTypeId: roomTypes[room.roomTypeSlug],
        status: room.status,
      },
    });
    rooms[room.roomNumber] = created.id;
  }
  console.log('✅ Physical rooms seeded');

  // ============================================
  // 7. RATE PLANS
  // ============================================
  const ratePlanData = [
    // Deluxe Room
    { roomSlug: 'deluxe-room', name: 'Room Only', baseRate: 4500, isRefundable: true, description: 'Flexible rate with no meals included. Free cancellation up to 48 hours before check-in.', includedServices: 'Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in. 50% charge within 48 hours.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 1 },
    { roomSlug: 'deluxe-room', name: 'Bed & Breakfast', baseRate: 5200, isRefundable: true, description: 'Start your morning right with our lavish breakfast buffet featuring Indian and international cuisine.', includedServices: 'Breakfast buffet, Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in. 50% charge within 48 hours.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 2 },
    { roomSlug: 'deluxe-room', name: 'Half Board', baseRate: 6200, isRefundable: true, description: 'Enjoy breakfast and dinner at our award-winning restaurant.', includedServices: 'Breakfast buffet, Dinner, Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 72 hours before check-in.', freeCancellationHours: 72, lateCancellationCharge: 50, sortOrder: 3 },
    { roomSlug: 'deluxe-room', name: 'Non-Refundable Saver', baseRate: 3800, isRefundable: false, description: 'Our best rate — save 15% with this non-refundable offer.', includedServices: 'Wi-Fi, Room amenities', cancellationPolicy: 'Non-refundable. No changes or cancellations permitted.', freeCancellationHours: 0, lateCancellationCharge: 100, sortOrder: 4 },
    // Premium Room
    { roomSlug: 'premium-room', name: 'Room Only', baseRate: 6000, isRefundable: true, description: 'Flexible rate for our Premium Room.', includedServices: 'Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 1 },
    { roomSlug: 'premium-room', name: 'Bed & Breakfast', baseRate: 6800, isRefundable: true, description: 'Premium Room with complimentary breakfast buffet.', includedServices: 'Breakfast buffet, Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 2 },
    // Executive Room
    { roomSlug: 'executive-room', name: 'Room Only', baseRate: 7500, isRefundable: true, description: 'Executive Room with Executive Lounge access.', includedServices: 'Executive Lounge, Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 1 },
    { roomSlug: 'executive-room', name: 'Executive Package', baseRate: 8500, isRefundable: true, description: 'Complete executive experience with breakfast, evening cocktails, and lounge access.', includedServices: 'Breakfast, Evening cocktails, Executive Lounge, Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 2 },
    // Family Room
    { roomSlug: 'family-room', name: 'Family Fun Package', baseRate: 9500, isRefundable: true, description: 'Family-friendly package with breakfast for all, kids\' activities, and pool access.', includedServices: 'Breakfast for family, Kids activities, Pool access, Wi-Fi', cancellationPolicy: 'Free cancellation up to 72 hours before check-in.', freeCancellationHours: 72, lateCancellationCharge: 50, sortOrder: 1 },
    { roomSlug: 'family-room', name: 'Room Only', baseRate: 8500, isRefundable: true, description: 'Spacious family room at a flexible rate.', includedServices: 'Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 2 },
    // Junior Suite
    { roomSlug: 'junior-suite', name: 'Suite Experience', baseRate: 13500, isRefundable: true, description: 'The complete suite experience with breakfast, spa credit, and premium privileges.', includedServices: 'Breakfast, ₹2000 spa credit, Welcome amenity, Wi-Fi, Premium privileges', cancellationPolicy: 'Free cancellation up to 72 hours before check-in.', freeCancellationHours: 72, lateCancellationCharge: 50, sortOrder: 1 },
    { roomSlug: 'junior-suite', name: 'Room Only', baseRate: 12000, isRefundable: true, description: 'Our Junior Suite at the best flexible rate.', includedServices: 'Wi-Fi, Room amenities', cancellationPolicy: 'Free cancellation up to 48 hours before check-in.', freeCancellationHours: 48, lateCancellationCharge: 50, sortOrder: 2 },
    // Executive Suite
    { roomSlug: 'executive-suite', name: 'Royal Experience', baseRate: 25000, isRefundable: true, description: 'The ultimate luxury package with butler service, breakfast, dinner, spa treatment, airport transfer, and exclusive privileges.', includedServices: 'Butler service, Breakfast, Dinner, Spa treatment, Airport transfer, Welcome champagne, Wi-Fi', cancellationPolicy: 'Free cancellation up to 7 days before check-in.', freeCancellationHours: 168, lateCancellationCharge: 50, sortOrder: 1 },
    { roomSlug: 'executive-suite', name: 'Room Only', baseRate: 22000, isRefundable: true, description: 'Our finest suite at the best available rate.', includedServices: 'Butler service, Wi-Fi, Premium privileges', cancellationPolicy: 'Free cancellation up to 72 hours before check-in.', freeCancellationHours: 72, lateCancellationCharge: 50, sortOrder: 2 },
  ];

  for (const rp of ratePlanData) {
    const { roomSlug, ...planFields } = rp;
    await prisma.ratePlan.create({
      data: { ...planFields, roomTypeId: roomTypes[roomSlug] },
    });
  }
  console.log('✅ Rate plans seeded');

  // ============================================
  // 8. ADD-ONS
  // ============================================
  const addonData = [
    { name: 'Breakfast Buffet', description: 'Lavish breakfast spread with Indian and international cuisine', price: 800, pricingMethod: AddonPricing.PER_PERSON_PER_NIGHT, icon: 'utensils', sortOrder: 1 },
    { name: 'Lunch', description: 'Three-course lunch at The Grand Restaurant', price: 1200, pricingMethod: AddonPricing.PER_PERSON_PER_NIGHT, icon: 'utensils', sortOrder: 2 },
    { name: 'Dinner', description: 'Four-course dinner at The Grand Restaurant', price: 1500, pricingMethod: AddonPricing.PER_PERSON_PER_NIGHT, icon: 'utensils', sortOrder: 3 },
    { name: 'Airport Pickup', description: 'Luxury sedan airport pickup service', price: 2500, pricingMethod: AddonPricing.PER_BOOKING, icon: 'car', sortOrder: 4 },
    { name: 'Airport Drop', description: 'Luxury sedan airport drop service', price: 2500, pricingMethod: AddonPricing.PER_BOOKING, icon: 'car', sortOrder: 5 },
    { name: 'Extra Bed', description: 'Comfortable rollaway bed with premium bedding', price: 1500, pricingMethod: AddonPricing.PER_NIGHT, icon: 'bed', sortOrder: 6 },
    { name: 'Early Check-in', description: 'Check in from 10:00 AM (subject to availability)', price: 2000, pricingMethod: AddonPricing.PER_BOOKING, icon: 'clock', sortOrder: 7 },
    { name: 'Late Check-out', description: 'Check out until 4:00 PM (subject to availability)', price: 2000, pricingMethod: AddonPricing.PER_BOOKING, icon: 'clock', sortOrder: 8 },
    { name: 'Laundry Service', description: 'Express laundry and dry cleaning', price: 500, pricingMethod: AddonPricing.PER_BOOKING, icon: 'shirt', sortOrder: 9 },
    { name: 'Birthday Decoration', description: 'Room decoration with balloons, cake, and flowers', price: 3500, pricingMethod: AddonPricing.PER_BOOKING, icon: 'cake', sortOrder: 10 },
    { name: 'Honeymoon Decoration', description: 'Romantic room setup with roses, candles, and champagne', price: 5000, pricingMethod: AddonPricing.PER_BOOKING, icon: 'heart', sortOrder: 11 },
    { name: 'Flower Arrangement', description: 'Fresh flower arrangement in room', price: 1500, pricingMethod: AddonPricing.PER_BOOKING, icon: 'flower', sortOrder: 12 },
  ];

  for (const addon of addonData) {
    await prisma.addon.create({ data: addon });
  }
  console.log('✅ Add-ons seeded');

  // ============================================
  // 9. OFFERS
  // ============================================
  const offerData = [
    {
      title: 'Early Bird Offer',
      slug: 'early-bird-offer',
      description: 'Plan ahead and save! Book 30 days or more in advance and enjoy 20% off on your stay. The early bird truly does get the best deal at Grand Vista Hotel.',
      shortDescription: 'Book 30+ days in advance and save 20%',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      validFrom: new Date('2026-09-01'),
      validTo: new Date('2027-03-31'),
      terms: 'Must be booked at least 30 days before check-in. Non-refundable. Cannot be combined with other offers.',
      promoCode: 'EARLYBIRD20',
      minNights: 1,
    },
    {
      title: 'Stay 3, Save 15%',
      slug: 'stay-3-save-15',
      description: 'Make the most of your Mumbai experience. Stay three nights or more and receive 15% off the total room rate. More time, more memories, more savings.',
      shortDescription: 'Stay 3+ nights and save 15% on room rate',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 15,
      validFrom: new Date('2026-09-01'),
      validTo: new Date('2027-06-30'),
      terms: 'Minimum 3-night stay required. Applicable on all room types. Subject to availability.',
      promoCode: 'STAY3SAVE15',
      minNights: 3,
    },
    {
      title: 'Weekend Escape',
      slug: 'weekend-escape',
      description: 'Escape the weekday rush with our special weekend package. Enjoy complimentary breakfast, late check-out, and 10% off on Friday to Sunday stays.',
      shortDescription: 'Weekend getaway with breakfast and late check-out',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      validFrom: new Date('2026-09-01'),
      validTo: new Date('2027-12-31'),
      terms: 'Valid for Friday, Saturday, and Sunday check-ins only. Includes breakfast and late check-out until 2 PM.',
      promoCode: 'WEEKEND10',
      minNights: 2,
    },
    {
      title: 'Honeymoon Package',
      slug: 'honeymoon-package',
      description: 'Begin your forever in style. Our Honeymoon Package includes a complimentary room upgrade, romantic room decoration, couples spa session, candlelight dinner, and a bottle of champagne.',
      shortDescription: 'Romantic getaway with upgrade, spa, and dinner',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      validFrom: new Date('2026-09-01'),
      validTo: new Date('2027-12-31'),
      terms: 'Minimum 2-night stay. Subject to availability for room upgrades. Valid for suites.',
      promoCode: 'HONEYMOON',
      minNights: 2,
    },
    {
      title: 'Corporate Stay Program',
      slug: 'corporate-stay',
      description: 'Tailored for business travelers. Enjoy special corporate rates, complimentary breakfast, high-speed internet, meeting room access, and airport transfers on extended stays.',
      shortDescription: 'Special corporate rates with business amenities',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 15,
      validFrom: new Date('2026-09-01'),
      validTo: new Date('2027-12-31'),
      terms: 'Valid corporate ID or business card required at check-in. Minimum 1-night stay.',
      promoCode: 'CORPORATE15',
      minNights: 1,
    },
    {
      title: 'Festive Season Special',
      slug: 'festive-special',
      description: 'Celebrate the festive season at Grand Vista Hotel. Enjoy festive decorations, special dining experiences, cultural performances, and exclusive rates during Diwali, Christmas, and New Year.',
      shortDescription: 'Celebrate festivities with special rates and experiences',
      discountType: DiscountType.FIXED,
      discountValue: 2000,
      validFrom: new Date('2026-10-15'),
      validTo: new Date('2027-01-05'),
      terms: 'Valid during festive periods only. Flat ₹2,000 off per night. Subject to availability.',
      promoCode: 'FESTIVE2026',
      minNights: 2,
    },
  ];

  for (const offer of offerData) {
    await prisma.offer.create({ data: offer });
  }
  console.log('✅ Offers seeded');

  // ============================================
  // 10. COUPONS
  // ============================================
  const couponData = [
    { code: 'WELCOME10', discountType: DiscountType.PERCENTAGE, discountValue: 10, minBookingAmount: 5000, maxDiscount: 3000, startDate: new Date('2026-09-01'), expiryDate: new Date('2027-12-31'), usageLimit: 1000, perUserLimit: 1, description: 'Welcome discount for first booking' },
    { code: 'SUMMER25', discountType: DiscountType.PERCENTAGE, discountValue: 25, minBookingAmount: 10000, maxDiscount: 5000, startDate: new Date('2027-04-01'), expiryDate: new Date('2027-06-30'), usageLimit: 200, perUserLimit: 2, description: 'Summer season special' },
    { code: 'FLAT2000', discountType: DiscountType.FIXED, discountValue: 2000, minBookingAmount: 8000, maxDiscount: null, startDate: new Date('2026-09-01'), expiryDate: new Date('2027-03-31'), usageLimit: 500, perUserLimit: 3, description: 'Flat ₹2,000 off on bookings above ₹8,000' },
    { code: 'LOYALTY15', discountType: DiscountType.PERCENTAGE, discountValue: 15, minBookingAmount: 5000, maxDiscount: 10000, startDate: new Date('2026-09-01'), expiryDate: new Date('2027-12-31'), usageLimit: null, perUserLimit: 5, description: 'Loyalty reward for returning guests' },
  ];

  for (const coupon of couponData) {
    await prisma.coupon.create({ data: coupon });
  }
  console.log('✅ Coupons seeded');

  // ============================================
  // 11. FACILITIES
  // ============================================
  const facilityData = [
    { name: 'Infinity Swimming Pool', icon: 'waves', description: 'Temperature-controlled infinity pool on the rooftop with panoramic city views. Open 6 AM - 10 PM.', sortOrder: 1 },
    { name: 'The Grand Restaurant', icon: 'utensils', description: 'Award-winning multi-cuisine restaurant serving Indian, Continental, and Asian delicacies. Open for breakfast, lunch, and dinner.', sortOrder: 2 },
    { name: 'Serenity Spa & Wellness', icon: 'sparkles', description: 'Full-service spa offering traditional Ayurvedic treatments, Swedish massage, aromatherapy, and couples packages.', sortOrder: 3 },
    { name: 'Fitness Centre', icon: 'dumbbell', description: 'State-of-the-art gym with Technogym equipment, personal trainers, and yoga studio. Open 24/7.', sortOrder: 4 },
    { name: 'Free High-Speed Wi-Fi', icon: 'wifi', description: 'Complimentary high-speed internet throughout the property with dedicated bandwidth for business guests.', sortOrder: 5 },
    { name: 'Valet Parking', icon: 'car', description: 'Complimentary valet parking for all hotel guests with 24-hour security surveillance.', sortOrder: 6 },
    { name: '24-Hour Reception', icon: 'concierge-bell', description: 'Our multilingual front desk team is available round the clock to assist with any request.', sortOrder: 7 },
    { name: '24/7 Room Service', icon: 'bell', description: 'Extensive in-room dining menu available around the clock with express delivery.', sortOrder: 8 },
    { name: 'Airport Transfer', icon: 'plane', description: 'Luxury sedan and SUV transfer service to and from Mumbai International Airport.', sortOrder: 9 },
    { name: 'Conference & Banquet', icon: 'presentation', description: 'Three fully equipped conference halls and a grand banquet facility for up to 500 guests.', sortOrder: 10 },
    { name: 'Business Centre', icon: 'briefcase', description: 'Equipped with high-speed internet, printing, and video conferencing facilities.', sortOrder: 11 },
    { name: 'Laundry & Dry Cleaning', icon: 'shirt', description: 'Same-day laundry and express dry cleaning service available for all guests.', sortOrder: 12 },
  ];

  for (const facility of facilityData) {
    await prisma.facility.create({ data: facility });
  }
  console.log('✅ Facilities seeded');

  // ============================================
  // 12. WEBSITE SECTIONS
  // ============================================
  const websiteSections = [
    { section: 'hero', title: 'Grand Vista Hotel', subtitle: 'Where Luxury Meets Serenity', content: 'Experience unparalleled luxury in the heart of Mumbai. Stunning views, world-class dining, and impeccable service await you.' },
    { section: 'about', title: 'Welcome to Grand Vista Hotel', subtitle: 'A Legacy of Luxury Since 2010', content: 'Nestled in the vibrant heart of Mumbai, Grand Vista Hotel stands as a beacon of refined luxury and warm Indian hospitality. Since our inception, we have been dedicated to creating extraordinary experiences for every guest who walks through our doors.\n\nOur 12 meticulously designed rooms and suites blend contemporary elegance with traditional warmth, each offering stunning views of the Arabian Sea or the glittering Mumbai skyline. From the moment you arrive, our dedicated team ensures that every detail of your stay exceeds expectations.\n\nWhether you are here for business or leisure, a romantic getaway or a family celebration, Grand Vista Hotel promises an experience that will linger in your memory long after you depart.' },
    { section: 'dining', title: 'Culinary Excellence', subtitle: 'A Feast for Every Palate', content: 'The Grand Restaurant offers an extraordinary culinary journey through the finest Indian, Continental, and Asian cuisines. Our award-winning chefs craft each dish using the freshest local ingredients and time-honored techniques.\n\nStart your morning with our lavish breakfast buffet featuring over 80 dishes. For lunch, explore our à la carte menu of contemporary favorites. In the evening, indulge in a multi-course dinner paired with wines from our curated cellar.\n\nThe Skybar Lounge on the rooftop offers handcrafted cocktails, premium spirits, and light bites against the backdrop of Mumbai\'s stunning sunset.' },
    { section: 'policies', title: 'Hotel Policies', subtitle: '', content: '**Check-in:** 2:00 PM | **Check-out:** 11:00 AM\n\n**Early Check-in:** Subject to availability. Additional charges may apply.\n\n**Late Check-out:** Available until 4:00 PM subject to availability. Additional charges may apply.\n\n**Cancellation:** Free cancellation up to 48 hours before check-in for most rates. Non-refundable rates cannot be cancelled.\n\n**Children:** Children under 5 stay free. Extra bed available at additional charge.\n\n**Pets:** We regret that pets are not permitted.\n\n**Smoking:** All rooms are non-smoking. Designated smoking areas are available.\n\n**ID Proof:** Valid government-issued photo ID required at check-in for all guests.' },
  ];

  for (const section of websiteSections) {
    await prisma.websiteSection.create({ data: section });
  }
  console.log('✅ Website sections seeded');

  // ============================================
  // 13. NEARBY ATTRACTIONS
  // ============================================
  const nearbyAttractions = [
    { name: 'Gateway of India', description: 'Iconic arch monument overlooking the Arabian Sea, built during the British Raj.', distance: '2.5 km', travelTime: '10 min by car', mapLink: 'https://maps.google.com/?q=Gateway+of+India+Mumbai', sortOrder: 1 },
    { name: 'Marine Drive', description: 'The famous 3.6 km promenade along the coast, known as the Queen\'s Necklace at night.', distance: '1.8 km', travelTime: '8 min by car', mapLink: 'https://maps.google.com/?q=Marine+Drive+Mumbai', sortOrder: 2 },
    { name: 'Elephanta Caves', description: 'UNESCO World Heritage Site featuring ancient rock-cut cave temples on Elephanta Island.', distance: '12 km', travelTime: '1 hour by ferry', mapLink: 'https://maps.google.com/?q=Elephanta+Caves', sortOrder: 3 },
    { name: 'Chhatrapati Shivaji Terminus', description: 'UNESCO-listed historic railway station, a masterpiece of Victorian Gothic Revival architecture.', distance: '3 km', travelTime: '12 min by car', mapLink: 'https://maps.google.com/?q=CST+Mumbai', sortOrder: 4 },
    { name: 'Colaba Causeway', description: 'Bustling street market famous for antiques, fashion, jewelry, and street food.', distance: '2 km', travelTime: '8 min by car', mapLink: 'https://maps.google.com/?q=Colaba+Causeway+Mumbai', sortOrder: 5 },
    { name: 'Haji Ali Dargah', description: 'Beautiful mosque and tomb on an islet in the Arabian Sea, connected by a causeway.', distance: '5 km', travelTime: '20 min by car', mapLink: 'https://maps.google.com/?q=Haji+Ali+Dargah+Mumbai', sortOrder: 6 },
  ];

  for (const attraction of nearbyAttractions) {
    await prisma.nearbyAttraction.create({ data: attraction });
  }
  console.log('✅ Nearby attractions seeded');

  // ============================================
  // 14. TESTIMONIALS
  // ============================================
  const testimonials = [
    { guestName: 'Ananya & Vikram Sharma', rating: 5, review: 'Our honeymoon at Grand Vista Hotel was absolutely magical. The suite was beautifully decorated, the staff went above and beyond to make every moment special, and the rooftop dinner with sea views was unforgettable. We can\'t wait to come back for our anniversary!', stayDate: 'August 2026', roomType: 'Executive Suite', isApproved: true, isFeatured: true },
    { guestName: 'Rajiv Kapoor', rating: 5, review: 'As a frequent business traveler, I\'ve stayed at many hotels across India. Grand Vista Hotel stands out for its exceptional service, comfortable Executive Rooms, and the attention to detail in the business centre. The Executive Lounge is a game-changer.', stayDate: 'July 2026', roomType: 'Executive Room', isApproved: true, isFeatured: true },
    { guestName: 'The Desai Family', rating: 5, review: 'We stayed in the Family Room for a week-long vacation and it was perfect. The kids loved the pool, the room was spacious enough for all of us, and the staff arranged special activities for the children. The breakfast buffet had something for everyone.', stayDate: 'June 2026', roomType: 'Family Room', isApproved: true, isFeatured: true },
    { guestName: 'Sarah Mitchell', rating: 4, review: 'Beautiful hotel with stunning views. The Junior Suite was luxurious and the balcony overlooking the sea was a highlight. The spa treatment was incredibly relaxing. Only wish the gym was a bit larger. Would definitely recommend and return.', stayDate: 'July 2026', roomType: 'Junior Suite', isApproved: true, isFeatured: true },
    { guestName: 'Amit Patel', rating: 5, review: 'Celebrated my parents\' 50th anniversary here and the hotel team made it truly special. From the customized cake to the surprise room decoration, everything was handled with care and precision. The Grand Restaurant dinner was exceptional.', stayDate: 'August 2026', roomType: 'Premium Room', isApproved: true, isFeatured: false },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('✅ Testimonials seeded');

  // ============================================
  // 15. SAMPLE RESERVATIONS
  // ============================================
  const deluxeRatePlan = await prisma.ratePlan.findFirst({ where: { name: 'Bed & Breakfast', roomType: { slug: 'deluxe-room' } } });
  const premiumRatePlan = await prisma.ratePlan.findFirst({ where: { name: 'Room Only', roomType: { slug: 'premium-room' } } });

  if (deluxeRatePlan && premiumRatePlan) {
    // Past completed reservation
    const res1 = await prisma.reservation.create({
      data: {
        bookingId: 'GVH-2026-A1B2C',
        guestId: guest1.id,
        checkIn: new Date('2026-08-20'),
        checkOut: new Date('2026-08-23'),
        adults: 2,
        children: 0,
        numRooms: 1,
        status: 'CHECKED_OUT',
        source: 'WEBSITE',
        subtotal: 15600,
        taxAmount: 1872,
        discountAmount: 0,
        addonAmount: 1600,
        totalAmount: 19072,
        guestFirstName: 'Arjun',
        guestLastName: 'Mehta',
        guestEmail: 'arjun.mehta@email.com',
        guestPhone: '+91 98765 11111',
        guestCountry: 'India',
        guestCity: 'Delhi',
        checkedInAt: new Date('2026-08-20T14:30:00'),
        checkedOutAt: new Date('2026-08-23T10:45:00'),
        reservationRooms: {
          create: {
            roomId: rooms['101'],
            roomTypeId: roomTypes['deluxe-room'],
            ratePlanId: deluxeRatePlan.id,
            ratePerNight: 5200,
          },
        },
      },
    });

    await prisma.payment.create({
      data: {
        reservationId: res1.id,
        amount: 19072,
        status: 'PAID',
        method: 'RAZORPAY',
        gatewayOrderId: 'order_sample_001',
        gatewayPaymentId: 'pay_sample_001',
      },
    });

    // Upcoming reservation
    const res2 = await prisma.reservation.create({
      data: {
        bookingId: 'GVH-2026-D3E4F',
        guestId: guest2.id,
        checkIn: new Date('2026-09-15'),
        checkOut: new Date('2026-09-17'),
        adults: 2,
        children: 0,
        numRooms: 1,
        status: 'CONFIRMED',
        source: 'WEBSITE',
        subtotal: 12000,
        taxAmount: 2160,
        discountAmount: 1200,
        addonAmount: 0,
        totalAmount: 12960,
        guestFirstName: 'Sneha',
        guestLastName: 'Reddy',
        guestEmail: 'sneha.reddy@email.com',
        guestPhone: '+91 98765 22222',
        guestCountry: 'India',
        guestCity: 'Bangalore',
        couponCode: 'WELCOME10',
        specialRequests: 'High floor preferred. Celebrating our anniversary.',
        reservationRooms: {
          create: {
            roomTypeId: roomTypes['premium-room'],
            ratePlanId: premiumRatePlan.id,
            ratePerNight: 6000,
          },
        },
      },
    });

    await prisma.payment.create({
      data: {
        reservationId: res2.id,
        amount: 12960,
        status: 'PAID',
        method: 'RAZORPAY',
        gatewayOrderId: 'order_sample_002',
        gatewayPaymentId: 'pay_sample_002',
      },
    });
  }
  console.log('✅ Sample reservations seeded');

  // ============================================
  // 16. NOTIFICATIONS
  // ============================================
  await prisma.notification.createMany({
    data: [
      { userId: admin.id, title: 'New Booking', message: 'Sneha Reddy has booked Premium Room for Sep 15-17.', type: 'success', link: '/admin/reservations' },
      { userId: admin.id, title: 'Welcome', message: 'Welcome to Grand Vista Hotel Management System. Your dashboard is ready.', type: 'info' },
      { userId: receptionist.id, title: 'Upcoming Arrival', message: 'Sneha Reddy arriving on Sep 15 - Premium Room.', type: 'info', link: '/admin/front-desk' },
    ],
  });
  console.log('✅ Notifications seeded');

  console.log('\n🎉 Grand Vista Hotel seed completed successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('   Admin:        admin@grandvistahotel.com / Admin@2026');
  console.log('   Receptionist: reception@grandvistahotel.com / Reception@2026');
  console.log('   Housekeeping: housekeeping@grandvistahotel.com / Housekeeping@2026');
  console.log('   Guest:        arjun.mehta@email.com / Guest@2026');
  console.log('   Guest:        sneha.reddy@email.com / Guest@2026');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

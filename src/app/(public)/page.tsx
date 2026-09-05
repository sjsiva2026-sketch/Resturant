'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Calendar, Users, ChevronDown, ChevronUp, MapPin, 
  Wifi, Coffee, Dumbbell, Car, Utensils, Star, 
  Quote, ArrowRight, CheckCircle2, Phone, Mail, Clock,
  Minus, Plus, BedDouble, Bath, Droplets, Bed
} from 'lucide-react';
import { HOTEL_IMAGES } from '@/lib/images';

export default function HomePage() {
  const router = useRouter();
  
  // Booking Widget State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
      ...(promoCode && { promoCode })
    });
    router.push(`/search?${params.toString()}`);
  };

  const updateCount = (
    setter: React.Dispatch<React.SetStateAction<number>>, 
    current: number, 
    increment: boolean, 
    min: number = 0, 
    max: number = 10
  ) => {
    if (increment && current < max) setter(current + 1);
    if (!increment && current > min) setter(current - 1);
  };

  const featuredRooms = [
    { id: 'deluxe-room', name: 'Deluxe Room', price: 4500, desc: 'Comfortable and elegantly furnished room perfect for short stays.', beds: '1 Queen Bed', amenities: ['Free Wi-Fi', 'TV', 'AC'], image: HOTEL_IMAGES.rooms['deluxe-room'] },
    { id: 'premium-room', name: 'Premium Room', price: 6000, desc: 'Spacious room with premium amenities and stunning city views.', beds: '1 King Bed', amenities: ['Mini Bar', 'Bathtub', 'City View'], image: HOTEL_IMAGES.rooms['premium-room'] },
    { id: 'executive-room', name: 'Executive Room', price: 7500, desc: 'Luxury suite featuring a separate living area for business or leisure.', beds: '1 King Bed', amenities: ['Lounge Access', 'Coffee Maker', 'Workspace'], image: HOTEL_IMAGES.rooms['executive-room'] },
    { id: 'family-room', name: 'Family Room', price: 8500, desc: 'Expansive space designed to comfortably accommodate the whole family.', beds: '2 Queen Beds', amenities: ['Kitchenette', '2 Bathrooms', 'Sofa Bed'], image: HOTEL_IMAGES.rooms['family-room'] },
    { id: 'junior-suite', name: 'Junior Suite', price: 12000, desc: 'Experience unparalleled luxury with panoramic views and bespoke service.', beds: '1 King Bed', amenities: ['Private Butler', 'Jacuzzi', 'Dining Area'], image: HOTEL_IMAGES.rooms['junior-suite'] },
    { id: 'executive-suite', name: 'Executive Suite', price: 22000, desc: 'The epitome of grandeur, offering exclusive top-floor privacy and ocean views.', beds: '2 King Beds', amenities: ['Private Pool', 'Terrace', 'Chef on Call'], image: HOTEL_IMAGES.rooms['executive-suite'] },
  ];

  const facilities = [
    { icon: <Droplets className="w-8 h-8" />, name: 'Infinity Pool' },
    { icon: <Utensils className="w-8 h-8" />, name: 'Fine Dining' },
    { icon: <Coffee className="w-8 h-8" />, name: 'Spa & Wellness' },
    { icon: <Dumbbell className="w-8 h-8" />, name: 'Fitness Center' },
    { icon: <Wifi className="w-8 h-8" />, name: 'High-Speed Wi-Fi' },
    { icon: <Car className="w-8 h-8" />, name: 'Valet Parking' },
  ];

  const offers = [
    { title: 'Weekend Getaway', desc: 'Book a 2-night stay over the weekend and enjoy complimentary breakfast and a spa voucher.', discount: '20% OFF', valid: 'Until Dec 2026', image: HOTEL_IMAGES.offers.weekend },
    { title: 'Early Bird Special', desc: 'Plan ahead and save. Book 30 days in advance and receive a significant discount on our best available rate.', discount: '15% OFF', valid: 'Year Round', image: HOTEL_IMAGES.offers.earlyBird },
    { title: 'Romantic Escape', desc: 'Treat your loved one to a special stay including champagne on arrival, late checkout, and a romantic dinner.', discount: 'Special Package', valid: 'Until Feb 2027', image: HOTEL_IMAGES.offers.romantic },
  ];

  const reviews = [
    { name: 'Sarah Jenkins', room: 'Executive Suite', date: 'August 2026', rating: 5, text: 'Absolutely phenomenal stay. The attention to detail is unmatched, and the staff went above and beyond to make our anniversary special.' },
    { name: 'Rahul Sharma', room: 'Deluxe Room', date: 'September 2026', rating: 5, text: 'Best hotel in Mumbai! The location is perfect, the food at the restaurant was divine, and the bed was incredibly comfortable.' },
    { name: 'Emily Chen', room: 'Standard Room', date: 'July 2026', rating: 4, text: 'Beautiful property with excellent facilities. The spa is a must-visit. Will definitely be returning on my next business trip.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-gray-800 font-sans selection:bg-[#C9A96E] selection:text-white">
      
      {/* 1. HERO SECTION & 2. BOOKING WIDGET */}
      <section className="relative h-screen min-h-[800px] flex flex-col justify-center items-center text-white">
        {/* Real Luxury Hotel Hero Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000" 
          style={{ backgroundImage: `url(${HOTEL_IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-100px]">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg">Grand Vista Hotel</h1>
          <p className="text-2xl md:text-3xl text-[#C9A96E] font-medium mb-4 font-serif italic">Where Luxury Meets Serenity</p>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light text-gray-200">Experience unparalleled luxury in the heart of Mumbai.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#booking-widget" className="px-8 py-4 bg-[#C9A96E] hover:bg-[#b0935d] text-white font-semibold rounded transition-colors duration-300 w-full sm:w-auto text-center tracking-wide">
              BOOK YOUR STAY
            </Link>
            <Link href="#featured-rooms" className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#1B4D3E] text-white font-semibold rounded transition-colors duration-300 w-full sm:w-auto text-center tracking-wide">
              EXPLORE ROOMS
            </Link>
          </div>
        </div>

        {/* BOOKING SEARCH WIDGET */}
        <div id="booking-widget" className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-4">
          <div className="container-hotel mx-auto max-w-6xl">
            <div className="bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-2xl border border-gray-100">
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-end">
                
                <div className="w-full lg:w-1/5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1B4D3E]" />
                    <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent outline-none text-gray-800" />
                  </div>
                </div>

                <div className="w-full lg:w-1/5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1B4D3E]" />
                    <input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent outline-none text-gray-800" />
                  </div>
                </div>

                <div className="w-full lg:w-1/5 relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Guests & Rooms</label>
                  <button type="button" onClick={() => setShowGuestDropdown(!showGuestDropdown)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors text-left text-gray-800">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-[#1B4D3E] mr-2" />
                      <span className="truncate">{adults + children} Guests, {rooms} Room</span>
                    </div>
                    {showGuestDropdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Guest Dropdown */}
                  {showGuestDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full min-w-[280px] bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800">Adults</p>
                            <p className="text-xs text-gray-500">Age 13+</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => updateCount(setAdults, adults, false, 1)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1B4D3E] text-gray-600"><Minus className="w-4 h-4" /></button>
                            <span className="w-4 text-center font-medium">{adults}</span>
                            <button type="button" onClick={() => updateCount(setAdults, adults, true)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1B4D3E] text-gray-600"><Plus className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800">Children</p>
                            <p className="text-xs text-gray-500">Ages 2-12</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => updateCount(setChildren, children, false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1B4D3E] text-gray-600"><Minus className="w-4 h-4" /></button>
                            <span className="w-4 text-center font-medium">{children}</span>
                            <button type="button" onClick={() => updateCount(setChildren, children, true)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1B4D3E] text-gray-600"><Plus className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800">Rooms</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => updateCount(setRooms, rooms, false, 1)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1B4D3E] text-gray-600"><Minus className="w-4 h-4" /></button>
                            <span className="w-4 text-center font-medium">{rooms}</span>
                            <button type="button" onClick={() => updateCount(setRooms, rooms, true, 1, 5)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1B4D3E] text-gray-600"><Plus className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <button type="button" onClick={() => setShowGuestDropdown(false)} className="w-full py-2 bg-gray-100 text-[#1B4D3E] rounded font-medium mt-2 hover:bg-gray-200">Done</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-1/5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Promo Code (Opt)</label>
                  <input type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent outline-none text-gray-800" />
                </div>

                <div className="w-full lg:w-1/5">
                  <button type="submit" className="w-full py-3 px-6 bg-[#C9A96E] hover:bg-[#b0935d] text-white font-semibold rounded transition-colors duration-300 shadow-md h-[46px] flex items-center justify-center">
                    CHECK AVAILABILITY
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing for translated widget */}
      <div className="h-32 lg:h-24"></div>

      {/* 3. WELCOME SECTION */}
      <section className="section-padding py-16 md:py-24 bg-white">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6">
              <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm">Discover Grand Vista</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E] leading-tight">Welcome to <br/>Grand Vista Hotel</h2>
              <div className="w-20 h-1 bg-[#C9A96E]"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nestled in the vibrant heart of Mumbai, Grand Vista Hotel stands as a beacon of sophistication and modern luxury. From the moment you step into our grand lobby, you are enveloped in an atmosphere of refined elegance and warm hospitality. 
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Whether you are traveling for business or leisure, our meticulously designed spaces, world-class dining, and impeccable service promise an unforgettable experience. Discover a sanctuary where every detail is crafted for your utmost comfort and pleasure.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center text-[#1B4D3E] font-semibold hover:text-[#C9A96E] transition-colors group">
                  READ OUR STORY <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              {/* Real Lobby Image */}
              <div className="relative aspect-[4/3] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl group">
                <img 
                  src={HOTEL_IMAGES.lobby} 
                  alt="Grand Vista Hotel Luxury Grand Lobby" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ROOMS */}
      <section id="featured-rooms" className="section-padding py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">Luxury Accommodations</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E]">Our Rooms & Suites</h2>
            <div className="w-20 h-1 bg-[#C9A96E] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="h-64 relative overflow-hidden bg-gray-900">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded shadow text-[#1B4D3E] font-bold">
                    ₹{room.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ night</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-[#1B4D3E] mb-2">{room.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.desc}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-y border-gray-100 py-3">
                    <div className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-[#C9A96E]"/> {room.beds}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity, idx) => (
                      <span key={idx} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-100 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#1B4D3E]" /> {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/rooms/${room.id}`} className="flex-1 text-center py-2.5 border border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white rounded font-medium transition-colors text-sm">
                      VIEW DETAILS
                    </Link>
                    <Link href={`/search?rooms=1`} className="flex-1 text-center py-2.5 bg-[#C9A96E] text-white hover:bg-[#b0935d] rounded font-medium transition-colors text-sm">
                      BOOK NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/rooms" className="inline-block px-8 py-3 bg-[#1B4D3E] text-white hover:bg-[#113329] rounded font-semibold transition-colors">
              VIEW ALL ACCOMMODATIONS
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY STAY WITH US */}
      <section className="section-padding py-16 md:py-24 bg-white">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">The Grand Vista Experience</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E]">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 mx-auto bg-[#1B4D3E]/10 rounded-full flex items-center justify-center mb-6 text-[#1B4D3E]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-[#1B4D3E] mb-3">Prime Location</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Situated in the heart of Mumbai, minutes away from major attractions, business districts, and premium shopping.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 mx-auto bg-[#C9A96E]/10 rounded-full flex items-center justify-center mb-6 text-[#C9A96E]">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-[#1B4D3E] mb-3">World-Class Dining</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Savor exquisite culinary creations at our award-winning restaurants, offering global flavors and local delicacies.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 mx-auto bg-[#1B4D3E]/10 rounded-full flex items-center justify-center mb-6 text-[#1B4D3E]">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-[#1B4D3E] mb-3">Wellness & Relaxation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Rejuvenate your senses at our luxury spa, state-of-the-art fitness center, and stunning rooftop infinity pool.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 mx-auto bg-[#C9A96E]/10 rounded-full flex items-center justify-center mb-6 text-[#C9A96E]">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-[#1B4D3E] mb-3">Impeccable Service</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Experience 24/7 personalized attention from our dedicated staff, committed to making your stay extraordinary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOTEL FACILITIES */}
      <section className="section-padding py-16 md:py-24 bg-[#1B4D3E] text-white">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">World Class Amenities</h4>
              <h2 className="text-4xl md:text-5xl font-serif">Hotel Facilities</h2>
            </div>
            <Link href="/facilities" className="text-white hover:text-[#C9A96E] flex items-center gap-2 transition-colors">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {facilities.map((facility, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-6 border border-white/20 rounded-xl hover:bg-white/10 transition-colors duration-300 group cursor-default">
                <div className="text-[#C9A96E] group-hover:text-white transition-colors duration-300 mb-4 transform group-hover:-translate-y-1">
                  {facility.icon}
                </div>
                <span className="font-medium text-center text-sm">{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SPECIAL OFFERS */}
      <section className="section-padding py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">Exclusive Deals</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E]">Special Offers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group">
                <div className="h-48 relative overflow-hidden bg-gray-900">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-[#C9A96E] text-white px-3 py-1 text-sm font-bold rounded z-10 shadow-md">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif text-[#1B4D3E] mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">{offer.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {offer.valid}</span>
                    <Link href={`/offers`} className="text-[#1B4D3E] font-semibold hover:text-[#C9A96E] flex items-center text-sm transition-colors">
                      BOOK NOW <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DINING PREVIEW */}
      <section className="section-padding py-16 md:py-24 bg-white">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6">
              <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm">Gastronomy</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E] leading-tight">Culinary Excellence</h2>
              <div className="w-20 h-1 bg-[#C9A96E]"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Embark on a gastronomic journey at Grand Vista. <strong>The Grand Restaurant</strong> offers an opulent buffet and a la carte selections featuring international and regional Indian cuisine, prepared by our master chefs.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                As evening falls, elevate your experience at the <strong>Skybar Lounge</strong>. Enjoy handcrafted cocktails, premium spirits, and panoramic city views in a chic, sophisticated setting.
              </p>
              <Link href="/dining" className="inline-block px-8 py-3 bg-transparent border-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white rounded font-semibold transition-colors mt-4">
                EXPLORE DINING OPTIONS
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex gap-4 h-[500px]">
              <div className="w-1/2 h-full rounded-2xl overflow-hidden relative shadow-xl transform translate-y-6 group">
                <img 
                  src={HOTEL_IMAGES.dining.restaurant} 
                  alt="The Grand Restaurant" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-serif text-lg font-medium">The Grand Restaurant</span>
                </div>
              </div>
              <div className="w-1/2 h-full rounded-2xl overflow-hidden relative shadow-xl transform -translate-y-6 group">
                <img 
                  src={HOTEL_IMAGES.dining.skybar} 
                  alt="Skybar Lounge" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-serif text-lg font-medium">Skybar Lounge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GALLERY PREVIEW */}
      <section className="section-padding py-16 md:py-24 bg-[#111111] text-white">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">Visual Tour</h4>
              <h2 className="text-4xl md:text-5xl font-serif">Gallery</h2>
            </div>
            <Link href="/gallery" className="text-white hover:text-[#C9A96E] flex items-center gap-2 transition-colors">
              VIEW FULL GALLERY <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {HOTEL_IMAGES.gallery.slice(0, 6).map((item, idx) => (
              <div key={idx} className="aspect-square relative group overflow-hidden cursor-pointer rounded-lg shadow-md bg-gray-900">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-wider">{item.category}</span>
                  <span className="text-white font-serif text-lg font-medium">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GUEST REVIEWS */}
      <section className="section-padding py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">Testimonials</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E]">What Our Guests Say</h2>
            <div className="w-20 h-1 bg-[#C9A96E] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg relative mt-6">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center shadow-md">
                  <Quote className="text-white w-5 h-5 fill-current" />
                </div>
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-[#1B4D3E]">{review.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{review.room} • {review.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-3 h-3 rounded-full bg-[#1B4D3E]"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300"></button>
          </div>
        </div>
      </section>

      {/* 11. NEARBY ATTRACTIONS */}
      <section className="section-padding py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-[#C9A96E] font-semibold tracking-widest uppercase text-sm mb-2">Destination Guide</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1B4D3E]">Explore Mumbai</h2>
            </div>
            <Link href="/location" className="text-[#1B4D3E] font-semibold hover:text-[#C9A96E] flex items-center gap-2 transition-colors">
              VIEW LOCATION <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Gateway of India', dist: '2.5 km', desc: 'Iconic 20th-century Indo-Saracenic arch overlooking the Arabian Sea.', img: HOTEL_IMAGES.attractions.gateway },
              { name: 'Marine Drive', dist: '1.2 km', desc: 'Famous 3km C-shaped boulevard along the natural bay, known as the Queen’s Necklace.', img: HOTEL_IMAGES.attractions.marineDrive },
              { name: 'Colaba Causeway', dist: '3.0 km', desc: 'Vibrant cultural promenade featuring heritage architecture, boutiques, and cafes.', img: HOTEL_IMAGES.attractions.colaba },
              { name: 'Elephanta Caves', dist: '10 km (ferry)', desc: 'UNESCO World Heritage rock-cut temples dating back to the 5th century.', img: HOTEL_IMAGES.attractions.elephanta }
            ].map((attr, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="h-44 overflow-hidden relative">
                  <img src={attr.img} alt={attr.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-[#1B4D3E] text-xs font-bold px-2.5 py-1 rounded shadow">
                    {attr.dist}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#1B4D3E] mb-2 group-hover:text-[#C9A96E] transition-colors">{attr.name}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{attr.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. LOCATION MAP */}
      <section className="section-padding py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="w-full lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-serif text-[#1B4D3E] mb-6">Find Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#1B4D3E]/10 p-2 rounded-full text-[#1B4D3E]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Address</h4>
                    <p className="text-gray-600 text-sm mt-1">123 Luxury Avenue,<br/>Marine Lines, Mumbai,<br/>Maharashtra 400020, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#1B4D3E]/10 p-2 rounded-full text-[#1B4D3E]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Phone</h4>
                    <p className="text-gray-600 text-sm mt-1">+91 22 1234 5678</p>
                    <p className="text-gray-600 text-sm">Toll Free: 1800 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#1B4D3E]/10 p-2 rounded-full text-[#1B4D3E]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-gray-600 text-sm mt-1">concierge@grandvistahotel.com</p>
                    <p className="text-gray-600 text-sm">reservations@grandvistahotel.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-3/5 min-h-[400px] relative">
              <iframe
                title="Grand Vista Hotel Location Map"
                src="https://maps.google.com/maps?q=Marine+Drive,+Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[400px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 13. CONTACT CTA */}
      <section className="relative py-24 bg-[#1B4D3E] text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[20px] border-white"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-[20px] border-[#C9A96E]"></div>
        </div>
        
        <div className="relative z-10 container-hotel mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Experience Grand Vista?</h2>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">Book your stay today and unlock a world of luxury, comfort, and unforgettable memories in the heart of Mumbai.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="px-8 py-4 bg-[#C9A96E] hover:bg-[#b0935d] text-white font-semibold rounded transition-colors duration-300 tracking-wide text-center">
              BOOK YOUR STAY NOW
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#1B4D3E] text-white font-semibold rounded transition-colors duration-300 tracking-wide text-center">
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

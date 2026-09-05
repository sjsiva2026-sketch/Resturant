'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Users, 
  Bed, 
  Wifi, 
  Tv, 
  Coffee, 
  Wind, 
  Maximize, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Search
} from 'lucide-react';
import { useBookingStore } from '@/stores/booking-store';
import { HOTEL_IMAGES } from '@/lib/images';

const staticRooms = [
  {
    id: 'r1',
    name: 'Deluxe Room',
    size: '32 sq m',
    maxOccupancy: 2,
    bedType: '1 King Bed or 2 Twin Beds',
    amenities: ['wifi', 'tv', 'coffee', 'air-conditioning'],
    availability: 5,
    ratePlans: [
      { id: 'rp1', name: 'Room Only', pricePerNight: 4500, features: ['Free WiFi'], cancellation: 'Free cancellation' },
      { id: 'rp2', name: 'Bed & Breakfast', pricePerNight: 5200, features: ['Free WiFi', 'Breakfast included'], cancellation: 'Free cancellation' }
    ]
  },
  {
    id: 'r2',
    name: 'Premium Room',
    size: '40 sq m',
    maxOccupancy: 3,
    bedType: '1 King Bed',
    amenities: ['wifi', 'tv', 'coffee', 'air-conditioning'],
    availability: 3,
    ratePlans: [
      { id: 'rp3', name: 'Room Only', pricePerNight: 6000, features: ['Free WiFi'], cancellation: 'Non-refundable' },
      { id: 'rp4', name: 'Bed & Breakfast', pricePerNight: 6800, features: ['Free WiFi', 'Breakfast included'], cancellation: 'Free cancellation' }
    ]
  },
  {
    id: 'r3',
    name: 'Executive Room',
    size: '48 sq m',
    maxOccupancy: 2,
    bedType: '1 King Bed',
    amenities: ['wifi', 'tv', 'coffee', 'air-conditioning', 'lounge-access'],
    availability: 2,
    ratePlans: [
      { id: 'rp5', name: 'Room Only', pricePerNight: 7500, features: ['Free WiFi', 'Lounge Access'], cancellation: 'Free cancellation' },
      { id: 'rp6', name: 'Executive Package', pricePerNight: 8500, features: ['Free WiFi', 'Lounge Access', 'Breakfast', 'Airport Transfer'], cancellation: 'Free cancellation' }
    ]
  },
  {
    id: 'r4',
    name: 'Family Room',
    size: '55 sq m',
    maxOccupancy: 4,
    bedType: '2 Queen Beds',
    amenities: ['wifi', 'tv', 'coffee', 'air-conditioning'],
    availability: 4,
    ratePlans: [
      { id: 'rp7', name: 'Room Only', pricePerNight: 8500, features: ['Free WiFi'], cancellation: 'Non-refundable' },
      { id: 'rp8', name: 'Family Fun', pricePerNight: 9500, features: ['Free WiFi', 'Breakfast included', 'Kids activities'], cancellation: 'Free cancellation' }
    ]
  },
  {
    id: 'r5',
    name: 'Junior Suite',
    size: '65 sq m',
    maxOccupancy: 3,
    bedType: '1 King Bed',
    amenities: ['wifi', 'tv', 'coffee', 'air-conditioning', 'living-area'],
    availability: 1,
    ratePlans: [
      { id: 'rp9', name: 'Room Only', pricePerNight: 12000, features: ['Free WiFi', 'Living Area'], cancellation: 'Free cancellation' },
      { id: 'rp10', name: 'Suite Experience', pricePerNight: 13500, features: ['Free WiFi', 'Breakfast included', 'Butler service'], cancellation: 'Free cancellation' }
    ]
  },
  {
    id: 'r6',
    name: 'Executive Suite',
    size: '85 sq m',
    maxOccupancy: 4,
    bedType: '1 King Bed',
    amenities: ['wifi', 'tv', 'coffee', 'air-conditioning', 'living-area', 'dining-area'],
    availability: 1,
    ratePlans: [
      { id: 'rp11', name: 'Room Only', pricePerNight: 22000, features: ['Free WiFi', 'Living & Dining Area'], cancellation: 'Non-refundable' },
      { id: 'rp12', name: 'Royal Experience', pricePerNight: 25000, features: ['Free WiFi', 'All meals included', 'Butler service', 'Spa access'], cancellation: 'Free cancellation' }
    ]
  }
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const checkIn = searchParams.get('checkIn') || new Date().toISOString().split('T')[0];
  const checkOut = searchParams.get('checkOut') || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const adults = parseInt(searchParams.get('adults') || '2', 10);
  const children = parseInt(searchParams.get('children') || '0', 10);
  const rooms = parseInt(searchParams.get('rooms') || '1', 10);

  const [loading, setLoading] = useState(true);
  const [roomsData, setRoomsData] = useState(staticRooms);
  const [isModifying, setIsModifying] = useState(false);
  const { setBookingData } = useBookingStore();

  useEffect(() => {
    // Simulate API fetch
    const fetchRooms = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setRoomsData(staticRooms);
      setLoading(false);
    };
    fetchRooms();
  }, [checkIn, checkOut, adults, children, rooms]);

  const calculateNights = (inDate: string, outDate: string) => {
    const diffTime = Math.abs(new Date(outDate).getTime() - new Date(inDate).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };
  
  const nights = calculateNights(checkIn, checkOut);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const handleSelect = (room: any, ratePlan: any) => {
    setBookingData({
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      nights,
      roomType: {
        id: room.id,
        name: room.name,
        size: room.size,
        maxOccupancy: room.maxOccupancy
      },
      ratePlan: {
        id: ratePlan.id,
        name: ratePlan.name,
        pricePerNight: ratePlan.pricePerNight,
        cancellation: ratePlan.cancellation
      },
      extras: [],
      guestDetails: null
    });
    router.push('/book');
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Top Bar Summary */}
      <div className="bg-[#1B4D3E] text-white py-4 px-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <h1 className="text-lg font-semibold text-[#C9A96E]">Available rooms</h1>
            <p className="text-sm opacity-90">
              {formatDate(checkIn)} - {formatDate(checkOut)} &middot; {nights} night{nights > 1 ? 's' : ''} &middot; {adults} adult{adults > 1 ? 's' : ''} &middot; {rooms} room{rooms > 1 ? 's' : ''}
            </p>
          </div>
          <button 
            onClick={() => setIsModifying(!isModifying)}
            className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors border border-white/20"
          >
            <Search className="w-4 h-4 mr-2" />
            Modify Search
            {isModifying ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>

      {isModifying && (
        <div className="bg-white border-b shadow-sm p-6">
          <div className="max-w-6xl mx-auto text-center text-gray-500">
            {/* Real implementation would use BookingSearchWidget here */}
            <p>Search modification widget placeholder</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-6 animate-pulse">
                <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg"></div>
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="h-8 bg-gray-200 w-1/2 rounded"></div>
                  <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                  <div className="space-y-2 pt-4">
                    <div className="h-24 bg-gray-100 rounded"></div>
                    <div className="h-24 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : roomsData.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No rooms available</h2>
            <p className="text-gray-600 mb-6">We're fully booked for your selected dates. Please try changing your dates.</p>
            <button className="bg-[#1B4D3E] text-white px-6 py-3 rounded hover:bg-[#153a2f] transition-colors">
              Modify Search
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {roomsData.map(room => (
              <div key={room.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                
                {/* Real Room Photography */}
                <div className="w-full md:w-[35%] h-64 md:h-auto min-h-[240px] bg-gray-900 relative overflow-hidden group">
                  <img 
                    src={
                      room.name.toLowerCase().includes('deluxe') ? HOTEL_IMAGES.rooms['deluxe-room'] :
                      room.name.toLowerCase().includes('premium') ? HOTEL_IMAGES.rooms['premium-room'] :
                      room.name.toLowerCase().includes('executive') && room.name.toLowerCase().includes('suite') ? HOTEL_IMAGES.rooms['executive-suite'] :
                      room.name.toLowerCase().includes('executive') ? HOTEL_IMAGES.rooms['executive-room'] :
                      room.name.toLowerCase().includes('family') ? HOTEL_IMAGES.rooms['family-room'] :
                      room.name.toLowerCase().includes('junior') ? HOTEL_IMAGES.rooms['junior-suite'] :
                      HOTEL_IMAGES.rooms['deluxe-room']
                    } 
                    alt={room.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                  {room.availability <= 2 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Only {room.availability} left!
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-full md:w-[65%] p-6 flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{room.name}</h2>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center"><Maximize className="w-4 h-4 mr-1.5" /> {room.size}</div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> Max {room.maxOccupancy} Guests</div>
                    <div className="flex items-center"><Bed className="w-4 h-4 mr-1.5" /> {room.bedType}</div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <div className="flex flex-col items-center justify-center p-2 bg-[#F8F5F0] rounded text-[#1B4D3E]"><Wifi className="w-5 h-5" /><span className="text-[10px] mt-1 font-medium">Wi-Fi</span></div>
                    <div className="flex flex-col items-center justify-center p-2 bg-[#F8F5F0] rounded text-[#1B4D3E]"><Tv className="w-5 h-5" /><span className="text-[10px] mt-1 font-medium">TV</span></div>
                    <div className="flex flex-col items-center justify-center p-2 bg-[#F8F5F0] rounded text-[#1B4D3E]"><Coffee className="w-5 h-5" /><span className="text-[10px] mt-1 font-medium">Coffee</span></div>
                    <div className="flex flex-col items-center justify-center p-2 bg-[#F8F5F0] rounded text-[#1B4D3E]"><Wind className="w-5 h-5" /><span className="text-[10px] mt-1 font-medium">AC</span></div>
                  </div>

                  {/* Rate Plans */}
                  <div className="mt-auto space-y-3">
                    {room.ratePlans.map((plan, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:border-[#C9A96E] transition-colors">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <div className="text-xs text-green-700 mt-1 flex items-center">
                            {plan.cancellation}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {plan.features.join(' • ')}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end w-full sm:w-auto">
                          <div className="text-xl font-bold text-gray-900">₹{(plan.pricePerNight * nights).toLocaleString()}</div>
                          <div className="text-sm text-gray-500">₹{plan.pricePerNight.toLocaleString()} / night</div>
                          <div className="text-xs text-gray-400 mt-1">Taxes and fees excluded</div>
                          <button 
                            onClick={() => handleSelect(room, plan)}
                            className="mt-3 w-full sm:w-auto bg-[#C9A96E] text-white px-6 py-2 rounded font-medium hover:bg-[#b09056] transition-colors shadow-sm"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center"><div className="text-[#1B4D3E]">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}

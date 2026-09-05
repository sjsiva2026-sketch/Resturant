import Link from "next/link";
import { Wifi, Tv, Coffee, Wind, Users, Maximize, BedDouble, Eye, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { HOTEL_IMAGES } from "@/lib/images";

export const metadata = {
  title: "Room Details | Grand Vista Hotel",
};

const ROOMS = {
  "deluxe-room": { name: "Deluxe Room", price: 4500, size: "35 sq.m", guests: 2, bed: "King or Twin", view: "City View", floor: "2nd - 5th", smoking: "Non-smoking" },
  "premium-room": { name: "Premium Room", price: 6000, size: "42 sq.m", guests: 3, bed: "King Bed", view: "City View", floor: "6th - 9th", smoking: "Non-smoking" },
  "executive-room": { name: "Executive Room", price: 7500, size: "50 sq.m", guests: 3, bed: "King Bed", view: "Ocean View", floor: "10th - 12th", smoking: "Non-smoking" },
  "family-room": { name: "Family Room", price: 8500, size: "65 sq.m", guests: 4, bed: "2 Queen Beds", view: "City View", floor: "3rd - 8th", smoking: "Non-smoking" },
  "junior-suite": { name: "Junior Suite", price: 12000, size: "75 sq.m", guests: 3, bed: "King Bed", view: "Ocean View", floor: "14th - 16th", smoking: "Non-smoking" },
  "executive-suite": { name: "Executive Suite", price: 22000, size: "110 sq.m", guests: 4, bed: "King Bed", view: "Panoramic Ocean", floor: "17th - 18th", smoking: "Non-smoking" },
};

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS[slug as keyof typeof ROOMS];

  if (!room) {
    notFound();
  }

  const roomImage = HOTEL_IMAGES.rooms[slug as keyof typeof HOTEL_IMAGES.rooms] || HOTEL_IMAGES.rooms["deluxe-room"];

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Image Gallery */}
      <section className="w-full h-[520px] grid grid-cols-4 grid-rows-2 gap-2 bg-gray-950 p-2">
        <div className="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden rounded-l-lg group">
          <img src={roomImage} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 relative overflow-hidden group">
          <img src={HOTEL_IMAGES.rooms.livingArea} alt="Living Area" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 relative overflow-hidden rounded-tr-lg group">
          <img src={HOTEL_IMAGES.rooms.bathroom} alt="Marble Bathroom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 relative overflow-hidden group">
          <img src={HOTEL_IMAGES.facilities.spa} alt="Ayush Spa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 relative overflow-hidden rounded-br-lg group">
          <img src={HOTEL_IMAGES.exterior} alt="Property View" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      </section>

      <section className="container-hotel mx-auto max-w-7xl px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 space-y-10">
          <div>
            <h1 className="text-4xl font-serif text-[#1B4D3E] mb-2">{room.name}</h1>
            <p className="text-2xl font-medium text-[#C9A96E]">From ₹{room.price.toLocaleString('en-IN')} <span className="text-sm text-gray-500">/ night</span></p>
          </div>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              Experience the perfect blend of luxury and comfort in our {room.name}. Designed with meticulous attention to detail, this space offers an elegant retreat in the bustling city of Mumbai. The contemporary decor is complemented by premium furnishings and state-of-the-art technology to ensure a seamless stay.
            </p>
            <p>
              Wake up to stunning views and enjoy your morning coffee from the comfort of your room. Whether you are traveling for business or leisure, the {room.name} provides an ideal sanctuary to relax, work, and recharge.
            </p>
          </div>

          {/* Details Grid */}
          <div>
            <h2 className="text-2xl font-serif text-[#1B4D3E] mb-6">Room Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Maximize className="w-4 h-4" /> Size</span>
                <span className="font-medium text-gray-900">{room.size}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Users className="w-4 h-4" /> Max Guests</span>
                <span className="font-medium text-gray-900">{room.guests} Adults</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 flex items-center gap-2"><BedDouble className="w-4 h-4" /> Bed Type</span>
                <span className="font-medium text-gray-900">{room.bed}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Eye className="w-4 h-4" /> View</span>
                <span className="font-medium text-gray-900">{room.view}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Floor</span>
                <span className="font-medium text-gray-900">{room.floor}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Smoking</span>
                <span className="font-medium text-gray-900">{room.smoking}</span>
              </div>
            </div>
          </div>

          {/* Rate Plans */}
          <div>
            <h2 className="text-2xl font-serif text-[#1B4D3E] mb-6">Rate Plans</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Room Only</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Flexible Cancellation</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Pay at Hotel</li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-medium text-[#1B4D3E] mb-2">₹{room.price.toLocaleString('en-IN')}</div>
                  <button className="px-6 py-2 bg-[#1B4D3E] text-white rounded hover:bg-[#153a2f] transition-colors">Select</button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Bed & Breakfast</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Includes Buffet Breakfast</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600"/> Flexible Cancellation</li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-medium text-[#1B4D3E] mb-2">₹{(room.price + 1500).toLocaleString('en-IN')}</div>
                  <button className="px-6 py-2 bg-[#1B4D3E] text-white rounded hover:bg-[#153a2f] transition-colors">Select</button>
                </div>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h2 className="text-2xl font-serif text-[#1B4D3E] mb-6">Hotel Policies</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Check-in / Check-out</h4>
                <p className="text-sm text-gray-600">Check-in from 14:00<br/>Check-out by 12:00</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Cancellation</h4>
                <p className="text-sm text-gray-600">Free cancellation up to 24 hours before check-in.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Children & Extra Beds</h4>
                <p className="text-sm text-gray-600">Children under 12 stay free using existing bedding.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Pets</h4>
                <p className="text-sm text-gray-600">Pets are not allowed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Booking Form */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-24 border-t-4 border-[#C9A96E]">
            <h3 className="text-xl font-serif text-[#1B4D3E] mb-6">Check Availability</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                <input type="date" className="w-full border border-gray-300 rounded p-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                <input type="date" className="w-full border border-gray-300 rounded p-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                  <select className="w-full border border-gray-300 rounded p-2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                  <select className="w-full border border-gray-300 rounded p-2">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>
              </div>
              <Link href="/search" className="block w-full text-center py-3 bg-[#C9A96E] text-white rounded font-medium hover:bg-[#B0925A] transition-colors mt-6">
                BOOK NOW
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

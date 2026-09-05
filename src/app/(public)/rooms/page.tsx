import Link from "next/link";
import { Wifi, Tv, Coffee, Wind, Users, Maximize } from "lucide-react";
import { HOTEL_IMAGES } from "@/lib/images";

export const metadata = {
  title: "Rooms & Suites | Grand Vista Hotel",
  description: "Explore our luxurious rooms and suites at Grand Vista Hotel.",
};

const ROOMS = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    type: "room",
    price: 4500,
    size: "35 sq.m",
    guests: 2,
    bed: "King or Twin",
    description: "Comfortable and elegantly furnished room for a relaxing stay.",
    amenities: ["Free Wi-Fi", "Smart TV", "Tea/Coffee Maker", "AC"],
  },
  {
    id: "premium-room",
    name: "Premium Room",
    type: "room",
    price: 6000,
    size: "42 sq.m",
    guests: 3,
    bed: "King Bed",
    description: "Spacious room with upgraded amenities and city views.",
    amenities: ["Free Wi-Fi", "Smart TV", "Mini Bar", "AC", "Work Desk"],
  },
  {
    id: "executive-room",
    name: "Executive Room",
    type: "room",
    price: 7500,
    size: "50 sq.m",
    guests: 3,
    bed: "King Bed",
    description: "Premium room with lounge access and premium bath amenities.",
    amenities: ["Free Wi-Fi", "Smart TV", "Lounge Access", "AC", "Bathtub"],
  },
  {
    id: "family-room",
    name: "Family Room",
    type: "room",
    price: 8500,
    size: "65 sq.m",
    guests: 4,
    bed: "2 Queen Beds",
    description: "Ideal for families with extra space and child-friendly features.",
    amenities: ["Free Wi-Fi", "Smart TV", "Mini Fridge", "AC", "Sitting Area"],
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    type: "suite",
    price: 12000,
    size: "75 sq.m",
    guests: 3,
    bed: "King Bed",
    description: "Luxurious suite with a separate living area and panoramic views.",
    amenities: ["Free Wi-Fi", "2 Smart TVs", "Lounge Access", "AC", "Jacuzzi"],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    type: "suite",
    price: 22000,
    size: "110 sq.m",
    guests: 4,
    bed: "King Bed",
    description: "Our most premium offering with unmatched luxury and space.",
    amenities: ["Free Wi-Fi", "2 Smart TVs", "Butler Service", "AC", "Dining Area"],
  },
];

export default function RoomsPage({
  searchParams,
}: {
  searchParams: { type?: string; sort?: string };
}) {
  const typeFilter = searchParams.type || "all";
  const sortOrder = searchParams.sort || "low";

  let filteredRooms = ROOMS.filter(
    (room) => typeFilter === "all" || room.type === typeFilter
  );

  filteredRooms.sort((a, b) =>
    sortOrder === "low" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HOTEL_IMAGES.exterior})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Rooms & Suites</h1>
          <p className="text-[#C9A96E] text-lg md:text-xl max-w-2xl mx-auto">
            Experience unparalleled comfort and luxury in the heart of Mumbai.
          </p>
        </div>
      </section>

      {/* Filters and Grid */}
      <section className="container-hotel section-padding py-12 mx-auto max-w-7xl px-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex gap-2">
            <Link
              href="/rooms?type=all"
              className={`px-4 py-2 rounded-md border border-[#1B4D3E] transition-colors ${
                typeFilter === "all"
                  ? "bg-[#1B4D3E] text-white"
                  : "text-[#1B4D3E] hover:bg-[#1B4D3E]/10"
              }`}
            >
              All
            </Link>
            <Link
              href="/rooms?type=room"
              className={`px-4 py-2 rounded-md border border-[#1B4D3E] transition-colors ${
                typeFilter === "room"
                  ? "bg-[#1B4D3E] text-white"
                  : "text-[#1B4D3E] hover:bg-[#1B4D3E]/10"
              }`}
            >
              Rooms
            </Link>
            <Link
              href="/rooms?type=suite"
              className={`px-4 py-2 rounded-md border border-[#1B4D3E] transition-colors ${
                typeFilter === "suite"
                  ? "bg-[#1B4D3E] text-white"
                  : "text-[#1B4D3E] hover:bg-[#1B4D3E]/10"
              }`}
            >
              Suites
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <Link
              href={`/rooms?type=${typeFilter}&sort=low`}
              className={`px-3 py-1 text-sm ${sortOrder === "low" ? "font-bold text-[#1B4D3E]" : "text-gray-500"}`}
            >
              Price: Low to High
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={`/rooms?type=${typeFilter}&sort=high`}
              className={`px-3 py-1 text-sm ${sortOrder === "high" ? "font-bold text-[#1B4D3E]" : "text-gray-500"}`}
            >
              Price: High to Low
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col">
              <div className="h-64 w-full relative overflow-hidden bg-gray-900">
                <img 
                  src={HOTEL_IMAGES.rooms[room.id as keyof typeof HOTEL_IMAGES.rooms] || HOTEL_IMAGES.rooms['deluxe-room']} 
                  alt={room.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-[#1B4D3E]">{room.name}</h3>
                </div>
                <div className="text-xl font-medium text-[#C9A96E] mb-4">
                  From ₹{room.price.toLocaleString('en-IN')} <span className="text-sm text-gray-500 font-normal">/ night</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 flex-grow">{room.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Maximize className="w-4 h-4 text-[#1B4D3E]" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-[#1B4D3E]" />
                    <span>Max {room.guests}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Wifi className="w-4 h-4 text-[#1B4D3E]" />
                    <span>Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Coffee className="w-4 h-4 text-[#1B4D3E]" />
                    <span>Amenities</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Link 
                    href={`/rooms/${room.id}`}
                    className="flex-1 text-center py-2 border border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-colors rounded"
                  >
                    VIEW DETAILS
                  </Link>
                  <Link 
                    href="/search"
                    className="flex-1 text-center py-2 bg-[#C9A96E] text-white hover:bg-[#B0925A] transition-colors rounded font-medium"
                  >
                    BOOK NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

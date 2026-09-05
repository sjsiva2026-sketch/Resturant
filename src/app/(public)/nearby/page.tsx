import { MapPin, Navigation, Clock } from "lucide-react";
import Link from "next/link";
import { HOTEL_IMAGES } from "@/lib/images";

export const metadata = {
  title: "Nearby Attractions | Grand Vista Hotel",
};

const ATTRACTIONS = [
  {
    id: 1,
    name: "Gateway of India",
    distance: "2.5 km",
    time: "10 mins by car",
    desc: "Mumbai's most iconic landmark overlooking the Arabian Sea, built to commemorate the visit of King George V.",
    img: HOTEL_IMAGES.attractions.gateway,
  },
  {
    id: 2,
    name: "Marine Drive",
    distance: "3.0 km",
    time: "15 mins by car",
    desc: "A 3.6-kilometer-long, arc-shaped boulevard along the coast, famous for spectacular sunsets and the 'Queen's Necklace' night view.",
    img: HOTEL_IMAGES.attractions.marineDrive,
  },
  {
    id: 3,
    name: "Elephanta Caves",
    distance: "Ferry from Gateway",
    time: "1 hour by ferry",
    desc: "A UNESCO World Heritage site featuring ancient rock-cut cave temples dedicated to the Hindu god Shiva.",
    img: HOTEL_IMAGES.attractions.elephanta,
  },
  {
    id: 4,
    name: "Chhatrapati Shivaji Terminus (CST)",
    distance: "4.2 km",
    time: "20 mins by car",
    desc: "Historic railway station and UNESCO World Heritage site renowned for its stunning Victorian Gothic Revival architecture.",
    img: HOTEL_IMAGES.gallery[0].url,
  },
  {
    id: 5,
    name: "Colaba Causeway",
    distance: "1.8 km",
    time: "10 mins walk",
    desc: "A vibrant commercial street famous for shopping, from street vendors to high-end boutiques, and historic cafes.",
    img: HOTEL_IMAGES.attractions.colaba,
  },
  {
    id: 6,
    name: "Haji Ali Dargah",
    distance: "7.5 km",
    time: "30 mins by car",
    desc: "A picturesque mosque and tomb situated on an islet off the coast of Worli, accessible via a narrow causeway.",
    img: HOTEL_IMAGES.gallery[6].url,
  },
];

export default function NearbyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section 
        className="relative h-[420px] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HOTEL_IMAGES.attractions.marineDrive})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Explore Mumbai</h1>
          <p className="text-[#C9A96E] text-lg max-w-2xl mx-auto font-light">
            Discover the vibrant culture, history, and sights just moments away from our doors.
          </p>
        </div>
      </section>

      <section className="container-hotel mx-auto max-w-7xl px-4 py-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif text-[#1B4D3E] mb-4">Prime Location</h2>
          <p className="text-gray-600 text-lg">
            Grand Vista Hotel is strategically situated in the heart of South Mumbai, making it the perfect base to explore the city's rich heritage, bustling markets, and scenic coastlines.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {ATTRACTIONS.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
              <div className="h-56 bg-gray-900 relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif text-[#1B4D3E] mb-3">{item.name}</h3>
                
                <div className="flex flex-col gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#C9A96E]" />
                    <span>Distance: <span className="font-medium text-gray-900">{item.distance}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-[#C9A96E]" />
                    <span>Travel time: <span className="font-medium text-gray-900">{item.time}</span></span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm flex-grow mb-6">{item.desc}</p>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Mumbai')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 text-[#1B4D3E] border border-[#1B4D3E] rounded hover:bg-[#1B4D3E] hover:text-white transition-colors text-sm font-medium"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <iframe
              title="South Mumbai Map"
              src="https://maps.google.com/maps?q=Marine+Drive,+Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

      </section>
    </div>
  );
}

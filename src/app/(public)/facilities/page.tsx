import { 
  Waves, 
  UtensilsCrossed, 
  Sparkles, 
  Dumbbell, 
  Wifi, 
  Car, 
  BellRing, 
  Coffee, 
  Briefcase, 
  Shirt, 
  ShieldCheck, 
  Baby 
} from "lucide-react";
import { HOTEL_IMAGES } from "@/lib/images";

export const metadata = {
  title: "Facilities | Grand Vista Hotel",
};

const FACILITIES = [
  { icon: Waves, name: "Swimming Pool", desc: "Temperature-controlled outdoor infinity pool with panoramic city views.", img: HOTEL_IMAGES.facilities.pool },
  { icon: Sparkles, name: "Luxury Spa", desc: "Rejuvenating Ayurvedic and holistic massage therapies.", img: HOTEL_IMAGES.facilities.spa },
  { icon: Dumbbell, name: "Fitness Center", desc: "24/7 fully equipped modern gymnasium with personal trainers.", img: HOTEL_IMAGES.facilities.gym },
  { icon: UtensilsCrossed, name: "Fine Dining", desc: "Multiple award-winning restaurants, rooftop lounge, and 24/7 room service.", img: HOTEL_IMAGES.dining.restaurant },
  { icon: Wifi, name: "High-Speed Wi-Fi", desc: "Complimentary premium gigabit internet access throughout the property." },
  { icon: Car, name: "Valet Parking", desc: "Secure multi-level underground parking with complimentary valet." },
  { icon: BellRing, name: "24/7 Concierge", desc: "Dedicated team for custom city itineraries, transfers, and reservations." },
  { icon: Coffee, name: "Club Lounge", desc: "Exclusive private club lounge offering refreshments and evening cocktails.", img: HOTEL_IMAGES.facilities.lounge },
  { icon: Briefcase, name: "Business Center", desc: "Executive meeting boardrooms and comprehensive business services." },
  { icon: Shirt, name: "Laundry & Valet", desc: "Same-day express dry cleaning and garment pressing services." },
  { icon: ShieldCheck, name: "24/7 Security", desc: "Continuous keycard-secured access, round-the-clock surveillance." },
  { icon: Baby, name: "Kids Club", desc: "Supervised recreation area and curated entertainment for younger guests." },
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section 
        className="relative h-[420px] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HOTEL_IMAGES.facilities.pool})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Hotel Facilities & Wellness</h1>
          <p className="text-[#C9A96E] text-lg max-w-2xl mx-auto font-light">
            World-class amenities crafted for your utmost relaxation and well-being.
          </p>
        </div>
      </section>

      <section className="container-hotel mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-[#F8F5F0] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1B4D3E] group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8 text-[#C9A96E] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-[#1B4D3E] mb-3">{facility.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{facility.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

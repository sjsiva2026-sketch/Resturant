import { Clock, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { HOTEL_IMAGES } from "@/lib/images";

export const metadata = {
  title: "Dining | Grand Vista Hotel",
};

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section 
        className="relative h-[480px] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HOTEL_IMAGES.dining.restaurant})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-2">Culinary Excellence</h1>
          <p className="text-[#C9A96E] text-lg md:text-xl max-w-2xl mx-auto font-light">
            Savor exceptional flavors across our signature dining venues.
          </p>
        </div>
      </section>

      <section className="container-hotel mx-auto max-w-7xl px-4 py-20 space-y-24">
        
        {/* Venue 1 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 h-[420px] rounded-2xl shadow-xl relative overflow-hidden group">
            <img 
              src={HOTEL_IMAGES.dining.restaurant} 
              alt="The Grand Restaurant" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-serif text-[#1B4D3E]">The Grand Restaurant</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience a world of flavors at our multi-cuisine all-day dining restaurant. 
              Featuring an expansive buffet and an exquisite a la carte menu crafted by our master chefs, 
              The Grand Restaurant offers a culinary journey from authentic Indian delicacies to international favorites.
            </p>
            <div className="space-y-3 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-[#C9A96E] mt-0.5" />
                <div>
                  <p className="font-medium">Timings</p>
                  <p className="text-sm">Breakfast: 6:30 AM - 10:30 AM</p>
                  <p className="text-sm">Lunch: 12:30 PM - 3:00 PM</p>
                  <p className="text-sm">Dinner: 7:00 PM - 11:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 pt-3 border-t border-gray-100">
                <MapPin className="w-5 h-5 text-[#C9A96E]" />
                <p className="text-sm">Lobby Level</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-[#1B4D3E] text-white rounded hover:bg-[#153a2f] transition-colors font-medium">
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Venue 2 */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="w-full lg:w-1/2 h-[420px] rounded-2xl shadow-xl relative overflow-hidden group">
            <img 
              src={HOTEL_IMAGES.dining.skybar} 
              alt="Skybar Lounge" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-serif text-[#1B4D3E]">Skybar Lounge</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Elevate your evenings at our rooftop lounge. Enjoy signature cocktails, premium spirits, 
              and delectable tapas while taking in breathtaking sunset views of the city skyline. 
              The perfect setting for unwinding after a long day or celebrating special moments.
            </p>
            <div className="space-y-3 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-[#C9A96E] mt-0.5" />
                <div>
                  <p className="font-medium">Timings</p>
                  <p className="text-sm">5:00 PM - 1:00 AM (Daily)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 pt-3 border-t border-gray-100">
                <MapPin className="w-5 h-5 text-[#C9A96E]" />
                <p className="text-sm">Rooftop (20th Floor)</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-[#C9A96E] text-white rounded hover:bg-[#B0925A] transition-colors font-medium">
              Reserve a Table
            </button>
          </div>
        </div>

      </section>

      {/* Menu Highlights */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="container-hotel mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-serif text-[#1B4D3E] mb-12">Menu Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Truffle Mushroom Risotto</h3>
              <p className="text-gray-600 mb-4">Arborio rice, wild mushrooms, truffle oil, and parmesan crisp.</p>
              <span className="text-[#C9A96E] font-medium">₹850</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Pan-Seared Salmon</h3>
              <p className="text-gray-600 mb-4">Norwegian salmon, asparagus, lemon butter caper sauce.</p>
              <span className="text-[#C9A96E] font-medium">₹1,450</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Signature Dal Makhani</h3>
              <p className="text-gray-600 mb-4">Overnight simmered black lentils, churned butter, served with naan.</p>
              <span className="text-[#C9A96E] font-medium">₹650</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

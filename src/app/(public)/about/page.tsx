import { Award, Users, Star, History } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Grand Vista Hotel",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full bg-gradient-to-r from-gray-800 to-[#1B4D3E] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">About Grand Vista</h1>
          <p className="text-[#C9A96E] text-lg max-w-2xl mx-auto">
            A legacy of luxury, hospitality, and unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container-hotel mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1B4D3E]">Our Story</h2>
            <div className="w-20 h-1 bg-[#C9A96E]"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2010, Grand Vista Hotel was built on a simple premise: to offer a sanctuary of unmatched luxury amidst the vibrant energy of Mumbai. What started as a vision to redefine hospitality has blossomed into one of the city's most iconic destinations.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every corner of our hotel tells a story of meticulous craftsmanship and timeless elegance. We believe that true luxury lies in the details—from the warmth of our greeting to the plush comfort of our rooms.
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-[450px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-xl relative flex items-center justify-center">
             <span className="text-white font-medium tracking-widest text-xl opacity-70">HOTEL EXTERIOR IMAGE</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1B4D3E] py-16">
        <div className="container-hotel mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="space-y-2">
              <Star className="w-8 h-8 text-[#C9A96E] mx-auto mb-4" />
              <div className="text-4xl font-serif">5-Star</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Luxury Hotel</div>
            </div>
            <div className="space-y-2">
              <History className="w-8 h-8 text-[#C9A96E] mx-auto mb-4" />
              <div className="text-4xl font-serif">2010</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Established</div>
            </div>
            <div className="space-y-2">
              <Award className="w-8 h-8 text-[#C9A96E] mx-auto mb-4" />
              <div className="text-4xl font-serif">12+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Premium Rooms</div>
            </div>
            <div className="space-y-2">
              <Users className="w-8 h-8 text-[#C9A96E] mx-auto mb-4" />
              <div className="text-4xl font-serif">1000+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Happy Guests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-hotel mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-[#C9A96E]">
            <h3 className="text-2xl font-serif text-[#1B4D3E] mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver exceptional, personalized service and create lasting memories for every guest by anticipating their needs and exceeding their expectations in a luxurious and welcoming environment.
            </p>
          </div>
          <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-[#1B4D3E]">
            <h3 className="text-2xl font-serif text-[#1B4D3E] mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading luxury hospitality destination in the region, recognized for our commitment to excellence, sustainable practices, and profound dedication to guest satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership/Why Choose Us */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="container-hotel mx-auto max-w-7xl px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-serif text-[#1B4D3E] mb-6">Why Choose Us</h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Our dedicated team of hospitality professionals is committed to making your stay extraordinary. With prime location, unparalleled amenities, and a passion for perfection, Grand Vista isn't just a place to sleep—it's an experience to remember.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-3 bg-[#1B4D3E] text-white rounded hover:bg-[#153a2f] transition-colors font-medium"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

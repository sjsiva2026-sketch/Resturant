"use client";

import { useState } from "react";
import { ZoomIn, X } from "lucide-react";
import { HOTEL_IMAGES } from "@/lib/images";

const CATEGORIES = ["All", "Rooms", "Hotel", "Restaurant", "Pool", "Spa", "Events"];

const GALLERY_ITEMS = [
  { id: 1, category: "Hotel", title: "Grand Hotel Facade & Night View", url: HOTEL_IMAGES.gallery[0].url },
  { id: 2, category: "Hotel", title: "Marble Lobby & Grand Atrium", url: HOTEL_IMAGES.gallery[1].url },
  { id: 3, category: "Rooms", title: "Deluxe King Room Bedroom", url: HOTEL_IMAGES.gallery[2].url },
  { id: 4, category: "Rooms", title: "Executive Ocean View Suite", url: HOTEL_IMAGES.gallery[3].url },
  { id: 5, category: "Restaurant", title: "The Grand Fine Dining", url: HOTEL_IMAGES.gallery[4].url },
  { id: 6, category: "Restaurant", title: "Skybar Rooftop Lounge & Bar", url: HOTEL_IMAGES.gallery[5].url },
  { id: 7, category: "Pool", title: "Sunset Skyline Infinity Pool", url: HOTEL_IMAGES.gallery[6].url },
  { id: 8, category: "Spa", title: "Ayush Holistic Luxury Spa", url: HOTEL_IMAGES.gallery[7].url },
  { id: 9, category: "Events", title: "Imperial Gala Ballroom", url: HOTEL_IMAGES.gallery[8].url },
  { id: 10, category: "Hotel", title: "State-of-the-Art Fitness Center", url: HOTEL_IMAGES.gallery[9].url },
  { id: 11, category: "Rooms", title: "Marble Jacuzzi Master Bathroom", url: HOTEL_IMAGES.gallery[10].url },
  { id: 12, category: "Restaurant", title: "Handcrafted Artisan Cocktails", url: HOTEL_IMAGES.gallery[11].url },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const currentItem = GALLERY_ITEMS.find((i) => i.id === selectedImage);

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section 
        className="relative h-[380px] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HOTEL_IMAGES.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Visual Gallery</h1>
          <p className="text-[#C9A96E] text-lg max-w-2xl mx-auto font-light">
            A photographic journey through Grand Vista Hotel & Suites.
          </p>
        </div>
      </section>

      <section className="container-hotel mx-auto max-w-7xl px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#1B4D3E] hover:text-[#1B4D3E]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-md bg-gray-900"
              onClick={() => setSelectedImage(item.id)}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/90 via-[#1B4D3E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <ZoomIn className="w-10 h-10 text-white mb-3 transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100" />
                <span className="text-[#C9A96E] text-xs font-bold uppercase tracking-wider mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.category}
                </span>
                <h4 className="text-white font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && currentItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl relative bg-black flex flex-col">
            <img 
              src={currentItem.url} 
              alt={currentItem.title} 
              className="w-full max-h-[75vh] object-contain" 
            />
            <div className="p-4 bg-gray-950/90 border-t border-gray-800 text-white flex justify-between items-center">
              <div>
                <p className="text-[#C9A96E] text-xs uppercase tracking-wider font-bold">
                  {currentItem.category}
                </p>
                <p className="text-lg font-serif">
                  {currentItem.title}
                </p>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="px-4 py-1.5 border border-white/30 hover:border-white text-xs rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

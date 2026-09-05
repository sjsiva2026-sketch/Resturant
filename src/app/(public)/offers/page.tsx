import Link from "next/link";
import { Tag, Calendar, ChevronRight } from "lucide-react";
import { HOTEL_IMAGES } from "@/lib/images";

export const metadata = {
  title: "Special Offers | Grand Vista Hotel",
};

const OFFERS = [
  {
    id: 1,
    title: "Early Bird Offer",
    discount: "20% OFF",
    description: "Book your stay at least 30 days in advance and enjoy a 20% discount on our best available rates.",
    validity: "Valid until Dec 31, 2026",
    code: "EARLY20",
    image: HOTEL_IMAGES.offers.earlyBird,
  },
  {
    id: 2,
    title: "Stay 3 Save 15%",
    discount: "15% OFF",
    description: "Extend your holiday. Stay for 3 nights or more and receive a 15% discount on your entire stay.",
    validity: "Valid until Dec 31, 2026",
    code: "STAY3",
    image: HOTEL_IMAGES.gallery[2].url,
  },
  {
    id: 3,
    title: "Weekend Escape",
    discount: "10% OFF",
    description: "Unwind this weekend with our special package including complimentary breakfast and late check-out.",
    validity: "Friday to Sunday stays",
    code: "WKND10",
    image: HOTEL_IMAGES.offers.weekend,
  },
  {
    id: 4,
    title: "Honeymoon Package",
    discount: "SPECIAL",
    description: "Celebrate love with complimentary room upgrade, sparkling wine, and a romantic dinner for two.",
    validity: "Valid year round",
    code: "ROMANCE",
    image: HOTEL_IMAGES.offers.romantic,
  },
  {
    id: 5,
    title: "Corporate Stay",
    discount: "BUSINESS",
    description: "Special corporate rates including high-speed Wi-Fi, laundry allowance, and airport transfers.",
    validity: "Monday to Thursday stays",
    code: "CORP26",
    image: HOTEL_IMAGES.rooms['executive-room'],
  },
  {
    id: 6,
    title: "Festive Special",
    discount: "₹2,000 OFF",
    description: "Celebrate the festive season with us and get ₹2,000 off on dining and spa treatments.",
    validity: "Valid during festive season",
    code: "FESTIVE",
    image: HOTEL_IMAGES.dining.cocktails,
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] w-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HOTEL_IMAGES.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Special Offers</h1>
          <p className="text-[#C9A96E] text-lg md:text-xl max-w-2xl mx-auto font-light">
            Exclusive deals and luxury packages curated just for you.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container-hotel mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
              <div className="h-56 w-full relative overflow-hidden bg-gray-900">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                <div className="absolute top-4 right-4 bg-[#C9A96E] text-white px-3 py-1 text-sm font-bold rounded shadow-md z-10">
                  {offer.discount}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif text-gray-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{offer.description}</p>
                
                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-[#C9A96E]" />
                    <span>{offer.validity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#1B4D3E]">
                    <Tag className="w-4 h-4" />
                    <span>Promo Code: <span className="uppercase tracking-wider ml-1">{offer.code}</span></span>
                  </div>
                </div>

                <Link 
                  href="/search"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-transparent border-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-colors rounded-lg font-medium"
                >
                  BOOK NOW <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, Share2, MessageCircle, ArrowRight, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hotel-primary text-white/90">
      {/* Main Footer */}
      <div className="container-hotel py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Hotel Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Grand Vista</h3>
              <p className="text-xs tracking-[0.25em] uppercase text-hotel-secondary mt-0.5">Hotel & Suites</p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Where luxury meets serenity. Experience world-class hospitality in the heart of Mumbai.
            </p>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-hotel-secondary text-hotel-secondary" />
              ))}
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Globe, href: '#', label: 'Website' },
                { icon: MessageCircle, href: '#', label: 'WhatsApp' },
                { icon: Share2, href: '#', label: 'Social' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-hotel-secondary hover:text-hotel-primary-dark transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/rooms', label: 'Rooms & Suites' },
                { href: '/offers', label: 'Special Offers' },
                { href: '/dining', label: 'Dining' },
                { href: '/facilities', label: 'Facilities' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/70 hover:text-hotel-secondary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Guest Services</h4>
            <ul className="space-y-3">
              {[
                { href: '/search', label: 'Book a Room' },
                { href: '/my-booking', label: 'Manage Booking' },
                { href: '/nearby', label: 'Nearby Attractions' },
                { href: '#', label: 'Airport Transfer' },
                { href: '#', label: 'Spa & Wellness' },
                { href: '#', label: 'Conference & Events' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-white/70 hover:text-hotel-secondary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-hotel-secondary flex-shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm">
                  42 Marina Boulevard, Gateway District<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
              <a href="tel:+912267890000" className="flex items-center gap-3 text-white/70 hover:text-hotel-secondary transition-colors text-sm">
                <Phone className="h-4 w-4 text-hotel-secondary flex-shrink-0" />
                +91 22 6789 0000
              </a>
              <a href="mailto:reservations@grandvistahotel.com" className="flex items-center gap-3 text-white/70 hover:text-hotel-secondary transition-colors text-sm">
                <Mail className="h-4 w-4 text-hotel-secondary flex-shrink-0" />
                reservations@grandvistahotel.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-hotel py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {currentYear} Grand Vista Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/50 hover:text-white/80 transition-colors text-xs">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/50 hover:text-white/80 transition-colors text-xs">
              Terms & Conditions
            </Link>
            <Link href="#" className="text-white/50 hover:text-white/80 transition-colors text-xs">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

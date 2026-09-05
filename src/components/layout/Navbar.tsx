'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown, User, LogOut, Calendar, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms & Suites' },
  { href: '/offers', label: 'Offers' },
  { href: '/dining', label: 'Dining' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/nearby', label: 'Nearby' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className={`hidden lg:block transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="bg-hotel-primary text-white/90">
          <div className="container-hotel flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+912267890000" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span>+91 22 6789 0000</span>
              </a>
              <a href="mailto:reservations@grandvistahotel.com" className="hover:text-white transition-colors">
                reservations@grandvistahotel.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/my-booking" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                My Booking
              </Link>
              <span className="text-white/30">|</span>
              <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-hotel">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold tracking-tight text-hotel-primary">
                  Grand Vista
                </span>
                <span className="text-[10px] lg:text-xs tracking-[0.25em] uppercase text-hotel-secondary font-medium -mt-0.5">
                  Hotel & Suites
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-hotel-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-hotel-secondary transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/search"
                className="px-6 py-2.5 bg-hotel-primary text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-hotel-primary-light transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                BOOK NOW
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/search"
                className="px-4 py-2 bg-hotel-primary text-white text-xs font-semibold tracking-wide rounded-lg"
              >
                BOOK NOW
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-hotel-primary transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-hotel-primary">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 text-gray-700 hover:text-hotel-primary hover:bg-hotel-accent transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t my-4" />
              <Link
                href="/my-booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-hotel-primary hover:bg-hotel-accent transition-colors"
              >
                <Calendar className="h-4 w-4" />
                My Booking
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-hotel-primary hover:bg-hotel-accent transition-colors"
              >
                <User className="h-4 w-4" />
                Login / Register
              </Link>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t bg-hotel-accent">
              <a href="tel:+912267890000" className="flex items-center gap-2 text-sm text-hotel-primary font-medium">
                <Phone className="h-4 w-4" />
                +91 22 6789 0000
              </a>
              <p className="text-xs text-gray-500 mt-2">
                reservations@grandvistahotel.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Book Now */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white border-t shadow-lg p-3">
        <Link
          href="/search"
          className="block w-full py-3 bg-hotel-primary text-white text-center font-semibold tracking-wide rounded-lg"
        >
          BOOK YOUR STAY
        </Link>
      </div>
    </>
  );
}

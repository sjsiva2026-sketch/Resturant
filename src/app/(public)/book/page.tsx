'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/stores/booking-store';
import { 
  CheckCircle2, 
  ChevronRight, 
  Coffee, 
  Car, 
  BedDouble, 
  Clock, 
  Gift, 
  Info,
  CreditCard,
  Download,
  Printer,
  Mail,
  MapPin
} from 'lucide-react';

const extrasList = [
  { id: 'e1', name: 'Breakfast Buffet', price: 800, type: 'per_person_per_night', icon: Coffee, desc: 'Fresh local and international cuisine' },
  { id: 'e2', name: 'Lunch', price: 1200, type: 'per_person_per_night', icon: Coffee, desc: '3-course set menu' },
  { id: 'e3', name: 'Dinner', price: 1500, type: 'per_person_per_night', icon: Coffee, desc: 'Fine dining experience' },
  { id: 'e4', name: 'Airport Pickup', price: 2500, type: 'per_booking', icon: Car, desc: 'Luxury sedan from airport' },
  { id: 'e5', name: 'Airport Drop', price: 2500, type: 'per_booking', icon: Car, desc: 'Luxury sedan to airport' },
  { id: 'e6', name: 'Extra Bed', price: 1500, type: 'per_night', icon: BedDouble, desc: 'Rollaway bed' },
  { id: 'e7', name: 'Early Check-in', price: 2000, type: 'per_booking', icon: Clock, desc: 'From 9:00 AM subject to availability' },
  { id: 'e8', name: 'Late Check-out', price: 2000, type: 'per_booking', icon: Clock, desc: 'Until 4:00 PM subject to availability' },
  { id: 'e9', name: 'Birthday Decoration', price: 3500, type: 'per_booking', icon: Gift, desc: 'Balloons, cake, and floral arrangements' },
  { id: 'e10', name: 'Honeymoon Decoration', price: 5000, type: 'per_booking', icon: Gift, desc: 'Rose petals, champagne, and chocolates' },
];

export default function BookPage() {
  const router = useRouter();
  const { bookingData, setBookingData } = useBookingStore();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    company: '',
    gst: '',
    specialRequests: '',
    arrivalTime: '14:00'
  });
  
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!bookingData?.roomType) {
      router.push('/search');
    } else {
      if (bookingData.extras) {
        setSelectedExtras(bookingData.extras);
      }
    }
  }, [bookingData, router]);

  if (!mounted || !bookingData?.roomType) return <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">Loading...</div>;

  const { checkIn, checkOut, nights, adults, children, rooms, roomType, ratePlan } = bookingData;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Pricing Calculation
  const roomTotal = ratePlan.pricePerNight * nights * rooms;
  
  const calculateExtraPrice = (extra: any) => {
    if (extra.type === 'per_person_per_night') return extra.price * (adults + children) * nights;
    if (extra.type === 'per_night') return extra.price * nights;
    return extra.price; // per_booking
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + calculateExtraPrice(extra), 0);
  const subtotal = roomTotal + extrasTotal;
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const subtotalAfterDiscount = subtotal - discount;
  
  // GST logic: 12% if room rate <= 7500, 18% if > 7500
  const gstRate = ratePlan.pricePerNight <= 7500 ? 0.12 : 0.18;
  const taxes = subtotalAfterDiscount * gstRate;
  const grandTotal = subtotalAfterDiscount + taxes;

  const handleToggleExtra = (extra: any) => {
    const exists = selectedExtras.find(e => e.id === extra.id);
    if (exists) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone;
  };

  const handleContinue = () => {
    if (step === 2) {
      setBookingData({ ...bookingData, extras: selectedExtras });
    }
    if (step === 3) {
      setBookingData({ ...bookingData, guestDetails: formData });
    }
    setStep(step + 1);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingId(`GVH-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);
      setStep(5);
    }, 2000);
  };

  // Stepper UI
  const steps = ['Room', 'Extras', 'Details', 'Review', 'Done'];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pb-24">
      {/* Header & Stepper */}
      <div className="bg-[#1B4D3E] text-white py-6 shadow-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center relative z-10 w-1/5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${
                  step > i + 1 ? 'bg-[#C9A96E] text-white' : 
                  step === i + 1 ? 'bg-white text-[#1B4D3E]' : 
                  'bg-white/20 text-white/50'
                }`}>
                  {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <div className={`text-xs font-medium text-center ${step === i + 1 ? 'text-white' : 'text-white/60'}`}>{s}</div>
              </div>
            ))}
          </div>
          <div className="relative -top-10 left-[10%] right-[10%] h-0.5 bg-white/20 z-0">
            <div 
              className="absolute top-0 left-0 h-full bg-[#C9A96E] transition-all duration-300" 
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B4D3E] mb-6">Review Selection</h2>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{roomType.name}</h3>
                    <p className="text-[#C9A96E] font-medium">{ratePlan.name}</p>
                  </div>
                  <button onClick={() => router.push('/search')} className="text-sm text-[#1B4D3E] underline font-medium">Change Selection</button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200 my-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Check-in</p>
                    <p className="font-semibold">{formatDate(checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Check-out</p>
                    <p className="font-semibold">{formatDate(checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Guests</p>
                    <p className="font-semibold">{adults} Adults, {children} Children</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Rooms</p>
                    <p className="font-semibold">{rooms} Room{rooms > 1 ? 's' : ''} ({nights} Night{nights > 1 ? 's' : ''})</p>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Rate per night: ₹{ratePlan.pricePerNight.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1"><CheckCircle2 className="w-4 h-4 mr-1"/> {ratePlan.cancellation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Room Total (excl. taxes)</p>
                    <p className="text-2xl font-bold text-gray-900">₹{roomTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={handleContinue} className="bg-[#1B4D3E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#153a2f] transition-colors flex items-center">
                  Continue to Extras <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B4D3E] mb-2">Enhance Your Stay</h2>
              <p className="text-gray-600 mb-6">Select from our premium add-ons to make your stay unforgettable.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {extrasList.map(extra => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  const Icon = extra.icon;
                  return (
                    <div 
                      key={extra.id} 
                      className={`border rounded-xl p-5 cursor-pointer transition-all ${isSelected ? 'border-[#C9A96E] bg-yellow-50/30 shadow-md ring-1 ring-[#C9A96E]' : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'}`}
                      onClick={() => handleToggleExtra(extra)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#C9A96E]/20 text-[#1B4D3E]' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#1B4D3E] border-[#1B4D3E]' : 'border-gray-300'}`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900">{extra.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 h-8">{extra.desc}</p>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-semibold text-gray-900">₹{extra.price.toLocaleString()}</span>
                        <span className="text-[10px] uppercase tracking-wider text-gray-500">
                          {extra.type.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between border-t pt-6">
                <button onClick={() => setStep(1)} className="text-[#1B4D3E] font-medium px-6 py-3 border border-[#1B4D3E] rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={handleContinue} className="bg-[#1B4D3E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#153a2f] flex items-center">
                  Continue to Details <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#1B4D3E] mb-6">Guest Details</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#C9A96E] focus:border-[#C9A96E] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#C9A96E] focus:border-[#C9A96E] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#C9A96E] focus:border-[#C9A96E] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#C9A96E] focus:border-[#C9A96E] outline-none" required />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Address Information (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select name="country" value={formData.country} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border outline-none bg-white">
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="UAE">United Arab Emirates</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Arrival Time</label>
                      <select name="arrivalTime" value={formData.arrivalTime} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg p-3 border outline-none bg-white">
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM (Standard)</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST Number (For Corporate)</label>
                      <input type="text" name="gst" value={formData.gst} onChange={handleInputChange} placeholder="Optional" className="w-full border-gray-300 rounded-lg p-3 border outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows={3} placeholder="Any special requests? We will do our best to accommodate." className="w-full border-gray-300 rounded-lg p-3 border outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t pt-6 mt-8">
                <button onClick={() => setStep(2)} className="text-[#1B4D3E] font-medium px-6 py-3 border border-[#1B4D3E] rounded-lg hover:bg-gray-50">Back</button>
                <button 
                  onClick={handleContinue} 
                  disabled={!isFormValid()}
                  className={`px-8 py-3 rounded-lg font-bold flex items-center transition-colors ${isFormValid() ? 'bg-[#1B4D3E] text-white hover:bg-[#153a2f]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Continue to Review <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1B4D3E] mb-6">Review & Pay</h2>
                
                <div className="mb-6 p-4 bg-[#F8F5F0] rounded-lg border border-[#C9A96E]/30">
                  <h3 className="font-bold text-gray-900 mb-2">Guest Details</h3>
                  <p className="text-gray-700">{formData.firstName} {formData.lastName}</p>
                  <p className="text-gray-600 text-sm">{formData.email} • {formData.phone}</p>
                  {formData.specialRequests && <p className="text-gray-600 text-sm mt-2"><span className="font-medium">Requests:</span> {formData.specialRequests}</p>}
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Have a coupon?</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode} 
                      onChange={e => setCouponCode(e.target.value)} 
                      placeholder="Enter code" 
                      className="border border-gray-300 rounded-lg p-3 flex-1 outline-none uppercase"
                    />
                    <button 
                      onClick={() => setCouponApplied(true)} 
                      disabled={!couponCode}
                      className="bg-gray-900 text-white px-6 rounded-lg font-medium disabled:bg-gray-300"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && <p className="text-green-600 text-sm mt-2 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> Coupon applied successfully! 10% discount added.</p>}
                </div>

                <div className="mb-6 border-t pt-6 border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">Cancellation Policy</h3>
                  <div className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg">
                    <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      {ratePlan.cancellation === 'Free cancellation' 
                        ? 'You may cancel free of charge until 48 hours before arrival. You will be charged the total price of the reservation if you cancel within 48 hours of arrival.'
                        : 'This reservation is non-refundable. If you choose to cancel, you will not be refunded.'}
                    </p>
                  </div>
                </div>

                <div className="mb-8 border-t pt-6 border-gray-100">
                  <label className="flex items-start cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={agreedToTerms} 
                      onChange={e => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-[#1B4D3E] rounded border-gray-300 focus:ring-[#1B4D3E]"
                    />
                    <span className="ml-3 text-gray-700">
                      I have read and agree to the <a href="#" className="text-[#1B4D3E] underline">Booking Terms and Conditions</a> and <a href="#" className="text-[#1B4D3E] underline">Privacy Policy</a>. *
                    </span>
                  </label>
                </div>

                <div className="flex justify-between border-t pt-6">
                  <button onClick={() => setStep(3)} className="text-[#1B4D3E] font-medium px-6 py-3 border border-[#1B4D3E] rounded-lg hover:bg-gray-50">Back</button>
                  <button 
                    onClick={handlePayment} 
                    disabled={!agreedToTerms || isProcessing}
                    className={`px-8 py-3 rounded-lg font-bold flex items-center transition-colors text-lg shadow-md ${agreedToTerms && !isProcessing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    {isProcessing ? 'Processing...' : `PAY ₹${Math.round(grandTotal).toLocaleString()}`} 
                    {!isProcessing && <CreditCard className="ml-2 w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center animate-in zoom-in-95 duration-500 border-t-8 border-[#1B4D3E]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">BOOKING CONFIRMED!</h2>
              <p className="text-gray-600 mb-8">Thank you, {formData.firstName}. Your reservation is complete.</p>

              <div className="bg-[#F8F5F0] rounded-xl p-6 mb-8 text-left max-w-lg mx-auto border border-[#C9A96E]/20">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                  <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Booking ID</span>
                  <span className="text-lg font-bold text-[#1B4D3E]">{bookingId}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room</span>
                    <span className="font-semibold">{roomType.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-semibold">{formatDate(checkIn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out</span>
                    <span className="font-semibold">{formatDate(checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="font-bold text-gray-900">₹{Math.round(grandTotal).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button className="flex items-center justify-center bg-[#1B4D3E] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#153a2f] transition-colors">
                  <Download className="w-4 h-4 mr-2" /> Download Voucher
                </button>
                <button className="flex items-center justify-center bg-white text-[#1B4D3E] border border-[#1B4D3E] px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4 mr-2" /> Email Voucher
                </button>
                <button className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <Printer className="w-4 h-4 mr-2" /> Print
                </button>
              </div>

              <div className="border-t border-gray-100 pt-8 mt-8">
                <div className="flex items-start justify-center gap-2 text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Grand Vista Hotel</p>
                    <p className="text-sm">123 Luxury Avenue, Marine Drive</p>
                    <p className="text-sm">Mumbai, Maharashtra 400020, India</p>
                    <p className="text-sm mt-1">+91 22 1234 5678</p>
                  </div>
                </div>
                <button onClick={() => router.push('/')} className="text-[#1B4D3E] font-semibold underline hover:text-[#C9A96E]">
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary (Visible Steps 1-4) */}
        {step < 5 && (
          <div className="w-full lg:w-96 order-first lg:order-last">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-32 overflow-hidden">
              <div className="bg-[#1B4D3E] text-white p-5">
                <h3 className="font-bold text-lg">Your Stay</h3>
              </div>
              <div className="p-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-semibold">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4 border-b pb-4">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-semibold">{formatDate(checkOut)}</span>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-3">{roomType.name}</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Rate Plan</span>
                  <span className="text-gray-900">{ratePlan.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Guests</span>
                  <span className="text-gray-900">{adults} Adults, {children} Children</span>
                </div>
                
                <div className="border-t border-dashed my-4 pt-4">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Price Breakdown</h4>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Room (₹{ratePlan.pricePerNight.toLocaleString()} × {nights} nights)</span>
                    <span className="font-medium text-gray-900">₹{roomTotal.toLocaleString()}</span>
                  </div>
                  
                  {selectedExtras.map(extra => (
                    <div key={extra.id} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 line-clamp-1 pr-2">{extra.name}</span>
                      <span className="font-medium text-gray-900">₹{calculateExtraPrice(extra).toLocaleString()}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm mb-2 font-medium mt-4">
                    <span className="text-gray-800">Subtotal</span>
                    <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-sm mb-2 text-green-600">
                      <span>Discount (10%)</span>
                      <span>- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Taxes & Fees ({(gstRate * 100).toFixed(0)}% GST)</span>
                    <span className="font-medium text-gray-900">₹{Math.round(taxes).toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-end">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase">Grand Total</h4>
                    <p className="text-xs text-gray-500">Includes all taxes and fees</p>
                  </div>
                  <div className="text-2xl font-black text-[#1B4D3E]">
                    ₹{Math.round(grandTotal).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

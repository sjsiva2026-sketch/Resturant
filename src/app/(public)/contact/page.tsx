"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Hero Section */}
      <section className="relative h-[350px] w-full bg-gradient-to-r from-gray-900 to-[#1B4D3E] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Contact Us</h1>
          <p className="text-[#C9A96E] text-lg max-w-2xl mx-auto">
            We're here to assist you with any inquiries or requests.
          </p>
        </div>
      </section>

      <section className="container-hotel mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-serif text-[#1B4D3E] mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center border border-green-200">
                <h3 className="text-xl font-medium mb-2">Thank you!</h3>
                <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-[#1B4D3E] text-white rounded hover:bg-[#153a2f] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Subject *</label>
                    <select 
                      required
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Room Reservation</option>
                      <option value="dining">Dining & Restaurant</option>
                      <option value="events">Events & Banquets</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Your Message *</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-[#1B4D3E] text-white rounded hover:bg-[#153a2f] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SENDING..." : (
                    <>SEND MESSAGE <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1B4D3E] text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif text-[#C9A96E] mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#C9A96E] shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Hotel Address</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      123 Marine Drive,<br />
                      South Mumbai, Maharashtra<br />
                      400020, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#C9A96E] shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="text-gray-300 text-sm">+91 22 1234 5678</p>
                    <p className="text-gray-300 text-sm mt-1 text-[#C9A96E]">WhatsApp: +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#C9A96E] shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-gray-300 text-sm">info@grandvistahotel.com</p>
                    <p className="text-gray-300 text-sm mt-1">reservations@grandvistahotel.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-serif text-[#1B4D3E] mb-6">Business Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-600 font-medium">Front Desk</span>
                  <span className="text-[#1B4D3E]">24/7</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-600 font-medium">Reservations Team</span>
                  <span className="text-[#1B4D3E]">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Concierge</span>
                  <span className="text-[#1B4D3E]">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

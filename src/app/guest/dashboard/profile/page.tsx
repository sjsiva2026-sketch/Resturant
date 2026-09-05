"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";

export default function GuestProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#1B4D3E] text-white rounded-full flex items-center justify-center text-2xl font-serif">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-500">Gold Member</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition shadow-sm"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form className="p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-semibold text-[#1B4D3E] border-b pb-2">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" /> Full Name
              </label>
              <input 
                type="text" 
                defaultValue="John Doe"
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com"
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" /> Address
              </label>
              <input 
                type="text" 
                defaultValue="456 Luxury Lane, Apt 4B, New York, NY 10002"
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[#1B4D3E] border-b pb-2 mt-8">Security</h3>
          
          <div className="space-y-4">
            <button type="button" className="text-[#C9A96E] font-medium text-sm flex items-center gap-2 hover:text-[#b8995d] transition">
              <Shield className="w-4 h-4" /> Change Password
            </button>
          </div>

          {isEditing && (
            <div className="pt-6 flex justify-end">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-[#1B4D3E] text-white font-medium rounded-lg hover:bg-[#1B4D3E]/90 transition shadow-sm"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

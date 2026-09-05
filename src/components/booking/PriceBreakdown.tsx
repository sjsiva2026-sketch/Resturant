'use client';

import React from 'react';
import { useBookingStore } from '@/stores/booking-store';

export default function PriceBreakdown() {
  const { 
    priceBreakdown, 
    searchParams, 
    selectedRoomType, 
    selectedRatePlan, 
    selectedAddons 
  } = useBookingStore();

  if (!selectedRoomType || !selectedRatePlan) return null;

  const checkIn = new Date(searchParams.checkIn);
  const checkOut = new Date(searchParams.checkOut);
  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
  const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <div className="bg-[#F8F5F0] rounded-xl p-6 border border-[#C9A96E]/30">
      <h3 className="text-xl font-bold text-[#1B4D3E] mb-6">Price Summary</h3>
      
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-900">{selectedRoomType.name}</p>
            <p className="text-gray-600">{selectedRatePlan.name}</p>
            <p className="text-gray-500 text-xs mt-1">
              {searchParams.rooms} Room{searchParams.rooms > 1 ? 's' : ''} × {nights} Night{nights > 1 ? 's' : ''}
            </p>
          </div>
          <span className="font-semibold text-gray-900">{formatINR(priceBreakdown.nightlyRates)}</span>
        </div>

        {selectedAddons.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="font-semibold text-gray-900 mb-2">Extras & Add-ons</p>
            {selectedAddons.map(addon => (
              <div key={addon.id} className="flex justify-between text-gray-600 mb-1">
                <span>{addon.name} (x{addon.quantity})</span>
                {/* Simplified display, actual computation happens in store */}
                <span>Included</span>
              </div>
            ))}
            <div className="flex justify-between font-medium text-gray-800 mt-2">
              <span>Add-ons Total</span>
              <span>{formatINR(priceBreakdown.addonTotal)}</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>{formatINR(priceBreakdown.subtotal)}</span>
          </div>
          
          {priceBreakdown.discountAmount > 0 && (
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount applied</span>
              <span>-{formatINR(priceBreakdown.discountAmount)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-gray-600">
            <span>Taxes & Fees (18% GST)</span>
            <span>{formatINR(priceBreakdown.taxAmount)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#C9A96E]/50">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-lg font-bold text-[#1B4D3E]">Grand Total</p>
              <p className="text-xs text-gray-500">Includes taxes and fees</p>
            </div>
            <span className="text-2xl font-bold text-[#1B4D3E]">
              {formatINR(priceBreakdown.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { create } from 'zustand';

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  promoCode: string;
}

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  image: string;
  bedType: string;
  size: string;
  amenities: string[];
}

export interface RatePlan {
  id: string;
  name: string;
  pricePerNight: number;
  includedServices: string[];
  cancellationTerms: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  pricingMethod: 'per_stay' | 'per_night' | 'per_person';
  quantity: number;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  company?: string;
  gstNumber?: string;
  specialRequests?: string;
  estimatedArrival?: string;
}

export interface PriceBreakdown {
  nightlyRates: number;
  subtotal: number;
  addonTotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

interface BookingState {
  searchParams: SearchParams;
  selectedRoomType: RoomType | null;
  selectedRatePlan: RatePlan | null;
  selectedAddons: Addon[];
  guestDetails: GuestDetails | null;
  couponCode: string | null;
  couponDiscount: number;
  priceBreakdown: PriceBreakdown;
  currentStep: number;
  holdId: string | null;
  bookingData: any;
  setBookingData: (data: any) => void;

  setSearchParams: (params: Partial<SearchParams>) => void;
  selectRoom: (room: RoomType, ratePlan: RatePlan) => void;
  addAddon: (addon: Addon) => void;
  removeAddon: (addonId: string) => void;
  updateAddonQuantity: (addonId: string, quantity: number) => void;
  setGuestDetails: (details: GuestDetails) => void;
  applyCoupon: (code: string, discount: number) => void;
  setStep: (step: number) => void;
  reset: () => void;
  calculatePrices: () => void;
}

const initialSearchParams: SearchParams = {
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  rooms: 1,
  promoCode: '',
};

const initialPriceBreakdown: PriceBreakdown = {
  nightlyRates: 0,
  subtotal: 0,
  addonTotal: 0,
  taxAmount: 0,
  discountAmount: 0,
  total: 0,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  searchParams: initialSearchParams,
  selectedRoomType: null,
  selectedRatePlan: null,
  selectedAddons: [],
  guestDetails: null,
  couponCode: null,
  couponDiscount: 0,
  priceBreakdown: initialPriceBreakdown,
  currentStep: 1,
  holdId: null,
  bookingData: null,
  setBookingData: (data: any) => set({ bookingData: data }),

  setSearchParams: (params) => {
    set((state) => ({ searchParams: { ...state.searchParams, ...params } }));
    get().calculatePrices();
  },

  selectRoom: (room, ratePlan) => {
    set({ selectedRoomType: room, selectedRatePlan: ratePlan });
    get().calculatePrices();
  },

  addAddon: (addon) => {
    set((state) => {
      const exists = state.selectedAddons.find((a) => a.id === addon.id);
      if (exists) {
        return {
          selectedAddons: state.selectedAddons.map((a) =>
            a.id === addon.id ? { ...a, quantity: a.quantity + 1 } : a
          ),
        };
      }
      return { selectedAddons: [...state.selectedAddons, addon] };
    });
    get().calculatePrices();
  },

  removeAddon: (addonId) => {
    set((state) => ({
      selectedAddons: state.selectedAddons.filter((a) => a.id !== addonId),
    }));
    get().calculatePrices();
  },

  updateAddonQuantity: (addonId, quantity) => {
    set((state) => ({
      selectedAddons: state.selectedAddons.map((a) =>
        a.id === addonId ? { ...a, quantity } : a
      ),
    }));
    get().calculatePrices();
  },

  setGuestDetails: (details) => set({ guestDetails: details }),

  applyCoupon: (code, discount) => {
    set({ couponCode: code, couponDiscount: discount });
    get().calculatePrices();
  },

  setStep: (step) => set({ currentStep: step }),

  reset: () => set({
    searchParams: initialSearchParams,
    selectedRoomType: null,
    selectedRatePlan: null,
    selectedAddons: [],
    guestDetails: null,
    couponCode: null,
    couponDiscount: 0,
    priceBreakdown: initialPriceBreakdown,
    currentStep: 1,
    holdId: null,
  }),

  calculatePrices: () => {
    const state = get();
    if (!state.selectedRatePlan || !state.searchParams.checkIn || !state.searchParams.checkOut) {
      return;
    }

    const checkIn = new Date(state.searchParams.checkIn);
    const checkOut = new Date(state.searchParams.checkOut);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    
    const nightlyRates = state.selectedRatePlan.pricePerNight * nights * state.searchParams.rooms;
    
    let addonTotal = 0;
    state.selectedAddons.forEach((addon) => {
      let multiplier = addon.quantity;
      if (addon.pricingMethod === 'per_night') {
        multiplier *= nights;
      } else if (addon.pricingMethod === 'per_person') {
        multiplier *= (state.searchParams.adults + state.searchParams.children);
      }
      addonTotal += addon.price * multiplier;
    });

    const subtotal = nightlyRates + addonTotal;
    const discountAmount = state.couponDiscount;
    const afterDiscount = Math.max(0, subtotal - discountAmount);
    const taxRate = 0.18; // 18% GST
    const taxAmount = afterDiscount * taxRate;
    const total = afterDiscount + taxAmount;

    set({
      priceBreakdown: {
        nightlyRates,
        subtotal,
        addonTotal,
        taxAmount,
        discountAmount,
        total,
      },
    });
  },
}));

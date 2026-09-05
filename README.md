# Grand Vista Hotel & Suites — Luxury Hotel Booking Platform & PMS

A complete, production-grade online room booking application and comprehensive Property Management System (PMS) designed specifically for an individual 5-star hotel property: **Grand Vista Hotel & Suites**, Mumbai.

---

## 🌟 Features Overview

### 1. Luxury Public Hotel Portal
- **Homepage**: Full-screen luxury hero, search widget, welcome story, featured rooms & suites, 12 hotel facilities, dining preview, special offers, gallery, guest reviews, Mumbai attractions, and map.
- **Rooms & Suites**: Dynamic room catalog (`/rooms`) and room details (`/rooms/[slug]`) with rate plans (Room Only, Bed & Breakfast), full amenities, floor plans, and policies.
- **Dining**: Showcase for *The Grand Restaurant* (all-day dining) and *Skybar Lounge* (rooftop cocktails).
- **Facilities & Wellness**: 12 detailed facility listings with Lucide icons.
- **Offers & Packages**: 6 promotional campaigns with promo codes.
- **Gallery**: Category-filtered lightbox gallery.
- **About Property**: History, heritage, mission, executive leadership, key statistics.
- **Nearby Attractions**: Curated Mumbai guide with distances and transit info.
- **Contact Us**: Interactive inquiry form with Google Maps embed and WhatsApp link.
- **My Booking Lookup**: Instant reservation retrieval by booking reference (`GVH-YYYY-XXXXX`) and email/phone.

### 2. High-Conversion Booking Flow (`/search` & `/book`)
- **Real-Time Availability**: Conflict detection engine accounting for active stays, 10-minute cart holds, and maintenance locks.
- **5-Step Interactive Checkout**:
  1. Room selection & stay duration summary
  2. Hospitality add-ons (Buffet breakfast, airport transfers, rollaway beds, romantic decor)
  3. Guest contact & billing details with GST invoice support
  4. Review & Pay with Indian GST slabs (12% / 18%) and promo code validation
  5. Booking confirmation with instant voucher generation, QR reference, and email delivery
- **Payment Gateway**: Razorpay integration with HMAC-SHA256 signature verification and webhook idempotency.

### 3. Property Management System (PMS) (`/admin/`)
- **Executive Dashboard**: 8 live KPI metrics, revenue charts, occupancy rates, and quick front desk shortcuts.
- **Front Desk Operations**: Today's arrivals, departures, in-house guests, and instant check-in/out.
- **Reservations Management**: Full reservation ledger, manual booking creation, folio calculation, and invoice printing.
- **Rooms & Inventory**: Dual view for Room Types and 12 individual physical keys with status indicators.
- **Rates & Calendar**: Dynamic rate plans, daily pricing calendar, and meal plan configurations.
- **Housekeeping Kanban**: Real-time room turnover tracking (`DIRTY` → `CLEANING` → `CLEAN` → `INSPECTED`).
- **Maintenance Ticketing**: Work order management with automatic room inventory blocks.
- **Guest CRM**: Guest directory with lifetime stay history, spending analytics, and concierge notes.
- **Financials & Refunds**: Complete payment transactions ledger with refund handling.
- **Marketing & Promotions**: Dynamic offers and coupon codes with minimum spend rules.
- **Business Intelligence**: Revenue, Occupancy, and Tax reports with CSV export.
- **Website CMS**: Content and gallery management.
- **Staff Access Control**: Role-based access control (Admin, Receptionist, Housekeeping).
- **Audit Logs**: Immutable audit log of all critical front-desk and back-office operations.

### 4. Guest Self-Service Portal (`/guest/`)
- Personalized guest dashboard with upcoming/past stays.
- Digital stay vouchers and cancellation requests.
- Guest profile and billing preference management.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router with Turbopack)
- **Language**: TypeScript (Strict mode, zero `any` shortcuts)
- **Styling**: Tailwind CSS with custom luxury color palette (`#1B4D3E`, `#C9A96E`, `#F8F5F0`)
- **Database ORM**: Prisma ORM v6.19.3
- **Database**: PostgreSQL
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Authentication**: Jose / JWT with httpOnly cookies & Edge middleware guards
- **Payments**: Razorpay API & Webhooks (with HMAC-SHA256 verification)
- **Notifications**: Nodemailer (SMTP)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x
- Docker Desktop (or local PostgreSQL 14+)

### 2. Setup Environment Variables
Ensure `.env` exists in `hotel-app/` with your database and service keys:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hotel_booking?schema=public"
JWT_SECRET="grand-vista-secret-key-change-in-production"
RAZORPAY_KEY_ID="rzp_test_placeholder"
RAZORPAY_KEY_SECRET="rzp_test_secret_placeholder"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_placeholder"
```

### 3. Start PostgreSQL Database
```bash
# Using Docker Compose
docker compose up -d
```

### 4. Database Schema & Seed Data
```bash
# Push Prisma schema to PostgreSQL
npm run db:push

# Seed database with realistic 5-star hotel data
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Production Build
```bash
npm run build
npm start
```

---

## 🔑 Default Accounts (from Seed)

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@grandvistahotel.com` | `Admin@123456` |
| **Front Desk Receptionist** | `reception@grandvistahotel.com` | `Staff@123456` |
| **Housekeeping Lead** | `housekeeping@grandvistahotel.com` | `Staff@123456` |
| **Test Guest** | `guest@example.com` | `Guest@123456` |

---

## 🏷 Sample Coupons Pre-configured
- `WELCOME10`: 10% off (Max discount ₹2,000)
- `SUMMER20`: 20% off on stays above ₹10,000 (Max discount ₹5,000)
- `FLAT1000`: Flat ₹1,000 off on stays above ₹5,000

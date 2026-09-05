import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Grand Vista Hotel",
    default: "Grand Vista Hotel | Where Luxury Meets Serenity",
  },
  description:
    "Experience unparalleled luxury at Grand Vista Hotel, Mumbai. Premium rooms, world-class dining, and impeccable service. Book your stay directly for the best rates.",
  keywords: [
    "Grand Vista Hotel",
    "luxury hotel Mumbai",
    "premium hotel",
    "5 star hotel Mumbai",
    "hotel booking",
    "best hotel Mumbai",
  ],
  openGraph: {
    title: "Grand Vista Hotel | Where Luxury Meets Serenity",
    description:
      "Experience unparalleled luxury at Grand Vista Hotel, Mumbai. Book your stay directly for the best rates.",
    type: "website",
    locale: "en_IN",
    siteName: "Grand Vista Hotel",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

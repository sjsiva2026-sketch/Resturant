import { ReactNode } from 'react';
import Link from 'next/link';
import { Hotel } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center space-x-2">
          <Hotel className="h-10 w-10 text-[#1B4D3E]" />
          <span className="text-3xl font-serif font-bold text-[#1B4D3E]">Grand Vista</span>
        </Link>
        <h2 className="mt-4 text-center text-sm text-[#1B4D3E]/70 uppercase tracking-widest font-semibold">
          Luxury Redefined
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-[#C9A96E]/20">
          {children}
        </div>
      </div>
    </div>
  );
}

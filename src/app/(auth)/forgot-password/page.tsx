'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setErrorMsg('');
    try {
      // In a real app, you'd call the API here:
      // await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify(data) });
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-serif font-semibold text-[#1B4D3E] mb-2">
          Check your email
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We've sent a password reset link to your email address. Please check your inbox and spam folder.
        </p>
        <Link 
          href="/login" 
          className="w-full flex justify-center py-2.5 px-4 border border-[#1B4D3E] rounded-md shadow-sm text-sm font-medium text-[#1B4D3E] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4D3E]"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-semibold text-[#1B4D3E] text-center mb-2">
        Reset Password
      </h2>
      <p className="text-sm text-center text-gray-600 mb-8">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {errorMsg && (
        <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <div className="mt-1">
            <input
              {...register('email')}
              type="email"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C9A96E] focus:border-[#C9A96E] sm:text-sm"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1B4D3E] hover:bg-[#153a2f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4D3E] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Sending...
              </>
            ) : (
              'SEND RESET LINK'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link href="/login" className="font-medium text-[#C9A96E] hover:text-[#b89555] transition-colors flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

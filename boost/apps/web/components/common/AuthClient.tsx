'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { createGoogleAuthorizationURL } from '@/actions/auth.actions';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
export default function AuthClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    try {
      const result = await createGoogleAuthorizationURL();
      if (result.success && result.data) {
        router.push(result.data.toString());
      } else {
        setError(
          result.error ||
            'Failed to create Google authorization URL. Please try again.',
        );
      }
    } catch (e) {
      setError('An error occurred. Please try again later.');
      console.error('Error in Google Auth:', e);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#0F1115]">
      <Link
        href="/"
        className="absolute left-4 top-4 rounded-full p-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#D591FE] hover:to-[#00FFD1] hover:text-white dark:text-gray-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="w-full max-w-md space-y-8 px-4">
        {/* Door Illustration */}
        <div className="flex justify-center">
          <motion.svg
            className="h-40 w-40 text-[#D591FE] dark:text-[#D591FE]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <path
              d="M3 3h18v18H3V3zm12 0v18M3 3l12 6m0 12l-12-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="18" cy="7" r="0.5" fill="currentColor" />
            <circle cx="16.5" cy="9" r="0.5" fill="currentColor" />
            <circle cx="19" cy="10" r="0.5" fill="currentColor" />
          </motion.svg>
        </div>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Open the door to
            <br />
            <span className="bg-gradient-to-r from-[#D591FE] to-[#00FFD1] bg-clip-text text-transparent">
              100x Savings
            </span>
          </motion.h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/10">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="relative w-full justify-center space-x-2 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              onClick={handleGoogleAuth}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Continue with Google
              </span>
            </Button>
          </motion.div>
        </div>
        {/* Terms */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-gray-500 dark:text-gray-400"
        >
          By continuing, you agree to our{' '}
          <Link
            href="/terms"
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            Terms of Service
          </Link>
          ,{' '}
          <Link
            href="/privacy"
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            href="/data-protection"
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            Data Protection Agreement
          </Link>
        </motion.p>
        <div className="flex justify-center">
          <Link href="/" className="group relative">
            <motion.span
              className="absolute -inset-1 h-full w-full rounded-2xl bg-gradient-to-r from-[#D591FE] to-[#00FFD1] opacity-30 blur-xl filter group-hover:opacity-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 0.5,
                },
              }}
            />
            <motion.span
              className="relative block bg-gradient-to-r from-[#D591FE] to-[#00FFD1] bg-clip-text text-4xl font-black text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                onComplete: () => {},
              }}
              whileInView={{
                y: [-2, 2],
                transition: {
                  delay: 0.5,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
            >
              100xBoost
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const navigationLinks = {
    platform: [
      { name: 'AWS', href: '#' },
      { name: 'GCP', href: '#' },
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Docs', href: '#' },
      { name: 'Company', href: '#' },
      { name: 'Blog & Resources', href: '#' },
      { name: 'Newsroom', href: '#' },
      { name: 'Featured Customers', href: '#' },
      { name: 'Venture Partnerships', href: '#' },
    ],
    legal: [
      { name: 'Privacy policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Settings', href: '#' },
      { name: 'Media Brand Kit', href: '#' },
      { name: 'Release Notes', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Events', href: '#' },
    ],
  };

  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <footer className="w-full px-4 md:py-16">
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-3" ref={ref}>
          {visible && (
            <>
              <motion.div
                className="space-y-6"
                initial={{
                  x: -40,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  type: 'spring',
                  duration: 2,
                }}
              >
                <span className="text-3xl font-bold text-white">100xBoost</span>
                <p className="text-xl text-gray-200">A Product by 100xDevs.</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                <div className="space-y-4">
                  {navigationLinks.platform.map((link, index) => (
                    <motion.a
                      initial={{
                        x: -40,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.1 * index,
                      }}
                      whileHover={{
                        x: 10,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      key={index}
                      href={link.href}
                      className="block text-gray-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
                <div className="space-y-4">
                  {navigationLinks.legal.map((link, index) => (
                    <motion.a
                      initial={{
                        x: -40,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.1 * index,
                      }}
                      whileHover={{
                        x: 10,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      key={index}
                      href={link.href}
                      className="block text-gray-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2024 100xBoost Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

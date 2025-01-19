// "use client"
import { motion } from 'framer-motion';
import { Globe } from './Globe';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-x-clip px-4 text-center lg:items-start lg:px-20 lg:text-left">
      <div className="flex flex-col">
        <div className="md:text-xl">
          {'Humanless cloud optimization'.split(' ').map((el, idx) => (
            <motion.span
              key={idx}
              initial={{
                opacity: 0,
                scale: 2,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                type: 'spring',
                delay: 0.1 * idx,
                duration: 4,
              }}
            >
              {el}{' '}
            </motion.span>
          ))}
        </div>

        <div className="max-w-2xl px-4 text-[2em] uppercase md:text-[4em]">
          {'Making Cloud Cheaper for you'.split('').map((el, idx) => (
            <motion.span
              key={idx}
              initial={{
                opacity: 0,
                scale: 1.3,
                filter: 'blur(5px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                type: 'spring',
                delay: 0.1 * idx,
                duration: 2,
              }}
            >
              {el}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.span
        initial={{
          translateX: -60,
          opacity: 0,
          filter: 'blur(2px)',
        }}
        animate={{
          translateX: 0,
          opacity: 1,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 2,
        }}
        className="px-2"
      >
        Cut your cloud bill by up to 50% with our enterprise grade AI-driven
        automation.
        <br />
        No risk, no contracts, and no technical work required.
      </motion.span>

      <motion.button
        className="w-fit rounded-md border bg-[#00ffd1] px-4 py-2 text-lg font-semibold text-black hover:bg-[#00ffd1] md:px-8"
        initial={{
          translateX: -60,
          opacity: 0,
          filter: 'blur(2px)',
        }}
        animate={{
          translateX: 0,
          opacity: 1,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 2,
        }}
        whileHover={{
          y: -4,
          transition: {
            duration: 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 10,
          },
        }}
        onClick={() => router.push('/auth')}
      >
        Start Saving
      </motion.button>

      <div className="absolute top-40 -z-50 h-[150vh] w-full lg:-right-96">
        <Globe />
      </div>
    </section>
  );
}

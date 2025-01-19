'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
export function Menu() {
  const router = useRouter();
  return (
    <motion.div
      className="fixed top-0 z-50 flex w-full justify-between bg-gradient-to-t from-[#1e2125] to-[#0f1113] px-4 py-4 md:px-20"
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 1,
        duration: 1,
      }}
    >
      <div className="text-lg md:text-xl">
        <span>100xBoost</span>
      </div>
      <NavLinks />
      <div className="">
        <button
          className="rounded-md border bg-[#00ffd1] px-2 py-1 text-black hover:bg-[#00ffd1] md:px-4 md:py-2"
          onClick={() => router.push('/auth')}
        >
          Start Saving
        </button>
      </div>
    </motion.div>
  );
}

export default function NavLinks() {
  return (
    <div className="hidden gap-4 rounded-full border px-20 py-2 md:flex">
      <span>PARTNERS</span>
      <span>FEATURES</span>
      <span>PRIZING</span>
      <span>DOCS</span>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function Contact() {
  const bannerContainer = useRef(null);
  const bannerVisible = useInView(bannerContainer, { once: true });

  return (
    <div className="mb-10 w-full px-4 md:py-16">
      <div ref={bannerContainer}></div>
      <Card className="relative mx-auto max-w-6xl overflow-hidden border-gray-800 bg-[#00ffd1]/50 md:px-20 md:py-16">
        <div className="absolute inset-0 bg-[#00ffd1]/10 blur-3xl" />
        {bannerVisible && (
          <motion.div
            className="relative flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-12"
            initial={{
              x: -60,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 2,
            }}
          >
            <div className="space-y-4">
              <h2 className="font-mono text-3xl uppercase md:text-5xl">
                Ready to Join ?
              </h2>
              <p className="max-w-xl text-black">
                Get in touch with our team to learn about your savings potential
                or ask us anything you&apos;d like!
              </p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 2,
                delay: 1,
              }}
            >
              <Button variant="default" className="">
                GET STARTED
              </Button>
              <Button
                variant="outline"
                className="hover:bg-primary 2s group border-black bg-inherit transition-all ease-in-out hover:text-white"
              >
                <ArrowRight className="2s mr-2 h-4 w-4 transition-all ease-in-out group-hover:translate-x-2" />
                BOOK A DEMO
              </Button>
            </motion.div>
          </motion.div>
        )}
      </Card>
    </div>
  );
}

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image';

export default function Banner() {
  const points = [
    {
      description:
        'Thousands of products and endless pricing programs can be confusing, leading to wasted expenses. On average, companies waste 30% or more on cloud spend because of financial mismanagement.',
    },
    {
      description:
        'Cloud architecture changes constantly as the business evolves. This drives financial inefficiency as vendor commitment based pricing programs limit your flexibility.',
    },
    {
      description:
        'Implementing healthy cloud accounting and FinOps practices traditionally demands significant engineering hours.',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div className="w-full p-4">
      <div className="h-88 relative flex overflow-hidden rounded-3xl bg-white text-black">
        {/* Decorative Elements */}
        <div className="hidden h-full overflow-hidden md:block">
          <Image
            src={
              'https://cdn.prod.website-files.com/665f27834e206c9660b3a626/6661b7e2cc9e612f00511849_half-orbit.svg'
            }
            width={0}
            height={0}
            alt="Circle svg"
            className="h-full w-60"
          />
        </div>
        {/* Content */}
        <div className="bg-red-0 w-full p-8 md:p-12" ref={ref}>
          {isInView && (
            <>
              <motion.h2
                className="mb-16 max-w-4xl font-mono text-[2em] font-medium md:text-[3em]"
                initial={{
                  y: 40,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 2,
                }}
              >
                CLOUD FINANCE IS UNNECESSARILY COMPLICATED.
              </motion.h2>

              <div className="grid gap-8 md:grid-cols-3">
                {points.map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="space-y-4"
                    initial={{
                      y: 40,
                      opacity: 0,
                      filter: 'blur(10px)',
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                    }}
                    transition={{
                      delay: 0.4 * idx,
                    }}
                  >
                    <hr />
                    <h3 className="font-mono text-2xl text-gray-700 md:text-[4em]">
                      {'0' + (1 + idx) + '.'}
                    </h3>
                    <p className="leading-relaxed text-gray-600 md:text-xl">
                      {point.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

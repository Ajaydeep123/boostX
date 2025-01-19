'use client';
import { useState } from 'react';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '../../constants/landingpage.constants';
export default function FAQs(): JSX.Element {
  const [answer, setAnswer] = useState(0);

  const FAQList = faqs.map((qa, index) => (
    <div className="w-full p-4" key={index}>
      <div
        className={`flex cursor-pointer items-center gap-2 p-2 ${answer === index ? 'text-[#ffffff30]' : ''}`}
        onClick={() => {
          setAnswer(answer === index ? 0 : index);
        }}
      >
        {answer === index ? <Cross2Icon /> : <PlusIcon />}
        <span>{qa.question}</span>
      </div>
      <AnimatePresence>
        {answer === index && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }} // Animate to auto height and full opacity
            className="ml-10 w-full p-2"
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }} // Animate out
            initial={{ height: 0, opacity: 0 }} // Initial state for animation
            transition={{ duration: 0.2 }} // Transition duration
          >
            <span>{qa.answer}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ));

  return (
    <div className="grid w-full place-content-center p-20">
      <span className="text-[4em] text-[#ffffff20]">FAQ</span>
      {FAQList}
    </div>
  );
}

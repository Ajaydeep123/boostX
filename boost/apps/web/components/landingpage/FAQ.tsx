import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    {
      question: 'How does it work?',
      answer:
        'Our platform automatically analyzes your cloud usage patterns and implements cost-saving strategies while maintaining flexibility and security. We provide real-time optimization recommendations and automated implementation options.',
    },
    {
      question: "Can't I buy savings plans from AWS?",
      answer:
        "While AWS does offer savings plans directly, our solution provides more flexibility and often deeper savings through our proprietary platform. We don't require long-term commitments and can adjust to your changing needs.",
    },
    {
      question: 'Are you guys just another RI broker?',
      answer:
        "No, we're much more than that. We're a comprehensive cloud financial operations platform that provides automated cost optimization, security controls, and flexible commitment terms that traditional RI brokers can't match.",
    },
    {
      question: 'What happens if I need to cancel my subscription?',
      answer:
        'You can cancel your subscription at any time with no penalties. We operate on a monthly basis, providing you with the flexibility to adjust or end your service as your needs change.',
    },
    {
      question: 'I have an EDP, does this complicate using North?',
      answer:
        'Not at all. North is designed to work seamlessly with Enterprise Discount Programs (EDPs). We can help you optimize your cloud costs while maintaining compliance with your existing enterprise agreements.',
    },
  ];

  const faqContainer = useRef(null);
  const faqVisible = useInView(faqContainer, { once: true });

  return (
    <div className="relative w-full overflow-hidden px-4 py-16 md:py-24">
      <div className="container relative mx-auto">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{
            y: 40,
            opacity: 0,
            filter: 'blur(20px',
          }}
          animate={{
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            type: 'spring',
            duration: 1,
          }}
        >
          <h2 className="mb-4 font-mono text-3xl text-white md:text-5xl">
            FAQS
          </h2>
          <p className="text-gray-400">
            Find answers to commonly asked questions about our product and
            services.
          </p>
        </motion.div>
        <div className="mx-auto max-w-2xl" ref={faqContainer}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqVisible &&
              faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{
                    y: 30,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.4 * index,
                  }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="rounded-lg border-gray-800 bg-gray-900/50 px-6"
                  >
                    <AccordionTrigger className="py-6 text-left text-white hover:text-white hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

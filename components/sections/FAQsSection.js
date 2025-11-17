"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });

  const faqs = [
    {
      question: "What is the Internationally Trained Lawyers Conference?",
      answer: "The ITL Conference is the largest gathering of Internationally Trained Lawyers (ITLs) in Canada. The Conference will feature different legal professionals, regulators, change makers, and other stakeholders committed to supporting ITLs in their legal practice journey in Canada. The ITL Conference is a joint effort of our partner organizations: The ITL Network, Global Lawyers of Canada, ITLNCA NetworkS and the Just One Yes (JOY) Initiative."
    },
    {
      question: "When and where will the ITL Conference take place?",
      answer: "The ITL Conference has been scheduled to hold between April 23 - 25, 2026 in the city of Toronto, Ontario."
    },
    {
      question: "Who should attend the ITL Conference?",
      answer: "The conference is opened to internationally trained lawyers, students, legal educators,employers, recruiters, equity seeking groups and other legal professionals."
    },
    {
      question: "How can I register for the conference?",
      answer: "Registration details will be announced soon. Please check back regularly or sign up for our newsletter to receive updates on registration opening dates and early bird pricing."
    },
    {
      question: "Will there be networking opportunities?",
      answer: "Yes! The conference is designed to facilitate meaningful connections. There will be dedicated networking sessions, social events, and opportunities to connect with fellow ITLs, legal professionals, and potential employers."
    },
    {
      question: "Are there sponsorship opportunities available?",
      answer: "Yes, we welcome sponsors who are committed to supporting ITLs. Please contact us through the 'Become a Sponsor' section for more information on sponsorship packages and benefits."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
            initial={{ scale: 1 }}
            animate={isInView ? { scale: 1 } : { scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HelpCircle className="w-8 h-8 text-primary-600" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 text-lg">
            Everything you need to know about the ITL Conference '26
          </p>
        </motion.div>

        {/* FAQs Accordion - Show only first 3 */}
        <div className="space-y-4">
          {faqs.slice(0, 3).map((faq, index) => (
            <motion.div
              key={index}
              className="border border-neutral-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-neutral-900 pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                  <p className="text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA to see all FAQs */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="/faqs"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition shadow-lg text-lg group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See All Questions
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function FAQsPage() {
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
      question: "What can attendees expect from the ITL Conference?",
      answer: "Attendees can expect a comprehensive program featuring insightful panel discussions, workshops, networking sessions, and opportunities to engage with fellow legal professionals. The conference will also feature a Gala & Award night recognizing exceptional internationally trained lawyers in Canada."
    },
    {
      question: "How can I register for the ITL Conference?",
      answer: "Registration for the conference can be completed online through our website. Early registration discounts and group rates may be available. Please visit the registration page for details."
    },
    {
      question: "Is there a cost to attend the ITL Conference?",
      answer: "Yes, there is a registration fee to attend the ITL Conference. The fee structure may vary based on factors such as early registration, student discounts, or group rates. Please refer to our registration page for current registration information."
    },
    {
      question: "What is included in a ticket?",
      answer: "Tickets may include access to the Conference and Gala or Conference only. The ticket also includes a breakfast, coffee break, lunch and all other Conference materials. For more details on tickets and registration fees, please visit our registration page."
    },
    {
      question: "Are there hotel accommodations available for travelling conference attendees?",
      answer: "We have reserved a block of rooms at The Westin Calgary at a discounted rate of $195.00 per night. To book directly, please call Marriott reservations at 1-888-627-8417 or contact The Westin Calgary Hotel directly at (403) 266-1611. Please use the group name “The ITL Conference” to identify that you are booking for the Conference."
    },
    {
      question: "Are there any travel discounts available for travelling conference attendees?",
      answer: "travel-discounts", // Special marker for JSX content
      jsxAnswer: (
        <div className="space-y-6">
          {/* Air Canada */}
          <div>
            <h3 className="font-bold text-lg text-neutral-900 mb-3">Air Canada</h3>
            <ul className="space-y-2 text-neutral-700 ml-4">
              <li className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold min-w-[180px]">North America:</span>
                <span>5% off on standard fares, 10% off on flex fares & higher.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold min-w-[180px]">International Travel:</span>
                <span>10% off on standard fares & higher.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold min-w-[180px]">Promotion Code:</span>
                <span className="font-mono bg-neutral-100 px-2 py-1 rounded">VBRCJ2N1</span>
              </li>
            </ul>
            <p className="text-sm text-neutral-600 mt-3 ml-4">
              The travel period begins Thursday, April 16, 2026 and ends Saturday, May 2, 2026.
            </p>
          </div>

          {/* WestJet */}
          <div>
            <h3 className="font-bold text-lg text-neutral-900 mb-3">WestJet</h3>
            <ul className="space-y-2 text-neutral-700 ml-4">
              <li className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold min-w-[180px]">Within Canada:</span>
                <span>5% off Econo and 10% off EconoFlex and Premium fares.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-semibold min-w-[180px]">Trans-border Travel:</span>
                <span>2% off Econo, 5% off EconoFlex, and 10% off Premium base fares.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-semibold min-w-[180px]">Coupon Code (Guest Web or Travel Agent Web):</span>
                <span className="font-mono bg-neutral-100 px-2 py-1 rounded">4U7X6GG</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-semibold min-w-[180px]">Promo Code (Travel Agent GDS only):</span>
                <span className="font-mono bg-neutral-100 px-2 py-1 rounded">YBU70</span>
              </li>
            </ul>
            <p className="text-sm text-neutral-600 mt-3 ml-4">
              The booking should be made to the following city: <strong>Toronto</strong>. The travel period starts from Thursday, April 16, 2026, and ends on Friday, May 3, 2026. Travel is valid on all days: Monday through Sunday.
            </p>
          </div>

          {/* Porter Airlines */}
          <div>
            <h3 className="font-bold text-lg text-neutral-900 mb-3">Porter Airlines</h3>
            <p className="text-neutral-700 mb-3 ml-4">
              10% discount on available base fares (except the lowest class fare during a public seat sale).
            </p>
            <p className="text-sm text-neutral-600 mb-3 ml-4">
              The discounted fares are available for booking from <strong>September 19, 2025 to April 22, 2026</strong> and available for travel:
            </p>
            <div className="ml-4 overflow-x-auto">
              <table className="min-w-full border border-neutral-300 rounded-lg text-sm">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="border border-neutral-300 px-3 py-2 text-left font-semibold">Location</th>
                    <th className="border border-neutral-300 px-3 py-2 text-left font-semibold">Dates of Travel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-3 py-2">
                      <div>From: All Markets</div>
                      <div>To: Toronto (YTO)</div>
                    </td>
                    <td className="border border-neutral-300 px-3 py-2">
                      <div>From: 21Apr26</div>
                      <div>To: 24Apr26</div>
                    </td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-3 py-2">
                      <div>From: Toronto (YTO)</div>
                      <div>To: All Markets</div>
                    </td>
                    <td className="border border-neutral-300 px-3 py-2">
                      <div>From: 24Apr26</div>
                      <div>To: 27Apr26</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-neutral-700 mt-3 ml-4">
              Please book online at{" "}
              <a 
                href="https://www.flyporter.com/en-ca/?promocode=ITLT26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline font-semibold"
              >
                https://www.flyporter.com/en-ca/?promocode=ITLT26
              </a>
              {" "}or through your travel agent using promo code{" "}
              <span className="font-mono bg-neutral-100 px-2 py-1 rounded">ITLT26</span>.
            </p>
          </div>
        </div>
      )
    },

  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white ">
      {/* Banner Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="https://pngimg.com/d/question_mark_PNG40.png"
            alt="ITL Conference FAQs"
            fill
            className="object-contain opacity-80"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/20" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6"
              initial={{ scale: 1 }}
              animate={isInView ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 break-words">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Everything you need to know about the ITL Conference '26
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4 sm:mb-6 break-words">
              Learn More About The ITL Conference
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto break-words">
              Welcome to the FAQ section. Here, you will find answers to common questions about the ITL Conference, registration process, event details, and more. Explore the information to get the most out of your conference experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-neutral-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-neutral-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-neutral-900 pr-8 text-base sm:text-lg break-words">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
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
                    {faq.jsxAnswer ? (
                      <div className="text-neutral-700 leading-relaxed text-base sm:text-lg break-words">
                        {faq.jsxAnswer}
                      </div>
                    ) : (
                      <p className="text-neutral-700 leading-relaxed text-base sm:text-lg break-words">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Help Section */}
          <motion.div
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-lg sm:text-xl text-neutral-600 mb-4">
              Still have questions?
            </p>
            <p className="text-base sm:text-lg text-neutral-700 mb-6">
              Contact us at <a href="mailto:info@itlconference.ca" className="text-primary-600 hover:text-primary-700 font-semibold underline">info@itlconference.ca</a> for more information.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


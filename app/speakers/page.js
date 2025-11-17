"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Users, Mic } from "lucide-react";

export default function SpeakersPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full mb-4 sm:mb-6"
              initial={{ scale: 1 }}
              animate={isInView ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 sm:mb-6 break-words">
              Our Speakers
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto px-2">
              Meet the distinguished professionals sharing their expertise
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 md:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-primary-100 rounded-full mb-6 sm:mb-8"
              initial={{ scale: 1 }}
              animate={isInView ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 break-words">
              Coming Soon
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto px-2">
              <p className="break-words">
                We're excited to announce our lineup of distinguished speakers for The ITL Conference '26. Our speakers include leading legal professionals, regulators, change makers, and thought leaders who are committed to supporting Internationally Trained Lawyers.
              </p>
              
              <p className="break-words">
                Stay tuned as we reveal our keynote speaker and panelists who will share invaluable insights, experiences, and perspectives on the evolving legal landscape for ITLs in Canada.
              </p>
              
              <p className="break-words font-medium text-neutral-900">
                Check back soon for the complete speaker lineup and their bios!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


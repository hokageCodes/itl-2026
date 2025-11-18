"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function SpeakersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });

  return (
    <section id="speakers" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.figure
            className="relative"
            initial={{ opacity: 1, x: 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/assets/speaker-j.jpeg"
                alt="Keynote Speaker"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl -z-10" />
          </motion.figure>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Meet Our Keynote Speaker
            </h2>
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-900 mb-8"
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hon. Justice Imran E. Kamal
              <br />
              <span className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-700">
                Superior Court of Ontario
              </span>
            </motion.div>
            <motion.a
              href="/speakers"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition shadow-lg text-lg group"
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See All Speakers
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

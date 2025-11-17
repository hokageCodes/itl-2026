"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function SponsorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  // Array of sponsor/organizer logo paths - add your logo paths here
  const organizers = [
    "/assets/logos/Logos.png",
    "/assets/logos/joy.png",
    "/assets/logos/4.png",
    "/assets/logos/anothest.png",
  ];

  return (
    <section id="sponsors" className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Conference Organizers
          </h2>
        </motion.div>

        {/* Sponsor Logos Grid - Optimized for 4 logos */}
        {organizers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center max-w-4xl mx-auto">
            {organizers.map((logo, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center w-full h-32 sm:h-48 p-4 rounded-lg"
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={logo}
                  alt={`Organizer ${index + 1}`}
                  width={200}
                  height={100}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-neutral-500 text-lg">
              Organizer logos coming soon...
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

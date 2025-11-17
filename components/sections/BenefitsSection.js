"use client";

import { Users, GraduationCap, Globe, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  const benefits = [
    {
      title: "Networking",
      icon: Users,
      description: "Connect with fellow legal professionals and a supportive community of ITLs facing similar challenges and opportunities."
    },
    {
      title: "Professional Development",
      icon: GraduationCap,
      description: "Hear from leading professionals in private practice, in-house, government agencies and experts from across all practice areas."
    },
    {
      title: "Cultural Competency",
      icon: Globe,
      description: "Understanding and navigating cultural differences in legal practice is crucial. The conference will equip you with the knowledge and skills needed to thrive in a diverse and multicultural legal environment."
    },
    {
      title: "Career Opportunities",
      icon: Briefcase,
      description: "Connect with employers and recruiters. The Conference will feature career development strategies, job search techniques, and other opportunities to differentiate yourself in the job market."
    }
  ];

  return (
    <section id="benefits" className="py-12 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Benefits of Attending
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-neutral-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent className="w-12 h-12 text-primary-600" />
                </motion.div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

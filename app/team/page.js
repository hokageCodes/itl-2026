"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Award, UserCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";

// Leadership Team
const leadershipTeam = [
  { id: 1, name: "Kenny Okunola", org: "Inaugural Conference Chair", img: "/assets/leadership/ken.webp" },
  { id: 8, name: "Rachel A. Sachs", org: "2026 Conference Chair", img: "/assets/leadership/rach.webp" },
  { id: 2, name: "Cynthia Okafor", org: "The ITL Network", img: "/assets/leadership/cyn.webp" },
  { id: 4, name: "Michael Tam", org: "ITLNCA NetworkS", img: "/assets/leadership/mike.webp" },
  { id: 5, name: "Ishita Kashyap", org: "Just One Yes (JOY) ITL Initiative", img: "/assets/leadership/ishita.webp" },
  { id: 6, name: "Jaanam Mahboobani", org: "The ITL Network", img: "/assets/leadership/jaa.jpeg" },
  { id: 7, name: "Mrunal Masurekar", org: "Just One Yes (JOY) ITL Initiative", img: "/assets/leadership/mru.webp" },
  { id: 3, name: "Dayo Ogunyemi", org: "Global Lawyers of Canada", img: "/assets/leadership/dayo.webp" },
];

// Planning Team
const planningTeam = [
  {
    id: 1,
    name: "Rachel A. Sachs",
    role: "2026 Conference Chair",
    image: "/assets/leadership/rach.webp",
  },
  {
    id: 2,
    name: "Lola Williams-Afolabi",
    role: "Programs Committee Co-Lead",
    image: "/assets/leadership/lola.webp",
  },
  {
    id: 3,
    name: "Aishwerya Kansal ",
    role: "Publicity Committee Co-Lead",
    image: "/assets/leadership/Aish.jpeg",
  },
  {
    id: 4,
    name: "Laura Alvarado ",
    role: "Publicity Committee Co-Lead",
    image: "/assets/leadership/laura.png",
  },
  {
    id: 5,
    name: "Elizabeth Joy Cortez",
    role: "Exhibition Committee Co-Lead",
    image: "/assets/leadership/eliz.png",
  },
  {
    id: 6,
    name: "Carlos Faustino ",
    role: "Exhibition Committee Co-Lead",
    image: "/assets/silho.jpeg",
  },
  {
    id: 7,
    name: "Antonio Urdaneta",
    role: "Sponsorship Committee Co-Lead",
    image: "/assets/leadership/Antonio.png",
  },
  {
    id: 8,
    name: "Chanelle Aching",
    role: "Sponsorship Committee Co-Lead",
    image: "/assets/leadership/Chanelle.png",
  },
  {
    id: 9,
    name: "Sarah Anderson ",
    role: "Programs Committee Co-Lead",
    image: "/assets/leadership/Sarah.png",
  },
  {
    id: 10,
    name: "Cassandra Morcilla",
    role: "Logistics Committee Co-Lead",
    image: "/assets/leadership/Cassandra.png",
  },
  {
    id: 11,
    name: "Sheryl Manago",
    role: "Logistics Committee Co-Lead",
    image: "/assets/leadership/Sheryl.png",
  },
  {
    id: 12,
    name: "Laura Olarte",
    role: "Registration Committee",
    image: "/assets/leadership/laura.png",
  },
  {
    id: 13,
    name: "Katherine Ann Fermo",
    role: "Gala & Impact Awards Committee Co-Lead",
    image: "/assets/silho.jpeg",
  },
  {
    id: 14,
    name: "Lotus Menezes",
    role: "Gala & Impact Awards Committee Co-Lead",
    image: "/assets/silho.jpeg",
  },
];

export default function TeamPage() {
  const bannerRef = useRef(null);
  const leadershipRef = useRef(null);
  const planningRef = useRef(null);
  const isBannerInView = useInView(bannerRef, { once: false, amount: 0.1, margin: "-100px" });
  const isLeadershipInView = useInView(leadershipRef, { once: false, amount: 0.1, margin: "-100px" });
  const isPlanningInView = useInView(planningRef, { once: false, amount: 0.1, margin: "-100px" });

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <section ref={bannerRef} className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1284&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="ITL Conference Team"
            fill
            className="object-cover"
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
            animate={isBannerInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6"
              initial={{ scale: 1 }}
              animate={isBannerInView ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 break-words">
              Our Team
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Meet the dedicated professionals behind the ITL Conference '26
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section ref={leadershipRef} className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 1, y: 0 }}
            animate={isLeadershipInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mb-4 sm:mb-6"
              initial={{ scale: 1 }}
              animate={isLeadershipInView ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4">
              Leadership Team
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              The visionaries leading the ITL Conference '26
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {leadershipTeam.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={{
                  name: member.name,
                  role: member.org,
                  image: member.img,
                }}
                index={index}
                isInView={isLeadershipInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Planning Team Section */}
      <section ref={planningRef} className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 1, y: 0 }}
            animate={isPlanningInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mb-4 sm:mb-6"
              initial={{ scale: 1 }}
              animate={isPlanningInView ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4">
              Planning Team
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              The dedicated team making the ITL Conference '26 a reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {planningTeam.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                isInView={isPlanningInView}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamMemberCard({ member, index, isInView }) {
  return (
    <motion.div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200"
      initial={{ opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 via-primary-600/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-sm sm:text-base text-neutral-600 font-medium">
          {member.role}
        </p>
      </div>

      {/* Decorative Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}


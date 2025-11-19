"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Trophy, Award, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import NominationForm from "@/components/NominationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AwardsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const awards = [
    {
      id: 1,
      title: "Community Impact Award",
      shortDescription: "Awarded to an ITL who has demonstrated exceptional dedication to serving and making a positive impact in their local community through advocacy, legal advocacy, pro bono work, or community initiatives.",
      fullDescription: "Awarded to an ITL who has demonstrated exceptional dedication to serving and making a positive impact in their local community through advocacy, legal advocacy, pro bono work, or community initiatives. This will also be awarded to an ITL who has displayed exemplary advocacy skills and commitment to justice, making a significant impact in advocating for ITLs, their clients and communities",
      icon: "/assets/plaque.png",
      winner2025: "Foot in the Door Initiative (FIDI)",
    },
    {
      id: 2,
      title: "Leadership in Legal Education Award",
      shortDescription: "Honoring an individual or institution that has shown outstanding leadership and innovation in providing educational support and resources for internationally trained lawyers.",
      fullDescription: "Honoring an individual or institution that has shown outstanding leadership and innovation in providing educational support and resources for internationally trained lawyers to integrate into the Canadian legal profession. This can also be awarded to an ITL who has made exceptional contributions to legal scholarship through their research, publications, and academic endeavors within the Canadian legal education system.",
      icon: "/assets/plaque.png",
      winner2025: "Gina Alexandris",
    },
    {
      id: 3,
      title: "Trailblazer in Technology Award",
      shortDescription: "Recognizing an ITL who has leveraged technology and innovation to advance the practice of law, improve access to justice, or enhance legal services delivery in Canada.",
      fullDescription: "Recognizing an ITL who has leveraged technology and innovation to advance the practice of law, improve access to justice, or enhance legal services delivery in Canada. This also includes groundbreaking legal solutions developed or implemented by an internationally trained lawyer or legal team to address complex challenges in the Canadian legal landscape.",
      icon: "/assets/plaque.png",
      winner2025: "Gideon Christian",
    },
    {
      id: 4,
      title: "Rising Star Award",
      shortDescription: "The Rising Star Award honors a young ITL who has demonstrated outstanding potential, leadership, legal excellence, and a commitment to justice.",
      fullDescription: "The Rising Star Award honors a young ITL who has demonstrated outstanding potential, leadership, legal excellence, and a commitment to justice. This individual is poised to make a significant impact and is seen as a future leader within the Canadian legal community.",
      icon: "/assets/plaque.png",
      winner2025: "Ilse Torres Quezada",
    },
    {
      id: 5,
      title: "Mentorship Excellence Award",
      shortDescription: "Presented to a law firm, individual or organization that has excelled in providing mentorship programs and opportunities for internationally trained lawyers.",
      fullDescription: "Presented to a law firm, individual or organization that has excelled in providing mentorship programs and opportunities for internationally trained lawyers to enhance their professional development and integration into the Canadian legal profession.",
      icon: "/assets/plaque.png",
      winner2025: "Sara Bond",
    },
    {
      id: 6,
      title: "Innovative Recruitment Award",
      shortDescription: "Awarded to a law firm that has implemented innovative and effective strategies to recruit, retain, and support internationally trained lawyers within their organization.",
      fullDescription: "Awarded to a law firm that has implemented innovative and effective strategies to recruit, retain, and support internationally trained lawyers within their organization, fostering diversity and talent acquisition.",
      icon: "/assets/plaque.png",
      winner2025: "Osuji & Smith Lawyers",
    },
    {
      id: 7,
      title: "Entrepreneurial Excellence Award",
      shortDescription: "This award honors an ITL who has demonstrated exceptional entrepreneurial spirit, innovation, and leadership in the business sector.",
      fullDescription: "This award honors an ITL who has demonstrated exceptional entrepreneurial spirit, innovation, and leadership in the business sector. Whether through founding a startup, leading a successful business venture, or driving innovation within an established company, this individual exemplifies excellence in business acumen, strategic thinking, and transformative leadership.",
      icon: "/assets/plaque.png",
      winner2025: "Douglas Zorry",
    },
    {
      id: 8,
      title: "The Nobel Award",
      shortDescription: "This flagship award of the year recognizes an outstanding ITL who has demonstrated exceptional legal skills and consistently provides outstanding legal services.",
      fullDescription: "This flagship award of the year recognizes an outstanding ITL who has demonstrated exceptional legal skills, consistently provides outstanding legal services, and is highly respected by peers and the broader Canadian legal community. The recipient exemplifies the qualities of a model ITL, excelling both in the practice of law and in their professional contributions. In addition, this ITL has shown exemplary leadership, advocacy, and dedication to advancing the interests and rights of internationally trained lawyers within the Canadian legal profession. They are celebrated for their exceptional mentorship and for being a respected and exemplary figure in the Canadian legal community",
      icon: "/assets/plaque.png",
      winner2025: "Kene Ilochonwu",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
            alt="ITL Conference Awards"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
          
          {/* Banner Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary-100/20 backdrop-blur-sm rounded-full mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Awards
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Recognizing excellence in the ITL community
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Content Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-none"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl text-center sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 sm:mb-8">
                The ITL Conference '26 Awards
              </h2>

              <div className="space-y-6 text-neutral-700 leading-relaxed text-base sm:text-lg text-center">
              <p>
                At the upcoming ITL Conference, we will recognize the exceptional achievements and contributions of internationally trained lawyers (ITLs), along with the stakeholders, community partners, and law firms that support them. These awards celebrate excellence, innovation, and leadership within the Canadian legal profession, while promoting a culture of equity, diversity, inclusion, and collaboration.
              </p>

              <p>
                We encourage ITLs, law firms, and legal professionals across Canada to engage in this prestigious recognition of talent and dedication. Below are the award categories, created to honor outstanding individuals, organizations, and initiatives that have made a significant impact on the Canadian legal landscape.
              </p>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-lg mt-8">
                <p className="text-neutral-800 leading-relaxed">
                Please note that the deadline to submit nominations is <strong>February 28, 2026</strong>. After that date, our selection committee will review all submissions, and we will contact the selected nominees directly.
                </p>
              </div>
            </div>
            </div>

            {/* Awards Grid */}
            <div className="mt-16 sm:mt-20">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-12 sm:mb-16 text-center">
                Award Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {awards.map((award, index) => {
                  const isExpanded = expandedCards[award.id];
                  const showReadMore = award.shortDescription !== award.fullDescription;
                  
                  return (
                    <motion.div
                      key={award.id}
                      className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary-300 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Top Accent Bar */}
                      <div className="h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600"></div>
                      
                      <div className="p-6 sm:p-8 flex-1 flex flex-col">
                        {/* Icon and Title */}
                        <div className="flex items-center gap-4 mb-5">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                            <Trophy className="w-8 h-8 text-primary-600" />
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold text-neutral-900 leading-tight flex-1">
                            {award.title}
                          </h4>
                        </div>
                        
                        {/* Description */}
                        <div className="flex-1">
                          <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                            {isExpanded ? award.fullDescription : award.shortDescription}
                          </p>
                          
                          {/* Read More/Less Button */}
                          {showReadMore && (
                            <button
                              onClick={() => toggleCard(award.id)}
                              className="mt-3 text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Read Less</span>
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  <span>Read More</span>
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Winners Section */}
                      {award.winner2025 && (
                        <div className="border-t border-neutral-200 bg-gradient-to-br from-primary-50 to-primary-100/50 px-6 sm:px-8 py-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-primary-600" />
                            <span className="text-xs sm:text-sm font-semibold text-primary-700 uppercase tracking-wide">
                              2025 Winner
                            </span>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-neutral-900">
                            {award.winner2025}
                          </p>
                        </div>
                      )}
                      
                      {/* Decorative bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Nominate CTA */}
            <div className="mt-16 sm:mt-20 text-center">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 sm:py-5 sm:px-10 rounded-lg transition shadow-lg text-base sm:text-lg group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                Click Here to Nominate
              </motion.button>
            </div>

            {/* Award Selection Committee Section */}
            <div className="mt-20 sm:mt-24">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-8 sm:mb-12 text-center">
                Award Selection Committee
              </h3>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-lg sm:text-xl text-neutral-600">
                  Watch this space for more details as we unveil the Award Selection Committee members!
                </p>
              </div>

              {/* Committee Profiles - Commented out for future use */}
              {/* <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src="/assets/hlna.png"
                        alt="Hina Latif"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 160px"
                      />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                      Hina Latif
                    </h4>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      VP, General Counsel & Secretary, Mercedes-Benz Financial Services Canada
                    </p>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src="/assets/kelli.png"
                        alt="Dr. Kellinde Wrightson"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 160px"
                      />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                      Dr. Kellinde Wrightson
                    </h4>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Associate Professor and Director, University of Calgary
                    </p>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center sm:col-span-2 lg:col-span-1">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src="/assets/chika.png"
                        alt="Dr. Chika Onwuekwe K.C."
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 160px"
                      />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                      Dr. Chika Onwuekwe K.C.
                    </h4>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      VP Legal, General Counsel & Corporate Secretary, Trican Well Service Ltd.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nomination Form Modal */}
      <NominationForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}


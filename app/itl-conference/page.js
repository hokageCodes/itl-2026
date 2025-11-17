"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import SponsorsSection from "@/components/sections/SponsorsSection";
import ConferenceScheduleSection from "@/components/sections/ConferenceScheduleSection";
export default function ITLConferencePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3 slides for the carousel
  const slides = [
    {
      image: "/assets/itl-26-1.webp",
      alt: "ITL Conference Slide 1"
    },
    {
      image: "/assets/itl-26-2.png",
      alt: "ITL Conference Slide 2"
    },
    {
      image: "/assets/itl-26.png",
      alt: "ITL Conference Slide 3"
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Banner Hero Section - Carousel */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        {/* Carousel Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/20" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all touch-manipulation max-w-[48px] max-h-[48px] flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all touch-manipulation max-w-[48px] max-h-[48px] flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all touch-manipulation ${
                currentIndex === index 
                  ? "bg-white w-6 sm:w-7 md:w-8" 
                  : "bg-white/50 w-1.5 sm:w-2 hover:bg-white/75 active:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Sponsors Section */}
      <SponsorsSection />

      {/* Conference Schedule Section */}
      <ConferenceScheduleSection />
    </div>
  );
}

function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* GRID: Text Left | Image Center | Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">

          {/* LEFT — TEXT */}
          <motion.div
            className="space-y-5 order-2 lg:order-1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Quote Icon */}
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
              Welcome to The ITL Conference '26
            </h2>

            {/* LEFT TEXT CONTENT */}
            <div className="space-y-4 text-neutral-700 text-base sm:text-lg leading-relaxed">
              <p>
                When the opportunity arose to take the lead on this conference, I was on the fence.
                But after considering it, I said yes. No matter where I am in my journey as a lawyer,
                I will always have been an internationally trained lawyer. My experiences as an ITL
                shaped me, my practice and my approach to lawyering. We all face unique challenges
                and we also share many commonalities. So, I said, "Yes!" to the opportunity to help
                others navigate similar journeys, and "Yes!" to making substantive, positive and
                transformational change to the legal community.
              </p>

              <p>
                In my own journey, I encountered barrier after barrier with a long break on my resume
                between law school and qualifying in Canada, minimal supports available while I was
                an NCA, and then the struggle of licensing with a foreign degree. But I kept taking
                risks when I launched my own law firm with very little capital in my pocket right
                after my call.
              </p>

              <p>
                Not one of us have taken an easy path as ITLs. Instead, we're learning new systems
                and new rules while unlearning old assumptions and cultural norms, rebuilding our
                professional identities, and navigating networks that many Canadian-trained lawyers
                take for granted.
              </p>
            </div>
          </motion.div>

          {/* CENTER — IMAGE */}
          <motion.div
            className="relative h-full w-full order-1 lg:order-2 flex flex-col"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/rach.webp"
                alt="ITL Conference 2026"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-primary-800/20" />
            </div>

            {/* Decorative blobs */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-600/10 rounded-full blur-3xl -z-10 hidden md:block pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-400/10 rounded-full blur-2xl -z-10 hidden md:block pointer-events-none" />

            {/* Signature under image */}
            <div className="pt-6 mt-4 text-center lg:text-left">
              <p className="text-lg sm:text-xl font-bold text-neutral-900">Rachel Sachs</p>
              <p className="text-sm sm:text-base font-semibold text-neutral-700">2026 Conference Chair</p>
            </div>
          </motion.div>

          {/* RIGHT — TEXT */}
          <motion.div
            className="space-y-5 order-3 lg:order-3"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* RIGHT TEXT CONTENT */}
            <div className="space-y-4 text-neutral-700 text-base sm:text-lg leading-relaxed">
              <p>
                We. Take. Risks. ITLs take risks. Leading this conference is an example of one such risk,
                but I believe that to succeed, we need to support one another, share our experiences
                and educate each other on the tools that will get us beyond the horizons.
              </p>

              <p className="font-medium">
                "From Hurdles to Horizons: The Evolving ITL Landscape" reflects where we're going.
                The horizon is a moving target, allowing us to constantly evolve and excel as
                practitioners and leaders. Our programming tackles the real questions that we and
                our clients face daily: how do we build systemic equality from an ITL lens; how do
                we uphold the rule of law in uncertain times; how do we develop psychological safety;
                and how do we position ourselves as leaders and bear the responsibility that comes
                with it.
              </p>

              <p>
                Whether you are pre-call, newly licensed, years into practice or on the bench, I'm
                looking forward to the critical conversations, connections, and collective momentum
                this conference will initiate. I look forward to transforming the legal profession
                beyond the horizon together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



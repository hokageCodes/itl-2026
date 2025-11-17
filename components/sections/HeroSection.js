"use client";
import React, { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  // Smooth infinite scroll using requestAnimationFrame
  useEffect(() => {
    let position = 0;
    
    const animate = () => {
      if (scrollRef.current) {
        position -= 1.5; // Adjust speed here (higher = faster)
        
        // Get the width of one text block to know when to reset
        const textBlock = scrollRef.current.firstChild;
        if (textBlock) {
          const blockWidth = textBlock.offsetWidth;
          // Reset when we've scrolled past one full block
          if (Math.abs(position) >= blockWidth) {
            position = 0;
          }
        }
        
        scrollRef.current.style.transform = `translateX(${position}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full text-white font-sans overflow-x-hidden h-[90vh]">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 pointer-events-none h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.75) contrast(1.1)", opacity: 1 }}
          aria-hidden="true"
        >
          <source src="/assets/itl-bg.mp4" type="video/mp4" />
        </video>

        {/* VIGNETTE */}
        <div className="absolute inset-0 md:bg-gradient-to-b md:from-black/5 md:via-black/10 md:to-black/25 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
      </div>

      {/* CENTERED CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 pb-24 sm:pb-28 md:pb-36 lg:pb-40">
        <div className="text-center max-w-3xl w-full bg-black/50 border border-white/10 rounded-xl px-6 sm:px-8 md:px-12 py-10 sm:py-14 shadow-2xl mx-auto">
          <p className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest text-primary-300 mb-6 sm:mb-8 font-semibold">THE ITL CONFERENCE '26</p>
          
          {/* MOBILE COUNTDOWN - where H1 was */}
          <div className="sm:hidden mb-6">
            <CountdownStopwatch className="pointer-events-none flex justify-center" mobileVersion />
          </div>
          
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">April 23 - 25, 2026 <br /> Marriot Downtown -Toronto, Ontario</p>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
            <a
              href="/register"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 sm:py-5 sm:px-10 rounded-lg transition shadow-lg text-base sm:text-lg"
            >
              Register Now
            </a>
            <a
              href="#sponsor"
              className="inline-block border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 sm:py-5 sm:px-10 rounded-lg transition shadow-lg text-base sm:text-lg"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </div>

      {/* HANGING STOPWATCH COUNTDOWN (right side - desktop only) */}
      <CountdownStopwatch className="pointer-events-none absolute right-6 sm:right-10 md:right-16 top-6 sm:top-8 md:top-10 z-40 hidden sm:flex" />

      {/* INFINITE SCROLLING TEXT SLIDER - Fixed to hero bottom */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none overflow-hidden w-full pb-3 sm:pb-4 md:pb-6 lg:pb-8">
        <div 
          ref={scrollRef}
          className="flex whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {/* Content repeats 4 times for seamless infinite loop */}
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className="text-[clamp(4.5rem,18vw,14rem)] sm:text-[clamp(3.5rem,15vw,12rem)] md:text-[clamp(5rem,18vw,12rem)] lg:text-[clamp(6rem,20vw,12rem)] font-light leading-none tracking-tight px-4 sm:px-6 md:px-8 inline-flex items-center gap-6 sm:gap-8 md:gap-12 flex-shrink-0 text-white drop-shadow-lg"
            >
              <span>From Hurdles to Horizons:</span>
              <span>—</span>
              <span>The Evolving ITL Landscape.</span>
            </div>
          ))}
        </div>
      </div>

      {/* Local keyframes for swing animation */}
      <style jsx>{`
        @keyframes itl-swing {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(4deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-4deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

function CountdownStopwatch({ className = "", mobileVersion = false }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date("2026-04-23T00:00:00").getTime();
    const update = () => {
      const now = Date.now();
      const distance = Math.max(targetTime - now, 0);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (mobileVersion) {
    return (
      <div className={`${className} flex flex-col items-center`}>
        <div className="relative w-28 h-28 rounded-full border-2 border-white/60 bg-black/30 backdrop-blur-md shadow-xl flex items-center justify-center">
          <div className="absolute inset-3 rounded-full border border-white/30" />
          <div className="text-center leading-tight">
            <div className="text-2xl font-light">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/70">Days</div>
            <div className="mt-1 text-xs font-light">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
          <div className="absolute -top-2 right-3 w-2 h-2 rounded-full bg-white/70" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} flex flex-col items-center`}>
      <div className="w-px h-28 sm:h-36 md:h-44 bg-white/40" />
      <div className="mt-3 sm:mt-4 md:mt-5 origin-top animate-[itl-swing_5s_ease-in-out_infinite]">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-2 border-white/60 bg-black/30 backdrop-blur-md shadow-xl flex items-center justify-center">
          <div className="absolute inset-3 rounded-full border border-white/30" />
          <div className="text-center leading-tight">
            <div className="text-xl sm:text-3xl md:text-4xl font-light">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-white/70">Days</div>
            <div className="mt-1 text-xs sm:text-sm md:text-base font-light">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
          <div className="absolute -top-2 right-4 w-2.5 h-2.5 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}
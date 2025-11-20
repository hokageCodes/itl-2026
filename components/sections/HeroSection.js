"use client";
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Hero = () => {
  const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDate = new Date('April 23, 2026 00:00:00').getTime();
      const currentTime = new Date().getTime();
      const timeLeft = eventDate - currentTime;

      setTimer({
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-transparent text-[#EFE1D1] min-h-screen">
      {/* Video Background */}
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

      {/* Content Container */}
      <div className="absolute left-0 w-full flex z-10 px-4 py-12 sm:px-6 sm:py-16 md:p-4 top-1/2 -translate-y-1/2 items-center justify-center md:top-[8%] md:translate-y-0 md:items-start md:justify-start">
        {/* Text Container */}
        <div className="bg-black/60 p-6 sm:p-8 md:p-8 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full max-w-[36rem] mx-auto flex flex-col items-center justify-center mt-0 text-center md:text-left md:items-start md:mx-4">
          <h1 className="hero-deco text-5xl sm:text-6xl md:text-5xl lg:text-[50px] font-black mb-4 sm:mb-5 md:mb-4 break-words">THE ITL CONFERENCE 26</h1>
          <p className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 md:mb-4 leading-tight">From Hurdles to Horizons: The Evolving ITL Landscape</p>
          <p className="text-lg sm:text-xl md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-4">April 23 - 25, 2026</p>
          <p className="text-lg sm:text-xl md:text-lg lg:text-xl mb-5 sm:mb-6 md:mb-6">Marriot Downtown - Toronto, Ontario</p>
          
          {/* Countdown Container */}
          <div className="flex justify-center items-center mb-5 sm:mb-6 md:mb-6 flex-nowrap gap-3 sm:gap-4 md:gap-4 md:justify-start w-full overflow-x-auto">
            {Object.entries(timer).map(([unit, value]) => (
              <div key={unit} className="text-center flex flex-col items-center flex-shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-20 md:h-20" style={{ width: '4.5rem', height: '4.5rem' }}>
                  <CircularProgressbar
                    value={value}
                    maxValue={unit === 'days' ? 365 : 60}
                    text={`${value}`}
                    styles={buildStyles({
                      pathColor: `rgba(62, 152, 199, ${value / 100})`,
                      textColor: '#fff',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                </div>
                <p className="text-sm sm:text-base md:text-base mt-2 capitalize whitespace-nowrap">{unit}</p>
              </div>
            ))}
          </div>

          {/* Buttons Container */}
          <div className="flex flex-col w-full sm:flex-row sm:justify-center md:justify-start items-center gap-4 sm:gap-4 md:gap-0 mt-2 sm:mt-4 md:mt-6">
            <a
              href="/registration"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-8 sm:py-3 sm:px-6 text-base sm:text-base rounded-lg transition-colors duration-300 w-full sm:w-auto text-center md:my-0 md:mx-2"
            >
              Register Now
            </a>
            <a
              href="/our-sponsors"
              className="border-2 border-white text-white hover:bg-white/10 font-bold py-3.5 px-8 sm:py-3 sm:px-6 text-base sm:text-base rounded-lg transition-colors duration-300 w-full sm:w-auto text-center md:my-0 md:mx-2"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
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
      <div className="absolute left-0 w-full flex z-10 p-16 top-1/3 -translate-y-1/2 items-center justify-center md:p-4 md:top-[8%] md:translate-y-0 md:items-start md:justify-start">
        {/* Text Container */}
        <div className="bg-black/60 p-8 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)] max-w-[36rem] mx-4 flex flex-col items-center mt-0 text-center md:text-left md:items-start">
          <h1 className="hero-deco text-[45px] font-black mb-4 whitespace-nowrap">THE ITL CONFERENCE 26</h1>
          <p className="text-2xl font-bold mb-4">From Hurdles to Horizons: The Evolving ITL Landscape</p>
          <p className="text-lg mb-4">April 23 - 25, 2026</p>
          <p className="text-lg mb-4">Marriot Downtown - Toronto, Ontario</p>
          
          {/* Countdown Container */}
          <div className="flex justify-center mb-4 flex-wrap md:flex-nowrap">
            {Object.entries(timer).map(([unit, value]) => (
              <div key={unit} className="text-center mr-0 mb-2 md:mr-4 md:mb-0">
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
                <p>{unit}</p>
              </div>
            ))}
          </div>

          {/* Buttons Container */}
          <div className="flex flex-col w-full items-center md:flex-row md:justify-center md:items-start mt-6">
            <a
              href="/registration"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 my-2 md:my-0 md:mx-2"
            >
              Register Now
            </a>
            <a
              href="/our-sponsors"
              className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg transition-colors duration-300 my-2 md:my-0 md:mx-2"
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
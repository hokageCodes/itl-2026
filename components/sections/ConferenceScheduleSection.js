"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronDown, Download } from "lucide-react";

export default function ConferenceScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  const [openDays, setOpenDays] = useState({});

  const toggleDay = (dayIndex) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayIndex]: !prev[dayIndex],
    }));
  };

  // Conference schedule
  const schedule = [
    {
      day: "Day 1 - Thursday, April 23, 2026",
      events: [
        {
          time: "TBD",
          title: "Welcome Reception",
          location: "TBD",
          type: "Networking",
        },
      ],
    },
    {
      day: "Day 2 - Friday, April 24, 2026",
      events: [
        {
          time: "9:00 AM - 9:20 AM",
          title: "Welcome & Opening Remarks",
          location: "Grand Ballroom",
          type: "Keynote",
        },
        {
          time: "9:20 AM - 10:40 AM",
          title: "Charting Beyond the Horizons: Unlearning, Relearning and the ITL Role in building Systemic Equity",
          location: "Grand Ballroom",
          type: "Keynote",
        },
        {
          time: "10:40 AM - 12:00 PM",
          title: "Adapting our Defence: Protecting the Rule of Law in a Shifting Landscape",
          location: "Grand Ballroom",
          type: "Panel",
        },
        {
          time: "12:00 PM - 1:30 PM",
          title: "Lunch",
          location: "Dining Hall",
          type: "Networking",
        },
        {
          time: "1:30 PM - 2:30 PM",
          title: "Breakout Sessions 1",
          location: "Workshop Rooms",
          type: "Workshop",
          breakoutSessions: [
            "Strategic Pivots: Unconventional Careers and Innovative Pathways in Law",
            "The Competitive Tech Advantage: Integrating Technology and AI to Recalibrate Your Practice for Success",
            "Reputation Capital: Strategic Development of Professional Influence Through Branding",
          ],
        },
        {
          time: "2:30 PM - 3:30 PM",
          title: "Breakout Sessions 2",
          location: "Workshop Rooms",
          type: "Workshop",
          breakoutSessions: [
            "Advocacy Spotlight: Powering the ITL Future",
            "Connecting Contextually: Mastering the Art of Canadian Networking",
            "Thought Leadership: Leveraging Your Voice to Build Authority Through Writing",
          ],
        },
        {
          time: "3:30 PM - 4:00 PM",
          title: "Networking Break",
          location: "Exhibition Hall",
          type: "Networking",
        },
        {
          time: "4:00 PM - 5:15 PM",
          title: "The Resilient Advocate: A Toolkit for Cognitive Strength, Civility, and Sustained Professional Excellence",
          location: "Grand Ballroom",
          type: "CPD",
        },
        {
          time: "5:15 PM - 5:40 PM",
          title: "Closing Remarks",
          location: "Grand Ballroom",
          type: "Keynote",
        },
      ],
    },
    {
      day: "Day 3 - Saturday, April 25, 2026",
      events: [
        {
          time: "TBD",
          title: "The Impact Gala & Awards",
          location: "TBD",
          type: "Gala",
        },
      ],
    },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "Keynote":
        return "bg-primary-600 text-white";
      case "Panel":
        return "bg-blue-100 text-blue-800";
      case "Workshop":
        return "bg-green-100 text-green-800";
      case "CPD":
        return "bg-purple-100 text-purple-800";
      case "Networking":
        return "bg-orange-100 text-orange-800";
      case "Gala":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  return (
    <section id="schedule" className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mb-4 sm:mb-6"
            initial={{ scale: 1 }}
            animate={isInView ? { scale: 1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 break-words">
            Conference Schedule
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 px-2 mb-6 sm:mb-8">
            Inspiring sessions, workshops, and networking opportunities
          </p>
          <motion.a
            href="/assets/ITLC2026 Program Schedule.pdf"
            download
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition shadow-lg text-base sm:text-lg"
            initial={{ opacity: 1, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Download Conference Schedule
          </motion.a>
        </motion.div>

        {/* Schedule Days - Accordions */}
        <div className="space-y-4 sm:space-y-6">
          {schedule.map((daySchedule, dayIndex) => {
            const isOpen = openDays[dayIndex];
            return (
              <motion.div
                key={dayIndex}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              >
                {/* Day Header - Clickable */}
                <button
                  onClick={() => toggleDay(dayIndex)}
                  className="w-full bg-primary-600 text-white px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                    {daySchedule.day}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.div>
                </button>

                {/* Events List - Collapsible */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="divide-y divide-neutral-200">
                    {daySchedule.events.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 hover:bg-neutral-50 transition-colors"
                        initial={{ opacity: 1, x: 0 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (dayIndex * 0.1) + (eventIndex * 0.05) }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          {/* Time */}
                          <div className="flex items-center gap-2 sm:w-48 flex-shrink-0">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 flex-shrink-0" />
                            <span className="text-sm sm:text-base font-semibold text-neutral-700">
                              {event.time}
                            </span>
                          </div>

                          {/* Event Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 mb-2">
                              {event.title}
                            </h4>
                            {event.breakoutSessions && (
                              <div className="mb-3 mt-3 pl-4 border-l-2 border-primary-200">
                                <ul className="space-y-2">
                                  {event.breakoutSessions.map((session, idx) => (
                                    <li key={idx} className="text-sm sm:text-base text-neutral-700 flex items-start gap-2">
                                      <span className="text-primary-600 font-bold mt-1 flex-shrink-0">•</span>
                                      <span>{session}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm sm:text-base text-neutral-600">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm sm:text-base text-neutral-600 italic">
            * Schedule is subject to change. Please check back for updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


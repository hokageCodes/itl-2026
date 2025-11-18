"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Ticket, Calendar, Users, Loader2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ticketTypes = [
  {
    id: "student",
    name: "Student / NCA Candidate",
    icon: "🎓",
    conference: { regular: 110, earlyBird: 99 },
    gala: { regular: 105, earlyBird: 95 },
    conferenceGala: { regular: 180, earlyBird: 140 },
  },
  {
    id: "licensing",
    name: "Licensing Candidate / Articling Student Law Practice Program",
    icon: "📜",
    conference: { regular: 145, earlyBird: 130 },
    gala: { regular: 145, earlyBird: 130 },
    conferenceGala: { regular: 240, earlyBird: 200 },
  },
  {
    id: "government",
    name: "Government / Non-for-Profit / Sole Practitioner",
    icon: "🏛️",
    conference: { regular: 190, earlyBird: 170 },
    gala: { regular: 215, earlyBird: 160 },
    conferenceGala: { regular: 330, earlyBird: 280 },
  },
  {
    id: "private",
    name: "Private Practice / In-House (Non-sole Practitioner)",
    icon: "💼",
    conference: { regular: 300, earlyBird: 270 },
    gala: { regular: 300, earlyBird: 270 },
    conferenceGala: { regular: 490, earlyBird: 420 },
  },
  {
    id: "nonlawyer",
    name: "Non-lawyer",
    icon: "👤",
    conference: { regular: 300, earlyBird: 270 },
    gala: { regular: 300, earlyBird: 270 },
    conferenceGala: { regular: 490, earlyBird: 420 },
  },
];

const canadianProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  location: Yup.string()
    .required("Please select your province/territory"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
};

function RegistrationModal({ isOpen, onClose, ticketType, eventType, price }) {
  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          ticketType: `${ticketType} - ${eventType}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit registration");
      }

      toast.success("Registration submitted successfully! We'll be in touch soon.");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error(error.message || "Failed to submit registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-xl font-bold text-neutral-900">Registration</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 space-y-3">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Ticket Type</p>
              <p className="text-lg font-semibold text-neutral-900">{ticketType}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Event</p>
              <p className="text-lg font-semibold text-neutral-900">{eventType}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Price</p>
              <p className="text-2xl font-bold text-primary-600">${price}</p>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-neutral-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-neutral-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                      errors.phone && touched.phone
                        ? "border-red-500"
                        : "border-neutral-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Province/Territory <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="location"
                    name="location"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                      errors.location && touched.location
                        ? "border-red-500"
                        : "border-neutral-300"
                    }`}
                  >
                    <option value="">Select your province/territory</option>
                    {canadianProvinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  const bannerRef = useRef(null);
  const isBannerInView = useInView(bannerRef, { once: false, amount: 0.1, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    ticketType: "",
    eventType: "",
    price: 0,
  });

  // Eventzilla registration link
  const eventzillaUrl = "https://www.eventzilla.net/e/itl-conference-amp-gala-2026-2138682549";

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRegisterClick = (ticketType, eventType, price) => {
    if (isMobile) {
      // Open modal on mobile
      setModalState({
        isOpen: true,
        ticketType,
        eventType,
        price,
      });
    } else {
      // Open Eventzilla in new tab on desktop
      window.open(eventzillaUrl, "_blank", "noopener,noreferrer");
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      ticketType: "",
      eventType: "",
      price: 0,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Banner Section */}
        <section ref={bannerRef} className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Register for ITL Conference"
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
                <Ticket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 break-words">
                Register for ITL Conference '26
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Join us in Toronto, Ontario from April 23-25, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Header Section Below Banner */}
        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full mb-4 sm:mb-6">
                <Ticket className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 sm:mb-6 break-words">
                BUY TICKETS
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
                Be sure to follow us on all social media channels to stay up to date on ticket sales and all other event announcements. Early bird ticket sales are currently available. Regular ticket pricing will apply after the early bird period ends.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
          <div className="space-y-6">
            {ticketTypes.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Ticket Type Header */}
                <div className="px-6 sm:px-8 py-4 border-b border-neutral-200 bg-neutral-50">
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">
                    {ticket.name}
                  </h3>
                </div>

                {/* Pricing Options */}
                <div className="p-6 sm:p-8">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Conference */}
                    <div className="border border-neutral-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all">
                      <div className="mb-4">
                        <h4 className="font-semibold text-base text-neutral-900 mb-3">Conference</h4>
                        <div className="space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Early Bird</span>
                            <span className="text-xl font-bold text-neutral-900">
                              ${ticket.conference.earlyBird}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between pt-1 border-t border-neutral-100">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Regular</span>
                            <span className="text-sm font-medium text-neutral-400 line-through">
                              ${ticket.conference.regular}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRegisterClick(ticket.name, "Conference (Early Bird)", ticket.conference.earlyBird)
                        }
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded-md transition text-sm"
                      >
                        Register
                      </button>
                    </div>

                    {/* Gala */}
                    <div className="border border-neutral-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all">
                      <div className="mb-4">
                        <h4 className="font-semibold text-base text-neutral-900 mb-3">Gala</h4>
                        <div className="space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Early Bird</span>
                            <span className="text-xl font-bold text-neutral-900">
                              ${ticket.gala.earlyBird}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between pt-1 border-t border-neutral-100">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Regular</span>
                            <span className="text-sm font-medium text-neutral-400 line-through">
                              ${ticket.gala.regular}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRegisterClick(ticket.name, "Gala (Early Bird)", ticket.gala.earlyBird)
                        }
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded-md transition text-sm"
                      >
                        Register
                      </button>
                    </div>

                    {/* Conference & Gala */}
                    <div className="border-2 border-primary-600 rounded-lg p-5 hover:shadow-sm transition-all relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          Best Value
                        </span>
                      </div>
                      <div className="mb-4 mt-2">
                        <h4 className="font-semibold text-base text-neutral-900 mb-3">Conference & Gala</h4>
                        <div className="space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Early Bird</span>
                            <span className="text-xl font-bold text-primary-600">
                              ${ticket.conferenceGala.earlyBird}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between pt-1 border-t border-neutral-100">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide">Regular</span>
                            <span className="text-sm font-medium text-neutral-400 line-through">
                              ${ticket.conferenceGala.regular}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRegisterClick(
                            ticket.name,
                            "Conference & Gala (Early Bird)",
                            ticket.conferenceGala.earlyBird
                          )
                        }
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-md transition text-sm"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-neutral-600">
              * The early bird registration period will conclude on February 28, 2026, or upon the full allocation of early bird registrations, whichever occurs first. Regular conference rates will apply following the close of the early bird period.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal - Only for mobile */}
      <RegistrationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        ticketType={modalState.ticketType}
        eventType={modalState.eventType}
        price={modalState.price}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

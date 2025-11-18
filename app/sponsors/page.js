"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Handshake, Download, FileText, Mail } from "lucide-react";
import Image from "next/image";

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

const sponsorshipLevels = [
  "Title Sponsor",
  "Platinum Sponsor",
  "Diamond Sponsor",
  "Gold Sponsor",
  "Session Sponsor",
  "Award Sponsor",
  "Exhibition Sponsor",
  "Gala Table Sponsor",
];

// Yup validation schema
const validationSchema = Yup.object().shape({
  organizationName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must be less than 200 characters")
    .required("Name of Organization / Individual is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  location: Yup.string()
    .required("Please select your province/territory"),
  sponsorshipLevel: Yup.string()
    .required("Please select a sponsorship level"),
  message: Yup.string()
    .max(1000, "Message must be less than 1000 characters"),
});

const initialValues = {
  organizationName: "",
  email: "",
  phone: "",
  location: "",
  sponsorshipLevel: "",
  message: "",
};

export default function SponsorsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden bg-white">
        {/* Banner Section */}
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/assets/sponsor.jpg"
              alt="ITL Conference Sponsors"
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
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6"
                initial={{ scale: 1 }}
                animate={isInView ? { scale: 1 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Handshake className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 break-words">
                Meet Our Sponsors
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white" ref={ref}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4 text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed text-center">
                <p className="break-words">
                  We are excited to invite you to partner with us for the ITL Conference '26! We offer a variety of sponsorship options, each thoughtfully designed to provide maximum exposure and benefits to our partners.
                </p>
                
                <p className="break-words">
                  Whether you aim to make a significant impact as a Title Sponsor or engage as a Session Sponsor, we have options to suit different levels of commitment and visibility.
                </p>
                
                <p className="break-words">
                  For inquiries or to discuss any sponsorship opportunities, please contact us directly at: <a href="mailto:info@itlconference.ca" className="text-primary-600 hover:text-primary-700 font-semibold underline">info@itlconference.ca</a>.
                </p>
                
                <p className="break-words">
                  Alternatively, you can download our sponsorship package below.
                </p>
                
                <p className="break-words font-medium text-neutral-900">
                  To view our complete package in English and French, click the links below.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 justify-center">
                <motion.a
                  href="/assets/Sponsorship Package_EN_2026_Final.pdf"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 sm:py-5 sm:px-8 rounded-lg transition shadow-lg text-base sm:text-lg group"
                  initial={{ opacity: 1, y: 0 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Sponsorship Package (English)</span>
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                </motion.a>
                
                <motion.a
                  href="/assets/Sponsorship Package_2026_FR_FINAL.pdf"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 sm:py-5 sm:px-8 rounded-lg transition shadow-lg text-base sm:text-lg group"
                  initial={{ opacity: 1, y: 0 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Sponsorship Package (French)</span>
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Become a Sponsor Form Section - Split Layout */}
        <section className="min-h-screen flex bg-white">
          {/* Left Side - Image Background */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sponsor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/60" />
            </div>
            <div className="relative z-10 h-full flex items-center justify-center p-12">
              <div className="text-white">
                <h2 className="text-5xl font-bold mb-6">Become a Sponsor</h2>
                <p className="text-xl leading-relaxed mb-4">
                  Interested in sponsoring the ITL Conference? Please submit your details and someone on our team will reach out with more details.
                </p>
                <p className="text-lg leading-relaxed">
                  To receive a copy of the sponsorship package, email <a href="mailto:info@itlconference.ca" className="text-primary-300 hover:text-primary-200 font-semibold underline">info@itlconference.ca</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 flex items-start justify-center bg-white px-8 pt-6 pb-12 sm:px-12 sm:pt-8">
            <div className="w-full max-w-md">
              <div className="lg:hidden mb-8 text-center">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">Become a Sponsor</h2>
                <p className="text-neutral-600 mb-2">
                  Interested in sponsoring the ITL Conference? Please submit your details and someone on our team will reach out with more details.
                </p>
                <p className="text-neutral-600">
                  To receive a copy of the sponsorship package, email <a href="mailto:info@itlconference.ca" className="text-primary-600 hover:text-primary-700 font-semibold underline">info@itlconference.ca</a>
                </p>
              </div>

              <SponsorForm />
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
}

function SponsorForm() {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('/api/sponsors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you! Your sponsorship inquiry has been submitted successfully.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        resetForm();
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          {/* Name of Organization / Individual */}
          <div>
            <label htmlFor="organizationName" className="block text-sm font-semibold text-neutral-700 mb-2">
              Name of Organization / Individual <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              id="organizationName"
              name="organizationName"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                errors.organizationName && touched.organizationName
                  ? 'border-red-500'
                  : 'border-neutral-300'
              }`}
              placeholder="Enter organization or individual name"
            />
            <ErrorMessage name="organizationName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                errors.email && touched.email
                  ? 'border-red-500'
                  : 'border-neutral-300'
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
                  ? 'border-red-500'
                  : 'border-neutral-300'
              }`}
              placeholder="Enter your phone number"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-neutral-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="location"
              name="location"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                errors.location && touched.location
                  ? 'border-red-500'
                  : 'border-neutral-300'
              }`}
            >
              <option value="">Select province or territory</option>
              {canadianProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </Field>
            <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Sponsorship Level */}
          <div>
            <label htmlFor="sponsorshipLevel" className="block text-sm font-semibold text-neutral-700 mb-2">
              Select the level of sponsorship you are interested in <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="sponsorshipLevel"
              name="sponsorshipLevel"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                errors.sponsorshipLevel && touched.sponsorshipLevel
                  ? 'border-red-500'
                  : 'border-neutral-300'
              }`}
            >
              <option value="">Select sponsorship level</option>
              {sponsorshipLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Field>
            <ErrorMessage name="sponsorshipLevel" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
              Message
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none ${
                errors.message && touched.message
                  ? 'border-red-500'
                  : 'border-neutral-300'
              }`}
              placeholder="Tell us about your interest in sponsoring..."
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition shadow-lg text-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

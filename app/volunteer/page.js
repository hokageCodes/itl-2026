"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const committees = [
  "Programs",
  "Sponsorship",
  "Awards",
  "Registration",
  "Logistics",
  "Exhibition",
  "Publicity",
];

// Yup validation schema
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
  committee: Yup.string()
    .required("Please select a committee"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  committee: "",
};

export default function VolunteerPage() {
  // COMMENTED OUT: Volunteer form submission disabled
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    toast.error('Volunteer applications are currently disabled.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setSubmitting(false);
    return;
    
    /* COMMENTED OUT - Original functionality
    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you! Your volunteer application has been submitted successfully.', {
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
    */
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Side - Image Background */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1461532257246-777de18cd58b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Volunteer"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/60" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center p-12">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-6">Volunteer With Us</h1>
              <p className="text-xl leading-relaxed">
                Join our volunteer team to make a significant impact and be a part of history. Volunteering gives you the opportunity to contribute, learn, and connect with fellow ITLs at the conference.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center bg-white px-8 pt-6 pb-12 sm:px-12 sm:pt-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">Join Us as a Volunteer</h1>
              <p className="text-neutral-600">
                Be part of making the ITL Conference '26 a success.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Name *
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                        errors.name && touched.name
                          ? 'border-red-500'
                          : 'border-neutral-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Email *
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
                      Phone *
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

                  {/* Location Dropdown */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Location (Province/Territory) *
                    </label>
                    <Field
                      as="select"
                      id="location"
                      name="location"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white ${
                        errors.location && touched.location
                          ? 'border-red-500'
                          : 'border-neutral-300'
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

                  {/* Committee Dropdown */}
                  <div>
                    <label htmlFor="committee" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Committee *
                    </label>
                    <Field
                      as="select"
                      id="committee"
                      name="committee"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white ${
                        errors.committee && touched.committee
                          ? 'border-red-500'
                          : 'border-neutral-300'
                      }`}
                    >
                      <option value="">Select a committee</option>
                      {committees.map((committee) => (
                        <option key={committee} value={committee}>
                          {committee}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="committee" component="div" className="text-red-500 text-sm mt-1" />
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
                      'Submit Application'
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

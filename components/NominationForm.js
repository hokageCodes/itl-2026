"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { X, ChevronRight, ChevronLeft, Upload, Loader2 } from "lucide-react";

const formSteps = [
  {
    title: "Nominator's Information",
    fields: [
      { name: "nominatorName", label: "Nominator's Name", type: "text", required: true },
      { name: "nominatorPhone", label: "Nominator's Telephone Number", type: "tel", required: true },
      { name: "nominatorEmail", label: "Nominator's Email", type: "email", required: true },
    ],
  },
  {
    title: "Nominee's Information",
    fields: [
      { name: "nomineeName", label: "Nominee's Name", type: "text", required: true },
      { name: "nomineeEmail", label: "Nominee's Email", type: "email", required: true },
    ],
  },
  {
    title: "Nomination Details",
    fields: [
      { name: "category", label: "Nomination Category", type: "select", required: true },
      { name: "reasons", label: "Detailed Reasons for Nominating", type: "textarea", required: true },
      { name: "supportingLinks", label: "Supporting Links (optional)", type: "text", required: false },
    ],
  },
];

const nominationCategories = [
  "Diversity Champion",
  "Community Impact Award",
  "Leadership in Legal Education Award",
  "Trailblazer in Technology Award",
  "Rising Star Award",
  "Mentorship Excellence Award",
  "Innovative Recruitment Award",
  "Entrepreneurial Excellence Award",
  "The Nobel Award",
];

// Validation schema
const validationSchema = Yup.object().shape({
  nominatorName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Nominator's name is required"),
  nominatorPhone: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  nominatorEmail: Yup.string()
    .email("Invalid email address")
    .required("Nominator's email is required"),
  nomineeName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Nominee's name is required"),
  nomineeEmail: Yup.string()
    .email("Invalid email address")
    .required("Nominee's email is required"),
  category: Yup.string()
    .required("Nomination category is required"),
  reasons: Yup.string()
    .min(50, "Please provide at least 50 characters explaining your reasons")
    .required("Detailed reasons are required"),
  supportingLinks: Yup.string()
    .url("Please enter a valid URL")
    .nullable(),
});

const initialValues = {
  nominatorName: "",
  nominatorPhone: "",
  nominatorEmail: "",
  nomineeName: "",
  nomineeEmail: "",
  category: "",
  reasons: "",
  supportingLinks: "",
  supportingDocument: null,
};

export default function NominationForm({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      toast.success("File selected successfully");
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "supportingDocument" && values[key]) {
          formData.append(key, values[key]);
        }
      });

      if (file) {
        formData.append("supportingDocument", file);
      }

      const response = await fetch("/api/nominations", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit nomination");
      }

      toast.success("Nomination submitted successfully! We'll be in touch soon.");
      resetForm();
      setFile(null);
      setCurrentStep(0);
      onClose();
    } catch (error) {
      console.error("Error submitting nomination:", error);
      toast.error(error.message || "Failed to submit nomination. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Nomination Form
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Step {currentStep + 1} of {formSteps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-neutral-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
          <div className="flex gap-2">
            {formSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-primary-600" : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6">
                    {formSteps[currentStep].title}
                  </h3>

                  <div className="space-y-5">
                    {formSteps[currentStep].fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        {field.type === "select" ? (
                          <Field
                            as="select"
                            name={field.name}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                              errors[field.name] && touched[field.name]
                                ? "border-red-500"
                                : "border-neutral-300"
                            }`}
                          >
                            <option value="">Select a category</option>
                            {nominationCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </Field>
                        ) : field.type === "textarea" ? (
                          <Field
                            as="textarea"
                            name={field.name}
                            rows={6}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                              errors[field.name] && touched[field.name]
                                ? "border-red-500"
                                : "border-neutral-300"
                            }`}
                          />
                        ) : (
                          <Field
                            type={field.type}
                            name={field.name}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                              errors[field.name] && touched[field.name]
                                ? "border-red-500"
                                : "border-neutral-300"
                            }`}
                          />
                        )}

                        <ErrorMessage
                          name={field.name}
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    ))}

                    {/* File Upload - Only on last step */}
                    {currentStep === formSteps.length - 1 && (
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Supporting Document (optional)
                        </label>
                        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                          <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                            <span className="text-sm text-neutral-600">
                              {file ? file.name : "Click to upload or drag and drop"}
                            </span>
                            <span className="text-xs text-neutral-500 mt-1">
                              PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      currentStep === 0
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                        : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  {currentStep < formSteps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className={`flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors ${
                        loading || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading || isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Nomination"
                      )}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";

const ComingSoon = ({ title = "Coming Soon", message, backLink = "/", backText = "Go Back Home" }) => {
  return (
    <section className="coming-soon-section min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-4 sm:mb-6">
          {title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-10 leading-relaxed">
          {message}
        </p>
        <Link
          href={backLink}
          className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-primary-600 text-white rounded-lg font-semibold transition duration-300 hover:bg-primary-700 shadow-lg text-base sm:text-lg"
        >
          {backText}
        </Link>
      </div>
    </section>
  );
};

export default ComingSoon;


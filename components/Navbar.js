"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMenu = [
    {
      label: "Participation",
      key: "participation",
      items: [
        { label: "Register", href: "/register" },
        { label: "Speakers", href: "/speakers" },
        { label: "Sponsors", href: "/sponsors" },
      ],
    },
    {
      label: "Info",
      key: "info",
      items: [
        { label: "Team", href: "/team" },
        { label: "FAQs", href: "/faqs" },
        { label: "Awards", href: "#awards" },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="px-2 sm:px-4">
        <div className="flex items-center justify-between h-24">
          {/* Left: Conference Link + Desktop Dropdown Menus */}
          <div className="hidden lg:flex items-center gap-4 w-96">
            <a
              href="/itl-conference"
              className="px-4 py-2 text-base font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition"
            >
              ITL '26 Conference
            </a>

            <div className="h-8 w-px bg-neutral-200"></div>

            {navMenu.map((menu) => (
              <div key={menu.key} className="relative group">
                <button className="px-4 py-2 text-base font-semibold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition flex items-center gap-2">
                  {menu.label}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 top-full w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="pt-2">
                    <div className="bg-white border border-neutral-200 rounded-lg shadow-xl">
                      {menu.items.map((item, idx) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className={`block px-5 py-3 text-base text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition ${
                            idx === 0 ? "rounded-t-lg" : ""
                          } ${idx === menu.items.length - 1 ? "rounded-b-lg" : ""}`}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center: Large Logo */}
          <div className="flex-1 flex justify-start lg:justify-center px-2 lg:px-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/itl-logo.webp"
                alt="ITL Logo"
                width={200}
                height={200}
                priority
                className="h-48 w-48 max-w-full"
              />
            </Link>
          </div>

          {/* Right: CTA Button + Mobile Menu */}
          <div className="hidden lg:flex items-center justify-end gap-3 w-96">
            <a
              href="/register"
              className="px-8 py-3 bg-primary-600 text-white font-bold text-base rounded-lg hover:bg-primary-700 transition shadow-md whitespace-nowrap"
            >
              Register
            </a>
          </div>

          {/* Mobile: Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="/register"
              className="hidden sm:block px-6 py-2 bg-primary-600 text-white font-bold text-sm rounded-lg hover:bg-primary-700 transition shadow-md"
            >
              Register
            </a>
            <button
              className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-neutral-200">
            <div className="py-3 px-2">
              <a
                href="#conference"
                className="block px-4 py-3 text-lg font-bold text-neutral-700 hover:bg-primary-50 rounded-md transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                ITL '26 Conference
              </a>
            </div>

            <div className="h-px bg-neutral-200 mx-2 my-2"></div>

            {navMenu.map((menu) => (
              <div key={menu.key} className="py-3 px-2">
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider px-4 mb-3">
                  {menu.label}
                </p>
                {menu.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-lg font-semibold text-neutral-700 hover:bg-primary-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}

            <div className="px-2 pt-4 border-t border-neutral-200 mt-2 sm:hidden">
              <a
                href="/register"
                className="block px-4 py-3 bg-primary-600 text-white font-bold text-lg rounded-lg hover:bg-primary-700 transition text-center"
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

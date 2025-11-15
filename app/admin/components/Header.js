"use client";

import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="font-bold">Admin</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">Admin User</div>
      </div>
    </header>
  );
}

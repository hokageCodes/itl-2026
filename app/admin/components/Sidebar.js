"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <aside className="bg-white border-r w-64 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-4 font-bold text-xl">Admin</div>
        <nav className="flex-1 px-2 space-y-1">
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link href="/admin/content" className="block px-3 py-2 rounded hover:bg-gray-100">Content</Link>
          <Link href="/admin/media" className="block px-3 py-2 rounded hover:bg-gray-100">Media</Link>
          <Link href="/admin/settings" className="block px-3 py-2 rounded hover:bg-gray-100">Settings</Link>
        </nav>
        <div className="p-4">
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
            className="text-sm text-red-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}

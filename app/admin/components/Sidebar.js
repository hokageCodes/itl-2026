"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, ChevronDown, ChevronRight, UserPlus, HandHeart, Building2, Award, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [submissionsOpen, setSubmissionsOpen] = useState(
    pathname?.startsWith('/admin/submissions') || false
  );

  const isActive = (path) => pathname === path;
  const isSubmissionsActive = pathname?.startsWith('/admin/submissions');

  // Close mobile menu when route changes
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 768) {
      onClose?.();
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-neutral-200 w-64 min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {/* Overview */}
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin')
                ? 'bg-primary-50 text-primary-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>

          {/* Submissions Dropdown */}
          <div>
            <button
              onClick={() => setSubmissionsOpen(!submissionsOpen)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                isSubmissionsActive
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                <span>Submissions</span>
              </div>
              {submissionsOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Dropdown Menu */}
            {submissionsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-neutral-200 pl-4">
                <Link
                  href="/admin/submissions/registrations"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive('/admin/submissions/registrations')
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Registrations</span>
                </Link>
                <Link
                  href="/admin/submissions/volunteers"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive('/admin/submissions/volunteers')
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <HandHeart className="w-4 h-4" />
                  <span>Volunteers</span>
                </Link>
                <Link
                  href="/admin/submissions/sponsors"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive('/admin/submissions/sponsors')
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Sponsors</span>
                </Link>
                <Link
                  href="/admin/submissions/nominations"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive('/admin/submissions/nominations')
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Nominations</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
    </>
  );
}

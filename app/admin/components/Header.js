"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, ChevronDown, Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data?.ok && data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin-login');
    } catch (err) {
      console.error('Logout failed:', err);
      router.push('/admin-login');
    }
  };

  return (
    <header className="bg-white border-b border-neutral-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button and Title/Details */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-neutral-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-neutral-700" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Admin Dashboard</h2>
            <p className="text-sm text-neutral-500 hidden sm:block">Manage conference submissions and content</p>
          </div>
        </div>

        {/* Right side - User info and logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium text-neutral-900">{user.name || 'Admin'}</div>
                  <div className="text-xs text-neutral-500">{user.email}</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <div className="text-sm font-medium text-neutral-900">{user.name || 'Admin'}</div>
                      <div className="text-xs text-neutral-500 mt-1">{user.email}</div>
                      {user.role && (
                        <div className="text-xs text-primary-600 mt-1 font-medium">{user.role}</div>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-neutral-500">
              <User className="w-5 h-5" />
              <span className="text-sm">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

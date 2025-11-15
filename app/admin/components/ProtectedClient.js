"use client";

import { useEffect, useState } from 'react';

export default function ProtectedClient({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  // If we're on the login or register pages, don't run the auth check here.
  // This prevents an infinite redirect loop because the admin layout wraps the login page.
  if (typeof window !== 'undefined') {
    const p = window.location.pathname;
    if (p === '/admin-login' || p === '/admin/login' || p === '/admin/register' || p === '/admin/login/') {
      // Render children (login/register UI) without checking session
      return <>{children}</>;
    }
  }

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!mounted) return;
        if (data?.ok) {
          setOk(true);
        } else {
          window.location.href = '/admin-login';
        }
      } catch (err) {
        console.error(err);
        const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
        if (pathname !== '/admin-login' && pathname !== '/admin/login' && pathname !== '/admin/register') {
          window.location.href = '/admin-login';
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-gray-500">Checking session…</div>
        </div>
      </div>
    );
  }

  if (!ok) return null;
  return <>{children}</>;
}

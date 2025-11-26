"use client";

import { useState } from 'react';
import ProtectedClient from './components/ProtectedClient';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-neutral-50">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedClient>
  );
}

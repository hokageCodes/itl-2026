"use client";

import ProtectedClient from './components/ProtectedClient';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


export default function AdminLayout({ children }) {
  return (
    <ProtectedClient>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedClient>
  );
}

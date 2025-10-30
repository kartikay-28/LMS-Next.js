'use client';

import { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

export default function MainLayout({ children, showSidebar = true, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            role={role}
          />
        )}
        
        <main className={`flex-1 ${showSidebar ? 'lg:ml-64' : ''}`}>
          {/* Mobile sidebar toggle */}
          {showSidebar && (
            <div className="lg:hidden p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
          
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
'use client';

import { useState } from 'react';

export default function DashboardSelector({ currentRole, onRoleChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { 
      value: 'student', 
      label: 'Student Dashboard', 
      icon: '👨‍🎓',
      href: '/student-dashboard',
      color: 'blue'
    },
    { 
      value: 'admin', 
      label: 'Admin Dashboard', 
      icon: '⚙️',
      href: '/admin-dashboard',
      color: 'red'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
          currentRole === 'admin'
            ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
            : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
        }`}
      >
        <span className="text-lg">
          {currentRole === 'admin' ? '⚙️' : '👨‍🎓'}
        </span>
        <span className="font-medium">
          {currentRole === 'admin' ? 'Admin View' : 'Student View'}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden">
            {roles.map((role) => (
              <a
                key={role.value}
                href={role.href}
                className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currentRole === role.value ? 'bg-gray-50' : ''
                }`}
                onClick={() => {
                  setIsOpen(false);
                  if (onRoleChange) onRoleChange(role.value);
                }}
              >
                <span className="text-xl">{role.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{role.label}</p>
                  <p className="text-xs text-gray-500">
                    Switch to {role.value} interface
                  </p>
                </div>
                {currentRole === role.value && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
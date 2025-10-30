'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import Button from '../global/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const loadingToast = toast.loading('Logging out...');
    
    try {
      await signOut({ redirect: false });
      toast.success('Logout successful!', { id: loadingToast });
      router.push('/');
    } catch (error) {
      toast.error('Logout failed. Please try again.', { id: loadingToast });
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">LMS Platform</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="/signup" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Sign Up
              </a>
              <a href="/signin" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </a>
              <a href="/courses" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Courses
              </a>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {session?.user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{session.user.name}</span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        session.user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {session.user.role}
                      </span>
                    </div>
                    <Button 
                      label="Logout" 
                      variant="outline" 
                      onClick={handleLogout}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Button 
                    label="Sign In" 
                    variant="outline" 
                    onClick={() => router.push('/signin')}
                  />
                  <Button 
                    label="Sign Up" 
                    variant="primary" 
                    onClick={() => router.push('/signup')}
                  />
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <a href="/" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="/signup" className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Sign Up</a>
            <a href="/signin" className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Sign In</a>
            <a href="/courses" className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Courses</a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-3">
                {session?.user ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                      <p className={`text-xs ${
                        session.user.role === 'admin' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {session.user.role}
                      </p>
                    </div>
                    <Button 
                      label="Logout" 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleLogout}
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button 
                      label="Sign In" 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => router.push('/signin')}
                    />
                    <Button 
                      label="Sign Up" 
                      variant="primary" 
                      className="w-full" 
                      onClick={() => router.push('/signup')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
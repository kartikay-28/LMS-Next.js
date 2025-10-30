'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CourseCard from '../components/CourseCard';

export default function Home() {
  const { data: session, status } = useSession();

  // Sample course data to demonstrate the CourseCard component
  const sampleCourses = [
    {
      title: "Introduction to Web Development",
      instructor: "John Smith",
      progress: 75,
      description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners looking to start their coding journey.",
      duration: "8 weeks",
      level: "Beginner",
      courseId: "web-dev-101",
      isEnrolled: true
    },
    {
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      progress: 0,
      description: "Master advanced React concepts including hooks, context, and performance optimization. Build complex applications with confidence.",
      duration: "12 weeks",
      level: "Advanced",
      courseId: "react-advanced",
      isEnrolled: false
    },
    {
      title: "Database Design & MongoDB",
      instructor: "Mike Chen",
      progress: 45,
      description: "Learn database design principles and master MongoDB for modern web applications. Includes hands-on projects and real-world examples.",
      duration: "6 weeks",
      level: "Intermediate",
      courseId: "mongodb-design",
      isEnrolled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to <span className="text-indigo-600">LMS Project</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A modern Learning Management System built with Next.js, MongoDB, and Tailwind CSS. 
              Start your learning journey today with our comprehensive courses.
            </p>
            <div className="mt-5 max-w-4xl mx-auto sm:flex sm:justify-center md:mt-8 space-y-3 sm:space-y-0 sm:space-x-3">
              {session?.user ? (
                <>
                  <div className="rounded-md shadow">
                    <Link
                      href={session.user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-8 transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                  <div className="rounded-md shadow">
                    <Link
                      href="/student-dashboard"
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 md:py-4 md:text-lg md:px-8 transition-colors"
                    >
                      👨‍🎓 Student View
                    </Link>
                  </div>
                  <div className="rounded-md shadow">
                    <Link
                      href="/admin-dashboard"
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 md:py-4 md:text-lg md:px-8 transition-colors"
                    >
                      ⚙️ Admin View
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-md shadow">
                    <Link
                      href="/signup"
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-8 transition-colors"
                    >
                      Sign Up Now
                    </Link>
                  </div>
                  <div className="rounded-md shadow">
                    <Link
                      href="/signin"
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-8 transition-colors border-2 border-indigo-600"
                    >
                      Sign In
                    </Link>
                  </div>
                  <div className="rounded-md shadow">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/seed', { method: 'POST' });
                          const data = await response.json();
                          alert(data.message);
                        } catch (error) {
                          alert('Failed to seed database');
                        }
                      }}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-8 transition-colors"
                    >
                      🌱 Seed Database
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Our LMS?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built with modern technologies for the best learning experience
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Interactive Learning</h3>
              <p className="mt-2 text-gray-600">
                Engage with interactive content and track your progress in real-time.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Progress Tracking</h3>
              <p className="mt-2 text-gray-600">
                Monitor your learning journey with detailed progress analytics.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Expert Instructors</h3>
              <p className="mt-2 text-gray-600">
                Learn from industry experts with years of practical experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our sample courses and see what you can learn
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sampleCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Sign In to Access All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Experience Our Dashboards
            </h2>
            <p className="text-lg text-gray-600">
              Explore both student and admin interfaces with full functionality
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Dashboard Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👨‍🎓</span>
                  <div>
                    <h3 className="text-xl font-bold">Student Dashboard</h3>
                    <p className="text-blue-100">Track your learning progress</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Course progress tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Assignment deadlines</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Achievement badges</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Learning analytics</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/student-dashboard"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    View Student Dashboard
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin Dashboard Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <h3 className="text-xl font-bold">Admin Dashboard</h3>
                    <p className="text-slate-300">Manage your LMS platform</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">User management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Course analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">System monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Revenue tracking</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/admin-dashboard"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    View Admin Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Demo Credentials
          </h2>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Admin User</h3>
                <p className="text-sm text-gray-600">
                  Email: <code className="bg-white px-2 py-1 rounded border">admin@example.com</code><br />
                  Password: <code className="bg-white px-2 py-1 rounded border">password</code>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Student User</h3>
                <p className="text-sm text-gray-600">
                  Email: <code className="bg-white px-2 py-1 rounded border">student@example.com</code><br />
                  Password: <code className="bg-white px-2 py-1 rounded border">password</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

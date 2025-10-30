'use client';

import toast from 'react-hot-toast';
import MainLayout from '../layout/main-layout';
import Card from '../global/card';
import RoleSwitcher from '../global/role-switcher';
import ProtectedRoute from '../auth/protected-route';

export default function StudentDashboardPage() {
  const enrolledCourses = [
    {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      title: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript programming with interactive exercises and real-world projects.",
      progress: 75,
      nextLesson: "Arrays and Objects"
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
      title: "React Development",
      description: "Build modern web applications using React hooks, components, and state management.",
      progress: 45,
      nextLesson: "useState Hook"
    },
    {
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop",
      title: "Python for Beginners",
      description: "Learn Python programming from scratch with hands-on coding exercises.",
      progress: 20,
      nextLesson: "Variables and Data Types"
    }
  ];

  const recentActivities = [
    {
      title: "Completed Lesson",
      description: "Functions and Scope in JavaScript Fundamentals",
      time: "2 hours ago",
      type: "completion"
    },
    {
      title: "Quiz Passed",
      description: "React Components Quiz - Score: 85%",
      time: "1 day ago",
      type: "quiz"
    },
    {
      title: "New Assignment",
      description: "Build a Todo App using React",
      time: "2 days ago",
      type: "assignment"
    },
    {
      title: "Course Enrolled",
      description: "Python for Beginners course started",
      time: "3 days ago",
      type: "enrollment"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "React Todo App Project",
      course: "React Development",
      dueDate: "Tomorrow",
      priority: "high"
    },
    {
      title: "JavaScript Quiz #3",
      course: "JavaScript Fundamentals",
      dueDate: "In 3 days",
      priority: "medium"
    },
    {
      title: "Python Exercise Set 1",
      course: "Python for Beginners",
      dueDate: "Next week",
      priority: "low"
    }
  ];

  const achievements = [
    { title: "First Course Completed", icon: "🏆", earned: true },
    { title: "Quiz Master", icon: "🧠", earned: true },
    { title: "Streak Champion", icon: "🔥", earned: false },
    { title: "Project Builder", icon: "🛠️", earned: true }
  ];

  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout showSidebar={true} role="student">
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
                <p className="text-blue-100 text-lg">
                  Continue your learning journey. You're doing great!
                </p>
              </div>
              <div className="mt-6 sm:mt-0 flex space-x-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-blue-100">Learning Streak</p>
                  <p className="text-2xl font-bold">7 days 🔥</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-blue-100">Level</p>
                  <p className="text-2xl font-bold">Intermediate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white shadow-lg">
                    <span className="text-xl">📚</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-500">Active learning</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white shadow-lg">
                    <span className="text-xl">✅</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white shadow-lg">
                    <span className="text-xl">⏱️</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">Study Time</p>
                  <p className="text-2xl font-bold text-gray-900">42h</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white shadow-lg">
                    <span className="text-xl">🎯</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                  <p className="text-xs text-gray-500">Quiz average</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Courses */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                  <p className="text-sm text-gray-600 mt-1">Continue your learning journey</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {enrolledCourses.map((course, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
                        <div className="flex items-start space-x-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                <span className="font-medium">Progress</span>
                                <span className="font-bold text-blue-600">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-blue-600 font-medium">
                                Next: {course.nextLesson}
                              </p>
                              <button 
                                onClick={() => toast.success(`Continuing ${course.title}...`)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${deadline.priority === 'high' ? 'border-red-500 bg-red-50' :
                        deadline.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                          'border-green-500 bg-green-50'
                        } hover:shadow-md transition-shadow`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 mb-1">{deadline.title}</p>
                            <p className="text-sm text-gray-600 mb-2">{deadline.course}</p>
                            <p className="text-xs text-gray-500">Due: {deadline.dueDate}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                            deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                            {deadline.priority}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`p-4 rounded-lg text-center border transition-all duration-200 ${achievement.earned
                        ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md hover:shadow-lg transform hover:scale-105'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        }`}>
                        <div className={`text-3xl mb-2 ${achievement.earned ? 'animate-pulse' : 'grayscale opacity-50'}`}>
                          {achievement.icon}
                        </div>
                        <p className={`text-xs font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                          }`}>
                          {achievement.title}
                        </p>
                        {achievement.earned && (
                          <div className="mt-1">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600 mt-1">Your latest learning activities</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-blue-200">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-3 h-3 rounded-full shadow-sm ${activity.type === 'completion' ? 'bg-green-500' :
                        activity.type === 'quiz' ? 'bg-blue-500' :
                          activity.type === 'assignment' ? 'bg-orange-500' :
                            'bg-purple-500'
                        }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
              <p className="text-sm text-gray-600 mt-1">Expand your skills with these courses</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                  image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop"
                  title="Advanced CSS & Animations"
                  description="Master advanced CSS techniques, animations, and modern layout systems like Grid and Flexbox."
                  onClick={() => toast.success('Course coming soon!')}
                />
                <Card
                  image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
                  title="Node.js Backend Development"
                  description="Build scalable backend applications with Node.js, Express, and database integration."
                  onClick={() => toast.success('Course coming soon!')}
                />
                <Card
                  image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
                  title="Data Structures & Algorithms"
                  description="Strengthen your programming foundation with essential data structures and algorithms."
                  onClick={() => toast.success('Course coming soon!')}
                />
              </div>
            </div>
          </div>

          <RoleSwitcher />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
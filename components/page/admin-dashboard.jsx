'use client';

import MainLayout from '../layout/main-layout';
import Card from '../global/card';
import RoleSwitcher from '../global/role-switcher';
import ProtectedRoute from '../auth/protected-route';

export default function AdminDashboardPage() {
  const systemStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: "👥",
      color: "blue"
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: "📚",
      color: "green"
    },
    {
      title: "Revenue",
      value: "$48,392",
      change: "+23%",
      trend: "up",
      icon: "💰",
      color: "purple"
    },
    {
      title: "Completion Rate",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      icon: "📈",
      color: "orange"
    }
  ];

  const recentUsers = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "Student",
      joinDate: "2 hours ago",
      status: "active"
    },
    {
      name: "Mike Chen",
      email: "mike.chen@email.com",
      role: "Instructor",
      joinDate: "5 hours ago",
      status: "pending"
    },
    {
      name: "Emma Wilson",
      email: "emma.w@email.com",
      role: "Student",
      joinDate: "1 day ago",
      status: "active"
    },
    {
      name: "David Brown",
      email: "david.b@email.com",
      role: "Student",
      joinDate: "2 days ago",
      status: "inactive"
    }
  ];

  const topCourses = [
    {
      title: "JavaScript Fundamentals",
      instructor: "John Doe",
      students: 1247,
      rating: 4.8,
      revenue: "$12,450",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
    },
    {
      title: "React Development",
      instructor: "Jane Smith",
      students: 892,
      rating: 4.9,
      revenue: "$8,920",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
    },
    {
      title: "Python for Data Science",
      instructor: "Alex Johnson",
      students: 756,
      rating: 4.7,
      revenue: "$7,560",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop"
    }
  ];

  const systemAlerts = [
    {
      type: "warning",
      title: "Server Load High",
      message: "CPU usage at 85% - consider scaling",
      time: "5 minutes ago"
    },
    {
      type: "info",
      title: "New Course Submitted",
      message: "Advanced React course pending review",
      time: "1 hour ago"
    },
    {
      type: "success",
      title: "Backup Completed",
      message: "Daily database backup successful",
      time: "2 hours ago"
    },
    {
      type: "error",
      title: "Payment Failed",
      message: "3 payment transactions failed",
      time: "3 hours ago"
    }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colors[color] || colors.blue;
  };

  const getAlertColor = (type) => {
    const colors = {
      warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
      info: "border-blue-200 bg-blue-50 text-blue-800",
      success: "border-green-200 bg-green-50 text-green-800",
      error: "border-red-200 bg-red-50 text-red-800"
    };
    return colors[type] || colors.info;
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout showSidebar={true} role="admin">
        <div className="space-y-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-slate-300 text-lg">
                Manage your LMS platform and monitor system performance
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex space-x-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-slate-300">System Status</p>
                <p className="text-xl font-bold text-green-400">🟢 Online</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-slate-300">Uptime</p>
                <p className="text-xl font-bold">99.9%</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <div key={index} className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${getStatColor(stat.color)} opacity-5`}></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${getStatColor(stat.color)} text-white shadow-lg`}>
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Top Courses */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Top Performing Courses</h2>
                <p className="text-sm text-gray-600 mt-1">Courses with highest enrollment and revenue</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {topCourses.map((course, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <span className="text-blue-500 mr-1">👥</span>
                                {course.students.toLocaleString()} students
                              </span>
                              <span className="flex items-center">
                                <span className="text-yellow-500 mr-1">⭐</span>
                                {course.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{course.revenue}</p>
                            <p className="text-xs text-gray-500">Revenue</p>
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
            {/* System Alerts */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">System Alerts</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{alert.title}</p>
                          <p className="text-xs mt-1 opacity-80">{alert.message}</p>
                          <p className="text-xs mt-2 opacity-60">{alert.time}</p>
                        </div>
                        <div className="ml-2">
                          {alert.type === 'warning' && '⚠️'}
                          {alert.type === 'info' && 'ℹ️'}
                          {alert.type === 'success' && '✅'}
                          {alert.type === 'error' && '❌'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <div className="text-2xl mb-2">👤</div>
                    <div className="text-sm font-semibold">Add User</div>
                  </button>
                  <button className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="text-sm font-semibold">New Course</div>
                  </button>
                  <button className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm font-semibold">Reports</div>
                  </button>
                  <button className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <div className="text-2xl mb-2">⚙️</div>
                    <div className="text-sm font-semibold">Settings</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent User Registrations</h2>
            <p className="text-sm text-gray-600 mt-1">Latest users who joined the platform</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'Instructor' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <RoleSwitcher />
      </MainLayout>
    </ProtectedRoute>
  );
}
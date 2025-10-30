import MainLayout from '../layout/main-layout';
import Card from '../global/card';

export default function DashboardPage() {
  const statsCards = [
    {
      title: 'Total Students',
      value: '2,847',
      description: 'Active learners enrolled',
      icon: '👥'
    },
    {
      title: 'Active Courses',
      value: '156',
      description: 'Currently running courses',
      icon: '📚'
    },
    {
      title: 'Completion Rate',
      value: '87%',
      description: 'Average course completion',
      icon: '📈'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      description: 'This month earnings',
      icon: '💰'
    }
  ];

  const recentActivities = [
    {
      title: 'New Course Published',
      description: 'Advanced React Development course is now live',
      time: '2 hours ago',
      type: 'course'
    },
    {
      title: 'Student Milestone',
      description: 'Sarah Johnson completed JavaScript Fundamentals',
      time: '4 hours ago',
      type: 'achievement'
    },
    {
      title: 'Payment Received',
      description: 'Monthly subscription payment from Premium Plan',
      time: '6 hours ago',
      type: 'payment'
    },
    {
      title: 'New Instructor',
      description: 'Dr. Michael Chen joined as Python instructor',
      time: '1 day ago',
      type: 'user'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Course',
      description: 'Add a new course to the platform',
      icon: '➕',
      action: 'create-course'
    },
    {
      title: 'Manage Users',
      description: 'View and manage student accounts',
      icon: '👤',
      action: 'manage-users'
    },
    {
      title: 'View Reports',
      description: 'Access detailed analytics and reports',
      icon: '📊',
      action: 'view-reports'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: '⚙️',
      action: 'settings'
    }
  ];

  return (
    <MainLayout showSidebar={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back! Here's what's happening with your LMS platform.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                System Status: Online
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'course' ? 'bg-blue-500' :
                          activity.type === 'achievement' ? 'bg-green-500' :
                          activity.type === 'payment' ? 'bg-yellow-500' :
                          'bg-purple-500'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                      onClick={() => console.log(`Action: ${action.action}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{action.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                            {action.title}
                          </p>
                          <p className="text-xs text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Overview Cards */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
              title="JavaScript Fundamentals"
              description="Complete guide to modern JavaScript programming with hands-on projects and real-world examples."
              onClick={() => console.log('Navigate to JavaScript course')}
            />
            <Card
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
              title="React Development"
              description="Build modern web applications with React, including hooks, context, and state management."
              onClick={() => console.log('Navigate to React course')}
            />
            <Card
              image="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop"
              title="Python for Data Science"
              description="Learn Python programming with focus on data analysis, visualization, and machine learning."
              onClick={() => console.log('Navigate to Python course')}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
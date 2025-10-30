export default function Sidebar({ isOpen = true, onToggle, role = 'student' }) {
  const studentMenuItems = [
    { icon: '📊', label: 'Dashboard', href: '/student-dashboard' },
    { icon: '📚', label: 'My Courses', href: '/courses' },
    { icon: '📈', label: 'Progress', href: '/progress' },
    { icon: '📝', label: 'Assignments', href: '/assignments' },
    { icon: '💬', label: 'Discussions', href: '/discussions' },
    { icon: '📅', label: 'Calendar', href: '/calendar' },
    { icon: '⚙️', label: 'Settings', href: '/settings' }
  ];

  const adminMenuItems = [
    { icon: '📊', label: 'Admin Dashboard', href: '/admin-dashboard' },
    { icon: '👥', label: 'Users', href: '/admin/users' },
    { icon: '📚', label: 'Course Management', href: '/admin/courses' },
    { icon: '📊', label: 'Analytics', href: '/admin/analytics' },
    { icon: '💬', label: 'Support', href: '/admin/support' },
    { icon: '⚙️', label: 'Settings', href: '/admin/settings' }
  ];

  const menuItems = role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {role === 'admin' ? '⚙️ Admin Panel' : '📚 Student Portal'}
          </h2>
          <button 
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  role === 'admin' 
                    ? 'text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-transparent'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent'
                }`}
              >
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
        
        {/* User section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-gray-200">
            <div className="flex-shrink-0">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md ${
                role === 'admin' 
                  ? 'bg-gradient-to-br from-red-500 to-red-600' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600'
              }`}>
                <span className="text-sm font-bold text-white">
                  {role === 'admin' ? 'A' : 'S'}
                </span>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-800">User Name</p>
              <p className={`text-xs font-medium capitalize ${
                role === 'admin' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {role}
              </p>
            </div>
            <div className="ml-2">
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
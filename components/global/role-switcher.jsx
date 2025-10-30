export default function RoleSwitcher() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Access</h3>
        <div className="space-y-2">
          <a
            href="/student-dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <span className="text-lg">👨‍🎓</span>
            <span className="text-sm font-medium">Student Dashboard</span>
          </a>
          <a
            href="/admin-dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
          >
            <span className="text-lg">⚙️</span>
            <span className="text-sm font-medium">Admin Dashboard</span>
          </a>
        </div>
      </div>
    </div>
  );
}
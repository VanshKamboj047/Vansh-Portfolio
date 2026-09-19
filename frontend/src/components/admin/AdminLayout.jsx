import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Personal Info", path: "/admin/personal-info" },
  { name: "Skills", path: "/admin/skills" },
  { name: "Experience", path: "/admin/experience" },
  { name: "Education", path: "/admin/education" },
  { name: "Projects", path: "/admin/projects" },
  { name: "Services", path: "/admin/services" },
  { name: "Certifications", path: "/admin/certifications" },
  { name: "Achievements", path: "/admin/achievements" },
  { name: "Social Profiles", path: "/admin/social-profiles" },
  { name: "Messages", path: "/admin/messages" },
];
export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="px-6 py-5 border-b-3 border-gray-200">
          <h1 className="font-bold text-2xl">Portfolio </h1><h6 className="text-sm">Admin Panel</h6>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-600 hover:bg-gray-300 hover:text-black'
                }`}
              >
                {item.name}
              </Link> 
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-300">
          <p className="text-base font-bold text-gray-500 mb-2">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="text-sm font-bold text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
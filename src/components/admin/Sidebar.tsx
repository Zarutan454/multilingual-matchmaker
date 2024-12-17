import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Bell,
  Settings,
  UserCog
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Profile", path: "/admin/profiles" },
  { icon: UserCog, label: "Benutzerverwaltung", path: "/admin/users" },
  { icon: BarChart2, label: "Analytics", path: "/admin/analytics" },
  { icon: Bell, label: "Benachrichtigungen", path: "/admin/notifications" },
  { icon: Settings, label: "Einstellungen", path: "/admin/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#222222] min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-secondary text-white"
                  : "text-gray-400 hover:bg-[#333] hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
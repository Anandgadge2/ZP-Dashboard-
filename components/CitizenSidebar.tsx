"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  AlertCircle,
  Calendar,
  Globe,
  LogOut,
  Home,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/citizen-dashboard", icon: Home },
  { name: "My Grievances", path: "/citizen-dashboard/grievances", icon: AlertCircle },
  { name: "My Appointments", path: "/citizen-dashboard/appointments", icon: Calendar },
  { name: "Gov. Services", path: "/citizen-dashboard/gservices", icon: Globe },
];

export default function CitizenSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("citizenToken");
    localStorage.removeItem("citizenName");
    router.push("/citizen-login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[#e8f0f8] to-[#f0f5fa] text-gray-800 h-screen sticky top-0 px-0 py-0 flex flex-col border-r border-blue-200 overflow-hidden">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-blue-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            G2
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-gray-900">Citizen Portal</h1>
            <p className="text-xs text-blue-600 mt-1">Services</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              <Icon
                size={20}
                className={`flex-shrink-0 ${
                  active
                    ? "text-white"
                    : "text-blue-600 group-hover:text-blue-700"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-blue-200 px-3 py-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className="truncate font-medium">Logout</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="border-t border-blue-200 px-6 py-4 text-xs text-gray-600 bg-blue-50">
        <p className="font-semibold mb-2 text-gray-800">Citizen Services</p>
        <p className="line-clamp-2">
          Track grievances & manage appointments easily
        </p>
      </div>
    </aside>
  );
}

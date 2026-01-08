"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertCircle,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Grievances", path: "/dashboard/grievances", icon: AlertCircle },
  { name: "Appointments", path: "/dashboard/appointments", icon: Calendar },
  { name: "Citizens", path: "/dashboard/citizens", icon: Users },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-[#1f3c88] to-[#1a2d66] text-white min-h-screen px-0 py-0 flex flex-col border-r border-[#152347]">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-[#152347]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-[#1f3c88]">
            G2
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">G2C Admin</h1>
            <p className="text-xs text-blue-200 mt-1">Portal</p>
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
                  ? "bg-white text-[#1f3c88] font-semibold shadow-lg"
                  : "text-blue-100 hover:bg-[#2a4a9a] hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={`flex-shrink-0 ${
                  active
                    ? "text-[#1f3c88]"
                    : "text-blue-300 group-hover:text-white"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-[#152347] px-6 py-4 text-xs text-blue-200">
        <p className="font-semibold mb-2">Government Services</p>
        <p className="line-clamp-2">
          Efficient citizen grievance & appointment management
        </p>
      </div>
    </aside>
  );
}

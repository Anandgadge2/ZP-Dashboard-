import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  change?: {
    value: number;
    direction: "up" | "down";
  };
  color?: "blue" | "red" | "green" | "yellow" | "purple";
  gradient?: boolean;
  onClick?: () => void;
}

const colorClasses = {
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    text: "text-blue-600",
    border: "border-blue-500",
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 to-red-100",
    text: "text-red-600",
    border: "border-red-500",
  },
  green: {
    bg: "bg-gradient-to-br from-green-50 to-green-100",
    text: "text-green-600",
    border: "border-green-500",
  },
  yellow: {
    bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    text: "text-yellow-600",
    border: "border-yellow-500",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-50 to-purple-100",
    text: "text-purple-600",
    border: "border-purple-500",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  change,
  color = "blue",
  gradient = true,
  onClick,
}: StatCardProps) {
  const colorConfig = colorClasses[color];

  return (
    <div
      onClick={onClick}
      className={`
        p-6 rounded-xl shadow-sm hover:shadow-md transition-all
        ${gradient ? colorConfig.bg : "bg-white"}
        ${colorConfig.border} border-l-4
        ${onClick ? "cursor-pointer" : ""}
        group
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-700 text-sm font-semibold mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${
                  change.direction === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.direction === "up" ? "↑" : "↓"} {change.value}%
              </span>
              <span className="text-xs text-gray-600">from last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={`
              text-4xl opacity-20 group-hover:opacity-30 transition
              ${onClick ? "group-hover:scale-110" : ""}
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

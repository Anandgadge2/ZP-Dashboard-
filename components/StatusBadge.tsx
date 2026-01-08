interface StatusBadgeProps {
  status: string;
  variant?: "default" | "subtle" | "outlined";
  size?: "sm" | "md" | "lg";
}

const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
  PENDING: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    icon: "⏳",
  },
  IN_PROGRESS: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    icon: "⚙️",
  },
  RESOLVED: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: "✓",
  },
  REJECTED: {
    bg: "bg-red-100",
    text: "text-red-800",
    icon: "✗",
  },
  CONFIRMED: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: "✓",
  },
  COMPLETED: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    icon: "🎉",
  },
  CANCELLED: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    icon: "✗",
  },
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

export default function StatusBadge({
  status,
  variant = "default",
  size = "md",
}: StatusBadgeProps) {
  const colors = statusColors[status] || statusColors.PENDING;

  if (variant === "subtle") {
    return (
      <span
        className={`
          inline-block font-semibold rounded-full
          ${colors.bg} ${colors.text}
          ${sizeClasses[size]}
          hover:shadow-md transition-all
        `}
      >
        {colors.icon} {status}
      </span>
    );
  }

  if (variant === "outlined") {
    const borderColor = colors.text.replace("text-", "border-");
    return (
      <span
        className={`
          inline-block font-semibold rounded-full
          border-2 ${borderColor} ${colors.text}
          bg-white
          ${sizeClasses[size]}
          hover:shadow-md transition-all
        `}
      >
        {colors.icon} {status}
      </span>
    );
  }

  // Default variant
  return (
    <span
      className={`
        inline-block font-semibold rounded-full
        ${colors.bg} ${colors.text}
        ${sizeClasses[size]}
        shadow-sm hover:shadow-md transition-all
      `}
    >
      {colors.icon} {status}
    </span>
  );
}

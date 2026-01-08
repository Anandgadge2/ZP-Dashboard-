interface TimelineEvent {
  stage: string;
  status: "completed" | "current" | "pending";
  date: string;
  description: string;
  notes?: string;
}

interface ApplicationTrackerProps {
  events: TimelineEvent[];
}

export default function ApplicationTracker({ events }: ApplicationTrackerProps) {
  const stageIcons = {
    submitted: "📝",
    review: "👁️",
    processing: "⚙️",
    verification: "✓",
    approval: "✅",
    rejected: "✗",
    completed: "🎉",
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Application Timeline</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"></div>

        {/* Timeline events */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative pl-20 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center font-2xl transition-all ${
                  event.status === "completed"
                    ? "bg-green-100 text-green-700 ring-4 ring-green-200"
                    : event.status === "current"
                    ? "bg-blue-100 text-blue-700 ring-4 ring-blue-200 animate-pulse"
                    : "bg-gray-100 text-gray-400 ring-4 ring-gray-200"
                }`}
              >
                {stageIcons[event.stage.toLowerCase() as keyof typeof stageIcons] || "•"}
              </div>

              {/* Event content */}
              <div
                className={`p-4 rounded-lg border-l-4 transition-all ${
                  event.status === "completed"
                    ? "border-green-500 bg-green-50"
                    : event.status === "current"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{event.stage}</h4>
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{event.description}</p>
                {event.notes && (
                  <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> {event.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

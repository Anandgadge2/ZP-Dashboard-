"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Users, AlertCircle, Calendar, FileText, Award } from "lucide-react";

interface DashboardStats {
  totalGrievances: number;
  pendingGrievances: number;
  resolvedGrievances: number;
  totalAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalCitizens: number;
  satisfactionRate: number;
}

const mockStats: DashboardStats = {
  totalGrievances: 1245,
  pendingGrievances: 342,
  resolvedGrievances: 876,
  totalAppointments: 2341,
  confirmedAppointments: 1890,
  completedAppointments: 1560,
  totalCitizens: 5678,
  satisfactionRate: 87,
};

export default function AdminLandingPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const grievanceResolutionRate = Math.round(
    (stats.resolvedGrievances / stats.totalGrievances) * 100
  );
  const appointmentCompletionRate = Math.round(
    (stats.completedAppointments / stats.totalAppointments) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage grievances, appointments, and citizen services with ease
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Stats Cards - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {/* Total Grievances */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-semibold mb-2">Total Grievances</p>
                <p className="text-3xl font-bold text-red-900">{stats.totalGrievances}</p>
                <p className="text-xs text-red-600 mt-2">
                  {grievanceResolutionRate}% resolved
                </p>
              </div>
              <div className="text-5xl opacity-20">⚠️</div>
            </div>
          </div>

          {/* Pending Grievances */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-semibold mb-2">
                  Pending Grievances
                </p>
                <p className="text-3xl font-bold text-yellow-900">
                  {stats.pendingGrievances}
                </p>
                <p className="text-xs text-yellow-600 mt-2">
                  {((stats.pendingGrievances / stats.totalGrievances) * 100).toFixed(1)}% pending
                </p>
              </div>
              <div className="text-5xl opacity-20">⏳</div>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold mb-2">
                  Total Appointments
                </p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalAppointments}</p>
                <p className="text-xs text-blue-600 mt-2">
                  {appointmentCompletionRate}% completed
                </p>
              </div>
              <div className="text-5xl opacity-20">📅</div>
            </div>
          </div>

          {/* Total Citizens */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold mb-2">
                  Total Citizens
                </p>
                <p className="text-3xl font-bold text-green-900">{stats.totalCitizens}</p>
                <p className="text-xs text-green-600 mt-2">
                  {stats.satisfactionRate}% satisfaction rate
                </p>
              </div>
              <div className="text-5xl opacity-20">👥</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Grievance Resolution */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Grievance Resolution
              </h3>
              <TrendingUp className="text-red-500" size={24} />
            </div>
            <p className="text-4xl font-bold text-red-600 mb-2">
              {grievanceResolutionRate}%
            </p>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${grievanceResolutionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {stats.resolvedGrievances} out of {stats.totalGrievances} resolved
            </p>
          </div>

          {/* Appointment Completion */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Appointment Completion
              </h3>
              <Calendar className="text-blue-500" size={24} />
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {appointmentCompletionRate}%
            </p>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${appointmentCompletionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {stats.completedAppointments} out of {stats.totalAppointments} completed
            </p>
          </div>

          {/* Citizen Satisfaction */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Citizen Satisfaction
              </h3>
              <Award className="text-green-500" size={24} />
            </div>
            <p className="text-4xl font-bold text-green-600 mb-2">
              {stats.satisfactionRate}%
            </p>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.satisfactionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Based on citizen feedback and reviews
            </p>
          </div>
        </div>

        {/* Action Cards - Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-medium flex items-center gap-2">
                <FileText size={20} />
                View All Grievances
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition font-medium flex items-center gap-2">
                <Calendar size={20} />
                Manage Appointments
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition font-medium flex items-center gap-2">
                <Users size={20} />
                Citizen Database
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    New grievance submitted
                  </p>
                  <p className="text-xs text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Appointment confirmed
                  </p>
                  <p className="text-xs text-gray-600">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Grievance resolved
                  </p>
                  <p className="text-xs text-gray-600">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 animate-fade-in">
          <div className="flex gap-4">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Dashboard Overview</h3>
              <p className="text-blue-800 text-sm">
                This dashboard provides real-time insights into grievance management, appointment scheduling, and citizen
                services. Use the sidebar navigation to access detailed reports, manage applications, and track citizen
                satisfaction metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

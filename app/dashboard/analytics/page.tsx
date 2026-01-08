"use client";

import { useEffect, useState } from "react";
import { getAllGrievances } from "@/services/grievanceApi";
import { getAllAppointments } from "@/services/appointmentApi";
import { getCitizens } from "@/services/citizenApi";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import StatCard from "@/components/StatCard";
import Modal from "@/components/Modal";
import { TrendingUp, Users, AlertCircle, Calendar } from "lucide-react";

/* ==================== TYPES ==================== */
type GrievanceStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

interface Grievance {
  grievanceId: string;
  userName: string;
  phone: string;
  category: string;
  status: GrievanceStatus;
  createdAt: string;
}

interface Appointment {
  appointmentId: string;
  userName: string;
  phone: string;
  department: string;
  status: AppointmentStatus;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
}

interface Citizen {
  phone: string;
  name: string;
  grievances: Grievance[];
  appointments: Appointment[];
}

interface AnalyticsStats {
  grievanceStatus: Record<GrievanceStatus, number>;
  appointmentStatus: Record<AppointmentStatus, number>;
  grievancesByCategory: Record<string, number>;
  appointmentsByDept: Record<string, number>;
  totalGrievances: number;
  totalAppointments: number;
  totalCitizens: number;
}
/* ================================================ */

const COLORS = {
  grievance: {
    PENDING: "#EF4444",
    IN_PROGRESS: "#F59E0B",
    RESOLVED: "#10B981",
    REJECTED: "#6366F1",
  },
  appointment: {
    PENDING: "#EF4444",
    CONFIRMED: "#10B981",
    CANCELLED: "#6B7280",
    COMPLETED: "#0EA5E9",
  },
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllGrievances(), getAllAppointments()]).then(
      ([grievances, appointments]: [Grievance[], Appointment[]]) => {
        // Calculate grievance stats
        const grievanceStatus: Record<GrievanceStatus, number> = {
          PENDING: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
          REJECTED: 0,
        };

        const grievancesByCategory: Record<string, number> = {};

        grievances.forEach((g) => {
          grievanceStatus[g.status]++;
          grievancesByCategory[g.category] =
            (grievancesByCategory[g.category] || 0) + 1;
        });

        // Calculate appointment stats
        const appointmentStatus: Record<AppointmentStatus, number> = {
          PENDING: 0,
          CONFIRMED: 0,
          CANCELLED: 0,
          COMPLETED: 0,
        };

        const appointmentsByDept: Record<string, number> = {};

        appointments.forEach((a) => {
          appointmentStatus[a.status]++;
          appointmentsByDept[a.department] =
            (appointmentsByDept[a.department] || 0) + 1;
        });

        // Build citizens map
        const citizenMap: Record<string, Citizen> = {};

        grievances.forEach((g) => {
          if (!citizenMap[g.phone]) {
            citizenMap[g.phone] = {
              phone: g.phone,
              name: g.userName,
              grievances: [],
              appointments: [],
            };
          }
          citizenMap[g.phone].grievances.push(g);
        });

        appointments.forEach((a) => {
          if (!citizenMap[a.phone]) {
            citizenMap[a.phone] = {
              phone: a.phone,
              name: a.userName,
              grievances: [],
              appointments: [],
            };
          }
          citizenMap[a.phone].appointments.push(a);
        });

        setCitizens(Object.values(citizenMap));

        setStats({
          grievanceStatus,
          appointmentStatus,
          grievancesByCategory,
          appointmentsByDept,
          totalGrievances: grievances.length,
          totalAppointments: appointments.length,
          totalCitizens: Object.keys(citizenMap).length,
        });

        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No analytics data available</p>
      </div>
    );

  const grievanceData = Object.entries(stats.grievanceStatus).map(
    ([name, value]) => ({
      name,
      value,
      fill: COLORS.grievance[name as GrievanceStatus],
    })
  );

  const appointmentData = Object.entries(stats.appointmentStatus).map(
    ([name, value]) => ({
      name,
      value,
      fill: COLORS.appointment[name as AppointmentStatus],
    })
  );

  const categoryData = Object.entries(stats.grievancesByCategory).map(
    ([name, value]) => ({
      name,
      grievances: value,
    })
  );

  const departmentData = Object.entries(stats.appointmentsByDept).map(
    ([name, value]) => ({
      name,
      appointments: value,
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Comprehensive dashboard overview</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-semibold uppercase tracking-wide">
                Total Grievances
              </p>
              <p className="text-4xl font-bold text-red-700 mt-2">
                {stats.totalGrievances}
              </p>
            </div>
            <AlertCircle className="text-red-400" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                Total Appointments
              </p>
              <p className="text-4xl font-bold text-blue-700 mt-2">
                {stats.totalAppointments}
              </p>
            </div>
            <Calendar className="text-blue-400" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">
                Total Citizens
              </p>
              <p className="text-4xl font-bold text-purple-700 mt-2">
                {stats.totalCitizens}
              </p>
            </div>
            <Users className="text-purple-400" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">
                Resolution Rate
              </p>
              <p className="text-4xl font-bold text-green-700 mt-2">
                {Math.round(
                  (stats.grievanceStatus.RESOLVED / stats.totalGrievances) *
                    100
                ) || 0}
                %
              </p>
            </div>
            <TrendingUp className="text-green-400" size={40} />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grievance Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Grievance Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={grievanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {grievanceData.map((entry, index) => (
                  <text key={`text-${index}`} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} items`, "Count"]}
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Appointment Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentData.map((entry, index) => (
                  <text key={`text-${index}`} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} items`, "Count"]}
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grievances by Category */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Grievances by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="grievances" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Appointments by Department */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Appointments by Department
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="appointments"
                fill="#0EA5E9"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Citizens Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Citizens List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Phone
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Grievances
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Appointments
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {citizens.map((citizen) => (
                <tr
                  key={citizen.phone}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {citizen.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{citizen.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold text-sm">
                      {citizen.grievances.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm">
                      {citizen.appointments.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedCitizen(citizen)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Citizen Details Modal */}
      <Modal
        isOpen={!!selectedCitizen}
        onClose={() => setSelectedCitizen(null)}
        title={`${selectedCitizen?.name} - Detailed View`}
      >
        {selectedCitizen && (
          <div className="space-y-8">
            {/* Citizen Info */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-2xl font-bold text-blue-700">
                {selectedCitizen.phone}
              </p>
            </div>

            {/* Grievances Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="text-red-600" size={24} />
                Grievances ({selectedCitizen.grievances.length})
              </h3>
              {selectedCitizen.grievances.length > 0 ? (
                <div className="space-y-3">
                  {selectedCitizen.grievances.map((grievance) => (
                    <div
                      key={grievance.grievanceId}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {grievance.category}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            ID: {grievance.grievanceId}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Created:{" "}
                            {new Date(grievance.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4 ${
                            {
                              PENDING: "bg-red-100 text-red-700",
                              IN_PROGRESS: "bg-yellow-100 text-yellow-700",
                              RESOLVED: "bg-green-100 text-green-700",
                              REJECTED: "bg-purple-100 text-purple-700",
                            }[grievance.status]
                          }`}
                        >
                          {grievance.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No grievances found</p>
              )}
            </div>

            {/* Appointments Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600" size={24} />
                Appointments ({selectedCitizen.appointments.length})
              </h3>
              {selectedCitizen.appointments.length > 0 ? (
                <div className="space-y-3">
                  {selectedCitizen.appointments.map((appointment) => (
                    <div
                      key={appointment.appointmentId}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {appointment.department}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            ID: {appointment.appointmentId}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                            <p>
                              📅 Preferred:{" "}
                              {new Date(
                                appointment.preferredDate
                              ).toLocaleDateString()}
                            </p>
                            <p>🕐 Time: {appointment.preferredTime}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Created:{" "}
                            {new Date(appointment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4 ${
                            {
                              PENDING: "bg-red-100 text-red-700",
                              CONFIRMED: "bg-green-100 text-green-700",
                              CANCELLED: "bg-gray-100 text-gray-700",
                              COMPLETED: "bg-blue-100 text-blue-700",
                            }[appointment.status]
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No appointments found</p>
              )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Grievances</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {selectedCitizen.grievances.length}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {selectedCitizen.appointments.length}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {
                    selectedCitizen.grievances.filter(
                      (g) => g.status === "RESOLVED"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

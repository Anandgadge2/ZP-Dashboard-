"use client";

import { useEffect, useState } from "react";
import { getAllAppointments } from "@/services/appointmentApi";
import { Calendar, Search } from "lucide-react";

type Appointment = {
  appointmentId: string;
  userName: string;
  phone: string;
  department: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
};

const statusColors = {
  PENDING: "bg-red-100 text-red-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    getAllAppointments().then((res) => {
      setAppointments(res);
      setLoading(false);
    });
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      a.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    PENDING: appointments.filter((a) => a.status === "PENDING").length,
    CONFIRMED: appointments.filter((a) => a.status === "CONFIRMED").length,
    CANCELLED: appointments.filter((a) => a.status === "CANCELLED").length,
    COMPLETED: appointments.filter((a) => a.status === "COMPLETED").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Calendar className="text-blue-600" size={32} />
          Appointments
        </h1>
        <p className="text-gray-600">Manage and schedule citizen appointments</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Pending", count: statusCounts.PENDING, color: "red" },
          { label: "Confirmed", count: statusCounts.CONFIRMED, color: "green" },
          { label: "Cancelled", count: statusCounts.CANCELLED, color: "gray" },
          { label: "Completed", count: statusCounts.COMPLETED, color: "blue" },
        ].map((item) => (
          <div
            key={item.label}
            className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-4 rounded-lg border-l-4 border-${item.color}-500`}
          >
            <p className={`text-${item.color}-600 text-sm font-semibold uppercase`}>
              {item.label}
            </p>
            <p className={`text-3xl font-bold text-${item.color}-700 mt-1`}>
              {item.count}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, phone, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Appointment ID
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Citizen
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Department
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Preferred Date
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Time
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a) => (
                <tr
                  key={a.appointmentId}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-mono text-xs text-blue-600">
                    {a.appointmentId}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{a.userName}</p>
                    <p className="text-xs text-gray-500">{a.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {a.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(a.preferredDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {a.preferredTime}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[a.status]
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No appointments found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

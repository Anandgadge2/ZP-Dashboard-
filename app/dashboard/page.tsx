"use client";

import { useEffect, useState } from "react";
import { getAllGrievances } from "@/services/grievanceApi";
import { getAllAppointments } from "@/services/appointmentApi";
import { TrendingUp, AlertCircle, Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { Grievance } from "@/types/grievance";
import { Appointment } from "@/types/appointment";

export default function Dashboard() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllGrievances(), getAllAppointments()]).then(
      ([grievances, appointments]) => {
        setGrievances(grievances);
        setAppointments(appointments);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pendingGrievances = grievances.filter(
    (g) => g.status === "PENDING"
  ).length;

  const resolvedGrievances = grievances.filter(
    (g) => g.status === "RESOLVED"
  ).length;

  const confirmedAppointments = appointments.filter(
    (a) => a.status === "CONFIRMED"
  ).length;

  const completedAppointments = appointments.filter(
    (a) => a.status === "COMPLETED"
  ).length;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "PENDING"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to G2C Admin Dashboard</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-wide">Total Grievances</p>
              <p className="text-3xl font-bold text-red-700 mt-1">{grievances.length}</p>
            </div>
            <AlertCircle className="text-red-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-xs font-bold uppercase tracking-wide">Pending Grievances</p>
              <p className="text-3xl font-bold text-orange-700 mt-1">{pendingGrievances}</p>
            </div>
            <Clock className="text-orange-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-xs font-bold uppercase tracking-wide">Resolved Grievances</p>
              <p className="text-3xl font-bold text-green-700 mt-1">{resolvedGrievances}</p>
            </div>
            <CheckCircle className="text-green-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-wide">Total Appointments</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{appointments.length}</p>
            </div>
            <Calendar className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-5 rounded-lg shadow-md border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-600 text-xs font-bold uppercase tracking-wide">Confirmed Appointments</p>
              <p className="text-3xl font-bold text-cyan-700 mt-1">{confirmedAppointments}</p>
            </div>
            <CheckCircle className="text-cyan-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-bold uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-purple-700 mt-1">{completedAppointments}</p>
            </div>
            <TrendingUp className="text-purple-400" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grievances */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle size={20} />
              Recent Grievances
            </h2>
          </div>
          <div className="divide-y">
            {grievances.slice(0, 5).map((g) => (
              <div key={g.grievanceId} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{g.userName}</p>
                    <p className="text-sm text-gray-600 mt-1">{g.category}</p>
                    <p className="text-xs text-gray-500 mt-1">{g.phone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    {
                      PENDING: "bg-red-100 text-red-700",
                      IN_PROGRESS: "bg-yellow-100 text-yellow-700",
                      RESOLVED: "bg-green-100 text-green-700",
                      REJECTED: "bg-purple-100 text-purple-700",
                    }[g.status]
                  }`}>
                    {g.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar size={20} />
              Recent Appointments
            </h2>
          </div>
          <div className="divide-y">
            {appointments.slice(0, 5).map((a) => (
              <div key={a.appointmentId} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{a.userName}</p>
                    <p className="text-sm text-gray-600 mt-1">{a.department}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(a.preferredDate).toLocaleDateString()} at {a.preferredTime}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    {
                      PENDING: "bg-red-100 text-red-700",
                      CONFIRMED: "bg-green-100 text-green-700",
                      CANCELLED: "bg-gray-100 text-gray-700",
                      COMPLETED: "bg-blue-100 text-blue-700",
                    }[a.status]
                  }`}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

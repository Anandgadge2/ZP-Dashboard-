"use client";

import { useEffect, useState } from "react";
import { getAllGrievances } from "@/services/grievanceApi";
import { getAllAppointments } from "@/services/appointmentApi";
import { Users, Search } from "lucide-react";

type Citizen = {
  phone: string;
  name: string;
  grievances: number;
  appointments: number;
  totalItems: number;
};

export default function CitizensPage() {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    Promise.all([getAllGrievances(), getAllAppointments()]).then(
      ([grievances, appointments]) => {
        const map: Record<string, Citizen> = {};

        grievances.forEach((g: any) => {
          if (!map[g.phone]) {
            map[g.phone] = {
              phone: g.phone,
              name: g.userName,
              grievances: 0,
              appointments: 0,
              totalItems: 0,
            };
          }
          map[g.phone].grievances++;
          map[g.phone].totalItems++;
        });

        appointments.forEach((a: any) => {
          if (!map[a.phone]) {
            map[a.phone] = {
              phone: a.phone,
              name: a.userName,
              grievances: 0,
              appointments: 0,
              totalItems: 0,
            };
          }
          map[a.phone].appointments++;
          map[a.phone].totalItems++;
        });

        setCitizens(
          Object.values(map).sort((a, b) => b.totalItems - a.totalItems)
        );
        setLoading(false);
      }
    );
  }, []);

  const filteredCitizens = citizens.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

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
          <Users className="text-purple-600" size={32} />
          Citizens
        </h1>
        <p className="text-gray-600">Manage and view all citizen profiles</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
          <p className="text-purple-600 text-sm font-semibold uppercase">Total Citizens</p>
          <p className="text-4xl font-bold text-purple-700 mt-2">{citizens.length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-500">
          <p className="text-red-600 text-sm font-semibold uppercase">Total Grievances</p>
          <p className="text-4xl font-bold text-red-700 mt-2">
            {citizens.reduce((sum, c) => sum + c.grievances, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="text-blue-600 text-sm font-semibold uppercase">Total Appointments</p>
          <p className="text-4xl font-bold text-blue-700 mt-2">
            {citizens.reduce((sum, c) => sum + c.appointments, 0)}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCitizens.map((c) => (
            <div
              key={c.phone}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                  <p className="text-sm text-gray-500 font-mono">{c.phone}</p>
                </div>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {c.totalItems} Items
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{c.grievances}</p>
                  <p className="text-xs text-gray-500 mt-1">Grievances</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{c.appointments}</p>
                  <p className="text-xs text-gray-500 mt-1">Appointments</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Grievances
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Appointments
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Total Items
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCitizens.length > 0 ? (
                filteredCitizens.map((c) => (
                  <tr
                    key={c.phone}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{c.name}</td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                      {c.phone}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {c.grievances}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {c.appointments}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {c.totalItems}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No citizens found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

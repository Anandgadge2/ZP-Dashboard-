"use client";

import { useEffect, useState } from "react";
import { getAllGrievances } from "@/services/grievanceApi";
import { AlertCircle, Search } from "lucide-react";

type Grievance = {
  grievanceId: string;
  userName: string;
  phone: string;
  category: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
  description?: string;
  imageUrl?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  createdAt: string;
};

const statusColors = {
  PENDING: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
  REJECTED: "bg-purple-100 text-purple-700",
};

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    getAllGrievances().then((res) => {
      setGrievances(res);
      setLoading(false);
    });
  }, []);

  const filteredGrievances = grievances.filter((g) => {
    const matchesSearch =
      g.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      g.grievanceId.includes(searchTerm);
    const matchesFilter = filterStatus === "ALL" || g.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    PENDING: grievances.filter((g) => g.status === "PENDING").length,
    IN_PROGRESS: grievances.filter((g) => g.status === "IN_PROGRESS").length,
    RESOLVED: grievances.filter((g) => g.status === "RESOLVED").length,
    REJECTED: grievances.filter((g) => g.status === "REJECTED").length,
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
          <AlertCircle className="text-red-600" size={32} />
          Citizen Grievances
        </h1>
        <p className="text-gray-600">Manage and track all citizen grievances</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Pending", count: statusCounts.PENDING, color: "red" },
          { label: "In Progress", count: statusCounts.IN_PROGRESS, color: "yellow" },
          { label: "Resolved", count: statusCounts.RESOLVED, color: "green" },
          { label: "Rejected", count: statusCounts.REJECTED, color: "purple" },
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
              placeholder="Search by name, phone, or grievance ID..."
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
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Grievance ID
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Citizen
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Created Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredGrievances.length > 0 ? (
              filteredGrievances.map((g) => (
                <tr
                  key={g.grievanceId}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-mono text-xs text-blue-600">
                    {g.grievanceId}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{g.userName}</p>
                    <p className="text-xs text-gray-500">{g.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {g.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[g.status]
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(g.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No grievances found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

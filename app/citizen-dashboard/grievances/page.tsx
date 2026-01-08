"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, MapPin, Image as ImageIcon, Plus } from "lucide-react";
import CitizenSidebar from "@/components/CitizenSidebar";
import { createGrievance, getAllGrievances } from "@/services/grievanceApi";

interface Grievance {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  progress: number;
  location?: { lat: number; lng: number; address: string };
  images?: string[];
  category: string;
}

const mockGrievances: Grievance[] = [
  {
    id: "GR001",
    title: "Road Damage Issue in Sector 5",
    description: "Pothole and damaged road surface causing traffic hazards",
    status: "IN_PROGRESS",
    createdAt: "2025-12-15",
    updatedAt: "2026-01-08",
    progress: 65,
    category: "Infrastructure",
    location: { lat: 28.5355, lng: 77.3910, address: "Sector 5, New Delhi, India" },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3ERoad Damage Photo%3C/text%3E%3C/svg%3E",
    ],
  },
  {
    id: "GR002",
    title: "Water Supply Issue",
    description: "Irregular water supply in the locality",
    status: "RESOLVED",
    createdAt: "2025-11-10",
    updatedAt: "2026-01-05",
    progress: 100,
    category: "Utilities",
    location: { lat: 28.5244, lng: 77.3869, address: "Sector 12, New Delhi, India" },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EWater Issue Photo%3C/text%3E%3C/svg%3E",
    ],
  },
];

const statusConfig = {
  PENDING: { color: "red", label: "Pending", icon: "⏳" },
  IN_PROGRESS: { color: "yellow", label: "In Progress", icon: "⚙️" },
  RESOLVED: { color: "green", label: "Resolved", icon: "✓" },
  REJECTED: { color: "purple", label: "Rejected", icon: "✗" },
};

export default function CitizenGrievances() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [loggedInCitizen, setLoggedInCitizen] = useState<string | null>(null);
  const [showGrievanceForm, setShowGrievanceForm] = useState(false);
  const [grievanceForm, setGrievanceForm] = useState({
    title: "",
    description: "",
    category: "Infrastructure",
    location: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("citizenToken");
    if (!token) {
      router.push("/citizen-login");
      return;
    }

    const citizen = localStorage.getItem("citizenName");
    if (!citizen) {
      setIsLoading(false);
      return;
    }

    setLoggedInCitizen(citizen);
    
    // Fetch grievances from API
    const fetchGrievances = async () => {
      try {
        const res = await getAllGrievances();
        setGrievances(res);
      } catch (error) {
        console.error("Error fetching grievances:", error);
        // Fallback to mock data if API fails
        setGrievances(mockGrievances);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGrievances();
  }, [router]);

  const handleAddGrievance = async () => {
    if (!grievanceForm.title || !grievanceForm.description) {
      alert("Please fill in all required fields");
      return;
    }

    const newGrievance: Grievance = {
      id: `GR${Date.now()}`,
      title: grievanceForm.title,
      description: grievanceForm.description,
      status: "PENDING",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      progress: 0,
      category: grievanceForm.category,
      location: {
        lat: 28.5355,
        lng: 77.391,
        address: grievanceForm.location || "Not specified",
      },
    };

    try {
      // POST to backend
      const createdGrievance = await createGrievance(newGrievance);
      
      // Add to local state
      setGrievances([createdGrievance, ...grievances]);
      setGrievanceForm({
        title: "",
        description: "",
        category: "Infrastructure",
        location: "",
      });
      setShowGrievanceForm(false);
      alert("Grievance submitted successfully!");
    } catch (error) {
      console.error("Error creating grievance:", error);
      alert("Failed to submit grievance. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
        <CitizenSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your grievances...</p>
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = grievances.filter((g) => g.status === "PENDING").length;
  const inProgressCount = grievances.filter((g) => g.status === "IN_PROGRESS").length;
  const resolvedCount = grievances.filter((g) => g.status === "RESOLVED").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      <CitizenSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Grievances</h1>
                <p className="text-gray-600 text-sm mt-1">Track and manage your complaints</p>
              </div>
              <button onClick={() => setShowGrievanceForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Plus size={20} />
                New Grievance
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition">
              <p className="text-gray-600 text-sm font-semibold mb-2">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
              <p className="text-gray-600 text-sm font-semibold mb-2">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
              <p className="text-gray-600 text-sm font-semibold mb-2">Resolved</p>
              <p className="text-3xl font-bold text-gray-900">{resolvedCount}</p>
            </div>
          </div>

          {/* Grievances List */}
          <div className="space-y-4">
            {grievances.length > 0 ? (
              grievances.map((grievance, index) => {
                const config = statusConfig[grievance.status as keyof typeof statusConfig];
                return (
                  <div
                    key={grievance.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-blue-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{config.icon}</span>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                              {grievance.id}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                              {grievance.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{grievance.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{grievance.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>📅 Filed: {new Date(grievance.createdAt).toLocaleDateString()}</span>
                            <span>🔄 Updated: {new Date(grievance.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${config.color}-100 text-${config.color}-700`}
                          >
                            {config.label}
                          </span>
                          <button
                            onClick={() => setSelectedGrievance(grievance)}
                            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${grievance.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{grievance.progress}% Complete</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-blue-100">
                <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No grievances filed yet</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  File a Grievance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grievance Detail Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 flex justify-between items-center sticky top-0">
              <div>
                <h2 className="text-2xl font-bold">{selectedGrievance.title}</h2>
                <p className="text-red-100 text-sm">{selectedGrievance.category}</p>
              </div>
              <button
                onClick={() => setSelectedGrievance(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-800 text-lg">{selectedGrievance.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Filed On</p>
                  <p className="text-lg font-bold text-gray-900">{new Date(selectedGrievance.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Last Updated</p>
                  <p className="text-lg font-bold text-gray-900">{new Date(selectedGrievance.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedGrievance.location && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-700 text-sm mt-1">{selectedGrievance.location.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedGrievance.images && selectedGrievance.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon size={20} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Evidence Photos</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedGrievance.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-gray-600 text-sm font-semibold mb-4">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${selectedGrievance.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{selectedGrievance.progress}% Complete</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Current Status</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${
                    statusConfig[selectedGrievance.status as keyof typeof statusConfig]?.color
                  }-100 text-${statusConfig[selectedGrievance.status as keyof typeof statusConfig]?.color}-700`}
                >
                  {statusConfig[selectedGrievance.status as keyof typeof statusConfig]?.label}
                </span>
              </div>

              <button
                onClick={() => setSelectedGrievance(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showGrievanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">File New Grievance</h2>
              <p className="text-blue-100 text-sm mt-1">Describe your complaint in detail</p>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Grievance Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Pothole on Main Street"
                  value={grievanceForm.title}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Description *</label>
                <textarea
                  placeholder="Please provide detailed information about your grievance..."
                  value={grievanceForm.description}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-32 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Category</label>
                  <select
                    value={grievanceForm.category}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                  >
                    <option>Infrastructure</option>
                    <option>Water Supply</option>
                    <option>Sanitation</option>
                    <option>Road Damage</option>
                    <option>Street Light</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Sector 5, Block A"
                    value={grievanceForm.location}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddGrievance}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Submit Grievance
                </button>
                <button
                  onClick={() => setShowGrievanceForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

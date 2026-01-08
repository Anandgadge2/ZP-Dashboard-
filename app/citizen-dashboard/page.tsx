"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Calendar, Eye, MapPin, Image as ImageIcon, BarChart3, CheckCircle, Clock } from "lucide-react";
import CitizenSidebar from "@/components/CitizenSidebar";

interface Application {
  id: string;
  type: "grievance" | "appointment";
  title: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "COMPLETED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  progress: number;
  location?: { lat: number; lng: number; address: string };
  images?: string[];
  citizenName?: string;
  citizenPhone?: string;
  citizenEmail?: string;
}

const mockApplications: Application[] = [
  {
    id: "GR001",
    type: "grievance",
    title: "Road Damage Issue in Sector 5",
    status: "IN_PROGRESS",
    createdAt: "2025-12-15",
    updatedAt: "2026-01-08",
    progress: 65,
    location: { lat: 28.5355, lng: 77.3910, address: "Sector 5, New Delhi, India" },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3ERoad Damage Photo 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3ERoad Damage Photo 2%3C/text%3E%3C/svg%3E",
    ],
    citizenName: "Rajesh Kumar",
    citizenPhone: "+91 9876543210",
    citizenEmail: "rajesh@example.com",
  },
  {
    id: "AP001",
    type: "appointment",
    title: "Municipal Office Appointment",
    status: "COMPLETED",
    createdAt: "2025-12-20",
    updatedAt: "2026-01-08",
    progress: 100,
    location: { lat: 28.6139, lng: 77.2090, address: "Municipal Office, Delhi, India" },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EAppointment Proof%3C/text%3E%3C/svg%3E",
    ],
    citizenName: "Priya Singh",
    citizenPhone: "+91 9123456789",
    citizenEmail: "priya@example.com",
  },
  {
    id: "GR002",
    type: "grievance",
    title: "Water Supply Issue",
    status: "RESOLVED",
    createdAt: "2025-11-10",
    updatedAt: "2026-01-05",
    progress: 100,
    location: { lat: 28.5244, lng: 77.3869, address: "Sector 12, New Delhi, India" },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EWater Supply Photo%3C/text%3E%3C/svg%3E",
    ],
    citizenName: "Amit Patel",
    citizenPhone: "+91 9876123456",
    citizenEmail: "amit@example.com",
  },
];

const statusConfig = {
  PENDING: { color: "red", label: "Pending", icon: "⏳" },
  IN_PROGRESS: { color: "yellow", label: "In Progress", icon: "⚙️" },
  RESOLVED: { color: "green", label: "Resolved", icon: "✓" },
  REJECTED: { color: "purple", label: "Rejected", icon: "✗" },
  CONFIRMED: { color: "green", label: "Confirmed", icon: "✓" },
  COMPLETED: { color: "blue", label: "Completed", icon: "✓" },
  CANCELLED: { color: "gray", label: "Cancelled", icon: "✗" },
};

export default function CitizenDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [loggedInCitizen, setLoggedInCitizen] = useState<string | null>(null);
  const [accessError, setAccessError] = useState<string | null>(null);
  const [showGrievanceForm, setShowGrievanceForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [grievanceForm, setGrievanceForm] = useState({
    title: "",
    description: "",
    category: "Road Damage",
    location: "",
  });
  const [appointmentForm, setAppointmentForm] = useState({
    title: "",
    description: "",
    department: "Municipal Office",
    date: "",
    time: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("citizenToken");
    if (!token) {
      router.push("/citizen-login");
      return;
    }

    // Get the logged-in citizen's name from localStorage
    const citizen = localStorage.getItem("citizenName");
    if (!citizen) {
      setAccessError("Session expired. Please login again.");
      setIsLoading(false);
      return;
    }

    setLoggedInCitizen(citizen);

    // Simulate API call - Filter to show only THIS citizen's applications
    setTimeout(() => {
      // Only show applications that belong to the logged-in citizen
      const filteredApplications = mockApplications.filter(
        (app) => app.citizenName === citizen
      );
      setApplications(filteredApplications);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("citizenToken");
    localStorage.removeItem("citizenName");
    router.push("/citizen-login");
  };

  const handleAddGrievance = () => {
    if (!grievanceForm.title || !grievanceForm.description) {
      alert("Please fill in all required fields");
      return;
    }

    const newGrievance: Application = {
      id: `GR${Date.now()}`,
      type: "grievance",
      title: grievanceForm.title,
      status: "PENDING",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      progress: 0,
      location: { lat: 28.5355, lng: 77.3910, address: grievanceForm.location || "Not specified" },
      citizenName: loggedInCitizen || "Unknown",
      citizenPhone: "+91 9876543210",
      citizenEmail: "citizen@example.com",
    };

    setApplications([newGrievance, ...applications]);
    setGrievanceForm({ title: "", description: "", category: "Road Damage", location: "" });
    setShowGrievanceForm(false);
    alert("Grievance submitted successfully!");
  };

  const handleAddAppointment = () => {
    if (!appointmentForm.title || !appointmentForm.date || !appointmentForm.time) {
      alert("Please fill in all required fields");
      return;
    }

    const newAppointment: Application = {
      id: `AP${Date.now()}`,
      type: "appointment",
      title: appointmentForm.title,
      status: "PENDING",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      progress: 0,
      location: { lat: 28.6139, lng: 77.2090, address: "Government Office" },
      citizenName: loggedInCitizen || "Unknown",
      citizenPhone: "+91 9876543210",
      citizenEmail: "citizen@example.com",
    };

    setApplications([newAppointment, ...applications]);
    setAppointmentForm({ title: "", description: "", department: "Municipal Office", date: "", time: "" });
    setShowAppointmentForm(false);
    alert("Appointment booked successfully!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
        <CitizenSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your applications...</p>
          </div>
        </div>
      </div>
    );
  }

  const grievanceCount = applications.filter((a) => a.type === "grievance").length;
  const appointmentCount = applications.filter((a) => a.type === "appointment").length;
  const resolvedCount = applications.filter((a) => a.status === "RESOLVED" || a.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex overflow-hidden">
      {/* Sidebar */}
      <CitizenSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">
              {loggedInCitizen ? `Welcome back, ${loggedInCitizen}` : "Your portal overview"}
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-6xl mx-auto w-full px-8 py-8 overflow-y-auto">
        {/* Access Control Message */}
        {loggedInCitizen && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </div>
            <div>
              <p className="text-green-800 font-semibold text-sm">Welcome to Your Dashboard</p>
              <p className="text-green-700 text-xs mt-1">
                Access all your grievances, appointments, and government services in one place
              </p>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Grievances</p>
                <p className="text-3xl font-bold text-gray-900">{grievanceCount}</p>
              </div>
              <AlertCircle className="text-red-500" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Appointments</p>
                <p className="text-3xl font-bold text-gray-900">{appointmentCount}</p>
              </div>
              <Calendar className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Resolved</p>
                <p className="text-3xl font-bold text-gray-900">{resolvedCount}</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">
                  {applications.filter((a) => a.status === "PENDING").length}
                </p>
              </div>
              <Clock className="text-yellow-500" size={32} />
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border-2 border-red-200 hover:shadow-lg transition text-left cursor-pointer" onClick={() => router.push("/citizen-dashboard/grievances")}>
            <AlertCircle className="text-red-600 mb-2" size={28} />
            <h3 className="font-bold text-gray-900">My Grievances</h3>
            <p className="text-sm text-gray-600 mt-1">View all filed complaints</p>
            <p className="text-xs text-gray-500 mt-2">{grievanceCount} grievances filed</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition text-left cursor-pointer" onClick={() => router.push("/citizen-dashboard/appointments")}>
            <Calendar className="text-blue-600 mb-2" size={28} />
            <h3 className="font-bold text-gray-900">My Appointments</h3>
            <p className="text-sm text-gray-600 mt-1">View all appointments</p>
            <p className="text-xs text-gray-500 mt-2">{appointmentCount} appointments</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition text-left cursor-pointer" onClick={() => router.push("/citizen-dashboard/gservices")}>
            <BarChart3 className="text-purple-600 mb-2" size={28} />
            <h3 className="font-bold text-gray-900">Gov. Services</h3>
            <p className="text-sm text-gray-600 mt-1\">Access government services</p>
            <p className="text-xs text-gray-500 mt-2">24 services available</p>
          </div>
        </div>

        {/* Recent Applications Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.slice(0, 3).map((app, index) => {
                const config = statusConfig[app.status as keyof typeof statusConfig];
                return (
                  <div
                    key={app.id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{config.icon}</span>
                        <h4 className="font-semibold text-gray-900">{app.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {app.type === "grievance" ? "Grievance" : "Appointment"} • {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${config.color}-100 text-${config.color}-700 whitespace-nowrap`}
                    >
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-slide-up">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedApp.title}</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-2xl font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Application ID</p>
                  <p className="text-lg font-mono text-gray-900">{selectedApp.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Type</p>
                  <p className="text-lg text-gray-900">
                    {selectedApp.type === "grievance" ? "Grievance" : "Appointment"}
                  </p>
                </div>
              </div>

              {/* Citizen Information */}
              {selectedApp.citizenName && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Citizen Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600 text-xs font-semibold mb-1">Name</p>
                      <p className="text-gray-900 font-medium">{selectedApp.citizenName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold mb-1">Phone</p>
                      <p className="text-gray-900 font-medium cursor-pointer hover:text-blue-600">
                        {selectedApp.citizenPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold mb-1">Email</p>
                      <p className="text-gray-900 font-medium cursor-pointer hover:text-blue-600">
                        {selectedApp.citizenEmail}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Location Information */}
              {selectedApp.location && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-700 text-sm mt-1">{selectedApp.location.address}</p>
                      <p className="text-gray-600 text-xs mt-2">
                        Coordinates: {selectedApp.location.lat.toFixed(4)}, {selectedApp.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Images Gallery */}
              {selectedApp.images && selectedApp.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon size={20} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Uploaded Images</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedApp.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                      >
                        <img
                          src={image}
                          alt={`Application ${idx + 1}`}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Current Status</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${
                    statusConfig[selectedApp.status as keyof typeof statusConfig]?.color
                  }-100 text-${statusConfig[selectedApp.status as keyof typeof statusConfig]?.color}-700`}
                >
                  {statusConfig[selectedApp.status as keyof typeof statusConfig]?.label}
                </span>
              </div>

              <div>
                <p className="text-gray-600 text-sm font-semibold mb-4">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${selectedApp.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{selectedApp.progress}% Complete</p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Created On</p>
                  <p className="text-gray-900">{new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">Last Updated</p>
                  <p className="text-gray-900">{new Date(selectedApp.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> This dashboard shows your full application details including location, photos,
                  and citizen information. Your grievance is being actively tracked and processed.
                </p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grievance Form Modal */}
      {showGrievanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">File a New Grievance</h2>
              <button
                onClick={() => setShowGrievanceForm(false)}
                className="text-2xl font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Road Damage, Water Supply Issue"
                  value={grievanceForm.title}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={grievanceForm.category}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option>Road Damage</option>
                  <option>Water Supply</option>
                  <option>Electricity</option>
                  <option>Sanitation</option>
                  <option>Public Safety</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  placeholder="Describe your grievance in detail..."
                  value={grievanceForm.description}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Sector 5, New Delhi"
                  value={grievanceForm.location}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddGrievance}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition"
                >
                  Submit Grievance
                </button>
                <button
                  onClick={() => setShowGrievanceForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Book an Appointment</h2>
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="text-2xl font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Document Verification, License Renewal"
                  value={appointmentForm.title}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  value={appointmentForm.department}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Municipal Office</option>
                  <option>Revenue Department</option>
                  <option>Health Department</option>
                  <option>Education Department</option>
                  <option>Public Works</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe your appointment purpose..."
                  value={appointmentForm.description}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                  <input
                    type="time"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddAppointment}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setShowAppointmentForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition"
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
              
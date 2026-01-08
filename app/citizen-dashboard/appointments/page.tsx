"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, MapPin, Image as ImageIcon, Plus, Calendar } from "lucide-react";
import CitizenSidebar from "@/components/CitizenSidebar";
import { createAppointment, getAllAppointments } from "@/services/appointmentApi";

interface Appointment {
  id: string;
  title: string;
  description: string;
  department: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  appointmentDate: string;
  appointmentTime: string;
  createdAt: string;
  location?: { lat: number; lng: number; address: string };
  images?: string[];
}

const mockAppointments: Appointment[] = [
  {
    id: "AP001",
    title: "Municipal Office Appointment",
    description: "Appointment for property tax registration",
    department: "Municipal Corporation",
    status: "COMPLETED",
    appointmentDate: "2026-01-08",
    appointmentTime: "10:00 AM",
    createdAt: "2025-12-20",
    location: { lat: 28.6139, lng: 77.2090, address: "Municipal Office, New Delhi, India" },
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EAppointment Confirmation%3C/text%3E%3C/svg%3E",
    ],
  },
  {
    id: "AP002",
    title: "Revenue Department Meeting",
    description: "Appointment for birth certificate registration",
    department: "Revenue Department",
    status: "CONFIRMED",
    appointmentDate: "2026-01-15",
    appointmentTime: "02:00 PM",
    createdAt: "2026-01-05",
    location: { lat: 28.5355, lng: 77.3910, address: "Revenue Office, Sector 5, Delhi" },
    images: [],
  },
];

const statusConfig = {
  PENDING: { color: "yellow", label: "Pending", icon: "⏳" },
  CONFIRMED: { color: "green", label: "Confirmed", icon: "✓" },
  COMPLETED: { color: "blue", label: "Completed", icon: "✓" },
  CANCELLED: { color: "red", label: "Cancelled", icon: "✗" },
};

export default function CitizenAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loggedInCitizen, setLoggedInCitizen] = useState<string | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    title: "",
    description: "",
    department: "Municipal Corporation",
    appointmentDate: "",
    appointmentTime: "",
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

    setTimeout(() => {
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 500);
  }, [router]);

  const handleAddAppointment = async () => {
    if (
      !appointmentForm.title ||
      !appointmentForm.description ||
      !appointmentForm.appointmentDate ||
      !appointmentForm.appointmentTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newAppointment: Appointment = {
      id: `AP${Date.now()}`,
      title: appointmentForm.title,
      description: appointmentForm.description,
      department: appointmentForm.department,
      status: "PENDING",
      appointmentDate: appointmentForm.appointmentDate,
      appointmentTime: appointmentForm.appointmentTime,
      createdAt: new Date().toISOString().split("T")[0],
      location: {
        lat: 28.5355,
        lng: 77.391,
        address: "New Delhi",
      },
    };

    try {
      // POST to backend
      const createdAppointment = await createAppointment(newAppointment);
      
      // Add to local state
      setAppointments([createdAppointment, ...appointments]);
      setAppointmentForm({
        title: "",
        description: "",
        department: "Municipal Corporation",
        appointmentDate: "",
        appointmentTime: "",
      });
      setShowAppointmentForm(false);
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
        <CitizenSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  const upcomingCount = appointments.filter((a) => a.status === "CONFIRMED" || a.status === "PENDING").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelledCount = appointments.filter((a) => a.status === "CANCELLED").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      <CitizenSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-600 text-sm mt-1">Schedule and manage your appointments</p>
              </div>
              <button onClick={() => setShowAppointmentForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Plus size={20} />
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
              <p className="text-gray-600 text-sm font-semibold mb-2">Upcoming</p>
              <p className="text-3xl font-bold text-gray-900">{upcomingCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
              <p className="text-gray-600 text-sm font-semibold mb-2">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition">
              <p className="text-gray-600 text-sm font-semibold mb-2">Cancelled</p>
              <p className="text-3xl font-bold text-gray-900">{cancelledCount}</p>
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => {
                const config = statusConfig[appointment.status as keyof typeof statusConfig];
                return (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-blue-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{config.icon}</span>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                              {appointment.id}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                              {appointment.department}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{appointment.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{appointment.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              📅 {new Date(appointment.appointmentDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              🕐 {appointment.appointmentTime}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${config.color}-100 text-${config.color}-700`}
                          >
                            {config.label}
                          </span>
                          <button
                            onClick={() => setSelectedAppointment(appointment)}
                            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm ml-auto"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Quick Status */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} />
                        <span>
                          {appointment.status === "COMPLETED"
                            ? "Appointment completed"
                            : appointment.status === "CONFIRMED"
                              ? "Confirmed - Ready for appointment"
                              : "Pending confirmation"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-blue-100">
                <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No appointments scheduled</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  Book an Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-6 flex justify-between items-center sticky top-0">
              <div>
                <h2 className="text-2xl font-bold">{selectedAppointment.title}</h2>
                <p className="text-green-100 text-sm">{selectedAppointment.department}</p>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-800 text-lg">{selectedAppointment.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Appointment Date</p>
                  <p className="text-lg font-bold text-gray-900">{new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Appointment Time</p>
                  <p className="text-lg font-bold text-gray-900">{selectedAppointment.appointmentTime}</p>
                </div>
              </div>

              {selectedAppointment.location && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-700 text-sm mt-1">{selectedAppointment.location.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedAppointment.images && selectedAppointment.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon size={20} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Attachments</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedAppointment.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Attachment ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Current Status</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${
                    statusConfig[selectedAppointment.status as keyof typeof statusConfig]?.color
                  }-100 text-${statusConfig[selectedAppointment.status as keyof typeof statusConfig]?.color}-700`}
                >
                  {statusConfig[selectedAppointment.status as keyof typeof statusConfig]?.label}
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Please arrive 15 minutes before your scheduled appointment time.
                </p>
              </div>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-xl border border-blue-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Book New Appointment</h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-1">Schedule your appointment with government office</p>
            </div>
            <form className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Appointment Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Property Registration"
                  value={appointmentForm.title}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, title: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Description *</label>
                <textarea
                  placeholder="Please provide details about your appointment..."
                  value={appointmentForm.description}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, description: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-24 sm:h-32 resize-none text-sm sm:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Department</label>
                  <select
                    value={appointmentForm.department}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, department: e.target.value })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-sm sm:text-base"
                  >
                    <option>Municipal Corporation</option>
                    <option>Revenue Department</option>
                    <option>Water Supply</option>
                    <option>Health Department</option>
                    <option>Education Department</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Date *</label>
                    <input
                      type="date"
                      value={appointmentForm.appointmentDate}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, appointmentDate: e.target.value })}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Time *</label>
                    <input
                      type="time"
                      value={appointmentForm.appointmentTime}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, appointmentTime: e.target.value })}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={handleAddAppointment}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  FileText,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  description: string;
  department: string;
  processingTime: string;
  requiredDocuments: string[];
  icon: React.ReactNode;
  color: string;
  status: "active" | "maintenance";
}

const ZP_SERVICES: Service[] = [
  {
    id: "1",
    name: "Birth Certificate",
    description:
      "Registration and issuance of birth certificates for newborns and delayed registrations",
    department: "Registration Department",
    processingTime: "7-10 Business Days",
    requiredDocuments: [
      "Birth notification form",
      "Parents ID proof",
      "Address proof",
    ],
    icon: <FileText size={32} />,
    color: "blue",
    status: "active",
  },
  {
    id: "2",
    name: "Death Certificate",
    description:
      "Issuance of death certificates for deceased individuals with proper documentation",
    department: "Registration Department",
    processingTime: "5-7 Business Days",
    requiredDocuments: ["Death notification", "Medical certificate", "ID proof"],
    icon: <AlertCircle size={32} />,
    color: "gray",
    status: "active",
  },
  {
    id: "3",
    name: "Marriage Certificate",
    description:
      "Registration of marriages and issuance of marriage certificates",
    department: "Registration Department",
    processingTime: "10-15 Business Days",
    requiredDocuments: [
      "Marriage application form",
      "ID proofs of both parties",
      "Witness documents",
    ],
    icon: <CheckCircle size={32} />,
    color: "red",
    status: "active",
  },
  {
    id: "4",
    name: "Property Registration",
    description:
      "Registration of immovable property and transfer of property ownership",
    department: "Land Records Department",
    processingTime: "30-45 Days",
    requiredDocuments: [
      "Sale deed",
      "ID proofs",
      "Survey documents",
      "Tax receipts",
    ],
    icon: <MapPin size={32} />,
    color: "green",
    status: "active",
  },
  {
    id: "5",
    name: "Water Supply Connection",
    description:
      "New water supply connections and complaint resolution for water supply issues",
    department: "Public Works Department",
    processingTime: "15-20 Business Days",
    requiredDocuments: ["Application form", "Property proof", "ID proof"],
    icon: <Zap size={32} />,
    color: "cyan",
    status: "active",
  },
  {
    id: "6",
    name: "Sanitation Services",
    description:
      "Waste management, street cleaning, and sanitation-related grievances",
    department: "Sanitation Department",
    processingTime: "Immediate - 3 Days",
    requiredDocuments: ["Complaint form", "Photos of issue"],
    icon: <Shield size={32} />,
    color: "purple",
    status: "active",
  },
  {
    id: "7",
    name: "Road Maintenance",
    description:
      "Pothole filling, road repairs, and street infrastructure maintenance",
    department: "Public Works Department",
    processingTime: "5-10 Business Days",
    requiredDocuments: ["Location details", "Photos of damage"],
    icon: <CheckCircle size={32} />,
    color: "orange",
    status: "active",
  },
  {
    id: "8",
    name: "Municipal Appointment",
    description: "Schedule appointments with municipal officers for various services",
    department: "Administrative Department",
    processingTime: "Same Day - 3 Days",
    requiredDocuments: ["Appointment request", "ID proof"],
    icon: <Clock size={32} />,
    color: "indigo",
    status: "active",
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-50 to-blue-100 border-blue-300",
  gray: "from-gray-50 to-gray-100 border-gray-300",
  red: "from-red-50 to-red-100 border-red-300",
  green: "from-green-50 to-green-100 border-green-300",
  cyan: "from-cyan-50 to-cyan-100 border-cyan-300",
  purple: "from-purple-50 to-purple-100 border-purple-300",
  orange: "from-orange-50 to-orange-100 border-orange-300",
  indigo: "from-indigo-50 to-indigo-100 border-indigo-300",
};

const iconColorMap: Record<string, string> = {
  blue: "text-blue-600",
  gray: "text-gray-600",
  red: "text-red-600",
  green: "text-green-600",
  cyan: "text-cyan-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  indigo: "text-indigo-600",
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = ZP_SERVICES.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">ZP Amravati Services</h1>
          <p className="text-lg text-blue-100 mb-8">
            Comprehensive list of services provided by Zilla Parishad, Amravati
          </p>

          {/* Search Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
            <Users size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">
              Our team is available round the clock to assist you
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-600">
            <CheckCircle size={32} className="text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Quick Processing
            </h3>
            <p className="text-gray-600 text-sm">
              Fast and efficient processing of all requests
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-600">
            <Shield size={32} className="text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-600 text-sm">
              Your data is safe and protected with us
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`bg-gradient-to-br ${colorMap[service.color]} border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <div className={`${iconColorMap[service.color]} mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">
                  {service.department}
                </span>
                {service.status === "active" && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No services found</p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Phone size={40} className="text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Phone Number
                </h3>
                <p className="text-gray-600">+91 (0722) 2231000</p>
                <p className="text-gray-500 text-sm">Mon-Fri: 9 AM - 6 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail size={40} className="text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">info@zpamravati.gov.in</p>
                <p className="text-gray-500 text-sm">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin size={40} className="text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-600">
                  Zilla Parishad Office, Amravati
                </p>
                <p className="text-gray-500 text-sm">Maharashtra 444601</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div
              className={`bg-gradient-to-r from-${selectedService.color}-500 to-${selectedService.color}-600 text-white px-8 py-6 flex justify-between items-center sticky top-0`}
            >
              <div className="flex items-center gap-4">
                <div className="text-white">{selectedService.icon}</div>
                <h2 className="text-2xl font-bold">{selectedService.name}</h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-2xl font-bold hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{selectedService.description}</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Clock size={20} className="text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600 font-semibold mb-1">
                    Processing Time
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedService.processingTime}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <Users size={20} className="text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600 font-semibold mb-1">
                    Department
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedService.department}
                  </p>
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-orange-600" />
                  Required Documents
                </h3>
                <ul className="space-y-2">
                  {selectedService.requiredDocuments.map((doc, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <Link
                  href="/citizen-login"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, X, Clock, Users, CheckCircle, ExternalLink, BadgeCheck, Zap, ArrowRight, AlertCircle } from "lucide-react";
import CitizenSidebar from "@/components/CitizenSidebar";

interface Service {
  id: string;
  category: "csc" | "maharashtra";
  categoryName: string;
  name: string;
  description: string;
  department: string;
  processingTime: string;
  requiredDocuments: string[];
  icon: string;
  color: string;
  link: string;
  benefits: string[];
}

const services: Service[] = [
  // CSC Services
  {
    id: "csc-001",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "Aadhaar Services",
    description: "Get your Aadhaar card - India's unique identification number",
    department: "UIDAI",
    processingTime: "Same day",
    requiredDocuments: ["Birth Certificate", "Address Proof", "Photo ID"],
    icon: "🔐",
    color: "from-blue-400 to-blue-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Unique ID", "Digital Access", "Financial Services"],
  },
  {
    id: "csc-002",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "Ayushman Bharat",
    description: "Health insurance coverage for eligible families",
    department: "Ministry of Health",
    processingTime: "3-5 days",
    requiredDocuments: ["Ration Card", "Address Proof", "Income Certificate"],
    icon: "⚕️",
    color: "from-red-400 to-red-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Health Coverage", "Hospital Access", "Free Treatment"],
  },
  {
    id: "csc-003",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "PAN Card",
    description: "Permanent Account Number for tax purposes",
    department: "Income Tax Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Birth Certificate", "Address Proof", "Identity Proof"],
    icon: "💳",
    color: "from-green-400 to-green-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Tax Filing", "Financial Transactions", "Employment"],
  },
  {
    id: "csc-004",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "Passport",
    description: "International travel document",
    department: "Ministry of External Affairs",
    processingTime: "15-30 days",
    requiredDocuments: ["Birth Certificate", "Address Proof", "Photos", "Form 16"],
    icon: "🛂",
    color: "from-purple-400 to-purple-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["International Travel", "Visa Processing", "Global Identity"],
  },
  {
    id: "csc-005",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "e-Shram",
    description: "Universal social security account for workers",
    department: "Ministry of Labour",
    processingTime: "Instant",
    requiredDocuments: ["Aadhar", "Bank Account Details", "Mobile Number"],
    icon: "👷",
    color: "from-orange-400 to-orange-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Social Security", "Insurance Coverage", "Pension Eligibility"],
  },
  {
    id: "csc-006",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "LPG Services",
    description: "Liquefied Petroleum Gas connection and refills",
    department: "Ministry of Petroleum",
    processingTime: "2-3 days",
    requiredDocuments: ["Address Proof", "Identity Proof", "Bank Account"],
    icon: "🔥",
    color: "from-yellow-400 to-yellow-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Safe Cooking", "Subsidy Access", "Online Booking"],
  },
  {
    id: "csc-007",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "National Pension Scheme",
    description: "Retirement savings and pension benefits",
    department: "Ministry of Finance",
    processingTime: "5-7 days",
    requiredDocuments: ["Pan Card", "Identity Proof", "Address Proof", "Bank Details"],
    icon: "🏦",
    color: "from-indigo-400 to-indigo-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Retirement Fund", "Tax Benefits", "Investment Growth"],
  },
  {
    id: "csc-008",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "Pradhan Mantri Shram Yogi Maandhan",
    description: "Pension scheme for unorganized workers",
    department: "Ministry of Labour",
    processingTime: "Same day",
    requiredDocuments: ["Aadhar", "Bank Account", "Mobile Number"],
    icon: "💰",
    color: "from-emerald-400 to-emerald-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Pension Income", "Social Security", "Secure Future"],
  },
  {
    id: "csc-009",
    category: "csc",
    categoryName: "Common Service Centers",
    name: "Jeevan Pramaan",
    description: "Digital life certificate for pensioners",
    department: "Ministry of Finance",
    processingTime: "Same day",
    requiredDocuments: ["Aadhar", "Pensioner ID", "Biometric Data"],
    icon: "📋",
    color: "from-cyan-400 to-cyan-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Easy Verification", "Online Process", "Continuous Pension"],
  },

  // Maharashtra Services
  {
    id: "mh-001",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Birth Certificate",
    description: "Official record of birth for registration purposes",
    department: "Revenue Department",
    processingTime: "5-7 days",
    requiredDocuments: ["Hospital Records", "Parent ID", "Address Proof"],
    icon: "👶",
    color: "from-pink-400 to-pink-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Document", "School Admission", "Identity Proof"],
  },
  {
    id: "mh-002",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Death Certificate",
    description: "Official record of death registration",
    department: "Revenue Department",
    processingTime: "5-7 days",
    requiredDocuments: ["Medical Certificate", "Family ID", "Address Proof"],
    icon: "📝",
    color: "from-slate-500 to-slate-700",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Document", "Insurance Claims", "Property Transfer"],
  },
  {
    id: "mh-003",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Marriage Certificate",
    description: "Legal document for marriage registration",
    department: "Revenue Department",
    processingTime: "10-15 days",
    requiredDocuments: ["Wedding Invitation", "Photos", "ID Proof", "Address Proof"],
    icon: "💍",
    color: "from-rose-400 to-rose-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Recognition", "Name Change", "Joint Applications"],
  },
  {
    id: "mh-004",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Income Certificate",
    description: "Proof of annual family income for benefits",
    department: "Revenue Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Tax Return", "Salary Certificate", "Bank Statement"],
    icon: "📊",
    color: "from-amber-400 to-amber-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Scholarship Access", "Educational Benefits", "Government Aid"],
  },
  {
    id: "mh-005",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Caste Certificate",
    description: "Document proving caste category for reservations",
    department: "Revenue Department",
    processingTime: "15-20 days",
    requiredDocuments: ["Birth Certificate", "Parent ID", "Caste Record"],
    icon: "🎖️",
    color: "from-lime-400 to-lime-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Reservation Benefits", "Educational Quota", "Job Opportunities"],
  },
  {
    id: "mh-006",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Domicile Certificate",
    description: "Proof of residence in Maharashtra",
    department: "Revenue Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Address Proof", "Rent Agreement", "Electricity Bill"],
    icon: "🏠",
    color: "from-teal-400 to-teal-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Local Status", "Educational Concession", "Job Reservation"],
  },
  {
    id: "mh-007",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Senior Citizen Certificate",
    description: "Benefits and discounts for senior citizens",
    department: "Social Welfare",
    processingTime: "5-7 days",
    requiredDocuments: ["Age Proof", "ID Proof", "Address Proof"],
    icon: "👴",
    color: "from-violet-400 to-violet-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Senior Discounts", "Healthcare Benefits", "Pension Access"],
  },
  {
    id: "mh-008",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Water Connection",
    description: "Residential water supply connection",
    department: "Municipal Corporation",
    processingTime: "7-15 days",
    requiredDocuments: ["Property Document", "Address Proof", "ID Proof"],
    icon: "💧",
    color: "from-blue-300 to-blue-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Clean Water Supply", "Bill Transparency", "Emergency Service"],
  },
  {
    id: "mh-009",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Shop & Establishment License",
    description: "Business registration and license",
    department: "Labour Department",
    processingTime: "10-15 days",
    requiredDocuments: ["Business Plan", "Address Proof", "ID Proof", "Tax Registration"],
    icon: "🏪",
    color: "from-orange-300 to-orange-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Business", "Worker Protection", "Tax Benefits"],
  },
  {
    id: "mh-010",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Driving License",
    description: "Authorization to drive vehicles on roads",
    department: "Transport Department",
    processingTime: "30-45 days",
    requiredDocuments: ["Medical Certificate", "Address Proof", "ID Proof", "Photos"],
    icon: "🚗",
    color: "from-red-300 to-red-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Driving", "Vehicle Operation", "Employment"],
  },
  {
    id: "mh-011",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Vehicle Registration",
    description: "RC book and vehicle registration",
    department: "Transport Department",
    processingTime: "15-30 days",
    requiredDocuments: ["Bill of Sale", "Chassis Photo", "Insurance Document", "ID Proof"],
    icon: "🏍️",
    color: "from-green-300 to-green-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Ownership", "Insurance Coverage", "Road Compliance"],
  },
  {
    id: "mh-012",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Property Registration",
    description: "Ownership proof and land registration",
    department: "Revenue Department",
    processingTime: "20-30 days",
    requiredDocuments: ["Agreement", "Survey Map", "Tax Receipt", "ID Proof"],
    icon: "🏛️",
    color: "from-yellow-300 to-yellow-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Ownership Rights", "Property Transfer", "Loan Eligibility"],
  },
  {
    id: "mh-013",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Disability Certificate",
    description: "Recognition for persons with disabilities",
    department: "Social Welfare",
    processingTime: "10-15 days",
    requiredDocuments: ["Medical Report", "Photos", "Address Proof", "ID Proof"],
    icon: "♿",
    color: "from-purple-300 to-purple-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Disability Benefits", "Job Reservation", "Financial Aid"],
  },
  {
    id: "mh-014",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Factory Registration",
    description: "Industrial unit registration and license",
    department: "Industries Department",
    processingTime: "15-20 days",
    requiredDocuments: ["Factory Plan", "Pollution Clearance", "Safety Certificate", "ID Proof"],
    icon: "🏭",
    color: "from-indigo-300 to-indigo-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Legal Operation", "Worker Safety", "Government Support"],
  },
  {
    id: "mh-015",
    category: "maharashtra",
    categoryName: "Maharashtra Government",
    name: "Solvency Certificate",
    description: "Financial viability proof for business",
    department: "Revenue Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Bank Statement", "Tax Return", "Balance Sheet", "ID Proof"],
    icon: "📈",
    color: "from-emerald-300 to-emerald-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en",
    benefits: ["Credit Eligibility", "Tender Participation", "Loan Access"],
  },
];

export default function CitizenGovServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "csc" | "maharashtra">("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.benefits.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const cscCount = services.filter((s) => s.category === "csc").length;
  const maharashtraCount = services.filter((s) => s.category === "maharashtra").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Sidebar */}
      <CitizenSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl">
                🏛️
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Government Services</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Access all government services from CSC and Maharashtra Government in one place
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services, departments, benefits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-blue-200 hover:border-blue-400"
              }`}
            >
              All Services ({services.length})
            </button>
            <button
              onClick={() => setSelectedCategory("csc")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === "csc"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-blue-200 hover:border-blue-400"
              }`}
            >
              CSC Services ({cscCount})
            </button>
            <button
              onClick={() => setSelectedCategory("maharashtra")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === "maharashtra"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-blue-200 hover:border-blue-400"
              }`}
            >
              Maharashtra Services ({maharashtraCount})
            </button>
          </div>

          {/* Services Grid */}
          <div className="space-y-4">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group border border-blue-100 hover:border-blue-300"
                  >
                    {/* Card Header */}
                    <div
                      className={`bg-gradient-to-br ${service.color} p-4 text-white`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{service.icon}</span>
                        <span className="text-xs font-semibold bg-white bg-opacity-20 px-2 py-1 rounded">
                          {service.categoryName.split(" ")[0]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold">{service.name}</h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock size={16} className="text-blue-500" />
                          <span className="font-medium">{service.processingTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users size={16} className="text-blue-500" />
                          <span className="font-medium">{service.department}</span>
                        </div>
                      </div>

                      {/* View Button */}
                      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition flex items-center justify-center gap-2 group">
                        <span>View Details</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-blue-100">
                <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No services found matching your search</p>
                <p className="text-gray-500 text-sm mt-2">Try searching with different keywords</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedService.color} text-white px-8 py-6 flex justify-between items-center sticky top-0`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedService.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedService.name}</h2>
                  <p className="text-blue-100 text-sm">{selectedService.categoryName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Description */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-800 text-lg">{selectedService.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-blue-500" size={18} />
                    <p className="text-gray-600 text-sm font-semibold">Processing Time</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedService.processingTime}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="text-blue-500" size={18} />
                    <p className="text-gray-600 text-sm font-semibold">Department</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedService.department}</p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Key Benefits</h3>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                  {selectedService.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-green-800">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-yellow-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Required Documents</h3>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
                  {selectedService.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-yellow-800">
                      <span className="font-semibold text-lg">{idx + 1}.</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <a
                  href={selectedService.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <span>Apply Online</span>
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

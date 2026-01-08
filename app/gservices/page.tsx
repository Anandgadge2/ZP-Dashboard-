"use client";

import { useState } from "react";
import {
  Briefcase,
  Search,
  X,
  Clock,
  Users,
  CheckCircle,
  ExternalLink,
  Globe,
  BadgeCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

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
    id: "csc1",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "Aadhaar Services",
    description: "Aadhaar enrollment, authentication, and e-KYC services for digital identity",
    department: "UIDAI",
    processingTime: "Same day",
    requiredDocuments: ["Identity Proof", "Address Proof", "Recent Photograph", "Mobile Number"],
    icon: "🆔",
    color: "from-orange-500 to-orange-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Digital Identity", "Online Verification", "Banking Access", "Government Benefits"],
  },
  {
    id: "csc2",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "Ayushman Bharat - PMJAY",
    description: "World's largest health insurance scheme with coverage up to ₹5 lakhs",
    department: "Ministry of Labour & Employment",
    processingTime: "3-5 days",
    requiredDocuments: ["Aadhar Card", "Family Details", "Address Proof"],
    icon: "🏥",
    color: "from-red-500 to-red-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Free Hospitalization", "Cashless Treatment", "₹5 Lakh Coverage", "No Age Limit"],
  },
  {
    id: "csc3",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "PAN Card Registration",
    description: "Permanent Account Number for income tax and financial transactions",
    department: "Income Tax Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Identity Proof", "Address Proof", "Date of Birth Proof", "Photograph"],
    icon: "💳",
    color: "from-green-500 to-green-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Tax Identification", "Banking Services", "Investment Benefits", "Financial Inclusion"],
  },
  {
    id: "csc4",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "Passport Application",
    description: "Passport application processing, verification, and assistance",
    department: "Ministry of External Affairs",
    processingTime: "15-30 days",
    requiredDocuments: ["Birth Certificate", "Address Proof", "Identity Proof", "Photographs"],
    icon: "🛂",
    color: "from-purple-500 to-purple-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["International Travel", "Visa Processing", "Emergency Services", "Document Authenticity"],
  },
  {
    id: "csc5",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "e-Shram Worker Registration",
    description: "Social security and benefits registration for unorganized workers",
    department: "Ministry of Labour & Employment",
    processingTime: "Instant",
    requiredDocuments: ["Aadhar Card", "Employment Details", "Bank Account Details"],
    icon: "👷",
    color: "from-blue-500 to-blue-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Social Security", "Insurance Benefits", "Pension Eligibility", "Government Schemes"],
  },
  {
    id: "csc6",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "LPG Services",
    description: "LPG booking, subsidy tracking, and complaint management",
    department: "Ministry of Petroleum & Natural Gas",
    processingTime: "2-3 days",
    requiredDocuments: ["Address Proof", "Identity Proof", "Connection Details"],
    icon: "🔥",
    color: "from-yellow-500 to-yellow-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Subsidy Tracking", "Easy Booking", "Complaint Resolution", "Online Management"],
  },
  {
    id: "csc7",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "National Pension Scheme (NPS)",
    description: "Voluntary retirement savings scheme with tax benefits",
    department: "Pension Fund Regulatory and Development Authority",
    processingTime: "5-7 days",
    requiredDocuments: ["PAN Card", "KYC Documents", "Bank Account Details", "Address Proof"],
    icon: "💰",
    color: "from-indigo-500 to-indigo-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Retirement Planning", "Tax Deductions", "Flexible Withdrawals", "Low Charges"],
  },
  {
    id: "csc8",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "PM-SYM (Shram Yogi Maandhan)",
    description: "Pension scheme for unorganized workers with ₹3000 monthly pension",
    department: "Ministry of Labour & Employment",
    processingTime: "Same day",
    requiredDocuments: ["Aadhar Card", "Bank Account Details", "Age Proof"],
    icon: "📋",
    color: "from-cyan-500 to-cyan-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Monthly Pension", "Affordable Premium", "Old Age Security", "Spouse Benefits"],
  },
  {
    id: "csc9",
    category: "csc",
    categoryName: "Common Service Centers (CSC)",
    name: "Jeevan Pramaan",
    description: "Pensioner life certification service for government employees",
    department: "Ministry of Pensions",
    processingTime: "Same day",
    requiredDocuments: ["Aadhar Card", "Pensioner ID", "Medical Examination Form"],
    icon: "📄",
    color: "from-pink-500 to-rose-600",
    link: "https://digitalseva.csc.gov.in/",
    benefits: ["Digital Life Certificate", "Automatic Verification", "Biometric Authentication"],
  },

  // Maharashtra Right to Service Act Services
  {
    id: "mh1",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Birth Certificate",
    description: "Online application and issuance of birth certificates within prescribed time",
    department: "Rural Development and Panchayat Raj Department",
    processingTime: "5-7 days",
    requiredDocuments: ["Birth Registration Form", "Hospital Documents", "Photographs"],
    icon: "👶",
    color: "from-pink-500 to-pink-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=2476",
    benefits: ["Legal Proof of Birth", "Educational Admission", "Passport Application", "Age Verification"],
  },
  {
    id: "mh2",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Death Certificate",
    description: "Online application and issuance of death certificates with complete documentation",
    department: "Rural Development and Panchayat Raj Department",
    processingTime: "5-7 days",
    requiredDocuments: ["Medical Certificate", "Identification of Deceased", "Witness Details"],
    icon: "📜",
    color: "from-gray-600 to-gray-700",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=2480",
    benefits: ["Insurance Claims", "Property Transfer", "Legal Closure", "Government Benefits"],
  },
  {
    id: "mh3",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Marriage Certificate",
    description: "Online application and registration of marriage with legal recognition",
    department: "Rural Development and Panchayat Raj Department",
    processingTime: "10-15 days",
    requiredDocuments: ["Marriage Invitation", "Photographs", "Identification of Couple", "Address Proof"],
    icon: "💍",
    color: "from-red-500 to-rose-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=2495",
    benefits: ["Legal Marriage Recognition", "Visa Applications", "Insurance Benefits", "Property Rights"],
  },
  {
    id: "mh4",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Income Certificate",
    description: "Online application for income certification for government schemes",
    department: "Revenue Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Income Proof", "Identity Proof", "Address Proof", "Land Documents"],
    icon: "💵",
    color: "from-green-500 to-emerald-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1251",
    benefits: ["Scholarship Eligibility", "Government Aid", "Subsidy Access", "Quota Benefits"],
  },
  {
    id: "mh5",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Caste/Community Certificate",
    description: "Online application for caste certificate for reservation and benefits",
    department: "Revenue Department",
    processingTime: "15-20 days",
    requiredDocuments: ["Caste Details", "Address Proof", "Photographs", "Family Documents"],
    icon: "🎓",
    color: "from-violet-500 to-purple-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1253",
    benefits: ["Educational Reservation", "Job Quota", "Scholarship Benefits", "Social Schemes"],
  },
  {
    id: "mh6",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Age/Nationality/Domicile Certificate",
    description: "Proof of residence, age, and nationality for various applications",
    department: "Revenue Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Address Proof", "Identity Proof", "Land Documents", "Residence Proof"],
    icon: "🏠",
    color: "from-amber-500 to-orange-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1252",
    benefits: ["Education Admission", "Government Jobs", "Loan Applications", "Legal Documentation"],
  },
  {
    id: "mh7",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Senior Citizen Certificate",
    description: "Certificate for senior citizens to avail concessions and benefits",
    department: "Revenue Department & Social Welfare",
    processingTime: "5-7 days",
    requiredDocuments: ["Date of Birth Proof", "Address Proof", "Identity Proof", "Aadhar Card"],
    icon: "👴",
    color: "from-teal-500 to-cyan-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1255",
    benefits: ["Travel Concessions", "Healthcare Benefits", "Pension Eligibility", "Tax Exemptions"],
  },
  {
    id: "mh8",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Water Connection",
    description: "New water connection application and management services",
    department: "Maharashtra Jeevan Pradhikaran (Water Authority)",
    processingTime: "7-15 days",
    requiredDocuments: ["Property Documents", "Address Proof", "Land Survey Map", "Photographs"],
    icon: "💧",
    color: "from-blue-500 to-cyan-500",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=3538",
    benefits: ["Clean Drinking Water", "Bill Management", "Online Payment", "Quick Resolution"],
  },
  {
    id: "mh9",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Shop & Establishment Registration",
    description: "Register your shop or business establishment under labor laws",
    department: "Labour Department",
    processingTime: "10-15 days",
    requiredDocuments: ["Business License", "Address Proof", "Owner ID", "Property Deed"],
    icon: "🏪",
    color: "from-orange-500 to-red-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=3580",
    benefits: ["Legal Recognition", "Labor Compliance", "Tax Benefits", "Employee Protection"],
  },
  {
    id: "mh10",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Driving License",
    description: "Apply for new or renew driving license with complete verification",
    department: "Transport Department",
    processingTime: "30-45 days",
    requiredDocuments: ["Address Proof", "Medical Certificate", "Photographs", "Age Proof"],
    icon: "🚗",
    color: "from-lime-500 to-green-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=4501",
    benefits: ["Legal Driving Authorization", "Vehicle Operation", "Insurance Benefits", "Vehicle Transfer"],
  },
  {
    id: "mh11",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Vehicle Registration (RC)",
    description: "New vehicle registration and RC transfer services online",
    department: "Transport Department",
    processingTime: "15-30 days",
    requiredDocuments: ["Invoice/Bill of Sale", "Insurance Certificate", "Address Proof", "ID Proof"],
    icon: "📋",
    color: "from-fuchsia-500 to-purple-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=4505",
    benefits: ["Vehicle Ownership", "Insurance Eligibility", "Pollution Control", "Traffic Compliance"],
  },
  {
    id: "mh12",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Property Registration (Deed)",
    description: "Register your property or land with complete legal documentation",
    department: "Department of Registration & Stamps (IGR)",
    processingTime: "20-30 days",
    requiredDocuments: ["Land Documents", "Survey Map", "Photographs", "Address Proof", "Identification"],
    icon: "🏡",
    color: "from-rose-500 to-pink-600",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=4203",
    benefits: ["Ownership Rights", "Loan Collateral", "Property Sale", "Legal Security", "Inheritance"],
  },
  {
    id: "mh13",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Disability Certificate",
    description: "Certificate for persons with disabilities for government benefits and concessions",
    department: "Public Health Department",
    processingTime: "10-15 days",
    requiredDocuments: ["Medical Report", "Identity Proof", "Address Proof", "Photographs"],
    icon: "♿",
    color: "from-blue-600 to-blue-700",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=4307",
    benefits: ["Government Schemes", "Travel Concessions", "Tax Benefits", "Educational Support"],
  },
  {
    id: "mh14",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Factory Registration",
    description: "Registration of factories under Industrial Safety Act",
    department: "Labour Department",
    processingTime: "15-20 days",
    requiredDocuments: ["Factory Plan", "Land Documents", "Machinery Details", "Safety Measures"],
    icon: "🏭",
    color: "from-yellow-500 to-yellow-700",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=3548",
    benefits: ["Legal Compliance", "Worker Safety", "Tax Benefits", "Government Subsidy Eligibility"],
  },
  {
    id: "mh15",
    category: "maharashtra",
    categoryName: "Maharashtra Right to Service Act",
    name: "Solvency Certificate",
    description: "Certificate for proving financial capability and creditworthiness",
    department: "Revenue Department",
    processingTime: "7-10 days",
    requiredDocuments: ["Bank Statements", "Income Certificate", "Address Proof", "Business Documents"],
    icon: "💎",
    color: "from-indigo-500 to-indigo-700",
    link: "https://aaplesarkar.mahaonline.gov.in/en/Login/Certificate_Documents?ServiceId=1254",
    benefits: ["Loan Application", "Business Credit", "Tender Participation", "Contract Securing"],
  },
];

export default function GovernmentServicesPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header - Government Style */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white py-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur">
              <Briefcase size={36} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Government Services Portal</h1>
              <p className="text-blue-100 text-lg mt-2">
                Single window access to all government services
              </p>
            </div>
          </div>
          <p className="text-blue-50 mt-4 text-base md:text-lg">
            Access comprehensive government services from Common Service Centers (CSC) and Maharashtra Right to Service Act initiatives. Apply online for certificates, registrations, and benefits.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar - Enhanced */}
        <div className="mb-8">
          <div className="relative drop-shadow-lg">
            <Search className="absolute left-4 top-3.5 text-blue-500" size={22} />
            <input
              type="text"
              placeholder="Search services, departments, benefits... (e.g., birth certificate, passport, water connection)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-600 focus:outline-none text-gray-700 bg-white shadow-md text-base"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2.5 rounded-full font-semibold transition duration-300 ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50"
            }`}
          >
            All Services ({services.length})
          </button>
          <button
            onClick={() => setSelectedCategory("csc")}
            className={`px-6 py-2.5 rounded-full font-semibold transition duration-300 flex items-center gap-2 ${
              selectedCategory === "csc"
                ? "bg-orange-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50"
            }`}
          >
            <Globe size={18} />
            CSC Services ({cscCount})
          </button>
          <button
            onClick={() => setSelectedCategory("maharashtra")}
            className={`px-6 py-2.5 rounded-full font-semibold transition duration-300 flex items-center gap-2 ${
              selectedCategory === "maharashtra"
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-2 border-green-200 hover:border-green-500 hover:bg-green-50"
            }`}
          >
            <BadgeCheck size={18} />
            Maharashtra Services ({maharashtraCount})
          </button>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {/* CSC Section */}
          {(selectedCategory === "all" || selectedCategory === "csc") && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-3 border-orange-300">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="text-orange-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Common Service Centers (CSC)</h2>
                  <p className="text-gray-600 text-sm">Digital services at your nearest CSC kiosk - Trusted by millions</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredServices
                  .filter((s) => s.category === "csc")
                  .map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-orange-400 hover:scale-105 hover:-translate-y-2 overflow-hidden"
                    >
                      <div className={`bg-gradient-to-br ${service.color} p-5 text-white`}>
                        <div className="text-5xl mb-2">{service.icon}</div>
                        <h3 className="text-lg font-bold">{service.name}</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={16} className="text-blue-500" />
                            <span className="text-xs font-medium">{service.processingTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Zap size={16} className="text-yellow-500" />
                            <span className="text-xs font-medium truncate">{service.department}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-xs">
                            Learn More <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Maharashtra Section */}
          {(selectedCategory === "all" || selectedCategory === "maharashtra") && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-3 border-green-300">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BadgeCheck className="text-green-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Maharashtra Right to Service Act
                  </h2>
                  <p className="text-gray-600 text-sm">Government services with guaranteed time frame - Guaranteed delivery</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredServices
                  .filter((s) => s.category === "maharashtra")
                  .map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-green-400 hover:scale-105 hover:-translate-y-2 overflow-hidden"
                    >
                      <div className={`bg-gradient-to-br ${service.color} p-5 text-white`}>
                        <div className="text-5xl mb-2">{service.icon}</div>
                        <h3 className="text-lg font-bold">{service.name}</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={16} className="text-blue-500" />
                            <span className="text-xs font-medium">{service.processingTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Zap size={16} className="text-yellow-500" />
                            <span className="text-xs font-medium truncate">{service.department}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-xs">
                            Learn More <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <Briefcase size={80} className="mx-auto text-gray-300 mb-4 opacity-50" />
            <p className="text-gray-600 text-xl font-semibold">No services found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria or browse all services</p>
          </div>
        )}
      </div>

      {/* Service Detail Modal - Enhanced Government Style */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedService.color} text-white p-8 relative`}>
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-40 p-2 rounded-full transition duration-200"
              >
                <X size={24} />
              </button>
              <div className="text-7xl mb-4">{selectedService.icon}</div>
              <h2 className="text-3xl font-bold">{selectedService.name}</h2>
              <p className="text-white text-opacity-90 mt-3 font-semibold">{selectedService.categoryName}</p>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Description */}
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">About This Service</h3>
                <p className="text-gray-700 leading-relaxed">{selectedService.description}</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-orange-600" size={22} />
                    <span className="font-semibold text-gray-900">Processing Time</span>
                  </div>
                  <p className="text-gray-700 font-bold text-lg">{selectedService.processingTime}</p>
                </div>
                <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-purple-600" size={22} />
                    <span className="font-semibold text-gray-900">Department</span>
                  </div>
                  <p className="text-gray-700 font-semibold text-sm">{selectedService.department}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={24} />
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                      <div className="flex-shrink-0">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Required Documents</h3>
                <div className="space-y-3 bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  {selectedService.requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                      <div className="bg-blue-600 text-white rounded-full p-1 flex-shrink-0">
                        <CheckCircle size={18} />
                      </div>
                      <span className="text-gray-700 font-medium">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded flex gap-3">
                <AlertIcon size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-900 font-semibold">Important Information</p>
                  <p className="text-sm text-yellow-900 mt-1">
                    Service processing time may vary based on document completeness. All documents must be original or certified copies. Please carry valid identification proof.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
                <a
                  href={selectedService.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <ExternalLink size={20} />
                  Apply Online
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
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

function AlertIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

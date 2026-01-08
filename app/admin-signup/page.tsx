"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, Phone, MapPin, User, Home, Lock } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organizationName: "",
    department: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    fullName: "",
    position: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.organizationName.trim()) newErrors.organizationName = "Organization name is required";
      if (!formData.department.trim()) newErrors.department = "Department is required";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Valid email is required";
      if (!formData.phone || !/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10 digits";
    } else if (currentStep === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.position.trim()) newErrors.position = "Position is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.pincode || !/^\d{6}$/.test(formData.pincode))
        newErrors.pincode = "Pincode must be 6 digits";
    } else if (currentStep === 3) {
      if (!formData.password || formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store token (mock)
      localStorage.setItem("adminToken", "admin_token_" + Date.now());
      localStorage.setItem("adminRole", "admin");

      setSuccessMessage("✓ Registration successful! Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Organization", icon: Building2 },
    { number: 2, label: "Personal Info", icon: User },
    { number: 3, label: "Security", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Registration</h1>
          <p className="text-gray-600">Register as department head or organization administrator</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Info */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Admin Portal</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white bg-opacity-20">
                        <Building2 size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Manage Operations</h3>
                      <p className="text-white text-opacity-90 text-sm">
                        Oversee grievances, appointments, and citizen data
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white bg-opacity-20">
                        <Mail size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Real-time Updates</h3>
                      <p className="text-white text-opacity-90 text-sm">
                        Get instant notifications on new applications
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white bg-opacity-20">
                        <Lock size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Secure Access</h3>
                      <p className="text-white text-opacity-90 text-sm">
                        Enterprise-grade security for sensitive data
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white border-opacity-20">
                <p className="text-white text-opacity-80 text-sm">
                  Already registered?{" "}
                  <a href="/login" className="text-white font-semibold hover:underline">
                    Login here
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-10">
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-pulse">
                  {successMessage}
                </div>
              )}

              {/* Step Indicators */}
              <div className="flex justify-between mb-8">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep >= step.number;
                  return (
                    <div key={step.number} className="flex flex-col items-center">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <span className="text-xl">✓</span>
                        ) : (
                          <Icon size={20} />
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Organization */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Organization Name</label>
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="e.g., Municipal Corporation"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.organizationName ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.organizationName && (
                        <p className="text-red-600 text-sm mt-1">⚠ {errors.organizationName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.department ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      >
                        <option value="">Select Department</option>
                        <option value="grievances">Grievances & Redressal</option>
                        <option value="appointments">Appointments & Scheduling</option>
                        <option value="licenses">Licenses & Permits</option>
                        <option value="tax">Tax & Revenue</option>
                        <option value="works">Public Works</option>
                        <option value="health">Health & Sanitation</option>
                      </select>
                      {errors.department && <p className="text-red-600 text-sm mt-1">⚠ {errors.department}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="admin@organization.com"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.email ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">⚠ {errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit phone number"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">⚠ {errors.phone}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Info */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.fullName ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.fullName && <p className="text-red-600 text-sm mt-1">⚠ {errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Position/Designation</label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="e.g., Department Head, Officer"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.position ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.position && <p className="text-red-600 text-sm mt-1">⚠ {errors.position}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Office address"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.address ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.address && <p className="text-red-600 text-sm mt-1">⚠ {errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                            errors.city ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                          } focus:outline-none`}
                        />
                        {errors.city && <p className="text-red-600 text-sm mt-1">⚠ {errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                            errors.state ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                          } focus:outline-none`}
                        />
                        {errors.state && <p className="text-red-600 text-sm mt-1">⚠ {errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                          errors.pincode ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                        } focus:outline-none`}
                      />
                      {errors.pincode && <p className="text-red-600 text-sm mt-1">⚠ {errors.pincode}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: Security */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Password</label>
                      <PasswordInput
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Min 8 characters"
                      />
                      {errors.password && <p className="text-red-600 text-sm mt-1">⚠ {errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                      <PasswordInput
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">⚠ {errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-900 text-sm">
                      <p className="font-semibold mb-2">Password Requirements:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Minimum 8 characters</li>
                        <li>Mix of uppercase and lowercase letters</li>
                        <li>Include numbers and special characters</li>
                      </ul>
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {errors.submit}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                    >
                      ← Previous
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Creating Account..." : "Complete Registration"}
                    </button>
                  )}
                </div>
              </form>

              <p className="text-center text-gray-600 text-sm mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                  Login here
                </Link>
              </p>

              {/* Back to Home */}
              <div className="text-center mt-4">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Home size={16} />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

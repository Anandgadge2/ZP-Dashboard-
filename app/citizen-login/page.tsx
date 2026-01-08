"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, AlertCircle, LogIn, Home } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";

export default function CitizenLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      setError("");
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("citizenToken", "dummy-citizen-token");
      
      // Extract citizen name from email (e.g., "rajesh@example.com" -> "Rajesh Kumar")
      // For demo purposes, we'll map emails to citizen names
      const emailToCitizenMap: { [key: string]: string } = {
        "rajesh@example.com": "Rajesh Kumar",
        "priya@example.com": "Priya Singh",
        "amit@example.com": "Amit Patel",
      };
      
      const citizenName = emailToCitizenMap[email] || "Citizen";
      localStorage.setItem("citizenName", citizenName);
      
      router.push("/citizen-dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Left Side - Info */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center px-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-bold text-4xl mb-8 shadow-2xl animate-bounce">
            G2
          </div>
          <h1 className="text-5xl font-bold mb-4">Track Your Applications</h1>
          <p className="text-xl text-blue-100 mb-8">
            Monitor your grievances and appointments in real-time with our citizen portal
          </p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                ✓
              </div>
              <p>Real-time application status updates</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                ✓
              </div>
              <p>View all your grievances and appointments</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                ✓
              </div>
              <p>Secure and encrypted data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 backdrop-blur">
            {/* Logo for Mobile */}
            <div className="lg:hidden mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
                G2
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Citizen Portal</h1>
              <p className="text-gray-500 text-sm mt-1">Track your applications</p>
            </div>

            {/* Desktop Title */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your citizen account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slide-down">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail size={16} className="text-blue-600" />
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <PasswordInput
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me for next time
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 group"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/citizen-signup" className="text-blue-600 hover:underline font-semibold">
                Sign up here
              </Link>
            </p>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                <Home size={16} />
                Back to Home
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-900 mb-3">Demo Credentials</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-blue-800"><strong>Option 1:</strong></p>
                  <p className="text-xs text-blue-700">Email: rajesh@example.com</p>
                  <p className="text-xs text-blue-700">Password: password</p>
                </div>
                <div className="border-t border-blue-200 pt-2">
                  <p className="text-xs text-blue-800"><strong>Option 2:</strong></p>
                  <p className="text-xs text-blue-700">Email: priya@example.com</p>
                  <p className="text-xs text-blue-700">Password: password</p>
                </div>
                <div className="border-t border-blue-200 pt-2">
                  <p className="text-xs text-blue-800"><strong>Option 3:</strong></p>
                  <p className="text-xs text-blue-700">Email: amit@example.com</p>
                  <p className="text-xs text-blue-700">Password: password</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By logging in, you agree to our{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

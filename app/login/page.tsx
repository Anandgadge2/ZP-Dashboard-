"use client";

import { useState } from "react";
import { login } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      setError("");
      const res = await login({ username, password });

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed. Check credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center px-12">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1f3c88] to-[#1a2d66] rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 mx-auto shadow-lg">
            G2
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            G2C Admin Portal
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Government to Citizen Services Management System
          </p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">
                ✓
              </div>
              <p className="text-gray-700">Manage citizen grievances efficiently</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">
                ✓
              </div>
              <p className="text-gray-700">Schedule and track appointments</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">
                ✓
              </div>
              <p className="text-gray-700">Comprehensive analytics and reporting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            {/* Logo for Mobile */}
            <div className="lg:hidden mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1f3c88] to-[#1a2d66] rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
                G2
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-500 text-sm mt-1">Access the admin panel</p>
            </div>

            {/* Desktop Title */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to access the admin panel</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field with Eye Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <PasswordInput
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1f3c88] to-[#1a2d66] hover:from-[#1a2d66] hover:to-[#152347] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link href="/admin-signup" className="text-blue-600 hover:underline font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <p className="text-center text-gray-600 text-sm mt-3">
              <Link href="/" className="text-gray-500 hover:text-gray-700 underline">
                Back to Home
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials</p>
            <p className="text-xs text-blue-800">
              <strong>Username:</strong> admin
            </p>
            <p className="text-xs text-blue-800">
              <strong>Password:</strong> password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

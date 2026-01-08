"use client";

import { useRouter } from "next/navigation";
import { Building2, Users, LogIn, UserPlus, ArrowRight } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const loginOptions = [
    {
      title: "Admin/Department Head",
      description: "Access the admin dashboard to manage grievances, appointments, and citizen data",
      loginText: "Admin Login",
      signupText: "Admin Signup",
      loginPath: "/login",
      signupPath: "/admin-signup",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-300",
    },
    {
      title: "Citizen",
      description: "Sign in to track your grievances, appointments, and application status in real-time",
      loginText: "Citizen Login",
      signupText: "Citizen Signup",
      loginPath: "/citizen-login",
      signupPath: "/citizen-signup",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">G2</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-slide-down">
            ZP Dashboard
          </h1>
          <p className="text-xl text-blue-100 mb-2 animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Government-to-Citizen Services Management System
          </p>
          <p className="text-blue-200 animate-slide-down" style={{ animationDelay: "0.2s" }}>
            Efficient, transparent, and citizen-centric government services
          </p>
        </div>

        {/* Login Options */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {loginOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${option.bgColor} rounded-2xl border-2 ${option.borderColor} p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">{option.description}</p>

                  {/* Buttons */}
                  <div className="space-y-3">
                    {/* Login Button */}
                    <button
                      onClick={() => router.push(option.loginPath)}
                      className={`w-full bg-gradient-to-r ${option.color} hover:shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                    >
                      <LogIn size={20} />
                      {option.loginText}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Signup Button */}
                    <button
                      onClick={() => router.push(option.signupPath)}
                      className={`w-full border-2 border-gray-400 hover:border-gray-600 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group hover:bg-white/50`}
                    >
                      <UserPlus size={20} />
                      {option.signupText}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Demo Credentials */}
                  {index === 0 && (
                    <div className="mt-6 p-4 bg-white/60 rounded-lg">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Demo Credentials:</p>
                      <p className="text-xs text-gray-700">
                        <strong>Email:</strong> admin@zp.com
                      </p>
                      <p className="text-xs text-gray-700">
                        <strong>Password:</strong> admin@2024
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Why Choose ZP Dashboard?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "Lightning Fast",
                  description: "Responsive interface optimized for quick access to services",
                },
                {
                  icon: "🔒",
                  title: "Secure",
                  description: "Enterprise-grade security for your sensitive information",
                },
                {
                  icon: "📊",
                  title: "Transparent",
                  description: "Real-time tracking and status updates for all applications",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white hover:bg-white/20 transition-all"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-blue-200 py-8 border-t border-white/10">
            <p className="text-sm">
              © 2026 ZP Dashboard. All rights reserved. | Powered by G2C Services Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

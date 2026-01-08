# 🚀 ZP Dashboard - Quick Reference Guide

**Fast answers for common tasks and quick access to important information.**

---

## ⚡ Commands Cheat Sheet

```bash
# Development
npm install           # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code style

# Testing
npm test             # Run tests
npm run test:e2e     # End-to-end tests

# Cleanup
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Remove dependencies (npm install after)
```

---

## 🔗 Application URLs

### Admin Portal
| Page | URL | Credentials |
|------|-----|-----------|
| Login | http://localhost:3000/login | admin@zp.com / admin@2024 |
| Signup | http://localhost:3000/admin-signup | - |
| Dashboard | http://localhost:3000/dashboard | (requires login) |
| Analytics | http://localhost:3000/dashboard/analytics | (requires login) |
| Grievances | http://localhost:3000/dashboard/grievances | (requires login) |
| Appointments | http://localhost:3000/dashboard/appointments | (requires login) |
| Citizens | http://localhost:3000/dashboard/citizens | (requires login) |

### Citizen Portal
| Page | URL | Credentials |
|------|-----|-----------|
| Login | http://localhost:3000/citizen-login | citizen@example.com / password |
| Signup | http://localhost:3000/citizen-signup | - |
| Dashboard | http://localhost:3000/citizen-dashboard | (requires login) |

---

## 📁 Important Files

### Configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js settings
- `tailwind.config.ts` - Tailwind CSS setup

### Global Styles
- `app/globals.css` - Global CSS and animations

### Root Layout
- `app/layout.tsx` - Root layout component
- `app/page.tsx` - Home page

### API Services
- `services/api.ts` - Base API configuration
- `services/authApi.ts` - Authentication
- `services/grievanceApi.ts` - Grievances
- `services/appointmentApi.ts` - Appointments
- `services/citizenApi.ts` - Citizens

### Key Components
- `components/Sidebar.tsx` - Navigation
- `components/Topbar.tsx` - Header
- `components/Modal.tsx` - Base modal
- `components/EnhancedModal.tsx` - Enhanced modal
- `components/ApplicationTracker.tsx` - Timeline

---

## 🎨 Component Usage

### Status Badge
```tsx
import StatusBadge from "@/components/StatusBadge";

<StatusBadge 
  status="PENDING" 
  variant="default" 
  size="md" 
/>
```

### Stat Card
```tsx
import StatCard from "@/components/StatCard";

<StatCard
  title="Total Grievances"
  value={1245}
  icon="⚠️"
  color="red"
  change={{ value: 15, direction: "up" }}
/>
```

### Modal
```tsx
import Modal from "@/components/Modal";

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Content here
</Modal>
```

### Application Tracker
```tsx
import ApplicationTracker from "@/components/ApplicationTracker";

<ApplicationTracker 
  events={[
    {
      stage: "Submitted",
      status: "completed",
      date: "2025-12-15",
      description: "Application submitted"
    }
  ]}
/>
```

---

## 🎯 Common Tasks

### Create New Page
```bash
mkdir app/my-page
touch app/my-page/page.tsx
```

Edit `page.tsx`:
```tsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

### Create New Component
```bash
touch components/MyComponent.tsx
```

Edit file:
```tsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

### Add API Call
```typescript
// In services/myApi.ts
import api from "./api";

export const myApi = {
  fetchData: async () => {
    const response = await api.get("/endpoint");
    return response.data.data;
  }
};
```

### Use API in Component
```tsx
"use client";
import { useEffect, useState } from "react";
import { myApi } from "@/services/myApi";

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    myApi.fetchData().then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

---

## 🎨 Styling Quick Reference

### Tailwind Classes
```tsx
// Background colors
bg-blue-500, bg-red-600, bg-green-400

// Text colors
text-blue-600, text-red-700

// Padding/Margin
p-4, px-6, py-3, m-2, mx-auto, my-4

// Flexbox
flex, flex-col, gap-4, justify-between, items-center

// Grid
grid, grid-cols-3, gap-6

// Responsive
md:grid-cols-2, lg:flex-row, sm:p-2

// Shadows
shadow-sm, shadow-md, shadow-lg, shadow-xl

// Rounded corners
rounded, rounded-lg, rounded-xl, rounded-full

// Animations
animate-fade-in, animate-slide-up, animate-bounce, animate-pulse
```

### Custom Animations
```tsx
// Available animations in globals.css
animate-fade-in      // Fade in
animate-slide-down   // Slide from top
animate-slide-up     // Slide from bottom
animate-slide-in-left  // Slide from left
animate-slide-in-right // Slide from right
animate-bounce       // Bouncing motion
animate-pulse        // Opacity pulsing

// Usage with delay
<div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
  Delayed animation
</div>
```

---

## 🔐 Authentication Pattern

### Login
```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authApi.citizenLogin(email, password);
    localStorage.setItem("citizenToken", response.token);
    router.push("/citizen-dashboard");
  } catch (error) {
    setError("Login failed");
  }
};
```

### Protected Route Check
```typescript
useEffect(() => {
  const token = localStorage.getItem("citizenToken") || 
                localStorage.getItem("adminToken");
  if (!token) {
    router.push("/login");
  }
}, [router]);
```

### Logout
```typescript
const handleLogout = () => {
  localStorage.removeItem("citizenToken");
  localStorage.removeItem("adminToken");
  router.push("/login");
};
```

---

## 📊 Form Validation Pattern

```tsx
const [formData, setFormData] = useState({ email: "", password: "" });
const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.email) newErrors.email = "Email required";
  if (!formData.password) newErrors.password = "Password required";
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    // Submit form
  }
};
```

---

## 🚨 Error Handling

```typescript
try {
  const data = await api.get("/endpoint");
  setData(data.data.data);
} catch (error: any) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    router.push("/login");
  } else if (error.response?.status === 400) {
    // Bad request - show error message
    setError(error.response.data.message);
  } else {
    // Generic error
    setError("An error occurred");
  }
}
```

---

## 📝 TypeScript Patterns

### Interface Definition
```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}
```

### API Response Type
```typescript
interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}
```

### Component Props
```typescript
interface ComponentProps {
  title: string;
  onClick?: () => void;
  items?: string[];
  disabled?: boolean;
}

export default function MyComponent(props: ComponentProps) {
  // ...
}
```

---

## 🎯 Environment Variables

### Access Variables
```typescript
// In components (must be client-side)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// In server-side code
const secretKey = process.env.SECRET_KEY;
```

### Set Variables
```bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
SECRET_KEY=your_secret_key

# .env.production (production)
NEXT_PUBLIC_API_URL=https://api.production.com/api
SECRET_KEY=prod_secret_key
```

---

## 🔗 API Response Pattern

Standard API response format:
```typescript
{
  "data": { /* actual data */ },
  "status": "success",
  "message": "Optional message"
}
```

Access data in component:
```typescript
const response = await api.get("/grievances");
const grievances = response.data.data; // Note: .data.data
```

---

## 📱 Responsive Breakpoints

```typescript
// Tailwind CSS breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large
2xl: 1536px // XXL devices
```

Usage:
```tsx
<div className="block md:flex lg:grid">
  {/* Block on mobile, flex on tablet, grid on desktop */}
</div>
```

---

## 🐛 Debugging Tips

```typescript
// Console logging
console.log("value:", value);
console.error("error:", error);
console.table(arrayData);

// React DevTools inspection
// Install React DevTools browser extension

// Next.js build analysis
npm run build -- --analyze

// TypeScript checking
npm run type-check
```

---

## 📦 Adding Dependencies

```bash
# Install package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Remove package
npm uninstall package-name

# Update all packages
npm update
```

---

## 🚀 Performance Tips

- Use React.memo for expensive components
- Implement code splitting with dynamic imports
- Optimize images with Next.js Image component
- Use useCallback for function memoization
- Implement proper error boundaries
- Monitor bundle size: `npm run build`

---

## 📞 Quick Help

| Issue | Check |
|-------|-------|
| Page not loading | Check page.tsx exists in correct folder |
| API calls failing | Verify NEXT_PUBLIC_API_URL environment variable |
| Styles not applying | Clear .next folder and restart server |
| Module not found | Run npm install |
| Type errors | Run npm run type-check |
| Port 3000 in use | Kill process: lsof -i :3000 \| grep LISTEN |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| SETUP.md | Getting started guide |
| DOCUMENTATION.md | Complete API & components |
| BACKEND_INTEGRATION.md | Backend setup guide |
| DEPLOYMENT.md | Production deployment |
| README.md | Original project readme |

---

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/

---

## ✅ Pre-Deployment Checklist

- [ ] All pages tested locally
- [ ] API endpoints configured
- [ ] Environment variables set
- [ ] Authentication working
- [ ] Forms validated
- [ ] Responsive design verified
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Security audit passed: `npm audit`

---

**Last Updated**: January 2025  
**Quick Reference Version**: 1.0

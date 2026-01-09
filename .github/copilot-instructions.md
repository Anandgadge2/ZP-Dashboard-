# G2C Admin Dashboard - AI Coding Agent Guide

## Project Overview
**G2C Admin Dashboard** is a Government-to-Citizen (G2C) admin portal built with Next.js 16, TypeScript, React 19, and TailwindCSS. It manages three core entities: **Grievances**, **Appointments**, and **Citizens** with real-time status tracking and admin analytics.

## Architecture Pattern

### Layered Structure
- **`app/`** - Next.js 16 App Router with file-based routing
  - Root layout injects Sidebar + Topbar for authenticated routes
  - Dashboard routes protected by token validation in layout effect
  - `/login` is public; `/dashboard/*` requires Bearer token
- **`components/`** - Reusable UI components (StatCard, DataTable, StatusBadge, Loader)
- **`services/`** - API layer with axios instances
- **`types/`** - TypeScript interfaces for domain entities

### Key Data Flows
1. **Auth Flow**: Username/password → `/api/auth/login` → localStorage token → redirect to `/dashboard`
2. **Fetch Flow**: Protected routes call API services → parse `res.data.data` → setState
3. **State Pattern**: Client components fetch data in `useEffect`, filter/compute, render StatCards or DataTables

## Critical Conventions

### API Integration Pattern
**See**: [services/api.ts](services/api.ts), [services/grievanceApi.ts](services/grievanceApi.ts)

```typescript
// Base API client with auto-token injection

import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://whatsapp-webhook-2-agvr.onrender.com/api"
    : "http://localhost:3000/api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });
api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});


// Service functions extract nested data: res.data.data
export const getAllGrievances = async () => {
  const res = await api.get("/grievances");
  return res.data.data; // ← Critical pattern: nested destructuring
};
```

**Rule**: Always destructure `res.data.data` when calling API endpoints.

### Type System
- **Entities**: [Grievance](types/grievance.ts) (status: PENDING|IN_PROGRESS|RESOLVED|REJECTED), [Appointment](types/appointment.ts) (status: PENDING|CONFIRMED|CANCELLED|COMPLETED)
- Status types are discriminated unions—use them for filtering and conditional rendering
- Always extend existing types when adding fields

### Component Composition
- **Presentational**: StatCard, DataTable, StatusBadge, ChartCard take props, no side effects
- **Container**: Pages/layouts manage state, fetch data, compose presentational components
- **Layout Wrapper**: [app/dashboard/layout.tsx](app/dashboard/layout.tsx) handles auth guard and provides Sidebar/Topbar structure

## Build & Development Workflows

```bash
npm run dev      # Start Next.js dev server on http://localhost:3000
npm run build    # TypeScript + ESLint check, then Next.js build
npm start        # Run production build
npm run lint     # Run ESLint
```

**Authentication Required**: Accessing `/dashboard/*` routes requires:
1. Valid token in localStorage
2. Backend API running at `http://localhost:3000/api`
3. Token must be Bearer-format and sent in Authorization header

## Common Task Patterns

### Adding a New Dashboard Section
1. Create route in `app/dashboard/{section}/page.tsx` marked with `"use client"`
2. Add service in `services/{section}Api.ts` following nested-destructure pattern
3. Define types in `types/{section}.ts`
4. Update Sidebar menu in [components/Sidebar.tsx](components/Sidebar.tsx)
5. Use StatCard for metrics, DataTable for lists

### Styling
- **Framework**: TailwindCSS v4 with PostCSS
- **Theme Colors**: Primary blue `#1e3a8a`/`#1f3c88` (sidebar), gray palette for content areas
- **Grid System**: Use `grid-cols-1 md:grid-cols-4 gap-6` for responsive stat cards (see [app/dashboard/page.tsx](app/dashboard/page.tsx))

## Dependencies & Versions
- **Next.js**: 16.1.1 (App Router, built-in optimizations)
- **React**: 19.2.3 (Server Components by default)
- **Charting**: Recharts 3.6.0 (for analytics)
- **Icons**: Lucide-react 0.562.0
- **HTTP Client**: Axios 1.13.2 with request interceptors
- **Styling**: Tailwind 4.1.18, PostCSS 4

## Known Patterns & Gotchas
- **Auth Guard**: Check `useRouter` + token in useEffect of protected layouts, not in pages
- **Nested Data**: Backend wraps responses in `{ data: {...} }`—always extract
- **Client Components**: Prefix with `"use client"` for interactivity; layouts can be server-side
- **Token Storage**: localStorage only—plan for SSR migration if needed
- **API Base URL**: Hardcoded as `http://localhost:3000/api`; consider env vars for production

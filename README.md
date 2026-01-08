# 🏛️ G2C Admin Dashboard (Frontend)

A modern, secure, and responsive **Admin Dashboard** built using **Next.js (App Router)** and **Tailwind CSS** for managing Government-to-Citizen (G2C) services such as grievances, appointments, citizens, and analytics.
This dashboard is designed to integrate seamlessly with a **WhatsApp Chatbot backend** and provides real-time operational visibility for administrators.

---

## ✨ Key Features

* 🔐 **JWT-based Admin Authentication**
* 📊 **Dashboard KPIs** (Grievances, Appointments, Status counts)
* 📝 **Grievance Management**

  * View full grievance details
  * Status tracking
  * Location & image (Cloudinary) visibility
* 📅 **Appointment Management**

  * Pending / Confirmed / Cancelled tracking
* 👥 **Citizen Profiles**

  * Phone-based citizen grouping
  * All grievances & appointments per citizen
* 📈 **Analytics**

  * Grievance & appointment status distribution
  * Operational insights for administrators
* 🚪 **Protected Routes**

  * Dashboard accessible only after login
* 🎨 **Clean, Government-grade UI**

  * Responsive
  * Accessible
  * Minimal and professional

---

## 🧱 Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Framework  | Next.js 14 (App Router)          |
| Language   | TypeScript                       |
| Styling    | Tailwind CSS                     |
| Auth       | JWT (via Backend API)            |
| Charts     | Recharts (optional / extensible) |
| API Client | Axios                            |
| State      | React Hooks                      |

---

## 📁 Project Structure

```
dashboard/
├── app/
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── grievances/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── citizens/page.tsx
│   │   └── analytics/page.tsx
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── StatCard.tsx
│   ├── DataTable.tsx
│   ├── StatusBadge.tsx
│   ├── ChartCard.tsx
│   └── Loader.tsx
│
├── services/
│   ├── authApi.ts
│   ├── grievanceApi.ts
│   ├── appointmentApi.ts
│   └── citizenApi.ts
│
├── types/
│   ├── grievance.ts
│   ├── appointment.ts
│   ├── citizen.ts
│   └── analytics.ts
│
└── public/
    └── logo.png
```

---

## 🔐 Authentication Flow

1. Admin logs in via `/login`
2. Backend returns a **JWT token**
3. Token is stored in `localStorage`
4. All dashboard routes are protected via `dashboard/layout.tsx`
5. Unauthorized users are redirected to `/login`

---

## 🌐 Backend Integration

This frontend expects a **running backend API** with the following base URL:

```
http://localhost:3000
```

### Required Backend APIs

| Feature          | Endpoint                |
| ---------------- | ----------------------- |
| Login            | `POST /api/auth/login`  |
| All Grievances   | `GET /api/grievances`   |
| All Appointments | `GET /api/appointments` |
| Admin Data       | `GET /api/admin/*`      |

> ⚠️ Make sure **CORS is enabled** in the backend.

---

## ⚙️ Environment Setup

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

---

## 🚀 Running the Project

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start Development Server

```bash
npm run dev
```

### 3️⃣ Open in Browser

```
http://localhost:3001/login
```

---

## 👤 Default Admin Credentials (Development)

```
Username: admin
Password: admin@123
```

> Change credentials immediately in production.

---

## 🛡️ Security Notes

* JWT tokens are required for all admin APIs
* Dashboard routes are protected at layout level
* Sensitive data is never exposed without authentication
* Images are loaded securely from Cloudinary URLs

---

## 📊 Future Enhancements

* Role-based dashboards (SUPER_ADMIN / ADMIN / OFFICER)
* SLA & TAT analytics
* Export reports (PDF / Excel)
* Map-based grievance visualization
* Audit logs & admin activity tracking

---

## 📄 License

This project is intended for **government / institutional use**.
Internal or controlled distribution is recommended.

---

## 🤝 Contribution

For internal development:

* Follow feature-branch workflow
* Keep UI consistent with existing components
* Ensure API contracts remain stable

---

## 📞 Support

For issues or enhancements, contact the project maintainer or backend team.

---

**Built for scalable, transparent, and citizen-centric governance.**

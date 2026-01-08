# ZP Dashboard - Production Grade G2C Portal

A comprehensive Government-to-Citizen (G2C) Admin Dashboard built with Next.js 16, React 19, TypeScript, and TailwindCSS. Enables citizens to signup, login, and track their grievances and appointments in real-time.

## 🎯 Features

### Citizen Portal
- **User Registration**: Multi-section signup form with validation
- **User Login**: Secure authentication with token-based sessions
- **Application Tracking**: Real-time status tracking for grievances and appointments
- **Detailed Dashboard**: View all applications with current status and progress

### Admin Dashboard
- **Comprehensive Analytics**: 8+ key metrics with visualizations
- **Grievance Management**: Search, filter, and manage citizen grievances
- **Appointment Management**: Organize and track appointments
- **Citizen Database**: View all citizens with application counts
- **Performance Metrics**: Resolution rates, completion rates, satisfaction scores
- **Real-time Updates**: Live notifications for new applications

### Design Features
- **Responsive Design**: Mobile, tablet, and desktop support
- **Smooth Animations**: Fade-in, slide-up, bounce, and pulse effects
- **Gradient Backgrounds**: Professional color scheme (Blue #1f3c88 to Indigo #1a2d66)
- **Interactive Components**: Modal dialogs, progress bars, status badges
- **Professional UI**: Cards, tables, charts, and data visualizations

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.1 | React framework with file-based routing |
| React | 19.2.3 | UI library with server components |
| TypeScript | 5 | Type-safe JavaScript |
| TailwindCSS | 4.1.18 | Utility-first CSS styling |
| Recharts | 3.6.0 | Data visualization (charts/graphs) |
| Lucide-react | 0.562.0 | Icon library |
| Axios | - | HTTP client for API calls |

## 📁 Project Structure

```
dashboard/
├── app/
│   ├── globals.css              # Global styles with animations
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── login/                   # Admin login page
│   ├── admin-signup/            # Admin registration page
│   ├── citizen-login/           # Citizen login page
│   ├── citizen-signup/          # Citizen registration page
│   ├── citizen-dashboard/       # Citizen tracking dashboard
│   └── dashboard/
│       ├── layout.tsx           # Dashboard layout with auth guard
│       ├── page.tsx             # Dashboard home with metrics
│       ├── admin-landing/       # Admin overview page
│       ├── analytics/           # Analytics with charts
│       ├── grievances/          # Grievances management
│       ├── appointments/        # Appointments management
│       └── citizens/            # Citizen directory
├── components/
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── Topbar.tsx               # Header with user menu
│   ├── Modal.tsx                # Base modal component
│   ├── EnhancedModal.tsx        # Enhanced modal with sizes
│   ├── ApplicationTracker.tsx   # Timeline/status tracker
│   ├── ChartCard.tsx            # Chart wrapper component
│   ├── DataTable.tsx            # Reusable data table
│   ├── StatCard.tsx             # Statistics card
│   ├── StatusBadge.tsx          # Status indicator
│   └── Loader.tsx               # Loading spinner
├── services/
│   ├── api.ts                   # Base API configuration
│   ├── appointmentApi.ts        # Appointment API calls
│   ├── authApi.ts               # Authentication API
│   ├── citizenApi.ts            # Citizen API calls
│   └── grievanceApi.ts          # Grievance API calls
├── types/
│   ├── appointment.ts           # Appointment type definitions
│   └── grievance.ts             # Grievance type definitions
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Modern web browser for testing

### Installation

1. **Clone the Repository**
```bash
cd dashboard
```

2. **Install Dependencies**
```bash
npm install
```

3. **Run Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📋 Login Credentials

### Admin Portal
- **URL**: `http://localhost:3000/login`
- **Demo Email**: `admin@zp.com`
- **Demo Password**: `admin@2024`

### Citizen Portal
- **Login URL**: `http://localhost:3000/citizen-login`
- **Signup URL**: `http://localhost:3000/citizen-signup`
- **Demo Email**: `citizen@example.com`
- **Demo Password**: `citizen@2024`

## 🎨 Color Scheme

| Element | Color | Code |
|---------|-------|------|
| Primary Gradient | Blue to Indigo | #1f3c88 → #1a2d66 |
| Success | Green | #22c55e |
| Warning | Yellow/Orange | #f59e0b |
| Error | Red | #ef4444 |
| Info | Blue | #3b82f6 |

## ✨ Key Features by Page

### 1. Admin Login (`/login`)
- Split layout design
- Email/password authentication
- Demo credentials display
- "Forgot Password" link
- Responsive mobile design

### 2. Admin Dashboard (`/dashboard`)
- 8 metric cards with gradient styling
- Recent grievances and appointments
- Quick navigation to all sections
- Loading state handling
- Authentication guard

### 3. Citizen Signup (`/citizen-signup`)
- 3-section form (Personal, Address, Security)
- Real-time validation
- Error highlighting
- Success messaging
- Progress indicator

### 4. Citizen Login (`/citizen-login`)
- Animated background
- Split layout
- Remember me checkbox
- Forgot password link
- Demo credentials

### 5. Citizen Dashboard (`/citizen-dashboard`)
- Application overview with stats
- Grievances and appointments list
- Progress bars showing completion
- Detailed modal view
- Timeline tracking

### 6. Grievances (`/dashboard/grievances`)
- Searchable table with 10+ records
- Status filtering
- Summary cards
- Empty state handling

### 7. Appointments (`/dashboard/appointments`)
- Filter by status
- Search by name/phone/department
- Detailed information display

### 8. Citizens (`/dashboard/citizens`)
- Dual view (Grid/Table)
- Summary statistics
- Search functionality
- Application counts

### 9. Analytics (`/dashboard/analytics`)
- Pie charts (status distribution)
- Bar charts (category/department breakdown)
- Interactive citizen modal
- Timeline of events

## 🔐 Authentication

The application uses **token-based authentication** with localStorage:

```typescript
// Citizen authentication
localStorage.setItem("citizenToken", "token_value");
localStorage.setItem("citizenRole", "citizen");

// Admin authentication
localStorage.setItem("adminToken", "token_value");
localStorage.setItem("adminRole", "admin");
```

## 📊 API Integration

### Service Files Structure
All API calls are centralized in the `services/` directory:

```typescript
// services/authApi.ts
export const loginCitizen = (email: string, password: string) => {
  return api.post("/citizens/login", { email, password });
};

// services/grievanceApi.ts
export const fetchGrievances = () => {
  return api.get("/grievances");
};
```

### Adding New API Endpoints

1. Create service function in appropriate file
2. Use Axios instance from `services/api.ts`
3. Handle response with `res.data.data` pattern
4. Add error handling in component

## 🎬 Animations

Available animation classes:

| Animation | Class | Duration | Effect |
|-----------|-------|----------|--------|
| Fade In | `.fade-in` | 0.3s | Opacity transition |
| Slide Down | `.slide-down` | 0.3s | Top to bottom |
| Slide Up | `.slide-up` | 0.5s | Bottom to top |
| Slide In Left | `.slide-in-left` | 0.4s | Left to right |
| Slide In Right | `.slide-in-right` | 0.4s | Right to left |
| Bounce | `.bounce` | 1s infinite | Up and down |
| Pulse | `.pulse` | 2s infinite | Opacity pulse |

### Using Animations in Components
```tsx
<div className="animate-fade-in">Content</div>
<div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
  Staggered item
</div>
```

## 📱 Responsive Design

The dashboard is fully responsive:

- **Mobile** (< 640px): Single column layout
- **Tablet** (640px - 1024px): Two column layout
- **Desktop** (> 1024px): Multi-column layout

## 🔄 State Management

The app uses React's built-in state management:

- `useState` for local component state
- `useRouter` for navigation
- `localStorage` for persistent state
- Context API ready for future expansion

## 🚧 Future Enhancements

- [ ] MongoDB integration for data persistence
- [ ] Cloudinary image storage for application photos
- [ ] Email notifications system
- [ ] Department-wise approval workflows
- [ ] Advanced filtering and export options
- [ ] SMS notifications for status updates
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Push notifications

## 📞 Support

For issues and feature requests, please contact the development team.

## 📄 License

This project is proprietary software. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Developers**: G2C Platform Team

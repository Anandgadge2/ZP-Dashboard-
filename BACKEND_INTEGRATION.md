# Backend Integration Guide

This guide explains how to integrate the ZP Dashboard frontend with your backend services.

## 📋 API Endpoints Expected

### Authentication Endpoints

#### Citizen Login
```
POST /api/citizens/login
Request:
{
  "email": "citizen@example.com",
  "password": "password123"
}
Response:
{
  "data": {
    "token": "jwt_token_here",
    "citizen": {
      "id": "citizen_id",
      "fullName": "John Doe",
      "email": "citizen@example.com",
      "phone": "9876543210"
    }
  },
  "status": "success"
}
```

#### Citizen Signup
```
POST /api/citizens/signup
Request:
{
  "fullName": "John Doe",
  "email": "citizen@example.com",
  "phone": "9876543210",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "password": "password123"
}
Response:
{
  "data": {
    "token": "jwt_token_here",
    "citizen": { ... }
  },
  "status": "success"
}
```

#### Admin Login
```
POST /api/admin/login
Request:
{
  "email": "admin@zp.com",
  "password": "admin@2024"
}
Response:
{
  "data": {
    "token": "jwt_token_here",
    "admin": {
      "id": "admin_id",
      "fullName": "Admin Name",
      "email": "admin@zp.com",
      "department": "Grievances"
    }
  },
  "status": "success"
}
```

#### Admin Signup
```
POST /api/admin/signup
Request:
{
  "organizationName": "Municipal Corporation",
  "department": "grievances",
  "email": "admin@zp.com",
  "phone": "9876543210",
  "fullName": "Admin Name",
  "position": "Department Head",
  "address": "123 Admin St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "password": "admin@2024"
}
Response:
{
  "data": {
    "token": "jwt_token_here",
    "admin": { ... }
  },
  "status": "success"
}
```

### Grievance Endpoints

#### Get All Grievances
```
GET /api/grievances
Headers:
{
  "Authorization": "Bearer {token}"
}
Response:
{
  "data": [
    {
      "id": "GR001",
      "citizenId": "citizen_id",
      "title": "Road Damage Issue",
      "description": "Pothole on Main Street",
      "category": "Public Works",
      "status": "PENDING",
      "priority": "high",
      "createdAt": "2025-12-15T10:30:00Z",
      "updatedAt": "2025-12-15T10:30:00Z",
      "location": {
        "latitude": 19.0760,
        "longitude": 72.8777
      }
    }
  ],
  "status": "success"
}
```

#### Get Single Grievance
```
GET /api/grievances/{grievanceId}
Headers:
{
  "Authorization": "Bearer {token}"
}
Response:
{
  "data": { ... grievance object ... },
  "status": "success"
}
```

#### Create Grievance
```
POST /api/grievances
Headers:
{
  "Authorization": "Bearer {token}",
  "Content-Type": "multipart/form-data"
}
Request:
{
  "title": "Grievance Title",
  "description": "Detailed description",
  "category": "Public Works",
  "priority": "high",
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777
  },
  "photos": [File, File] // Optional image files
}
Response:
{
  "data": { ... new grievance ... },
  "status": "success"
}
```

#### Update Grievance Status
```
PUT /api/grievances/{grievanceId}
Headers:
{
  "Authorization": "Bearer {token}"
}
Request:
{
  "status": "IN_PROGRESS",
  "notes": "Under investigation"
}
Response:
{
  "data": { ... updated grievance ... },
  "status": "success"
}
```

### Appointment Endpoints

#### Get All Appointments
```
GET /api/appointments
Headers:
{
  "Authorization": "Bearer {token}"
}
Response:
{
  "data": [
    {
      "id": "AP001",
      "citizenId": "citizen_id",
      "citizenName": "John Doe",
      "department": "License",
      "date": "2025-12-25",
      "time": "10:00 AM",
      "status": "CONFIRMED",
      "purpose": "Driving License Renewal",
      "createdAt": "2025-12-15T10:30:00Z"
    }
  ],
  "status": "success"
}
```

#### Create Appointment
```
POST /api/appointments
Headers:
{
  "Authorization": "Bearer {token}"
}
Request:
{
  "department": "License",
  "date": "2025-12-25",
  "time": "10:00 AM",
  "purpose": "License Renewal"
}
Response:
{
  "data": { ... new appointment ... },
  "status": "success"
}
```

### Citizen Endpoints

#### Get All Citizens (Admin Only)
```
GET /api/citizens
Headers:
{
  "Authorization": "Bearer {token}"
}
Response:
{
  "data": [
    {
      "id": "citizen_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "city": "Mumbai",
      "grievanceCount": 3,
      "appointmentCount": 2,
      "registeredAt": "2025-12-01"
    }
  ],
  "status": "success"
}
```

#### Get Citizen Profile
```
GET /api/citizens/{citizenId}
Headers:
{
  "Authorization": "Bearer {token}"
}
Response:
{
  "data": {
    "id": "citizen_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "grievances": [
      {
        "id": "GR001",
        "title": "Road Issue",
        "status": "PENDING",
        "createdAt": "2025-12-15"
      }
    ],
    "appointments": [
      {
        "id": "AP001",
        "department": "License",
        "date": "2025-12-25",
        "status": "CONFIRMED"
      }
    ]
  },
  "status": "success"
}
```

## 🔧 Updating API Configuration

### Edit `services/api.ts`

```typescript
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("citizenToken") || localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired
      localStorage.removeItem("citizenToken");
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Cloudinary Configuration (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Database (Optional)
NEXT_PUBLIC_DB_URL=your_database_url
```

## 📝 Service File Examples

### `services/grievanceApi.ts`

```typescript
import api from "./api";

export const grievanceApi = {
  // Get all grievances
  getAllGrievances: async () => {
    const response = await api.get("/grievances");
    return response.data.data;
  },

  // Get single grievance
  getGrievance: async (id: string) => {
    const response = await api.get(`/grievances/${id}`);
    return response.data.data;
  },

  // Create grievance
  createGrievance: async (data: FormData) => {
    const response = await api.post("/grievances", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  // Update grievance
  updateGrievance: async (id: string, data: any) => {
    const response = await api.put(`/grievances/${id}`, data);
    return response.data.data;
  },

  // Delete grievance
  deleteGrievance: async (id: string) => {
    const response = await api.delete(`/grievances/${id}`);
    return response.data.data;
  },
};
```

### `services/authApi.ts`

```typescript
import api from "./api";

export const authApi = {
  // Citizen login
  citizenLogin: async (email: string, password: string) => {
    const response = await api.post("/citizens/login", { email, password });
    const { token, citizen } = response.data.data;
    localStorage.setItem("citizenToken", token);
    return citizen;
  },

  // Citizen signup
  citizenSignup: async (data: any) => {
    const response = await api.post("/citizens/signup", data);
    const { token, citizen } = response.data.data;
    localStorage.setItem("citizenToken", token);
    return citizen;
  },

  // Admin login
  adminLogin: async (email: string, password: string) => {
    const response = await api.post("/admin/login", { email, password });
    const { token, admin } = response.data.data;
    localStorage.setItem("adminToken", token);
    return admin;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("citizenToken");
    localStorage.removeItem("adminToken");
  },
};
```

## 🖼️ Image Upload with Cloudinary

### Install Cloudinary SDK

```bash
npm install next-cloudinary
```

### Update Component

```typescript
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      uploadPreset="your_upload_preset"
      onSuccess={(result: any) => {
        setImageUrl(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <button onClick={() => open()}>Upload Image</button>
      )}
    </CldUploadWidget>
  );
}
```

## 🗄️ Database Models (For Reference)

### Citizen Model
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  passwordHash: String,
  profilePhoto: String (Cloudinary URL),
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Grievance Model
```javascript
{
  _id: ObjectId,
  grievanceId: String (custom), // GR001, GR002, etc.
  citizenId: ObjectId,
  title: String,
  description: String,
  category: String,
  subcategory: String,
  priority: String,
  status: String,
  photos: [String], // Cloudinary URLs
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  timeline: [
    {
      date: Date,
      status: String,
      notes: String,
      updatedBy: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```javascript
{
  _id: ObjectId,
  appointmentId: String,
  citizenId: ObjectId,
  citizenName: String,
  department: String,
  date: Date,
  time: String,
  status: String,
  purpose: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing with Mock Data

The current implementation includes mock data. To test with real API:

1. Update `services/api.ts` with your API URL
2. Replace mock data in pages with actual API calls
3. Ensure backend endpoints match the expected format

Example replacement in component:

```typescript
// Before (Mock Data)
const mockGrievances = [...];
setGrievances(mockGrievances);

// After (Real API)
try {
  const data = await grievanceApi.getAllGrievances();
  setGrievances(data);
} catch (error) {
  console.error("Failed to fetch grievances", error);
}
```

## 🔒 Security Checklist

- [ ] HTTPS enabled on production
- [ ] CORS configured properly
- [ ] JWT token validation on backend
- [ ] Password hashing (bcrypt) implemented
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Sensitive data not logged
- [ ] Environment variables secured
- [ ] API keys not exposed in frontend

## 📧 Email Integration

For notifications, consider using:
- SendGrid
- AWS SES
- Nodemailer

Example notification triggers:
- Grievance submitted
- Status updated
- Appointment scheduled
- Appointment cancelled
- Grievance resolved

---

**Last Updated**: January 2025

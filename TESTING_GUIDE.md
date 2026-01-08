# Quick Start Guide - G2C Dashboard

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Steps

1. **Install Dependencies**
   ```bash
   cd dashboard
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## Testing the New Features

### 1. Home Page (Unified Login Hub)
✅ **URL:** `http://localhost:3000/`

**What to Test:**
- See two cards: Admin Portal and Citizen Portal
- Click "Admin Login" → Goes to `/login`
- Click "Admin Sign Up" → Goes to `/admin-signup`
- Click "Citizen Login" → Goes to `/citizen-login`
- Click "Citizen Sign Up" → Goes to `/citizen-signup`
- Observe animated background with pulsing circles
- Check responsive design (resize browser window)

### 2. Password Visibility Toggle
✅ **Test on any login/signup page**

**Steps:**
1. Go to any login page (`/login` or `/citizen-login`)
2. Click in the password field
3. Type a password (e.g., "mypassword123")
4. Click the **eye icon** on the right side of password field
5. ✓ Password becomes visible as plain text
6. Click eye icon again
7. ✓ Password becomes hidden (dots/asterisks)

**Features:**
- Eye icon appears on hover
- Icon changes between Eye and EyeOff
- Works on all password fields
- Disabled state when form is loading

### 3. Admin Login
✅ **URL:** `http://localhost:3000/login`

**Demo Credentials:**
```
Email: admin@example.com
Password: admin123
```

**Features to Test:**
- [ ] Enter demo credentials
- [ ] Click "Sign In" button
- [ ] See loading spinner while authenticating
- [ ] Success → Redirected to `/dashboard`
- [ ] "Sign up here" link goes to `/admin-signup`
- [ ] "Back to Home" link goes to `/`
- [ ] Password eye toggle works

### 4. Admin Signup
✅ **URL:** `http://localhost:3000/admin-signup`

**Form Sections:**
1. **Organization Information**
   - Organization Name
   - Department
   - Email Address
   - Phone Number

2. **Personal Information**
   - Full Name
   - Position
   - Address
   - City, State, Pincode

3. **Security** (Password eye toggle here!)
   - Password
   - Confirm Password

**Features to Test:**
- [ ] Fill Organization section → Click "Next"
- [ ] Fill Personal section → Click "Next"
- [ ] Fill password fields (toggle eye icon)
- [ ] Click "Complete Registration"
- [ ] See success message
- [ ] Redirected to `/login`
- [ ] "Back to Home" link works

### 5. Citizen Login
✅ **URL:** `http://localhost:3000/citizen-login`

**Demo Credentials:**
```
Email: citizen@example.com
Password: password123
```

**Features to Test:**
- [ ] Enter demo credentials
- [ ] Test password eye toggle
- [ ] Click "Sign In"
- [ ] Redirected to `/citizen-dashboard` on success
- [ ] "Sign up here" link works
- [ ] "Back to Home" link works
- [ ] "Forgot?" link is present

### 6. Citizen Signup
✅ **URL:** `http://localhost:3000/citizen-signup`

**Form Sections:**
1. **Personal Information**
   - Full Name
   - Email Address
   - Phone Number

2. **Address Information**
   - Address
   - City
   - State
   - Pincode

3. **Security** (Password eye toggle!)
   - Password
   - Confirm Password

**Features to Test:**
- [ ] Fill all fields
- [ ] Test password field eye toggle (both fields)
- [ ] Click "Create Account"
- [ ] See success animation
- [ ] Redirected to `/citizen-login`
- [ ] "Back to Home" link works

### 7. Citizen Dashboard (NEW FEATURES!)
✅ **URL:** `http://localhost:3000/citizen-dashboard`

**Access Methods:**
1. Go to home page → Click "Citizen Login"
2. Use demo credentials: `citizen@example.com` / `password123`
3. Or directly visit URL if token exists in localStorage

**NEW FEATURES TO TEST:**

#### A. Citizen Information Section
- Click "View Details" on any application card
- See modal popup
- Look for "Citizen Information" section showing:
  - **Name:** Rajesh Kumar / Priya Singh / Amit Patel
  - **Phone:** +91 9876543210 (clickable)
  - **Email:** rajesh@example.com (clickable)

#### B. Location Display
- In the modal, find "Location" section (with MapPin icon)
- See:
  - Formatted address (e.g., "Sector 5, New Delhi, India")
  - Coordinates: Latitude and Longitude (e.g., "28.5355, 77.3910")
- Blue-themed background for distinction

#### C. Image Gallery
- In the modal, scroll to "Uploaded Images" section
- See multiple images in a grid (2-3 columns based on screen size)
- Hover over images:
  - ✓ Image scales up slightly
  - ✓ Semi-transparent dark overlay appears
  - ✓ "View" button appears in center
- Click "View" button (can implement lightbox in future)

#### D. Test Different Applications
1. **Road Damage Issue (GR001)**
   - Status: IN_PROGRESS (65% complete)
   - Citizen: Rajesh Kumar
   - Location: Sector 5, New Delhi
   - Images: 2 road damage photos

2. **Municipal Appointment (AP001)**
   - Status: COMPLETED (100% complete)
   - Citizen: Priya Singh
   - Location: Municipal Office, Delhi
   - Images: 1 appointment proof

3. **Water Supply Issue (GR002)**
   - Status: RESOLVED (100% complete)
   - Citizen: Amit Patel
   - Location: Sector 12, New Delhi
   - Images: 1 water supply photo

### 8. Admin Dashboard
✅ **URL:** `http://localhost:3000/dashboard`

**Access:** Login as admin from `/login`

**Existing Features:**
- [ ] View dashboard statistics
- [ ] See grievances and appointments
- [ ] Check citizen information
- [ ] Navigate to sub-pages (Analytics, Appointments, etc.)

## Navigation Map

```
Home (/)
├── Admin Path
│   ├── Login (/login) → Dashboard (/dashboard)
│   └── Signup (/admin-signup) → Login
│
└── Citizen Path
    ├── Login (/citizen-login) → Dashboard (/citizen-dashboard)
    └── Signup (/citizen-signup) → Login

All Pages → Back to Home link available
```

## Feature Checklist

### Home Page
- [x] Animated gradient background
- [x] Two role cards (Admin/Citizen)
- [x] Login buttons for each role
- [x] Signup buttons for each role
- [x] Demo credentials display
- [x] Features showcase section
- [x] Smooth animations

### Password Input Component
- [x] Eye/EyeOff toggle
- [x] Shows password on toggle
- [x] Hides password on toggle
- [x] Works on all password fields
- [x] Supports disabled state
- [x] Accessible button
- [x] Responsive styling

### Authentication Pages
- [x] Admin Login updated
- [x] Citizen Login updated
- [x] Citizen Signup updated
- [x] Admin Signup updated
- [x] All have PasswordInput component
- [x] All have home navigation link
- [x] All have signup/login links
- [x] Form validation preserved

### Citizen Dashboard
- [x] Applications list view
- [x] Detailed modal popup
- [x] Citizen information display
- [x] Location information display
- [x] Coordinates (lat/lng)
- [x] Image gallery
- [x] Hover effects
- [x] Responsive grid layout
- [x] Multiple applications

## Troubleshooting

### Page Won't Load
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)
- Verify dev server is running

### Password Toggle Not Working
- Check browser console for JavaScript errors
- Ensure you're on a password input field
- Try refreshing the page

### Modal Won't Open
- Click "View Details" button on application card
- Ensure you're on citizen dashboard
- Check if JavaScript is enabled

### Can't Login
- Use demo credentials exactly as shown
- Check localStorage (F12 → Storage → Local Storage)
- Token should appear after successful login

### Images Not Displaying
- Check browser console for image errors
- Images are SVG placeholders (for demo)
- In production, replace with real image URLs

## Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ⚠️ Mobile browsers (responsive, tested)

## Performance Tips

1. **First Load:**
   - Takes ~2-3 seconds for initial build
   - Subsequent loads are instant

2. **Image Loading:**
   - SVG placeholders load instantly
   - Real images will require optimization

3. **Responsive Performance:**
   - Works smoothly on all screen sizes
   - Animations use hardware acceleration

## Keyboard Navigation

- `Tab` - Navigate between form fields
- `Enter` - Submit form or click focused button
- `Escape` - Close modal (if implemented)
- `Shift+Tab` - Navigate backwards

## Accessibility

- All form fields have associated labels
- Color contrast meets WCAG standards
- Focus indicators visible
- Error messages clear and helpful
- Icon buttons have text equivalents

## Next Steps

After testing:

1. ✅ Verify all navigation links work
2. ✅ Test password toggle on all password fields
3. ✅ Check citizen dashboard displays images/location
4. ✅ Verify responsive design
5. ✅ Test on different browsers
6. ✅ Test on mobile devices

Then proceed to:
- Implement real API integration
- Add actual image upload functionality
- Integrate real maps for location display
- Set up proper database
- Deploy to production

---

**Happy Testing!** 🎉

For issues: Check console → Clear cache → Restart dev server

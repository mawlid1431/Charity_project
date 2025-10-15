# Admin Dashboard Access

## How to Access the Admin Panel

1. **URL**: Navigate to `/admin` in your browser
   - Example: `http://localhost:5173/admin`

2. **Login Credentials**:
   - **Username**: `admin`
   - **Password**: `admin123`

## Admin Features

### 🎨 **Design & Theme**
- **Dark/Light Mode Toggle**: Available in both login and dashboard
- **Brand Colors**: Follows your orange (#ff6f0f) brand theme
- **Responsive Design**: Works on desktop and mobile

### 📊 **Dashboard Overview**
- **Statistics Cards**: Total projects, donations, donors, success rate
- **Navigation Tabs**: Switch between Projects and Donations management
- **Quick Actions**: Back to main site, logout, theme toggle

### 🎯 **Projects Management**
- **Add New Projects**: Complete form with validation
- **Edit Existing Projects**: Modify project details
- **Delete Projects**: Remove projects with confirmation
- **Project Fields**:
  - Project Name (required)
  - Description (required)
  - Target Amount (required)
  - Raised Amount
  - Status (Active/Paused/Completed)
  - Project Image (Upload from device OR URL)

### 🖼️ **Image Upload Features**
- **Local Upload**: Upload images directly from your computer
- **File Validation**: Only images (PNG, JPG, GIF) up to 5MB
- **Image Preview**: See uploaded image before saving
- **URL Alternative**: Can also use image URLs instead of uploading
- **Remove Image**: Easy removal with X button

### 💰 **Donations Management**
- **View All Donations**: Complete donation history
- **Search & Filter**: Find donations by donor, project, or status
- **Export Data**: Download donation data as CSV
- **Donation Details**: Donor info, amounts, payment methods, dates

### 🔐 **Security Features**
- **Authentication**: Login required to access admin features
- **Session Management**: Stays logged in until logout
- **Form Validation**: Prevents invalid data entry
- **Confirmation Dialogs**: Prevents accidental deletions

## Navigation

- **From Main Site**: Go to `/admin` URL
- **From Admin**: Use "Back to Site" button to return to main website
- **Logout**: Clears session and returns to login screen

## Technical Notes

- **Local Storage**: Admin session is stored locally
- **Image Handling**: Uploaded images are converted to base64 for storage
- **Responsive**: Fully responsive design for all screen sizes
- **Animations**: Smooth transitions and hover effects throughout
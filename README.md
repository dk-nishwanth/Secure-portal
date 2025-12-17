# Secure File Portal - Role-Based Access Control System

A modern, secure file management portal with structured role-based authentication and comprehensive access control.

## 🎯 Features

### **Structured Role-Based Login System**

This application implements a complete role-based access control (RBAC) system with three distinct user roles:

#### 1. **Super Admin** 🔴
- **Full System Access** - Complete control over all modules
- **Dashboard Metrics** - System-wide analytics and statistics
- **Admin Management** - Create, edit, and manage administrators with email service
- **User Management** - Manage internal and external users
- **Organizations** - Create and manage organizations with email notifications
- **Folder Management** - Full control over internal/external folders
- **Access Management** - Grant and revoke access permissions
- **No 2FA Required** - Streamlined login for super administrators

#### 2. **Admin** 🔵
- **Limited Administrative Access** - Focused on user and resource management
- **Dashboard Metrics** - Admin-specific analytics
- **User Management** - Create, edit, and manage users (internal/external)
- **Folder Management** - Manage folders and file access
- **Access Management** - Control user permissions and folder access
- **No 2FA Required** - Quick access for administrators
- **Restricted Access** - Cannot access Admin Management or Organizations

#### 3. **User** 🟢
- **Standard User Access** - Personal file and folder management
- **2FA Authentication Required** - Enhanced security with two-factor authentication
- **Dashboard** - Personal file statistics and activity
- **Folder Management** - Access to assigned folders and files
- **Access Management** - View and request access permissions
- **Email Notifications** - Receive notifications for file sharing and access changes
- **File Viewer** - Preview images, videos, audio, and documents

---

## 🔐 Authentication Flow

### **Login Process**

1. **Super Admin & Admin**
   - Email and password login
   - Direct access to dashboard (no 2FA)
   - Role-specific navigation and features

2. **Regular Users**
   - Email and password login
   - **Mandatory 2FA verification**
   - Access granted after successful 2FA

### **Demo Credentials**

The application includes demo login buttons for testing:

- **Super Admin Demo** - Full system access
- **Admin Demo** - Administrative access
- **User Demo** - Standard user access with 2FA

---

## 📊 Module Breakdown

### **Super Admin Modules**

| Module | Features |
|--------|----------|
| **Dashboard** | System metrics, Create Organization button, Activity tracking |
| **Admin Management** | Create/Edit/Delete admins, Email service, Individual details |
| **User Management** | Internal/External users, Create/Edit/Delete, Individual details |
| **Organizations** | List/Create/Edit organizations, Email service, Member management |
| **Folder Management** | Internal/External folders, Access control, File viewer & editor |
| **Access Management** | Category access list, Folder access list, Provide & Edit access |

### **Admin Modules**

| Module | Features |
|--------|----------|
| **Dashboard** | User/Folder statistics, Access requests, Recent activity |
| **User Management** | Internal/External users, Create/Edit/Delete, Individual details |
| **Folder Management** | Internal/External folders, Access control, File viewer & editor |
| **Access Management** | Category access list, Folder access list, Provide & Edit access |

### **User Modules**

| Module | Features |
|--------|----------|
| **Dashboard** | Personal file stats, Storage usage, Recent activity, Charts |
| **Folder Management** | View assigned folders, File preview, Access requests |
| **Access Management** | View permissions, Request access |
| **Email Notifications** | File sharing alerts, Access notifications, Login URLs |

---

## 🎨 Design Features

- **Dark Theme** - Modern dark UI with `#0a0a0f` background
- **Orange Accent** - Primary color `#FF7619` for CTAs and highlights
- **Glassmorphism** - Backdrop blur effects and translucent cards
- **Gradient Borders** - Color-coded visual hierarchy
- **Responsive Design** - Mobile-friendly layouts
- **Smooth Animations** - Polished transitions and interactions

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ 
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd secure-file-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Build for Production**

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Recharts** - Data visualization

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── Login.tsx              # Login page with role selection
│   ├── TwoFactorAuth.tsx      # 2FA verification for users
│   ├── Dashboard.tsx          # Main dashboard router
│   ├── RoleBasedDashboard.tsx # Role-specific dashboards
│   ├── AdminModule.tsx        # Admin management (Super Admin)
│   ├── CompleteUserManagement.tsx  # User management
│   ├── OrganizationsPage.tsx # Organization management
│   ├── FolderManagement.tsx   # Folder and file management
│   ├── AccessManagement.tsx   # Access control
│   ├── EmailNotifications.tsx # Email notification system
│   ├── ActivityPage.tsx       # Activity tracking
│   ├── ProfilePage.tsx        # User profile
│   └── SettingsPage.tsx       # Application settings
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
├── App.tsx                    # Root component
└── main.tsx                   # Application entry point
```

---

## 🔒 Security Features

- **Role-Based Access Control (RBAC)** - Strict permission enforcement
- **Two-Factor Authentication** - Mandatory for regular users
- **Session Management** - Secure authentication state
- **Input Validation** - Form validation and sanitization
- **Protected Routes** - Role-based route protection
- **Email Notifications** - Security alerts and access logs

---

## 📧 Email Notification System

Users receive email notifications for:

- **File Sharing** - When files are shared with them
- **Access Granted** - When folder/file access is provided
- **File Updates** - When shared files are modified
- **Access Revoked** - When permissions are removed

**Notification Features:**
- Copy login URL
- Copy file/folder URL
- Direct file viewer access
- Read/Unread status tracking
- Timestamp and sender information

---

## 🎯 Workflow Verification

All three role workflows have been systematically verified:

✅ **Super Admin Workflow** - 100% Complete  
✅ **Admin Workflow** - 100% Complete  
✅ **User Workflow** - 100% Complete  

Each role has been tested for:
- Correct navigation access
- Proper feature restrictions
- Role-specific dashboards
- Authentication flows
- Module functionality

---

## 📝 License

This project is proprietary and confidential.

---

## 👥 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

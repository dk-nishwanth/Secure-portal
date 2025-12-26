import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Users, Files, FolderOpen, Shield, AlertTriangle, Activity, TrendingUp, Plus, HardDrive, Upload, Clock, Settings, Database, Lock, UserCog } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const securityData = [
  { month: "Sep", blocked: 45, allowed: 120 },
  { month: "Oct", blocked: 52, allowed: 135 },
  { month: "Nov", blocked: 61, allowed: 142 },
  { month: "Dec", blocked: 48, allowed: 156 },
  { month: "Jan", blocked: 73, allowed: 168 },
  { month: "Feb", blocked: 65, allowed: 178 },
];

const threatData = [
  { time: "00:00", threats: 12 },
  { time: "04:00", threats: 8 },
  { time: "08:00", threats: 25 },
  { time: "12:00", threats: 18 },
  { time: "16:00", threats: 32 },
  { time: "20:00", threats: 15 },
];

const recentActivity = [
  { id: 1, action: "Uploaded quarterly_report.pdf", time: "5 mins ago", icon: Upload, color: "text-green-400" },
  { id: 2, action: "Created folder 'Q4 Reports'", time: "1 hour ago", icon: FolderOpen, color: "text-orange-400" },
  { id: 3, action: "Shared document with team", time: "2 hours ago", icon: Files, color: "text-blue-400" },
  { id: 4, action: "Updated security_policy.docx", time: "1 day ago", icon: Files, color: "text-purple-400" },
];

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

// Admin data structure
interface AdminUser {
  id: string;
  initials: string;
  name: string;
  fullName: string;
  role: string;
  access: string;
  activeUsers?: number;
  organizations?: number;
  lastLogin: string;
  color: string;
}

const adminUsers: AdminUser[] = [
  {
    id: 'sa',
    initials: 'SA',
    name: 'Sara',
    fullName: 'Sara Anderson',
    role: 'Super Admin',
    access: 'Full Access',
    activeUsers: 1247,
    organizations: 12,
    lastLogin: '2 hours ago',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'jd',
    initials: 'JD',
    name: 'Jon',
    fullName: 'Jon Davis',
    role: 'System Admin',
    access: 'Full Access',
    activeUsers: 856,
    organizations: 8,
    lastLogin: '5 hours ago',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'mj',
    initials: 'MJ',
    name: 'Maria',
    fullName: 'Maria Johnson',
    role: 'Admin',
    access: 'Limited Access',
    activeUsers: 423,
    organizations: 5,
    lastLogin: '1 day ago',
    color: 'from-green-500 to-emerald-500'
  }
];

function SuperAdminDashboard({ onNavigate }: DashboardProps = {}) {
  const [admins, setAdmins] = useState<AdminUser[]>(adminUsers);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser>(adminUsers[0]);
  const [selectedQuickAccess, setSelectedQuickAccess] = useState<string | null>(null);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');
  const [newAdminAccess, setNewAdminAccess] = useState('Limited Access');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = () => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddAdmin = () => {
    if (newAdminName.trim()) {
      const newAdmin: AdminUser = {
        id: `admin${Date.now()}`,
        initials: getInitials(newAdminName),
        name: newAdminName.split(' ')[0],
        fullName: newAdminName,
        role: newAdminRole,
        access: newAdminAccess,
        activeUsers: 0,
        organizations: 0,
        lastLogin: 'Just now',
        color: getRandomColor()
      };
      setAdmins([...admins, newAdmin]);
      setNewAdminName('');
      setNewAdminRole('Admin');
      setNewAdminAccess('Limited Access');
      setShowAddAdminModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <div>
          <h1 className="text-3xl text-white">
            Good Morning <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Admin!</span>
          </h1>
          <p className="text-gray-400">Smart task tracking to keep your security workflow moving smoothly</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column - Total Users Stats */}
        <div className="flex flex-col gap-6">
          {/* Total Users Stats */}
          <div className="relative group flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 h-full flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-white">Total Users</span>
              </div>
              <div>
                <p className="text-4xl text-white mb-2">1,247</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Compare to last month</span>
                  <span className="text-green-400 text-sm">+12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="relative group flex-1">
            <div className="absolute inset-0 rounded-3xl blur-xl" style={{ backgroundColor: 'rgba(0, 188, 212, 0.1)' }}></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 h-full flex flex-col">
              <div className="mb-4">
                <h4 className="text-white mb-6">Storage Usage</h4>
                <div className="relative h-12 flex items-center mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 relative overflow-hidden"
                      style={{ width: "68%" }}
                    >
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
                      }}></div>
                    </div>
                  </div>
                  <span className="relative z-10 ml-4 text-white">68%</span>
                </div>
                <p className="text-sm text-gray-400">68 GB used <span className="text-white">of 100 GB total</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - All Track in One */}
        <div className="relative group h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold">All track in one</h3>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">View all</button>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 content-start">
              {/* Total Files */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <Files className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Files</span>
                </div>
                <p className="text-2xl text-white mb-2">8,942</p>
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>+6%</span>
                </div>
              </div>

              {/* Total Folders */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <FolderOpen className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Folders</span>
                </div>
                <p className="text-2xl text-white mb-2">342</p>
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2%</span>
                </div>
              </div>

              {/* Threats */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Blocked</span>
                </div>
                <p className="text-2xl text-white mb-2">127</p>
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <span>-23%</span>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <Activity className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Sessions</span>
                </div>
                <p className="text-2xl text-white mb-2">342</p>
                <div className="flex items-center gap-1 text-red-400 text-xs">
                  <span>+15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Access & Admin Card */}
        <div className="flex flex-col gap-6">
          {/* Quick Access */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-white mb-4">Quick Access</h3>
              <div className="flex items-center gap-2 mb-4">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    onClick={() => setSelectedAdmin(admin)}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${admin.color} flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all ${
                      selectedAdmin.id === admin.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a1a2e] scale-110' : ''
                    }`}
                    title={admin.fullName}
                  >
                    {admin.initials}
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddAdminModal(true)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  title="Add new admin"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-400">
                <p className="mb-1">{admins.map(a => a.name).join(', ')}</p>
                {selectedAdmin && (
                  <p className="text-[#FF7619] font-medium mt-2">Selected: {selectedAdmin.fullName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Admin Access Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 shadow-2xl shadow-orange-500/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white text-sm font-semibold leading-tight">{selectedAdmin.fullName}</h4>
                    <p className="text-white/70 text-xs">{selectedAdmin.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onNavigate?.('users')}
                      className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-xl hover:bg-white/30 transition-all flex items-center justify-center group cursor-pointer"
                      title="User Management"
                    >
                      <Users className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => onNavigate?.('settings')}
                      className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-xl hover:bg-white/30 transition-all flex items-center justify-center group cursor-pointer"
                      title="System Settings"
                    >
                      <Settings className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => onNavigate?.('admin')}
                      className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-xl hover:bg-white/30 transition-all flex items-center justify-center group cursor-pointer"
                      title="Admin Module"
                    >
                      <Database className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => onNavigate?.('access')}
                      className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-xl hover:bg-white/30 transition-all flex items-center justify-center group cursor-pointer"
                      title="Access Management"
                    >
                      <Lock className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/80 text-xs mb-1">{selectedAdmin.access}</p>
                    <p className="text-white text-xs">Last: {selectedAdmin.lastLogin}</p>
                  </div>
                  {selectedAdmin.activeUsers && (
                    <div className="text-right">
                      <p className="text-white/80 text-xs">{selectedAdmin.activeUsers} users</p>
                      <p className="text-white/80 text-xs">{selectedAdmin.organizations} orgs</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Activity Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-lg">Share Activity</h3>
            <div className="flex gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search activity..."
                  className="w-full px-4 py-2 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-[#FF7619] focus:outline-none transition-all"
                />
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-sm text-gray-400">File Name</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Shared With</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Expires</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Files className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">Q4_Report.pdf</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">john@company.com</td>
                  <td className="py-4 px-4 text-yellow-400 text-sm">In 2 days</td>
                  <td className="py-4 px-4 text-green-400 text-sm">Active</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Files className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">Budget_2024.xlsx</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">team@company.com</td>
                  <td className="py-4 px-4 text-orange-400 text-sm">Tomorrow</td>
                  <td className="py-4 px-4 text-green-400 text-sm">Active</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Files className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">Project_Plan.docx</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">sarah@company.com</td>
                  <td className="py-4 px-4 text-red-400 text-sm">In 6 hours</td>
                  <td className="py-4 px-4 text-green-400 text-sm">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Admin Modal */}
      <Dialog open={showAddAdminModal} onOpenChange={setShowAddAdminModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Plus className="w-5 h-5 text-white" />
              </div>
              Add New Admin
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Add a new admin user to Quick Access
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label htmlFor="adminFullName" className="text-gray-300 mb-2 block font-medium">
                Full Name
              </Label>
              <Input
                id="adminFullName"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                placeholder="Enter full name"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                onKeyDown={(e) => e.key === 'Enter' && handleAddAdmin()}
              />
            </div>

            <div>
              <Label htmlFor="adminRole" className="text-gray-300 mb-2 block font-medium">
                Role
              </Label>
              <Select value={newAdminRole} onValueChange={setNewAdminRole}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="System Admin">System Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="adminAccess" className="text-gray-300 mb-2 block font-medium">
                Access Level
              </Label>
              <Select value={newAdminAccess} onValueChange={setNewAdminAccess}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                  <SelectItem value="Full Access">Full Access</SelectItem>
                  <SelectItem value="Limited Access">Limited Access</SelectItem>
                  <SelectItem value="View Only">View Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddAdminModal(false);
                setNewAdminName('');
                setNewAdminRole('Admin');
                setNewAdminAccess('Limited Access');
              }}
              className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddAdmin}
              disabled={!newAdminName.trim()}
              className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold disabled:opacity-50"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function UserDashboard({ onNavigate }: DashboardProps = {}) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-3xl text-white">
          Welcome back <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">User!</span>
        </h1>
        <p className="text-gray-400">Here's an overview of your files and recent activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Files */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Files className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+8%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Files</p>
              <p className="text-3xl text-white">247</p>
              <p className="text-xs text-gray-500 mt-2">Files you own or have access to</p>
            </div>
          </div>
        </div>

        {/* Total Folders */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+3%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Folders</p>
              <p className="text-3xl text-white">42</p>
              <p className="text-xs text-gray-500 mt-2">Organized folders</p>
            </div>
          </div>
        </div>

        {/* Storage Used */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Storage Used</p>
              <p className="text-3xl text-white">2.4 GB</p>
              <p className="text-xs text-gray-500 mt-2">of 10 GB available</p>
              <div className="mt-3">
                <Progress value={24} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-white text-lg mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Activity */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg mb-1">File Activity</h3>
                <p className="text-sm text-gray-400">Last 6 months</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={securityData}>
                <defs>
                  <linearGradient id="userFilesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="allowed" fill="url(#userFilesGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Trend */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg mb-1">Storage Trend</h3>
                <p className="text-sm text-gray-400">Last 24 hours</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="storageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#storageGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onNavigate }: DashboardProps = {}) {
  const { name } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-3xl text-white">
          Welcome back <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{name || 'Admin'}!</span>
        </h1>
        <p className="text-gray-400">Manage users, folders, and access permissions from your admin dashboard</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Users Stats */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">Total Users</span>
            </div>
            <div>
              <p className="text-4xl text-white mb-2">847</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Compare to last month</span>
                <span className="text-green-400 text-sm">+8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Folders */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">Total Folders</span>
            </div>
            <div>
              <p className="text-4xl text-white mb-2">256</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Internal & External</span>
                <span className="text-green-400 text-sm">+5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Access Requests */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">Access Requests</span>
            </div>
            <div>
              <p className="text-4xl text-white mb-2">23</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Pending approval</span>
                <span className="text-yellow-400 text-sm">Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management Overview */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-white text-lg mb-6">User Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-gray-400 text-sm">Internal Users</p>
                  <p className="text-2xl text-white">542</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-gray-400 text-sm">External Users</p>
                  <p className="text-2xl text-white">305</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Folder Management Overview */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-white text-lg mb-6">Folder Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-gray-400 text-sm">Internal Folders</p>
                  <p className="text-2xl text-white">178</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-gray-400 text-sm">External Folders</p>
                  <p className="text-2xl text-white">78</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-white text-lg mb-6">Recent Admin Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Created user account for john.doe@company.com', time: '10 mins ago', icon: Users, color: 'text-blue-400' },
              { action: 'Provided edit access to Marketing folder', time: '25 mins ago', icon: Shield, color: 'text-purple-400' },
              { action: 'Created new internal folder "Q1 Reports"', time: '1 hour ago', icon: FolderOpen, color: 'text-orange-400' },
              { action: 'Updated user permissions for external users', time: '2 hours ago', icon: Shield, color: 'text-green-400' },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface RoleBasedDashboardProps {
  onNavigate?: (page: string) => void;
}

export function RoleBasedDashboard({ onNavigate }: RoleBasedDashboardProps = {}) {
  const { role } = useAuth();

  if (role === 'super-admin') {
    return <SuperAdminDashboard onNavigate={onNavigate} />;
  }
  
  if (role === 'admin') {
    return <AdminDashboard onNavigate={onNavigate} />;
  }

  return <UserDashboard onNavigate={onNavigate} />;
}

import { useAuth } from "../contexts/AuthContext";
import { Users, Files, FolderOpen, Shield, AlertTriangle, Activity, TrendingUp, Plus, HardDrive, Upload, Clock, FileText, Briefcase, FileBarChart, Lock } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "./ui/progress";

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

function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-3xl text-white">
          Good Morning <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Admin!</span>
        </h1>
        <p className="text-gray-400">Smart task tracking to keep your security workflow moving smoothly</p>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  SA
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  JD
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  MJ
                </div>
                <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                <p className="mb-1">Sara, Jon, Maria</p>
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
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-white">Admin Access</h4>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex gap-2 mb-4">
                    <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-xl"></div>
                    <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-xl"></div>
                    <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-xl"></div>
                    <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-xl"></div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/80 text-xs mb-1">Admin User</p>
                    <p className="text-white">ADMIN-2287</p>
                  </div>
                  <div className="text-white text-xs">
                    <span>Full Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Activity Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-lg">Security Activity</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                <span className="text-sm">Search</span>
              </button>
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
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">Security Scan</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">#21325554</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">*****5635</td>
                  <td className="py-4 px-4 text-green-400 text-sm">Complete</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Files className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">File Upload</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">#21325554</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">*****5635</td>
                  <td className="py-4 px-4 text-green-400 text-sm">Complete</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="text-white text-sm">Threat Blocked</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">#21325554</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">*****5635</td>
                  <td className="py-4 px-4 text-red-400 text-sm">Blocked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDashboard() {
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

export function RoleBasedDashboard() {
  const { role } = useAuth();

  if (role === 'super-admin') {
    return <SuperAdminDashboard />;
  }

  return <UserDashboard />;
}

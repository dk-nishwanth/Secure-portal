import { Users, Files, FolderOpen, Shield, AlertTriangle, Activity, TrendingUp, ArrowRight, ChevronRight, CheckCircle2, XCircle, AlertCircle, Plus } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const securityData = [
  { month: "Sep", blocked: 45, allowed: 120 },
  { month: "Oct", blocked: 52, allowed: 135 },
  { month: "Nov", blocked: 61, allowed: 142 },
  { month: "Dec", blocked: 48, allowed: 156 },
  { month: "Jan", blocked: 73, allowed: 168 },
  { month: "Feb", blocked: 65, allowed: 178 },
  { month: "Mar", blocked: 82, allowed: 185 },
  { month: "Apr", blocked: 71, allowed: 192 },
  { month: "May", blocked: 89, allowed: 201 },
  { month: "Jun", blocked: 95, allowed: 215 },
];

const threatData = [
  { time: "00:00", threats: 12 },
  { time: "04:00", threats: 8 },
  { time: "08:00", threats: 25 },
  { time: "12:00", threats: 18 },
  { time: "16:00", threats: 32 },
  { time: "20:00", threats: 15 },
];

const activityLogs = [
  { id: 1, type: "success", action: "User Login", user: "john.doe@company.com", time: "2 mins ago", ip: "192.168.1.100" },
  { id: 2, type: "warning", action: "Failed Login Attempt", user: "unknown@malicious.com", time: "15 mins ago", ip: "45.76.23.189" },
  { id: 3, type: "success", action: "File Uploaded", user: "sarah.smith@company.com", time: "1 hour ago", ip: "192.168.1.105" },
  { id: 4, type: "danger", action: "Suspicious Activity Detected", user: "admin@company.com", time: "2 hours ago", ip: "192.168.1.1" },
  { id: 5, type: "success", action: "Password Changed", user: "mike.jones@company.com", time: "3 hours ago", ip: "192.168.1.112" },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-3xl text-white">
          Good Morning <span className="bg-[linear-gradient(to_right,var(--lime-green),var(--cyan))] bg-clip-text text-transparent">Admin!</span>
        </h1>
        <p className="text-gray-400">Smart task tracking to keep your security workflow moving smoothly</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Total Revenue & Daily Limit */}
        <div className="space-y-6">
          {/* Total Users Stats */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
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

          {/* Daily Transactions Limit */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--lime-green)]/10 to-[var(--cyan)]/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="mb-4">
                <h4 className="text-white mb-6">Security Threat Limit</h4>
                <div className="relative h-12 flex items-center mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--lime-green)]/20 to-[var(--cyan)]/20 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-[linear-gradient(to_right,var(--lime-green),var(--cyan))] relative overflow-hidden"
                      style={{ width: "42%" }}
                    >
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
                      }}></div>
                    </div>
                  </div>
                  <span className="relative z-10 ml-4 text-white">42%</span>
                </div>
                <p className="text-sm text-gray-400">127 blocked <span className="text-white">from 300 limit</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - All Track in One */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white">All track in one</h3>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">View all</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                  <span>+8%</span>
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
                  <span>+5%</span>
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

        {/* Right Column - Quick Transfer & Your Cards */}
        <div className="space-y-6">
          {/* Quick Transfer */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-white mb-4">Quick Access</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  SA
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--cyan)] to-pink-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  IH
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  JN
                </div>
                <div className="w-12 h-12 rounded-full bg-[linear-gradient(to_bottom_right,var(--lime-green),var(--cyan))] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  AX
                </div>
                <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                <p className="mb-1">Sara</p>
                <p>Ishan, Jon, Alex</p>
              </div>
            </div>
          </div>

          {/* Admin Access Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--lime-green)]/20 to-[var(--cyan)]/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-[linear-gradient(to_bottom_right,var(--lime-green),var(--cyan))] rounded-3xl p-6 shadow-2xl shadow-[var(--lime-green)]/30 overflow-hidden">
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

      {/* Hidden original stat - keeping the threat one */}
      <div className="hidden">
        {/* Total Users */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-3xl text-white">1,247</p>
              <p className="text-xs text-gray-500 mt-2">Active users this month</p>
            </div>
          </div>
        </div>

      </div>

      {/* Balance Spending Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-lg">Security Activity</h3>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50 w-64"
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Activity Table */}
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
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded bg-white/10"></div>
                      <span className="text-gray-400 text-sm">*****5635</span>
                    </div>
                  </td>
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
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded bg-white/10"></div>
                      <span className="text-gray-400 text-sm">*****5635</span>
                    </div>
                  </td>
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
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded bg-white/10"></div>
                      <span className="text-gray-400 text-sm">*****5635</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-red-400 text-sm">Blocked</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">System Check</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">#21325554</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded bg-white/10"></div>
                      <span className="text-gray-400 text-sm">*****5635</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-green-400 text-sm">Complete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Analytics */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg mb-1">Security Analytics</h3>
                <p className="text-sm text-gray-400">Monthly threat overview</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs rounded-lg bg-[var(--cyan)]/20 text-[var(--cyan)] border border-[var(--cyan)]/30">
                  Monthly
                </button>
                <button className="px-3 py-1.5 text-xs rounded-lg text-gray-400 hover:bg-white/5">
                  Weekly
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={securityData}>
                <defs>
                  <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient id="allowedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
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
                <Bar dataKey="blocked" fill="url(#blockedGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="allowed" fill="url(#allowedGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--cyan)] to-pink-500"></div>
                <span className="text-xs text-gray-400">Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <span className="text-xs text-gray-400">Allowed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Threats with Savings Style */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg mb-1">Real-time Threats</h3>
                <p className="text-sm text-gray-400">Last 24 hours activity</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs text-red-400">Live</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#threatGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* Savings Style Progress Bars */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">System Protection</span>
                  <span className="text-sm text-white">87%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[linear-gradient(to_right,var(--lime-green),var(--cyan))] relative"
                    style={{ width: "87%" }}
                  >
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,.15) 6px, rgba(255,255,255,.15) 12px)'
                    }}></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">$87 / $100 protection level</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Threat Response</span>
                  <span className="text-sm text-white">95%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 relative"
                    style={{ width: "95%" }}
                  >
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,.15) 6px, rgba(255,255,255,.15) 12px)'
                    }}></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">$95 / $100 response rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg">System Status</h3>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">CPU Usage</span>
                  <span className="text-sm text-white">34%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: "34%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Memory</span>
                  <span className="text-sm text-white">62%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Storage</span>
                  <span className="text-sm text-white">78%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-lime-green h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Network</span>
                  <span className="text-sm text-white">45%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[var(--cyan)] to-pink-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-white">All Systems Operational</p>
                  <p className="text-xs text-gray-400">No issues detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg mb-1">Recent Activity</h3>
                <p className="text-sm text-gray-400">Latest security events</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--cyan)]/10 text-[var(--cyan)] hover:bg-[var(--cyan)]/20 transition-all border border-[var(--cyan)]/20">
                <span className="text-sm">View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-white/5 hover:border-white/10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    log.type === "success" ? "bg-green-500/20" :
                    log.type === "warning" ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}>
                    {log.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                    {log.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-400" />}
                    {log.type === "danger" && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">{log.action}</p>
                    <p className="text-xs text-gray-400">{log.user} • {log.ip}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{log.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-white text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-gradient-to-br from-[var(--cyan)]/10 to-[var(--cyan)]/5 rounded-xl border border-[var(--cyan)]/20 hover:border-[var(--cyan)]/40 transition-all group">
              <Shield className="w-6 h-6 text-[var(--cyan)] mb-2" />
              <p className="text-sm text-white mb-1">Security Scan</p>
              <p className="text-xs text-gray-400">Run full scan</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <Users className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-sm text-white mb-1">Add User</p>
              <p className="text-xs text-gray-400">Create new user</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all group">
              <Files className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-sm text-white mb-1">Upload File</p>
              <p className="text-xs text-gray-400">Add new file</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
              <Activity className="w-6 h-6 text-yellow-400 mb-2" />
              <p className="text-sm text-white mb-1">View Reports</p>
              <p className="text-xs text-gray-400">Generate report</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
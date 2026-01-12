import { User, Mail, Shield, MoreVertical, Search, Plus, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "./ui/button";

const users = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@company.com", 
    role: "Admin", 
    status: "active", 
    lastActive: "2 mins ago",
    avatar: "JD"
  },
  { 
    id: 2, 
    name: "Sarah Smith", 
    email: "sarah.smith@company.com", 
    role: "User", 
    status: "active", 
    lastActive: "1 hour ago",
    avatar: "SS"
  },
  { 
    id: 3, 
    name: "Mike Jones", 
    email: "mike.jones@company.com", 
    role: "User", 
    status: "active", 
    lastActive: "3 hours ago",
    avatar: "MJ"
  },
  { 
    id: 4, 
    name: "Emily Brown", 
    email: "emily.brown@company.com", 
    role: "Moderator", 
    status: "inactive", 
    lastActive: "2 days ago",
    avatar: "EB"
  },
  { 
    id: 5, 
    name: "David Wilson", 
    email: "david.wilson@company.com", 
    role: "User", 
    status: "active", 
    lastActive: "5 hours ago",
    avatar: "DW"
  },
];

const stats = [
  { label: "Total Users", value: "1,247", color: "from-blue-500 to-cyan-500", bgColor: "from-blue-500/10 to-cyan-500/10" },
  { label: "Active Now", value: "342", color: "from-green-500 to-emerald-500", bgColor: "from-green-500/10 to-emerald-500/10" },
  { label: "Inactive", value: "89", color: "from-yellow-500 to-lime-green", bgColor: "from-yellow-500/10 to-lime-green/10" },
  { label: "New Today", value: "23", color: "from-[var(--cyan)] to-pink-500", bgColor: "from-[var(--cyan)]/10 to-pink-500/10" },
];

export function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-3xl mb-2 font-bold"
            style={{
              background: 'linear-gradient(to right, rgba(154, 24, 251, 1), rgb(200, 100, 200), #FF7619)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            User Management
          </h2>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        <Button 
          className="rounded-xl gap-2 border-0 backdrop-blur-xl transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #FF7619, #FF8A3D, #FF7619)',
            boxShadow: '0 8px 32px rgba(255, 118, 25, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Animated background overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF8A3D, #FFB366, #FF7619)',
            }}
          />
          <Plus className="w-4 h-4 text-white relative z-10" />
          <span className="font-semibold text-white relative z-10">
            Add User
          </span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all`}></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50"
          />
        </div>
        <Button variant="outline" className="rounded-xl gap-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
          <Shield className="w-4 h-4" />
          Filter by Role
        </Button>
      </div>

      {/* Users Table */}
      <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-4 px-6 text-sm text-gray-400">User</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400">Email</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400">Role</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400">Last Active</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--cyan)] to-cyan-500 flex items-center justify-center text-white">
                        {user.avatar}
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      user.role === "Admin" ? "bg-[var(--cyan)]/20 text-[var(--cyan)]" :
                      user.role === "Moderator" ? "bg-blue-500/20 text-blue-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {user.status === "active" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{user.lastActive}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--cyan)] to-pink-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white">Admins</p>
              <p className="text-sm text-gray-400">Full access</p>
            </div>
          </div>
          <p className="text-3xl text-white mb-2">24</p>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div className="bg-gradient-to-r from-[var(--cyan)] to-pink-500 h-2 rounded-full" style={{ width: "15%" }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">15% of total users</p>
        </div>

        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white">Moderators</p>
              <p className="text-sm text-gray-400">Limited access</p>
            </div>
          </div>
          <p className="text-3xl text-white mb-2">89</p>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: "35%" }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">35% of total users</p>
        </div>

        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white">Users</p>
              <p className="text-sm text-gray-400">Basic access</p>
            </div>
          </div>
          <p className="text-3xl text-white mb-2">1,134</p>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: "90%" }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">90% of total users</p>
        </div>
      </div>
    </div>
  );
}

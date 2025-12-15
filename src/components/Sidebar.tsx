import { LayoutDashboard, FolderOpen, Users, Shield, Activity, Settings, BarChart3, Clock } from "lucide-react";
import { ActivePage } from "./Dashboard";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const { role } = useAuth();

  const menuItems = [
    { id: "dashboard" as ActivePage, icon: LayoutDashboard, tooltip: "Dashboard" },
    { id: "files" as ActivePage, icon: FolderOpen, tooltip: "Files" },
    ...(role === "super-admin" ? [{ id: "users" as ActivePage, icon: Users, tooltip: "Users" }] : []),
  ];

  const securityItems = [
    { icon: BarChart3, tooltip: "Analytics" },
    { icon: Shield, tooltip: "Security" },
    { icon: Clock, tooltip: "History" },
    { icon: Activity, tooltip: "Activity" },
    { icon: Settings, tooltip: "Settings" },
  ];

  return (
    <aside className="fixed left-6 top-24 h-[calc(100vh-120px)] w-16 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center py-6 z-40">
      {/* Main Menu */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative ${
                  isActive
                    ? "text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: '#FF7619',
                        boxShadow: '0 0 20px rgba(255, 118, 25, 0.4), 0 0 40px rgba(255, 118, 25, 0.2)',
                      }
                    : undefined
                }
              >
                <Icon className="w-5 h-5" />
              </button>
              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#1a1a2e] rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-xl">
                {item.tooltip}
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-white/10 my-4"></div>

      {/* Security Items */}
      <div className="space-y-2 flex-1">
        {securityItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="relative group">
              <button
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon className="w-5 h-5" />
              </button>
              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#1a1a2e] rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-xl">
                {item.tooltip}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Score Indicator */}
      <div className="mt-auto">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center relative group">
          <Shield className="w-5 h-5 text-green-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a2e]"></div>
          {/* Tooltip */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#1a1a2e] rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-xl">
            <p className="text-xs text-gray-400 mb-1">Security Score</p>
            <p className="text-green-400">87% - Protected</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
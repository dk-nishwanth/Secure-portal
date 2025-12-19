import { useState } from "react";
import { Bell, LogOut, Moon, Settings, Building2, User, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { EmailNotifications } from "./EmailNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  activePage?: string;
  onPageChange?: (page: any) => void;
  onNavigateToOrganizations?: () => void;
}

export function Header({ activePage = "dashboard", onPageChange, onNavigateToOrganizations }: HeaderProps) {
  const { name, currentOrgName, logout, role } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  // Get initials from name
  const getInitials = (fullName: string | null) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white tracking-tight">CloudDoc</h1>
          </div>
        </div>

        {/* Floating Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-full p-1.5 border border-white/10 shadow-2xl">
          {/* Dashboard - shown for all roles */}
          <button 
            onClick={() => onPageChange?.('dashboard')}
            className={`px-5 py-2.5 rounded-full transition-all ${
              activePage === 'dashboard'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            style={activePage === 'dashboard' ? { background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' } : undefined}
          >
            Dashboard
          </button>

          {/* Super Admin & Admin - User Management */}
          {(role === 'super-admin' || role === 'admin') && (
            <button 
              onClick={() => onPageChange?.('users')}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activePage === 'users'
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              style={activePage === 'users' ? { background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' } : undefined}
            >
              Users
            </button>
          )}

          {/* All roles - Folder Management */}
          <button 
            onClick={() => onPageChange?.('folders')}
            className={`px-5 py-2.5 rounded-full transition-all ${
              activePage === 'folders' || activePage === 'files'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            style={activePage === 'folders' || activePage === 'files' ? { background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' } : undefined}
          >
            Folders
          </button>

          {/* All roles - Access Management */}
          <button 
            onClick={() => onPageChange?.('access')}
            className={`px-5 py-2.5 rounded-full transition-all ${
              activePage === 'access' || activePage === 'shared'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            style={activePage === 'access' || activePage === 'shared' ? { background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' } : undefined}
          >
            Access
          </button>

          {/* All roles - Activity */}
          <button 
            onClick={() => onPageChange?.('activity')}
            className={`px-5 py-2.5 rounded-full transition-all ${
              activePage === 'activity'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            style={activePage === 'activity' ? { background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' } : undefined}
          >
            Activity
          </button>

          {/* All roles - Profile */}
          <button 
            onClick={() => onPageChange?.('profile')}
            className={`px-5 py-2.5 rounded-full transition-all ${
              activePage === 'profile'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            style={activePage === 'profile' ? { background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' } : undefined}
          >
            Profile
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white w-10 h-10"
          >
            <Moon className="w-5 h-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`rounded-full relative w-10 h-10 transition-all ${
              showNotifications 
                ? 'text-white' 
                : 'hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
            style={showNotifications ? { backgroundColor: '#FF7619' } : undefined}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: showNotifications ? '#fff' : '#FF7619' }}></span>
          </Button>
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-white/10 rounded-full pr-3 transition-all">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' }}>
                  {getInitials(name)}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1a1a2e] border-white/10 w-64 mr-4" align="end">
              {/* User Info */}
              <div className="px-3 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: '#FF7619' }}>
                    {getInitials(name)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{name}</p>
                    {currentOrgName && (
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {currentOrgName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <DropdownMenuItem 
                  className="text-white hover:bg-white/10 cursor-pointer px-3 py-2"
                  onClick={() => onPageChange?.('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem 
                  className="text-red-400 hover:bg-red-500/10 cursor-pointer px-3 py-2"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Email Notifications Modal */}
      <EmailNotifications 
        open={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  );
}
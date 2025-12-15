import { Bell, Plus, LogOut, User, Moon, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { name, logout } = useAuth();

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
            <h1 className="text-white tracking-tight">Super Admin</h1>
          </div>
        </div>

        {/* Floating Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-full p-1.5 border border-white/10 shadow-2xl">
          <button className="px-5 py-2.5 rounded-full text-white transition-all shadow-lg" style={{ background: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' }}>
            Dashboard
          </button>
          <button className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            Reports
          </button>
          <button className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            Documents
          </button>
          <button className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            History
          </button>
          <button className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            Settings
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
            className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white w-10 h-10"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white relative w-10 h-10"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: '#FF7619' }}></span>
          </Button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg" style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.2)' }}>
            {getInitials(name)}
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={logout}
            className="rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 w-10 h-10"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
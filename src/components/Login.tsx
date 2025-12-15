import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Mail, Lock, Shield, FileCheck, Users, TrendingUp } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setRole, setName } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would call POST /auth/login
    // For now, we'll use demo logic
    if (email && password) {
      setName('Admin User');
      setRole('super-admin');
    }
  };

  const handleDemoLogin = (role: 'super-admin' | 'user', name: string) => {
    setName(name);
    setRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FF7619', boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-white tracking-tight">Super Admin</h1>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Enter your credentials to access the admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@superadmin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-[#1a1a2e]/50 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 118, 25, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 118, 25, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-[#1a1a2e]/50 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 118, 25, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 118, 25, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/20"
                  style={{
                    '--checkbox-checked-bg': '#FF7619',
                    '--checkbox-checked-border': '#FF7619',
                  } as React.CSSProperties & { [key: string]: string }}
                />
                <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm transition-colors" style={{ color: '#FF7619' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 118, 25, 0.8)'} onMouseLeave={(e) => e.currentTarget.style.color = '#FF7619'}>
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white rounded-xl shadow-lg transition-all"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0a0a0f] text-gray-500">Or continue with demo</span>
            </div>
          </div>

          {/* Demo Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => handleDemoLogin('super-admin', 'Admin User')}
              variant="outline"
              className="w-full h-12 border-white/10 bg-[#1a1a2e]/50 text-white hover:bg-[#1a1a2e] rounded-xl transition-all"
              style={{ '--hover-border-color': 'rgba(255, 118, 25, 0.5)' } as React.CSSProperties & { [key: string]: string }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 118, 25, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <Shield className="w-5 h-5 mr-2" style={{ color: '#FF7619' }} />
              Demo Login as Admin
            </Button>
            <Button
              type="button"
              onClick={() => handleDemoLogin('user', 'Regular User')}
              variant="outline"
              className="w-full h-12 border-white/10 bg-[#1a1a2e]/50 text-white hover:bg-[#1a1a2e] hover:border-purple-500/50 rounded-xl transition-all"
            >
              <Users className="w-5 h-5 mr-2 text-purple-500" />
              Demo Login as User
            </Button>
          </div>

          {/* Social Login - UI Only */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-white/10 bg-[#1a1a2e]/50 text-white hover:bg-[#1a1a2e] rounded-xl"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 border-white/10 bg-[#1a1a2e]/50 text-white hover:bg-[#1a1a2e] rounded-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-3xl" style={{ background: 'linear-gradient(to bottom right, rgba(255, 118, 25, 0.1), rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))' }}></div>
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl text-white mb-6">Secure File Management</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Manage, share, and protect your files with enterprise-grade security and granular permissions.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-[#1a1a2e]/30 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF7619' }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">Advanced Security</h3>
                <p className="text-gray-400 text-sm">Role-based access control and real-time threat monitoring</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#1a1a2e]/30 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">File Management</h3>
                <p className="text-gray-400 text-sm">Upload, organize, and share files with granular permissions</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#1a1a2e]/30 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">Real-time Analytics</h3>
                <p className="text-gray-400 text-sm">Monitor usage, track activities, and analyze security metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

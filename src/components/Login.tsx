  import { useState, FormEvent, CSSProperties } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, FileCheck, Users, TrendingUp, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: (email: string, role: 'super-admin' | 'admin' | 'user') => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const { setRole, setName } = useAuth();

  // Enhanced email validation
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  // Enhanced password validation
  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    // Simulate API call with loading state
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would call POST /auth/login
      // For now, we'll use demo logic
      setName('Admin User');
      setRole('super-admin');
      if (onLoginSuccess) {
        onLoginSuccess(email, 'super-admin');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'super-admin' | 'admin' | 'user', name: string) => {
    const demoEmail = role === 'super-admin' ? 'superadmin@company.com' : 
                      role === 'admin' ? 'admin@company.com' : 
                      'user@company.com';
    setName(name);
    
    // All users (super-admin, admin, and user) require 2FA
    if (onLoginSuccess) {
      onLoginSuccess(demoEmail, role);
      // Don't set role yet, wait for 2FA verification
    }
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
              <h1 className="text-white tracking-tight">CloudDoc</h1>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Enter your credentials to access the admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3" role="alert">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  onBlur={() => {
                    const error = validateEmail(email);
                    if (error) setErrors({ ...errors, email: error });
                  }}
                  disabled={isLoading}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`px-4 bg-[#1a1a2e]/50 text-white placeholder:text-gray-500 h-12 rounded-xl transition-all ${
                    errors.email 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-white/10 focus:border-[#FF7619]/50 focus:ring-2 focus:ring-[#FF7619]/20'
                  }`}
                />
                {errors.email && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">
                Password <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  onBlur={() => {
                    const error = validatePassword(password);
                    if (error) setErrors({ ...errors, password: error });
                  }}
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`pl-4 pr-14 bg-[#1a1a2e]/50 text-white placeholder:text-gray-500 h-12 rounded-xl transition-all ${
                    errors.password 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-white/10 focus:border-[#FF7619]/50 focus:ring-2 focus:ring-[#FF7619]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  tabIndex={0}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#FF7619]/50 rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-400 text-sm mt-1.5 flex items-center gap-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <a href="#" className="text-sm transition-colors" style={{ color: '#FF7619' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 118, 25, 0.8)'} onMouseLeave={(e) => e.currentTarget.style.color = '#FF7619'}>
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: isLoading ? 'rgba(255, 118, 25, 0.7)' : '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
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
              onClick={() => handleDemoLogin('super-admin', 'Super Admin')}
              variant="outline"
              className="w-full h-12 border-white/10 bg-[#1a1a2e]/50 text-white hover:bg-[#1a1a2e] rounded-xl transition-all"
              style={{ '--hover-border-color': 'rgba(255, 118, 25, 0.5)' } as CSSProperties & { [key: string]: string }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 118, 25, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <Shield className="w-5 h-5 mr-2" style={{ color: '#FF7619' }} />
              Demo Login as Super Admin
            </Button>
            <Button
              type="button"
              onClick={() => handleDemoLogin('admin', 'Admin User')}
              variant="outline"
              className="w-full h-12 border-white/10 bg-[#1a1a2e]/50 text-white hover:bg-[#1a1a2e] hover:border-blue-500/50 rounded-xl transition-all"
            >
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
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

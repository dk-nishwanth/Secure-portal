import { useState } from 'react';
import { Building2, Shield, Lock, Eye, EyeOff, Save, ArrowLeft, Briefcase, Calendar, Award, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';

interface ProfilePageProps {
  onBack?: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { name, currentOrgName, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState(name || 'User Name');
  const [email, setEmail] = useState('user@company.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [location, setLocation] = useState('San Francisco, CA');
  const [department, setDepartment] = useState('Engineering');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-white/10 text-gray-400 hover:text-white h-10 w-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">My Profile</h1>
            <p className="text-gray-400 text-sm">
              Manage your personal information and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
        <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500"></div>
          
          {/* Profile Info */}
          <div className="px-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div 
                  className="w-32 h-32 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-[#1a1a2e]"
                  style={{ 
                    background: 'linear-gradient(to bottom right, #FF7619, rgba(154, 24, 251, 1))',
                  }}
                >
                  {getInitials(fullName)}
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-white mb-1">{fullName}</h2>
                  <p className="text-gray-400 text-sm">{email}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0 md:mb-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-10 px-4 rounded-xl"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSave}
                    className="h-10 px-4 rounded-xl text-white font-medium"
                    style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#FF7619]" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Role</span>
                </div>
                <p className="text-white font-semibold capitalize">{role === 'super-admin' ? 'Super Admin' : 'User'}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-[#FF7619]" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Organization</span>
                </div>
                <p className="text-white font-semibold">{currentOrgName || 'N/A'}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-[#FF7619]" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Department</span>
                </div>
                <p className="text-white font-semibold">{department}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-[#FF7619]" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Joined</span>
                </div>
                <p className="text-white font-semibold">Jan 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-8">Change Password</h3>
              
              <div className="space-y-5 max-w-xl">
                <div>
                  <Label className="text-gray-300 mb-2 block">Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="bg-white/5 border-white/10 text-white h-11 rounded-xl pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300 mb-2 block">New Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  />
                </div>

                <Button
                  className="h-11 px-6 rounded-xl text-white font-medium"
                  style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' }}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-8">Two-Factor Authentication</h3>
              
              <div className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">2FA Protection</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                  Enabled
                </Badge>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

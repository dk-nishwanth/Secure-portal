import { useState } from 'react';
import { Building2, Shield, Lock, Eye, EyeOff, Save, ArrowLeft, Briefcase, Calendar, Award, Settings, User, Mail, Phone, MapPin, Edit3, Check, X, Camera, Upload } from 'lucide-react';
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
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState(name || 'User Name');
  const [email, setEmail] = useState('user@company.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [location, setLocation] = useState('San Francisco, CA');
  const [department, setDepartment] = useState('Engineering');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      setIsEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setIsEditingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
            <h1 className="text-3xl font-bold text-white mb-1">Profile Settings</h1>
            <p className="text-gray-400 text-sm">
              Manage your account information and security preferences
              {currentOrgName && <span className="text-[#FF7619] ml-2">• {currentOrgName}</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <div className="xl:col-span-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4"
                    style={{ 
                      background: 'linear-gradient(135deg, #FF7619 0%, #9A18FB 100%)',
                    }}
                  >
                    {getInitials(fullName)}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#FF7619] rounded-lg flex items-center justify-center hover:bg-[#FF7619]/90 transition-colors shadow-lg">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{fullName}</h2>
                <p className="text-gray-400 text-sm mb-2">{email}</p>
                <Badge 
                  className="bg-[#FF7619]/20 text-[#FF7619] border-[#FF7619]/30 px-3 py-1"
                >
                  {role === 'super-admin' ? 'Super Admin' : role === 'admin' ? 'Admin' : 'User'}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">Organization</span>
                  </div>
                  <span className="text-white text-sm font-medium">{currentOrgName || 'N/A'}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">Department</span>
                  </div>
                  <span className="text-white text-sm font-medium">{department}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">Member Since</span>
                  </div>
                  <span className="text-white text-sm font-medium">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information & Security */}
        <div className="xl:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                    <p className="text-sm text-gray-400">Update your personal details</p>
                  </div>
                </div>
                <Button
                  onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white h-9 px-4 rounded-lg"
                >
                  {isEditingProfile ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={!isEditingProfile}
                      className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10 disabled:opacity-60"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditingProfile}
                      className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10 disabled:opacity-60"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditingProfile}
                      className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10 disabled:opacity-60"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={!isEditingProfile}
                      className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10 disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                  <Button
                    onClick={handleSaveProfile}
                    className="h-10 px-6 rounded-lg text-white font-medium"
                    style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="h-10 px-6 rounded-lg border-white/10 text-gray-300 hover:bg-white/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Security Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Password</h3>
                      <p className="text-sm text-gray-400">Update password</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white h-9 px-4 rounded-lg"
                  >
                    {isEditingPassword ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Change
                      </>
                    )}
                  </Button>
                </div>
                
                {isEditingPassword ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block text-sm">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300 mb-2 block text-sm">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300 mb-2 block text-sm">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="bg-white/5 border-white/10 text-white h-11 rounded-lg pl-10"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSavePassword}
                      disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                      className="w-full h-10 rounded-lg text-white font-medium disabled:opacity-50"
                      style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' }}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-8 h-8 text-blue-400" />
                      </div>
                      <p className="text-gray-400 text-sm">Password is secure</p>
                      <p className="text-xs text-gray-500 mt-1">Last updated 30 days ago</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Two-Factor Auth</h3>
                    <p className="text-sm text-gray-400">Extra security layer</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">2FA Enabled</p>
                        <p className="text-xs text-green-400">Account protected</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 text-xs">
                      Active
                    </Badge>
                  </div>

                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-sm">Your account is secure</p>
                    <p className="text-xs text-gray-500 mt-1">2FA configured via authenticator app</p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-10 rounded-lg border-white/10 text-gray-300 hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage 2FA Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

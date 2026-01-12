import { useState } from 'react';
import { ArrowLeft, User, Edit3, Shield, Activity, Camera, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';

interface ProfilePageProps {
  onBack?: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { name, currentOrgName } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState('Nishwanth');
  const [email, setEmail] = useState('nash@clouddoc.io');
  const [phone, setPhone] = useState('+12341234234');
  const [location, setLocation] = useState('India');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
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
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">Profile <span className="text-[#FF7619]">Page</span></h1>
            
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #FF7619 0%, #FF1493 100%)',
                    }}
                  >
                    {getInitials(fullName)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1a1a2e] rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                    <Camera className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{fullName}</h2>
                <p className="text-sm text-gray-400 mb-4">{email}</p>
              </div>

              {/* Security Score */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Security Score</span>
                </div>
                <span className="text-green-400 font-semibold">92%</span>
              </div>

              {/* Last Active */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-gray-300">Last Active</span>
                </div>
                <span className="text-white font-semibold">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Personal Information */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
              {/* Header with Tabs */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 pr-8">
                  <h3 className="text-xl font-bold text-white mb-1">Personal Information</h3>
                  <p className="text-sm text-gray-400">Manage your contact information and identity</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    onClick={() => setActiveTab('general')}
                    variant="ghost"
                    className={`h-9 px-4 rounded-lg transition-all ${
                      activeTab === 'general'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    General
                  </Button>
                  <Button
                    onClick={() => setActiveTab('security')}
                    variant="ghost"
                    className={`h-9 px-4 rounded-lg transition-all ${
                      activeTab === 'security'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Security
                  </Button>
                </div>
              </div>

              {/* General Tab Content */}
              {activeTab === 'general' && (
                <div>
                  {/* Edit Details Button */}
                  <div className="flex justify-end mb-6">
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="ghost"
                      className="h-9 px-4 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Identity */}
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Full Identity</Label>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0f0f1a] border-white/10 text-white h-11 rounded-lg disabled:opacity-100 disabled:cursor-default"
                      />
                    </div>

                    {/* Primary Email */}
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Primary Email</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0f0f1a] border-white/10 text-white h-11 rounded-lg disabled:opacity-100 disabled:cursor-default"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Contact Phone</Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0f0f1a] border-white/10 text-white h-11 rounded-lg disabled:opacity-100 disabled:cursor-default"
                      />
                    </div>

                    {/* Global Location */}
                    <div>
                      <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Global Location</Label>
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={!isEditing}
                        className="bg-[#0f0f1a] border-white/10 text-white h-11 rounded-lg disabled:opacity-100 disabled:cursor-default"
                      />
                    </div>
                  </div>

                  {/* Save Button (shown when editing) */}
                  {isEditing && (
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/10">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="h-10 px-6 rounded-lg border-white/10 text-gray-300 hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        className="h-10 px-6 rounded-lg text-white font-medium"
                        style={{ 
                          background: 'linear-gradient(135deg, #FF7619, #FF8A3D)',
                          boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' 
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab Content */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Password Management */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-[#0f0f1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">Password Management</h4>
                          <p className="text-sm text-gray-400">Regularly update your credentials for better safety</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div>
                          <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Current Password</Label>
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-[#1a1a2e] border-white/10 text-white h-11 rounded-lg"
                          />
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">New Password</Label>
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-[#1a1a2e] border-white/10 text-white h-11 rounded-lg"
                          />
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Confirm New</Label>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-[#1a1a2e] border-white/10 text-white h-11 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <Button
                          className="h-11 px-8 rounded-lg text-white font-medium"
                          style={{ 
                            background: 'linear-gradient(135deg, #FF7619, #9A18FB)',
                            boxShadow: '0 4px 10px 0px rgba(255, 118, 25, 0.3)' 
                          }}
                        >
                          Update Credentials
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, User, Lock, Bell, Palette, Globe, Shield, Database, HardDrive, Trash2, Download, Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SettingsPageProps {
  onBack?: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const { name, currentOrgName, role } = useAuth();
  
  // Account Settings
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('utc');
  
  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [loginAlerts, setLoginAlerts] = useState(true);
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(false);
  const [activityDigest, setActivityDigest] = useState(true);
  
  // Appearance Settings
  const [theme, setTheme] = useState('dark');
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  
  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState('organization');
  const [activityTracking, setActivityTracking] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

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
            <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
            <p className="text-gray-400 text-sm">
              Manage your account preferences and system settings
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-[#1a1a2e]/80 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="account" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="storage" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <Database className="w-4 h-4 mr-2" />
            Storage
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">General Settings</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#FF7619]" />
                      Language
                    </Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a2e] border-white/10">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#FF7619]" />
                      Timezone
                    </Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a2e] border-white/10">
                        <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                        <SelectItem value="est">EST (GMT-5)</SelectItem>
                        <SelectItem value="pst">PST (GMT-8)</SelectItem>
                        <SelectItem value="cet">CET (GMT+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white font-medium mb-4">Account Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400">Account Name</span>
                      <span className="text-white font-medium">{name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400">Organization</span>
                      <span className="text-white font-medium">{currentOrgName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400">Role</span>
                      <span className="text-white font-medium capitalize">{role === 'super-admin' ? 'Super Admin' : 'User'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Security Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Require 2FA for account access</p>
                    </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Login Alerts</p>
                      <p className="text-sm text-gray-400">Get notified of new login attempts</p>
                    </div>
                  </div>
                  <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <Label className="text-gray-300 mb-3 block">Session Timeout</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a2e] border-white/10">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <Trash2 className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Delete Account</p>
                      <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 h-10 px-4 rounded-xl"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Push Notifications</p>
                      <p className="text-sm text-gray-400">Receive push notifications on mobile</p>
                    </div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Desktop Notifications</p>
                      <p className="text-sm text-gray-400">Show desktop notifications</p>
                    </div>
                  </div>
                  <Switch checked={desktopNotifications} onCheckedChange={setDesktopNotifications} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Activity Digest</p>
                      <p className="text-sm text-gray-400">Weekly summary of your activity</p>
                    </div>
                  </div>
                  <Switch checked={activityDigest} onCheckedChange={setActivityDigest} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-gray-300 mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === 'light'
                          ? 'border-[#FF7619] bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Sun className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white text-sm font-medium">Light</p>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-[#FF7619] bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Moon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-white text-sm font-medium">Dark</p>
                    </button>
                    <button
                      onClick={() => setTheme('auto')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === 'auto'
                          ? 'border-[#FF7619] bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Monitor className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <p className="text-white text-sm font-medium">Auto</p>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-medium mb-1">Compact Mode</p>
                    <p className="text-sm text-gray-400">Reduce spacing and padding</p>
                  </div>
                  <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-medium mb-1">Animations</p>
                    <p className="text-sm text-gray-400">Enable interface animations</p>
                  </div>
                  <Switch checked={animations} onCheckedChange={setAnimations} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Privacy & Data</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-gray-300 mb-3 block">Profile Visibility</Label>
                  <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a2e] border-white/10">
                      <SelectItem value="public">Public - Everyone can see</SelectItem>
                      <SelectItem value="organization">Organization - Only team members</SelectItem>
                      <SelectItem value="private">Private - Only you</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-medium mb-1">Activity Tracking</p>
                    <p className="text-sm text-gray-400">Allow tracking of your activity</p>
                  </div>
                  <Switch checked={activityTracking} onCheckedChange={setActivityTracking} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-medium mb-1">Data Collection</p>
                    <p className="text-sm text-gray-400">Help improve our service with usage data</p>
                  </div>
                  <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
                </div>

                <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <Download className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Download Your Data</p>
                      <p className="text-sm text-gray-400">Export all your personal data</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 h-10 px-4 rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Request Data Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Storage Tab */}
        <TabsContent value="storage" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Storage Management</h3>
              
              <div className="space-y-6">
                {/* Storage Usage */}
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <HardDrive className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Storage Used</p>
                        <p className="text-sm text-gray-400">24.5 GB of 100 GB</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-white">24.5%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: '24.5%',
                        background: 'linear-gradient(to right, #FF7619, #ef4444)'
                      }}
                    />
                  </div>
                </div>

                {/* Storage Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Storage Breakdown</h4>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-gray-300">Documents</span>
                    </div>
                    <span className="text-white font-medium">12.3 GB</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span className="text-gray-300">Images</span>
                    </div>
                    <span className="text-white font-medium">8.7 GB</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-gray-300">Videos</span>
                    </div>
                    <span className="text-white font-medium">2.1 GB</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                      <span className="text-gray-300">Other</span>
                    </div>
                    <span className="text-white font-medium">1.4 GB</span>
                  </div>
                </div>

                {/* Clear Cache */}
                <div className="p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <Trash2 className="w-5 h-5 text-orange-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Clear Cache</p>
                      <p className="text-sm text-gray-400">Free up space by clearing temporary files</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 h-10 px-4 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache (2.3 GB)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

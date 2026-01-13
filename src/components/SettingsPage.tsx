import { useState } from 'react';
import { ArrowLeft, User, Lock, Bell, Palette, Globe, Shield, Database, HardDrive, Trash2, Download, Moon, Sun, Monitor, Calendar, CheckSquare, Paintbrush } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SimpleSwitch } from './ui/simple-switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { DatePicker } from './ui/date-picker';
import { MultiSelect } from './ui/multi-select';
import { ColorPicker } from './ui/color-picker';

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

  // Component Demo Settings
  const [showDatePicker, setShowDatePicker] = useState(true); // Start with true to show it's working
  const [showMultiSelect, setShowMultiSelect] = useState(true); // Start with true to show it's working
  const [showColorPicker, setShowColorPicker] = useState(true); // Start with true to show it's working
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Set default date
  const [selectedItems, setSelectedItems] = useState<string[]>(['react', 'nextjs']); // Set default selection
  const [selectedColor, setSelectedColor] = useState('#FF7619');

  // Multi-select options
  const multiSelectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'gatsby', label: 'Gatsby' },
    { value: 'remix', label: 'Remix' },
  ];

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
          <TabsTrigger value="components" className="rounded-lg data-[state=active]:bg-[#FF7619] data-[state=active]:text-white">
            <Paintbrush className="w-4 h-4 mr-2" />
            Components
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
                  <SimpleSwitch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
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
                  <SimpleSwitch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
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
                  <SimpleSwitch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
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
                  <SimpleSwitch checked={pushNotifications} onCheckedChange={setPushNotifications} />
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
                  <SimpleSwitch checked={desktopNotifications} onCheckedChange={setDesktopNotifications} />
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
                  <SimpleSwitch checked={activityDigest} onCheckedChange={setActivityDigest} />
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
                  <SimpleSwitch checked={compactMode} onCheckedChange={setCompactMode} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-medium mb-1">Animations</p>
                    <p className="text-sm text-gray-400">Enable interface animations</p>
                  </div>
                  <SimpleSwitch checked={animations} onCheckedChange={setAnimations} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">UI Components Demo</h3>
              
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <p className="text-white font-semibold text-sm mb-1">🔧 Debug Information</p>
                <p className="text-blue-200 text-sm">
                  Date Picker: <span className="font-bold text-white">{showDatePicker ? 'ON' : 'OFF'}</span> | 
                  Multi-Select: <span className="font-bold text-white">{showMultiSelect ? 'ON' : 'OFF'}</span> | 
                  Color Picker: <span className="font-bold text-white">{showColorPicker ? 'ON' : 'OFF'}</span>
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Date Picker Toggle */}
                <div className="flex items-center justify-between p-6 rounded-xl bg-white/10 border border-white/20 hover:border-white/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">Date Picker</p>
                      <p className="text-gray-300 text-sm">Interactive calendar date selection</p>
                      <p className="text-xs text-blue-300 mt-1 font-medium">Status: {showDatePicker ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <SimpleSwitch 
                      checked={showDatePicker} 
                      onCheckedChange={(checked) => {
                        console.log('Date Picker toggle:', checked);
                        setShowDatePicker(checked);
                      }}
                    />
                  </div>
                </div>

                {/* Date Picker Demo */}
                {showDatePicker && (
                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/15 to-cyan-500/15 border-2 border-blue-500/30 animate-in slide-in-from-top-2 duration-300">
                    <Label className="text-white font-semibold mb-4 block flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Select a Date
                    </Label>
                    <DatePicker
                      date={selectedDate}
                      onDateChange={setSelectedDate}
                      placeholder="Choose a date..."
                      className="max-w-sm"
                    />
                    {selectedDate && (
                      <div className="mt-4 p-4 rounded-lg bg-blue-500/25 border border-blue-400/40">
                        <p className="text-blue-100 font-semibold text-sm mb-1">
                          📅 Selected Date:
                        </p>
                        <p className="text-white font-bold">
                          {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Multi-Select Toggle */}
                <div className="flex items-center justify-between p-6 rounded-xl bg-white/10 border border-white/20 hover:border-white/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <CheckSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">Multi-Select</p>
                      <p className="text-gray-300 text-sm">Select multiple items from a list</p>
                      <p className="text-xs text-green-300 mt-1 font-medium">Status: {showMultiSelect ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <SimpleSwitch 
                      checked={showMultiSelect} 
                      onCheckedChange={(checked) => {
                        console.log('Multi-Select toggle:', checked);
                        setShowMultiSelect(checked);
                      }}
                    />
                  </div>
                </div>

                {/* Multi-Select Demo */}
                {showMultiSelect && (
                  <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/15 to-emerald-500/15 border-2 border-green-500/30 animate-in slide-in-from-top-2 duration-300">
                    <Label className="text-white font-semibold mb-4 block flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-green-400" />
                      Choose Technologies
                    </Label>
                    <MultiSelect
                      options={multiSelectOptions}
                      selected={selectedItems}
                      onSelectionChange={setSelectedItems}
                      placeholder="Select frameworks..."
                      className="max-w-sm"
                    />
                    {selectedItems.length > 0 && (
                      <div className="mt-4 p-4 rounded-lg bg-green-500/25 border border-green-400/40">
                        <p className="text-green-100 font-semibold text-sm mb-2">
                          ✅ Selected Technologies ({selectedItems.length}):
                        </p>
                        <p className="text-white font-medium">
                          {selectedItems.map(item => 
                            multiSelectOptions.find(opt => opt.value === item)?.label
                          ).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Color Picker Toggle */}
                <div className="flex items-center justify-between p-6 rounded-xl bg-white/10 border border-white/20 hover:border-white/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">Color Picker</p>
                      <p className="text-gray-300 text-sm">Choose colors with presets and custom input</p>
                      <p className="text-xs text-purple-300 mt-1 font-medium">Status: {showColorPicker ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <SimpleSwitch 
                      checked={showColorPicker} 
                      onCheckedChange={(checked) => {
                        console.log('Color Picker toggle:', checked);
                        setShowColorPicker(checked);
                      }}
                    />
                  </div>
                </div>

                {/* Color Picker Demo */}
                {showColorPicker && (
                  <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 border-2 border-purple-500/30 animate-in slide-in-from-top-2 duration-300">
                    <Label className="text-white font-semibold mb-4 block flex items-center gap-3">
                      <Palette className="w-5 h-5 text-purple-400" />
                      Pick a Color
                    </Label>
                    <ColorPicker
                      color={selectedColor}
                      onColorChange={setSelectedColor}
                      className="max-w-sm"
                    />
                    <div className="mt-4 p-4 rounded-lg border-2 transition-all duration-300" 
                         style={{ 
                           backgroundColor: selectedColor + '25',
                           borderColor: selectedColor + '60'
                         }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-lg border-2 border-white/30 shadow-lg"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <p className="text-white font-bold text-lg">{selectedColor}</p>
                      </div>
                      <p className="text-white/90 text-sm">
                        🎨 Preview: This box uses your selected color as background with 25% opacity
                      </p>
                    </div>
                  </div>
                )}

                {/* Component Info */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/15 to-indigo-500/15 border border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <Paintbrush className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-lg mb-2">Component Library</p>
                      <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                        These components are built with Radix UI primitives and styled with Tailwind CSS. 
                        They're fully accessible and customizable for your projects.
                      </p>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <strong className="text-white">Date Picker:</strong> Built with react-day-picker and date-fns
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <strong className="text-white">Multi-Select:</strong> Custom component with badge display
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <strong className="text-white">Color Picker:</strong> Preset colors with custom hex input
                        </p>
                      </div>
                    </div>
                  </div>
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
                  <SimpleSwitch checked={activityTracking} onCheckedChange={setActivityTracking} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-medium mb-1">Data Collection</p>
                    <p className="text-sm text-gray-400">Help improve our service with usage data</p>
                  </div>
                  <SimpleSwitch checked={dataCollection} onCheckedChange={setDataCollection} />
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

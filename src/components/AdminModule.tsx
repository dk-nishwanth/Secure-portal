import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Folder, 
  Shield, 
  UserPlus,
  Mail,
  Edit2,
  Trash2,
  Eye,
  Activity,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type AdminView = 'dashboard' | 'users' | 'admins';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AdminModuleProps {
  onBack: () => void;
}

export function AdminModule({ onBack }: AdminModuleProps) {
  const { currentOrgName } = useAuth();
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminRole, setAdminRole] = useState('Admin');
  const [admins, setAdmins] = useState<Admin[]>([
    { id: '1', name: 'Super Admin', email: 'superadmin@company.com', role: 'Super Admin', status: 'Active' },
    { id: '2', name: 'System Admin', email: 'sysadmin@company.com', role: 'System Admin', status: 'Active' },
    { id: '3', name: 'Admin User', email: 'admin@company.com', role: 'Admin', status: 'Active' },
  ]);

  const handleCreateAdmin = () => {
    if (adminName.trim() && adminEmail.trim()) {
      const newAdmin: Admin = {
        id: `a${Date.now()}`,
        name: adminName,
        email: adminEmail,
        role: adminRole,
        status: 'Active',
      };
      setAdmins([newAdmin, ...admins]);
      setAdminName('');
      setAdminEmail('');
      setAdminRole('Admin');
      setShowCreateModal(false);
    }
  };

  const handleEditAdmin = () => {
    if (selectedAdmin && adminName.trim() && adminEmail.trim()) {
      setAdmins(admins.map(a => 
        a.id === selectedAdmin.id 
          ? { ...a, name: adminName, email: adminEmail, role: adminRole }
          : a
      ));
      setShowEditModal(false);
      setSelectedAdmin(null);
      setAdminName('');
      setAdminEmail('');
      setAdminRole('Admin');
    }
  };

  const handleDeleteAdmin = () => {
    if (selectedAdmin) {
      setAdmins(admins.filter(a => a.id !== selectedAdmin.id));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
    }
  };

  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setAdminName(admin.name);
    setAdminEmail(admin.email);
    setAdminRole(admin.role);
    setShowEditModal(true);
  };

  const openDeleteModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const openEmailModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowEmailModal(true);
  };

  const handleSendEmail = () => {
    if (selectedAdmin && emailSubject.trim() && emailMessage.trim()) {
      // In production, this would call API to send email
      console.log('Sending email to:', selectedAdmin.email, { subject: emailSubject, message: emailMessage });
      setShowEmailModal(false);
      setSelectedAdmin(null);
      setEmailSubject('');
      setEmailMessage('');
    }
  };

  // Dashboard Metrics
  const metrics = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Folders', value: '342', change: '+8%', icon: Folder, color: 'from-orange-500 to-orange-600' },
    { label: 'Active Sessions', value: '89', change: '+15%', icon: Activity, color: 'from-purple-500 to-purple-600' },
    { label: 'Security Score', value: '87%', change: '+3%', icon: Shield, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2 font-bold text-white">
            Admin Management
          </h1>
          <p className="text-gray-400">
            Manage administrators and system settings
            {currentOrgName && (
              <span className="ml-2 text-[#FF7619]">• {currentOrgName}</span>
            )}
          </p>
        </div>
        <div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="h-12 px-6 rounded-xl transition-all shadow-lg text-white font-semibold"
            style={{ 
              backgroundColor: '#FF7619',
              boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
            }}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Admin
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveView('dashboard')}
              variant="ghost"
              className={`h-11 px-5 rounded-xl font-medium transition-all ${
                activeView === 'dashboard' 
                  ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard Metrics
            </Button>
            <Button
              onClick={() => setActiveView('admins')}
              variant="ghost"
              className={`h-11 px-5 rounded-xl font-medium transition-all ${
                activeView === 'admins' 
                  ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Shield className="w-4 h-4 mr-2" />
              List of Admins
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-white text-lg font-semibold mb-4">Recent Admin Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New admin created', user: 'Super Admin', time: '5 mins ago', icon: UserPlus, color: 'text-green-400' },
                  { action: 'Admin permissions updated', user: 'Admin User', time: '15 mins ago', icon: Shield, color: 'text-blue-400' },
                  { action: 'Admin details edited', user: 'System Admin', time: '1 hour ago', icon: Edit2, color: 'text-orange-400' },
                  { action: 'Email sent to admin', user: 'Super Admin', time: '2 hours ago', icon: Mail, color: 'text-purple-400' },
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.user}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List of Admins View */}
      {activeView === 'admins' && (
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-white text-lg font-semibold mb-4">List of Admins</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Name</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Email</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold">
                              {admin.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-white">{admin.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-400">{admin.email}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-green-400">{admin.status}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openEditModal(admin)}
                              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openEmailModal(admin)}
                              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openDeleteModal(admin)}
                              className="w-8 h-8 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Admin Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              Create New Admin
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Add a new administrator to the system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label htmlFor="adminName" className="text-gray-300 mb-2 block font-medium">
                Admin Name
              </Label>
              <Input
                id="adminName"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter admin name"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
            
            <div>
              <Label htmlFor="adminEmail" className="text-gray-300 mb-2 block font-medium">
                Email Address
              </Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@company.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
            
            <div>
              <Label htmlFor="adminRole" className="text-gray-300 mb-2 block font-medium">
                Role
              </Label>
              <Input
                id="adminRole"
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                placeholder="Admin"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setAdminName('');
                setAdminEmail('');
                setAdminRole('Admin');
              }}
              className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateAdmin}
              className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Edit Admin</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Update administrator information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label htmlFor="editAdminName" className="text-gray-300 mb-2 block font-medium">
                Admin Name
              </Label>
              <Input
                id="editAdminName"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
            
            <div>
              <Label htmlFor="editAdminEmail" className="text-gray-300 mb-2 block font-medium">
                Email Address
              </Label>
              <Input
                id="editAdminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
            
            <div>
              <Label htmlFor="editAdminRole" className="text-gray-300 mb-2 block font-medium">
                Role
              </Label>
              <Input
                id="editAdminRole"
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedAdmin(null);
                setAdminName('');
                setAdminEmail('');
                setAdminRole('Admin');
              }}
              className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditAdmin}
              className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete Admin</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{selectedAdmin?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAdmin}
              className="bg-red-500 hover:bg-red-600 h-12 px-6 rounded-xl"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Service Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Mail className="w-5 h-5 text-white" />
              </div>
              Send Email
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Send an email to {selectedAdmin?.name} ({selectedAdmin?.email})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label htmlFor="emailSubject" className="text-gray-300 mb-2 block font-medium">
                Subject
              </Label>
              <Input
                id="emailSubject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
              />
            </div>
            
            <div>
              <Label htmlFor="emailMessage" className="text-gray-300 mb-2 block font-medium">
                Message
              </Label>
              <textarea
                id="emailMessage"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Enter your message"
                rows={6}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-[#FF7619] focus:outline-none p-3 resize-none"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowEmailModal(false);
                setSelectedAdmin(null);
                setEmailSubject('');
                setEmailMessage('');
              }}
              className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={!emailSubject.trim() || !emailMessage.trim()}
              className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold disabled:opacity-50"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

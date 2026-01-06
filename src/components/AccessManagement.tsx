import { useState } from 'react';
import { Shield, Folder, Users, Eye, Edit2, Trash2, UserPlus, ArrowLeft, User, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FolderAccess {
  id: string;
  name: string;
  accessLevel: string;
  users: number;
  type: 'internal' | 'external';
}

interface UserPermission {
  id: string;
  name: string;
  email: string;
  role: string;
  grantedBy: string;
  grantedDate: string;
  expires: string;
  status: string;
  permissions: string[];
}

interface AccessManagementProps {
  onBack: () => void;
}

export function AccessManagement({ onBack }: AccessManagementProps) {
  const { currentOrgName } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProvideAccessModal, setShowProvideAccessModal] = useState(false);
  const [showEditAccessModal, setShowEditAccessModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionsPage, setShowPermissionsPage] = useState(false);
  const [showDetailedPermissionsModal, setShowDetailedPermissionsModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderAccess | null>(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAccessLevel, setSelectedAccessLevel] = useState('');
  const [editablePermissions, setEditablePermissions] = useState<string[]>([]);
  const [foldersWithAccess, setFoldersWithAccess] = useState<FolderAccess[]>([
    { id: 'f1', name: 'Q-Dot Documents', accessLevel: 'Full Access', users: 12, type: 'internal' },
    { id: 'f2', name: 'OBRIX Files', accessLevel: 'Edit Access', users: 8, type: 'internal' },
    { id: 'f3', name: 'Govt Bodies Shared', accessLevel: 'View Only', users: 5, type: 'external' },
    { id: 'f4', name: 'Board Director Files', accessLevel: 'Edit Access', users: 3, type: 'external' },
    { id: 'f5', name: 'Marginz Projects', accessLevel: 'Full Access', users: 10, type: 'internal' },
    { id: 'f6', name: 'Advisors & Investors', accessLevel: 'View Only', users: 7, type: 'external' },
  ]);

  // Sample user permissions data
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([
    {
      id: 'u1',
      name: 'Audit Testing Person Admin',
      email: 'netibihi27@m3player.com',
      role: 'Admin Role',
      grantedBy: 'Anand (anandsugan218@gmail.com)',
      grantedDate: 'Jan 02, 2026, 4:39 PM',
      expires: 'Never',
      status: 'Direct Permission (Not Inherited)',
      permissions: ['View Folder', 'Create Folder', 'Rename Folder', 'Delete Folder', 'Manage Folder Permissions', 'View File', 'Rename File', 'Soft Delete File', 'Manage File Permissions']
    },
    {
      id: 'u2',
      name: 'Audit Testing Person User 1',
      email: 'netibihi27@m3player.com',
      role: 'User Role',
      grantedBy: 'Audit Testing Person Admin (netibihi27@m3player.com)',
      grantedDate: 'Jan 02, 2026, 5:08 PM',
      expires: 'Never',
      status: 'Direct Permission (Not Inherited)',
      permissions: ['View Folder', 'Create Folder', 'Rename Folder', 'Delete Folder', 'View File', 'Rename File', 'Soft Delete File']
    }
  ]);

  // Access categories (Purple in workflow - List of category access)
  const accessCategories = [
    { id: 'view', name: 'View Only', count: 45, color: 'from-blue-500 to-cyan-500', description: 'Can only view files and folders' },
    { id: 'edit', name: 'Edit Access', count: 32, color: 'from-orange-500 to-orange-600', description: 'Can view and edit files' },
    { id: 'full', name: 'Full Access', count: 18, color: 'from-green-500 to-emerald-500', description: 'Complete control over files and folders' },
  ];

  const handleProvideAccess = () => {
    if (selectedUser && selectedAccessLevel) {
      // In production, this would call API to grant access
      console.log('Granting access:', { user: selectedUser, level: selectedAccessLevel });
      setShowProvideAccessModal(false);
      setSelectedUser('');
      setSelectedAccessLevel('');
    }
  };

  const handleEditAccess = () => {
    if (selectedFolder && selectedAccessLevel) {
      setFoldersWithAccess(foldersWithAccess.map(f => 
        f.id === selectedFolder.id 
          ? { ...f, accessLevel: selectedAccessLevel }
          : f
      ));
      setShowEditAccessModal(false);
      setSelectedFolder(null);
      setSelectedAccessLevel('');
    }
  };

  const handleDeleteAccess = () => {
    if (selectedFolder) {
      setFoldersWithAccess(foldersWithAccess.filter(f => f.id !== selectedFolder.id));
      setShowDeleteModal(false);
      setSelectedFolder(null);
    }
  };

  const togglePermission = (permission: string) => {
    setEditablePermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSavePermissions = () => {
    // Update the user permissions with the new editable permissions
    setUserPermissions(prev => prev.map(user => 
      user.id === 'u1' 
        ? { ...user, permissions: editablePermissions }
        : user
    ));
    setShowDetailedPermissionsModal(false);
    console.log('Permissions saved:', editablePermissions);
  };

  const openDetailedPermissionsModal = () => {
    // Initialize editable permissions with current user permissions
    const currentUser = userPermissions.find(u => u.id === 'u1');
    if (currentUser) {
      setEditablePermissions([...currentUser.permissions]);
    }
    setShowDetailedPermissionsModal(true);
  };

  const openViewModal = (folder: FolderAccess) => {
    setSelectedFolder(folder);
    setShowViewModal(true);
  };

  const openEditModal = (folder: FolderAccess) => {
    setSelectedFolder(folder);
    setSelectedAccessLevel(folder.accessLevel);
    setShowPermissionsPage(true);
  };

  const openDeleteModal = (folder: FolderAccess) => {
    setSelectedFolder(folder);
    setShowDeleteModal(true);
  };

  // Permissions Page Component
  const PermissionsPage = () => {
    if (!selectedFolder) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        <div className="px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowPermissionsPage(false)}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <span>Access Management</span>
                  <span>/</span>
                  <span>Resource Details</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                    <Folder className="w-6 h-6 text-[#FF7619]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {selectedFolder.name}
                    </h1>
                    <p className="text-gray-400 text-sm">
                      Resource Type: <span className="text-white">folder</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{userPermissions.length}</div>
                <div className="text-gray-400 text-sm">Total Grantees</div>
              </div>
              <Button
                onClick={openDetailedPermissionsModal}
                className="h-12 px-6 rounded-xl transition-all shadow-lg text-white font-semibold"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                Edit Permissions
              </Button>
            </div>
          </div>

          {/* Granted Permissions Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">
                Granted Permissions ({userPermissions.length})
              </h2>

              <div className="space-y-6">
                {userPermissions.map((user) => (
                  <div key={user.id} className="bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-white/10 rounded-2xl p-6">
                    {/* User Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <Badge 
                        className="font-medium"
                        style={user.role === 'Admin Role' 
                          ? { backgroundColor: 'rgba(255, 118, 25, 0.2)', color: '#FF7619', borderColor: 'rgba(255, 118, 25, 0.3)' }
                          : { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }
                        }
                      >
                        {user.role}
                      </Badge>
                    </div>

                    {/* Allowed Actions */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-3">Allowed Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.permissions.map((permission, index) => (
                          <Badge 
                            key={index}
                            className="text-xs font-medium"
                            style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.3)' }}
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Grant Details */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Granted By: <span className="text-white">{user.grantedBy}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Expires: <span className="text-white">{user.expires}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Status: <span className="text-white">{user.status}</span></span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-xs text-gray-500 mt-2">
                      Granted on {user.grantedDate} • Expires: {user.expires} • Status: {user.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Permissions Modal */}
        <Dialog open={showDetailedPermissionsModal} onOpenChange={setShowDetailedPermissionsModal}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Audit Testing Person Admin
                  </DialogTitle>
                  <p className="text-gray-400">netibihi27@m3player.com</p>
                </div>
                <Badge 
                  className="ml-auto font-medium"
                  style={{ backgroundColor: 'rgba(255, 118, 25, 0.2)', color: '#FF7619', borderColor: 'rgba(255, 118, 25, 0.3)' }}
                >
                  Admin Role
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Permissions & Capabilities */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Permissions & Capabilities</h3>
                
                {/* Folder Actions */}
                <div className="mb-6">
                  <h4 className="text-gray-400 mb-3">Folder Actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div 
                      onClick={() => togglePermission('View Folder')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('View Folder')
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-blue-500/30'
                      }`}
                    >
                      <Eye className={`w-5 h-5 ${editablePermissions.includes('View Folder') ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('View Folder') ? 'text-white' : 'text-gray-400'}`}>View Folder</span>
                    </div>
                    <div 
                      onClick={() => togglePermission('Create Folder')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('Create Folder')
                          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-green-500/30'
                      }`}
                    >
                      <UserPlus className={`w-5 h-5 ${editablePermissions.includes('Create Folder') ? 'text-green-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('Create Folder') ? 'text-white' : 'text-gray-400'}`}>Create Folder</span>
                    </div>
                    <div 
                      onClick={() => togglePermission('Delete Folder')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('Delete Folder')
                          ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-orange-500/30'
                      }`}
                    >
                      <Trash2 className={`w-5 h-5 ${editablePermissions.includes('Delete Folder') ? 'text-orange-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('Delete Folder') ? 'text-white' : 'text-gray-400'}`}>Delete Folder</span>
                    </div>
                    <div 
                      onClick={() => togglePermission('Manage Folder Permissions')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('Manage Folder Permissions')
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-purple-500/30'
                      }`}
                    >
                      <Users className={`w-5 h-5 ${editablePermissions.includes('Manage Folder Permissions') ? 'text-purple-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('Manage Folder Permissions') ? 'text-white' : 'text-gray-400'}`}>Manage Folder Permissions</span>
                    </div>
                  </div>
                </div>

                {/* File Actions */}
                <div className="mb-6">
                  <h4 className="text-gray-400 mb-3">File Actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div 
                      onClick={() => togglePermission('View File')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('View File')
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-blue-500/30'
                      }`}
                    >
                      <Eye className={`w-5 h-5 ${editablePermissions.includes('View File') ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('View File') ? 'text-white' : 'text-gray-400'}`}>View File</span>
                    </div>
                    <div 
                      onClick={() => togglePermission('Rename File')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('Rename File')
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-yellow-500/30'
                      }`}
                    >
                      <Edit2 className={`w-5 h-5 ${editablePermissions.includes('Rename File') ? 'text-yellow-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('Rename File') ? 'text-white' : 'text-gray-400'}`}>Rename File</span>
                    </div>
                    <div 
                      onClick={() => togglePermission('Soft Delete File')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('Soft Delete File')
                          ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-red-500/30'
                      }`}
                    >
                      <Trash2 className={`w-5 h-5 ${editablePermissions.includes('Soft Delete File') ? 'text-red-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('Soft Delete File') ? 'text-white' : 'text-gray-400'}`}>Soft Delete File</span>
                    </div>
                    <div 
                      onClick={() => togglePermission('Manage File Permissions')}
                      className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                        editablePermissions.includes('Manage File Permissions')
                          ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50'
                          : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 hover:border-indigo-500/30'
                      }`}
                    >
                      <Shield className={`w-5 h-5 ${editablePermissions.includes('Manage File Permissions') ? 'text-indigo-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${editablePermissions.includes('Manage File Permissions') ? 'text-white' : 'text-gray-400'}`}>Manage File Permissions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grant Details */}
              <div className="bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-4 h-4" />
                      <span>Granted By: <span className="text-white">Anand (anandsugan218@gmail.com)</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Expires: <span className="text-white">Never</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Status: <span className="text-white">Direct Permission</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDetailedPermissionsModal(false)}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Close
              </Button>
              <Button
                onClick={handleSavePermissions}
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
      </div>
    );
  };

  // Show permissions page if selected
  if (showPermissionsPage) {
    return <PermissionsPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <div className="px-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2 font-bold text-white">
              Access Management
            </h1>
            <p className="text-gray-400">
              Manage access levels and permissions
              {currentOrgName && (
                <span className="ml-2 text-[#FF7619]">• {currentOrgName}</span>
              )}
            </p>
          </div>
          <Button
            onClick={() => setShowProvideAccessModal(true)}
            className="h-12 px-6 rounded-xl transition-all shadow-lg text-white font-semibold"
            style={{ 
              backgroundColor: '#FF7619',
              boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
          >
            <Shield className="w-5 h-5 mr-2" />
            Provide & Edit Access
          </Button>
        </div>

        {/* List of Category Access (Purple in workflow) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">List of Category Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accessCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative group cursor-pointer transition-all ${
                  selectedCategory === category.id ? 'scale-105' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                <div className={`relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border transition-all ${
                  selectedCategory === category.id ? 'border-[#FF7619]' : 'border-white/10 hover:border-white/20'
                }`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg mb-4`}>
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      className="font-medium"
                      style={{ backgroundColor: 'rgba(255, 118, 25, 0.2)', color: '#FF7619', borderColor: 'rgba(255, 118, 25, 0.3)' }}
                    >
                      {category.count} users
                    </Badge>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* List of Folders and Accesses (Yellow in workflow) */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">List of Folders and Accesses</h2>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-xs uppercase text-white font-semibold">Folder Name</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-white font-semibold">Type</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-white font-semibold">Access Level</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-white font-semibold">Users</th>
                      <th className="text-left py-3 px-4 text-xs uppercase text-white font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foldersWithAccess.map((folder) => (
                      <tr key={folder.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              folder.type === 'internal'
                                ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'
                                : 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
                            }`}>
                              <Folder className={`w-5 h-5 ${
                                folder.type === 'internal' ? 'text-[#FF7619]' : 'text-blue-500'
                              }`} />
                            </div>
                            <span className="text-white font-medium">{folder.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge 
                            className="capitalize font-medium"
                            style={folder.type === 'internal' 
                              ? { backgroundColor: 'rgba(255, 118, 25, 0.2)', color: '#FF7619', borderColor: 'rgba(255, 118, 25, 0.3)' }
                              : { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }
                            }
                          >
                            {folder.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge 
                            className="font-medium"
                            style={
                              folder.accessLevel === 'Full Access'
                                ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.3)' }
                                : folder.accessLevel === 'Edit Access'
                                ? { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#fb923c', borderColor: 'rgba(249, 115, 22, 0.3)' }
                                : { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }
                            }
                          >
                            {folder.accessLevel}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Users className="w-4 h-4" />
                            <span className="text-white font-medium">{folder.users}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openViewModal(folder)}
                              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openEditModal(folder)}
                              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openDeleteModal(folder)}
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

        {/* Provide Access Modal */}
        <Dialog open={showProvideAccessModal} onOpenChange={setShowProvideAccessModal}>
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
                Provide Access
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Grant access to users or groups
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="selectUser" className="text-gray-300 mb-2 block font-medium">
                  Select User or Group
                </Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Choose user or group" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="user1">John Doe</SelectItem>
                    <SelectItem value="user2">Jane Smith</SelectItem>
                    <SelectItem value="user3">Mike Johnson</SelectItem>
                    <SelectItem value="group1">Q-Dot Team</SelectItem>
                    <SelectItem value="group2">OBRIX Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="selectAccessLevel" className="text-gray-300 mb-2 block font-medium">
                  Access Level
                </Label>
                <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Choose access level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="View Only">View Only</SelectItem>
                    <SelectItem value="Edit Access">Edit Access</SelectItem>
                    <SelectItem value="Full Access">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm mb-1">Access Permissions</p>
                    <p className="text-gray-400 text-xs">
                      {selectedAccessLevel === 'View Only' && 'User can only view files and folders'}
                      {selectedAccessLevel === 'Edit Access' && 'User can view and edit files'}
                      {selectedAccessLevel === 'Full Access' && 'User has complete control over files and folders'}
                      {!selectedAccessLevel && 'Select an access level to see permissions'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowProvideAccessModal(false);
                  setSelectedUser('');
                  setSelectedAccessLevel('');
                }}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProvideAccess}
                disabled={!selectedUser || !selectedAccessLevel}
                className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold disabled:opacity-50"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Grant Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Access Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Folder Access Details</DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                View access information for this folder
              </DialogDescription>
            </DialogHeader>

            {selectedFolder && (
              <div className="py-4 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    selectedFolder.type === 'internal'
                      ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'
                      : 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
                  }`}>
                    <Folder className={`w-8 h-8 ${
                      selectedFolder.type === 'internal' ? 'text-[#FF7619]' : 'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">{selectedFolder.name}</h3>
                    <Badge 
                      className="mt-1 capitalize"
                      style={selectedFolder.type === 'internal' 
                        ? { backgroundColor: 'rgba(255, 118, 25, 0.2)', color: '#FF7619', borderColor: 'rgba(255, 118, 25, 0.3)' }
                        : { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }
                      }
                    >
                      {selectedFolder.type}
                    </Badge>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Access Level</span>
                    <Badge 
                      className="font-medium"
                      style={
                        selectedFolder.accessLevel === 'Full Access'
                          ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.3)' }
                          : selectedFolder.accessLevel === 'Edit Access'
                          ? { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#fb923c', borderColor: 'rgba(249, 115, 22, 0.3)' }
                          : { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }
                      }
                    >
                      {selectedFolder.accessLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Users with Access</span>
                    <span className="text-white font-medium">{selectedFolder.users}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white capitalize">{selectedFolder.type}</span>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowViewModal(false)}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowViewModal(false);
                  if (selectedFolder) {
                    openEditModal(selectedFolder);
                  }
                }}
                className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Access Modal */}
        <Dialog open={showEditAccessModal} onOpenChange={setShowEditAccessModal}>
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
                  <Edit2 className="w-5 h-5 text-white" />
                </div>
                Edit Access Level
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Update access level for "{selectedFolder?.name}"
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="editAccessLevel" className="text-gray-300 mb-2 block font-medium">
                  Access Level
                </Label>
                <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Choose access level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="View Only">View Only</SelectItem>
                    <SelectItem value="Edit Access">Edit Access</SelectItem>
                    <SelectItem value="Full Access">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm mb-1">New Permissions</p>
                    <p className="text-gray-400 text-xs">
                      {selectedAccessLevel === 'View Only' && 'Users can only view files and folders'}
                      {selectedAccessLevel === 'Edit Access' && 'Users can view and edit files'}
                      {selectedAccessLevel === 'Full Access' && 'Users have complete control over files and folders'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditAccessModal(false);
                  setSelectedFolder(null);
                  setSelectedAccessLevel('');
                }}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditAccess}
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
              <DialogTitle>Remove Access</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to remove access for "{selectedFolder?.name}"? This action cannot be undone.
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
                onClick={handleDeleteAccess}
                className="bg-red-500 hover:bg-red-600 h-12 px-6 rounded-xl"
              >
                Remove Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

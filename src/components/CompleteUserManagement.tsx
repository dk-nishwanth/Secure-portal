import { useState } from 'react';
import {
  Users as UsersIcon,
  UserPlus,
  Edit2,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Mail,
  Shield,
  Activity,
  Clock,
  Eye,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Moderator' | 'User';
  category: 'Employee' | 'Contractor' | 'Partner' | 'Guest';
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
  type: 'internal' | 'external';
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', category: 'Employee', status: 'Active', lastActive: '2 mins ago', avatar: 'JD', type: 'internal' },
  { id: '2', name: 'Sarah Anderson', email: 'sarah.a@company.com', role: 'User', category: 'Employee', status: 'Active', lastActive: '5 mins ago', avatar: 'SA', type: 'internal' },
  { id: '3', name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Moderator', category: 'Employee', status: 'Active', lastActive: '1 hour ago', avatar: 'MJ', type: 'internal' },
  { id: '4', name: 'Emma Wilson', email: 'emma.w@company.com', role: 'User', category: 'Contractor', status: 'Active', lastActive: '2 hours ago', avatar: 'EW', type: 'internal' },
  { id: '5', name: 'Alex Chen', email: 'alex.c@company.com', role: 'User', category: 'Partner', status: 'Inactive', lastActive: '2 days ago', avatar: 'AC', type: 'external' },
  { id: '6', name: 'Lisa Brown', email: 'lisa.b@company.com', role: 'Admin', category: 'Employee', status: 'Active', lastActive: '10 mins ago', avatar: 'LB', type: 'internal' },
  { id: '7', name: 'Tom Harris', email: 'tom.h@company.com', role: 'Moderator', category: 'Contractor', status: 'Active', lastActive: '30 mins ago', avatar: 'TH', type: 'external' },
  { id: '8', name: 'Kate Miller', email: 'kate.m@company.com', role: 'User', category: 'Guest', status: 'Inactive', lastActive: '1 week ago', avatar: 'KM', type: 'external' },
];

export function CompleteUserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [userType, setUserType] = useState<'internal' | 'external'>('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [detailsTarget, setDetailsTarget] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'Employee' | 'Contractor' | 'Partner' | 'Guest'>('Employee');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAddUser = () => {
    setErrorName('');
    setErrorEmail('');

    if (name.length < 2) {
      setErrorName('Name must be at least 2 characters');
      return;
    }

    if (!validateEmail(email)) {
      setErrorEmail('Please enter a valid email address');
      return;
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role: 'User',
      category,
      status: 'Active',
      lastActive: 'Just now',
      type: userType,
      avatar: name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    };

    setUsers([newUser, ...users]);
    setName('');
    setEmail('');
    setShowAddModal(false);
  };

  const handleEditUser = () => {
    setErrorName('');

    if (name.length < 2) {
      setErrorName('Name must be at least 2 characters');
      return;
    }

    if (editTarget) {
      setUsers(users.map(u => 
        u.id === editTarget.id 
          ? { ...u, name, category, avatar: name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) }
          : u
      ));
      setShowEditModal(false);
      setEditTarget(null);
      setName('');
      setEmail('');
      setCategory('Employee');
    }
  };

  const handleDeleteUser = () => {
    if (deleteTarget) {
      setUsers(users.filter((u) => u.id !== deleteTarget.id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const openEditModal = (user: User) => {
    setEditTarget(user);
    setName(user.name);
    setEmail(user.email);
    setCategory(user.category);
    setShowEditModal(true);
  };

  const openDeleteModal = (user: User) => {
    setDeleteTarget(user);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (user: User) => {
    setDetailsTarget(user);
    setShowDetailsModal(true);
  };

  const filteredUsers = users.filter(
    (user) => {
      const matchesType = user.type === userType;
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesCategory = filterCategory === 'all' || user.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesType && matchesSearch && matchesRole && matchesCategory && matchesStatus;
    }
  );

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;
  const inactiveUsers = users.filter((u) => u.status === 'Inactive').length;
  const newToday = users.filter((u) => u.lastActive.includes('mins')).length;

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Admin':
        return { 
          backgroundColor: 'rgba(154, 24, 251, 0.2)', 
          color: 'rgba(154, 24, 251, 1)',
          borderColor: 'rgba(0, 188, 212, 0.3)'
        };
      case 'Moderator':
        return { 
          backgroundColor: 'rgba(59, 130, 246, 0.2)', 
          color: 'rgb(200, 100, 200)',
          borderColor: 'rgba(59, 130, 246, 0.3)'
        };
      case 'User':
        return { 
          backgroundColor: 'rgba(34, 197, 94, 0.2)', 
          color: 'rgb(74, 222, 128)',
          borderColor: 'rgba(34, 197, 94, 0.3)'
        };
      default:
        return { 
          backgroundColor: 'rgba(107, 114, 128, 0.2)', 
          color: 'rgb(156, 163, 175)',
          borderColor: 'rgba(107, 114, 128, 0.3)'
        };
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-500' : 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 
            className="text-3xl mb-2 font-bold"
            style={{
              background: 'linear-gradient(to right, rgba(154, 24, 251, 1), rgb(200, 100, 200), #FF7619)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            User Management
          </h1>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="h-12 px-6 rounded-xl transition-all shadow-lg text-white font-semibold relative overflow-hidden group border-0"
          style={{
            background: 'linear-gradient(135deg, #FF7619, #FF8A3D, #FF7619)',
            boxShadow: '0 8px 32px rgba(255, 118, 25, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Animated background overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF8A3D, #FFB366, #FF7619)',
            }}
          />
          <UserPlus className="w-5 h-5 mr-2 relative z-10" />
          <span className="relative z-10">Add User</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-3xl text-white">{totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Active Now */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Now</p>
              <p className="text-3xl text-white">{activeUsers}</p>
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-lime-green/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-yellow-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-lime-green flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Inactive</p>
              <p className="text-3xl text-white">{inactiveUsers}</p>
            </div>
          </div>
        </div>

        {/* New Today */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/20 to-pink-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-[var(--cyan)]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-pink-500 flex items-center justify-center shadow-lg shadow-[var(--cyan)]/30">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">New Today</p>
              <p className="text-3xl text-white">{newToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Type Tabs (Blue boxes in workflow) */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex gap-2">
            <Button
              onClick={() => setUserType('internal')}
              variant="ghost"
              className={`h-11 px-5 rounded-xl font-medium transition-all ${
                userType === 'internal' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Internal Users
            </Button>
            <Button
              onClick={() => setUserType('external')}
              variant="ghost"
              className={`h-11 px-5 rounded-xl font-medium transition-all ${
                userType === 'external' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              External Users
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name, email, or role"
            className="w-full pl-11 bg-[#1a1a2e]/60 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl"
          />
        </div>
        
        {/* Filter Dropdowns */}
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[160px] h-12 bg-[#1a1a2e]/60 border-white/10 text-white rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[160px] h-12 bg-[#1a1a2e]/60 border-white/10 text-white rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Employee">Employee</SelectItem>
            <SelectItem value="Contractor">Contractor</SelectItem>
            <SelectItem value="Partner">Partner</SelectItem>
            <SelectItem value="Guest">Guest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[160px] h-12 bg-[#1a1a2e]/60 border-white/10 text-white rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">User</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Email</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Role</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Category</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Last Active</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-[var(--lime-green)]/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                          style={{ 
                            background: 'linear-gradient(to bottom right, #FF7619, rgba(154, 24, 251, 1))',
                            boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                          }}
                        >
                          {user.avatar}
                        </div>
                        <span className="text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="border" style={getRoleBadgeStyle(user.role)}>{user.role}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-300 text-sm">{user.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                        <span className={user.status === 'Active' ? 'text-green-400' : 'text-gray-400'}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{user.lastActive}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDetailsModal(user)}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(user)}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteModal(user)}
                          className="w-8 h-8 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#1a1a2e] border-white/10">
                            <DropdownMenuItem className="text-white hover:bg-white/10">
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-white/10">
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-white/10">
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>



      {/* Add User Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal} modal={true}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new user account. A password will be auto-generated and sent via email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name" className="text-gray-300 mb-2 block">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errorName ? 'border-red-500' : ''
                }`}
              />
              {errorName && <p className="text-red-400 text-sm mt-1">{errorName}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@company.com"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errorEmail ? 'border-red-500' : ''
                }`}
              />
              {errorEmail && <p className="text-red-400 text-sm mt-1">{errorEmail}</p>}
            </div>
            <div>
              <Label htmlFor="category" className="text-gray-300 mb-2 block">
                Category
              </Label>
              <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Contractor">Contractor</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setName('');
                setEmail('');
                setErrorName('');
                setErrorEmail('');
              }}
              className="border-white/10 text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan)] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal} modal={true}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update user information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="editName" className="text-gray-300 mb-2 block">
                Full Name
              </Label>
              <Input
                id="editName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errorName ? 'border-red-500' : ''
                }`}
              />
              {errorName && <p className="text-red-400 text-sm mt-1">{errorName}</p>}
            </div>
            <div>
              <Label htmlFor="editCategory" className="text-gray-300 mb-2 block">
                Category
              </Label>
              <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Contractor">Contractor</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setEditTarget(null);
                setName('');
                setEmail('');
                setCategory('Employee');
                setErrorName('');
                setErrorEmail('');
              }}
              className="border-white/10 text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              className="bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan)] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal} modal={true}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">User Details</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              View detailed user information
            </DialogDescription>
          </DialogHeader>
          
          {detailsTarget && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to bottom right, #FF7619, rgba(154, 24, 251, 1))',
                    boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                  }}
                >
                  {detailsTarget.avatar}
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">{detailsTarget.name}</h3>
                  <p className="text-gray-400">{detailsTarget.email}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Role</span>
                  <Badge className="border" style={getRoleBadgeStyle(detailsTarget.role)}>
                    {detailsTarget.role}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(detailsTarget.status)}`}></div>
                    <span className={detailsTarget.status === 'Active' ? 'text-green-400' : 'text-gray-400'}>
                      {detailsTarget.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white capitalize">{detailsTarget.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Active</span>
                  <span className="text-white">{detailsTarget.lastActive}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsModal(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowDetailsModal(false);
                if (detailsTarget) {
                  openEditModal(detailsTarget);
                }
              }}
              className="bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan)] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal} modal={true}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

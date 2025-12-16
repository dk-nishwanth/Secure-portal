import { useState } from 'react';
import { Building2, Plus, Users, Search, Eye, Edit2, Trash2, UserCheck, Briefcase, GraduationCap, ArrowLeft } from 'lucide-react';
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

export interface Organization {
  id: string;
  name: string;
  employees: number;
  interns: number;
  managers: number;
  totalMembers: number;
  createdAt: Date;
  isActive: boolean;
}

// Only Q-Dot and OBRIX organizations
const mockOrganizations: Organization[] = [
  { 
    id: 'org1', 
    name: 'Q-Dot', 
    employees: 35, 
    interns: 8, 
    managers: 5, 
    totalMembers: 48, 
    createdAt: new Date(), 
    isActive: true 
  },
  { 
    id: 'org2', 
    name: 'OBRIX', 
    employees: 28, 
    interns: 6, 
    managers: 4, 
    totalMembers: 38, 
    createdAt: new Date(), 
    isActive: true 
  },
];

interface OrganizationsPageProps {
  onBack: () => void;
}

export function OrganizationsPage({ onBack }: OrganizationsPageProps) {
  const { currentOrgId, currentOrgName, setCurrentOrg } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [view, setView] = useState<'list' | 'details'>('list');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Organization | null>(null);
  const [editTarget, setEditTarget] = useState<Organization | null>(null);
  const [orgName, setOrgName] = useState('');
  const [employees, setEmployees] = useState('');
  const [interns, setInterns] = useState('');
  const [managers, setManagers] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateOrg = () => {
    if (orgName.trim()) {
      const newOrg: Organization = {
        id: `org${Date.now()}`,
        name: orgName,
        employees: 0,
        interns: 0,
        managers: 0,
        totalMembers: 0,
        createdAt: new Date(),
        isActive: true,
      };
      setOrganizations([newOrg, ...organizations]);
      setOrgName('');
      setShowCreateModal(false);
    }
  };

  const handleEditOrg = () => {
    if (editTarget && orgName.trim()) {
      const employeesNum = parseInt(employees) || 0;
      const internsNum = parseInt(interns) || 0;
      const managersNum = parseInt(managers) || 0;
      const totalMembers = employeesNum + internsNum + managersNum;

      setOrganizations(organizations.map(o => 
        o.id === editTarget.id 
          ? { 
              ...o, 
              name: orgName, 
              employees: employeesNum,
              interns: internsNum,
              managers: managersNum,
              totalMembers: totalMembers
            }
          : o
      ));
      
      // Update selected org if it's the one being edited
      if (selectedOrg?.id === editTarget.id) {
        setSelectedOrg({
          ...editTarget,
          name: orgName,
          employees: employeesNum,
          interns: internsNum,
          managers: managersNum,
          totalMembers: totalMembers
        });
      }
      
      setShowEditModal(false);
      setEditTarget(null);
      setOrgName('');
      setEmployees('');
      setInterns('');
      setManagers('');
    }
  };

  const handleSelectOrg = (org: Organization) => {
    setCurrentOrg(org.id, org.name);
  };

  const handleViewDetails = (org: Organization) => {
    setSelectedOrg(org);
    setView('details');
  };

  const handleDeleteOrg = () => {
    if (deleteTarget) {
      setOrganizations(organizations.filter(o => o.id !== deleteTarget.id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const openEditModal = (org: Organization) => {
    setEditTarget(org);
    setOrgName(org.name);
    setEmployees(org.employees.toString());
    setInterns(org.interns.toString());
    setManagers(org.managers.toString());
    setShowEditModal(true);
  };

  const openDeleteModal = (org: Organization) => {
    setDeleteTarget(org);
    setShowDeleteModal(true);
  };

  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // List View
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        {/* Header Section */}
        <div className="px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2 font-bold text-white">
                Organizations
              </h1>
              <p className="text-gray-400">
                Manage your organizations
                {currentOrgName && (
                  <span className="ml-2 text-[#FF7619]">• Current: {currentOrgName}</span>
                )}
              </p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="h-12 px-6 rounded-xl transition-all shadow-lg text-white font-semibold"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Organisation
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative group mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search organizations..."
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-[#FF7619]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOrgs.map((org, index) => {
              const isOrange = index % 2 === 0;
              const iconColor = isOrange ? '#FF7619' : '#9A18FB';
              const bgGradient = isOrange 
                ? 'from-orange-500/20 to-orange-600/20' 
                : 'from-purple-500/20 to-purple-600/20';
              
              return (
                <div
                  key={org.id}
                  className={`relative group bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border cursor-pointer transition-all ${
                    currentOrgId === org.id
                      ? 'border-[#FF7619] shadow-lg shadow-[#FF7619]/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => handleSelectOrg(org)}
                >
                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(org);
                      }}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(org);
                      }}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(org);
                      }}
                      className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 backdrop-blur-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg`}>
                      <Building2 className="w-7 h-7" style={{ color: iconColor }} />
                    </div>
                    {currentOrgId === org.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
                    )}
                  </div>
                  
                  <h4 className="text-white font-semibold text-lg mb-4">{org.name}</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total Members</span>
                      <span className="font-medium text-white">{org.totalMembers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Employees</span>
                      <span className="font-medium text-white">{org.employees}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Interns</span>
                      <span className="font-medium text-white">{org.interns}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create Organization Modal */}
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
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Create New Organization
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Add a new organization
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="orgName" className="text-gray-300 mb-2 block font-medium">
                  Organization Name
                </Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter organization name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateOrg()}
                />
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateOrg}
                className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Organization
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Organization Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
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
                Edit Organization
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Update organization details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="editOrgName" className="text-gray-300 mb-2 block font-medium">
                  Organization Name
                </Label>
                <Input
                  id="editOrgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter organization name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                />
              </div>

              <div>
                <Label htmlFor="editEmployees" className="text-gray-300 mb-2 block font-medium">
                  Number of Employees
                </Label>
                <Input
                  id="editEmployees"
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  placeholder="0"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                />
              </div>

              <div>
                <Label htmlFor="editInterns" className="text-gray-300 mb-2 block font-medium">
                  Number of Interns
                </Label>
                <Input
                  id="editInterns"
                  type="number"
                  value={interns}
                  onChange={(e) => setInterns(e.target.value)}
                  placeholder="0"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                />
              </div>

              <div>
                <Label htmlFor="editManagers" className="text-gray-300 mb-2 block font-medium">
                  Number of Managers
                </Label>
                <Input
                  id="editManagers"
                  type="number"
                  value={managers}
                  onChange={(e) => setManagers(e.target.value)}
                  placeholder="0"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                />
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Members</span>
                  <span className="text-2xl font-bold text-white">
                    {(parseInt(employees) || 0) + (parseInt(interns) || 0) + (parseInt(managers) || 0)}
                  </span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setEditTarget(null);
                  setOrgName('');
                  setEmployees('');
                  setInterns('');
                  setManagers('');
                }}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditOrg}
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
              <DialogTitle>Delete Organization</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
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
                onClick={handleDeleteOrg}
                className="bg-red-500 hover:bg-red-600 h-12 px-6 rounded-xl"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Details View
  if (view === 'details' && selectedOrg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        <div className="px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => {
                setView('list');
                setSelectedOrg(null);
              }}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl h-10 px-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Organizations
            </Button>
          </div>

          <div className="relative group mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-[#FF7619]" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedOrg.name}</h1>
                    <Badge className="bg-[#FF7619]/20 text-[#FF7619] border-[#FF7619]/30">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Employee Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Employees</p>
                        <p className="text-3xl font-bold text-white">{selectedOrg.employees}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Interns</p>
                        <p className="text-3xl font-bold text-white">{selectedOrg.interns}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Managers</p>
                        <p className="text-3xl font-bold text-white">{selectedOrg.managers}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Members */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#FF7619]" />
                    <span className="text-gray-400 text-lg">Total Members</span>
                  </div>
                  <span className="text-4xl font-bold text-white">{selectedOrg.totalMembers}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4">Organization Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="text-white">{selectedOrg.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

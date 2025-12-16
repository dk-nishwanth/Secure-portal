import { useState } from 'react';
import { Building2, Plus, Users, Search } from 'lucide-react';
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
  type: 'internal' | 'external';
  category?: string;
  memberCount: number;
  createdAt: Date;
  isActive: boolean;
}

// Mock data based on the workflow
const mockOrganizations: Organization[] = [
  { id: 'org1', name: 'Q-Dot', type: 'internal', category: 'Co-Admin', memberCount: 45, createdAt: new Date(), isActive: true },
  { id: 'org2', name: 'OBRIX', type: 'internal', category: 'Co-Admin', memberCount: 32, createdAt: new Date(), isActive: true },
  { id: 'org3', name: 'Marginz', type: 'internal', category: 'Co-Admin', memberCount: 28, createdAt: new Date(), isActive: true },
  { id: 'org4', name: 'Employee-Associate Manager', type: 'internal', category: 'Manager', memberCount: 120, createdAt: new Date(), isActive: true },
  { id: 'org5', name: 'Interns', type: 'internal', memberCount: 15, createdAt: new Date(), isActive: true },
  { id: 'org6', name: 'Exec-Directors', type: 'internal', memberCount: 8, createdAt: new Date(), isActive: true },
  { id: 'org7', name: 'Dept-Head', type: 'internal', memberCount: 12, createdAt: new Date(), isActive: true },
  { id: 'org8', name: 'GRC Team (CISMS)', type: 'internal', memberCount: 6, createdAt: new Date(), isActive: true },
  { id: 'org9', name: 'Govt Bodies', type: 'external', memberCount: 0, createdAt: new Date(), isActive: true },
  { id: 'org10', name: 'Board Director', type: 'external', memberCount: 5, createdAt: new Date(), isActive: true },
  { id: 'org11', name: 'Advisors & Investors', type: 'external', memberCount: 10, createdAt: new Date(), isActive: true },
  { id: 'org12', name: 'Associate to Manager', type: 'external', memberCount: 25, createdAt: new Date(), isActive: true },
];

interface OrganizationsPageProps {
  onBack: () => void;
}

export function OrganizationsPage({ onBack }: OrganizationsPageProps) {
  const { currentOrgId, currentOrgName, setCurrentOrg } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState<'internal' | 'external'>('internal');
  const [orgCategory, setOrgCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'internal' | 'external'>('all');

  const handleCreateOrg = () => {
    if (orgName.trim()) {
      const newOrg: Organization = {
        id: `org${Date.now()}`,
        name: orgName,
        type: orgType,
        category: orgCategory || undefined,
        memberCount: 0,
        createdAt: new Date(),
        isActive: true,
      };
      setOrganizations([newOrg, ...organizations]);
      setOrgName('');
      setOrgCategory('');
      setShowCreateModal(false);
    }
  };

  const handleSelectOrg = (org: Organization) => {
    setCurrentOrg(org.id, org.name);
  };

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || org.type === filterType;
    return matchesSearch && matchesType;
  });

  const internalOrgs = filteredOrgs.filter(org => org.type === 'internal');
  const externalOrgs = filteredOrgs.filter(org => org.type === 'external');

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
              Manage your internal and external organizations
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

        {/* Search and Filter Bar */}
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
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilterType('all')}
                  variant="ghost"
                  className={`h-11 px-5 rounded-xl font-medium transition-all ${
                    filterType === 'all' 
                      ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  All
                </Button>
                <Button
                  onClick={() => setFilterType('internal')}
                  variant="ghost"
                  className={`h-11 px-5 rounded-xl font-medium transition-all ${
                    filterType === 'internal' 
                      ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Internal
                </Button>
                <Button
                  onClick={() => setFilterType('external')}
                  variant="ghost"
                  className={`h-11 px-5 rounded-xl font-medium transition-all ${
                    filterType === 'external' 
                      ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  External
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 space-y-8">
        {/* Internal Organizations */}
        {internalOrgs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-semibold text-white">
                Internal Organizations
              </h3>
              <Badge 
                className="border"
                style={{ 
                  backgroundColor: 'rgba(255, 118, 25, 0.2)', 
                  color: '#FF7619',
                  borderColor: 'rgba(255, 118, 25, 0.3)'
                }}
              >
                {internalOrgs.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {internalOrgs.map((org, index) => {
                const isOrange = index % 2 === 0;
                const iconColor = isOrange ? '#FF7619' : '#9A18FB';
                const bgGradient = isOrange 
                  ? 'from-orange-500/20 to-orange-600/20' 
                  : 'from-purple-500/20 to-purple-600/20';
                const borderHover = isOrange 
                  ? 'hover:border-orange-500/40' 
                  : 'hover:border-purple-500/40';
                
                return (
                  <div
                    key={org.id}
                    onClick={() => handleSelectOrg(org)}
                    className={`relative group bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-5 border cursor-pointer transition-all ${
                      currentOrgId === org.id
                        ? 'border-[#FF7619] shadow-lg shadow-[#FF7619]/20'
                        : `border-white/10 ${borderHover}`
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg`}>
                        <Building2 className="w-6 h-6" style={{ color: iconColor }} />
                      </div>
                      {currentOrgId === org.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
                      )}
                    </div>
                    <h4 className="text-white font-semibold mb-1 truncate">{org.name}</h4>
                    {org.category && (
                      <p className="text-xs text-gray-400 mb-3">{org.category}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="font-medium text-white">{org.memberCount}</span>
                      <span>members</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* External Organizations */}
        {externalOrgs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-semibold text-white">
                External Organizations
              </h3>
              <Badge 
                className="border"
                style={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.2)', 
                  color: '#3b82f6',
                  borderColor: 'rgba(59, 130, 246, 0.3)'
                }}
              >
                {externalOrgs.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {externalOrgs.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSelectOrg(org)}
                  className={`relative group bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-5 border cursor-pointer transition-all ${
                    currentOrgId === org.id
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-white/10 hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center shadow-lg">
                      <Building2 className="w-6 h-6 text-blue-500" />
                    </div>
                    {currentOrgId === org.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
                    )}
                  </div>
                  <h4 className="text-white font-semibold mb-1 truncate">{org.name}</h4>
                  {org.category && (
                    <p className="text-xs text-gray-400 mb-3">{org.category}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="font-medium text-white">{org.memberCount}</span>
                    <span>members</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
              Add a new internal or external organization
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
            
            <div>
              <Label className="text-gray-300 mb-3 block font-medium">Organization Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrgType('internal')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    orgType === 'internal' 
                      ? 'border-[#FF7619] bg-[#FF7619]/10' 
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      orgType === 'internal' 
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600' 
                        : 'bg-white/10'
                    }`}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-semibold ${orgType === 'internal' ? 'text-white' : 'text-gray-400'}`}>
                      Internal
                    </span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setOrgType('external')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    orgType === 'external' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      orgType === 'external' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-white/10'
                    }`}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-semibold ${orgType === 'external' ? 'text-white' : 'text-gray-400'}`}>
                      External
                    </span>
                  </div>
                </button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="orgCategory" className="text-gray-300 mb-2 block font-medium">
                Category <span className="text-gray-500 text-sm">(Optional)</span>
              </Label>
              <Input
                id="orgCategory"
                value={orgCategory}
                onChange={(e) => setOrgCategory(e.target.value)}
                placeholder="e.g., Co-Admin, Manager"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

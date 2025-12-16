import { useState } from 'react';
import { Building2, Plus, Users, Settings, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';

export interface Organization {
  id: string;
  name: string;
  type: 'internal' | 'external';
  category?: string;
  memberCount: number;
  createdAt: Date;
  isActive: boolean;
}

interface OrganizationManagerProps {
  open: boolean;
  onClose: () => void;
  currentOrgId: string | null;
  onSelectOrg: (orgId: string) => void;
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

export function OrganizationManager({ open, onClose, currentOrgId, onSelectOrg }: OrganizationManagerProps) {
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

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || org.type === filterType;
    return matchesSearch && matchesType;
  });

  const internalOrgs = filteredOrgs.filter(org => org.type === 'internal');
  const externalOrgs = filteredOrgs.filter(org => org.type === 'external');

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] border-white/10 text-white max-w-5xl h-[90vh] overflow-hidden p-0 flex flex-col">
          {/* Header with Gradient Background - Fixed */}
          <div className="relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF7619]/20 via-[#9A18FB]/20 to-blue-500/20 blur-3xl"></div>
            <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7619] to-[#9A18FB] flex items-center justify-center shadow-lg shadow-[#FF7619]/30 flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Organization Management
                  </span>
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-base mt-2">
                  Manage your internal and external organizations
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search organizations..."
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-[#FF7619] transition-all"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilterType('all')}
                  className={`h-11 px-5 rounded-xl transition-all ${
                    filterType === 'all' 
                      ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] shadow-lg shadow-[#FF7619]/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  All
                </Button>
                <Button
                  onClick={() => setFilterType('internal')}
                  className={`h-11 px-5 rounded-xl transition-all ${
                    filterType === 'internal' 
                      ? 'bg-[#FF7619] shadow-lg shadow-[#FF7619]/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  Internal
                </Button>
                <Button
                  onClick={() => setFilterType('external')}
                  className={`h-11 px-5 rounded-xl transition-all ${
                    filterType === 'external' 
                      ? 'bg-blue-500 shadow-lg shadow-blue-500/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  External
                </Button>
              </div>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="h-11 px-6 bg-gradient-to-r from-[#FF7619] to-[#9A18FB] hover:opacity-90 rounded-xl shadow-lg shadow-[#FF7619]/30 transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Organization
              </Button>
            </div>

            {/* Internal Organizations */}
            {internalOrgs.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 sticky top-0 bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] py-2 z-10">
                  <h3 className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-[#FF7619] to-orange-500 bg-clip-text text-transparent">
                      Internal Organizations
                    </span>
                  </h3>
                  <Badge className="bg-[#FF7619]/20 text-[#FF7619] border border-[#FF7619]/30 px-3 py-1.5 text-sm font-semibold">
                    {internalOrgs.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {internalOrgs.map((org, index) => (
                    <div
                      key={org.id}
                      onClick={() => {
                        onSelectOrg(org.id);
                        onClose();
                      }}
                      className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${
                        currentOrgId === org.id
                          ? 'bg-gradient-to-br from-[#FF7619]/20 to-orange-600/20 border-[#FF7619] shadow-lg shadow-[#FF7619]/20 scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:border-[#FF7619]/50 hover:bg-white/10 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7619]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="relative p-5">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                              currentOrgId === org.id
                                ? 'bg-gradient-to-br from-[#FF7619] to-orange-600 shadow-[#FF7619]/30'
                                : 'bg-gradient-to-br from-[#FF7619]/80 to-orange-600/80 group-hover:from-[#FF7619] group-hover:to-orange-600'
                            }`}>
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-base leading-tight truncate">{org.name}</h4>
                              {org.category && (
                                <p className="text-xs text-[#FF7619] font-medium mt-1">{org.category}</p>
                              )}
                            </div>
                          </div>
                          {currentOrgId === org.id && (
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                          <Users className="w-4 h-4 text-[#FF7619]" />
                          <span className="font-medium">{org.memberCount}</span>
                          <span>members</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Organizations */}
            {externalOrgs.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 sticky top-0 bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] py-2 z-10">
                  <h3 className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      External Organizations
                    </span>
                  </h3>
                  <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 text-sm font-semibold">
                    {externalOrgs.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {externalOrgs.map((org) => (
                    <div
                      key={org.id}
                      onClick={() => {
                        onSelectOrg(org.id);
                        onClose();
                      }}
                      className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${
                        currentOrgId === org.id
                          ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="relative p-5">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                              currentOrgId === org.id
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30'
                                : 'bg-gradient-to-br from-blue-500/80 to-blue-600/80 group-hover:from-blue-500 group-hover:to-blue-600'
                            }`}>
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-base leading-tight truncate">{org.name}</h4>
                              {org.category && (
                                <p className="text-xs text-blue-400 font-medium mt-1">{org.category}</p>
                              )}
                            </div>
                          </div>
                          {currentOrgId === org.id && (
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="font-medium">{org.memberCount}</span>
                          <span>members</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Organization Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] border-white/10 text-white">
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF7619]/20 to-[#9A18FB]/20 blur-2xl"></div>
            <DialogHeader className="relative">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7619] to-[#9A18FB] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Create New Organization
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Add a new internal or external organization
              </DialogDescription>
            </DialogHeader>
          </div>

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
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-[#FF7619] transition-all"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 mb-3 block font-medium">Organization Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrgType('internal')}
                  className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all ${
                    orgType === 'internal' 
                      ? 'border-[#FF7619] bg-[#FF7619]/20' 
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      orgType === 'internal' 
                        ? 'bg-gradient-to-br from-[#FF7619] to-orange-600' 
                        : 'bg-white/10'
                    }`}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-semibold ${orgType === 'internal' ? 'text-[#FF7619]' : 'text-gray-400'}`}>
                      Internal
                    </span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setOrgType('external')}
                  className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all ${
                    orgType === 'external' 
                      ? 'border-blue-500 bg-blue-500/20' 
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      orgType === 'external' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-white/10'
                    }`}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-semibold ${orgType === 'external' ? 'text-blue-400' : 'text-gray-400'}`}>
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
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-[#FF7619] transition-all"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10 h-11 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOrg}
              className="bg-gradient-to-r from-[#FF7619] to-[#9A18FB] hover:opacity-90 h-11 px-6 rounded-xl shadow-lg shadow-[#FF7619]/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

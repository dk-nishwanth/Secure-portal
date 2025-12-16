import { useState } from 'react';
import { Shield, Folder, Users, Eye, Edit2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';

interface AccessManagementProps {
  onBack: () => void;
}

export function AccessManagement({ onBack }: AccessManagementProps) {
  const { currentOrgName } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Access categories (Purple in workflow - List of category access)
  const accessCategories = [
    { id: 'view', name: 'View Only', count: 45, color: 'from-blue-500 to-cyan-500', description: 'Can only view files and folders' },
    { id: 'edit', name: 'Edit Access', count: 32, color: 'from-orange-500 to-orange-600', description: 'Can view and edit files' },
    { id: 'full', name: 'Full Access', count: 18, color: 'from-green-500 to-emerald-500', description: 'Complete control over files and folders' },
  ];

  // Folders with access levels (Yellow in workflow - List of Folders and accesses)
  const foldersWithAccess = [
    { id: 'f1', name: 'Q-Dot Documents', accessLevel: 'Full Access', users: 12, type: 'internal' },
    { id: 'f2', name: 'OBRIX Files', accessLevel: 'Edit Access', users: 8, type: 'internal' },
    { id: 'f3', name: 'Govt Bodies Shared', accessLevel: 'View Only', users: 5, type: 'external' },
    { id: 'f4', name: 'Board Director Files', accessLevel: 'Edit Access', users: 3, type: 'external' },
    { id: 'f5', name: 'Marginz Projects', accessLevel: 'Full Access', users: 10, type: 'internal' },
    { id: 'f6', name: 'Advisors & Investors', accessLevel: 'View Only', users: 7, type: 'external' },
  ];

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
            className="h-12 px-6 rounded-xl transition-all shadow-lg text-white font-semibold"
            style={{ 
              backgroundColor: '#FF7619',
              boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
            }}
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
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400">
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
      </div>
    </div>
  );
}

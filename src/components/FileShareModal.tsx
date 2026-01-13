import React, { useState } from 'react';
import { X, Search, Users, Building2, Mail, Check, ArrowLeft } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  category: string;
  type: 'internal' | 'external';
}

interface FileShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName?: string;
}

const mockUsers: User[] = [
  // Internal Users
  { id: '1', name: 'John Doe', email: 'john.doe@company.com', category: 'EMPLOYEE', type: 'internal' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', category: 'EMPLOYEE', type: 'internal' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', category: 'EMPLOYEE', type: 'internal' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com', category: 'DEPT_DIRECTOR', type: 'internal' },
  { id: '5', name: 'Robert Brown', email: 'robert.brown@company.com', category: 'DEPT_HEAD', type: 'internal' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa.anderson@company.com', category: 'GRC_TEAM', type: 'internal' },
  
  // External Users
  { id: '7', name: 'Alex Chen', email: 'alex.chen@partner.com', category: 'INTLION', type: 'external' },
  { id: '8', name: 'Maria Garcia', email: 'maria.garcia@contractor.com', category: 'INTLION', type: 'external' },
  { id: '9', name: 'David Kim', email: 'david.kim@vendor.com', category: 'DEPT_HEAD', type: 'external' },
];

const categories = {
  internal: [
    { id: 'EMPLOYEE', label: 'Employee', description: 'Company users' },
    { id: 'DEPT_DIRECTOR', label: 'Dept Director', description: 'Department directors' },
    { id: 'DEPT_HEAD', label: 'Dept Head', description: 'Department heads' },
    { id: 'GRC_TEAM', label: 'GRC Team', description: 'Governance team' },
  ],
  external: [
    { id: 'INTLION', label: 'IntLion', description: 'Outside organization' },
    { id: 'DEPT_HEAD', label: 'Dept Head', description: 'External department heads' },
  ]
};

export function FileShareModal({ isOpen, onClose, fileName = "Selected File" }: FileShareModalProps) {
  const [step, setStep] = useState<'type' | 'category' | 'users'>('type');
  const [selectedType, setSelectedType] = useState<'internal' | 'external' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const resetModal = () => {
    setStep('type');
    setSelectedType(null);
    setSelectedCategory(null);
    setSearchTerm('');
    setSelectedUsers([]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleTypeSelect = (type: 'internal' | 'external') => {
    setSelectedType(type);
    setStep('category');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep('users');
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleShare = () => {
    console.log('Sharing file with users:', selectedUsers);
    handleClose();
  };

  const handleBack = () => {
    if (step === 'users') {
      setStep('category');
      setSelectedCategory(null);
    } else if (step === 'category') {
      setStep('type');
      setSelectedType(null);
    }
  };

  const filteredUsers = mockUsers.filter(user => 
    user.type === selectedType &&
    user.category === selectedCategory &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {step !== 'type' && (
              <button
                type="button"
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
            )}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Share File</h2>
              <p className="text-sm text-gray-400">Share file with internal or external users</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* File Info */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">{fileName}</p>
              <p className="text-sm text-gray-400">Ready to share</p>
            </div>
          </div>
        </div>

        {/* Step 1: Select Type */}
        {step === 'type' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Select User Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTypeSelect('internal')}
                className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-400/30 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">INTERNAL</h4>
                    <p className="text-sm text-gray-400 mt-1">Company users</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleTypeSelect('external')}
                className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/30 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">EXTERNAL</h4>
                    <p className="text-sm text-gray-400 mt-1">Outside organization</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Category */}
        {step === 'category' && selectedType && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Select Category ({selectedType === 'internal' ? 'Internal' : 'External'})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories[selectedType].map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-left"
                >
                  <h4 className="text-white font-medium">{category.label}</h4>
                  <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Search and Select Users */}
        {step === 'users' && selectedType && selectedCategory && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Select Users</h3>
              <span className="text-sm text-gray-400">
                {selectedUsers.length} selected
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Users List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserToggle(user.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedUsers.includes(user.id)
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-sm">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No users found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-white/10">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          {step === 'users' && (
            <button
              onClick={handleShare}
              disabled={selectedUsers.length === 0}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Share ({selectedUsers.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
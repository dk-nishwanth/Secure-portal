import { useState } from 'react';
import { Folder, FolderPlus, Edit2, Trash2, Users, Eye, FileText, Image, Video, Music, File, ArrowLeft, Upload, Mail, ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { Switch } from './ui/switch';
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
import { Textarea } from './ui/textarea';

export interface FolderItem {
  id: string;
  name: string;
  type: 'internal' | 'external';
  description?: string;
  fileCount: number;
  size: string;
  createdAt: Date;
  owner: string;
  accessLevel?: string;
}

export interface FileItem {
  id: string;
  name: string;
  fileType: 'image' | 'video' | 'audio' | 'document' | 'other';
  size: string;
  uploadedAt: Date;
  owner: string;
}

// Mock data
const mockFolders: FolderItem[] = [
  { id: 'f1', name: 'Q-Dot Documents', type: 'internal', description: 'Internal documents for Q-Dot', fileCount: 45, size: '2.4 GB', createdAt: new Date(), owner: 'Admin', accessLevel: 'Full Access' },
  { id: 'f2', name: 'OBRIX Files', type: 'internal', description: 'OBRIX project files', fileCount: 32, size: '1.8 GB', createdAt: new Date(), owner: 'Admin', accessLevel: 'Full Access' },
  { id: 'f3', name: 'Govt Bodies Shared', type: 'external', description: 'Shared with government bodies', fileCount: 12, size: '890 MB', createdAt: new Date(), owner: 'Admin', accessLevel: 'View Only' },
  { id: 'f4', name: 'Board Director Files', type: 'external', description: 'Board director documents', fileCount: 8, size: '450 MB', createdAt: new Date(), owner: 'Admin', accessLevel: 'Edit Access' },
];

const mockFiles: FileItem[] = [
  { id: 'file1', name: 'Annual_Report_2024.pdf', fileType: 'document', size: '2.4 MB', uploadedAt: new Date(), owner: 'Admin' },
  { id: 'file2', name: 'Company_Logo.png', fileType: 'image', size: '145 KB', uploadedAt: new Date(), owner: 'Admin' },
  { id: 'file3', name: 'Presentation_Video.mp4', fileType: 'video', size: '45 MB', uploadedAt: new Date(), owner: 'Admin' },
  { id: 'file4', name: 'Background_Music.mp3', fileType: 'audio', size: '3.2 MB', uploadedAt: new Date(), owner: 'Admin' },
];

interface FolderManagementProps {
  onBack: () => void;
}

export function FolderManagement({ onBack }: FolderManagementProps) {
  const { currentOrgName } = useAuth();
  const [view, setView] = useState<'list' | 'details' | 'files'>('list');
  const [folderType, setFolderType] = useState<'internal' | 'external'>('internal');
  const [folders, setFolders] = useState<FolderItem[]>(mockFolders);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showFileViewModal, setShowFileViewModal] = useState(false);
  
  // Form states
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder: FolderItem = {
        id: `f${Date.now()}`,
        name: folderName,
        type: folderType,
        description: folderDescription,
        fileCount: 0,
        size: '0 MB',
        createdAt: new Date(),
        owner: 'Admin',
        accessLevel: 'Full Access',
      };
      setFolders([newFolder, ...folders]);
      setFolderName('');
      setFolderDescription('');
      setShowCreateModal(false);
    }
  };

  const handleEditFolder = () => {
    if (selectedFolder && folderName.trim()) {
      setFolders(folders.map(f => 
        f.id === selectedFolder.id 
          ? { ...f, name: folderName, description: folderDescription }
          : f
      ));
      setShowEditModal(false);
      setSelectedFolder(null);
      setFolderName('');
      setFolderDescription('');
    }
  };

  const handleDeleteFolder = () => {
    if (selectedFolder) {
      setFolders(folders.filter(f => f.id !== selectedFolder.id));
      setShowDeleteModal(false);
      setSelectedFolder(null);
    }
  };

  const handleViewFolder = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setView('details');
  };

  const handleViewFiles = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setView('files');
  };

  const openEditModal = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setFolderName(folder.name);
    setFolderDescription(folder.description || '');
    setShowEditModal(true);
  };

  const openDeleteModal = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setShowDeleteModal(true);
  };

  const openAccessModal = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setShowAccessModal(true);
  };

  const openFileViewModal = (file: FileItem) => {
    setSelectedFile(file);
    setShowFileViewModal(true);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'document':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-400" />;
      case 'audio':
        return <Music className="w-6 h-6 text-pink-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const internalFolders = folders.filter(f => f.type === 'internal');
  const externalFolders = folders.filter(f => f.type === 'external');
  const displayFolders = folderType === 'internal' ? internalFolders : externalFolders;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-') + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // List View - Windows Explorer Style
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        <div className="px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2 font-bold text-white">
                Folder Management
              </h1>
              <p className="text-gray-400">
                Manage internal and external folders
                {currentOrgName && (
                  <span className="ml-2 text-[#FF7619]">• {currentOrgName}</span>
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
              <FolderPlus className="w-5 h-5 mr-2" />
              Create Folder
            </Button>
          </div>

          {/* Folder Type Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFolderType('internal')}
              style={{
                backgroundColor: folderType === 'internal' ? '#FF7619' : 'transparent',
                color: folderType === 'internal' ? 'white' : '#9CA3AF'
              }}
              className="h-12 px-6 rounded-full font-medium transition-all duration-200 hover:text-white hover:bg-white/10 active:scale-95"
            >
              Internal Folders
            </button>
            <button
              onClick={() => setFolderType('external')}
              style={{
                backgroundColor: folderType === 'external' ? '#FF7619' : 'transparent',
                color: folderType === 'external' ? 'white' : '#9CA3AF'
              }}
              className="h-12 px-6 rounded-full font-medium transition-all duration-200 hover:text-white hover:bg-white/10 active:scale-95"
            >
              External Folders
            </button>
          </div>

          {/* Windows Explorer Style Folder List */}
          <div className="bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Header Row */}
            <div className="flex items-center px-6 py-4 border-b border-white/10 bg-white/5">
              {/* Folder Icon Space */}
              <div className="w-8 flex-shrink-0"></div>
              
              {/* Folder Name */}
              <div className="flex-1 min-w-0 pr-6">
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</span>
              </div>

              {/* Actions */}
              <div className="w-44 px-3">
                <div className="flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</span>
                </div>
              </div>
            </div>

            {/* Folder Rows */}
            <div className="divide-y divide-white/5">
              {displayFolders.map((folder) => (
                <div
                  key={folder.id}
                  className="group flex items-center px-6 py-4 hover:bg-white/5 cursor-pointer transition-all duration-200"
                >
                  {/* Folder Icon */}
                  <div className="w-8 flex-shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="#FCD34D"/>
                      <path d="M2 8H22V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8Z" fill="#FBBF24"/>
                    </svg>
                  </div>
                  
                  {/* Folder Name */}
                  <div 
                    className="flex-1 min-w-0 pr-6"
                    onClick={() => handleViewFiles(folder)}
                  >
                    <span className="text-white text-sm font-medium truncate group-hover:text-[#FF7619] transition-colors duration-200">
                      {folder.name}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="w-44 px-3 flex items-center justify-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewFolder(folder);
                      }}
                      className="w-9 h-9 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(folder);
                      }}
                      className="w-9 h-9 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAccessModal(folder);
                      }}
                      className="w-9 h-9 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                      title="Manage Access"
                    >
                      <Users className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(folder);
                      }}
                      className="w-9 h-9 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {displayFolders.length === 0 && (
              <div className="text-center py-16">
                <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">No folders found</p>
              </div>
            )}
          </div>
        </div>

        {/* Create Folder Modal */}
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
                  <FolderPlus className="w-5 h-5 text-white" />
                </div>
                Create New Folder
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Add a new folder to organize your files
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="folderName" className="text-gray-300 mb-2 block font-medium">
                  Folder Name
                </Label>
                <Input
                  id="folderName"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
                />
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Email Notifications</p>
                      <p className="text-sm text-gray-400">Get notified about folder activities</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
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
                onClick={handleCreateFolder}
                className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                Create Folder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Folder Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Edit Folder</DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Update folder information
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="editFolderName" className="text-gray-300 mb-2 block font-medium">
                  Folder Name
                </Label>
                <Input
                  id="editFolderName"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-[#FF7619]"
                />
              </div>
              
              <div>
                <Label htmlFor="editFolderDescription" className="text-gray-300 mb-2 block font-medium">
                  Description
                </Label>
                <Textarea
                  id="editFolderDescription"
                  value={folderDescription}
                  onChange={(e) => setFolderDescription(e.target.value)}
                  className="bg-white/5 border-white/10 text-white rounded-xl focus:border-[#FF7619] min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditFolder}
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
              <DialogTitle>Delete Folder</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to delete "{selectedFolder?.name}"? This action cannot be undone.
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
                onClick={handleDeleteFolder}
                className="bg-red-500 hover:bg-red-600 h-12 px-6 rounded-xl"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Access Management Modal */}
        <Dialog open={showAccessModal} onOpenChange={setShowAccessModal}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Manage Access</DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Control who can access "{selectedFolder?.name}"
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Current Access Level</span>
                  <Badge className="bg-[#FF7619]/20 text-[#FF7619] border-[#FF7619]/30">
                    {selectedFolder?.accessLevel}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">
                  This folder is currently accessible with {selectedFolder?.accessLevel?.toLowerCase()} permissions.
                </p>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block font-medium">Grant Access To</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select user or group" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="user1">John Doe</SelectItem>
                    <SelectItem value="user2">Jane Smith</SelectItem>
                    <SelectItem value="group1">Q-Dot Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block font-medium">Permission Level</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select permission" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="view">View Only</SelectItem>
                    <SelectItem value="edit">Edit Access</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAccessModal(false)}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Close
              </Button>
              <Button
                className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Grant Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Folder Details View
  if (view === 'details' && selectedFolder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        <div className="px-6 py-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <button
              onClick={() => {
                setView('list');
                setSelectedFolder(null);
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Folders
            </button>
          </div>

          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => {
                setView('list');
                setSelectedFolder(null);
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-[#FF7619] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Folders</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">{selectedFolder.name}</span>
          </div>

          <div className="relative group mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    selectedFolder.type === 'internal'
                      ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'
                      : 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
                  }`}>
                    <Folder className={`w-8 h-8 ${
                      selectedFolder.type === 'internal' ? 'text-[#FF7619]' : 'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedFolder.name}</h1>
                    <Badge className={`${
                      selectedFolder.type === 'internal'
                        ? 'bg-[#FF7619]/20 text-[#FF7619] border-[#FF7619]/30'
                        : 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                    }`}>
                      {selectedFolder.type === 'internal' ? 'Internal' : 'External'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditModal(selectedFolder)}
                    variant="outline"
                    className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-10 px-4 rounded-xl"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleViewFiles(selectedFolder)}
                    className="h-10 px-4 rounded-xl shadow-lg text-white font-semibold"
                    style={{ 
                      backgroundColor: '#FF7619',
                      boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                    }}
                  >
                    View Files
                  </Button>
                </div>
              </div>

              {selectedFolder.description && (
                <p className="text-gray-300 mb-6">{selectedFolder.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Total Files</p>
                  <p className="text-2xl font-bold text-white">{selectedFolder.fileCount}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Total Size</p>
                  <p className="text-2xl font-bold text-white">{selectedFolder.size}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Access Level</p>
                  <p className="text-2xl font-bold text-white">{selectedFolder.accessLevel}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4">Folder Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span className="text-white">{selectedFolder.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="text-white">{selectedFolder.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white capitalize">{selectedFolder.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Files View
  if (view === 'files' && selectedFolder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        <div className="px-6 py-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <button
              onClick={() => {
                setView('list');
                setSelectedFolder(null);
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Folders
            </button>
          </div>

          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => {
                setView('list');
                setSelectedFolder(null);
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-[#FF7619] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Folders</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">{selectedFolder.name}</span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {selectedFolder.name}
            </h1>
            <p className="text-gray-400">
              {files.length} files • {selectedFolder.size}
            </p>
          </div>

          {/* Files Grid - OneDrive Style */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Files & Media</h3>
                <div className="flex gap-2">
                  <Button
                    className="h-10 px-4 rounded-xl text-white text-sm font-medium transition-all"
                    style={{ 
                      backgroundColor: '#FF7619',
                      boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Folder
                  </Button>
                  <Button
                    className="h-10 px-4 rounded-xl text-white text-sm font-medium transition-all"
                    style={{ 
                      backgroundColor: '#9A18FB',
                      boxShadow: '0 4px 10px -2px rgba(154, 24, 251, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(154, 24, 251, 0.9)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9A18FB'}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
              
              {/* OneDrive List View Header */}
              <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 mb-2">
                <div className="w-8 flex-shrink-0"></div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <span className="text-xs font-medium text-gray-400 uppercase">Name</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs font-medium text-gray-400 uppercase">
                    <span className="w-20 text-right">Modified</span>
                    <span className="w-16 text-right">Size</span>
                    <span className="w-20 text-right">Type</span>
                  </div>
                </div>
              </div>
              
              {/* OneDrive List View - Icon on Left, Details on Right */}
              <div className="space-y-0.5">
                {files.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => openFileViewModal(file)}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/10"
                  >
                    {/* File Icon on Left */}
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-white/5 flex-shrink-0 group-hover:bg-white/10 transition-colors">
                      {getFileIcon(file.fileType)}
                    </div>
                    
                    {/* File Details on Right */}
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <div className="flex-1 min-w-0 mr-4">
                        <h4 className="text-white text-sm font-medium truncate group-hover:text-[#FF7619] transition-colors" title={file.name}>
                          {file.name}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-6 text-xs text-gray-400">
                        <span className="w-20 text-right">{file.uploadedAt.toLocaleDateString()}</span>
                        <span className="w-16 text-right font-medium">{file.size}</span>
                        <span className="w-20 text-right capitalize">{file.fileType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {files.length === 0 && (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">No files in this folder yet</p>
                  <p className="text-gray-500 text-xs mt-1">Upload files to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* File View Modal */}
        <Dialog open={showFileViewModal} onOpenChange={setShowFileViewModal}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  {selectedFile && getFileIcon(selectedFile.fileType)}
                </div>
                {selectedFile?.name}
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                File preview and details
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {/* File Preview Area */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/10 flex items-center justify-center min-h-[300px]">
                {selectedFile?.fileType === 'image' && (
                  <div className="text-center">
                    <Image className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">Image preview would appear here</p>
                  </div>
                )}
                {selectedFile?.fileType === 'video' && (
                  <div className="text-center">
                    <Video className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-400">Video player would appear here</p>
                  </div>
                )}
                {selectedFile?.fileType === 'audio' && (
                  <div className="text-center">
                    <Music className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                    <p className="text-gray-400">Audio player would appear here</p>
                  </div>
                )}
                {selectedFile?.fileType === 'document' && (
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-400">Document viewer would appear here</p>
                  </div>
                )}
              </div>

              {/* File Details */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3">File Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size</span>
                    <span className="text-white">{selectedFile?.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white capitalize">{selectedFile?.fileType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uploaded</span>
                    <span className="text-white">{selectedFile?.uploadedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span className="text-white">{selectedFile?.owner}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFileViewModal(false)}
                className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white h-12 px-6 rounded-xl"
              >
                Close
              </Button>
              <Button
                className="h-12 px-6 rounded-xl shadow-lg text-white font-semibold"
                style={{ 
                  backgroundColor: '#FF7619',
                  boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Open in Editor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
}

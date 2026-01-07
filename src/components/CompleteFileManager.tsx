import { useState, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Upload,
  FolderPlus,
  Home,
  ChevronRight,
  Folder,
  File,
  FileText,
  Image as ImageIcon,
  FileArchive,
  MoreVertical,
  Edit2,
  Trash2,
  Users,
  Eye,
  Download,
  Share2,
  X,
} from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  fileCount: number;
  size: string;
  createdAt: Date;
  owner: string;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file';
  fileType: string;
  size: string;
  modified: Date;
  owner: string;
}

type Item = FolderItem | FileItem;

interface Permission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  actions: string[];
}

// Mock data
const mockFolders: FolderItem[] = [
  { id: '1', name: 'Documents', type: 'folder', fileCount: 24, size: '2.4 GB', createdAt: new Date(), owner: 'Admin User' },
  { id: '2', name: 'Projects', type: 'folder', fileCount: 18, size: '1.8 GB', createdAt: new Date(), owner: 'Admin User' },
  { id: '3', name: 'Reports', type: 'folder', fileCount: 12, size: '890 MB', createdAt: new Date(), owner: 'Admin User' },
  { id: '4', name: 'Security Logs', type: 'folder', fileCount: 45, size: '3.2 GB', createdAt: new Date(), owner: 'Admin User' },
];

const mockFiles: FileItem[] = [
  { id: '101', name: 'Annual Report 2024.pdf', type: 'file', fileType: 'PDF', size: '2.4 MB', modified: new Date(2024, 11, 10), owner: 'Admin User' },
  { id: '102', name: 'Security Policy.docx', type: 'file', fileType: 'DOCX', size: '145 KB', modified: new Date(2024, 11, 8), owner: 'Admin User' },
  { id: '103', name: 'Dashboard Screenshot.png', type: 'file', fileType: 'PNG', size: '890 KB', modified: new Date(2024, 11, 5), owner: 'Admin User' },
  { id: '104', name: 'Data Backup.zip', type: 'file', fileType: 'ZIP', size: '12.5 MB', modified: new Date(2024, 11, 1), owner: 'Admin User' },
];

const mockUsers = [
  { id: 'u1', name: 'John Doe', email: 'john@company.com' },
  { id: 'u2', name: 'Jane Smith', email: 'jane@company.com' },
  { id: 'u3', name: 'Mike Johnson', email: 'mike@company.com' },
];

const permissionOptions = [
  { value: 'FOLDER_VIEW', label: 'View', icon: '👁️' },
  { value: 'FOLDER_EDIT', label: 'Edit', icon: '✏️' },
  { value: 'FOLDER_DELETE', label: 'Delete', icon: '🗑️' },
  { value: 'FILE_DOWNLOAD', label: 'Download', icon: '⬇️' },
  { value: 'FOLDER_UPLOAD', label: 'Upload', icon: '⬆️' },
];

export function CompleteFileManager() {
  const { role, currentOrgName } = useAuth();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([...mockFolders, ...mockFiles]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: 'Root' }
  ]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<Item | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [accessTarget, setAccessTarget] = useState<Item | null>(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [existingPermissions, setExistingPermissions] = useState<Permission[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
    // In production: fetch folder contents
  };

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
    setCurrentFolderId(newBreadcrumbs[newBreadcrumbs.length - 1].id);
    // In production: fetch folder contents
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder: FolderItem = {
        id: `f${Date.now()}`,
        name: folderName,
        type: 'folder',
        fileCount: 0,
        size: '0 MB',
        createdAt: new Date(),
        owner: 'Admin User',
      };
      setItems([newFolder, ...items]);
      setFolderName('');
      setShowCreateModal(false);
    }
  };

  const handleRename = () => {
    if (renameTarget && renameValue.trim()) {
      setItems(items.map(item => 
        item.id === renameTarget.id ? { ...item, name: renameValue } : item
      ));
      setRenameModalOpen(false);
      setRenameTarget(null);
      setRenameValue('');
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setItems(items.filter(item => item.id !== deleteTarget.id));
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadLoading(true);
      // Simulate upload
      setTimeout(() => {
        const newFiles: FileItem[] = Array.from(files).map((file, index) => ({
          id: `f${Date.now()}_${index}`,
          name: file.name,
          type: 'file',
          fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          modified: new Date(),
          owner: 'Admin User',
        }));
        setItems([...newFiles, ...items]);
        setUploadLoading(false);
      }, 1000);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadLoading(true);
      setTimeout(() => {
        const newFiles: FileItem[] = Array.from(files).map((file, index) => ({
          id: `f${Date.now()}_${index}`,
          name: file.name,
          type: 'file',
          fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          modified: new Date(),
          owner: 'Admin User',
        }));
        setItems([...newFiles, ...items]);
        setUploadLoading(false);
      }, 1000);
    }
  }, [items]);

  const openRenameModal = (item: Item) => {
    setRenameTarget(item);
    setRenameValue(item.name);
    setRenameModalOpen(true);
  };

  const openDeleteModal = (item: Item) => {
    setDeleteTarget(item);
    setDeleteModalOpen(true);
  };

  const openAccessModal = (item: Item) => {
    setAccessTarget(item);
    // Mock existing permissions
    setExistingPermissions([
      { id: 'p1', userId: 'u1', userName: 'John Doe', userEmail: 'john@company.com', actions: ['FOLDER_VIEW', 'FOLDER_EDIT'] },
    ]);
    setAccessModalOpen(true);
  };

  const handleGrantPermission = () => {
    if (selectedUser && selectedPermissions.length > 0) {
      const user = mockUsers.find(u => u.id === selectedUser);
      if (user) {
        const newPermission: Permission = {
          id: `p${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          actions: selectedPermissions,
        };
        setExistingPermissions([...existingPermissions, newPermission]);
        setSelectedUser('');
        setSelectedPermissions([]);
      }
    }
  };

  const handleRevokePermission = (permissionId: string) => {
    setExistingPermissions(existingPermissions.filter(p => p.id !== permissionId));
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-400" />;
      case 'DOCX':
      case 'DOC':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'PNG':
      case 'JPG':
      case 'JPEG':
        return <ImageIcon className="w-5 h-5 text-green-400" />;
      case 'ZIP':
      case 'RAR':
        return <FileArchive className="w-5 h-5 text-yellow-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  const folders = items.filter(item => item.type === 'folder') as FolderItem[];
  const files = items.filter(item => item.type === 'file') as FileItem[];

  const isSuperAdmin = role === 'super-admin';

  return (
    <div
      className="space-y-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
            File Manager
          </h1>
          <p className="text-gray-400">
            Manage your files and folders securely
            {currentOrgName && (
              <span className="ml-2 text-[#FF7619]">• {currentOrgName}</span>
            )}
          </p>
        </div>
        {isSuperAdmin && (
          <div className="flex gap-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="h-12 px-6 bg-[#FF7619] hover:bg-[#FF7619]/90 rounded-xl transition-all shadow-lg text-white font-semibold"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload File
            </Button>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="h-12 px-6 bg-[#9A18FB] hover:bg-[#9A18FB]/90 rounded-xl transition-all shadow-lg text-white font-semibold"
            >
              <FolderPlus className="w-5 h-5 mr-2" />
              New Folder
            </Button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Breadcrumbs */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    index === breadcrumbs.length - 1
                      ? 'bg-gradient-to-r from-[#FF7619] to-[#9A18FB] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span className="font-medium">{crumb.name}</span>
                </button>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Folders Grid */}
      {folders.length > 0 && (
        <div>
          <h3 
            className="mb-4 text-xl font-semibold"
            style={{
              background: 'linear-gradient(to right, rgba(154, 24, 251, 1), rgb(200, 100, 200), #FF7619)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Folders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder, index) => {
              // Alternate between orange and purple theme for each folder
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
                  key={folder.id}
                  onDoubleClick={() => handleFolderClick(folder.id, folder.name)}
                  className={`relative group bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 ${borderHover} cursor-pointer transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg`}>
                      <Folder className="w-6 h-6" style={{ color: iconColor }} />
                    </div>
                  {isSuperAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg hover:bg-white/10"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1a1a2e] border-white/10">
                        <DropdownMenuItem
                          onClick={() => openRenameModal(folder)}
                          className="text-white hover:bg-white/10"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openAccessModal(folder)}
                          className="text-white hover:bg-white/10"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Manage Access
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteModal(folder)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                  <h4 className="text-white mb-2 truncate">{folder.name}</h4>
                  <p className="text-sm text-gray-400">{folder.fileCount} files • {folder.size}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Files Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className={`relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 transition-all ${uploadLoading ? 'opacity-50' : ''}`}>
          <h3 className="text-white text-lg font-semibold mb-4">Recent Files</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Size</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Modified</th>
                  <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Owner</th>
                  {isSuperAdmin && (
                    <th className="text-left py-3 px-4 text-xs uppercase text-gray-400">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b border-white/5 hover:bg-[var(--lime-green)]/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          {getFileIcon(file.fileType)}
                        </div>
                        <span className="text-white">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        className="border"
                        style={{ 
                          backgroundColor: 'rgba(154, 24, 251, 0.2)', 
                          color: 'rgba(154, 24, 251, 1)',
                          borderColor: 'rgba(0, 188, 212, 0.3)'
                        }}
                      >
                        {file.fileType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{file.size}</td>
                    <td className="py-4 px-4 text-gray-400">
                      {file.modified.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-gray-400">{file.owner}</td>
                    {isSuperAdmin && (
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openRenameModal(file)}
                            className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openAccessModal(file)}
                            className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          >
                            <Users className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteModal(file)}
                            className="w-8 h-8 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drag & Drop Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#1a1a2e] border-2 border-dashed border-[var(--lime-green)] rounded-3xl p-12 text-center">
            <Upload className="w-16 h-16 text-[var(--lime-green)] mx-auto mb-4" />
            <h3 className="text-white text-2xl mb-2">Drop folders & files here to upload</h3>
            <p className="text-gray-400">Supports multiple files and folder structures</p>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal} modal={false}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter a name for your new folder
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="folderName" className="text-gray-300 mb-2 block">
              Folder Name
            </Label>
            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="My Folder"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              className="bg-[linear-gradient(to_right,var(--lime-green),var(--cyan))] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Modal */}
      <Dialog open={renameModalOpen} onOpenChange={setRenameModalOpen} modal={false}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Rename {renameTarget?.type === 'folder' ? 'Folder' : 'File'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter a new name
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="newName" className="text-gray-300 mb-2 block">
              New Name
            </Label>
            <Input
              id="newName"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRenameModalOpen(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              className="bg-[linear-gradient(to_right,var(--lime-green),var(--cyan))] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen} modal={false}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.type === 'folder' ? 'Folder' : 'File'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              className="border-white/10 text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Access Modal */}
      <Dialog open={accessModalOpen} onOpenChange={setAccessModalOpen} modal={false}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Access - {accessTarget?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Control who can access this {accessTarget?.type}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            {/* Grant Permission Section */}
            <div className="space-y-4">
              <Label className="text-gray-300">Grant Permission</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div>
                <Label className="text-gray-300 mb-3 block">Permissions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {permissionOptions.map((perm) => (
                    <div key={perm.value} className="flex items-center gap-2">
                      <Checkbox
                        id={perm.value}
                        checked={selectedPermissions.includes(perm.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPermissions([...selectedPermissions, perm.value]);
                          } else {
                            setSelectedPermissions(selectedPermissions.filter(p => p !== perm.value));
                          }
                        }}
                        className="border-white/20 data-[state=checked]:bg-[var(--lime-green)]"
                      />
                      <Label htmlFor={perm.value} className="text-sm text-gray-300 cursor-pointer">
                        {perm.icon} {perm.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGrantPermission}
                disabled={!selectedUser || selectedPermissions.length === 0}
                className="w-full bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan)] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
              >
                Add Permission
              </Button>
            </div>

            {/* Current Access List */}
            <div>
              <Label className="text-gray-300 mb-3 block">Current Access</Label>
              <div className="space-y-2">
                {existingPermissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div>
                      <p className="text-white text-sm">{perm.userName}</p>
                      <p className="text-gray-400 text-xs">{perm.userEmail}</p>
                      <div className="flex gap-1 mt-2">
                        {perm.actions.map((action) => {
                          const option = permissionOptions.find(o => o.value === action);
                          return (
                            <Badge
                              key={action}
                              className="bg-[var(--lime-green)]/20 text-[var(--lime-green)] border-[var(--lime-green)]/30 text-xs"
                            >
                              {option?.icon} {option?.label}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRevokePermission(perm.id)}
                      className="text-red-400 hover:bg-red-500/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setAccessModalOpen(false)}
              className="bg-[linear-gradient(to_right,var(--lime-green),var(--cyan))] hover:from-[var(--cyan)] hover:to-[var(--cyan)]"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

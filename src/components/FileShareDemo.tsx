import React, { useState } from 'react';
import { Share2, File, Folder, Upload, Plus } from 'lucide-react';
import { FileShareModal } from './FileShareModal';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: 'New', type: 'folder', modified: '01/01/2026' },
  { id: '2', name: 'new one', type: 'folder', modified: '01/01/2026' },
  { id: '3', name: 'Testing', type: 'folder', modified: '01/01/2026' },
  { id: '4', name: 'Animesh.jpg', type: 'file', size: '12.0 kB', modified: '01/01/2026' },
  { id: '5', name: 'Cricinfo.docx', type: 'file', size: '29.0 kB', modified: '01/01/2026' },
];

export function FileShareDemo() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');

  const handleShare = (fileName: string) => {
    setSelectedFile(fileName);
    setIsShareModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl text-white">
          File <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Manager</span>
        </h1>
        <p className="text-gray-400">Manage your files and folders • Oddzz</p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>📁 Root</span>
        <span>/</span>
        <span>Home</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium">
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-200 font-medium">
          <Plus className="w-4 h-4" />
          <span>Upload Folder</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-medium">
          <Plus className="w-4 h-4" />
          <span>Create Folder</span>
        </button>
      </div>

      {/* File List */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">MODIFIED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">SIZE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {mockFiles.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          {item.type === 'folder' ? (
                            <Folder className="w-4 h-4 text-blue-400" />
                          ) : (
                            <File className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{item.modified}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{item.size || '-'}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {item.type === 'file' && (
                          <button
                            onClick={() => handleShare(item.name)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                            title="Share file"
                          >
                            <Share2 className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                          </button>
                        )}
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <span className="text-gray-400 hover:text-white">⋯</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* File Share Modal */}
      <FileShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        fileName={selectedFile}
      />
    </div>
  );
}
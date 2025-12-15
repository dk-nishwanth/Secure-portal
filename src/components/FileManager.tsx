import { File, Folder, MoreVertical, Search, Filter, Upload, Download, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const files = [
  { id: 1, name: "Q4_Financial_Report.pdf", type: "PDF", size: "2.4 MB", modified: "2 hours ago", owner: "John Doe" },
  { id: 2, name: "Security_Protocol.docx", type: "DOCX", size: "1.8 MB", modified: "5 hours ago", owner: "Sarah Smith" },
  { id: 3, name: "System_Architecture.png", type: "PNG", size: "3.2 MB", modified: "1 day ago", owner: "Mike Jones" },
  { id: 4, name: "Database_Backup.zip", type: "ZIP", size: "45.6 MB", modified: "2 days ago", owner: "Admin" },
  { id: 5, name: "User_Manual.pdf", type: "PDF", size: "5.1 MB", modified: "3 days ago", owner: "Sarah Smith" },
];

const folders = [
  { id: 1, name: "Documents", files: 234, size: "1.2 GB" },
  { id: 2, name: "Images", files: 567, size: "3.4 GB" },
  { id: 3, name: "Backups", files: 12, size: "12.8 GB" },
  { id: 4, name: "Reports", files: 89, size: "890 MB" },
];

export function FileManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-3xl mb-2 font-bold"
            style={{
              background: 'linear-gradient(to right, rgba(154, 24, 251, 1), rgb(200, 100, 200), #FF7619)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            File Manager
          </h2>
          <p className="text-gray-400">Manage your files and folders securely</p>
        </div>
        <Button className="bg-white/10 hover:bg-white/20 rounded-xl gap-2 border border-white/10 backdrop-blur-xl transition-all">
          <Upload className="w-4 h-4 text-white" />
          <span 
            className="font-semibold"
            style={{
              background: 'linear-gradient(to right, rgba(154, 24, 251, 1), rgb(200, 100, 200), #FF7619)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Upload File
          </span>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50"
          />
        </div>
        <Button variant="outline" className="rounded-xl gap-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Folders Section */}
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
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="group relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, var(--lime-green), var(--cyan))', boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.2)' }}>
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <h4 className="text-white mb-1">{folder.name}</h4>
              <p className="text-sm text-gray-400">{folder.files} files • {folder.size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">Recent Files</h3>
          <button className="text-sm text-[var(--cyan)] hover:text-purple-300 transition-colors">
            View All
          </button>
        </div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-4 px-6 text-sm text-gray-400">Name</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-400">Type</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-400">Size</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-400">Modified</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-400">Owner</th>
                  <th className="text-left py-4 px-6 text-sm text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <File className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span 
                        className="px-3 py-1 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: 'rgba(154, 24, 251, 0.2)', 
                          color: 'rgba(154, 24, 251, 1)'
                        }}
                      >
                        {file.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">{file.size}</td>
                    <td className="py-4 px-6 text-gray-400">{file.modified}</td>
                    <td className="py-4 px-6 text-gray-400">{file.owner}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white" />
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
    </div>
  );
}

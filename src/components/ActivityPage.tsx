import { useState } from 'react';
import { Clock, Download, Upload, Edit2, Trash2, Eye, Share2, ArrowLeft, Filter, Search, Calendar, TrendingUp, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Activity {
  id: string;
  type: 'upload' | 'download' | 'edit' | 'delete' | 'share' | 'view';
  description: string;
  file: string;
  user: string;
  timestamp: Date;
  size?: string;
}

interface ActivityPageProps {
  onBack?: () => void;
}

const mockActivities: Activity[] = [
  { id: '1', type: 'upload', description: 'Uploaded new document', file: 'quarterly_report.pdf', user: 'You', timestamp: new Date(Date.now() - 5 * 60000), size: '2.4 MB' },
  { id: '2', type: 'share', description: 'Shared with team', file: 'Q4_Budget.xlsx', user: 'You', timestamp: new Date(Date.now() - 15 * 60000), size: '1.2 MB' },
  { id: '3', type: 'edit', description: 'Modified document', file: 'Project_Plan.docx', user: 'John Doe', timestamp: new Date(Date.now() - 30 * 60000), size: '856 KB' },
  { id: '4', type: 'download', description: 'Downloaded file', file: 'Security_Policy.pdf', user: 'You', timestamp: new Date(Date.now() - 60 * 60000), size: '3.1 MB' },
  { id: '5', type: 'view', description: 'Viewed document', file: 'Company_Handbook.pdf', user: 'Sarah Smith', timestamp: new Date(Date.now() - 2 * 60 * 60000), size: '5.2 MB' },
  { id: '6', type: 'delete', description: 'Deleted old file', file: 'old_backup.zip', user: 'You', timestamp: new Date(Date.now() - 3 * 60 * 60000), size: '12.8 MB' },
  { id: '7', type: 'upload', description: 'Uploaded image', file: 'Team_Photo.jpg', user: 'Mike Johnson', timestamp: new Date(Date.now() - 5 * 60 * 60000), size: '4.5 MB' },
  { id: '8', type: 'share', description: 'Shared presentation', file: 'Marketing_Strategy.pptx', user: 'You', timestamp: new Date(Date.now() - 24 * 60 * 60000), size: '8.9 MB' },
];

export function ActivityPage({ onBack }: ActivityPageProps) {
  const { currentOrgName } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const getActivityIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'upload': return <Upload className={iconClass} />;
      case 'download': return <Download className={iconClass} />;
      case 'edit': return <Edit2 className={iconClass} />;
      case 'delete': return <Trash2 className={iconClass} />;
      case 'share': return <Share2 className={iconClass} />;
      case 'view': return <Eye className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  const getActivityStyle = (type: string) => {
    const styles = {
      upload: { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
      download: { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
      edit: { bg: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', border: 'rgba(249, 115, 22, 0.3)' },
      delete: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
      share: { bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
      view: { bg: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' },
    };
    return styles[type as keyof typeof styles] || styles.view;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-white/10 text-gray-400 hover:text-white h-10 w-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Activity Log</h1>
            <p className="text-gray-400 text-sm">
              Track all file operations and user activities
              {currentOrgName && <span className="text-[#FF7619] ml-2">• {currentOrgName}</span>}
            </p>
          </div>
        </div>
        <Button
          className="h-10 px-4 rounded-xl text-white font-medium"
          style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Activities', value: '156', icon: TrendingUp, gradient: 'from-orange-500 to-red-500' },
          { label: 'Files Uploaded', value: '24', icon: Upload, gradient: 'from-green-500 to-emerald-500' },
          { label: 'Files Shared', value: '12', icon: Share2, gradient: 'from-purple-500 to-pink-500' },
          { label: 'Active Users', value: '8', icon: Eye, gradient: 'from-blue-500 to-cyan-500' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-400">Today</span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-3 flex-wrap max-w-2xl">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities..."
            className="w-full pl-11 bg-[#1a1a2e]/60 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#FF7619]"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[160px] h-12 bg-[#1a1a2e]/60 border-white/10 text-white rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Activities" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="upload">Upload</SelectItem>
            <SelectItem value="download">Download</SelectItem>
            <SelectItem value="share">Share</SelectItem>
            <SelectItem value="edit">Edit</SelectItem>
            <SelectItem value="view">View</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Activity List */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
        <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Recent Activities</h2>
            <p className="text-sm text-gray-400 mt-1">{filteredActivities.length} activities found</p>
          </div>
          
          <div className="divide-y divide-white/5">
            {filteredActivities.map((activity) => {
              const style = getActivityStyle(activity.type);
              return (
                <div
                  key={activity.id}
                  className="p-5 hover:bg-white/5 transition-all group/item"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: style.bg, border: `1px solid ${style.border}` }}
                    >
                      <div style={{ color: style.color }}>
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white text-sm font-medium">{activity.file}</p>
                        <Badge
                          className="capitalize text-xs"
                          style={{
                            backgroundColor: style.bg,
                            color: style.color,
                            borderColor: style.border
                          }}
                        >
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">{activity.description}</p>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-medium">
                          {activity.user.charAt(0)}
                        </div>
                        <span>{activity.user}</span>
                      </div>
                      {activity.size && (
                        <span className="hidden md:block">{activity.size}</span>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatTimestamp(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

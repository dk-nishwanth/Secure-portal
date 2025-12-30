import { useState, useEffect } from 'react';
import { Clock, Download, Upload, Edit2, Trash2, Eye, Share2, ArrowLeft, Filter, Search, Calendar, TrendingUp, FileText, Shield, Users, FolderPlus, Building2, UserPlus, UserX, AlertCircle, RefreshCw, Activity, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { activityService, type ActivityApiResponse } from '../services/activityService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ActivityPageProps {
  onBack?: () => void;
}

// Mock API response based on your Postman data
const mockApiResponse: ActivityApiResponse = {
  success: true,
  data: {
    period: {
      days: 30,
      startDate: "2025-11-27T08:40:31.101Z",
      endDate: "2025-12-27T08:40:31.307Z"
    },
    totalActions: 120,
    failedActions: 3,
    actionsByType: [
      { _id: "LOGIN_SUCCESS", count: 53 },
      { _id: "PERMISSION_GRANT", count: 27 },
      { _id: "PERMISSION_REVOKE", count: 20 },
      { _id: "FOLDER_CREATE", count: 6 },
      { _id: "USER_CREATE", count: 4 },
      { _id: "ORGANISATION_UPDATE", count: 3 },
      { _id: "ORGANISATION_CREATE", count: 2 },
      { _id: "ORGANISATION_DELETE", count: 2 },
      { _id: "USER_DELETE", count: 1 },
      { _id: "FOLDER_RENAME", count: 1 }
    ],
    topUsers: [
      {
        _id: "6947cac267177d70672326ab",
        count: 102,
        userId: "6947cac267177d70672326ab",
        name: "Audit Testing Person Admin",
        email: "netibib127@m3player.com"
      },
      {
        _id: "693416d1f2511ce8e9092820",
        count: 9,
        userId: "693416d1f2511ce8e9092820",
        name: "Anand",
        email: "anandsugan218@gmail.com"
      },
      {
        _id: "6947e9e9250b66386f9f7906",
        count: 7,
        userId: "6947e9e9250b66386f9f7906",
        name: "Audit Testing Person User 1 Edited",
        email: "netibib127@m1player.com"
      },
      {
        _id: "694bfe397e45b5cb51fffb67",
        count: 2,
        userId: "694bfe397e45b5cb51fffb67",
        name: "Audit Testing Person Admin 2",
        email: "netibib127@m4player.com"
      }
    ],
    recentCriticalActions: [
      {
        _id: "694e9f0393011b6fa797757c",
        userId: {
          _id: "6947cac267177d70672326ab",
          name: "Audit Testing Person Admin",
          email: "netibib127@m3player.com"
        },
        resourceId: "694bcbdfdd05af7dafb71e53",
        resourceType: "permission",
        action: "PERMISSION_REVOKE",
        details: {
          oldValues: { actions: ["FILE_VIEW", "FILE_OPEN"], targetUserId: "694e9f0293011b6fa797756d" },
          newValues: null,
          metadata: { revokedBy: "6947cac267177d70672326ab", resourceType: "file", targetUserId: "6947e9e9250b66386f9f7906" },
          affectedCount: 1
        },
        ipAddress: "::1",
        userAgent: "PostmanRuntime/7.50.0",
        status: "success",
        timestamp: "2025-12-26T14:43:15.524Z"
      },
      {
        _id: "694e9f0293011b6fa797756f",
        userId: {
          _id: "6947cac267177d70672326ab",
          name: "Audit Testing Person Admin",
          email: "netibib127@m3player.com"
        },
        resourceId: "694bcbdfdd05af7dafb71e53",
        resourceType: "permission",
        action: "PERMISSION_GRANT",
        details: {
          oldValues: null,
          newValues: { actions: ["FILE_VIEW", "FILE_OPEN"] },
          metadata: { targetUserId: "6947e9e9250b66386f9f7906", resourceType: "file", grantedBy: "6947cac267177d70672326ab", expireAt: null, override: true },
          affectedCount: 1
        },
        ipAddress: "::1",
        userAgent: "PostmanRuntime/7.50.0",
        status: "success",
        timestamp: "2025-12-26T14:43:14.262Z"
      }
    ]
  },
  message: "Audit statistics retrieved successfully",
  error: null
};

export function ActivityPage({ onBack }: ActivityPageProps) {
  const { currentOrgName } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [apiData, setApiData] = useState<ActivityApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string>('30');

  const fetchActivityData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the activity service for backend integration
      // const data = await activityService.getActivityStatistics(parseInt(dateRange));
      // setApiData(data);

      // Simulate API call with mock data for now
      console.log(`Fetching activity data for ${dateRange} days...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate different data based on date range
      const mockData = {
        ...mockApiResponse,
        data: {
          ...mockApiResponse.data,
          period: {
            days: parseInt(dateRange),
            startDate: new Date(Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date().toISOString()
          }
        }
      };
      
      setApiData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activity data');
      console.error('Error fetching activity data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      if (!apiData) return;
      
      setLoading(true);
      
      // Use the activity service for backend integration
      // const blob = await activityService.exportActivityData({
      //   days: parseInt(dateRange),
      //   format: 'csv',
      //   filters: filterType !== 'all' ? { action: filterType } : undefined
      // });
      // 
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = `activity-report-${dateRange}days-${new Date().toISOString().split('T')[0]}.csv`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(url);

      // Create CSV content from current data (fallback for demo)
      const csvHeaders = [
        'Timestamp', 
        'User Name', 
        'User Email', 
        'Action', 
        'Resource Type', 
        'Resource ID', 
        'Status', 
        'IP Address', 
        'User Agent',
        'Details'
      ];
      
      const csvRows = filteredActions.map(activity => [
        new Date(activity.timestamp).toLocaleString(),
        activity.userId.name,
        activity.userId.email,
        formatActionName(activity.action),
        activity.resourceType,
        activity.resourceId,
        activity.status,
        activity.ipAddress,
        activity.userAgent,
        JSON.stringify(activity.details).replace(/"/g, '""') // Escape quotes for CSV
      ]);
      
      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      // Add BOM for proper UTF-8 encoding
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `activity-report-${dateRange}days-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Exported ${filteredActions.length} activities to CSV`);
    } catch (err) {
      console.error('Error exporting report:', err);
      setError('Failed to export report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, [dateRange]);

  const getActionIcon = (action: string) => {
    const iconClass = "w-4 h-4";
    switch (action) {
      case 'LOGIN_SUCCESS': return <Shield className={iconClass} />;
      case 'PERMISSION_GRANT': return <Shield className={iconClass} />;
      case 'PERMISSION_REVOKE': return <Shield className={iconClass} />;
      case 'FOLDER_CREATE': return <FolderPlus className={iconClass} />;
      case 'FOLDER_RENAME': return <Edit2 className={iconClass} />;
      case 'USER_CREATE': return <UserPlus className={iconClass} />;
      case 'USER_DELETE': return <UserX className={iconClass} />;
      case 'ORGANISATION_CREATE': return <Building2 className={iconClass} />;
      case 'ORGANISATION_UPDATE': return <Edit2 className={iconClass} />;
      case 'ORGANISATION_DELETE': return <Trash2 className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  const getActionStyle = (action: string) => {
    const styles = {
      LOGIN_SUCCESS: { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
      PERMISSION_GRANT: { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
      PERMISSION_REVOKE: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
      FOLDER_CREATE: { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
      FOLDER_RENAME: { bg: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', border: 'rgba(249, 115, 22, 0.3)' },
      USER_CREATE: { bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
      USER_DELETE: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
      ORGANISATION_CREATE: { bg: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' },
      ORGANISATION_UPDATE: { bg: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', border: 'rgba(249, 115, 22, 0.3)' },
      ORGANISATION_DELETE: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
    };
    return styles[action as keyof typeof styles] || { bg: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af', border: 'rgba(156, 163, 175, 0.3)' };
  };

  const formatActionName = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-white">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Loading activity data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Failed to Load Activity Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button
            onClick={fetchActivityData}
            className="bg-[#FF7619] hover:bg-[#FF7619]/90 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">No data available</div>
      </div>
    );
  }

  const filteredActions = apiData.data.recentCriticalActions.filter(action => {
    const matchesSearch = action.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.userId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.resourceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.ipAddress.includes(searchQuery);
    const matchesFilter = filterType === 'all' || action.action === filterType;
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
              Track all system operations and user activities
              {currentOrgName && <span className="text-[#FF7619] ml-2">• {currentOrgName}</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={fetchActivityData}
            variant="outline"
            size="sm"
            className="h-10 px-3 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] h-10 bg-[#1a1a2e]/60 border-white/10 text-white rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            onClick={handleExportReport}
            disabled={loading || !apiData || filteredActions.length === 0}
            className="h-10 px-4 rounded-xl text-white font-medium disabled:opacity-50"
            style={{ backgroundColor: '#FF7619', boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)' }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export ({filteredActions.length})
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">{apiData.data.period.days} days</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{apiData.data.totalActions}</p>
            <p className="text-sm text-gray-400">Total Actions</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">Errors</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{apiData.data.failedActions}</p>
            <p className="text-sm text-gray-400">Failed Actions</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">Most Common</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{apiData.data.actionsByType[0]?.count || 0}</p>
            <p className="text-sm text-gray-400">Login Success</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400">Active</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{apiData.data.topUsers.length}</p>
            <p className="text-sm text-gray-400">Active Users</p>
          </div>
        </div>
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
          <SelectTrigger className="w-[180px] h-12 bg-[#1a1a2e]/60 border-white/10 text-white rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Activities" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
            <SelectItem value="all">All Activities</SelectItem>
            {apiData.data.actionsByType.map((actionType) => (
              <SelectItem key={actionType._id} value={actionType._id}>
                {formatActionName(actionType._id)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Activity List */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-50"></div>
        <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Recent Critical Activities</h2>
            <p className="text-sm text-gray-400 mt-1">{filteredActions.length} activities found</p>
          </div>
          
          <div className="divide-y divide-white/5">
            {filteredActions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Activities Found</h3>
                <p className="text-gray-400 text-sm">
                  {searchQuery || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No activities available for the selected time period'
                  }
                </p>
                {(searchQuery || filterType !== 'all') && (
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('all');
                    }}
                    variant="outline"
                    className="mt-4 border-white/10 text-gray-300 hover:bg-white/10"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              filteredActions.map((activity) => {
                const style = getActionStyle(activity.action);
                return (
                  <div
                    key={activity._id}
                    className="p-5 hover:bg-white/5 transition-all group/item cursor-pointer"
                    onClick={() => {
                      console.log('Activity details:', activity);
                      // TODO: Add activity detail modal or navigation
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: style.bg, border: `1px solid ${style.border}` }}
                      >
                        <div style={{ color: style.color }}>
                          {getActionIcon(activity.action)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white text-sm font-medium">{formatActionName(activity.action)}</p>
                          <Badge
                            className="capitalize text-xs"
                            style={{
                              backgroundColor: style.bg,
                              color: style.color,
                              borderColor: style.border
                            }}
                          >
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">
                          Resource: {activity.resourceType} • IP: {activity.ipAddress}
                          {activity.details?.metadata?.targetUserId && (
                            <span> • Target: {activity.details.metadata.targetUserId.slice(-8)}</span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-medium">
                            {getInitials(activity.userId.name)}
                          </div>
                          <span className="hidden md:block max-w-[120px] truncate">{activity.userId.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTimestamp(activity.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

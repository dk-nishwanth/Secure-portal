import React, { useState } from 'react';
import { Activity, Server, Wifi, Database, Shield, RefreshCw, AlertTriangle, CheckCircle, XCircle, Monitor, HardDrive, Cpu, MemoryStick, Mail, Zap, Globe, Lock, TrendingUp, Clock, Users, FileText, Play, Eye, RotateCcw, Settings, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HealthCheckPage: React.FC = () => {
  const { currentOrgName } = useAuth();
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simplified system info
  const systemInfo = {
    status: 'healthy',
    lastUpdated: '2024-05-21T10:30:42Z',
    uptime: '15 days, 4 hours',
    environment: 'Production',
    version: 'v2.4.1',
    responseTime: '120 ms',
    platform: 'Linux (Ubuntu 22.04)',
    nodeVersion: 'v20.12.2',
    memoryUsage: { used: 10.4, total: 16, percentage: 65 },
    cpuCores: 8,
    cpuModel: 'AMD EPYC 7763',
    loadAverage: '1.25, 1.40, 1.35'
  };

  // Simplified services
  const services = [
    { name: 'Database', status: 'operational', responseTime: '15 ms', details: 'Connected, no issues' },
    { name: 'GridFS', status: 'operational', responseTime: '25 ms', details: 'Storage available' },
    { name: 'Websocket', status: 'operational', responseTime: '10 ms', details: 'Active connections: 250' },
    { name: 'Render', status: 'operational', responseTime: '80 ms', details: 'Rendering pipeline active' }
  ];

  // Quick actions
  const quickActions = [
    { name: 'Run Full Health Check', icon: Play, action: () => console.log('Running health check...') },
    { name: 'View Logs', icon: Eye, action: () => console.log('Opening logs...') },
    { name: 'Restart Services', icon: RotateCcw, action: () => console.log('Restarting services...') },
    { name: 'Configure Alerts', icon: Settings, action: () => console.log('Opening alert config...') },
    { name: 'Export Report', icon: Download, action: () => console.log('Exporting report...') }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'offline':
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLastRefresh(new Date());
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('Health check data refreshed');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Website Health Check</h1>
            <p className="text-gray-400 text-sm">Monitoring system status and services</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-10 px-4 rounded-xl transition-all shadow-lg text-white font-semibold flex items-center gap-2 text-sm"
            style={{ 
              backgroundColor: '#FF7619',
              boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
            }}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Main Content - Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Left Column - General Status */}
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full flex flex-col">
              <h2 className="text-lg font-bold text-white mb-6">General Status</h2>
              
              {/* Status Icon */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">System is Healthy</h3>
              </div>

              {/* System Details */}
              <div className="space-y-3 text-sm flex-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white text-xs">{systemInfo.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-white">{systemInfo.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Environment:</span>
                  <span className="text-white">{systemInfo.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white">{systemInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Overall Response Time:</span>
                  <span className="text-white">{systemInfo.responseTime}</span>
                </div>

                {/* System Information */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3 text-sm">System Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-white text-xs">{systemInfo.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Node.js Version:</span>
                      <span className="text-white">{systemInfo.nodeVersion}</span>
                    </div>
                  </div>
                </div>

                {/* Memory Usage */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3 text-sm">Memory Usage (Total: 16 GB)</h4>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${systemInfo.memoryUsage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{systemInfo.memoryUsage.percentage}%</span>
                    <span className="text-white">{systemInfo.memoryUsage.used} GB used of {systemInfo.memoryUsage.total} GB total</span>
                  </div>
                </div>

                {/* CPU Details */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3 text-sm">CPU Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cores:</span>
                      <span className="text-white">{systemInfo.cpuCores} Cores</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span className="text-white text-xs">{systemInfo.cpuModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Load Average:</span>
                      <span className="text-white">{systemInfo.loadAverage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Services Status */}
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full flex flex-col">
              <h2 className="text-lg font-bold text-white mb-6">Services Status</h2>
              
              <div className="grid grid-cols-1 gap-4 flex-1">
                {services.map((service, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-semibold">{service.name}</span>
                      </div>
                      {getStatusIcon(service.status)}
                    </div>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400 capitalize">{service.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="text-white">{service.responseTime}</span>
                      </div>
                      <div className="text-gray-400 text-xs mt-2">{service.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Alerts & Quick Actions */}
          <div className="space-y-6 h-full flex flex-col">
            {/* Recent Alerts */}
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                <h2 className="text-lg font-bold text-white mb-6">Recent Alerts</h2>
                <div className="text-center py-8 flex-1 flex flex-col justify-center">
                  <AlertTriangle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No recent critical alerts.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
                
                <div className="space-y-3 flex-1">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-200 text-white group"
                    >
                      <action.icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      <span className="font-medium text-sm">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheckPage;
import React, { useState, useEffect } from 'react';
import { Activity, Server, Wifi, Database, Shield, RefreshCw, AlertTriangle, CheckCircle, XCircle, Monitor, HardDrive, Cpu, MemoryStick, Mail } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  lastChecked: string;
}

interface SystemInfo {
  uptime: string;
  memory: { used: number; total: number };
  cpu: number;
  storage: { used: number; total: number };
}

const HealthCheckPage: React.FC = () => {
  const [generalStatus, setGeneralStatus] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    uptime: '7 days, 14 hours',
    memory: { used: 4.2, total: 8 },
    cpu: 23,
    storage: { used: 45, total: 100 }
  });
  
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Authentication Service', status: 'online', responseTime: 120, lastChecked: '2 minutes ago' },
    { name: 'Database', status: 'online', responseTime: 45, lastChecked: '1 minute ago' },
    { name: 'File Storage', status: 'warning', responseTime: 340, lastChecked: '3 minutes ago' },
    { name: 'Email Service', status: 'online', responseTime: 89, lastChecked: '1 minute ago' },
    { name: 'Backup Service', status: 'online', responseTime: 156, lastChecked: '5 minutes ago' }
  ]);

  const [lastRefresh, setLastRefresh] = useState(new Date());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      case 'offline':
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('Authentication')) return <Shield className="w-5 h-5 text-blue-400" />;
    if (serviceName.includes('Database')) return <Database className="w-5 h-5 text-green-400" />;
    if (serviceName.includes('File Storage')) return <HardDrive className="w-5 h-5 text-purple-400" />;
    if (serviceName.includes('Email')) return <Mail className="w-5 h-5 text-orange-400" />;
    if (serviceName.includes('Backup')) return <Server className="w-5 h-5 text-cyan-400" />;
    return <Server className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'offline':
      case 'critical':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // Simulate refresh - in real app, this would fetch fresh data
    console.log('Refreshing health check data...');
  };

  const handleRestartService = (serviceName: string) => {
    console.log(`Restarting ${serviceName}...`);
    // Simulate service restart
  };

  const handleRunDiagnostics = () => {
    console.log('Running system diagnostics...');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-3xl text-white">
          Website <span className="bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">Health Check</span>
        </h1>
        <p className="text-gray-400">Monitor system performance and service status in real-time</p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-400">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* General Status */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">General Status</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-xl border ${getStatusColor(generalStatus)} font-medium text-base`}>
              {getStatusIcon(generalStatus)}
              <span className="capitalize">{generalStatus}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-base">
              All critical systems are operational. Minor performance issues detected in file storage.
            </p>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">System Information</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400 font-medium">Uptime</div>
                <Server className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{systemInfo.uptime}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400 font-medium">Memory Usage</div>
                <MemoryStick className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">
                {systemInfo.memory.used}GB / {systemInfo.memory.total}GB
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${(systemInfo.memory.used / systemInfo.memory.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400 font-medium">CPU Usage</div>
                <Cpu className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">{systemInfo.cpu}%</div>
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${systemInfo.cpu}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400 font-medium">Storage</div>
                <HardDrive className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">
                {systemInfo.storage.used}GB / {systemInfo.storage.total}GB
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${(systemInfo.storage.used / systemInfo.storage.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Status */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Service Status</h2>
            </div>
          </div>
          
          <div className="space-y-5">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-200">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0 p-3 bg-gray-600/50 rounded-xl border border-gray-500/30">
                    {getServiceIcon(service.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="font-semibold text-white text-lg">{service.name}</div>
                      <div className="flex-shrink-0">
                        {getStatusIcon(service.status)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      <span>Response time: </span>
                      <span className="font-medium text-gray-300">{service.responseTime}ms</span>
                      <span className="mx-4">•</span>
                      <span>Last checked: </span>
                      <span className="font-medium text-gray-300">{service.lastChecked}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-5 flex-shrink-0">
                  <span className={`px-5 py-2 text-sm font-semibold rounded-full ${getStatusColor(service.status)}`}>
                    {service.status.toUpperCase()}
                  </span>
                  {service.status !== 'online' && (
                    <button
                      onClick={() => handleRestartService(service.name)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-500/10 transition-all duration-200 border border-blue-500/20"
                    >
                      Restart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-[#1a1a2e]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={handleRunDiagnostics}
              className="flex items-center space-x-4 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-400/30 transition-all duration-200 text-white group"
            >
              <Activity className="w-6 h-6 text-blue-400 group-hover:text-blue-300 flex-shrink-0" />
              <span className="font-semibold text-base">Run Diagnostics</span>
            </button>
            
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-4 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-400/30 transition-all duration-200 text-white group"
            >
              <RefreshCw className="w-6 h-6 text-green-400 group-hover:text-green-300 flex-shrink-0" />
              <span className="font-semibold text-base">Refresh All Services</span>
            </button>
            
            <button
              onClick={() => console.log('Clearing cache...')}
              className="flex items-center space-x-4 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/30 transition-all duration-200 text-white group"
            >
              <Database className="w-6 h-6 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
              <span className="font-semibold text-base">Clear Cache</span>
            </button>
            
            <button
              onClick={() => console.log('Viewing logs...')}
              className="flex items-center space-x-4 p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-400/30 transition-all duration-200 text-white group"
            >
              <Server className="w-6 h-6 text-orange-400 group-hover:text-orange-300 flex-shrink-0" />
              <span className="font-semibold text-base">View System Logs</span>
            </button>
            
            <button
              onClick={() => console.log('Running backup...')}
              className="flex items-center space-x-4 p-6 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-2xl hover:from-indigo-500/20 hover:to-blue-500/20 hover:border-indigo-400/30 transition-all duration-200 text-white group"
            >
              <Shield className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 flex-shrink-0" />
              <span className="font-semibold text-base">Run Backup</span>
            </button>
            
            <button
              onClick={() => console.log('Testing connectivity...')}
              className="flex items-center space-x-4 p-6 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl hover:from-teal-500/20 hover:to-cyan-500/20 hover:border-teal-400/30 transition-all duration-200 text-white group"
            >
              <Wifi className="w-6 h-6 text-teal-400 group-hover:text-teal-300 flex-shrink-0" />
              <span className="font-semibold text-base">Test Connectivity</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheckPage;
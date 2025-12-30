import { useState, useEffect, useRef } from 'react';
import { Mail, Bell, FileText, Check, X, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './ui/badge';

interface EmailNotification {
  id: string;
  type: 'file_shared' | 'access_granted' | 'file_updated' | 'access_revoked' | 'system' | 'security';
  title: string;
  message: string;
  sender: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: EmailNotification[] = [
  {
    id: '1',
    type: 'file_shared',
    title: 'New File Shared With You',
    message: 'John Doe has shared "Q4_Report.pdf" with you. The document contains quarterly financial data and analysis.',
    sender: 'John Doe',
    timestamp: new Date(Date.now() - 5 * 60000),
    read: false,
  },
  {
    id: '2',
    type: 'access_granted',
    title: 'Access Granted',
    message: 'You have been granted edit access to "Marketing Folder". You can now view, edit, and manage files in this folder.',
    sender: 'Admin',
    timestamp: new Date(Date.now() - 30 * 60000),
    read: false,
  },
  {
    id: '3',
    type: 'file_updated',
    title: 'File Updated',
    message: 'Sarah Anderson updated "Budget_2024.xlsx". The latest changes include updated revenue projections for Q4.',
    sender: 'Sarah Anderson',
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    read: true,
  },
  {
    id: '4',
    type: 'access_granted',
    title: 'New Folder Access',
    message: 'You now have view access to "Project Documents". This folder contains all project-related files and documentation.',
    sender: 'Admin',
    timestamp: new Date(Date.now() - 4 * 60 * 60000),
    read: true,
  },
  {
    id: '5',
    type: 'security',
    title: 'Security Alert',
    message: 'New login detected from a different device. If this wasn\'t you, please contact your administrator immediately.',
    sender: 'Security System',
    timestamp: new Date(Date.now() - 6 * 60 * 60000),
    read: false,
  },
  {
    id: '6',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Some services may be temporarily unavailable.',
    sender: 'System Admin',
    timestamp: new Date(Date.now() - 24 * 60 * 60000),
    read: true,
  },
];

interface EmailNotificationsProps {
  open: boolean;
  onClose: () => void;
}

export function EmailNotifications({ open, onClose }: EmailNotificationsProps) {
  const [notifications, setNotifications] = useState<EmailNotification[]>(mockNotifications);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'file_shared':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'access_granted':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'file_updated':
        return <Bell className="w-4 h-4 text-orange-400" />;
      case 'access_revoked':
        return <X className="w-4 h-4 text-red-400" />;
      case 'security':
        return <X className="w-4 h-4 text-red-400" />;
      case 'system':
        return <Bell className="w-4 h-4 text-purple-400" />;
      default:
        return <Mail className="w-4 h-4 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'file_shared':
        return 'from-blue-500/20 to-cyan-500/20';
      case 'access_granted':
        return 'from-green-500/20 to-emerald-500/20';
      case 'file_updated':
        return 'from-orange-500/20 to-orange-600/20';
      case 'access_revoked':
        return 'from-red-500/20 to-red-600/20';
      case 'security':
        return 'from-red-500/20 to-red-600/20';
      case 'system':
        return 'from-purple-500/20 to-purple-600/20';
      default:
        return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleExpanded = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      markAsRead(id);
    }
  };

  if (!open) return null;

  return (
    <div 
      ref={notificationRef}
      className="fixed z-[100] border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
      style={{ 
        width: '380px', 
        maxHeight: '420px',
        top: '56px', 
        right: '100px',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100" style={{ backgroundColor: '#ffffff' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FF7619' }}
            >
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Notifications</span>
            {unreadCount > 0 && (
              <Badge 
                style={{ 
                  backgroundColor: 'rgba(255, 118, 25, 0.2)', 
                  color: '#FF7619',
                  borderColor: 'rgba(255, 118, 25, 0.3)'
                }}
              >
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-gray-500 hover:text-[#FF7619] px-2 py-1 rounded hover:bg-orange-50"
            >
              Mark all read
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">{notifications.length} total messages</p>
      </div>

      {/* Notifications List */}
      <div 
        className="overflow-y-auto"
        style={{ 
          maxHeight: notifications.length > 4 ? '320px' : 'auto',
          backgroundColor: '#ffffff'
        }}
      >
        {notifications.map((notification, index) => (
          <div key={notification.id}>
            {/* Notification Item */}
            <div 
              className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0" 
              style={{ backgroundColor: '#ffffff' }}
            >
              {/* Main Content Row */}
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  {/* Title Row */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-1 ml-2">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[#FF7619]"></div>
                      )}
                      <span className="text-xs text-gray-400">{formatTimestamp(notification.timestamp)}</span>
                      <button
                        onClick={() => toggleExpanded(notification.id)}
                        className="text-[#FF7619] hover:text-[#FF7619]/80 p-1 rounded hover:bg-orange-50"
                      >
                        {expandedId === notification.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Message Preview */}
                  <p className="text-xs text-gray-600 mb-2">
                    {expandedId === notification.id 
                      ? notification.message 
                      : notification.message.length > 60 
                        ? `${notification.message.substring(0, 60)}...` 
                        : notification.message
                    }
                  </p>
                  
                  {/* Sender */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-[8px] font-medium">
                        {getInitials(notification.sender)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{notification.sender}</span>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details - Inside Same Container */}
              {expandedId === notification.id && (
                <div className="mt-3 ml-11" style={{ backgroundColor: '#ffffff' }}>
                  <div className="bg-gradient-to-br from-[#FF7619]/5 to-orange-600/5 rounded-lg p-3 border border-[#FF7619]/20">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          <strong>Received:</strong> {notification.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          <strong>From:</strong> {notification.sender}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-[#FF7619]/10">
                        <p className="text-gray-700 leading-relaxed">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
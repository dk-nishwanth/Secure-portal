import { useState } from 'react';
import { Mail, Bell, FileText, Link as LinkIcon, Eye, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from './ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface EmailNotification {
  id: string;
  type: 'file_shared' | 'access_granted' | 'file_updated' | 'access_revoked';
  title: string;
  message: string;
  fileName?: string;
  fileUrl?: string;
  sender: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: EmailNotification[] = [
  {
    id: '1',
    type: 'file_shared',
    title: 'New File Shared With You',
    message: 'John Doe has shared "Q4_Report.pdf" with you',
    fileName: 'Q4_Report.pdf',
    fileUrl: '/files/q4-report',
    sender: 'john.doe@company.com',
    timestamp: new Date(Date.now() - 5 * 60000),
    read: false,
  },
  {
    id: '2',
    type: 'access_granted',
    title: 'Access Granted',
    message: 'You have been granted edit access to "Marketing Folder"',
    fileName: 'Marketing Folder',
    fileUrl: '/folders/marketing',
    sender: 'admin@company.com',
    timestamp: new Date(Date.now() - 30 * 60000),
    read: false,
  },
  {
    id: '3',
    type: 'file_updated',
    title: 'File Updated',
    message: 'Sarah Anderson updated "Budget_2024.xlsx"',
    fileName: 'Budget_2024.xlsx',
    fileUrl: '/files/budget-2024',
    sender: 'sarah.a@company.com',
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    read: true,
  },
  {
    id: '4',
    type: 'access_granted',
    title: 'New Folder Access',
    message: 'You now have view access to "Project Documents"',
    fileName: 'Project Documents',
    fileUrl: '/folders/project-docs',
    sender: 'admin@company.com',
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
  const [selectedNotification, setSelectedNotification] = useState<EmailNotification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'file_shared':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'access_granted':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'file_updated':
        return <Bell className="w-5 h-5 text-orange-400" />;
      case 'access_revoked':
        return <X className="w-5 h-5 text-red-400" />;
      default:
        return <Mail className="w-5 h-5 text-gray-400" />;
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

  const openNotificationDetail = (notification: EmailNotification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const copyLoginUrl = () => {
    const url = `${window.location.origin}/login`;
    navigator.clipboard.writeText(url);
  };

  const copyFileUrl = () => {
    if (selectedNotification?.fileUrl) {
      const url = `${window.location.origin}${selectedNotification.fileUrl}`;
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <>
      {/* Main Notifications Panel */}
      {open && (
        <>
          {/* Notification Panel */}
          <div className="border border-gray-200 w-[420px] max-h-[400px] overflow-hidden flex flex-col shadow-2xl fixed z-[100] rounded-2xl p-5 animate-in fade-in slide-in-from-top-2 duration-200" style={{ backgroundColor: '#ffffff', opacity: 1, top: '56px', right: '100px' }}>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: '#FF7619',
                    boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                  }}
                >
                  <Mail className="w-5 h-5 text-white" />
                </div>
                Email Notifications
                {unreadCount > 0 && (
                  <Badge 
                    className="ml-2"
                    style={{ 
                      backgroundColor: 'rgba(255, 118, 25, 0.2)', 
                      color: '#FF7619',
                      borderColor: 'rgba(255, 118, 25, 0.3)'
                    }}
                  >
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 px-3 rounded-lg"
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-2">
              View your file sharing and access notifications
            </p>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="space-y-3">
                  <div
                    onClick={() => openNotificationDetail(notification)}
                    className={`cursor-pointer transition-all ${
                      notification.read ? 'opacity-60' : ''
                    } ${selectedNotification?.id === notification.id ? 'ring-2 ring-[#FF7619]' : ''}`}
                  >
                    <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-gray-900 font-semibold text-sm">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-[#FF7619] flex-shrink-0 mt-1.5 animate-pulse"></div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification Details - Shown Directly Below This Notification */}
                  {selectedNotification?.id === notification.id && (
                    <div className="bg-gradient-to-br from-[#FF7619]/10 to-orange-600/10 rounded-2xl p-5 border-2 border-[#FF7619]/30 animate-in slide-in-from-top-2 duration-200 ml-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <h4 className="text-gray-900 font-bold text-lg">{notification.title}</h4>
                      </div>

                      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
                        <p className="text-gray-900 mb-3">{notification.message}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">From</span>
                            <span className="text-gray-900 font-medium">{notification.sender}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Time</span>
                            <span className="text-gray-900 font-medium">{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          {notification.fileName && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">File/Folder</span>
                              <span className="text-gray-900 font-medium">{notification.fileName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={copyLoginUrl}
                          variant="outline"
                          size="sm"
                          className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 h-10 rounded-lg justify-start text-sm"
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Copy Login URL
                        </Button>

                        {notification.fileUrl && (
                          <>
                            <Button
                              onClick={copyFileUrl}
                              variant="outline"
                              size="sm"
                              className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 h-10 rounded-lg justify-start text-sm"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Copy File URL
                            </Button>

                            <Button
                              size="sm"
                              className="w-full h-10 rounded-lg text-white font-medium justify-start text-sm"
                              style={{ 
                                backgroundColor: '#FF7619',
                                boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)'
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View File/Folder
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        </>
      )}

    </>
  );
}

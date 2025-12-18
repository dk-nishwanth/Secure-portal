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
  const [showDetailModal, setShowDetailModal] = useState(false);

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
    setShowDetailModal(true);
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
          <div className="border border-gray-200 w-[500px] max-h-[600px] overflow-hidden flex flex-col shadow-2xl fixed z-[100] rounded-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200" style={{ backgroundColor: '#ffffff', opacity: 1, top: '56px', right: '100px' }}>
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
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => openNotificationDetail(notification)}
                  className={`cursor-pointer transition-all ${
                    notification.read ? 'opacity-60' : ''
                  }`}
                >
                  <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-gray-900 font-semibold">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-[#FF7619] flex-shrink-0 mt-1.5 animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                          <p className="text-xs text-gray-500">From: {notification.sender}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              className="h-12 px-6 rounded-xl w-full text-white font-semibold transition-all hover:opacity-90"
              style={{ 
                backgroundColor: '#FF7619',
                boxShadow: '0 4px 10px -2px rgba(255, 118, 25, 0.3)'
              }}
            >
              Close
            </Button>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg opacity-70 hover:opacity-100 transition-opacity text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        </>
      )}

      {/* Notification Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogPortal>
          <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
          <DialogPrimitive.Content className="bg-[#0f0f1a] border border-white/20 text-white max-w-md shadow-2xl fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded-2xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                {selectedNotification && getNotificationIcon(selectedNotification.type)}
              </div>
              {selectedNotification?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Notification details and actions
            </DialogDescription>
          </DialogHeader>

          {selectedNotification && (
            <div className="py-4 space-y-4">
              {/* Message */}
              <div className="bg-[#1a1a2e] rounded-xl p-4 border border-white/10">
                <p className="text-white mb-3">{selectedNotification.message}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">From</span>
                    <span className="text-white">{selectedNotification.sender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time</span>
                    <span className="text-white">{formatTimestamp(selectedNotification.timestamp)}</span>
                  </div>
                  {selectedNotification.fileName && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">File/Folder</span>
                      <span className="text-white">{selectedNotification.fileName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm">Quick Actions</h4>
                
                {/* Copy Login URL */}
                <Button
                  onClick={copyLoginUrl}
                  variant="outline"
                  className="w-full bg-[#1a1a2e] border-white/20 text-gray-300 hover:bg-[#1f1f33] hover:text-white hover:border-white/30 h-12 rounded-xl justify-start"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Copy Login URL
                </Button>

                {/* Copy File URL */}
                {selectedNotification.fileUrl && (
                  <Button
                    onClick={copyFileUrl}
                    variant="outline"
                    className="w-full bg-[#1a1a2e] border-white/20 text-gray-300 hover:bg-[#1f1f33] hover:text-white hover:border-white/30 h-12 rounded-xl justify-start"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Copy File URL
                  </Button>
                )}

                {/* View File */}
                {selectedNotification.fileUrl && (
                  <Button
                    className="w-full h-12 rounded-xl shadow-lg text-white font-semibold justify-start"
                    style={{ 
                      backgroundColor: '#FF7619',
                      boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View File/Folder
                  </Button>
                )}
              </div>

              {/* Email Info */}
              <div className="bg-[#1a1a2e] rounded-xl p-4 border border-blue-500/30">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm mb-1">Email Notification</p>
                    <p className="text-gray-400 text-xs">
                      This notification was also sent to your email address. Check your inbox for the full details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailModal(false)}
              className="bg-[#1a1a2e] border-white/20 text-gray-300 hover:bg-[#1f1f33] hover:text-white hover:border-white/30 h-12 px-6 rounded-xl"
            >
              Close
            </Button>
          </DialogFooter>
          <DialogPrimitive.Close className="absolute top-4 right-4 rounded-lg opacity-70 hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}

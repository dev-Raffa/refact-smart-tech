'use client';

import { useNotificationsStore, type NotificationProps } from '@/stores/ws/notifications-store';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface NotificationsContextType {
  notifications: NotificationProps[];
  addNotification: (notification: Omit<NotificationProps, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  addExcelDownloadNotification: (downloadUrl: string) => void;
  addImportSuccessNotification: (message: string, project?: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
}

export function NotificationsProvider({ children }: Readonly<NotificationsProviderProps>) {
  const {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    unreadCount,
    addExcelDownloadNotification,
    addImportSuccessNotification,
    clearAll
  } = useNotificationsStore();

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        unreadCount: unreadCount(),
        addExcelDownloadNotification,
        addImportSuccessNotification,
        clearAll
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  return context;
}
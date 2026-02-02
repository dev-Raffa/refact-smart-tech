import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NotificationProps {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type?: 'general' | 'excel_download' | 'import_success';
  downloadUrl?: string;
}

interface NotificationsState {
  notifications: NotificationProps[];
  addNotification: (notification: Omit<NotificationProps, 'id' | 'timestamp' | 'isRead'>) => void;
  addExcelDownloadNotification: (downloadUrl: string) => void;
  addImportSuccessNotification: (message: string, project?: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: () => number;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: NotificationProps = {
          ...notification,
          id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          isRead: false
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },

      addExcelDownloadNotification: (downloadUrl) => {
        get().addNotification({
          title: 'Arquivo Excel disponível para download',
          description: 'Seu arquivo de clientes foi gerado com sucesso e está pronto para download.',
          type: 'excel_download',
          downloadUrl
        });
      },

      addImportSuccessNotification: (message, project) => {
        get().addNotification({
          title: 'Importação concluída com sucesso',
          description: project ? `${project}: ${message}` : message,
          type: 'import_success'
        });
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          )
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true
          }))
        }));
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      unreadCount: () => {
        return get().notifications.filter((n) => !n.isRead).length;
      }
    }),
    {
      name: 'notifications-storage',
      partialize: (state) => ({ notifications: state.notifications }),
    }
  )
);
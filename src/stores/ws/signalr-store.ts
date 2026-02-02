import { storageKeys } from '@/config/storage-keys';
import { createSignalRConnection } from '@/utils/ws/signalr';
import * as signalR from "@microsoft/signalr";
import { create } from 'zustand';
import { useNotificationsStore } from './notifications-store';

interface SignalRState {
  connection: signalR.HubConnection | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectionAttempts: number;
  maxRetries: number;
  initialize: (
    addExcelDownloadNotification: (url: string) => void,
    onFileImported?: (message: any) => void
  ) => Promise<void>;
  reconnect: () => Promise<void>;
  disconnect: () => Promise<void>;
  resetConnectionAttempts: () => void;
}

export const useSignalRStore = create<SignalRState>((set, get) => ({
  connection: null,
  isConnected: false,
  isConnecting: false,
  connectionAttempts: 0,
  maxRetries: 5,

  initialize: async (addExcelDownloadNotification, onFileImported) => {
    const state = get();

    if (state.isConnecting) {
      console.log('Connection attempt already in progress');
      return;
    }

    if (state.isConnected && state.connection?.state === 'Connected') {
      console.log('Already connected to SignalR');
      return;
    }

    set({ isConnecting: true });

    try {
      await get().disconnect();

      const token = localStorage.getItem(storageKeys.accessToken);

      if (!token) {
        console.log('No token available for SignalR connection');
        set({ isConnecting: false });
        return;
      }

      const {
        addExcelDownloadNotification: notificationsFn,
        addImportSuccessNotification
      } = useNotificationsStore.getState();

      const { connection, startConnection } = createSignalRConnection(
        token,
        addExcelDownloadNotification || notificationsFn,
        onFileImported || ((message) => addImportSuccessNotification(message.Message, message.Project))
      );

      set({ connection });

      connection.onreconnecting(() => {
        console.log('SignalR reconnecting...');

        set({ isConnected: false, isConnecting: true });
      });

      connection.onreconnected(() => {
        console.log('SignalR reconnected successfully');

        set({
          isConnected: true,
          isConnecting: false,
          connectionAttempts: 0
        });
      });

      connection.onclose((error) => {
        console.log('SignalR connection closed', error);

        set({
          isConnected: false,
          isConnecting: false,
          connectionAttempts: get().connectionAttempts + 1
        });
      });

      const connected = await startConnection();

      set({
        isConnected: connected,
        isConnecting: false,
        connectionAttempts: connected ? 0 : get().connectionAttempts + 1
      });

      if (connected) {
        console.log('SignalR connected successfully');
      } else {
        console.error('Failed to establish SignalR connection');
      }

    } catch (error) {
      console.error('Failed to initialize SignalR connection:', error);
      set({
        connection: null,
        isConnected: false,
        isConnecting: false,
        connectionAttempts: get().connectionAttempts + 1
      });
    }
  },

  reconnect: async () => {
    const state = get();

    if (state.connectionAttempts >= state.maxRetries) {
      console.log('Max reconnection attempts reached. Stopping reconnection attempts.');
      return;
    }

    if (state.isConnecting) {
      console.log('Reconnection already in progress');
      return;
    }

    console.log(`Attempting to reconnect (${state.connectionAttempts + 1}/${state.maxRetries})`);

    await get().initialize(
      useNotificationsStore.getState().addExcelDownloadNotification,
      (message) => useNotificationsStore.getState().addImportSuccessNotification(message.Message, message.Project)
    );
  },

  disconnect: async () => {
    const { connection } = get();

    if (connection && connection.state !== 'Disconnected') {
      try {
        await connection.stop();
        console.log('SignalR connection stopped');
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      }
    }

    set({
      connection: null,
      isConnected: false,
      isConnecting: false
    });
  },

  resetConnectionAttempts: () => {
    set({ connectionAttempts: 0 });
  }
}));
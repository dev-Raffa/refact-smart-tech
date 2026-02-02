"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  BellIcon,
  CheckCircleIcon,
  DownloadIcon,
  FileIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useNotifications } from "@/hooks/notifications-context"
import { downloadExcelFile } from "@/utils/file/download-file"
import { useUploadStore } from "@/stores/upload/upload-store"

export function Notifications() {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [soundEnabled] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousCount = useRef<number>(0);

  const {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications();

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const generateNotificationSound = () => {
      if (!soundEnabled || !hasUserInteracted) return;

      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        const playBeep = (frequency: number, duration: number, delay: number = 0) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
          }, delay);
        };

        playBeep(800, 0.2);
        playBeep(1000, 0.2, 300);

        const fallbackAudio = () => {
          const audio = new Audio();
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaBC2E2vDCcCIGMoTO6tODNggbZL/py5BADBFjpuvuU6RGDgQ3NQCBBwAARABAoBAUQRABwAEQgQABQ4QIAQQgAQIgAQJHM4QQAwQFAQEFAQEGBAQJAQEDAQEKAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQwQFAQEFAQEFAQEGAAEJAQECAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQwQFAQEFAQEFAQEGAAEJAQECAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQwQFAQEFAQEFAQEGAAEJAQECAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQwQFAQEFAQEFAQEGAAEJAQECAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQwQFAQEFAQEFAQEGAAEJAQECAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQwQFAQEFAQEFAQEGAAEJAQECAgABAwQJAQEBAQFABEQCgAFAhAggQAEgAQABQ==';
          audio.volume = 0.3;
          audio.play().catch(console.error);
        };

        setTimeout(fallbackAudio, 100);
      } catch (error) {
        console.error('Erro ao reproduzir som:', error);

        try {
          const utterance = new SpeechSynthesisUtterance('');
          utterance.volume = 0.1;
          utterance.rate = 10;
          speechSynthesis.speak(utterance);
        } catch (e) {
          console.error('Fallback de som também falhou:', e);
        }
      }
    };

    audioRef.current = { play: generateNotificationSound } as any;
  }, [soundEnabled, hasUserInteracted]);

  const showBrowserNotification = (notification: any) => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      const browserNotification = new Notification(notification.title, {
        body: notification.description || 'Nova notificação no sistema Smart',
        icon: '/favicon.ico',
        tag: notification.id,
        requireInteraction: false,
        silent: false
      });

      browserNotification.onclick = () => {
        window.focus();
        handleNotificationClick(notification);
        browserNotification.close();
      };

      setTimeout(() => {
        browserNotification.close();
      }, 5000);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showBrowserNotification(notification);
        }
      });
    }
  };

  useEffect(() => {
    if (notifications.length > previousCount.current && previousCount.current > 0) {
      const newNotification = notifications[notifications.length - 1];
      if (soundEnabled && audioRef.current) audioRef.current.play();
      showBrowserNotification(newNotification);

      if (document.hidden) {
        try {
          window.focus();
        } catch (e) {
          console.error(e);
        }
      }
    }
    previousCount.current = notifications.length;
  }, [notifications.length, soundEnabled]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const importedFiles = useUploadStore((state) => state.importedFiles);

  const handleDownload = async (notification: any) => {
    if (!notification.downloadUrl) return
    setIsDownloading(notification.id)

    try {
      const success = await downloadExcelFile(notification.downloadUrl)

      if (success) {
        markAsRead(notification.id)

        toast.success("Download iniciado", {
          description: "O arquivo Excel está sendo baixado.",
          position: "top-center"
        })
      } else {
        toast.error("Erro no download", {
          description: "Não foi possível baixar o arquivo Excel.",
          position: "top-center"
        })
      }
    } catch (error) {
      toast.error("Erro no download", {
        description: "Ocorreu um erro ao tentar baixar o arquivo.",
        position: "top-center"
      })
    } finally {
      setIsDownloading(null)
    }
  }

  const handleNotificationClick = (notification: any) => {
    if (notification.type === 'excel_download' && notification.downloadUrl) {
      handleDownload(notification)
    } else {
      markAsRead(notification.id)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'excel_download':
        return <DownloadIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
      case 'import_success':
        return <CheckCircleIcon className="size-4 text-green-600 dark:text-green-400" />
      default:
        return null
    }
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'excel_download':
        return 'hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
      case 'import_success':
        return 'hover:bg-green-50 dark:hover:bg-green-950/20'
      default:
        return 'hover:bg-gray-50 dark:hover:bg-gray-950/20'
    }
  }

  const getFileName = (notification: any) => {
    if (notification.fileName) return notification.fileName

    if (importedFiles.length > 0) {
      const notificationTime = new Date(notification.timestamp).getTime()

      const recentFile = importedFiles
        .filter(file => {
          const fileTime = new Date(file.importedAt).getTime()
          return Math.abs(fileTime - notificationTime) <= 60000
        })
        .sort((a, b) => new Date(b.importedAt).getTime() - new Date(a.importedAt).getTime())[0]

      return recentFile?.fileName
    }

    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden sm:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 relative rounded-full"
        >
          <BellIcon className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1.5 size-2 rounded-full bg-primary-red" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="h-[420px] w-96 p-0 mt-2" align="end">
        <Card className="border-0 shadow-none p-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Notificações {unreadCount > 0 && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({unreadCount} não lida{unreadCount !== 1 ? 's' : ''})
                </span>
              )}
            </CardTitle>

            <div className="flex items-center gap-2">
              {unreadCount > 0 ? (
                <Button
                  type="button"
                  variant="link"
                  className="text-xs text-primary font-medium p-0 h-auto dark:text-primary-red"
                  onClick={markAllAsRead}
                >
                  Marcar tudo como lido
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Nenhuma notificação recente
                </span>
              )}
            </div>
          </CardHeader>
          <Separator />
          <ScrollArea className="h-80">
            <CardContent className="grid gap-0 p-0">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                  <BellIcon className="size-8 mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma notificação</p>
                </div>
              ) : (
                notifications.map((notification, index) => {
                  const importedFileName = getFileName(notification)

                  return (
                    <div
                      key={notification.id}
                      className={`w-full grid ${getNotificationStyle(notification.type || 'general')}`}
                    >
                      <div
                        className="grid grid-cols-[25px_1fr] items-start py-4 px-3 cursor-pointer transition-colors"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {!notification.isRead && (
                          <span className="flex size-2 translate-y-1.5 rounded-full bg-primary dark:bg-primary-red" />
                        )}

                        <div className="grid gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium leading-none truncate">
                              {notification.title}
                            </span>

                            {notification.type && (
                              <div className="flex items-center gap-1">
                                {notification.type === 'excel_download' && isDownloading === notification.id ? (
                                  <div className="size-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  getNotificationIcon(notification.type)
                                )}
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {notification.type === "excel_download" ?
                              notification.description : "Arquivo importado com êxito."}
                          </p>

                          {importedFileName && (
                            <div className="flex items-center gap-2">
                              <FileIcon className="size-3" />

                              <small className="text-xs text-muted-foreground font-medium truncate">
                                {importedFileName}
                              </small>
                            </div>
                          )}

                          {notification.type === 'excel_download' && notification.downloadUrl && (
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-xs text-muted-foreground italic">
                                {format(new Date(notification.timestamp), "dd/MM/yyyy")}
                              </span>

                              <p className="text-xs text-emerald-600 underline dark:text-emerald-400 font-medium">
                                Clique para baixar o arquivo
                              </p>
                            </div>
                          )}

                          {notification.type === 'import_success' && (
                            <div className="w-full flex justify-between items-center pt-1">
                              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                Importação finalizada
                              </p>

                              <span className="text-xs text-muted-foreground italic">
                                {format(new Date(notification.timestamp), "dd/MM/yyyy")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {index < notifications.length - 1 && <Separator />}
                    </div>
                  )
                })
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
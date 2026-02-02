import * as signalR from "@microsoft/signalr";

import { env } from "@/config/env";
import { toast } from "sonner";
import { downloadExcelFile } from "../file/download-file";

interface CustomError extends Error {
  statusCode?: number;
}

interface CustomRetryContext extends signalR.RetryContext {
  statusCode?: number;
}

interface NotificationsMessageBody {
  Project: string;
  Type: string;
  Message: string;
}

export function createSignalRConnection(
  token: string,
  addExcelDownloadNotification: (url: string) => void,
  onFileImported?: (message: NotificationsMessageBody) => void
) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(
      `${env.VITE_GATEWAY_API}/notifications`,
      {
        accessTokenFactory: () => Promise.resolve(token),
        skipNegotiation: false,
        logger: signalR.LogLevel.Debug,
        withCredentials: true,
      }
    )
    .configureLogging(signalR.LogLevel.Debug)
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: (retryContext: CustomRetryContext) => {
        const retryCount = retryContext.previousRetryCount;

        if (retryCount === 0) return 0;
        if (retryContext.statusCode === 401) return null;

        return Math.min(1000 * Math.pow(2, retryCount), 30000);
      }
    })
    .build();

  connection.onreconnecting((error?: CustomError) => {
    console.log("SignalR: Tentando reconectar...", error);

    if (error?.statusCode === 401) {
      console.log("SignalR: Não reconectando devido a erro 401");
      connection.stop().catch(console.error);
    }
  });

  connection.onreconnected(() => {
    console.log("SignalR: Reconectado com sucesso!");
  });

  connection.onclose((error?: CustomError) => {
    console.log("SignalR: Conexão fechada", error);

    if (error?.statusCode === 401) {
      toast.error("Sessão expirada", {
        description: "Sua sessão expirou. Por favor, faça login novamente.",
        position: "top-center"
      });
    }
  });

  connection.on("notifyAsync", async (msg) => {
    if (typeof msg === 'string' && (msg.includes("GeneratingCustomers"))) {
      console.log("Mensagem de exportação recebida:", msg);
      addExcelDownloadNotification(msg);
      const success = await downloadExcelFile(msg);

      if (success) {
        toast.success("Download iniciado", {
          description: "O arquivo Excel está sendo baixado.",
          position: "top-center"
        });
      } else {
        toast.error("Erro no download", {
          description: "Não foi possível baixar o arquivo Excel.",
          position: "top-center"
        });
      }
    }
  });

  connection.on("notifyAsync", (msg: string) => {
    if (typeof msg === 'string' && (msg.includes("ImportingCustomers"))) {
      console.log("Mensagem de importação recebida:", msg);
      const parsedMsg: NotificationsMessageBody = JSON.parse(msg);

      if (parsedMsg.Type === "ImportingCustomers" && onFileImported) {
        onFileImported(parsedMsg);
      }
    }
  });

  const startConnection = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      await connection.start();
      console.log("SignalR Connected.");
      return true;
    } catch (err) {
      console.error("SignalR Connection Error:", err);
      const error = err as CustomError;

      if (error?.statusCode === 401) {
        console.log("SignalR: Encerrando conexão devido a erro 401");
        await connection.stop();
      }

      return false;
    }
  };

  return {
    connection,
    startConnection,
  };
}